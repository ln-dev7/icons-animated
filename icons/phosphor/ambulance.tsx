/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: ambulance @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorAmbulanceIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorAmbulanceIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const BODY_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'loop',
    },
  },
};
const WHEEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.5,
      ease: 'linear',
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};
const SPEED_LINE_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    x: 0,
    scaleX: 0,
  },
  animate: (custom: number) => ({
    opacity: [0, 0.7, 0.5, 0],
    x: [0, -4, -10, -16],
    scaleX: [0.2, 1, 0.8, 0.3],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: Number.POSITIVE_INFINITY,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1],
    },
  }),
};
const CROSS_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};
const PhosphorAmbulanceIcon = forwardRef<
  PhosphorAmbulanceIconHandle,
  PhosphorAmbulanceIconProps
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
      if (!isControlledRef.current) {
        controls.start('animate');
      }
      void e;
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      }
      void e;
    },
    [controls]
  );
  return (
    <div
      className={className}
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
        className="overflow-visible"
      >
        {[
          { y: 8, width: 5, x: 0 },
          { y: 11, width: 7, x: -1 },
          { y: 14, width: 4, x: 0 },
        ].map((line, i) => (
          <motion.line
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            animate={reduceDefinition(controls)}
            custom={i}
            initial="normal"
            key={`speed-${i}`}
            strokeLinecap="round"
            strokeWidth="2"
            variants={SPEED_LINE_VARIANTS}
            x1={line.x}
            x2={line.x + line.width}
            y1={line.y}
            y2={line.y}
          />
        ))}

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={BODY_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-1'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M-24-24H48V48H-24Z M4.495 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z M14.995000000000001 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                <path
                  d="M 256 120 v 64 a 16 16 0 0 1 -16 16 H 223 a 32 32 0 0 1 -62 0 H 111 a 32 32 0 0 1 -62 0 H 32 a 16 16 0 0 1 -16 -16 V 72 A 16 16 0 0 1 32 56 H 184 a 8 8 0 0 1 8 8 v 8 h 34.58 a 15.93 15.93 0 0 1 14.86 10.06 l 14 35 A 7.92 7.92 0 0 1 256 120 Z M 192 88 v 24 h 44.18 l -9.6 -24 Z M 32 184 H 49 a 32 32 0 0 1 62 0 h 50 a 32.11 32.11 0 0 1 15 -19.69 V 72 H 32 Z M 96 192 a 16 16 0 1 0 -16 16 A 16 16 0 0 0 96 192 Z M 208 192 a 16 16 0 1 0 -16 16 A 16 16 0 0 0 208 192 Z M 240 184 V 128 H 192 v 32 a 32.06 32.06 0 0 1 31 24 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>

          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={CROSS_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <path
                d="M 80 120 a 8 8 0 0 1 8 -8 h 16 V 96 a 8 8 0 0 1 16 0 v 16 h 16 a 8 8 0 0 1 0 16 H 120 v 16 a 8 8 0 0 1 -16 0 V 128 H 88 A 8 8 0 0 1 80 120 Z"
                fill="currentColor"
              />
            </g>
          </motion.g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={BODY_VARIANTS}
        >
          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            style={{ transformOrigin: '7.5px 18px' }}
            variants={WHEEL_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-2'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path
                      d="M4.495 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z"
                      transform="scale(10.666666666666666)"
                      clipRule="evenodd"
                      shapeRendering="crispEdges"
                    />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                  <path
                    d="M 256 120 v 64 a 16 16 0 0 1 -16 16 H 223 a 32 32 0 0 1 -62 0 H 111 a 32 32 0 0 1 -62 0 H 32 a 16 16 0 0 1 -16 -16 V 72 A 16 16 0 0 1 32 56 H 184 a 8 8 0 0 1 8 8 v 8 h 34.58 a 15.93 15.93 0 0 1 14.86 10.06 l 14 35 A 7.92 7.92 0 0 1 256 120 Z M 192 88 v 24 h 44.18 l -9.6 -24 Z M 32 184 H 49 a 32 32 0 0 1 62 0 h 50 a 32.11 32.11 0 0 1 15 -19.69 V 72 H 32 Z M 96 192 a 16 16 0 1 0 -16 16 A 16 16 0 0 0 96 192 Z M 208 192 a 16 16 0 1 0 -16 16 A 16 16 0 0 0 208 192 Z M 240 184 V 128 H 192 v 32 a 32.06 32.06 0 0 1 31 24 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </motion.g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={BODY_VARIANTS}
        >
          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            style={{ transformOrigin: '18px 18px' }}
            variants={WHEEL_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-3'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path
                      d="M14.995000000000001 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z"
                      transform="scale(10.666666666666666)"
                      clipRule="evenodd"
                      shapeRendering="crispEdges"
                    />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-3)'}>
                  <path
                    d="M 256 120 v 64 a 16 16 0 0 1 -16 16 H 223 a 32 32 0 0 1 -62 0 H 111 a 32 32 0 0 1 -62 0 H 32 a 16 16 0 0 1 -16 -16 V 72 A 16 16 0 0 1 32 56 H 184 a 8 8 0 0 1 8 8 v 8 h 34.58 a 15.93 15.93 0 0 1 14.86 10.06 l 14 35 A 7.92 7.92 0 0 1 256 120 Z M 192 88 v 24 h 44.18 l -9.6 -24 Z M 32 184 H 49 a 32 32 0 0 1 62 0 h 50 a 32.11 32.11 0 0 1 15 -19.69 V 72 H 32 Z M 96 192 a 16 16 0 1 0 -16 16 A 16 16 0 0 0 96 192 Z M 208 192 a 16 16 0 1 0 -16 16 A 16 16 0 0 0 208 192 Z M 240 184 V 128 H 192 v 32 a 32.06 32.06 0 0 1 31 24 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorAmbulanceIcon.displayName = 'PhosphorAmbulanceIcon';
export { PhosphorAmbulanceIcon };

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
