'use client';

import { CliBlock } from '@/components/cli-block';
import { IconsList } from '@/components/list';
import { LIBRARY_INFO, LINK } from '@/constants';
import { useIconLibrary } from '@/providers/icon-library';

const Home = () => {
  const { library } = useIconLibrary();
  const currentLib = LIBRARY_INFO[library];

  return (
    <section className="mx-auto mt-[60px] flex w-full flex-col items-center justify-center">
      <h1 className="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
        Meticulously crafted <br />
        animated icons<span className="text-primary">˜</span>
      </h1>
      <p className="text-secondary mt-5 max-w-[582px] px-4 text-center font-mono text-sm">
        an open-source (
        <a
          href={`${LINK.GITHUB}/blob/main/LICENSE`}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="hover:decoration-primary focus-visible:outline-primary underline underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 focus-visible:outline-1"
        >
          MIT License
        </a>
        ) collection of smooth animated icons for your projects. based on{' '}
        <a
          href={LINK.LUCIDE_ANIMATED}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="hover:decoration-primary focus-visible:outline-primary underline underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 focus-visible:outline-1"
        >
          lucide-animated
        </a>
      </p>
      <p className="text-secondary mt-4 font-mono text-xs min-[640px]:text-sm">
        Crafted with{' '}
        <a
          href={LINK.MOTION}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="focus-visible:outline-primary text-primary bg-[#E5E5E5] px-2 py-0.5 focus-within:outline-offset-1 focus-visible:outline-1 dark:bg-[#262626]"
        >
          Motion
        </a>{' '}
        &{' '}
        <a
          href={currentLib.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="focus-visible:outline-primary text-primary bg-[#E5E5E5] px-2 py-0.5 focus-within:outline-offset-1 focus-visible:outline-1 dark:bg-[#262626]"
        >
          {currentLib.name}
        </a>
      </p>
      <CliBlock />
      <p className="text-secondary mt-4 w-full max-w-[642px] px-4 font-mono text-xs min-[640px]:text-sm">
        Discover{' '}
        <a
          href="https://square.lndev.me/"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="hover:decoration-primary focus-visible:outline-primary text-primary hover:underline hover:underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 focus-visible:outline-1"
        >
          Square UI
        </a>{' '}
        - a collection of beautifully crafted open-source layouts UI built with
        shadcn/ui.
      </p>
      <IconsList />
    </section>
  );
};

export default Home;
