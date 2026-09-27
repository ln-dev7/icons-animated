import {
  buildSVGAttrs,
  camelCaseAttributes,
  isControllingVariants,
  isVariantNode,
  resolveMotionValue,
  resolveVariantFromProps,
  scrapeSVGMotionValuesFromProps,
} from 'motion';

import type { ProgramIcon, ProgramNode } from './framework-program';
import {
  PROGRAM_RUNTIME,
  SVG_CASE_SENSITIVE_ATTRIBUTES,
} from './framework-runtime';

const svgCaseAttributes = new Set([
  ...camelCaseAttributes,
  ...SVG_CASE_SENSITIVE_ATTRIBUTES,
]);
const ignored = new Set([
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'custom',
  'inherit',
  'key',
  'ref',
  'children',
]);
const kebab = (key: string) =>
  key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const escape = (value: unknown) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('{', '&#123;')
    .replaceAll('}', '&#125;');
const expressionString = (value: string) =>
  `'${Array.from(value, (character) =>
    /['"&<>{}]/.test(character)
      ? `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`
      : JSON.stringify(character).slice(1, -1)
  ).join('')}'`;

function attributes(
  props: Record<string, unknown>,
  framework: 'vue' | 'svelte'
) {
  return Object.entries(props)
    .flatMap(([key, value]) => {
      if (
        ignored.has(key) ||
        key.startsWith('on') ||
        value == null ||
        typeof value === 'function'
      )
        return [];
      if (value === '$size')
        return [framework === 'vue' ? `:${key}="size"` : `${key}={size}`];
      if (key === 'style') {
        const content = Object.entries(value as Record<string, unknown>)
          .filter(([key]) => !['originX', 'originY'].includes(key))
          .map(([name, item]) => `${kebab(name)}: ${item}`)
          .join('; ');
        return content ? [`style="${escape(content)}"`] : [];
      }
      const name = svgCaseAttributes.has(key)
        ? key
        : key === 'className'
          ? 'class'
          : kebab(key);
      if (typeof value === 'string' && /__icon_id_\d+__/.test(value)) {
        const expression = value
          .split(/(__icon_id_\d+__)/)
          .filter(Boolean)
          .map((part) => {
            const match = part.match(/^__icon_id_(\d+)__$/);
            return match
              ? `instanceId + '-${match[1]}'`
              : framework === 'vue'
                ? expressionString(part)
                : JSON.stringify(part);
          })
          .join(' + ');
        return [
          framework === 'vue'
            ? `:${name}="${expression}"`
            : `${name}={${expression}}`,
        ];
      }
      return [`${name}="${escape(value)}"`];
    })
    .join(' ');
}

function markup(
  node: ProgramNode | string | number,
  framework: 'vue' | 'svelte',
  id: string,
  depth = 2,
  inheritedInitial?: unknown,
  presenceBlocked = false
): string {
  const indent = ' '.repeat(depth);
  if (typeof node !== 'object') return `${indent}${escape(node)}`;
  const virtualGroup = node.tag === 'fragment' || node.tag === 'presence';
  const tag = virtualGroup ? 'g' : node.tag.replace(/^motion\./, '');
  let props = node.props;
  let initial = node.tag.startsWith('motion.')
    ? props.initial
    : (props.initial ?? inheritedInitial);
  if (
    initial === undefined &&
    isVariantNode(props) &&
    !isControllingVariants(props) &&
    props.inherit !== false
  )
    initial = inheritedInitial;
  const blocked = presenceBlocked || initial === false;
  if (node.tag.startsWith('motion.')) {
    const latest: Record<string, unknown> = {};
    const scraped = scrapeSVGMotionValuesFromProps(props, {});
    for (const key in scraped) latest[key] = resolveMotionValue(scraped[key]);
    const target = blocked ? props.animate : initial;
    if (
      target &&
      typeof target !== 'boolean' &&
      !(typeof target === 'object' && '__controller' in target)
    ) {
      for (const definition of Array.isArray(target) ? target : [target]) {
        const resolved = resolveVariantFromProps(props, definition);
        if (!resolved) continue;
        const { transitionEnd, ...values } = resolved;
        delete values.transition;
        for (const [key, raw] of Object.entries(values)) {
          const value = Array.isArray(raw)
            ? raw[blocked ? raw.length - 1 : 0]
            : raw;
          if (value !== null) latest[key] = value;
        }
        Object.assign(latest, transitionEnd);
      }
    }
    const state = {
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {},
      attrs: {},
    };
    buildSVGAttrs(
      state,
      latest as Parameters<typeof buildSVGAttrs>[1],
      tag === 'svg',
      undefined,
      props.style as Record<string, unknown>
    );
    props = {
      ...props,
      ...state.attrs,
      style: { ...(props.style as Record<string, unknown>), ...state.style },
    };
  }
  const attrs = virtualGroup ? '' : attributes(props, framework);
  const opening = `${indent}<${tag} data-icon-node="${id}" ${attrs}`;
  if (!node.children.length) return `${opening} />`;
  return `${opening}>\n${node.children.map((child, index) => markup(child, framework, `${id}.${index}`, depth + 2, initial, node.tag === 'presence' && node.props.initial === false ? true : presenceBlocked)).join('\n')}\n${indent}</${tag}>`;
}

