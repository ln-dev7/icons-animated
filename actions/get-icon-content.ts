'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { IconLibrary } from '@/constants';

const ICONS_DIRECTORY = 'icons';

export async function getIconContent(
  library: IconLibrary,
  name: string
): Promise<string> {
  const iconsDir = path.join(process.cwd(), ICONS_DIRECTORY, library);
  const content = await fs.readFile(
    path.join(iconsDir, `${name}.tsx`),
    'utf-8'
  );
  return content;
}
