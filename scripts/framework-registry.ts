import fs from 'fs';
import path from 'path';

import type { Schema } from './registry-schema';
import { FRAMEWORK_INFO } from '../constants/frameworks';
import { discoverIcons, PROJECT_ROOT } from './icon-catalog';

export const PORTABLE_FRAMEWORKS = ['vue', 'svelte'] as const;

export function createFrameworkRegistryItems() {
  const icons = discoverIcons();
  return PORTABLE_FRAMEWORKS.flatMap((framework) => {
    const {
      extension,
      name: frameworkName,
      version,
    } = FRAMEWORK_INFO[framework];
    return icons.map((icon) => {
      const sourcePath = path.join(
        PROJECT_ROOT,
        'frameworks',
        framework,
        icon.library,
        `${icon.name}.${extension}`
      );
      const item: Schema = {
        $schema: `https://shadcn-${framework}.com/schema/registry-item.json`,
        name: icon.registryName,
        type: 'registry:ui',
        title: `${icon.name} (${frameworkName})`,
        description: `Animated ${icon.library} icon for ${version}.`,
        dependencies: ['motion@^12.23.26'],
        registryDependencies: [],
        files: [
          {
            path: `${icon.registryName}.${extension}`,
            content: fs.readFileSync(sourcePath, 'utf8'),
            type: 'registry:ui',
            ...(framework === 'svelte'
              ? { target: `${icon.registryName}.${extension}` }
              : {}),
          },
        ],
        docs: `Requires ${version}. Animates on hover and keyboard focus. Exposes startAnimation() and stopAnimation(); set controlled to true for imperative-only playback. Respects prefers-reduced-motion.`,
      };
      return {
        framework,
        item,
        outputPath: path.join(
          PROJECT_ROOT,
          'public',
          'r',
          framework,
          `${icon.registryName}.json`
        ),
      };
    });
  });
}
