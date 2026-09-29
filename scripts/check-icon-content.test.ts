import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import type { IconLibrary } from '@/constants';
import type { IconFramework } from '@/constants/frameworks';

import { getIconContent } from '@/actions/get-icon-content';

const callWithUnknownInput = (library: unknown, name: unknown) =>
  getIconContent(library as IconLibrary, name as string);

const INVALID_INPUTS: [unknown, unknown][] = [
  ['../app', 'layout'],
  ['hugeicons/../../app', 'layout'],
  ['hugeicons\\..\\app', 'layout'],
  ['hugeicons', '../../app/layout'],
  ['hugeicons', '..\\..\\app\\layout'],
  ['hugeicons', '/etc/passwd'],
  ['hugeicons', 'C:\\Windows\\win.ini'],
  ['hugeicons', '%2e%2e%2fapp%2flayout'],
  ['hugeicons', '%252e%252e%252fapp%252flayout'],
  ['hugeicons', 'arrow-down\u0000'],
  ['hugeicons', 'arrow-down.tsx'],
  ['hugeicons', 'arrow-down/'],
  ['hugeicons', 'arrow--down'],
  ['hugeicons', ' arrow-down'],
  ['hugeicons', 'arrow-down '],
  ['hugeicons', 'ARROW-DOWN'],
  ['hugeicons', 'arrοw-down'],
  ['hugeicons', 'index'],
  ['hugeicons', 'not-an-existing-icon-123456789'],
  ['hugeicons', 'a'.repeat(129)],
  ['hugeicons', ''],
  ['lucide', 'arrow-down'],
  ['unknown', 'arrow-down'],
  ['HUGEICONS', 'arrow-down'],
  ['__proto__', 'constructor'],
  ['constructor', 'prototype'],
  [null, 'arrow-down'],
  [undefined, 'arrow-down'],
  [7, 'arrow-down'],
  [true, 'arrow-down'],
  [['hugeicons'], 'arrow-down'],
  [{ toString: () => 'hugeicons' }, 'arrow-down'],
  ['hugeicons', null],
  ['hugeicons', undefined],
  ['hugeicons', 7],
  ['hugeicons', true],
  ['hugeicons', ['arrow-down']],
  ['hugeicons', { toString: () => 'arrow-down' }],
];

test('rejects malformed or unpublished icons before any file read', async (t) => {
  const reader = t.mock.method(fs, 'readFile', async () => {
    throw new Error('Unexpected file read');
  });

  for (const [library, name] of INVALID_INPUTS) {
    await assert.rejects(callWithUnknownInput(library, name), {
      message: 'Unknown icon.',
    });
  }

  assert.equal(reader.mock.callCount(), 0);
});

test('reads the exact published component in each native library', async (t) => {
  for (const library of [
    'hugeicons',
    'tabler',
    'phosphor',
    'heroicons',
  ] as const) {
    await t.test(library, async () => {
      const registryName = `${library}-arrow-down`;
      const expected = JSON.parse(
        await fs.readFile(
          path.join(process.cwd(), 'public', 'r', `${registryName}.json`),
          'utf-8'
        )
      );
      const source = await getIconContent(library, 'arrow-down');
      assert.equal(source, expected.files[0].content);
      assert.match(source, /'use client';/);
    });
  }
});

test('restricts a valid request to its published registry path', async (t) => {
  const expectedSource = '/** @license MIT */\nexport const Example = 1;\n';
  const reader = t.mock.method(
    fs,
    'readFile',
    async (filename: unknown, encoding: unknown) => {
      assert.equal(
        filename,
        path.join(process.cwd(), 'public', 'r', 'hugeicons-arrow-down.json')
      );
      assert.equal(encoding, 'utf-8');
      return JSON.stringify({
        name: 'hugeicons-arrow-down',
        files: [
          { path: 'another-file.tsx', content: 'not the icon' },
          { path: 'hugeicons-arrow-down.tsx', content: expectedSource },
        ],
      });
    }
  );

  assert.equal(await getIconContent('hugeicons', 'arrow-down'), expectedSource);
  assert.equal(reader.mock.callCount(), 1);
});

test('refuses registry entries with mismatched names or missing source', async (t) => {
  const entries: unknown[] = [
    null,
    'not an item',
    [],
    { name: 'tabler-arrow-down', files: [] },
    { name: 'hugeicons-arrow-down', files: {} },
    { name: 'hugeicons-arrow-down', files: [] },
    { name: 'hugeicons-arrow-down', files: [null] },
    {
      name: 'hugeicons-arrow-down',
      files: [{ path: '../../app/layout.tsx', content: 'wrong file' }],
    },
    {
      name: 'hugeicons-arrow-down',
      files: [{ path: 'hugeicons-arrow-down.tsx', content: null }],
    },
  ];
  let currentEntry: unknown;
  t.mock.method(fs, 'readFile', async () => JSON.stringify(currentEntry));

  for (const entry of entries) {
    currentEntry = entry;
    await assert.rejects(getIconContent('hugeicons', 'arrow-down'), {
      message: 'Icon source is unavailable.',
    });
  }
});

test('rejects unknown framework paths before reading a file', async (t) => {
  const reader = t.mock.method(fs, 'readFile', async () => {
    throw new Error('Unexpected file read');
  });
  for (const framework of [
    '../vue',
    'vue/..',
    '__proto__',
    'constructor',
    'Vue',
    '',
    null,
    {},
    ['vue'],
    1,
  ]) {
    await assert.rejects(
      getIconContent('hugeicons', 'arrow-down', framework as IconFramework),
      { message: 'Unknown icon.' }
    );
  }
  assert.equal(reader.mock.callCount(), 0);
});

test('each framework reads only its matching published component', async () => {
  for (const framework of ['react', 'vue', 'svelte'] as const) {
    for (const library of [
      'hugeicons',
      'tabler',
      'phosphor',
      'heroicons',
    ] as const) {
      const registryName = `${library}-arrow-down`;
      const folder = framework === 'react' ? [] : [framework];
      const expected = JSON.parse(
        await fs.readFile(
          path.join(
            process.cwd(),
            'public',
            'r',
            ...folder,
            `${registryName}.json`
          ),
          'utf8'
        )
      );
      const source = await getIconContent(library, 'arrow-down', framework);
      assert.equal(source, expected.files[0].content);
      if (framework === 'svelte') {
        assert.equal(expected.files[0].target, `${registryName}.svelte`);
      }
      assert.match(source, framework === 'react' ? /'use client';/ : /<script/);
    }
  }
});
