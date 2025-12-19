import path from 'path';

import type { Schema } from './registry-schema';

type ComponentDefinition = Partial<
  Pick<
    Schema,
    | 'dependencies'
    | 'devDependencies'
    | 'registryDependencies'
    | 'cssVars'
    | 'tailwind'
    | 'title'
    | 'description'
    | 'author'
    | 'css'
    | 'envVars'
    | 'docs'
    | 'categories'
    | 'meta'
  >
> & {
  name: string;
  path: string;
};

export const components: ComponentDefinition[] = [
  // Huge Icons
  {
    'name': 'hugeicons-arrow-down',
    'path': path.join(__dirname, '../icons/hugeicons/arrow-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-arrow-left',
    'path': path.join(__dirname, '../icons/hugeicons/arrow-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-arrow-right',
    'path': path.join(__dirname, '../icons/hugeicons/arrow-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-arrow-up',
    'path': path.join(__dirname, '../icons/hugeicons/arrow-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-bell',
    'path': path.join(__dirname, '../icons/hugeicons/bell.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-calendar',
    'path': path.join(__dirname, '../icons/hugeicons/calendar.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-check',
    'path': path.join(__dirname, '../icons/hugeicons/check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-download',
    'path': path.join(__dirname, '../icons/hugeicons/download.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-eye',
    'path': path.join(__dirname, '../icons/hugeicons/eye.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-heart',
    'path': path.join(__dirname, '../icons/hugeicons/heart.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-home',
    'path': path.join(__dirname, '../icons/hugeicons/home.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-lock',
    'path': path.join(__dirname, '../icons/hugeicons/lock.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-mail',
    'path': path.join(__dirname, '../icons/hugeicons/mail.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-menu',
    'path': path.join(__dirname, '../icons/hugeicons/menu.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-pencil',
    'path': path.join(__dirname, '../icons/hugeicons/pencil.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-plus',
    'path': path.join(__dirname, '../icons/hugeicons/plus.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-search',
    'path': path.join(__dirname, '../icons/hugeicons/search.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-settings',
    'path': path.join(__dirname, '../icons/hugeicons/settings.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-star',
    'path': path.join(__dirname, '../icons/hugeicons/star.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-trash',
    'path': path.join(__dirname, '../icons/hugeicons/trash.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-user',
    'path': path.join(__dirname, '../icons/hugeicons/user.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hugeicons-x',
    'path': path.join(__dirname, '../icons/hugeicons/x.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  // Tabler Icons
  {
    'name': 'tabler-arrow-down',
    'path': path.join(__dirname, '../icons/tabler/arrow-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-arrow-left',
    'path': path.join(__dirname, '../icons/tabler/arrow-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-arrow-right',
    'path': path.join(__dirname, '../icons/tabler/arrow-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-arrow-up',
    'path': path.join(__dirname, '../icons/tabler/arrow-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-bell',
    'path': path.join(__dirname, '../icons/tabler/bell.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-calendar',
    'path': path.join(__dirname, '../icons/tabler/calendar.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-check',
    'path': path.join(__dirname, '../icons/tabler/check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-download',
    'path': path.join(__dirname, '../icons/tabler/download.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-eye',
    'path': path.join(__dirname, '../icons/tabler/eye.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-heart',
    'path': path.join(__dirname, '../icons/tabler/heart.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-home',
    'path': path.join(__dirname, '../icons/tabler/home.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-lock',
    'path': path.join(__dirname, '../icons/tabler/lock.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-mail',
    'path': path.join(__dirname, '../icons/tabler/mail.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-menu',
    'path': path.join(__dirname, '../icons/tabler/menu.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-pencil',
    'path': path.join(__dirname, '../icons/tabler/pencil.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-plus',
    'path': path.join(__dirname, '../icons/tabler/plus.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-search',
    'path': path.join(__dirname, '../icons/tabler/search.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-settings',
    'path': path.join(__dirname, '../icons/tabler/settings.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-star',
    'path': path.join(__dirname, '../icons/tabler/star.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-trash',
    'path': path.join(__dirname, '../icons/tabler/trash.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-user',
    'path': path.join(__dirname, '../icons/tabler/user.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'tabler-x',
    'path': path.join(__dirname, '../icons/tabler/x.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  // Phosphor Icons
  {
    'name': 'phosphor-arrow-down',
    'path': path.join(__dirname, '../icons/phosphor/arrow-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-arrow-left',
    'path': path.join(__dirname, '../icons/phosphor/arrow-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-arrow-right',
    'path': path.join(__dirname, '../icons/phosphor/arrow-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-arrow-up',
    'path': path.join(__dirname, '../icons/phosphor/arrow-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-bell',
    'path': path.join(__dirname, '../icons/phosphor/bell.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-calendar',
    'path': path.join(__dirname, '../icons/phosphor/calendar.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-check',
    'path': path.join(__dirname, '../icons/phosphor/check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-download',
    'path': path.join(__dirname, '../icons/phosphor/download.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-envelope',
    'path': path.join(__dirname, '../icons/phosphor/envelope.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-eye',
    'path': path.join(__dirname, '../icons/phosphor/eye.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-gear',
    'path': path.join(__dirname, '../icons/phosphor/gear.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-heart',
    'path': path.join(__dirname, '../icons/phosphor/heart.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-house',
    'path': path.join(__dirname, '../icons/phosphor/house.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-list',
    'path': path.join(__dirname, '../icons/phosphor/list.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-lock',
    'path': path.join(__dirname, '../icons/phosphor/lock.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-pencil',
    'path': path.join(__dirname, '../icons/phosphor/pencil.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-plus',
    'path': path.join(__dirname, '../icons/phosphor/plus.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-search',
    'path': path.join(__dirname, '../icons/phosphor/search.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-star',
    'path': path.join(__dirname, '../icons/phosphor/star.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-trash',
    'path': path.join(__dirname, '../icons/phosphor/trash.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-user',
    'path': path.join(__dirname, '../icons/phosphor/user.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'phosphor-x',
    'path': path.join(__dirname, '../icons/phosphor/x.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
];