export function renderProgramFrameworkSource(
  icon: ProgramIcon,
  framework: 'vue' | 'svelte'
) {
  const wrapperAttributes = attributes(icon.tree.props, framework);
  const wrapperClass =
    typeof icon.tree.props.className === 'string'
      ? icon.tree.props.className
      : '';
  const license = icon.license ? `${icon.license}\n` : '';
  const imports = `import { SVGVisualElement, animateVisualElement, setTarget, scrapeSVGMotionValuesFromProps, resolveMotionValue, resolveVariantFromProps, isControllingVariants, isVariantNode, getDefaultValueType, visualElementStore, camelCaseAttributes, cubicBezier, easeInOut, easeOut, easeIn } from 'motion';`;
  if (framework === 'vue')
    return `<script setup lang="ts">
// @ts-nocheck
${license}${imports}
import { onMounted, onBeforeUnmount, shallowRef, useId, watch } from 'vue';
const props = defineProps({ size: { type: Number, default: 28 }, controlled: { type: Boolean, default: false } });
const root = shallowRef();
const instanceId = useId();
${icon.program}
${PROGRAM_RUNTIME}
let controller;
function startAnimation() { return controller?.startAnimation(); }
function stopAnimation() { return controller?.stopAnimation(); }
onMounted(() => { controller = mountIconProgram(createIconProgram, root.value, () => props.size, () => props.controlled, instanceId); });
watch(() => [props.size, props.controlled], () => controller?.update());
onBeforeUnmount(() => controller?.destroy());
defineExpose({ startAnimation, stopAnimation });
</script>

<template>
  <div ref="root" ${wrapperAttributes}>
${icon.tree.children.map((child, index) => markup(child, framework, String(index), 4)).join('\n')}
  </div>
</template>
`;
  return `<script lang="ts">
// @ts-nocheck
${license}${imports}
import { onMount } from 'svelte';
let { size = 28, controlled = false, ...rest } = $props();
let root;
const instanceId = $props.id();
${icon.program}
${PROGRAM_RUNTIME}
let controller;
export function startAnimation() { return controller?.startAnimation(); }
export function stopAnimation() { return controller?.stopAnimation(); }
$effect(() => { size; controlled; controller?.update(); });
onMount(() => {
  controller = mountIconProgram(createIconProgram, root, () => size, () => controlled, instanceId);
  return () => controller?.destroy();
});
</script>

<div ${attributes(Object.fromEntries(Object.entries(icon.tree.props).filter(([key]) => key !== 'className')), framework)} bind:this={root} {...rest} class={[${JSON.stringify(wrapperClass)}, rest.class].filter(Boolean).join(' ')}>
${icon.tree.children.map((child, index) => markup(child, framework, String(index), 2)).join('\n')}
</div>
`;
}
