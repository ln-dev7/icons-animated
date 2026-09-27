import type { SelectableLibrary } from '@/providers/icon-library';
import type { ComponentType, HTMLAttributes, RefAttributes } from 'react';

export type IconAnimationHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type IconListEntry = {
  name: string;
  keywords: string[];
  icon: ComponentType<
    HTMLAttributes<HTMLDivElement> &
      RefAttributes<IconAnimationHandle> & { size?: number }
  >;
};

export type IconList = readonly IconListEntry[];

const loaders: Record<SelectableLibrary, () => Promise<IconList>> = {
  hugeicons: () =>
    import('@/icons/hugeicons').then((module) => module.HUGEICONS_ICON_LIST),
  tabler: () =>
    import('@/icons/tabler').then((module) => module.TABLER_ICON_LIST),
  phosphor: () =>
    import('@/icons/phosphor').then((module) => module.PHOSPHOR_ICON_LIST),
  heroicons: () =>
    import('@/icons/heroicons').then((module) => module.HEROICONS_ICON_LIST),
};

const catalogs = new Map<SelectableLibrary, IconList>();
const pendingCatalogs = new Map<SelectableLibrary, Promise<IconList>>();

const getCachedIconListByLibrary = (library: SelectableLibrary) =>
  catalogs.get(library);

const getIconListByLibrary = (
  library: SelectableLibrary
): Promise<IconList> => {
  const cached = catalogs.get(library);
  if (cached) return Promise.resolve(cached);

  const pending = pendingCatalogs.get(library);
  if (pending) return pending;

  const request = loaders[library]()
    .then((icons) => {
      catalogs.set(library, icons);
      pendingCatalogs.delete(library);
      return icons;
    })
    .catch((error: unknown) => {
      pendingCatalogs.delete(library);
      throw error;
    });

  pendingCatalogs.set(library, request);
  return request;
};

export { getCachedIconListByLibrary, getIconListByLibrary };
