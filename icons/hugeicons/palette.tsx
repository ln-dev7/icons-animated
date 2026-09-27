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

export interface HugeiconsPaletteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsPaletteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const DASH_LENGTH = 70;
const DRAW_DURATION = 0.45;
const DOT_STAGGER = 0.08;
const OUTLINE_VARIANTS: Variants = {
  normal: {
    strokeDashoffset: 0,
  },
  animate: {
    strokeDashoffset: [DASH_LENGTH, 0],
    transition: {
      duration: DRAW_DURATION,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};
const DOTS_GROUP_VARIANTS: Variants = {
  normal: {},
  animate: {
    transition: {
      delayChildren: DRAW_DURATION,
      staggerChildren: DOT_STAGGER,
    },
  },
};
const DOT_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: { duration: 0.2 },
  },
  animate: {
    scale: [0, 1],
    transition: {
      damping: 10,
      stiffness: 300,
      type: 'spring',
    },
  },
};
const HugeiconsPaletteIcon = forwardRef<
  HugeiconsPaletteIconHandle,
  HugeiconsPaletteIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const startAnimation = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    try {
      await controls.start('animate');
    } finally {
      isAnimatingRef.current = false;
    }
  }, [controls]);
  const stopAnimation = useCallback(async () => {
    isAnimatingRef.current = false;
    await controls.start('normal');
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
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          d="M21.8205 10.4127C22.062 11.8519 22.1827 12.5715 21.2423 13.9326C21.1459 14.0722 20.8966 14.3713 20.777 14.4911C19.6103 15.6586 18.4308 15.6586 16.0716 15.6586H14.1392C13.5085 15.6586 13.1931 15.6586 12.9639 15.7142C11.9586 15.9581 11.3031 16.9391 11.453 17.9755C11.4872 18.2118 11.6043 18.5085 11.8386 19.102C11.9345 19.3449 11.9824 19.4664 12.0136 19.7304C12.1292 20.7084 11.0869 21.9508 10.1158 21.9926C9.85358 22.0039 9.83681 22.0002 9.80326 21.9926C7.66174 21.51 5.66204 20.3123 4.18389 18.4421C0.736789 14.0808 1.43146 7.71364 5.73548 4.22064C10.0395 0.727643 16.323 1.43156 19.7701 5.79289C20.868 7.1819 21.5457 8.77438 21.8205 10.4127Z"
          stroke="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          strokeDasharray={DASH_LENGTH}
          variants={OUTLINE_VARIANTS}
        />
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={DOTS_GROUP_VARIANTS}
        >
          <motion.path
            d="M5.86719 11.7498H5.74219M5.99219 11.7498C5.99219 11.8878 5.88026 11.9998 5.74219 11.9998C5.60412 11.9998 5.49219 11.8878 5.49219 11.7498C5.49219 11.6117 5.60412 11.4998 5.74219 11.4998C5.88026 11.4998 5.99219 11.6117 5.99219 11.7498Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            variants={DOT_VARIANTS}
            key="native-1-0"
          />
          <motion.path
            d="M7.36719 15.7498H7.24219M7.49219 15.7498C7.49219 15.8878 7.38026 15.9998 7.24219 15.9998C7.10412 15.9998 6.99219 15.8878 6.99219 15.7498C6.99219 15.6117 7.10412 15.4998 7.24219 15.4998C7.38026 15.4998 7.49219 15.6117 7.49219 15.7498Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            variants={DOT_VARIANTS}
            key="native-1-1"
          />
          <motion.path
            d="M7.36719 7.74976H7.24219M7.49219 7.74976C7.49219 7.88783 7.38026 7.99976 7.24219 7.99976C7.10412 7.99976 6.99219 7.88783 6.99219 7.74976C6.99219 7.61169 7.10412 7.49976 7.24219 7.49976C7.38026 7.49976 7.49219 7.61169 7.49219 7.74976Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            variants={DOT_VARIANTS}
            key="native-1-2"
          />
          <motion.path
            d="M11.8672 5.74976H11.7422M11.9922 5.74976C11.9922 5.88783 11.8803 5.99976 11.7422 5.99976C11.6041 5.99976 11.4922 5.88783 11.4922 5.74976C11.4922 5.61169 11.6041 5.49976 11.7422 5.49976C11.8803 5.49976 11.9922 5.61169 11.9922 5.74976Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            variants={DOT_VARIANTS}
            key="native-1-3"
          />
          <motion.path
            d="M16.3672 7.74976H16.2422M16.4922 7.74976C16.4922 7.88783 16.3803 7.99976 16.2422 7.99976C16.1041 7.99976 15.9922 7.88783 15.9922 7.74976C15.9922 7.61169 16.1041 7.49976 16.2422 7.49976C16.3803 7.49976 16.4922 7.61169 16.4922 7.74976Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            variants={DOT_VARIANTS}
            key="native-1-4"
          />
          <motion.path
            d="M18.3672 11.7498H18.2422M18.4922 11.7498C18.4922 11.8878 18.3803 11.9998 18.2422 11.9998C18.1041 11.9998 17.9922 11.8878 17.9922 11.7498C17.9922 11.6117 18.1041 11.4998 18.2422 11.4998C18.3803 11.4998 18.4922 11.6117 18.4922 11.7498Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            variants={DOT_VARIANTS}
            key="native-1-5"
          />
        </motion.g>
      </svg>
    </div>
  );
});
HugeiconsPaletteIcon.displayName = 'HugeiconsPaletteIcon';
export { HugeiconsPaletteIcon };

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
