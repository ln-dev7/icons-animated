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
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorHandHeartIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorHandHeartIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HEART_VARIANTS: Variants = {
  normal: {
    translateY: 0,
    scale: 1,
    transition: {
      delay: 0.1,
      scale: { duration: 0.2 },
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    translateY: [0, -2],
    scale: [1, 1.1],
    transition: {
      delay: 0.1,
      scale: { duration: 0.2 },
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
};
const PhosphorHandHeartIcon = forwardRef<
  PhosphorHandHeartIconHandle,
  PhosphorHandHeartIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        style={{ overflow: 'visible' }}
      >
        <g transform="scale(0.09375)">
          <g>
            <defs>
              <clipPath
                id={nativeMaskId + '-clip-0'}
                clipPathUnits="userSpaceOnUse"
              >
                <rect x={-256} y={112} width={768} height={400} />
              </clipPath>
            </defs>
            <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
              <path
                d="M 230.33 141.06 a 24.34 24.34 0 0 0 -18.61 -4.77 C 230.5 117.33 240 98.48 240 80 c 0 -26.47 -21.29 -48 -47.46 -48 A 47.58 47.58 0 0 0 156 48.75 A 47.58 47.58 0 0 0 119.46 32 C 93.29 32 72 53.53 72 80 c 0 11 3.24 21.69 10.06 33 a 31.87 31.87 0 0 0 -14.75 8.4 L 44.69 144 H 16 A 16 16 0 0 0 0 160 v 40 a 16 16 0 0 0 16 16 H 120 a 7.93 7.93 0 0 0 1.94 -0.24 l 64 -16 a 6.94 6.94 0 0 0 1.19 -0.4 L 226 182.82 l 0.44 -0.2 a 24.6 24.6 0 0 0 3.93 -41.56 Z M 119.46 48 A 31.15 31.15 0 0 1 148.6 67 a 8 8 0 0 0 14.8 0 a 31.15 31.15 0 0 1 29.14 -19 C 209.59 48 224 62.65 224 80 c 0 19.51 -15.79 41.58 -45.66 63.9 l -11.09 2.55 A 28 28 0 0 0 140 112 H 100.68 C 92.05 100.36 88 90.12 88 80 C 88 62.65 102.41 48 119.46 48 Z M 16 160 H 40 v 40 H 16 Z M 219.43 168.21 l -38 16.18 L 119 200 H 56 V 155.31 l 22.63 -22.62 A 15.86 15.86 0 0 1 89.94 128 H 140 a 12 12 0 0 1 0 24 H 112 a 8 8 0 0 0 0 16 h 32 a 8.32 8.32 0 0 0 1.79 -0.2 l 67 -15.41 l 0.31 -0.08 a 8.6 8.6 0 0 1 6.3 15.9 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </g>

        <motion.g
          animate={reduceDefinition(controls)}
          variants={HEART_VARIANTS}
          style={{ 'transformOrigin': '14.625px 6.75px' }}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-1'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <rect x={-256} y={-256} width={768} height={368} />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                <path
                  d="M 230.33 141.06 a 24.34 24.34 0 0 0 -18.61 -4.77 C 230.5 117.33 240 98.48 240 80 c 0 -26.47 -21.29 -48 -47.46 -48 A 47.58 47.58 0 0 0 156 48.75 A 47.58 47.58 0 0 0 119.46 32 C 93.29 32 72 53.53 72 80 c 0 11 3.24 21.69 10.06 33 a 31.87 31.87 0 0 0 -14.75 8.4 L 44.69 144 H 16 A 16 16 0 0 0 0 160 v 40 a 16 16 0 0 0 16 16 H 120 a 7.93 7.93 0 0 0 1.94 -0.24 l 64 -16 a 6.94 6.94 0 0 0 1.19 -0.4 L 226 182.82 l 0.44 -0.2 a 24.6 24.6 0 0 0 3.93 -41.56 Z M 119.46 48 A 31.15 31.15 0 0 1 148.6 67 a 8 8 0 0 0 14.8 0 a 31.15 31.15 0 0 1 29.14 -19 C 209.59 48 224 62.65 224 80 c 0 19.51 -15.79 41.58 -45.66 63.9 l -11.09 2.55 A 28 28 0 0 0 140 112 H 100.68 C 92.05 100.36 88 90.12 88 80 C 88 62.65 102.41 48 119.46 48 Z M 16 160 H 40 v 40 H 16 Z M 219.43 168.21 l -38 16.18 L 119 200 H 56 V 155.31 l 22.63 -22.62 A 15.86 15.86 0 0 1 89.94 128 H 140 a 12 12 0 0 1 0 24 H 112 a 8 8 0 0 0 0 16 h 32 a 8.32 8.32 0 0 0 1.79 -0.2 l 67 -15.41 l 0.31 -0.08 a 8.6 8.6 0 0 1 6.3 15.9 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorHandHeartIcon.displayName = 'PhosphorHandHeartIcon';
export { PhosphorHandHeartIcon };

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
