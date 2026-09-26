import fs from 'fs';
import path from 'path';
import ts from 'typescript';

export const PROJECT_ROOT = path.resolve(__dirname, '..');
export const ICON_LIBRARIES = ['hugeicons', 'phosphor', 'tabler'] as const;

export type IconLibrary = (typeof ICON_LIBRARIES)[number];

export interface IconSource {
  library: IconLibrary;
  name: string;
  registryName: string;
  path: string;
  relativePath: string;
}

export interface IconIndexReport {
  library: IconLibrary;
  sourceCount: number;
  importCount: number;
  listCount: number;
  errors: string[];
}

export function getFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? getFiles(entryPath)
        : entry.isFile()
          ? [entryPath]
          : [];
    })
    .sort();
}

export function discoverIcons(root = PROJECT_ROOT): IconSource[] {
  return ICON_LIBRARIES.flatMap((library) => {
    const directory = path.join(root, 'icons', library);
    const names = new Set<string>();

    return getFiles(directory)
      .filter(
        (file) => file.endsWith('.tsx') && path.basename(file) !== 'index.tsx'
      )
      .map((file) => {
        const name = path.basename(file, '.tsx');
        if (names.has(name)) {
          throw new Error(`Duplicate icon name in ${library}: ${name}`);
        }
        names.add(name);

        return {
          library,
          name,
          registryName: `${library}-${name}`,
          path: file,
          relativePath: path.relative(root, file).split(path.sep).join('/'),
        };
      })
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  });
}

function unwrapExpression(expression: ts.Expression): ts.Expression {
  while (
    ts.isAsExpression(expression) ||
    ts.isSatisfiesExpression(expression) ||
    ts.isParenthesizedExpression(expression)
  ) {
    expression = expression.expression;
  }
  return expression;
}

function propertyValue(object: ts.ObjectLiteralExpression, name: string) {
  const property = object.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
      item.name.text === name
  );
  return property && ts.isPropertyAssignment(property)
    ? unwrapExpression(property.initializer)
    : undefined;
}

export function checkIconIndexes(
  sources: IconSource[],
  root = PROJECT_ROOT
): IconIndexReport[] {
  return ICON_LIBRARIES.map((library) => {
    const librarySources = sources.filter(
      (source) => source.library === library
    );
    const report: IconIndexReport = {
      library,
      sourceCount: librarySources.length,
      importCount: 0,
      listCount: 0,
      errors: [],
    };
    const indexPath = path.join(root, 'icons', library, 'index.ts');

    if (!fs.existsSync(indexPath)) {
      report.errors.push(`Missing icons/${library}/index.ts`);
      return report;
    }

    const sourceFile = ts.createSourceFile(
      indexPath,
      fs.readFileSync(indexPath, 'utf8'),
      ts.ScriptTarget.Latest,
      true
    );
    const sourcePaths = new Map(
      librarySources.map((source) => [source.path, source])
    );
    const importedIcons = new Map<string, string>();
    const importedPaths = new Set<string>();
    const exportedNames = new Set<string>();
    let iconList: ts.Expression | undefined;

    for (const statement of sourceFile.statements) {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        !statement.importClause?.isTypeOnly
      ) {
        const specifier = statement.moduleSpecifier.text;
        if (!specifier.startsWith('.') && !specifier.startsWith('@/icons/'))
          continue;

        const resolved = specifier.startsWith('@/')
          ? path.join(root, specifier.slice(2))
          : path.resolve(path.dirname(indexPath), specifier);
        const file = resolved.endsWith('.tsx') ? resolved : `${resolved}.tsx`;
        if (!sourcePaths.has(file)) {
          report.errors.push(
            `Import does not resolve to a ${library} icon: ${specifier}`
          );
          continue;
        }

        if (importedPaths.has(file)) {
          report.errors.push(`Duplicate icon import: ${specifier}`);
        }
        importedPaths.add(file);
        const clause = statement.importClause;
        if (clause?.name) importedIcons.set(clause.name.text, file);
        if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
          for (const binding of clause.namedBindings.elements) {
            if (!binding.isTypeOnly) importedIcons.set(binding.name.text, file);
          }
        }
      }

      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (
            ts.isIdentifier(declaration.name) &&
            declaration.name.text === `${library.toUpperCase()}_ICON_LIST` &&
            declaration.initializer
          ) {
            iconList = unwrapExpression(declaration.initializer);
          }
        }
      }

      if (
        ts.isExportDeclaration(statement) &&
        !statement.isTypeOnly &&
        statement.exportClause &&
        ts.isNamedExports(statement.exportClause)
      ) {
        for (const exported of statement.exportClause.elements) {
          if (!exported.isTypeOnly) {
            exportedNames.add((exported.propertyName ?? exported.name).text);
          }
        }
      }
    }

    report.importCount = importedPaths.size;
    for (const source of librarySources) {
      if (!importedPaths.has(source.path)) {
        report.errors.push(`Missing import: ${source.relativePath}`);
      }
    }

    if (!iconList || !ts.isArrayLiteralExpression(iconList)) {
      report.errors.push(
        `Missing literal ${library.toUpperCase()}_ICON_LIST array`
      );
      return report;
    }

    const listedNames = new Set<string>();
    const listedPaths = new Set<string>();
    for (const element of iconList.elements) {
      const entry = unwrapExpression(element);
      if (!ts.isObjectLiteralExpression(entry)) {
        report.errors.push('Icon list entries must be object literals');
        continue;
      }
      const name = propertyValue(entry, 'name');
      const icon = propertyValue(entry, 'icon');
      if (
        !name ||
        !ts.isStringLiteral(name) ||
        !icon ||
        !ts.isIdentifier(icon)
      ) {
        report.errors.push(
          'Icon list entry must have a literal name and an imported icon'
        );
        continue;
      }

      report.listCount++;
      if (listedNames.has(name.text))
        report.errors.push(`Duplicate list name: ${name.text}`);
      listedNames.add(name.text);
      const importedPath = importedIcons.get(icon.text);
      const source = importedPath ? sourcePaths.get(importedPath) : undefined;
      if (!source) {
        report.errors.push(
          `List icon is not imported: ${name.text} (${icon.text})`
        );
        continue;
      }
      if (source.name !== name.text) {
        report.errors.push(
          `List name ${name.text} does not match source ${source.relativePath}`
        );
      }
      if (listedPaths.has(source.path)) {
        report.errors.push(
          `Icon appears more than once in the list: ${source.name}`
        );
      }
      listedPaths.add(source.path);
      if (!exportedNames.has(icon.text))
        report.errors.push(`Missing export: ${icon.text}`);
    }

    for (const source of librarySources) {
      if (!listedPaths.has(source.path))
        report.errors.push(`Missing list entry: ${source.name}`);
    }

    return report;
  });
}
