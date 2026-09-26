import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

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
    for (const library of ['hugeicons', 'tabler', 'phosphor']) {
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
