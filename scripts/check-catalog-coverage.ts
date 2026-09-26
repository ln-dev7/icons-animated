import fs from 'fs';
import path from 'path';
import ts from 'typescript';

import { discoverIcons, ICON_LIBRARIES, PROJECT_ROOT } from './icon-catalog';

type Library = (typeof ICON_LIBRARIES)[number];
type Mapping = {
  available: boolean;
  catalogName: string | null;
  registryName: string | null;
  registryUrl: string | null;
  nativeName: string | null;
  nativeSource: string | null;
  componentPath: string | null;
  retainedBaselineComponent: boolean;
  note: string;
};
type Coverage = {
  reference: { iconCount: number };
  upstreamPackages: Record<
    Library,
    { package: string; version: string; license: string }
  >;
  summary: Record<
    Library,
    {
      referenceCount: number;
      mappedReferences: number;
      unavailableReferences: number;
      distinctMappedComponents: number;
      newComponents: number;
      retainedBaselineComponents: number;
      catalogComponentsAfterIntegration: number;
    }
  >;
  icons: { reference: string; libraries: Record<Library, Mapping> }[];
};

const root = path.resolve(process.argv[2] ?? PROJECT_ROOT);
const read = (relative: string) =>
  fs.readFileSync(path.join(root, relative), 'utf8');
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PACKAGES = {
  hugeicons: '@hugeicons/core-free-icons',
  tabler: '@tabler/icons',
  phosphor: '@phosphor-icons/core',
};

