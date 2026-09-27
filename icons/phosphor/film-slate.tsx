/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: clap @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorFilmSlateIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorFilmSlateIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const VARIANTS: Variants = {
  normal: {
    rotate: 0,
    originX: '4px',
    originY: '20px',
  },
  animate: {
    rotate: [-10, -10, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1],
      ease: 'easeInOut',
    },
  },
};
const CLAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    originX: '3px',
    originY: '11px',
  },
  animate: {
    rotate: [0, -10, 16, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.3, 0.6, 1],
      ease: 'easeInOut',
    },
  },
};
const PhosphorFilmSlateIcon = forwardRef<
  PhosphorFilmSlateIconHandle,
  PhosphorFilmSlateIconProps
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
        <motion.g animate={reduceDefinition(controls)} variants={VARIANTS}>
          <motion.g
            animate={reduceDefinition(controls)}
            variants={CLAP_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-0'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <rect x={-256} y={-256} width={768} height={360} />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
                  <path
                    d="M 216 104 H 102.09 L 210 75.51 a 8 8 0 0 0 5.68 -9.84 l -8.16 -30 a 15.93 15.93 0 0 0 -19.42 -11.13 L 35.81 64.74 a 15.75 15.75 0 0 0 -9.7 7.4 a 15.51 15.51 0 0 0 -1.55 12 L 32 111.56 c 0 0.14 0 0.29 0 0.44 v 88 a 16 16 0 0 0 16 16 H 208 a 16 16 0 0 0 16 -16 V 112 A 8 8 0 0 0 216 104 Z M 192.16 40 l 6 22.07 l -22.62 6 L 147.42 51.83 Z M 125.47 57.6 l 28.12 16.24 l -36.94 9.75 L 88.53 67.37 Z M 46.06999999999999 102.22 l -6 -22.08 l 26.5 -7 L 94.69 89.4 Z M 208 200 H 48 V 120 H 208 v 80 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </motion.g>
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-1'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <rect x={-256} y={104} width={768} height={408} />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                <path
                  d="M 216 104 H 102.09 L 210 75.51 a 8 8 0 0 0 5.68 -9.84 l -8.16 -30 a 15.93 15.93 0 0 0 -19.42 -11.13 L 35.81 64.74 a 15.75 15.75 0 0 0 -9.7 7.4 a 15.51 15.51 0 0 0 -1.55 12 L 32 111.56 c 0 0.14 0 0.29 0 0.44 v 88 a 16 16 0 0 0 16 16 H 208 a 16 16 0 0 0 16 -16 V 112 A 8 8 0 0 0 216 104 Z M 192.16 40 l 6 22.07 l -22.62 6 L 147.42 51.83 Z M 125.47 57.6 l 28.12 16.24 l -36.94 9.75 L 88.53 67.37 Z M 46.06999999999999 102.22 l -6 -22.08 l 26.5 -7 L 94.69 89.4 Z M 208 200 H 48 V 120 H 208 v 80 Z"
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
PhosphorFilmSlateIcon.displayName = 'PhosphorFilmSlateIcon';
export { PhosphorFilmSlateIcon };

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
