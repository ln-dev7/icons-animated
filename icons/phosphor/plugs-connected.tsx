/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: connect @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

import { cn } from '@/lib/utils';

export interface PhosphorPlugsConnectedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorPlugsConnectedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PLUG_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: -3,
    y: 3,
  },
};
const SOCKET_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 3,
    y: -3,
  },
};
const PATH_VARIANTS = {
  normal: (custom: { x: number; y: number }) => ({
    d: `M${custom.x} ${custom.y} l2.5 -2.5`,
  }),
  animate: (custom: { x: number; y: number }) => ({
    d: `M${custom.x + 2.93} ${custom.y - 2.93} l0.10 -0.10`,
  }),
};
const PhosphorPlugsConnectedIcon = forwardRef<
  PhosphorPlugsConnectedIconHandle,
  PhosphorPlugsConnectedIconProps
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
        <motion.g
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={{
            normal: {
              scale: 1,
            },
            animate: {
              scale: 13 / 9,
            },
          }}
          style={{ 'transformOrigin': '21.75px 2.25px' }}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-0'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M-42.75 -53.25L53.25 42.75L144 -48L48 -144Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
                <path
                  d="M 237.66 18.34 a 8 8 0 0 0 -11.32 0 l -52.4 52.41 l -5.37 -5.38 a 32.05 32.05 0 0 0 -45.26 0 L 100 88.69 l -6.34 -6.35 A 8 8 0 0 0 82.34 93.66 L 88.69 100 L 65.37 123.31 a 32 32 0 0 0 0 45.26 l 5.38 5.37 l -52.41 52.4 a 8 8 0 0 0 11.32 11.32 l 52.4 -52.41 l 5.37 5.38 a 32 32 0 0 0 45.26 0 L 156 167.31 l 6.34 6.35 a 8 8 0 0 0 11.32 -11.32 L 167.31 156 l 23.32 -23.31 a 32 32 0 0 0 0 -45.26 l -5.38 -5.37 l 52.41 -52.4 A 8 8 0 0 0 237.66 18.34 Z M 121.36999999999999 179.34 a 16 16 0 0 1 -22.62 0 L 76.69 157.25 a 16 16 0 0 1 0 -22.62 L 100 111.31 L 144.69 156 Z M 179.31 121.4 L 156 144.69 L 111.31 100 l 23.32 -23.31 a 16 16 0 0 1 22.62 0 l 22.06 22 A 16 16 0 0 1 179.31 121.37 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={{
            normal: {
              scale: 1,
            },
            animate: {
              scale: 5 / 3,
            },
          }}
          style={{ 'transformOrigin': '2.25px 21.75px' }}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-5'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M-144 48L-48 144L42.75 53.25L-53.25 -42.75Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-5)'}>
                <path
                  d="M 237.66 18.34 a 8 8 0 0 0 -11.32 0 l -52.4 52.41 l -5.37 -5.38 a 32.05 32.05 0 0 0 -45.26 0 L 100 88.69 l -6.34 -6.35 A 8 8 0 0 0 82.34 93.66 L 88.69 100 L 65.37 123.31 a 32 32 0 0 0 0 45.26 l 5.38 5.37 l -52.41 52.4 a 8 8 0 0 0 11.32 11.32 l 52.4 -52.41 l 5.37 5.38 a 32 32 0 0 0 45.26 0 L 156 167.31 l 6.34 6.35 a 8 8 0 0 0 11.32 -11.32 L 167.31 156 l 23.32 -23.31 a 32 32 0 0 0 0 -45.26 l -5.38 -5.37 l 52.41 -52.4 A 8 8 0 0 0 237.66 18.34 Z M 121.36999999999999 179.34 a 16 16 0 0 1 -22.62 0 L 76.69 157.25 a 16 16 0 0 1 0 -22.62 L 100 111.31 L 144.69 156 Z M 179.31 121.4 L 156 144.69 L 111.31 100 l 23.32 -23.31 a 16 16 0 0 1 22.62 0 l 22.06 22 A 16 16 0 0 1 179.31 121.37 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={SOCKET_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-6'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M-53.25 -42.75L42.75 53.25L48 48L-48 -48Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-6)'}>
                <path
                  d="M 237.66 18.34 a 8 8 0 0 0 -11.32 0 l -52.4 52.41 l -5.37 -5.38 a 32.05 32.05 0 0 0 -45.26 0 L 100 88.69 l -6.34 -6.35 A 8 8 0 0 0 82.34 93.66 L 88.69 100 L 65.37 123.31 a 32 32 0 0 0 0 45.26 l 5.38 5.37 l -52.41 52.4 a 8 8 0 0 0 11.32 11.32 l 52.4 -52.41 l 5.37 5.38 a 32 32 0 0 0 45.26 0 L 156 167.31 l 6.34 6.35 a 8 8 0 0 0 11.32 -11.32 L 167.31 156 l 23.32 -23.31 a 32 32 0 0 0 0 -45.26 l -5.38 -5.37 l 52.41 -52.4 A 8 8 0 0 0 237.66 18.34 Z M 121.36999999999999 179.34 a 16 16 0 0 1 -22.62 0 L 76.69 157.25 a 16 16 0 0 1 0 -22.62 L 100 111.31 L 144.69 156 Z M 179.31 121.4 L 156 144.69 L 111.31 100 l 23.32 -23.31 a 16 16 0 0 1 22.62 0 l 22.06 22 A 16 16 0 0 1 179.31 121.37 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          custom={{ x: 7.5, y: 13.5 }}
          initial="normal"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={PATH_VARIANTS}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          custom={{ x: 10.5, y: 16.5 }}
          initial="normal"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={PATH_VARIANTS}
        />
        <motion.g
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={PLUG_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-7'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M-48 -48L48 48L53.25 42.75L-42.75 -53.25Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-7)'}>
                <path
                  d="M 237.66 18.34 a 8 8 0 0 0 -11.32 0 l -52.4 52.41 l -5.37 -5.38 a 32.05 32.05 0 0 0 -45.26 0 L 100 88.69 l -6.34 -6.35 A 8 8 0 0 0 82.34 93.66 L 88.69 100 L 65.37 123.31 a 32 32 0 0 0 0 45.26 l 5.38 5.37 l -52.41 52.4 a 8 8 0 0 0 11.32 11.32 l 52.4 -52.41 l 5.37 5.38 a 32 32 0 0 0 45.26 0 L 156 167.31 l 6.34 6.35 a 8 8 0 0 0 11.32 -11.32 L 167.31 156 l 23.32 -23.31 a 32 32 0 0 0 0 -45.26 l -5.38 -5.37 l 52.41 -52.4 A 8 8 0 0 0 237.66 18.34 Z M 121.36999999999999 179.34 a 16 16 0 0 1 -22.62 0 L 76.69 157.25 a 16 16 0 0 1 0 -22.62 L 100 111.31 L 144.69 156 Z M 179.31 121.4 L 156 144.69 L 111.31 100 l 23.32 -23.31 a 16 16 0 0 1 22.62 0 l 22.06 22 A 16 16 0 0 1 179.31 121.37 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>
        <g transform="scale(0.09375)">
          <path
            d="M 88.57 35 A 8 8 0 0 1 103.43 29 l 8 20 A 8 8 0 0 1 96.57 55 Z"
            fill="currentColor"
          />
          <path
            d="M 24.57 93 A 8 8 0 0 1 35 88.57 l 20 8 A 8 8 0 0 1 49 111.43 l -20 -8 A 8 8 0 0 1 24.57 93 Z"
            fill="currentColor"
          />
          <path
            d="M 231.43 163 a 8 8 0 0 1 -10.4 4.46 l -20 -8 A 8 8 0 1 1 207 144.57 l 20 8 A 8 8 0 0 1 231.43 163 Z"
            fill="currentColor"
          />
          <path
            d="M 167.43 221.06 A 8 8 0 0 1 152.57 227 l -8 -20 A 8 8 0 0 1 159.43 201 Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
});
PhosphorPlugsConnectedIcon.displayName = 'PhosphorPlugsConnectedIcon';
export { PhosphorPlugsConnectedIcon };

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
