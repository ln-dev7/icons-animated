'use client';

import type { ReactNode } from 'react';
import { createContext, Suspense, useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

import { ICON_LIBRARY } from '@/constants';

type SelectableLibrary =
  | typeof ICON_LIBRARY.HUGEICONS
  | typeof ICON_LIBRARY.TABLER
  | typeof ICON_LIBRARY.PHOSPHOR;

type IconLibraryContextType = {
  library: SelectableLibrary;
  setLibrary: (library: SelectableLibrary) => void;
};

const IconLibraryContext = createContext<IconLibraryContextType | undefined>(
  undefined
);

const libraryParser = parseAsStringLiteral([
  ICON_LIBRARY.HUGEICONS,
  ICON_LIBRARY.TABLER,
  ICON_LIBRARY.PHOSPHOR,
] as const)
  .withDefault(ICON_LIBRARY.HUGEICONS)
  .withOptions({ clearOnDefault: false });

const IconLibraryProviderInner = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useQueryState('lib', libraryParser);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.has('lib')) {
      router.replace(`/?lib=${ICON_LIBRARY.HUGEICONS}`);
    }
  }, [searchParams, router]);

  return (
    <IconLibraryContext.Provider value={{ library, setLibrary }}>
      {children}
    </IconLibraryContext.Provider>
  );
};

const IconLibraryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <IconLibraryProviderInner>{children}</IconLibraryProviderInner>
    </Suspense>
  );
};

const useIconLibrary = () => {
  const context = useContext(IconLibraryContext);
  if (!context) {
    throw new Error('useIconLibrary must be used within IconLibraryProvider');
  }
  return context;
};

export { IconLibraryProvider, useIconLibrary };
export type { SelectableLibrary };
