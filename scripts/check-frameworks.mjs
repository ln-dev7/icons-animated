import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(
  path.resolve(process.env.FRAMEWORK_COMPILER_ROOT || root, 'package.json')
);
const vue = require('@vue/compiler-sfc');
const svelte = require('svelte/compiler');
const { discoverIcons, getFiles } = await import('./icon-catalog.ts');
const { extractPortableIcon, frameworkPath } =
  await import('./framework-sources.ts');
const { renderFrameworkSource } = await import('./framework-generator.ts');
const reports = { vue: 0, svelte: 0, animationParts: 0 };
const expected = { vue: [], svelte: [] };

for (const source of discoverIcons(root)) {
  const icon = extractPortableIcon(source);
  reports.animationParts += icon.parts.length;
  for (const framework of ['vue', 'svelte']) {
    const filename = frameworkPath(source, framework, root);
    expected[framework].push(filename);
    const content = fs.readFileSync(filename, 'utf8');
    assert.equal(
      content,
      renderFrameworkSource(icon, framework),
      `Stale generated component: ${filename}`
    );
    if (framework === 'vue') {
      const { descriptor, errors } = vue.parse(content, { filename });
      assert.deepEqual(errors, [], `Vue parsing: ${filename}`);
      const script = vue.compileScript(descriptor, { id: source.registryName });
      const template = vue.compileTemplate({
        source: descriptor.template.content,
        filename,
        id: source.registryName,
        compilerOptions: { bindingMetadata: script.bindings },
      });
      assert.deepEqual(template.errors, [], `Vue template: ${filename}`);
    } else {
      const result = svelte.compile(content, { filename, generate: 'client' });
      assert.deepEqual(result.warnings, [], `Svelte warnings: ${filename}`);
      svelte.compile(content, { filename, generate: 'server' });
    }
    reports[framework] += 1;
  }
}

for (const framework of ['vue', 'svelte']) {
  const actual = getFiles(path.join(root, 'frameworks', framework)).filter(
    (file) => file.endsWith(`.${framework}`)
  );
  assert.deepEqual(
    actual,
    expected[framework].sort(),
    `Orphan ${framework} components`
  );
}

console.log(JSON.stringify({ ...reports, result: 'pass' }));
