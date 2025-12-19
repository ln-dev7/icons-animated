import fs from 'fs';
import path from 'path';

import type { Schema } from './registry-schema';
import { components } from './registry-components';

const registryComponents = path.join(__dirname, '../public/r');
const registryIndexPath = path.join(__dirname, '../registry.json');

if (!fs.existsSync(registryComponents)) {
  fs.mkdirSync(registryComponents, { recursive: true });
}

console.log(`\n🔨 Building registry components...\n`);

const registryItems = [];

for (const component of components) {
  const content = fs.readFileSync(component.path, 'utf8');

  const schema: Schema = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: component.name,
    type: 'registry:ui',
    registryDependencies: component.registryDependencies || [],
    dependencies: component.dependencies || [],
    devDependencies: component.devDependencies || [],
    files: [
      {
        path: `${component.name}.tsx`,
        content,
        type: 'registry:ui',
      },
    ],
  };

  if (component.title) schema.title = component.title;
  if (component.description) schema.description = component.description;
  if (component.author) schema.author = component.author;
  if (component.tailwind) schema.tailwind = component.tailwind;
  if (component.cssVars) schema.cssVars = component.cssVars;
  if (component.css) schema.css = component.css;
  if (component.envVars) schema.envVars = component.envVars;
  if (component.docs) schema.docs = component.docs;
  if (component.categories) schema.categories = component.categories;
  if (component.meta) schema.meta = component.meta;

  const outputPath = path.join(registryComponents, `${component.name}.json`);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { files, $schema: _itemSchema, ...schemaWithoutContent } = schema;
  registryItems.push({
    ...schemaWithoutContent,
    files: files.map((file) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...fileWithoutContent } = file;
      return fileWithoutContent;
    }),
  });
}

const registryIndex = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'icons-animated',
  homepage: 'https://icons.lndev.me',
  items: registryItems,
};

fs.writeFileSync(registryIndexPath, JSON.stringify(registryIndex, null, 2));

console.log(`✅ Built ${components.length} registry components`);
console.log(`✅ Updated registry.json\n`);
