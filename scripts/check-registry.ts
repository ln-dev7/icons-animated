import fs from 'fs';
import path from 'path';
import { isDeepStrictEqual } from 'util';

import {
  checkIconIndexes,
  discoverIcons,
  getFiles,
  PROJECT_ROOT,
} from './icon-catalog';
import { components } from './registry-components';
import { createRegistryIndex, createRegistryItem } from './registry-utils';

function checkRegistry() {
  const sources = discoverIcons();
  const errors = checkIconIndexes(sources).flatMap((report) =>
    report.errors.map((error) => `${report.library}: ${error}`)
  );
  const sourceByName = new Map(
    sources.map((source) => [source.registryName, source])
  );
  const componentByName = new Map(
    components.map((component) => [component.name, component])
  );
  if (componentByName.size !== components.length)
    errors.push('Duplicate names in registry manifest');

  for (const source of sources) {
    const component = componentByName.get(source.registryName);
    if (!component) {
      errors.push(`Missing registry manifest entry: ${source.registryName}`);
    } else if (path.resolve(component.path) !== source.path) {
      errors.push(
        `Incorrect source path in registry manifest: ${source.registryName}`
      );
    }
  }
  for (const component of components) {
    if (!sourceByName.has(component.name))
      errors.push(`Orphan registry manifest entry: ${component.name}`);
  }

  const validComponents = components.filter((component) =>
    fs.existsSync(component.path)
  );
  const items = validComponents.map(createRegistryItem);
  function checkJson(file: string, expected: unknown) {
    const relative = path.relative(PROJECT_ROOT, file);
    try {
      if (
        !isDeepStrictEqual(JSON.parse(fs.readFileSync(file, 'utf8')), expected)
      ) {
        errors.push(`Outdated or incorrect generated file: ${relative}`);
      }
    } catch (error) {
      errors.push(
        `Cannot read ${relative}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  checkJson(
    path.join(PROJECT_ROOT, 'registry.json'),
    createRegistryIndex(items)
  );
  const outputDirectory = path.join(PROJECT_ROOT, 'public/r');
  const expectedPaths = new Set<string>();
  for (const item of items) {
    const outputPath = path.join(outputDirectory, `${item.name}.json`);
    expectedPaths.add(outputPath);
    checkJson(outputPath, item);
  }
  if (fs.existsSync(outputDirectory)) {
    for (const file of getFiles(outputDirectory)) {
      if (file.endsWith('.json') && !expectedPaths.has(file)) {
        errors.push(
          `Orphan generated registry file: ${path.relative(PROJECT_ROOT, file)}`
        );
      }
    }
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`❌ ${error}`);
    console.error(
      'Run pnpm run gen-cli after fixing the source/index entries.'
    );
    process.exitCode = 1;
  } else {
    console.log(
      `✅ ${sources.length} icons agree across sources, library indexes, manifest, registry.json and public/r`
    );
  }
}

try {
  checkRegistry();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
