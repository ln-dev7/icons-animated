const LINK = {
  TWITTER: 'https://x.com/ln_dev7',
  GITHUB: 'https://github.com/ln-dev7/icons-animated',
  LUCIDE: 'https://lucide.dev',
  LUCIDE_ANIMATED: 'https://lucide-animated.com',
  PHOSPHOR: 'https://phosphoricons.com',
  TABLER: 'https://tabler.io/icons',
  HUGEICONS: 'https://hugeicons.com',
  MOTION: 'https://motion.dev',
};

const PACKAGE_MANAGER = {
  PNPM: 'pnpm',
  NPM: 'npm',
  YARN: 'yarn',
  BUN: 'bun',
};

const ICON_LIBRARY = {
  LUCIDE: 'lucide',
  TABLER: 'tabler',
  PHOSPHOR: 'phosphor',
  HUGEICONS: 'hugeicons',
} as const;

type IconLibrary = (typeof ICON_LIBRARY)[keyof typeof ICON_LIBRARY];

const LIBRARY_INFO = {
  [ICON_LIBRARY.HUGEICONS]: {
    name: 'Huge Icons',
    link: LINK.HUGEICONS,
  },
  [ICON_LIBRARY.TABLER]: {
    name: 'Tabler',
    link: LINK.TABLER,
  },
  [ICON_LIBRARY.PHOSPHOR]: {
    name: 'Phosphor',
    link: LINK.PHOSPHOR,
  },
  [ICON_LIBRARY.LUCIDE]: {
    name: 'Lucide',
    link: LINK.LUCIDE,
  },
};

export { LINK, PACKAGE_MANAGER, ICON_LIBRARY, LIBRARY_INFO };
export type { IconLibrary };
