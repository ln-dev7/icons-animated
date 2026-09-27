/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: keyboard @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
import { AnimatePresence, motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorKeyboardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorKeyboardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const KEYBOARD_PATHS = [
  { id: 'key1', d: 'M10 8h.01' },
  { id: 'key2', d: 'M12 12h.01' },
  { id: 'key3', d: 'M14 8h.01' },
  { id: 'key4', d: 'M16 12h.01' },
  { id: 'key5', d: 'M18 8h.01' },
  { id: 'key6', d: 'M6 8h.01' },
  { id: 'key7', d: 'M7 16h10' },
  { id: 'key8', d: 'M8 12h.01' },
];
const PhosphorKeyboardIcon = forwardRef<
  PhosphorKeyboardIconHandle,
  PhosphorKeyboardIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
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
      startAnimation: () => setIsHovered(true),
      stopAnimation: () => setIsHovered(false),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        setIsHovered(true);
      }
    },
    []
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        setIsHovered(false);
      }
    },
    []
  );
  useEffect(() => {
    const animateKeys = async () => {
      if (isHovered) {
        await controls.start((i) => ({
          opacity: [1, 0.2, 1],
          transition: {
            duration: 1.5,
            times: [0, 0.5, 1],
            delay: i * 0.2 * Math.random(),
            repeat: 1,
            repeatType: 'reverse',
          },
        }));
      } else {
        controls.stop();
        controls.set({ opacity: 1 });
      }
    };
    animateKeys();
  }, [isHovered, controls]);
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
          <path
            d="M 224 48 H 32 A 16 16 0 0 0 16 64 V 192 a 16 16 0 0 0 16 16 H 224 a 16 16 0 0 0 16 -16 V 64 A 16 16 0 0 0 224 48 Z M 224 192 H 32 V 64 H 224 V 192 Z"
            fill="currentColor"
          />
        </g>
        {iconAccessibility.reduced ? (
          <>
            {KEYBOARD_PATHS.map((path, index) => (
              <motion.g
                animate={reduceDefinition(controls)}
                custom={index}
                initial={{ opacity: 1 }}
                key={path.id}
              >
                {index === 0 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-6'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={85.33333333333333}
                            y={-256}
                            width={42.666666666666664}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-6)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 1 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-9'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={106.66666666666667}
                            y={-256}
                            width={42.666666666666664}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-9)'}>
                        <path
                          d="M 208 128 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 128 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 2 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-7'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={128}
                            y={-256}
                            width={42.666666666666664}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-7)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 3 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-10'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={149.33333333333334}
                            y={-256}
                            width={362.6666666666667}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-10)'}>
                        <path
                          d="M 208 128 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 128 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 4 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-8'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={170.66666666666666}
                            y={-256}
                            width={341.3333333333333}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-8)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 5 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-2'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={-256}
                            y={-256}
                            width={341.3333333333333}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 6 && (
                  <g transform="scale(0.09375)">
                    <path
                      d="M 72 160 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 h 8 A 8 8 0 0 1 72 160 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M 168 160 a 8 8 0 0 1 -8 8 H 96 a 8 8 0 0 1 0 -16 h 64 A 8 8 0 0 1 168 160 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M 208 160 a 8 8 0 0 1 -8 8 h -8 a 8 8 0 0 1 0 -16 h 8 A 8 8 0 0 1 208 160 Z"
                      fill="currentColor"
                    />
                  </g>
                )}
                {index === 7 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-1'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={-256}
                            y={-256}
                            width={362.6666666666667}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                        <path
                          d="M 208 128 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 128 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
              </motion.g>
            ))}
          </>
        ) : (
          <AnimatePresence>
            {KEYBOARD_PATHS.map((path, index) => (
              <motion.g
                animate={reduceDefinition(controls)}
                custom={index}
                initial={{ opacity: 1 }}
                key={path.id}
              >
                {index === 0 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-6'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={85.33333333333333}
                            y={-256}
                            width={42.666666666666664}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-6)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 1 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-9'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={106.66666666666667}
                            y={-256}
                            width={42.666666666666664}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-9)'}>
                        <path
                          d="M 208 128 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 128 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 2 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-7'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={128}
                            y={-256}
                            width={42.666666666666664}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-7)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 3 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-10'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={149.33333333333334}
                            y={-256}
                            width={362.6666666666667}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-10)'}>
                        <path
                          d="M 208 128 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 128 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 4 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-8'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={170.66666666666666}
                            y={-256}
                            width={341.3333333333333}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-8)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 5 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-2'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={-256}
                            y={-256}
                            width={341.3333333333333}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                        <path
                          d="M 208 96 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 96 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
                {index === 6 && (
                  <g transform="scale(0.09375)">
                    <path
                      d="M 72 160 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 h 8 A 8 8 0 0 1 72 160 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M 168 160 a 8 8 0 0 1 -8 8 H 96 a 8 8 0 0 1 0 -16 h 64 A 8 8 0 0 1 168 160 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M 208 160 a 8 8 0 0 1 -8 8 h -8 a 8 8 0 0 1 0 -16 h 8 A 8 8 0 0 1 208 160 Z"
                      fill="currentColor"
                    />
                  </g>
                )}
                {index === 7 && (
                  <g transform="scale(0.09375)">
                    <g>
                      <defs>
                        <clipPath
                          id={nativeMaskId + '-clip-1'}
                          clipPathUnits="userSpaceOnUse"
                        >
                          <rect
                            x={-256}
                            y={-256}
                            width={362.6666666666667}
                            height={768}
                          />
                        </clipPath>
                      </defs>
                      <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                        <path
                          d="M 208 128 a 8 8 0 0 1 -8 8 H 56 a 8 8 0 0 1 0 -16 H 200 A 8 8 0 0 1 208 128 Z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </g>
                )}
              </motion.g>
            ))}
          </AnimatePresence>
        )}
      </svg>
    </div>
  );
});
PhosphorKeyboardIcon.displayName = 'PhosphorKeyboardIcon';
export { PhosphorKeyboardIcon };

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
