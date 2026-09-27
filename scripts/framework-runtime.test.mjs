import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import * as vue from '@vue/compiler-sfc';
import { build } from 'esbuild';
import { chromium } from 'playwright';
import * as svelte from 'svelte/compiler';

const require = createRequire(import.meta.url);
const { extractProgramIcon } = require('./framework-program.ts');
const {
  renderProgramFrameworkSource,
} = require('./framework-program-render.ts');
const scripts = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(scripts);
const fixtures = path.join(scripts, 'framework-runtime-fixtures');
const cases = [
  { name: 'heart', library: 'hugeicons', file: 'heart' },
  { name: 'volume', library: 'tabler', file: 'volume' },
  { name: 'wifi-low', library: 'hugeicons', file: 'wifi-low' },
];

async function prepareSources(directory) {
  const imports = [];
  const entries = [];
  for (const [index, fixture] of cases.entries()) {
    const relativePath = `icons/${fixture.library}/${fixture.file}.tsx`;
    const sourcePath = path.join(root, relativePath);
    const content = await fs.readFile(sourcePath, 'utf8');
    const exportName = content.match(/export\s*\{\s*(\w+)\s*\}/)?.[1];
    assert.ok(exportName, `${relativePath} must have a named icon export`);
    const icon = extractProgramIcon({
      name: fixture.file,
      library: fixture.library,
      registryName: `${fixture.library}-${fixture.file}`,
      relativePath,
      path: sourcePath,
    });
    imports.push(
      `import {${exportName} as R${index}} from ${JSON.stringify(sourcePath)};`
    );
    for (const framework of ['vue', 'svelte']) {
      const target = path.join(directory, `${fixture.name}.${framework}`);
      await fs.writeFile(target, renderProgramFrameworkSource(icon, framework));
      imports.push(
        `import ${framework === 'vue' ? 'V' : 'S'}${index} from ${JSON.stringify(target)};`
      );
    }
    entries.push(
      `{name:${JSON.stringify(fixture.name)},react:R${index},vue:V${index},svelte:S${index}}`
    );
  }
  return { imports: imports.join('\n'), entries: `[${entries.join(',')}]` };
}

