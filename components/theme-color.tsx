'use client';

import { useEffect } from 'react';

import { ICON_LIBRARY } from '@/constants';
import { useIconLibrary } from '@/providers/icon-library';

const LIBRARY_COLORS = {
  [ICON_LIBRARY.HUGEICONS]: '#7CCE24',
  [ICON_LIBRARY.TABLER]: '#0ea5e9',
  [ICON_LIBRARY.PHOSPHOR]: '#84cc16',
  [ICON_LIBRARY.LUCIDE]: '#0ea5e9',
} as const;

const ThemeColor = () => {
  const { library } = useIconLibrary();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--primary',
      LIBRARY_COLORS[library]
    );
  }, [library]);

  return null;
};

export { ThemeColor, LIBRARY_COLORS };
