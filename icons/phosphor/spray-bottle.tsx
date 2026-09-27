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

export interface PhosphorSprayBottleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSprayBottleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const SPRAY_DOT_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  animate: (index: number) => ({
    opacity: [0, 1, 0],
    transition: {
      delay: index * 0.07,
      duration: 1.05 + index * 0.06,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
      times: [0, 0.45, 1],
    },
  }),
};
const DOT_PATHS_RTL = [
  { d: 'M11 7h.01', key: 'dot-3' },
  { d: 'M7 5h.01', key: 'dot-2' },
  { d: 'M7 9h.01', key: 'dot-5' },
  { d: 'M3 3h.01', key: 'dot-1' },
  { d: 'M3 7h.01', key: 'dot-4' },
  { d: 'M3 11h.01', key: 'dot-6' },
] as const;
const PhosphorSprayBottleIcon = forwardRef<
  PhosphorSprayBottleIconHandle,
  PhosphorSprayBottleIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isAnimatingRef = useRef(false);
  const isRefControlled = ref != null;
  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    controls.start('animate').catch(() => {});
  }, [controls]);
  const stopAnimation = useCallback(async () => {
    isAnimatingRef.current = false;
    await controls.start('normal');
  }, [controls]);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(
    ref,
    () => ({
      startAnimation,
      stopAnimation,
    }),
    [controls]
  );
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isRefControlled) {
        void e;
      } else {
        startAnimation();
      }
    },
    [isRefControlled, startAnimation]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isRefControlled) {
        void e;
      } else {
        stopAnimation();
      }
    },
    [isRefControlled, stopAnimation]
  );
  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="scale(0.09375)">
          <path
            d="M 200 80 a 8 8 0 0 0 8 -8 a 56.06 56.06 0 0 0 -56 -56 H 80 A 16 16 0 0 0 64 32 V 80 a 24 24 0 0 1 -24 24 a 8 8 0 0 0 0 16 A 40 40 0 0 0 80 80 h 32 v 24.62 a 23.87 23.87 0 0 1 -9 18.74 L 87 136.15 a 39.79 39.79 0 0 0 -15 31.23 V 224 a 16 16 0 0 0 16 16 H 192 a 16 16 0 0 0 16 -16 V 211.47 A 270.88 270.88 0 0 0 174 80 Z M 80 32 h 72 a 40.08 40.08 0 0 1 39.2 32 H 80 Z M 192 211.47 V 224 H 88 V 167.38 a 23.87 23.87 0 0 1 9 -18.74 l 16 -12.79 a 39.79 39.79 0 0 0 15 -31.23 V 80 h 27.52 A 254.86 254.86 0 0 1 192 211.47 Z"
            fill="currentColor"
          />
        </g>

        <g>
          {DOT_PATHS_RTL.map((item, index) => (
            <motion.path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              animate={reduceDefinition(controls)}
              custom={index}
              d={item.d}
              initial="normal"
              key={item.key}
              variants={SPRAY_DOT_VARIANTS}
            />
          ))}
        </g>
      </svg>
    </div>
  );
});
PhosphorSprayBottleIcon.displayName = 'PhosphorSprayBottleIcon';
export { PhosphorSprayBottleIcon };

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
