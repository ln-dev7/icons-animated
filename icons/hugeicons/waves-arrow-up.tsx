'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
import type { Variants } from 'motion/react';
import type { ForwardedRef, HTMLAttributes } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HugeiconsWavesArrowUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsWavesArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HEAD_VARIANTS: Variants = {
  normal: {
    translateY: 0,
  },
  animate: {
    translateY: [0, -3, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
const SHAFT_VARIANTS: Variants = {
  normal: {
    translateX: 0,
    translateY: 0,
    scale: 1,
  },
  animate: {
    translateY: [0, -3, 0],
    scale: [1, 0.85, 1],
    originX: 1,
    originY: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
const HugeiconsWavesArrowUpIcon = forwardRef<
  HugeiconsWavesArrowUpIconHandle,
  HugeiconsWavesArrowUpIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        controls.start('animate');
      }
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        controls.start('normal');
      }
    },
    [controls]
  );
  return (
    <div
      className={cn(className)}
      {...props}
      ref={iconRootRef}
      onMouseEnter={(event) => {
        if (!iconAccessibility.controlled && !iconAccessibility.reduced) {
          handleMouseEnter(event);
        }
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (!iconAccessibility.controlled) {
          handleMouseLeave(event);
        }
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        if (!iconAccessibility.controlled && !iconAccessibility.reduced) {
          iconAccessibility.startAnimation();
        }
        props.onFocus?.(event);
      }}
      onBlur={(event) => {
        if (!iconAccessibility.controlled) {
          iconAccessibility.stopAnimation();
        }
        props.onBlur?.(event);
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
        animate={reduceDefinition(controls)}
        style={{ overflow: 'visible' }}
      >
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={SHAFT_VARIANTS}
        >
          <path
            d="M 12.75 4 C 12.75 3.58579 12.4142 3.25 12 3.25 C 11.5858 3.25 11.25 3.58579 11.25 4 L 12 4 L 12.75 4 Z M 11.25 9 C 11.25 9.41421 11.5858 9.75 12 9.75 C 12.4142 9.75 12.75 9.41421 12.75 9 H 12 H 11.25 Z M 12 4 L 11.25 4 L 11.25 9 H 12 H 12.75 L 12.75 4 L 12 4 Z"
            fill="currentColor"
          />
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={HEAD_VARIANTS}
        >
          <path
            d="M 12 3 L 12 2.25 L 12 3 Z M 14.3961 6.44474 C 14.6417 6.77826 15.1112 6.8495 15.4448 6.60387 C 15.7783 6.35823 15.8495 5.88873 15.6039 5.55521 L 15 5.99998 L 14.3961 6.44474 Z M 8.3961 5.55525 C 8.15047 5.88877 8.22172 6.35827 8.55525 6.6039 C 8.88877 6.84953 9.35827 6.77828 9.6039 6.44475 L 9 6 L 8.3961 5.55525 Z M 12 3 L 12 3.75 C 11.8899 3.75 11.866 3.70934 11.9686 3.77122 C 12.0507 3.82069 12.1639 3.90553 12.3056 4.03079 C 12.5875 4.27978 12.9127 4.62608 13.2301 4.9917 C 13.5443 5.3536 13.8366 5.71769 14.0512 5.99266 C 14.1581 6.12974 14.2451 6.24376 14.305 6.32311 C 14.335 6.36276 14.3582 6.3937 14.3736 6.41447 C 14.3814 6.42485 14.3872 6.43269 14.391 6.43779 C 14.3929 6.44035 14.3942 6.44222 14.3951 6.44338 C 14.3955 6.44397 14.3958 6.44437 14.396 6.4446 C 14.3961 6.44471 14.3961 6.44478 14.3962 6.44481 C 14.3962 6.44482 14.3962 6.4448 14.3962 6.44481 C 14.3961 6.44478 14.3961 6.44474 15 5.99998 C 15.6039 5.55521 15.6038 5.55515 15.6038 5.55508 C 15.6038 5.55504 15.6037 5.55495 15.6036 5.55487 C 15.6035 5.55471 15.6034 5.55451 15.6032 5.55426 C 15.6028 5.55376 15.6023 5.55308 15.6017 5.55222 C 15.6004 5.5505 15.5986 5.54807 15.5963 5.54495 C 15.5917 5.5387 15.585 5.52969 15.5764 5.5181 C 15.5591 5.49493 15.534 5.46141 15.502 5.41904 C 15.438 5.33432 15.3462 5.21396 15.2337 5.0698 C 15.0093 4.78228 14.6997 4.39638 14.3628 4.00828 C 14.029 3.62391 13.6537 3.22021 13.2988 2.90671 C 13.1223 2.75072 12.9332 2.60119 12.7431 2.48659 C 12.5736 2.38441 12.3077 2.25 12 2.25 L 12 3 Z M 9 6 C 9.6039 6.44475 9.60387 6.44479 9.60385 6.44482 C 9.60385 6.44482 9.60384 6.44483 9.60385 6.44482 C 9.60387 6.4448 9.60392 6.44473 9.604 6.44461 C 9.60417 6.44439 9.60447 6.44398 9.6049 6.4434 C 9.60576 6.44223 9.60714 6.44036 9.60904 6.43781 C 9.61282 6.4327 9.61863 6.42486 9.62637 6.41448 C 9.64185 6.39371 9.66501 6.36277 9.69496 6.32312 C 9.75488 6.24378 9.84186 6.12976 9.94884 5.99267 C 10.1634 5.7177 10.4556 5.3536 10.7699 4.9917 C 11.0873 4.62608 11.4125 4.27978 11.6943 4.03078 C 11.8361 3.90553 11.9493 3.82068 12.0313 3.77122 C 12.1339 3.70934 12.11 3.75 12 3.75 L 12 3 L 12 2.25 C 11.6923 2.25 11.4264 2.38441 11.2569 2.48659 C 11.0668 2.60119 10.8777 2.75072 10.7011 2.90671 C 10.3463 3.22022 9.97093 3.62392 9.6372 4.00829 C 9.30024 4.3964 8.9907 4.7823 8.76631 5.06983 C 8.65381 5.21399 8.56199 5.33435 8.498 5.41907 C 8.466 5.46145 8.44091 5.49496 8.42364 5.51814 C 8.415 5.52973 8.40831 5.53874 8.40369 5.54498 C 8.40138 5.5481 8.39958 5.55054 8.39831 5.55225 C 8.39767 5.55311 8.39717 5.55379 8.3968 5.55429 C 8.39662 5.55454 8.39647 5.55475 8.39635 5.55491 C 8.39629 5.55499 8.39623 5.55507 8.3962 5.55511 C 8.39615 5.55518 8.3961 5.55525 9 6 Z"
            fill="currentColor"
          />
        </motion.g>
        <path
          d="M2 14.1932C2.68524 15.2443 3.57104 15.2443 4.27299 14.1932C6.52985 10.7408 8.67954 16.6764 10.273 14.2321C12.703 10.5694 14.4508 16.9218 16.273 14.1932C18.6492 10.5582 20.1295 16.5776 22 14.5842"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2 20.1932C2.68524 21.2443 3.57104 21.2443 4.27299 20.1932C6.52985 16.7408 8.67954 22.6764 10.273 20.2321C12.703 16.5694 14.4508 22.9218 16.273 20.1932C18.6492 16.5582 20.1295 22.5776 22 20.5842"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
});
HugeiconsWavesArrowUpIcon.displayName = 'HugeiconsWavesArrowUpIcon';
export { HugeiconsWavesArrowUpIcon };

type IconAccessibilityHandle = {
  startAnimation: () => unknown;
  stopAnimation: () => unknown;
};

type IconAccessibilitySnapshot = {
  visual: VisualElement;
  values: ResolvedValues;
  attributes: Record<string, string>;
};

function useIconAccessibility(
  ref: ForwardedRef<IconAccessibilityHandle>,
  createHandle: () => IconAccessibilityHandle,
  controllers: LegacyAnimationControls[]
) {
  const rawHandle = createHandle();
  const raw = useRef(rawHandle);
  useEffect(() => {
    raw.current = rawHandle;
  }, [rawHandle]);
  const controls = useRef(controllers);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const preference = useRef(false);
  const mounted = useRef(true);
  const [reduced, setReduced] = useState(false);
  const api = useMemo(
    () => ({
      startAnimation() {
        if (
          mounted.current &&
          !preference.current &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          void raw.current.startAnimation();
        }
      },
      stopAnimation() {
        if (mounted.current) void raw.current.stopAnimation();
      },
    }),
    []
  );
  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    mounted.current = true;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const snapshots: IconAccessibilitySnapshot[] = [];
    rootRef.current
      ?.querySelectorAll<SVGElement>('svg, svg *')
      .forEach((element) => {
        const visual = visualElementStore.get(element);
        if (visual)
          snapshots.push({
            visual,
            values: { ...visual.latestValues },
            attributes: Object.fromEntries(
              [...element.attributes].map((attribute) => [
                attribute.name,
                attribute.value,
              ])
            ),
          });
      });
    const restore = () => {
      for (const snapshot of snapshots) {
        const { visual, values, attributes } = snapshot;
        visual.values.forEach((value) => value.stop());
        const props = visual.getProps() as unknown as {
          [key: string]: unknown;
          style?: Record<string, unknown>;
        };
        const reset: Record<string, string | number> = {};
        visual.values.forEach((_motionValue, key) => {
          const attribute = key.replace(
            /[A-Z]/g,
            (letter) => '-' + letter.toLowerCase()
          );
          const defaults: Record<string, number> = {
            opacity: 1,
            pathLength: 1,
            pathSpacing: 1,
            pathOffset: 0,
            strokeDashoffset: 0,
          };
          const value =
            values[key] ??
            props.style?.[key] ??
            props[key] ??
            getDefaultValueType(key)?.default ??
            defaults[key] ??
            attributes[attribute];
          if (typeof value === 'number' || typeof value === 'string')
            reset[key] = value;
        });
        setTarget(visual, reset);
        visual.render();
      }
    };
    const activeControls = controls.current;
    const originals = activeControls.map((control) => {
      const original = control.start;
      control.start = (definition, transition) => {
        if (!mounted.current) return new Promise<never>(() => {});
        if (preference.current) {
          control.set(definition);
          return Promise.resolve();
        }
        return original(definition, transition);
      };
      return original;
    });
    const change = () => {
      preference.current = media.matches;
      setReduced(media.matches);
      if (media.matches) {
        void raw.current.stopAnimation();
        activeControls.forEach((control) => control.stop());
        restore();
      }
    };
    change();
    media.addEventListener('change', change);
    return () => {
      mounted.current = false;
      media.removeEventListener('change', change);
      activeControls.forEach((control, index) => {
        control.stop();
        control.start = originals[index];
      });
    };
  }, []);

  return {
    ...api,
    rootRef,
    controlled: ref != null,
    reduced,
    reduceDefinition<T>(definition: T): T {
      if (
        reduced &&
        definition &&
        typeof definition === 'object' &&
        !Array.isArray(definition) &&
        !('start' in definition)
      ) {
        return {
          ...definition,
          transition: { type: false, duration: 0, delay: 0, repeat: 0 },
        } as T;
      }
      return definition;
    },
  };
}
