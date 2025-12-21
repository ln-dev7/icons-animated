'use client';

import { useEffect, useRef } from 'react';

import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
  className?: string;
};

const SearchBar = ({
  value,
  onChange,
  resultCount,
  totalCount,
  className,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        onChange('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div
      className={cn(
        'bg-background/80 sticky top-0 z-50 w-full border-t border-b border-neutral-200 backdrop-blur-md dark:border-neutral-800',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl border-neutral-200 px-4 py-3 xl:border-r xl:border-l dark:border-neutral-800">
        <div className="relative flex items-center">
          <svg
            className="text-secondary pointer-events-none absolute left-4 size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search"
            className={cn(
              'h-12 w-full rounded-lg border border-neutral-200 bg-white pr-20 pl-12 font-mono text-base transition-colors outline-none',
              'placeholder:text-secondary',
              'focus:border-primary focus:ring-primary/20 focus:ring-1',
              'dark:border-neutral-800 dark:bg-[#0A0A0A]'
            )}
          />
          <div className="pointer-events-none absolute right-4 flex items-center gap-1">
            {value ? (
              <span className="text-secondary font-mono text-sm">
                {resultCount}/{totalCount}
              </span>
            ) : (
              <Kbd className="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                ⌘ K
              </Kbd>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SearchBar };
