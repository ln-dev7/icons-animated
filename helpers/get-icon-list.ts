import type { SelectableLibrary } from '@/providers/icon-library';

import { HUGEICONS_ICON_LIST } from '@/icons/hugeicons';
import { PHOSPHOR_ICON_LIST } from '@/icons/phosphor';
import { TABLER_ICON_LIST } from '@/icons/tabler';

const getIconListByLibrary = (library: SelectableLibrary) => {
  switch (library) {
    case 'hugeicons':
      return HUGEICONS_ICON_LIST;
    case 'tabler':
      return TABLER_ICON_LIST;
    case 'phosphor':
      return PHOSPHOR_ICON_LIST;
    default:
      return HUGEICONS_ICON_LIST;
  }
};

export { getIconListByLibrary };
