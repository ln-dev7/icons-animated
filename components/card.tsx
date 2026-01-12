'use client';

import type { Icon } from '@/actions/get-icons';
import type { IconStatus } from '@/components/ui/icon-state';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Copy, PauseIcon, PlayIcon, Terminal } from 'lucide-react';
import { toast } from 'sonner';

import { getIconContent } from '@/actions/get-icon-content';
import { IconState } from '@/components/ui/icon-state';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTouchDevice } from '@/hooks/use-touch-device';
import { getPackageManagerPrefix } from '@/lib/get-package-manager-prefix';
import { useIconLibrary } from '@/providers/icon-library';
import { usePackageNameContext } from '@/providers/package-name';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  animationRef?: RefObject<{
    startAnimation: () => void;
    stopAnimation: () => void;
  } | null>;
}

const Card = ({ children, animationRef, ...props }: CardProps) => {
  const isTouchDevice = useTouchDevice();
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAnimating) {
      animationRef?.current?.stopAnimation();
      setIsAnimating(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      animationRef?.current?.startAnimation();
      setIsAnimating(true);

      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        animationRef?.current?.stopAnimation();
      }, 1500);
    }
  };

  return (
    <div
      className="group/card supports-[corner-shape:squircle]:corner-squircle relative flex flex-col items-center justify-center bg-white px-[28px] pt-[50px] dark:bg-[#0A0A0A]"
      {...props}
      onMouseEnter={!isTouchDevice ? props.onMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? props.onMouseLeave : undefined}
    >
      {isTouchDevice && (
        <button
          type="button"
          aria-label={isAnimating ? 'Stop animation' : 'Play animation'}
          aria-pressed={isAnimating}
          onClick={handlePlayClick}
          className="focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle absolute top-3 right-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        >
          {isAnimating ? (
            <PauseIcon
              className="size-4 text-neutral-800 dark:text-neutral-100"
              aria-hidden="true"
            />
          ) : (
            <PlayIcon
              className="size-4 text-neutral-800 dark:text-neutral-100"
              aria-hidden="true"
            />
          )}
        </button>
      )}
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="mt-[36px] text-center font-mono text-xs text-[#9F9FA9] dark:text-[#D4D4D4]">
      {children}
    </p>
  );
};

const CopyCLIAction = ({ name }: Pick<Icon, 'name'>) => {
  const { packageName } = usePackageNameContext();
  const { library } = useIconLibrary();

  const [state, setState] = useState<IconStatus>('idle');

  const handleCopy = async () => {
    if (state !== 'idle') return;

    try {
      await navigator.clipboard.writeText(
        `${getPackageManagerPrefix(packageName)} shadcn@latest add "https://icons.lndev.me/r/${library}/${name}.json"`
      );
      setState('done');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      toast.error('Failed to copy to clipboard', {
        description: 'Please check your browser permissions.',
      });
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        tabIndex={0}
        aria-label="Copy shadcn/cli command"
        aria-disabled={state !== 'idle'}
        data-busy={state !== 'idle' ? '' : undefined}
        className="focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        onClick={handleCopy}
      >
        <IconState status={state}>
          <Terminal
            className="size-4 text-neutral-800 dark:text-neutral-100"
            aria-hidden="true"
          />
        </IconState>
      </TooltipTrigger>
      <TooltipContent>
        Copy{' '}
        <code className="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono">
          shadcn/cli
        </code>{' '}
        command
      </TooltipContent>
    </Tooltip>
  );
};

const CopyCodeAction = ({ name }: Pick<Icon, 'name'>) => {
  const { library } = useIconLibrary();

  const [state, setState] = useState<IconStatus>('idle');

  const handleCopy = async () => {
    if (state !== 'idle') return;

    try {
      setState('loading');

      const content = await getIconContent(library, name);

      await navigator.clipboard.writeText(content);
      setState('done');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      toast.error('Failed to copy to clipboard', {
        description: 'Please check your browser permissions.',
      });
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        tabIndex={0}
        className="focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        aria-label="Copy .tsx code"
        aria-disabled={state !== 'idle'}
        data-busy={state !== 'idle' ? '' : undefined}
        onClick={handleCopy}
      >
        <IconState status={state}>
          <Copy
            className="size-4 text-neutral-800 dark:text-neutral-100"
            aria-hidden="true"
          />
        </IconState>
      </TooltipTrigger>
      <TooltipContent>
        Copy{' '}
        <code className="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono">
          .tsx
        </code>{' '}
        code
      </TooltipContent>
    </Tooltip>
  );
};

const Actions = ({ name }: Pick<Icon, 'name'>) => {
  return (
    <TooltipProvider>
      <div className="my-6 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-100 group-hover/card:opacity-100 has-focus-visible:opacity-100 has-data-busy:opacity-100 has-data-popup-open:opacity-100 [@media(hover:none)]:opacity-100">
        <CopyCodeAction name={name} />
        <CopyCLIAction name={name} />
      </div>
    </TooltipProvider>
  );
};

const CardTitle = Title;
const CardActions = Actions;

export { Card, CardTitle, CardActions };
