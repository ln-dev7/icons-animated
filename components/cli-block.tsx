'use client';

import type { IconStatus } from '@/components/ui/icon-state';
import { useEffect, useMemo, useState } from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui-components/react/scroll-area';
import { CopyIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';

import { IconState } from '@/components/ui/icon-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PACKAGE_MANAGER } from '@/constants';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';
import { cn } from '@/lib/utils';
import { useIconLibrary } from '@/providers/icon-library';
import { usePackageNameContext } from '@/providers/package-name';

const CliBlockContent = () => {
  const { library, iconList, isLoading, loadError } = useIconLibrary();
  const icons = useMemo(() => {
    const shortNames = iconList.filter((icon) => icon.name.length <= 20);
    return shortNames.length ? shortNames : iconList;
  }, [iconList]);
  const [state, setState] = useState<IconStatus>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { packageName, setPackageName } = usePackageNameContext();
  const currentIcon = icons[currentIndex] ?? icons[0];
  const command = currentIcon
    ? `${getPackageManagerPrefix(packageName)} shadcn add @icons-animated/${library}-${currentIcon.name}`
    : '';

  useEffect(() => {
    if (icons.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % icons.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [icons.length]);

  useEffect(() => {
    if (state !== 'done' && state !== 'error') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const handleCopyToClipboard = async () => {
    if (!command || state !== 'idle') return;
    setState('loading');
    try {
      await navigator.clipboard.writeText(command);
      setState('done');
    } catch {
      toast.error('Failed to copy to clipboard', {
        description: 'Please check your browser permissions.',
      });
      setState('error');
    }
  };

  return (
    <div className="relative mt-[40px] w-full max-w-[642px] px-4">
      <Tabs
        className="w-full"
        value={packageName}
        onValueChange={setPackageName}
      >
        <TabsList className="w-full" onClick={(e) => e.stopPropagation()}>
          {Object.values(PACKAGE_MANAGER).map((pm) => (
            <TabsTrigger key={pm} value={pm}>
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(PACKAGE_MANAGER).map((pm) => (
          <TabsContent
            key={pm}
            value={pm}
            className="focus-visible:outline-primary supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle mt-px overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] focus-within:outline-offset-0 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px]"
          >
            <BaseScrollArea.Root className="relative w-full overflow-hidden">
              <BaseScrollArea.Viewport
                className={cn(
                  'focus-visible:outline-primary overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-white focus-visible:outline-1 focus-visible:outline-offset-0 dark:bg-white/10',
                  'supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px]',
                  'isolate px-4 py-3 pr-20 font-mono text-sm tracking-[-0.39px] whitespace-nowrap',
                  // left fade
                  'before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:block before:h-full before:rounded-bl-[10px]',
                  'supports-[corner-shape:squircle]:before:corner-bl-squircle supports-[corner-shape:squircle]:before:rounded-bl-[14px]',
                  "before:transition-[width] before:duration-50 before:ease-out before:content-['']",
                  'before:w-[min(40px,var(--scroll-area-overflow-x-start))] before:bg-[linear-gradient(to_right,white,transparent)] before:[--scroll-area-overflow-x-start:inherit] dark:before:bg-[linear-gradient(to_right,rgb(47_47_47/1),transparent)]',
                  // right fade
                  'after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:block after:h-full after:rounded-r-[10px]',
                  'supports-[corner-shape:squircle]:after:corner-r-squircle supports-[corner-shape:squircle]:after:rounded-r-[14px]',
                  "after:transition-[width] after:duration-50 after:ease-out after:content-['']",
                  'after:w-[calc(min(40px,var(--scroll-area-overflow-x-end,100px))+100px)] after:bg-[linear-gradient(to_left,white_0%,white_30%,transparent)] after:[--scroll-area-overflow-x-end:inherit] dark:after:bg-[linear-gradient(to_left,rgb(47_47_47/1)_0%,rgb(47_47_47/1)_30%,transparent)]'
                )}
              >
                {currentIcon ? (
                  <>
                    <span className="sr-only">{command}</span>
                    <span
                      className="text-neutral-600 dark:text-neutral-400"
                      aria-hidden="true"
                    >
                      {getPackageManagerPrefix(pm)}
                    </span>{' '}
                    <span
                      className="text-black dark:text-white"
                      aria-hidden="true"
                    >
                      shadcn add @icons-animated/{library}-
                    </span>
                    <span
                      className="relative inline-block whitespace-nowrap"
                      aria-hidden="true"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={currentIcon.name}
                          className="text-primary inline-block shrink-0"
                          initial={{
                            y: -12,
                            rotateX: -90,
                            opacity: 0,
                            filter: 'blur(2px)',
                          }}
                          animate={{
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                          }}
                          exit={{
                            y: 12,
                            rotateX: 90,
                            opacity: 0,
                            filter: 'blur(2px)',
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          {currentIcon.name}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </>
                ) : (
                  <span role="status" className="text-secondary">
                    {isLoading
                      ? 'Loading icons…'
                      : loadError
                        ? 'Icon library unavailable'
                        : 'No icons available'}
                  </span>
                )}
              </BaseScrollArea.Viewport>
              <BaseScrollArea.Scrollbar
                keepMounted={false}
                orientation="horizontal"
                className="pointer-events-none absolute right-2! bottom-1! left-2! flex h-0.5 touch-none rounded bg-neutral-200 opacity-0 transition-opacity duration-100 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 dark:bg-neutral-700"
              >
                <BaseScrollArea.Thumb className="relative w-full rounded bg-neutral-600 dark:bg-neutral-400" />
              </BaseScrollArea.Scrollbar>
              <button
                tabIndex={0}
                type="button"
                aria-label="Copy to clipboard"
                disabled={!currentIcon || state !== 'idle'}
                onClick={handleCopyToClipboard}
                className="focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle absolute top-1/2 right-1.5 z-20 -translate-y-1/2 cursor-pointer rounded-[6px] p-2 transition-[background-color] duration-100 focus-within:outline-offset-1 hover:bg-neutral-100 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-[8px] dark:hover:bg-neutral-700"
              >
                <IconState status={state}>
                  <CopyIcon className="size-4" aria-hidden="true" />
                </IconState>
              </button>
            </BaseScrollArea.Root>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const CliBlock = () => {
  const { library } = useIconLibrary();
  return <CliBlockContent key={library} />;
};

export { CliBlock };
