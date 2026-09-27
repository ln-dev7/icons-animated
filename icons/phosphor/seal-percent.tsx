/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: badge-percent @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorSealPercentIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSealPercentIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 10,
      duration: 0.5,
    },
  },
  animate: {
    rotate: 180,
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 80,
      damping: 13,
    },
  },
};
const PhosphorSealPercentIcon = forwardRef<
  PhosphorSealPercentIconHandle,
  PhosphorSealPercentIconProps
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <motion.g animate={reduceDefinition(controls)} variants={PATH_VARIANTS}>
          <g transform="scale(0.09375)">
            <path
              d="M 225.86 102.82 c -3.77 -3.94 -7.67 -8 -9.14 -11.57 c -1.36 -3.27 -1.44 -8.69 -1.52 -13.94 c -0.15 -9.76 -0.31 -20.82 -8 -28.51 s -18.75 -7.85 -28.51 -8 c -5.25 -0.08 -10.67 -0.16 -13.94 -1.52 c -3.56 -1.47 -7.63 -5.37 -11.57 -9.14 C 146.28 23.51 138.44 16 128 16 s -18.27 7.51 -25.18 14.14 c -3.94 3.77 -8 7.67 -11.57 9.14 C 88 40.64 82.56 40.72 77.31 40.8 c -9.76 0.15 -20.82 0.31 -28.51 8 S 41 67.55 40.8 77.31 c -0.08 5.25 -0.16 10.67 -1.52 13.94 c -1.47 3.56 -5.37 7.63 -9.14 11.57 C 23.51 109.73 16 117.56 16 128 s 7.51 18.27 14.14 25.18 c 3.77 3.94 7.67 8 9.14 11.57 c 1.36 3.27 1.44 8.69 1.52 13.94 c 0.15 9.76 0.31 20.82 8 28.51 s 18.75 7.85 28.51 8 c 5.25 0.08 10.67 0.16 13.94 1.52 c 3.56 1.47 7.63 5.37 11.57 9.14 C 109.72 232.49 117.56 240 128 240 s 18.27 -7.51 25.18 -14.14 c 3.94 -3.77 8 -7.67 11.57 -9.14 c 3.27 -1.36 8.69 -1.44 13.94 -1.52 c 9.76 -0.15 20.82 -0.31 28.51 -8 s 7.85 -18.75 8 -28.51 c 0.08 -5.25 0.16 -10.67 1.52 -13.94 c 1.47 -3.56 5.37 -7.63 9.14 -11.57 C 232.49 146.27 240 138.44 240 128 S 232.49 109.73 225.86 102.82 Z M 214.31 142.10999999999999 c -4.79 5 -9.75 10.17 -12.38 16.52 c -2.52 6.1 -2.63 13.07 -2.73 19.82 c -0.1 7 -0.21 14.33 -3.32 17.43 s -10.39 3.22 -17.43 3.32 c -6.75 0.1 -13.72 0.21 -19.82 2.73 c -6.35 2.63 -11.52 7.59 -16.52 12.38 S 132 224 128 224 s -9.15 -4.92 -14.11 -9.69 s -10.17 -9.75 -16.52 -12.38 c -6.1 -2.52 -13.07 -2.63 -19.82 -2.73 c -7 -0.1 -14.33 -0.21 -17.43 -3.32 s -3.22 -10.39 -3.32 -17.43 c -0.1 -6.75 -0.21 -13.72 -2.73 -19.82 c -2.63 -6.35 -7.59 -11.52 -12.38 -16.52 S 32 132 32 128 s 4.92 -9.14 9.69 -14.11 s 9.75 -10.17 12.38 -16.52 c 2.52 -6.1 2.63 -13.07 2.73 -19.82 c 0.1 -7 0.21 -14.33 3.32 -17.43 S 70.51 56.9 77.55 56.8 c 6.75 -0.1 13.72 -0.21 19.82 -2.73 c 6.35 -2.63 11.52 -7.59 16.52 -12.38 S 124 32 128 32 s 9.15 4.92 14.11 9.69 s 10.17 9.75 16.52 12.38 c 6.1 2.52 13.07 2.63 19.82 2.73 c 7 0.1 14.33 0.21 17.43 3.32 s 3.22 10.39 3.32 17.43 c 0.1 6.75 0.21 13.72 2.73 19.82 c 2.63 6.35 7.59 11.52 12.38 16.52 S 224 124 224 128 S 219.08 137.14 214.31 142.11 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <g transform="scale(0.09375)">
          <path
            d="M 173.66 93.66 l -80 80 a 8 8 0 0 1 -11.32 -11.32 l 80 -80 a 8 8 0 0 1 11.32 11.32 Z"
            fill="currentColor"
          />
        </g>
        <g transform="scale(0.09375)">
          <path
            d="M 120 96 a 24 24 0 1 0 -24 24 A 24 24 0 0 0 120 96 Z M 88 96 a 8 8 0 1 1 8 8 A 8 8 0 0 1 88 96 Z"
            fill="currentColor"
          />
        </g>
        <g transform="scale(0.09375)">
          <path
            d="M 160 136 a 24 24 0 1 0 24 24 A 24 24 0 0 0 160 136 Z M 160 168 a 8 8 0 1 1 8 -8 A 8 8 0 0 1 160 168 Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
});
PhosphorSealPercentIcon.displayName = 'PhosphorSealPercentIcon';
export { PhosphorSealPercentIcon };

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