async function bundle(source, serverRendering = false) {
  const result = await build({
    stdin: {
      contents: source,
      resolveDir: root,
      sourcefile: 'framework-runtime-harness.mjs',
    },
    bundle: true,
    write: false,
    platform: serverRendering ? 'node' : 'browser',
    format: serverRendering ? 'cjs' : 'iife',
    target: serverRendering ? 'node20' : 'chrome120',
    jsx: 'automatic',
    define: {
      'process.env.NODE_ENV': '"development"',
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
    nodePaths: [path.join(root, 'node_modules')],
    alias: { '@': root },
    conditions: [serverRendering ? 'node' : 'browser', 'development'],
    plugins: [
      {
        name: 'one-framework-runtime',
        setup(builder) {
          builder.onResolve(
            { filter: /^(svelte|motion|react|react-dom|vue)(\/|$)/ },
            (args) =>
              args.pluginData?.deduplicated
                ? null
                : builder.resolve(args.path, {
                    resolveDir: root,
                    kind: args.kind,
                    pluginData: { deduplicated: true },
                  })
          );
        },
      },
      {
        name: 'native-framework-components',
        setup(builder) {
          builder.onLoad({ filter: /\.vue$/ }, async ({ path: filename }) => {
            const { descriptor, errors } = vue.parse(
              await fs.readFile(filename, 'utf8'),
              { filename }
            );
            assert.deepEqual(errors, []);
            return {
              contents: vue.compileScript(descriptor, {
                id: filename,
                inlineTemplate: true,
                templateOptions: { ssr: serverRendering },
              }).content,
              loader: 'ts',
              resolveDir: path.dirname(filename),
            };
          });
          builder.onLoad(
            { filter: /\.svelte$/ },
            async ({ path: filename }) => {
              const result = svelte.compile(
                await fs.readFile(filename, 'utf8'),
                {
                  filename,
                  generate: serverRendering ? 'server' : 'client',
                  dev: true,
                }
              );
              assert.deepEqual(result.warnings, []);
              return {
                contents: result.js.code,
                loader: 'js',
                resolveDir: path.dirname(filename),
              };
            }
          );
        },
      },
    ],
  });
  return result.outputFiles[0].text;
}

function trackResources() {
  const originalMatchMedia = window.matchMedia.bind(window);
  const listeners = new Map();
  window.matchMedia = (query) => {
    const media = originalMatchMedia(query);
    const add = media.addEventListener.bind(media);
    const remove = media.removeEventListener.bind(media);
    const callbacks = new Set();
    media.addEventListener = (type, callback, options) => {
      if (type === 'change') {
        callbacks.add(callback);
        listeners.set(media, callbacks);
      }
      return add(type, callback, options);
    };
    media.removeEventListener = (type, callback, options) => {
      callbacks.delete(callback);
      if (!callbacks.size) listeners.delete(media);
      return remove(type, callback, options);
    };
    return media;
  };
  const originalTimeout = window.setTimeout.bind(window);
  const originalClear = window.clearTimeout.bind(window);
  const timers = new Map();
  window.setTimeout = (callback, delay, ...args) => {
    const timer = originalTimeout(() => {
      timers.delete(timer);
      callback(...args);
    }, delay);
    if (delay === 1500) timers.set(timer, delay);
    return timer;
  };
  window.clearTimeout = (timer) => {
    timers.delete(timer);
    originalClear(timer);
  };
  window.runtimeResources = () => ({
    listeners: [...listeners.values()].reduce(
      (count, entries) => count + entries.size,
      0
    ),
    timers: timers.size,
  });
}

function sameVisibleState(states) {
  for (const framework of ['vue', 'svelte']) {
    assert.deepEqual(
      states[framework],
      states.react,
      `${framework} must match the native React source`
    );
  }
}

async function eventually(check, message, timeout = 2000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      await check();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  }
  await assert.doesNotReject(check, message);
}

