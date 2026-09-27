/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: chrome @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
  Transition,
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
export interface PhosphorGoogleChromeLogoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorGoogleChromeLogoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const TRANSITION: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};
const VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...TRANSITION,
      delay: 0.1 * custom,
    },
  }),
};
const PhosphorGoogleChromeLogoIcon = forwardRef<
  PhosphorGoogleChromeLogoIconHandle,
  PhosphorGoogleChromeLogoIconProps
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
      >
        <g transform="scale(0.09375)">
          <g>
            <defs>
              <clipPath
                id={nativeMaskId + '-clip-0'}
                clipPathUnits="userSpaceOnUse"
              >
                <path
                  d="M-24-24h72v72h-72ZM3.9000000000000004 12a8.1 8.1 0 1 0 16.2 0a8.1 8.1 0 1 0 -16.2 0Z"
                  transform="scale(10.666666666666666)"
                  clipRule="evenodd"
                  shapeRendering="crispEdges"
                />
              </clipPath>
            </defs>
            <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
              <path
                d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z M 128 40 a 88 88 0 0 1 73.72 40 H 128 a 48.08 48.08 0 0 0 -45.6 33 l -23.08 -40 A 87.89 87.89 0 0 1 128 40 Z M 160 128 a 32 32 0 1 1 -32 -32 A 32 32 0 0 1 160 128 Z M 40 128 a 87.44 87.44 0 0 1 9.56 -39.86 L 86.43 152 c 0.06 0.1 0.13 0.19 0.19 0.28 A 48 48 0 0 0 137.82 175 l -23.1 40 A 88.14 88.14 0 0 1 40 128 Z M 132.69 215.87 L 169.57 152 c 0.08 -0.14 0.14 -0.28 0.22 -0.42 a 47.88 47.88 0 0 0 -6 -55.58 H 210 a 88 88 0 0 1 -77.29 119.87 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </g>
        <motion.g
          animate={reduceDefinition(controls)}
          custom={0}
          variants={nativePartVariants(VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-1'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M8.25 12a3.75 3.75 0 1 0 7.5 0a3.75 3.75 0 1 0 -7.5 0Z"
                fill="none"
                stroke="white"
                strokeWidth={2.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                custom={0}
                variants={nativePartVariants(VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-1' + ')'}>
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-1'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path
                      d="M7.35 12a4.65 4.65 0 1 0 9.3 0a4.65 4.65 0 1 0 -9.3 0Z"
                      transform="scale(10.666666666666666)"
                      clipRule="evenodd"
                      shapeRendering="crispEdges"
                    />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                  <path
                    d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z M 128 40 a 88 88 0 0 1 73.72 40 H 128 a 48.08 48.08 0 0 0 -45.6 33 l -23.08 -40 A 87.89 87.89 0 0 1 128 40 Z M 160 128 a 32 32 0 1 1 -32 -32 A 32 32 0 0 1 160 128 Z M 40 128 a 87.44 87.44 0 0 1 9.56 -39.86 L 86.43 152 c 0.06 0.1 0.13 0.19 0.19 0.28 A 48 48 0 0 0 137.82 175 l -23.1 40 A 88.14 88.14 0 0 1 40 128 Z M 132.69 215.87 L 169.57 152 c 0.08 -0.14 0.14 -0.28 0.22 -0.42 a 47.88 47.88 0 0 0 -6 -55.58 H 210 a 88 88 0 0 1 -77.29 119.87 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          custom={3}
          variants={nativePartVariants(VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-2'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M19.75 8.25H12"
                fill="none"
                stroke="white"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                custom={3}
                variants={nativePartVariants(VARIANTS, true)}
              />
              <motion.path
                d="M4.9 7.9L9 14.4"
                fill="none"
                stroke="white"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                custom={3}
                variants={nativePartVariants(VARIANTS, true)}
              />
              <motion.path
                d="M11.4 20.5L15.3 13.8"
                fill="none"
                stroke="white"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                custom={3}
                variants={nativePartVariants(VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-2' + ')'}>
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-2'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path
                      d="M3.9000000000000004 12a8.1 8.1 0 1 0 16.2 0a8.1 8.1 0 1 0 -16.2 0ZM7.35 12a4.65 4.65 0 1 0 9.3 0a4.65 4.65 0 1 0 -9.3 0Z"
                      transform="scale(10.666666666666666)"
                      clipRule="evenodd"
                      shapeRendering="crispEdges"
                    />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                  <path
                    d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z M 128 40 a 88 88 0 0 1 73.72 40 H 128 a 48.08 48.08 0 0 0 -45.6 33 l -23.08 -40 A 87.89 87.89 0 0 1 128 40 Z M 160 128 a 32 32 0 1 1 -32 -32 A 32 32 0 0 1 160 128 Z M 40 128 a 87.44 87.44 0 0 1 9.56 -39.86 L 86.43 152 c 0.06 0.1 0.13 0.19 0.19 0.28 A 48 48 0 0 0 137.82 175 l -23.1 40 A 88.14 88.14 0 0 1 40 128 Z M 132.69 215.87 L 169.57 152 c 0.08 -0.14 0.14 -0.28 0.22 -0.42 a 47.88 47.88 0 0 0 -6 -55.58 H 210 a 88 88 0 0 1 -77.29 119.87 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          custom={3}
          variants={VARIANTS}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          custom={3}
          variants={VARIANTS}
        />
      </svg>
    </div>
  );
});
PhosphorGoogleChromeLogoIcon.displayName = 'PhosphorGoogleChromeLogoIcon';
export { PhosphorGoogleChromeLogoIcon };

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
