'use client';

import type { IconList } from '@/helpers/get-icon-list';
import type { ReactNode } from 'react';
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

import { ICON_LIBRARY } from '@/constants';
import {
  getCachedIconListByLibrary,
  getIconListByLibrary,
} from '@/helpers/get-icon-list';

type SelectableLibrary =
  | typeof ICON_LIBRARY.HUGEICONS
  | typeof ICON_LIBRARY.TABLER
  | typeof ICON_LIBRARY.PHOSPHOR;

type IconLibraryContextType = {
  library: SelectableLibrary;
  setLibrary: (library: SelectableLibrary) => void;
  iconList: IconList;
  isLoading: boolean;
  loadError: string | null;
  reloadIcons: () => void;
};

type CatalogState = {
  library: SelectableLibrary;
  icons: IconList | undefined;
  error: string | null;
};

const EMPTY_ICON_LIST: IconList = [];
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
  const [catalog, setCatalog] = useState<CatalogState>(() => ({
    library,
    icons: getCachedIconListByLibrary(library),
    error: null,
  }));
  const [loadAttempt, setLoadAttempt] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.has('lib')) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('lib', ICON_LIBRARY.HUGEICONS);
      router.replace(`/?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    let active = true;

    getIconListByLibrary(library).then(
      (icons) => {
        if (active) setCatalog({ library, icons, error: null });
      },
      () => {
        if (active) {
          setCatalog({
            library,
            icons: undefined,
            error: 'Unable to load this icon library. Please try again.',
          });
        }
      }
    );

    return () => {
      active = false;
    };
  }, [library, loadAttempt]);

  const reloadIcons = useCallback(() => {
    setCatalog({ library, icons: undefined, error: null });
    setLoadAttempt((attempt) => attempt + 1);
  }, [library]);

  const icons =
    catalog.library === library
      ? catalog.icons
      : getCachedIconListByLibrary(library);
  const loadError = catalog.library === library ? catalog.error : null;
  const iconList = icons ?? EMPTY_ICON_LIST;
  const isLoading = !icons && !loadError;
  const value = useMemo(
    () => ({
      library,
      setLibrary,
      iconList,
      isLoading,
      loadError,
      reloadIcons,
    }),
    [library, setLibrary, iconList, isLoading, loadError, reloadIcons]
  );

  return (
    <IconLibraryContext.Provider value={value}>
      {children}
    </IconLibraryContext.Provider>
  );
};

const IconLibraryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <p
          role="status"
          className="text-secondary p-8 text-center font-mono text-sm"
        >
          Loading icons…
        </p>
      }
    >
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
