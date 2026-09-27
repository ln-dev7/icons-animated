/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: zap-off @ 072c38b1b04ea738d90a084485ccaad4b890ddca
 *
 * Copyright (c) 2023 Phosphor Icons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
import type {
  TargetAndTransition as NativeMotionTarget,
  Variants as NativeMotionVariants,
  Variants,
} from 'motion/react';
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

function nativePartTarget(
  target: Record<string, unknown>,
  draw: boolean | 'geometry'
): NativeMotionTarget {
  const drawKeys = new Set([
    'pathLength',
    'pathOffset',
    'pathSpacing',
    'strokeDasharray',
    'strokeDashoffset',
  ]);
  return Object.fromEntries(
    Object.entries(target).filter(
      ([key]) =>
        key === 'transition' ||
        (draw === 'geometry'
          ? key === 'd'
          : key !== 'd' && (draw ? drawKeys.has(key) : !drawKeys.has(key)))
    )
  ) as NativeMotionTarget;
}
function nativePartVariants(
  variants: Record<string, unknown>,
  draw: boolean | 'geometry'
): NativeMotionVariants {
  return Object.fromEntries(
    Object.entries(variants).map(([name, target]) => [
      name,
      typeof target === 'function'
        ? (...args: unknown[]) => nativePartTarget(target(...args), draw)
        : nativePartTarget(target as Record<string, unknown>, draw),
    ])
  ) as NativeMotionVariants;
}
export interface PhosphorLightningSlashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorLightningSlashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
};
const PhosphorLightningSlashIcon = forwardRef<
  PhosphorLightningSlashIconHandle,
  PhosphorLightningSlashIconProps
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
  const PATHS = [
    'M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317',
    'M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773',
    'M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643',
    'm2 2 20 20',
  ];
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
      >
        {PATHS.map((d, i) => (
          <motion.g
            animate={reduceDefinition(controls)}
            custom={i * 0.15}
            key={i}
            variants={nativePartVariants(PATH_VARIANTS, false)}
          >
            <defs>
              <mask
                id={nativeMaskId + '-0' + '-' + i}
                maskUnits="userSpaceOnUse"
                x="-24"
                y="-24"
                width="72"
                height="72"
              >
                <motion.path
                  d={
                    [
                      'M10.5 6.4L15 1.5L13.5 9',
                      'M13.5 9L19.5 11.4L17.5 13.5',
                      'M15.4 16.1L9 22.5L10.7 15L4.7 12.8L8.5 8.8',
                      'M4.5 3.75L19.5 20.25',
                    ][i]
                  }
                  fill="none"
                  stroke="white"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={reduceDefinition(controls)}
                  custom={i * 0.15}
                  key={i}
                  variants={nativePartVariants(PATH_VARIANTS, true)}
                />
              </mask>
            </defs>
            <g mask={'url(#' + nativeMaskId + '-0' + '-' + i + ')'}>
              {i === 0 && (
                <g transform="scale(0.09375)">
                  <g>
                    <defs>
                      <clipPath
                        id={nativeMaskId + '-clip-1'}
                        clipPathUnits="userSpaceOnUse"
                      >
                        <rect x={-256} y={-256} width={768} height={352} />
                      </clipPath>
                    </defs>
                    <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                      <path
                        d="M 108.66 71 a 8 8 0 0 1 -0.39 -11.31 l 45.88 -49.16 a 8 8 0 0 1 13.69 7 L 153.18 90.9 l 57.63 21.61 a 8 8 0 0 1 3 12.95 l -22.3 23.89 a 8 8 0 0 1 -11.7 -10.91 L 194 123.29 l -52.8 -19.8 a 8 8 0 0 1 -5 -9.06 l 10.47 -52.38 L 120 70.62 A 8 8 0 0 1 108.66 71 Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </g>
              )}
              {i === 1 && (
                <g transform="scale(0.09375)">
                  <g>
                    <defs>
                      <clipPath
                        id={nativeMaskId + '-clip-3'}
                        clipPathUnits="userSpaceOnUse"
                      >
                        <rect x={-256} y={96} width={768} height={416} />
                      </clipPath>
                    </defs>
                    <g clipPath={'url(#' + nativeMaskId + '-clip-3)'}>
                      <path
                        d="M 108.66 71 a 8 8 0 0 1 -0.39 -11.31 l 45.88 -49.16 a 8 8 0 0 1 13.69 7 L 153.18 90.9 l 57.63 21.61 a 8 8 0 0 1 3 12.95 l -22.3 23.89 a 8 8 0 0 1 -11.7 -10.91 L 194 123.29 l -52.8 -19.8 a 8 8 0 0 1 -5 -9.06 l 10.47 -52.38 L 120 70.62 A 8 8 0 0 1 108.66 71 Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </g>
              )}
              {i === 2 && (
                <g transform="scale(0.09375)">
                  <g>
                    <defs>
                      <clipPath
                        id={nativeMaskId + '-clip-0'}
                        clipPathUnits="userSpaceOnUse"
                      >
                        <path
                          d="M-24-24H48V48H-24Z M-24 -28.8L48 50.4L48 52.8L-24 -26.4Z"
                          transform="scale(10.666666666666666)"
                          clipRule="evenodd"
                          shapeRendering="crispEdges"
                        />
                      </clipPath>
                    </defs>
                    <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
                      <path
                        d="M 53.92 34.62 A 8 8 0 1 0 42.08 45.38 L 81.33 88.56 l -39.18 42 a 8 8 0 0 0 3 13 l 57.63 21.61 L 88.16 238.43 a 8 8 0 0 0 13.69 7 l 61.86 -66.28 l 38.37 42.2 a 8 8 0 1 0 11.84 -10.76 Z M 109.37 214 l 10.47 -52.38 a 8 8 0 0 0 -5 -9.06 L 62 132.71 l 30.12 -32.27 l 60.78 66.86 Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </g>
              )}
              {i === 3 && (
                <g transform="scale(0.09375)">
                  <g>
                    <defs>
                      <clipPath
                        id={nativeMaskId + '-clip-2'}
                        clipPathUnits="userSpaceOnUse"
                      >
                        <path
                          d="M-24 -28.8L48 50.4L48 52.8L-24 -26.4Z"
                          transform="scale(10.666666666666666)"
                          clipRule="evenodd"
                          shapeRendering="crispEdges"
                        />
                      </clipPath>
                    </defs>
                    <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                      <path
                        d="M 53.92 34.62 A 8 8 0 1 0 42.08 45.38 L 81.33 88.56 l -39.18 42 a 8 8 0 0 0 3 13 l 57.63 21.61 L 88.16 238.43 a 8 8 0 0 0 13.69 7 l 61.86 -66.28 l 38.37 42.2 a 8 8 0 1 0 11.84 -10.76 Z M 109.37 214 l 10.47 -52.38 a 8 8 0 0 0 -5 -9.06 L 62 132.71 l 30.12 -32.27 l 60.78 66.86 Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </g>
              )}
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
});
PhosphorLightningSlashIcon.displayName = 'PhosphorLightningSlashIcon';
export { PhosphorLightningSlashIcon };

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
