import fs from 'fs';
import path from 'path';
import { format, resolveConfig } from 'prettier';

import { getFiles, PROJECT_ROOT } from './icon-catalog';
import { components } from './registry-components';
import { createRegistryIndex, createRegistryItem } from './registry-utils';

const outputDirectory = path.join(PROJECT_ROOT, 'public/r');
fs.mkdirSync(outputDirectory, { recursive: true });

const items = components.map(createRegistryItem);
const expectedPaths = new Set(
  items.map((item) => path.join(outputDirectory, `${item.name}.json`))
);

async function buildRegistry() {
  const config = await resolveConfig(path.join(PROJECT_ROOT, 'registry.json'));
  async function writeJson(file: string, value: unknown) {
    const previous = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (
      previous &&
      JSON.stringify(JSON.parse(previous)) === JSON.stringify(value)
    ) {
      return;
    }
    const content = await format(JSON.stringify(value, null, 2), {
      ...config,
      plugins: [],
      parser: 'json',
    });
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) {
      fs.writeFileSync(file, content);
    }
  }
  await Promise.all(
    items.map((item) =>
      writeJson(path.join(outputDirectory, `${item.name}.json`), item)
    )
  );
  for (const file of getFiles(outputDirectory)) {
    if (file.endsWith('.json') && !expectedPaths.has(file)) fs.unlinkSync(file);
  }
  await writeJson(
    path.join(PROJECT_ROOT, 'registry.json'),
    createRegistryIndex(items)
  );
  console.log(
    `✅ Built ${items.length} registry components and updated registry.json`
  );
}

buildRegistry().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
