'use client';

import type { SelectableLibrary } from '@/providers/icon-library';
import { ArrowUpRightIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICON_LIBRARY } from '@/constants';
import { useIconLibrary } from '@/providers/icon-library';

const LibrarySelector = () => {
  const { library, setLibrary } = useIconLibrary();

  const handleValueChange = (value: string) => {
    if (value === ICON_LIBRARY.LUCIDE) {
      window.open('https://lucide-animated.com/', '_blank');
      return;
    }
    setLibrary(value as SelectableLibrary);
  };

  return (
    <Select value={library} onValueChange={handleValueChange}>
      <SelectTrigger className="w-32 text-sm">
        <SelectValue placeholder="Select library" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={ICON_LIBRARY.HUGEICONS}>Huge Icons</SelectItem>
          <SelectItem value={ICON_LIBRARY.TABLER}>Tabler</SelectItem>
          <SelectItem value={ICON_LIBRARY.PHOSPHOR}>Phosphor</SelectItem>
          <SelectItem value={ICON_LIBRARY.LUCIDE}>
            <div className="flex items-center gap-1">
              <span>Lucide</span>
              <ArrowUpRightIcon className="size-4" />
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { LibrarySelector };
