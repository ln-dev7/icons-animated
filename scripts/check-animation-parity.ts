import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { ANIMATION_ENGINE_DEPENDENCIES } from './animation-engine';
import { discoverIcons, PROJECT_ROOT } from './icon-catalog';

const read = (file: string) =>
  fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
const ledger = JSON.parse(read('docs/animation-parity.json')) as {
  reference: { commit: string; iconCount: number };
  components: {
    componentPath: string;
    references: string[];
    sourceSha256: string;
  }[];
  preservedWithoutReference: { componentPath: string }[];
  unverifiedOrMissing: unknown[];
};
const coverage = JSON.parse(read('docs/catalog-coverage.json')) as {
  reference: { commit: string; iconCount: number };
  icons: {
    reference: string;
    libraries: Record<
      string,
      { available: boolean; componentPath: string | null }
    >;
  }[];
};
const registry = JSON.parse(read('registry.json')) as {
  items: { name: string; dependencies?: string[] }[];
};

assert.equal(ledger.reference.commit, coverage.reference.commit);
assert.equal(ledger.reference.iconCount, coverage.icons.length);
assert.deepEqual(
  ledger.unverifiedOrMissing,
  [],
  'Unfinished animation transfers'
);
const mapped = new Map(
  ledger.components.map((entry) => [entry.componentPath, entry])
);
assert.equal(
  mapped.size,
  ledger.components.length,
  'Duplicate animation ledger paths'
);
for (const entry of ledger.components) {
  assert.equal(
    createHash('sha256').update(read(entry.componentPath)).digest('hex'),
    entry.sourceSha256,
    `Review animation changes and refresh the ledger: ${entry.componentPath}`
  );
  const references = coverage.icons
    .filter((icon) =>
      Object.values(icon.libraries).some(
        (item) => item.available && item.componentPath === entry.componentPath
      )
    )
    .map((icon) => icon.reference);
  assert.deepEqual(
    entry.references,
    references,
    `Incorrect reference mapping: ${entry.componentPath}`
  );
}
for (const icon of coverage.icons) {
  for (const item of Object.values(icon.libraries)) {
    if (item.available)
      assert.ok(
        item.componentPath && mapped.has(item.componentPath),
        `Missing program: ${icon.reference} / ${item.componentPath}`
      );
  }
}
assert.deepEqual(
  [
    ...mapped.keys(),
    ...ledger.preservedWithoutReference.map((entry) => entry.componentPath),
  ].sort(),
  discoverIcons()
    .map((source) => source.relativePath)
    .sort(),
  'Every catalog component must be mapped or explicitly preserved'
);
for (const item of registry.items) {
  for (const dependency of ANIMATION_ENGINE_DEPENDENCIES)
    assert.ok(
      item.dependencies?.includes(dependency),
      `Unpinned engine dependency ${dependency}: ${item.name}`
    );
}
console.log(
  `Animation parity ledger verified: ${mapped.size} transfers, ${ledger.preservedWithoutReference.length} preserved extras, ${coverage.icons.length} reference icons.`
);
