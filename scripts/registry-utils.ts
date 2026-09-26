import fs from 'fs';

import type { Schema } from './registry-schema';

export type ComponentDefinition = Partial<
  Omit<Schema, 'name' | 'files' | 'type' | '$schema'>
> & {
  name: string;
  path: string;
};

export function createRegistryItem(component: ComponentDefinition): Schema {
  const {
    name,
    path: sourcePath,
    registryDependencies,
    dependencies,
    devDependencies,
    ...metadata
  } = component;
  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: 'registry:ui',
    registryDependencies: registryDependencies ?? [],
    dependencies: dependencies ?? [],
    devDependencies: devDependencies ?? [],
    files: [
      {
        path: `${component.name}.tsx`,
        content: fs.readFileSync(sourcePath, 'utf8'),
        type: 'registry:ui',
      },
    ],
    ...metadata,
  };
}

export function createRegistryIndex(items: Schema[]) {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'icons-animated',
    homepage: 'https://icons.lndev.me',
    items: items.map((item) => {
      const { $schema: itemSchema, files, ...metadata } = item;
      void itemSchema;
      return {
        ...metadata,
        files: files.map((file) => {
          const { content, ...fileMetadata } = file;
          void content;
          return fileMetadata;
        }),
      };
    }),
  };
}