function readSearchAliases(library: Library) {
  const text = read(`icons/${library}/index.ts`);
  const source = ts.createSourceFile(
    'index.ts',
    text,
    ts.ScriptTarget.Latest,
    true
  );
  const aliases = new Map<string, string[]>();
  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      let name: string | undefined;
      let keywords: string[] = [];
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = property.name.getText(source).replace(/['"]/g, '');
        if (key === 'name' && ts.isStringLiteral(property.initializer))
          name = property.initializer.text;
        if (
          key === 'keywords' &&
          ts.isArrayLiteralExpression(property.initializer)
        ) {
          keywords = property.initializer.elements
            .filter(ts.isStringLiteral)
            .map((element) => element.text);
        }
      }
      if (name) aliases.set(name, [name, ...keywords]);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return aliases;
}

function checkCoverage() {
  const coverage = JSON.parse(read('docs/catalog-coverage.json')) as Coverage;
  const document = read('docs/CATALOG_COVERAGE.md');
  const notices = read('THIRD_PARTY_NOTICES.md');
  const registry = JSON.parse(read('registry.json')) as {
    homepage: string;
    items: { name: string; files: { path: string }[] }[];
  };
  const sources = discoverIcons(root);
  const byRegistry = new Map(
    sources.map((source) => [source.registryName, source])
  );
  const published = new Map(registry.items.map((item) => [item.name, item]));
  const errors: string[] = [];
  const check = (condition: unknown, message: string) => {
    if (!condition) errors.push(message);
  };
  const references = new Set(coverage.icons.map((icon) => icon.reference));
  check(
    coverage.reference.iconCount === 467 &&
      coverage.icons.length === 467 &&
      references.size === 467,
    'Expected exactly 467 unique reference icons'
  );
  check(
    registry.homepage === 'https://icons.lndev.me',
    'Registry homepage differs from documented URLs'
  );
  check(
    document.includes('(catalog-coverage.json)') &&
      document.includes('(../THIRD_PARTY_NOTICES.md)'),
    'Coverage documentation must link its data and third-party notices'
  );

  for (const library of ICON_LIBRARIES) {
    const upstream = coverage.upstreamPackages[library];
    check(
      upstream.package === PACKAGES[library] &&
        /^\d+\.\d+\.\d+$/.test(upstream.version) &&
        upstream.license === 'MIT',
      `${library}: invalid upstream package/version/license`
    );
    check(
      notices.includes(`## ${upstream.package} ${upstream.version}\n`) &&
        document.includes(`${upstream.package}@${upstream.version}`),
      `${library}: upstream version must match documentation and license notices`
    );
    const aliases = readSearchAliases(library);
    const available = coverage.icons.filter(
      (row) => row.libraries[library].available
    );
    const names = new Set(
      available.map((row) => row.libraries[library].catalogName)
    );
    const added = new Set(
      available
        .filter((row) => !row.libraries[library].retainedBaselineComponent)
        .map((row) => row.libraries[library].catalogName)
    );
    const actualCount = sources.filter(
      (source) => source.library === library
    ).length;
    const summary = coverage.summary[library];
    check(
      summary.referenceCount === 467 &&
        summary.mappedReferences === available.length &&
        summary.unavailableReferences === 467 - available.length &&
        summary.distinctMappedComponents === names.size &&
        summary.newComponents === added.size &&
        summary.catalogComponentsAfterIntegration === actualCount &&
        summary.retainedBaselineComponents + summary.newComponents ===
          actualCount,
      `${library}: coverage totals are stale`
    );

    for (const row of coverage.icons) {
      const mapping = row.libraries[library];
      const label = `${library}/${row.reference}`;
      check(
        NAME.test(row.reference) &&
          typeof mapping.note === 'string' &&
          mapping.note.length > 0,
        `${label}: invalid reference or missing review note`
      );
      if (!mapping.available) {
        check(
          [
            mapping.catalogName,
            mapping.registryName,
            mapping.registryUrl,
            mapping.nativeName,
            mapping.nativeSource,
            mapping.componentPath,
          ].every((value) => value === null),
          `${label}: unavailable references cannot link a component`
        );
        continue;
      }
      check(
        typeof mapping.catalogName === 'string' &&
          NAME.test(mapping.catalogName) &&
          typeof mapping.nativeName === 'string' &&
          NAME.test(mapping.nativeName),
        `${label}: invalid catalog/native name`
      );
      const registryName = `${library}-${mapping.catalogName}`;
      const source = byRegistry.get(registryName);
      check(
        !!source &&
          mapping.componentPath === source.relativePath &&
          mapping.registryName === registryName,
        `${label}: catalog source or registry name is missing/mismatched`
      );
      check(
        mapping.registryUrl === `${registry.homepage}/r/${registryName}.json`,
        `${label}: missing or incorrect registry URL`
      );
      check(
        typeof mapping.nativeSource === 'string' &&
          !path.isAbsolute(mapping.nativeSource) &&
          !mapping.nativeSource.split('/').includes('..'),
        `${label}: native source must be package-relative`
      );
      check(
        aliases
          .get(mapping.catalogName ?? '')
          ?.some((alias) => alias.toLowerCase().includes(row.reference)),
        `${label}: reference is not searchable in its library index`
      );
      check(
        published
          .get(registryName)
          ?.files.some((file) => file.path === `${registryName}.tsx`) &&
          fs.existsSync(path.join(root, 'public/r', `${registryName}.json`)),
        `${label}: missing registry item or public registry file`
      );
    }
  }

  const tableRows = document
    .split('\n')
    .filter((line) => /^\|\s*`/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().replace(/`/g, ''))
    );
  const expectedRows = coverage.icons.map((row) => [
    row.reference,
    ...(['hugeicons', 'tabler', 'phosphor'] as const).map(
      (library) => row.libraries[library].catalogName ?? '—'
    ),
  ]);
  check(
    JSON.stringify(tableRows) === JSON.stringify(expectedRows),
    'Markdown mapping table does not match the coverage data'
  );
  check(
    coverage.icons.every((row) =>
      ICON_LIBRARIES.some((library) => row.libraries[library].available)
    ),
    'Each reference must be covered by at least one library'
  );
  if (errors.length) throw new Error([...new Set(errors)].join('\n'));
  console.log(
    `✅ 467 references match ${sources.length} catalog sources, searchable aliases, registry links and version notices`
  );
}

try {
  checkCoverage();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
