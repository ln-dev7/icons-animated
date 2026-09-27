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

export interface PhosphorDotsNineIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface GripProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const CIRCLES = [
  { cx: 19, cy: 5 },
  { cx: 19, cy: 12 },
  { cx: 12, cy: 5 },
  { cx: 19, cy: 19 },
  { cx: 12, cy: 12 },
  { cx: 5, cy: 5 },
  { cx: 12, cy: 19 },
  { cx: 5, cy: 12 },
  { cx: 5, cy: 19 },
];
const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  animate: (index: number) => ({
    opacity: [1, 0.3, 0.3, 1],
    transition: {
      delay: index * 0.07,
      duration: 1.1,
      times: [0, 0.2, 0.8, 1],
    },
  }),
};
const PhosphorDotsNineIcon = forwardRef<PhosphorDotsNineIconHandle, GripProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const isAnimatingRef = useRef(false);
    const startAnimation = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      await controls.start('animate');
      await controls.start('normal');
      isAnimatingRef.current = false;
    }, [controls]);
    const stopAnimation = useCallback(async () => {
      if (!isAnimatingRef.current) return;
      await controls.start('normal');
      isAnimatingRef.current = false;
    }, [controls]);
    const {
      rootRef: iconRootRef,
      reduceDefinition,
      ...iconAccessibility
    } = useIconAccessibility(ref, () => {
      isControlledRef.current = ref != null;
      return { startAnimation, stopAnimation };
    }, [controls]);
    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          void e;
        } else {
          startAnimation();
        }
      },
      [startAnimation]
    );
    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          void e;
        } else {
          stopAnimation();
        }
      },
      [stopAnimation]
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
          {CIRCLES.map((circle, index) => (
            <motion.g
              animate={reduceDefinition(controls)}
              custom={index}
              initial="normal"
              key={`${circle.cx}-${circle.cy}`}
              variants={VARIANTS}
            >
              {index === 0 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 196 72 a 12 12 0 1 0 -12 -12 A 12 12 0 0 0 196 72 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 1 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 196 116 a 12 12 0 1 0 12 12 A 12 12 0 0 0 196 116 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 2 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 128 48 a 12 12 0 1 0 12 12 A 12 12 0 0 0 128 48 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 3 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 196 184 a 12 12 0 1 0 12 12 A 12 12 0 0 0 196 184 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 4 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 128 116 a 12 12 0 1 0 12 12 A 12 12 0 0 0 128 116 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 5 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 72 60 A 12 12 0 1 1 60 48 A 12 12 0 0 1 72 60 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 6 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 128 184 a 12 12 0 1 0 12 12 A 12 12 0 0 0 128 184 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 7 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 60 116 a 12 12 0 1 0 12 12 A 12 12 0 0 0 60 116 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {index === 8 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 60 184 a 12 12 0 1 0 12 12 A 12 12 0 0 0 60 184 Z"
                    fill="currentColor"
                  />
                </g>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    );
  }
);
PhosphorDotsNineIcon.displayName = 'PhosphorDotsNineIcon';
export { PhosphorDotsNineIcon };

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
