import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import type { IconSource } from './icon-catalog';
import {
  generateFrameworkSources,
  renderFrameworkSource,
} from './framework-generator';
import { extractPortableIcon } from './framework-sources';

const fixture = `<svg viewBox="0 0 24 24" width={size} height={size}>
  <motion.path d="M2 2L20 20" pathLength={1} initial="normal" animate={controls}
    custom={2} variants={{normal:{rotate:0},animate:(index:number)=>({rotate:[0,index*10,0],transition:{duration:0.5}})}} />
</svg>`;

function withSource(content: string, callback: (source: IconSource) => void) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'icon-framework-test-'));
  const file = path.join(root, 'fixture.tsx');
  fs.writeFileSync(file, `const Icon = () => (${content});`);
  try {
    callback({
      library: 'hugeicons',
      name: 'fixture',
      registryName: 'hugeicons-fixture',
      path: file,
      relativePath: 'fixture.tsx',
    });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('portable sources preserve native SVG and resolve custom variants', () => {
  withSource(fixture, (source) => {
    const icon = extractPortableIcon(source);
    assert.deepEqual(icon.parts[0].animate.rotate, [0, 20, 0]);
    for (const framework of ['vue', 'svelte'] as const) {
      assert.match(renderFrameworkSource(icon, framework), /pathLength="1"/);
    }
  });
});

for (const [label, content] of [
  ['Motion gestures', fixture.replace('custom={2}', 'whileHover={{scale:2}}')],
  ['layout animations', fixture.replace('custom={2}', 'layout')],
  [
    'non-normal initial state',
    fixture.replace('initial="normal"', 'initial="animate"'),
  ],
  [
    'dynamic SVG children',
    fixture.replace('</svg>', '{nodes.map(renderNode)}</svg>'),
  ],
] as const) {
  test(`unsupported ${label} fail instead of becoming static markup`, () => {
    withSource(content, (source) =>
      assert.throws(
        () => extractPortableIcon(source),
        /Unsupported|Only the normal/
      )
    );
  });
}

test('regeneration removes orphaned framework components', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'icon-framework-test-'));
  try {
    for (const library of ['hugeicons', 'tabler', 'phosphor', 'heroicons']) {
      fs.mkdirSync(path.join(root, 'icons', library), { recursive: true });
    }
    const file = path.join(root, 'icons', 'hugeicons', 'fixture.tsx');
    fs.writeFileSync(file, `const Icon = () => (${fixture});`);
    const sources = await generateFrameworkSources(root);
    assert.equal(sources.length, 2);
    fs.unlinkSync(file);
    assert.deepEqual(await generateFrameworkSources(root), []);
    for (const source of sources)
      assert.equal(fs.existsSync(source.frameworkPath), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('program sources retain named controllers, ordered phases, functions and infinite repeats', async () => {
  const { extractProgramIcon } = await import('./framework-program');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'icon-program-test-'));
  const file = path.join(root, 'program.tsx');
  fs.writeFileSync(
    file,
    `import {forwardRef,useImperativeHandle,useId} from 'react';
import {motion,useAnimation} from 'motion/react';
const Icon=forwardRef(({size=28},ref)=>{
  const lines=useAnimation();const body=useAnimation();const id=useId();
  useImperativeHandle(ref,()=>({startAnimation:async()=>{body.start('pulse');await lines.start('hidden');return lines.start('draw',{delay:0.2});},stopAnimation:()=>lines.start('visible')}));
  return <div><svg width={size} height={size} viewBox="0 0 24 24"><defs><mask id={id}><path d="M0 0L24 24" /></mask></defs><motion.g animate={body} variants={{pulse:{scale:[1,1.2,1],transition:{repeat:Infinity}}}}><motion.path animate={lines} initial="visible" custom={2} variants={{visible:{opacity:1},hidden:{opacity:0},draw:(index)=>({opacity:1,transition:{delay:index*0.1}})}} mask={'url(#'+id+')'} d="M2 2L20 20" /></motion.g></svg></div>;
});export {Icon};`
  );
  try {
    const icon = extractProgramIcon({
      library: 'hugeicons',
      name: 'program',
      registryName: 'hugeicons-program',
      path: file,
      relativePath: 'program.tsx',
    });
    assert.match(icon.program, /await lines.start\('hidden'\)/);
    assert.match(icon.program, /repeat: Infinity/);
    assert.match(icon.program, /draw: \(index\)/);
    const { renderProgramFrameworkSource } =
      await import('./framework-program-render');
    for (const framework of ['vue', 'svelte'] as const) {
      const content = renderProgramFrameworkSource(icon, framework);
      assert.match(content, /SVGVisualElement/);
      assert.match(content, /instanceId/);
      assert.doesNotMatch(content, /from ['"]react/);
      assert.doesNotMatch(content, /new Function|eval\(/);
      assert.doesNotMatch(content, /run\('normal'/);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('program sources reject external runtime imports before evaluating module code', async () => {
  const { extractProgramIcon } = await import('./framework-program');
  withSource('null', (source) => {
    fs.writeFileSync(
      source.path,
      "import fs from 'node:fs';const Icon=()=>null;export {Icon};"
    );
    assert.throws(
      () => extractProgramIcon(source),
      /unsupported program import node:fs/
    );
  });
});

test('native program generation keeps SVG case-sensitive attributes and initial opacity', async () => {
  const { extractProgramIcon } = await import('./framework-program');
  const { renderProgramFrameworkSource } =
    await import('./framework-program-render');
  withSource('null', (source) => {
    fs.writeFileSync(
      source.path,
      `import {forwardRef} from 'react';import {motion} from 'motion/react';
const Icon=forwardRef(()=> <div><svg viewBox="0 0 24 24"><defs><pattern id="pattern" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0 0L6 6" /></pattern></defs><motion.path initial="hidden" variants={{hidden:{opacity:0}}} d="M2 2L20 20" /></svg></div>);export {Icon};`
    );
    const icon = extractProgramIcon(source);
    for (const framework of ['vue', 'svelte'] as const) {
      const generated = renderProgramFrameworkSource(icon, framework);
      assert.match(generated, /patternUnits="userSpaceOnUse"/);
      assert.doesNotMatch(generated, /pattern-units=/);
      assert.match(generated, /style="opacity: 0"/);
    }
  });
});

test('native program generation refuses unimplemented Motion gestures', async () => {
  const { extractProgramIcon } = await import('./framework-program');
  withSource('null', (source) => {
    fs.writeFileSync(
      source.path,
      `import {forwardRef} from 'react';import {motion} from 'motion/react';const Icon=forwardRef(()=> <div><motion.svg whileHover={{scale:2}} /></div>);export {Icon};`
    );
    assert.throws(
      () => extractProgramIcon(source),
      /unsupported Motion program property whileHover/
    );
  });
});

test('SSR preserves inherited initial variants through SVG groups and fragments', async () => {
  const { extractProgramIcon } = await import('./framework-program');
  const { renderProgramFrameworkSource } =
    await import('./framework-program-render');
  withSource('null', (source) => {
    fs.writeFileSync(
      source.path,
      `import {forwardRef,Fragment} from 'react';import {motion} from 'motion/react';
const Icon=forwardRef(()=> <div><motion.svg initial="hidden"><g><Fragment><motion.path variants={{hidden:{opacity:0}}} d="M2 2L20 20" /></Fragment></g></motion.svg></div>);export {Icon};`
    );
    const icon = extractProgramIcon(source);
    for (const framework of ['vue', 'svelte'] as const) {
      const generated = renderProgramFrameworkSource(icon, framework);
      assert.match(generated, /<path[^>]*style="opacity: 0"/);
    }
  });
});

test('useId masks and public APIs typecheck in strict Vue and Svelte consumers', async () => {
  const { extractProgramIcon } = await import('./framework-program');
  const { renderProgramFrameworkSource } =
    await import('./framework-program-render');
  const require = createRequire(import.meta.url);
  withSource('null', (source) => {
    fs.writeFileSync(
      source.path,
      `import {forwardRef,useId} from 'react';
const Icon=forwardRef(({size=28})=>{const id=useId();return <div><svg width={size} height={size} viewBox="0 0 24 24"><defs><mask id={id+'-bar'}><path d="M0 0L24 24" /></mask></defs><path mask={'url(#'+id+'-bar)'} data-label={id+${JSON.stringify('"\'&<>{}\\\n')}} d="M2 2L20 20" /></svg></div>});export {Icon};`
    );
    const icon = extractProgramIcon(source);
    const directory = path.dirname(source.path);
    fs.symlinkSync(
      fileURLToPath(new URL('../node_modules', import.meta.url)),
      path.join(directory, 'node_modules'),
      'dir'
    );
    for (const framework of ['vue', 'svelte'] as const) {
      const generated = renderProgramFrameworkSource(icon, framework);
      assert.match(generated, /<script[^>]*lang="ts">/);
      if (framework === 'vue') {
        assert.match(generated, /:id="instanceId \+ '-0' \+ '-bar'"/);
        assert.match(
          generated,
          /:mask="'url\(#' \+ instanceId \+ '-0' \+ '-bar\)'"/
        );
        assert.doesNotMatch(
          generated,
          /:[\w-]+="[^"]*&(?:quot|amp|lt|gt|#\d+);/
        );
      }
      const component = `MaskedIcon.${framework}`;
      const consumer = `Consumer.${framework}`;
      fs.writeFileSync(path.join(directory, component), generated);
      const consumerSource =
        framework === 'vue'
          ? `<script setup lang="ts">
import {ref} from 'vue';import MaskedIcon from './${component}';
const icon=ref<InstanceType<typeof MaskedIcon>>();
function start(){icon.value?.startAnimation();icon.value?.stopAnimation();}
</script><template><button @click="start">Animate</button><MaskedIcon ref="icon" :size="28" /></template>`
          : `<script lang="ts">
import MaskedIcon from './${component}';
let icon=$state<ReturnType<typeof MaskedIcon>>();
function start(){icon?.startAnimation();icon?.stopAnimation();}
</script><button onclick={start}>Animate</button><MaskedIcon bind:this={icon} size={28} />`;
      fs.writeFileSync(path.join(directory, consumer), consumerSource);
      fs.writeFileSync(
        path.join(directory, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'Bundler',
            strict: true,
            allowJs: false,
            skipLibCheck: true,
            noEmit: true,
            types: [],
            lib: ['ES2022', 'DOM'],
          },
          include: [component, consumer],
        })
      );
      const check = () =>
        spawnSync(
          process.execPath,
          framework === 'vue'
            ? [require.resolve('vue-tsc/bin/vue-tsc.js'), '--noEmit']
            : [
                require.resolve('svelte-check/bin/svelte-check'),
                '--tsconfig',
                './tsconfig.json',
                '--fail-on-warnings',
              ],
          { cwd: directory, encoding: 'utf8' }
        );
      const result = check();
      assert.equal(result.status, 0, result.stdout + result.stderr);
      fs.writeFileSync(
        path.join(directory, consumer),
        consumerSource
          .replace('startAnimation()', 'notAnExport()')
          .replace(
            framework === 'vue' ? ':size="28"' : 'size={28}',
            'size="invalid"'
          )
      );
      const invalid = check();
      assert.notEqual(
        invalid.status,
        0,
        `${framework} must reject invalid public API usage`
      );
      assert.match(invalid.stdout + invalid.stderr, /notAnExport/);
      assert.match(
        invalid.stdout + invalid.stderr,
        /not assignable to type 'number/
      );
      fs.unlinkSync(path.join(directory, consumer));
      fs.unlinkSync(path.join(directory, component));
    }
  });
});
