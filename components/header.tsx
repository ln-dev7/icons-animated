'use client';

import Link from 'next/link';

import { GithubStartsButton } from '@/components/github-button';
import { LibrarySelector } from '@/components/library-selector';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LIBRARY_INFO } from '@/constants';
import { cn } from '@/lib/utils';
import { useIconLibrary } from '@/providers/icon-library';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      className={cn(className)}
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3C16 3 7 8 7 16C7 24 12 29 16 29C20 29 25 24 25 16C25 8 16 3 16 3Z"
        fill="currentColor"
      />
      <circle cx="12" cy="14" r="2" fill="white" />
      <circle cx="20" cy="14" r="2" fill="white" />
      <path
        d="M11 20C11 20 13 22 16 22C19 22 21 20 21 20"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 3V10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

const Header = () => {
  const { library } = useIconLibrary();
  const currentLib = LIBRARY_INFO[library];

  return (
    <header className="mx-auto mt-[25px] w-full max-w-[1292px] px-4 font-mono">
      <div className="flex h-full w-full justify-between gap-4">
        <Link
          href="/"
          aria-label="Icons Animated - Home"
          tabIndex={0}
          className="focus-visible:outline-primary relative mr-auto flex h-[42px] items-center gap-2 font-sans text-base focus-within:outline-offset-4 focus-visible:outline-1 max-[524px]:translate-y-[-2px] min-[395px]:text-xl"
        >
          <Logo className="text-primary w-6 shrink-0 data-[type='christmas']:translate-y-[-4px] min-[395px]:w-8" />
          <span className="shrink-0">icons-animated</span>
          <a
            href={currentLib.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary absolute right-0 -bottom-2 text-sm italic hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {currentLib.name}
          </a>
        </Link>
        <div className="ml-auto flex w-full flex-1 flex-wrap-reverse items-center justify-end gap-2">
          <LibrarySelector />
          <a
            href="https://ecaefmew.mychariow.shop/prd_3cu1s0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sponsor Project"
            tabIndex={0}
            className="focus-visible:outline-primary flex items-center gap-1 pr-1 font-sans text-sm text-[#3F3F47] underline-offset-4 focus-within:outline-offset-4 hover:underline focus-visible:outline-1 dark:text-[#FAFAFA]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.72238 13.5321L7.71838 13.5297L7.70318 13.5217C7.38749 13.3499 7.07746 13.1679 6.77358 12.976C6.04907 12.5202 5.35871 12.0122 4.70798 11.456C3.23598 10.1864 1.59998 8.28165 1.59998 6.00005C1.60005 5.25562 1.8309 4.52952 2.26074 3.92172C2.69058 3.31393 3.29827 2.85433 4.00014 2.60622C4.702 2.35811 5.46353 2.33369 6.17985 2.53631C6.89618 2.73894 7.53207 3.15865 7.99998 3.73765C8.46788 3.15865 9.10377 2.73894 9.8201 2.53631C10.5364 2.33369 11.2979 2.35811 11.9998 2.60622C12.7017 2.85433 13.3094 3.31393 13.7392 3.92172C14.1691 4.52952 14.3999 5.25562 14.4 6.00005C14.4 8.28165 12.7648 10.1864 11.292 11.456C10.3674 12.246 9.36371 12.9382 8.29678 13.5217L8.28158 13.5297L8.27758 13.5321H8.27598C8.19097 13.5771 8.09627 13.6007 8.00007 13.6008C7.90388 13.601 7.80911 13.5776 7.72398 13.5329L7.72238 13.5321Z"
                className="fill-primary"
              />
            </svg>
            Sponsor Project
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <GithubStartsButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
