'use client';

import type { IconFramework } from '@/constants/frameworks';
import type { ReactNode } from 'react';
import { createContext, Suspense, useContext, useMemo } from 'react';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

import { FRAMEWORKS } from '@/constants/frameworks';

type IconFrameworkContextType = {
  framework: IconFramework;
  setFramework: (framework: IconFramework) => void;
};

const IconFrameworkContext = createContext<
  IconFrameworkContextType | undefined
>(undefined);

const frameworkParser = parseAsStringLiteral(FRAMEWORKS)
  .withDefault('react')
  .withOptions({ clearOnDefault: false });

const IconFrameworkProviderInner = ({ children }: { children: ReactNode }) => {
  const [framework, setFramework] = useQueryState('framework', frameworkParser);
  const value = useMemo(
    () => ({ framework, setFramework }),
    [framework, setFramework]
  );

  return (
    <IconFrameworkContext.Provider value={value}>
      {children}
    </IconFrameworkContext.Provider>
  );
};

const IconFrameworkProvider = ({ children }: { children: ReactNode }) => (
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
    <IconFrameworkProviderInner>{children}</IconFrameworkProviderInner>
  </Suspense>
);

const useIconFramework = () => {
  const context = useContext(IconFrameworkContext);
  if (!context) {
    throw new Error(
      'useIconFramework must be used within IconFrameworkProvider'
    );
  }
  return context;
};

export { IconFrameworkProvider, useIconFramework };
