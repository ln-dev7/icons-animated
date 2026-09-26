import fs from 'fs';
import path from 'path';
import ts from 'typescript';

import type { IconSource } from './icon-catalog';

type Value =
  | string
  | number
  | boolean
  | null
  | Value[]
  | { [key: string]: Value };
type ExpressionValue = Value | ((custom: Value) => Value);
type ObjectValue = Record<string, ExpressionValue>;

export interface AnimationPart {
  normal: Record<string, Value>;
  animate: Record<string, Value>;
  transition: Record<string, Value>;
}

export interface SvgNode {
  tag: string;
  attributes: Record<string, Value>;
  children: SvgNode[];
}

export interface PortableIcon {
  source: IconSource;
  license: string;
  svg: SvgNode;
  parts: AnimationPart[];
}

function object(value: ExpressionValue, label: string): ObjectValue {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Expected an object for ${label}`);
  }
  return value;
}

function evaluate(node: ts.Expression, scope: ObjectValue): ExpressionValue {
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) {
    return evaluate(node.expression, scope);
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node) && node.text in scope) return scope[node.text];
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => evaluate(element, scope)) as Value[];
  }
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(
      node.properties.flatMap((property) => {
        if (ts.isSpreadAssignment(property)) {
          return Object.entries(
            object(evaluate(property.expression, scope), 'spread')
          );
        }
        if (
          !ts.isPropertyAssignment(property) ||
          (!ts.isIdentifier(property.name) &&
            !ts.isStringLiteral(property.name))
        ) {
          throw new Error(`Unsupported object property: ${property.getText()}`);
        }
        return [[property.name.text, evaluate(property.initializer, scope)]];
      })
    ) as Value;
  }
  if (
    ts.isArrowFunction(node) &&
    node.parameters.length === 1 &&
    ts.isIdentifier(node.parameters[0].name) &&
    !ts.isBlock(node.body)
  ) {
    const name = node.parameters[0].name.text;
    const body = node.body;
    return (custom) => evaluate(body, { ...scope, [name]: custom }) as Value;
  }
  if (ts.isConditionalExpression(node)) {
    return evaluate(
      evaluate(node.condition, scope) ? node.whenTrue : node.whenFalse,
      scope
    );
  }
  if (ts.isPrefixUnaryExpression(node)) {
    const operand = evaluate(node.operand, scope);
    if (typeof operand === 'number') {
      if (node.operator === ts.SyntaxKind.MinusToken) return -operand;
      if (node.operator === ts.SyntaxKind.PlusToken) return operand;
    }
  }
  if (ts.isBinaryExpression(node)) {
    const left = evaluate(node.left, scope);
    const right = evaluate(node.right, scope);
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) {
      return left === right;
    }
    if (typeof left === 'number' && typeof right === 'number') {
      if (node.operatorToken.kind === ts.SyntaxKind.AsteriskToken)
        return left * right;
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken)
        return left + right;
      if (node.operatorToken.kind === ts.SyntaxKind.MinusToken)
        return left - right;
      if (node.operatorToken.kind === ts.SyntaxKind.SlashToken)
        return left / right;
    }
  }
  if (ts.isCallExpression(node) && node.expression.getText() === 'Math.min') {
    const values = node.arguments.map((argument) => evaluate(argument, scope));
    if (values.every((value) => typeof value === 'number'))
      return Math.min(...values);
  }
  throw new Error(`Unsupported portable icon expression: ${node.getText()}`);
}

const motionAttributes = new Set([
  'variants',
  'animate',
  'initial',
  'custom',
  'transition',
]);
const svgTags = new Set([
  'svg',
  'g',
  'path',
  'circle',
  'ellipse',
  'rect',
  'line',
  'polyline',
  'polygon',
]);
const svgAttributes = new Set([
  'xmlns',
  'width',
  'height',
  'viewBox',
  'preserveAspectRatio',
  'fill',
  'stroke',
  'strokeWidth',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeDasharray',
  'strokeDashoffset',
  'fillRule',
  'clipRule',
  'overflow',
  'aria-hidden',
  'focusable',
  'style',
  'opacity',
  'd',
  'points',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'pathLength',
  'transform',
]);

export function extractPortableIcon(source: IconSource): PortableIcon {
  const content = fs.readFileSync(source.path, 'utf8');
  const file = ts.createSourceFile(
    source.path,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const scope: ObjectValue = {};
  const parts: AnimationPart[] = [];
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        /^[A-Z][A-Z0-9_]+$/.test(declaration.name.text) &&
        declaration.initializer
      ) {
        scope[declaration.name.text] = evaluate(declaration.initializer, scope);
      }
    }
  }

  function parse(node: ts.JsxElement | ts.JsxSelfClosingElement): SvgNode {
    const opening = ts.isJsxElement(node) ? node.openingElement : node;
    const rawTag = opening.tagName.getText(file);
    const tag = rawTag.replace(/^motion\./, '');
    if (!svgTags.has(tag)) throw new Error(`Unsupported SVG tag: ${rawTag}`);
    const attributes: Record<string, Value> = {};
    const motion: ObjectValue = {};
    for (const attribute of opening.attributes.properties) {
      if (!ts.isJsxAttribute(attribute))
        throw new Error('SVG spreads cannot be ported');
      const name = attribute.name.getText(file);
      if (!svgAttributes.has(name) && !motionAttributes.has(name)) {
        throw new Error(`Unsupported SVG or Motion attribute: ${name}`);
      }
      if (
        (name === 'width' || name === 'height') &&
        attribute.initializer?.getText(file) === '{size}'
      ) {
        attributes[name] = '$size';
        continue;
      }
      if (name === 'animate') {
        if (attribute.initializer?.getText(file) !== '{controls}') {
          throw new Error('Only the shared animation controller is portable');
        }
        continue;
      }
      let value: ExpressionValue = true;
      if (attribute.initializer) {
        if (
          !ts.isStringLiteral(attribute.initializer) &&
          !ts.isJsxExpression(attribute.initializer)
        ) {
          throw new Error(
            `Unsupported JSX attribute: ${attribute.getText(file)}`
          );
        }
        value = ts.isStringLiteral(attribute.initializer)
          ? attribute.initializer.text
          : attribute.initializer.expression
            ? evaluate(attribute.initializer.expression, scope)
            : true;
      }
      if (name === 'initial' && value !== 'normal') {
        throw new Error('Only the normal initial variant is portable');
      }
      if (motionAttributes.has(name)) motion[name] = value;
      else attributes[name] = value as Value;
    }
    if (rawTag.startsWith('motion.')) {
      if (!motion.variants) throw new Error(`Animated ${tag} lacks variants`);
      const variants = object(motion.variants, 'variants');
      const resolved = (state: 'normal' | 'animate') => {
        const definition = variants[state];
        const value =
          typeof definition === 'function'
            ? definition(motion.custom as Value)
            : definition;
        return object(value, state) as Record<string, Value>;
      };
      attributes['data-icon-part'] = String(parts.length);
      parts.push({
        normal: resolved('normal'),
        animate: resolved('animate'),
        transition: motion.transition
          ? (object(motion.transition, 'transition') as Record<string, Value>)
          : {},
      });
    }
    const children = ts.isJsxElement(node)
      ? node.children.flatMap((child) => {
          if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child))
            return [parse(child)];
          if (ts.isJsxText(child) && !child.text.trim()) return [];
          if (ts.isJsxExpression(child) && !child.expression) return [];
          throw new Error(
            `Unsupported dynamic SVG child: ${child.getText(file)}`
          );
        })
      : [];
    return { tag, attributes, children };
  }

  let svg: SvgNode | undefined;
  function visit(node: ts.Node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node;
      if (['svg', 'motion.svg'].includes(opening.tagName.getText(file))) {
        if (svg) throw new Error('Multiple SVG roots are not supported');
        svg = parse(node);
        return;
      }
    }
    ts.forEachChild(node, visit);
  }
  try {
    visit(file);
  } catch (error) {
    throw new Error(`${source.relativePath}: ${(error as Error).message}`);
  }
  if (!svg || !parts.length)
    throw new Error(`${source.relativePath}: no animated SVG`);
  svg.attributes['aria-hidden'] = 'true';
  svg.attributes.focusable = 'false';
  return {
    source,
    license: content.match(/^\/\*\*[\s\S]*?\*\//)?.[0] ?? '',
    svg,
    parts,
  };
}

export function frameworkPath(
  source: IconSource,
  framework: 'vue' | 'svelte',
  root: string
) {
  return path.join(
    root,
    'frameworks',
    framework,
    source.library,
    `${source.name}.${framework}`
  );
}
