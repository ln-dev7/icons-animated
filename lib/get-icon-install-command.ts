import type { IconLibrary } from '@/constants';
import type { IconFramework } from '@/constants/frameworks';

import { FRAMEWORK_INFO } from '@/constants/frameworks';
import { getPackageManagerPrefix } from './get-package-manager-prefix';

export function getIconInstallParts(
  library: IconLibrary,
  framework: IconFramework
) {
  const { cli } = FRAMEWORK_INFO[framework];
  return framework === 'react'
    ? { prefix: `${cli} add @icons-animated/${library}-`, suffix: '' }
    : {
        prefix: `${cli} add https://icons.lndev.me/r/${framework}/${library}-`,
        suffix: '.json',
      };
}

export function getIconInstallCommand(
  packageManager: string,
  library: IconLibrary,
  name: string,
  framework: IconFramework = 'react'
) {
  const { prefix, suffix } = getIconInstallParts(library, framework);
  return `${getPackageManagerPrefix(packageManager)} ${prefix}${name}${suffix}`;
}
