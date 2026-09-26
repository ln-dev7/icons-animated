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
import { FRAMEWORK_INFO } from '@/constants/frameworks';
import { useTouchDevice } from '@/hooks/use-touch-device';
import { getIconInstallCommand } from '@/lib/get-icon-install-command';
import { cn } from '@/lib/utils';
import { useIconFramework } from '@/providers/icon-framework';
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

  const stopAnimation = () => {
    animationRef?.current?.stopAnimation();
    setIsAnimating(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startAnimation = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    animationRef?.current?.startAnimation();
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animationRef?.current?.stopAnimation();
      timeoutRef.current = null;
    }, 1500);
  };

  const toggleAnimation = () => {
    if (isAnimating) stopAnimation();
    else startAnimation();
  };

  return (
    <div
      className="group/card focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle relative flex flex-col items-center justify-center bg-white px-[28px] pt-[50px] focus-visible:outline-2 focus-visible:-outline-offset-2 dark:bg-[#0A0A0A]"
      role="group"
      tabIndex={0}
      {...props}
      onMouseEnter={!isTouchDevice ? props.onMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? props.onMouseLeave : undefined}
      onFocus={(event) => {
        props.onFocus?.(event);
        if (event.target === event.currentTarget) startAnimation();
      }}
      onBlur={(event) => {
        props.onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget)) stopAnimation();
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault();
          toggleAnimation();
        }
      }}
    >
      <button
        type="button"
        aria-label={isAnimating ? 'Stop animation' : 'Play animation'}
        aria-pressed={isAnimating}
        onClick={(event) => {
          event.stopPropagation();
          toggleAnimation();
        }}
        className={cn(
          'focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle absolute top-3 right-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color,opacity] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700',
          !isTouchDevice &&
            'opacity-0 group-focus-within/card:opacity-100 group-hover/card:opacity-100 focus-visible:opacity-100'
        )}
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

const useCopyState = () => {
  const [state, setState] = useState<IconStatus>('idle');
  const mounted = useRef(false);
  const busy = useRef(false);
  const request = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current += 1;
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const isCurrent = (id: number) => mounted.current && request.current === id;

  const begin = () => {
    if (!mounted.current || busy.current) return null;
    busy.current = true;
    const id = ++request.current;
    setState('loading');
    return id;
  };

  const finish = (id: number, status: 'done' | 'error') => {
    if (!isCurrent(id)) return;
    setState(status);
    timeout.current = setTimeout(() => {
      if (!isCurrent(id)) return;
      busy.current = false;
      timeout.current = null;
      setState('idle');
    }, 2000);
  };

  return { state, begin, isCurrent, finish };
};

const CopyCLIAction = ({ name }: Pick<Icon, 'name'>) => {
  const { packageName } = usePackageNameContext();
  const { library } = useIconLibrary();
  const { framework } = useIconFramework();

  const { state, begin, isCurrent, finish } = useCopyState();

  const handleCopy = async () => {
    const request = begin();
    if (request === null) return;

    try {
      if (!isCurrent(request)) return;
      await navigator.clipboard.writeText(
        getIconInstallCommand(packageName, library, name, framework)
      );
      finish(request, 'done');
    } catch {
      if (!isCurrent(request)) return;
      toast.error('Failed to copy to clipboard', {
        description: 'Please check your browser permissions.',
      });
      finish(request, 'error');
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        tabIndex={0}
        aria-label={`Copy ${FRAMEWORK_INFO[framework].name} install command`}
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
          {FRAMEWORK_INFO[framework].cli}
        </code>{' '}
        command
      </TooltipContent>
    </Tooltip>
  );
};

const CopyCodeAction = ({ name }: Pick<Icon, 'name'>) => {
  const { library } = useIconLibrary();
  const { framework } = useIconFramework();

  const { state, begin, isCurrent, finish } = useCopyState();

  const handleCopy = async () => {
    const request = begin();
    if (request === null) return;

    try {
      const content = await getIconContent(library, name, framework);
      if (!isCurrent(request)) return;
      await navigator.clipboard.writeText(content);
      finish(request, 'done');
    } catch {
      if (!isCurrent(request)) return;
      toast.error('Failed to copy to clipboard', {
        description: 'Please check your browser permissions.',
      });
      finish(request, 'error');
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        tabIndex={0}
        className="focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
        aria-label={`Copy .${FRAMEWORK_INFO[framework].extension} code`}
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
          .{FRAMEWORK_INFO[framework].extension}
        </code>{' '}
        code
      </TooltipContent>
    </Tooltip>
  );
};

const Actions = ({ name }: Pick<Icon, 'name'>) => {
  const { library } = useIconLibrary();
  const { framework } = useIconFramework();
  const actionKey = `${library}-${framework}-${name}`;

  return (
    <TooltipProvider>
      <div className="my-6 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-100 group-focus-within/card:opacity-100 group-hover/card:opacity-100 has-focus-visible:opacity-100 has-data-busy:opacity-100 has-data-popup-open:opacity-100 [@media(hover:none)]:opacity-100">
        <CopyCodeAction key={`code-${actionKey}`} name={name} />
        <CopyCLIAction key={`cli-${actionKey}`} name={name} />
      </div>
    </TooltipProvider>
  );
};

const CardTitle = Title;
const CardActions = Actions;

export { Card, CardTitle, CardActions };