test(
  'native framework lifecycle and interaction regressions',
  { timeout: 60000 },
  async (t) => {
    const directory = await fs.mkdtemp(
      path.join(os.tmpdir(), 'icons-framework-runtime-')
    );
    let browser;
    let server;
    try {
      const prepared = await prepareSources(directory);
      await t.test(
        'React, Vue and Svelte render the native fixtures without a browser',
        async () => {
          assert.equal(typeof globalThis.window, 'undefined');
          const source = `${prepared.imports}\nimport {renderEntries} from ${JSON.stringify(path.join(fixtures, 'ssr.mjs'))};\nexport const run=()=>renderEntries(${prepared.entries});`;
          const file = path.join(directory, 'ssr.cjs');
          await fs.writeFile(file, await bundle(source, true));
          const results = await require(file).run();
          assert.equal(results.length, 3);
          for (const entry of results) {
            for (const framework of ['react', 'vue', 'svelte']) {
              assert.match(entry[framework], /<svg/);
              assert.match(entry[framework], /width="48"/);
              assert.match(
                entry[framework],
                new RegExp(`aria-label="${entry.name}"`)
              );
            }
          }
        }
      );
      const source = `${prepared.imports}\nimport {setupHarness} from ${JSON.stringify(path.join(fixtures, 'browser.mjs'))};\nsetupHarness(${prepared.entries});`;
      const javascript = await bundle(source);
      server = http.createServer((request, response) => {
        if (request.url === '/bundle.js') {
          response.setHeader('Content-Type', 'application/javascript');
          response.end(javascript);
        } else {
          response.setHeader('Content-Type', 'text/html');
          response.end(
            '<!doctype html><html><body></body><script src="/bundle.js"></script></html>'
          );
        }
      });
      await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
      browser = await chromium.launch({
        executablePath: process.env.FRAMEWORK_TEST_BROWSER || undefined,
        headless: true,
        args: [
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
        ],
      });
      const page = await browser.newPage({ reducedMotion: 'no-preference' });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.addInitScript(trackResources);
      await page.goto(`http://127.0.0.1:${server.address().port}`);
      await page.waitForFunction(() => window.runtimeTest);

      await t.test(
        'live reduced motion replaces an active presence branch',
        async () => {
          await page.evaluate(() => window.runtimeTest.show());
          const rest = await page.evaluate(() =>
            window.runtimeTest.snapshot('volume')
          );
          await page.evaluate(() =>
            window.runtimeTest.invoke('volume', 'startAnimation')
          );
          await page.waitForTimeout(800);
          const active = await page.evaluate(() =>
            window.runtimeTest.snapshot('volume')
          );
          assert.notDeepEqual(
            active.react,
            rest.react,
            'fixture must have distinct active and resting branches'
          );
          await page.emulateMedia({ reducedMotion: 'reduce' });
          await eventually(async () => {
            const reduced = await page.evaluate(() =>
              window.runtimeTest.snapshot('volume')
            );
            sameVisibleState(reduced);
            assert.deepEqual(reduced.react, rest.react);
          }, 'reduced motion must restore the same visible branch in all frameworks');
        }
      );

      await t.test(
        'changing controlled to false enables focus animation',
        async () => {
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          await page.evaluate(() => window.runtimeTest.show());
          const rest = await page.evaluate(() =>
            window.runtimeTest.transforms('heart')
          );
          await page.evaluate(() => window.runtimeTest.setControlled(false));
          await page.evaluate(() => window.runtimeTest.focus('heart'));
          await page.waitForTimeout(100);
          const animated = await page.evaluate(() =>
            window.runtimeTest.transforms('heart')
          );
          for (const framework of ['react', 'vue', 'svelte']) {
            assert.notDeepEqual(
              animated[framework],
              rest[framework],
              `${framework} must respond to focus after relinquishing control`
            );
          }
        }
      );

      await t.test(
        'reentering during an exit keeps the latest presence branch',
        async () => {
          await page.evaluate(() => window.runtimeTest.show());
          await page.evaluate(() =>
            window.runtimeTest.invoke('volume', 'startAnimation')
          );
          await page.waitForTimeout(800);
          const active = await page.evaluate(() =>
            window.runtimeTest.snapshot('volume')
          );
          sameVisibleState(active);
          await page.evaluate(() =>
            window.runtimeTest.invoke('volume', 'stopAnimation')
          );
          await page.waitForTimeout(50);
          await page.evaluate(() =>
            window.runtimeTest.invoke('volume', 'startAnimation')
          );
          await page.waitForTimeout(1000);
          const reentered = await page.evaluate(() =>
            window.runtimeTest.snapshot('volume')
          );
          sameVisibleState(reentered);
          assert.deepEqual(reentered.react, active.react);
        }
      );

      await t.test(
        'unmount releases media listeners and the pending Wi-Fi timer',
        async () => {
          await page.evaluate(() => window.runtimeTest.show());
          await page.evaluate(() =>
            window.runtimeTest.invoke('wifi-low', 'startAnimation')
          );
          await eventually(async () => {
            const resources = await page.evaluate(() =>
              window.runtimeResources()
            );
            assert.ok(resources.listeners > 0);
            assert.equal(
              resources.timers,
              3,
              'each framework must have a pending Wi-Fi delayed hide'
            );
          }, 'Wi-Fi must exercise timer cleanup');
          await page.evaluate(() =>
            window.runtimeTest.destroyAndExerciseStaleHandles()
          );
          assert.deepEqual(
            await page.evaluate(() => window.runtimeResources()),
            { listeners: 0, timers: 0 },
            'unmount must cancel pending timers before they can expire'
          );
          await page.emulateMedia({ reducedMotion: 'reduce' });
          await page.waitForTimeout(1700);
          assert.deepEqual(
            await page.evaluate(() => window.runtimeResources()),
            { listeners: 0, timers: 0 }
          );
          assert.equal(await page.locator('svg').count(), 0);
        }
      );
      assert.deepEqual(errors, []);
    } finally {
      await browser?.close();
      if (server) await new Promise((resolve) => server.close(resolve));
      await fs.rm(directory, { recursive: true, force: true });
    }
  }
);
