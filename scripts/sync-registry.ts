import fs from 'fs';
import path from 'path';
import { format, resolveConfig } from 'prettier';

import { discoverIcons, PROJECT_ROOT } from './icon-catalog';
import { components } from './registry-components';

async function syncRegistry() {
  const byName = new Map(
    components.map((component) => [component.name, component])
  );
  const byPath = new Map(
    components.map((component) => [path.resolve(component.path), component])
  );
  if (byName.size !== components.length || byPath.size !== components.length) {
    throw new Error(
      'Duplicate names or source paths in scripts/registry-components.ts'
    );
  }

  const sources = discoverIcons();
  const definitions = sources.map((source) => {
    const existing = byPath.get(source.path) ?? byName.get(source.registryName);
    const {
      name: previousName,
      path: previousPath,
      ...metadata
    } = existing ?? {};
    void previousName;
    void previousPath;
    const component = {
      name: source.registryName,
      path: source.relativePath,
      registryDependencies: [],
      dependencies: ['motion'],
      ...metadata,
    };
    const properties = Object.entries(component).map(([key, value]) => {
      const serialized =
        key === 'path'
          ? `path.join(__dirname, ${JSON.stringify(`../${source.relativePath}`)})`
          : JSON.stringify(value, null, 2);
      return `${JSON.stringify(key)}: ${serialized}`;
    });
    return `{${properties.join(',\n')}}`;
  });

  const registryPath = path.join(
    PROJECT_ROOT,
    'scripts/registry-components.ts'
  );
  const content = await format(
    `import path from 'path';
import type { ComponentDefinition } from './registry-utils';

export const components: ComponentDefinition[] = [${definitions.join(',\n')}];
`,
    { ...(await resolveConfig(registryPath)), filepath: registryPath }
  );
  if (fs.readFileSync(registryPath, 'utf8') !== content) {
    fs.writeFileSync(registryPath, content);
    console.log(
      `✅ Synced ${sources.length} icons to scripts/registry-components.ts`
    );
  } else {
    console.log(`✅ Registry manifest is up to date (${sources.length} icons)`);
  }
}

syncRegistry().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
