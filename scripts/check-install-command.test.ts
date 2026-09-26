import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  getIconInstallCommand,
  getIconInstallParts,
} from '../lib/get-icon-install-command';

test('React keeps the published namespace and alternate frameworks use their own registries', () => {
  assert.equal(
    getIconInstallCommand('pnpm', 'hugeicons', 'arrow-down'),
    'pnpm dlx shadcn add @icons-animated/hugeicons-arrow-down'
  );
  assert.equal(
    getIconInstallCommand('npm', 'tabler', 'arrow-down', 'vue'),
    'npx shadcn-vue@latest add https://icons.lndev.me/r/vue/tabler-arrow-down.json'
  );
  assert.equal(
    getIconInstallCommand('bun', 'phosphor', 'arrow-down', 'svelte'),
    'bunx --bun shadcn-svelte@latest add https://icons.lndev.me/r/svelte/phosphor-arrow-down.json'
  );
});

test('the displayed command fragments always match copied commands', () => {
  for (const framework of ['react', 'vue', 'svelte'] as const) {
    const { prefix, suffix } = getIconInstallParts('tabler', framework);
    assert.equal(
      `pnpm dlx ${prefix}alarm${suffix}`,
      getIconInstallCommand('pnpm', 'tabler', 'alarm', framework)
    );
  }
});
