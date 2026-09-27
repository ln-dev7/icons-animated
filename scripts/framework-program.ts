import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

import type { IconSource } from './icon-catalog';

export interface ProgramNode {
  tag: string;
  props: Record<string, unknown>;
  children: (ProgramNode | string | number)[];
}

export interface ProgramIcon {
  source: IconSource;
  license: string;
  program: string;
  tree: ProgramNode;
}

// The generated components contain ordinary JavaScript, never eval/Function.
// The VM is used only while building local, reviewed source files. No I/O or
// modules are exposed, and an execution timeout prevents a broken source loop.
export function extractProgramIcon(source: IconSource): ProgramIcon {
  const content = fs.readFileSync(source.path, 'utf8');
  const file = ts.createSourceFile(
    source.path,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  let component: string | undefined;
  const allowedImports = new Set([
    'react',
    'motion/react',
    'motion',
    '@/lib/utils',
  ]);
  const runtimeImports = new Set<string>();
  const statements: ts.Statement[] = [];
  for (const statement of file.statements) {
    if (ts.isImportDeclaration(statement)) {
      const moduleName = (statement.moduleSpecifier as ts.StringLiteral).text;
      if (statement.importClause?.isTypeOnly) continue;
      if (!allowedImports.has(moduleName))
        throw new Error(
          `${source.relativePath}: unsupported program import ${moduleName}`
        );
      const bindings = statement.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) {
        for (const item of bindings.elements)
          if (!item.isTypeOnly) {
            if (item.propertyName)
              throw new Error(`${source.relativePath}: aliased runtime import`);
            runtimeImports.add(item.name.text);
          }
      }
      continue;
    }
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        const value = statement.exportClause.elements.find(
          (item) => !item.isTypeOnly
        );
        if (value) component = (value.propertyName ?? value.name).text;
      }
      continue;
    }
    if (
      ts.isExpressionStatement(statement) &&
      ts.isStringLiteral(statement.expression)
    )
      continue;
    if (
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement)
    )
      continue;
    if (
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
      )
    ) {
      const declaration = statement.declarationList.declarations[0];
      if (ts.isIdentifier(declaration.name)) component = declaration.name.text;
    }
    statements.push(statement);
  }
  if (!component)
    throw new Error(`${source.relativePath}: missing component export`);
  const printer = ts.createPrinter();
  const body = statements
    .map((statement) =>
      printer
        .printNode(ts.EmitHint.Unspecified, statement, file)
        .replace(/^export /, '')
        // Native hosts expose the imperative API even when uncontrolled. Preserve
        // the source's mouse handler branch without forcing its controlled flag.
        .replace(
          /(\b\w*[Cc]ontrolled\w*\.current\s*=\s*)true/g,
          '$1ref != null'
        )
    )
    .join('\n');
  const transpiled = ts.transpileModule(body, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.None,
      jsx: ts.JsxEmit.React,
      jsxFactory: 'iconNode',
      jsxFragmentFactory: 'Fragment',
      removeComments: false,
    },
  }).outputText;
  const bindings = [...new Set([...runtimeImports, 'iconNode', 'Fragment'])]
    .sort()
    .join(', ');
  const program = `function createIconProgram(api) {\n  const { ${bindings} } = api;\n${transpiled}\n  return ${component};\n}`;
  const capture = new vm.Script(
    `
    ${program}
    const flat = values => values.flat(Infinity).filter(value => value !== null && value !== undefined && value !== false && value !== true);
    let capturedId = 0;
    const api = {
      iconNode: (tag, props, ...children) => ({tag, props: props || {}, children:flat(children)}),
      motion: new Proxy({}, {get: (_, key) => 'motion.' + key}),
      Fragment: 'fragment', AnimatePresence: 'presence',
      forwardRef: component => component,
      useAnimation: () => ({__controller: true, start: () => Promise.resolve(), set() {}, stop() {}}),
      useAnimationControls: () => ({__controller: true, start: () => Promise.resolve(), set() {}, stop() {}}),
      useId: () => '__icon_id_' + capturedId++ + '__',
      useRef: value => ({current: value}),
      useCallback: callback => callback,
      useMemo: callback => callback(),
      useState: value => [typeof value === 'function' ? value() : value, () => {}],
      useEffect() {}, useLayoutEffect() {}, useImperativeHandle() {},
      useReducedMotion: () => false,
      cn: (...values) => values.filter(Boolean).join(' '),
      cubicBezier: (...points) => points,
      easeInOut: 'easeInOut', easeOut: 'easeOut', easeIn: 'easeIn',
    };
    const component = createIconProgram(api);
    component({size: '$size'}, {});
  `,
    { filename: source.relativePath }
  );
  const tree = capture.runInNewContext({}, { timeout: 1000 }) as ProgramNode;
  const unsupportedMotion = new Set([
    'whileHover',
    'whileTap',
    'whileDrag',
    'whileFocus',
    'whileInView',
    'drag',
    'layout',
    'layoutId',
    'transformTemplate',
    'onUpdate',
    'onAnimationComplete',
  ]);
  const validate = (node: ProgramNode | string | number) => {
    if (typeof node !== 'object') return;
    if (node.tag.startsWith('motion.'))
      for (const name of Object.keys(node.props)) {
        if (unsupportedMotion.has(name))
          throw new Error(
            `${source.relativePath}: unsupported Motion program property ${name}`
          );
      }
    node.children.forEach(validate);
  };
  validate(tree);
  if (!tree || tree.tag !== 'div')
    throw new Error(`${source.relativePath}: expected a single div wrapper`);
  return {
    source,
    license: content.match(/^\/\*\*[\s\S]*?\*\//)?.[0] ?? '',
    program,
    tree,
  };
}
