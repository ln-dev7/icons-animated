'use client';

import { useMemo, useState } from 'react';

type IconItem = {
  name: string;
  keywords: string[];
};

const useIconSearch = <T extends IconItem>(icons: T[]) => {
  const [query, setQuery] = useState('');

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return icons;
    }

    return icons.filter((icon) => {
      const nameMatch = icon.name.toLowerCase().includes(normalizedQuery);

      const keywordMatch = icon.keywords.some((keyword) =>
        keyword.toLowerCase().includes(normalizedQuery)
      );

      return nameMatch || keywordMatch;
    });
  }, [icons, query]);

  return {
    query,
    setQuery,
    filteredIcons,
    hasResults: filteredIcons.length > 0,
    totalCount: icons.length,
    resultCount: filteredIcons.length,
  };
};

export { useIconSearch };
