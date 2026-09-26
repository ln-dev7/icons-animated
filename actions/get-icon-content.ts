'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { IconLibrary } from '@/constants';

import registry from '@/registry.json';

const ALLOWED_LIBRARIES = new Set(['hugeicons', 'tabler', 'phosphor']);
const ALLOWED_ICONS = new Set(registry.items.map((item) => item.name));
const ICON_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getIconContent(
  library: IconLibrary,
  name: string
): Promise<string> {
  if (
    typeof library !== 'string' ||
    !ALLOWED_LIBRARIES.has(library) ||
    typeof name !== 'string' ||
    name.length > 128 ||
    !ICON_NAME_PATTERN.test(name)
  ) {
    throw new Error('Unknown icon.');
  }

  const registryName = `${library}-${name}`;
  if (!ALLOWED_ICONS.has(registryName)) {
    throw new Error('Unknown icon.');
  }

  const content = await fs.readFile(
    path.join(process.cwd(), 'public', 'r', `${registryName}.json`),
    'utf-8'
  );
  const item: unknown = JSON.parse(content);
  if (
    !item ||
    typeof item !== 'object' ||
    !('name' in item) ||
    item.name !== registryName ||
    !('files' in item) ||
    !Array.isArray(item.files)
  ) {
    throw new Error('Icon source is unavailable.');
  }

  const source = item.files.find(
    (file: unknown): file is { path: string; content: string } =>
      !!file &&
      typeof file === 'object' &&
      'path' in file &&
      file.path === `${registryName}.tsx` &&
      'content' in file &&
      typeof file.content === 'string'
  );
  if (!source) {
    throw new Error('Icon source is unavailable.');
  }

  return source.content;
}
