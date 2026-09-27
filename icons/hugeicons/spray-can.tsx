/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: https://github.com/pqoqubbw/icons/tree/072c38b1b04ea738d90a084485ccaad4b890ddca
 *
 * Copyright (c) 2025 Hugeicons
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

export interface HugeiconsSprayCanIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsSprayCanIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const SPRAY_DOT_VARIANTS: Variants = {
  normal: {
    opacity: 1,
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
const HugeiconsSprayCanIcon = forwardRef<
  HugeiconsSprayCanIconHandle,
  HugeiconsSprayCanIconProps
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
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M10 8V6C10 5.53501 10 5.30252 9.94889 5.11177C9.81019 4.59413 9.40587 4.18981 8.88823 4.05111C8.69748 4 8.46499 4 8 4C7.53501 4 7.30252 4 7.11177 4.05111C6.59413 4.18981 6.18981 4.59413 6.05111 5.11177C6 5.30252 6 5.53501 6 6V8H10Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M10 8H6L5.3436 8.9846C4.67671 9.98494 4.34326 10.4851 4.17163 11.052C4 11.6188 4 12.22 4 13.4222V18C4 19.8856 4 20.8284 4.58579 21.4142C5.17157 22 6.11438 22 8 22C9.88562 22 10.8284 22 11.4142 21.4142C12 20.8284 12 19.8856 12 18V13.4222C12 12.22 12 11.6188 11.8284 11.052C11.6567 10.4851 11.3233 9.98494 10.6564 8.9846L10 8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M11.5 12H11C9.58579 12 8.87868 12 8.43934 12.4393C8 12.8787 8 13.5858 8 15C8 16.4142 8 17.1213 8.43934 17.5607C8.87868 18 9.58579 18 11 18H11.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />

        <g>
          <motion.path
            d="M 13.875 5.99994 H 13.75 M 14 5.99994 C 14 6.13801 13.8881 6.24994 13.75 6.24994 C 13.6119 6.24994 13.5 6.13801 13.5 5.99994 C 13.5 5.86187 13.6119 5.74994 13.75 5.74994 C 13.8881 5.74994 14 5.86187 14 5.99994 Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={SPRAY_DOT_VARIANTS}
            key="native-4-0"
            custom={0}
          />
          <motion.path
            d="M 16.875 3.99994 H 16.75 M 17 3.99994 C 17 4.13801 16.8881 4.24994 16.75 4.24994 C 16.6119 4.24994 16.5 4.13801 16.5 3.99994 C 16.5 3.86187 16.6119 3.74994 16.75 3.74994 C 16.8881 3.74994 17 3.86187 17 3.99994 Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={SPRAY_DOT_VARIANTS}
            key="native-4-1"
            custom={1}
          />
          <motion.path
            d="M 16.875 7.99994 H 16.75 M 17 7.99994 C 17 8.13801 16.8881 8.24994 16.75 8.24994 C 16.6119 8.24994 16.5 8.13801 16.5 7.99994 C 16.5 7.86187 16.6119 7.74994 16.75 7.74994 C 16.8881 7.74994 17 7.86187 17 7.99994 Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={SPRAY_DOT_VARIANTS}
            key="native-4-2"
            custom={2}
          />
          <motion.path
            d="M 19.875 2.25 H 19.75 M 20 2.25 C 20 2.38807 19.8881 2.5 19.75 2.5 C 19.6119 2.5 19.5 2.38807 19.5 2.25 C 19.5 2.11193 19.6119 2 19.75 2 C 19.8881 2 20 2.11193 20 2.25 Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={SPRAY_DOT_VARIANTS}
            key="native-4-3"
            custom={3}
          />
          <motion.path
            d="M 19.875 5.99994 H 19.75 M 20 5.99994 C 20 6.13801 19.8881 6.24994 19.75 6.24994 C 19.6119 6.24994 19.5 6.13801 19.5 5.99994 C 19.5 5.86187 19.6119 5.74994 19.75 5.74994 C 19.8881 5.74994 20 5.86187 20 5.99994 Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={SPRAY_DOT_VARIANTS}
            key="native-4-4"
            custom={4}
          />
          <motion.path
            d="M 19.875 9.75 H 19.75 M 20 9.75 C 20 9.88807 19.8881 10 19.75 10 C 19.6119 10 19.5 9.88807 19.5 9.75 C 19.5 9.61193 19.6119 9.5 19.75 9.5 C 19.8881 9.5 20 9.61193 20 9.75 Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(controls)}
            initial="normal"
            variants={SPRAY_DOT_VARIANTS}
            key="native-4-5"
            custom={5}
          />
        </g>
      </svg>
    </div>
  );
});
HugeiconsSprayCanIcon.displayName = 'HugeiconsSprayCanIcon';
export { HugeiconsSprayCanIcon };

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
