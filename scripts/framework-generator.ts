import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import type { PortableIcon, SvgNode } from './framework-sources';
import type { IconSource } from './icon-catalog';
import { ANIMATION_ENGINE_DEPENDENCIES } from './animation-engine';
import { extractProgramIcon } from './framework-program';
import { renderProgramFrameworkSource } from './framework-program-render';
import { extractPortableIcon, frameworkPath } from './framework-sources';
import { discoverIcons, getFiles, PROJECT_ROOT } from './icon-catalog';

export const FRAMEWORK_DEPENDENCIES = ANIMATION_ENGINE_DEPENDENCIES;
export type Framework = 'vue' | 'svelte';
export interface FrameworkSource extends IconSource {
  framework: Framework;
  frameworkPath: string;
  content: string;
  dependencies: string[];
}

const kebab = (value: string) =>
  value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

function markup(node: SvgNode, framework: Framework, depth = 2): string {
  const indent = ' '.repeat(depth);
  const attributes = Object.entries(node.attributes).map(([key, value]) => {
    if (value === '$size')
      return framework === 'vue' ? `:${key}="size"` : `${key}={size}`;
    if (key === 'style') {
      const style = Object.entries(value as Record<string, string>)
        .map(([property, item]) => `${kebab(property)}: ${item}`)
        .join('; ');
      return `style="${escape(style)}"`;
    }
    const name = ['viewBox', 'preserveAspectRatio', 'pathLength'].includes(key)
      ? key
      : kebab(key);
    return `${name}="${escape(String(value))}"`;
  });
  const opening = `${indent}<${node.tag} ${attributes.join(' ')}`;
  if (!node.children.length) return `${opening} />`;
  return `${opening}>\n${node.children.map((child) => markup(child, framework, depth + 2)).join('\n')}\n${indent}</${node.tag}>`;
}

function runtime(icon: PortableIcon, framework: Framework): string {
  const root = framework === 'vue' ? 'root.value' : 'root';
  const controlled = framework === 'vue' ? 'props.controlled' : 'controlled';
  return `
type State = 'normal' | 'animate';
type Part = {
  normal: DOMKeyframesDefinition & { transition?: AnimationOptions };
  animate: DOMKeyframesDefinition & { transition?: AnimationOptions };
  transition: AnimationOptions;
};

const parts = ${JSON.stringify(icon.parts, null, 2)} as unknown as Part[];
let animations: AnimationPlaybackControlsWithThen[] = [];
let sequence = 0;
let media: MediaQueryList | undefined;
let initialized = false;

function cancelAnimations() {
  animations.forEach((animation) => animation.stop());
  animations = [];
}

function run(state: State, instant = false) {
  const container = ${root};
  if (!container) return [];
  return parts.flatMap((part, index) => {
    const element = container.querySelector<SVGElement>(\`[data-icon-part="\${index}"]\`);
    if (!element) return [];
    const { transition, ...keyframes } = part[state];
    if (!Object.keys(keyframes).length) return [];
    const options: AnimationOptions = instant
      ? { duration: 0, delay: 0, type: 'tween' }
      : { ...part.transition, ...transition };
    const animation = animate(element, keyframes, options);
    if (instant) animation.complete();
    return [animation];
  });
}

${framework === 'svelte' ? 'export ' : ''}function startAnimation() {
  if (!media || media.matches) return;
  const current = ++sequence;
  cancelAnimations();
  initialized = true;
  run('normal', true);
  animations = run('animate');
  void Promise.all(animations).then(() => {
    if (sequence === current) {
      animations = [];
      run('normal', true);
    }
  });
}

${framework === 'svelte' ? 'export ' : ''}function stopAnimation() {
  sequence += 1;
  cancelAnimations();
  if (!initialized) return;
  animations = run('normal', Boolean(media?.matches));
}

function mountAnimation() {
  const container = ${root};
  if (!container) return () => {};
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const start = () => { if (!${controlled}) startAnimation(); };
  const stop = () => { if (!${controlled}) stopAnimation(); };
  const preferenceChanged = () => {
    if (media?.matches) stopAnimation();
  };
  container.addEventListener('mouseenter', start);
  container.addEventListener('mouseleave', stop);
  container.addEventListener('focusin', start);
  container.addEventListener('focusout', stop);
  media.addEventListener('change', preferenceChanged);
  if (!media.matches) {
    initialized = true;
    run('normal', true);
  }
  return () => {
    sequence += 1;
    cancelAnimations();
    container.removeEventListener('mouseenter', start);
    container.removeEventListener('mouseleave', stop);
    container.removeEventListener('focusin', start);
    container.removeEventListener('focusout', stop);
    media?.removeEventListener('change', preferenceChanged);
    media = undefined;
  };
}
`;
}

export function renderFrameworkSource(
  icon: PortableIcon,
  framework: Framework
): string {
  const imports = `import { animate } from 'motion';
import type { AnimationOptions, AnimationPlaybackControlsWithThen, DOMKeyframesDefinition } from 'motion';`;
  const license = icon.license ? `${icon.license}\n` : '';
  if (framework === 'vue') {
    return `<script setup lang="ts">
${license}${imports}
import { onMounted, onBeforeUnmount, shallowRef } from 'vue';

const props = withDefaults(defineProps<{ size?: number; controlled?: boolean }>(), {
  size: 28,
  controlled: false,
});
const root = shallowRef<HTMLDivElement>();
${runtime(icon, framework)}
let cleanup = () => {};
onMounted(() => { cleanup = mountAnimation(); });
onBeforeUnmount(() => cleanup());
defineExpose({ startAnimation, stopAnimation });
</script>

<template>
  <div ref="root">
${markup(icon.svg, framework, 4)}
  </div>
</template>
`;
  }
  return `<script lang="ts">
${license}${imports}
import { onMount } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Props = HTMLAttributes<HTMLDivElement> & { size?: number; controlled?: boolean };
let { size = 28, controlled = false, ...rest }: Props = $props();
let root: HTMLDivElement;
${runtime(icon, framework)}
onMount(mountAnimation);
</script>

<div bind:this={root} {...rest}>
${markup(icon.svg, framework)}
</div>
`;
}

export async function generateFrameworkSources(
  root = PROJECT_ROOT
): Promise<FrameworkSource[]> {
  const sources: FrameworkSource[] = [];
  for (const source of discoverIcons(root)) {
    const content = fs.readFileSync(source.path, 'utf8');
    const program = /forwardRef/.test(content)
      ? extractProgramIcon(source)
      : undefined;
    const icon = program ? undefined : extractPortableIcon(source);
    for (const framework of ['vue', 'svelte'] as const) {
      const destination = frameworkPath(source, framework, root);
      const content = program
        ? renderProgramFrameworkSource(program, framework)
        : renderFrameworkSource(icon!, framework);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, content);
      sources.push({
        ...source,
        framework,
        frameworkPath: destination,
        content,
        dependencies: FRAMEWORK_DEPENDENCIES,
      });
    }
  }
  const expected = new Set(sources.map((source) => source.frameworkPath));
  for (const framework of ['vue', 'svelte'] as const) {
    const directory = path.join(root, 'frameworks', framework);
    if (!fs.existsSync(directory)) continue;
    for (const file of getFiles(directory)) {
      if (file.endsWith(`.${framework}`) && !expected.has(file))
        fs.unlinkSync(file);
    }
  }
  return sources;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  void generateFrameworkSources().then((sources) => {
    console.log(
      `Generated ${sources.length} native Vue and Svelte components.`
    );
  });
}
