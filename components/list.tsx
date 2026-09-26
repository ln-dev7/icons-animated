'use client';

import type { Icon } from '@/actions/get-icons';
import type {
  IconAnimationHandle,
  IconListEntry,
} from '@/helpers/get-icon-list';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Card, CardActions, CardTitle } from '@/components/card';
import { SearchBar } from '@/components/search-bar';
import { LIBRARY_INFO } from '@/constants';
import { useIconSearch } from '@/hooks/use-icon-search';
import { useIconLibrary } from '@/providers/icon-library';

type Props = {
  icons?: Icon[];
};

const PAGE_SIZE = 60;

const IconItem = ({ icon }: { icon: IconListEntry }) => {
  const animationRef = useRef<IconAnimationHandle>(null);
  const IconComponent = icon.icon;

  return (
    <Card
      animationRef={animationRef}
      aria-label={`${icon.name} animated icon`}
      onMouseEnter={() => animationRef.current?.startAnimation()}
      onMouseLeave={() => animationRef.current?.stopAnimation()}
    >
      <IconComponent
        ref={animationRef}
        className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
      />
      <CardTitle>{icon.name}</CardTitle>
      <CardActions name={icon.name} />
    </Card>
  );
};

const EmptyState = ({ query }: { query: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <div className="text-secondary mb-2 text-6xl">🔍</div>
    <h3 className="text-lg font-medium">No icons found</h3>
    <p className="text-secondary mt-1 font-mono text-sm">
      No results for &quot;{query}&quot;
    </p>
    <a
      href="https://github.com/ln-dev7/icons-animated/blob/main/CONTRIBUTING.md"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contribute to the project"
      tabIndex={0}
      className="focus-visible:outline-primary mt-4 flex items-center gap-1 pr-1 font-sans text-sm text-[#3F3F47] underline-offset-4 focus-within:outline-offset-4 hover:underline focus-visible:outline-1 dark:text-[#FAFAFA]"
    >
      You can contribute here
    </a>
  </div>
);

const IconsListContent = ({ icons: propIcons }: Props) => {
  const { library, iconList, isLoading, loadError, reloadIcons } =
    useIconLibrary();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const icons = useMemo(() => {
    if (!propIcons) return iconList;
    const byName = new Map(iconList.map((icon) => [icon.name, icon]));
    return propIcons.flatMap((icon) => {
      const entry = byName.get(icon.name);
      return entry ? [{ ...entry, keywords: icon.keywords }] : [];
    });
  }, [iconList, propIcons]);
  const {
    query,
    setQuery,
    filteredIcons,
    hasResults,
    resultCount,
    totalCount,
  } = useIconSearch(icons);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      setVisibleCount(PAGE_SIZE);
    },
    [setQuery]
  );
  const visibleIcons = filteredIcons.slice(0, visibleCount);

  return (
    <div className="z-60 mt-9 mb-20 w-full">
      <SearchBar
        value={query}
        onChange={handleSearch}
        resultCount={resultCount}
        totalCount={totalCount}
      />
      {isLoading ? (
        <p
          role="status"
          className="text-secondary py-20 text-center font-mono text-sm"
        >
          Loading {LIBRARY_INFO[library].name} icons…
        </p>
      ) : loadError ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p role="alert" className="text-secondary font-mono text-sm">
            {loadError}
          </p>
          <button
            type="button"
            onClick={reloadIcons}
            className="focus-visible:outline-primary cursor-pointer rounded-lg bg-white px-4 py-2 font-mono text-sm focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-neutral-800"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div
            id="icon-results"
            className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]"
          >
            {hasResults ? (
              visibleIcons.map((icon) => (
                <IconItem key={icon.name} icon={icon} />
              ))
            ) : (
              <EmptyState query={query} />
            )}
          </div>
          {hasResults && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <p role="status" className="text-secondary font-mono text-sm">
                Showing {visibleIcons.length} of {resultCount} icons
              </p>
              {visibleIcons.length < resultCount && (
                <button
                  type="button"
                  aria-controls="icon-results"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="focus-visible:outline-primary cursor-pointer rounded-lg border border-neutral-200 bg-white px-5 py-2.5 font-mono text-sm transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neutral-800 dark:bg-[#0A0A0A] dark:hover:bg-neutral-800"
                >
                  Load more (
                  {Math.min(PAGE_SIZE, resultCount - visibleIcons.length)})
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const IconsList = (props: Props) => {
  const { library } = useIconLibrary();
  return <IconsListContent key={library} {...props} />;
};

export { IconsList };
