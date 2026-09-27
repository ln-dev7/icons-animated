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

export interface HugeiconsWavesArrowDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsWavesArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HEAD_VARIANTS: Variants = {
  normal: {
    translateY: 0,
  },
  animate: {
    translateY: [0, 3, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
const SHAFT_VARIANTS: Variants = {
  normal: {
    translateX: 0,
    translateY: 0,
    scale: 1,
  },
  animate: {
    translateY: [0, 3, 0],
    scale: [1, 0.85, 1],
    originX: 1,
    originY: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
const HugeiconsWavesArrowDownIcon = forwardRef<
  HugeiconsWavesArrowDownIconHandle,
  HugeiconsWavesArrowDownIconProps
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={{ overflow: 'visible' }}
      >
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={SHAFT_VARIANTS}
        >
          <path
            d="M 11.25 8 C 11.25 8.41421 11.5858 8.75 12 8.75 C 12.4142 8.75 12.75 8.41421 12.75 8 H 12 H 11.25 Z M 12.75 3 C 12.75 2.58579 12.4142 2.25 12 2.25 C 11.5858 2.25 11.25 2.58579 11.25 3 L 12 3 L 12.75 3 Z M 12 8 H 12.75 L 12.75 3 L 12 3 L 11.25 3 L 11.25 8 H 12 Z"
            fill="currentColor"
          />
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={HEAD_VARIANTS}
        >
          <path
            d="M 12 9 L 12 9.75 L 12 9 Z M 15.6039 6.44479 C 15.8495 6.11127 15.7783 5.64177 15.4448 5.39613 C 15.1112 5.1505 14.6417 5.22174 14.3961 5.55526 L 15 6.00002 L 15.6039 6.44479 Z M 9.6039 5.55525 C 9.35827 5.22172 8.88877 5.15047 8.55525 5.3961 C 8.22172 5.64173 8.15047 6.11123 8.3961 6.44475 L 9 6 L 9.6039 5.55525 Z M 12 9 L 12 9.75 C 12.3077 9.75 12.5736 9.61559 12.7431 9.51341 C 12.9332 9.39881 13.1223 9.24928 13.2988 9.09329 C 13.6537 8.77979 14.029 8.37609 14.3628 7.99172 C 14.6997 7.60362 15.0093 7.21773 15.2337 6.9302 C 15.3462 6.78604 15.438 6.66568 15.502 6.58096 C 15.534 6.53859 15.5591 6.50507 15.5764 6.4819 C 15.585 6.47031 15.5917 6.4613 15.5963 6.45505 C 15.5986 6.45193 15.6004 6.4495 15.6017 6.44778 C 15.6023 6.44692 15.6028 6.44624 15.6032 6.44574 C 15.6034 6.44549 15.6035 6.44529 15.6036 6.44513 C 15.6037 6.44505 15.6038 6.44496 15.6038 6.44492 C 15.6038 6.44485 15.6039 6.44479 15 6.00002 C 14.3961 5.55526 14.3961 5.55522 14.3962 5.55519 C 14.3962 5.5552 14.3962 5.55518 14.3962 5.5552 C 14.3961 5.55522 14.3961 5.55529 14.396 5.5554 C 14.3958 5.55563 14.3955 5.55603 14.3951 5.55662 C 14.3942 5.55778 14.3929 5.55965 14.391 5.56221 C 14.3872 5.56731 14.3814 5.57515 14.3736 5.58553 C 14.3582 5.6063 14.335 5.63724 14.305 5.67689 C 14.2451 5.75624 14.1581 5.87026 14.0512 6.00734 C 13.8366 6.28231 13.5443 6.6464 13.2301 7.0083 C 12.9127 7.37392 12.5875 7.72022 12.3056 7.96921 C 12.1639 8.09447 12.0507 8.17931 11.9686 8.22878 C 11.866 8.29066 11.8899 8.25 12 8.25 L 12 9 Z M 9 6 C 8.3961 6.44475 8.39615 6.44482 8.3962 6.44489 C 8.39623 6.44493 8.39629 6.44501 8.39635 6.44509 C 8.39647 6.44525 8.39662 6.44546 8.3968 6.44571 C 8.39717 6.44621 8.39767 6.44689 8.39831 6.44775 C 8.39958 6.44946 8.40138 6.4519 8.40369 6.45502 C 8.40831 6.46126 8.415 6.47027 8.42364 6.48186 C 8.44091 6.50504 8.466 6.53855 8.498 6.58093 C 8.56199 6.66565 8.65381 6.78601 8.76631 6.93017 C 8.9907 7.2177 9.30024 7.60361 9.6372 7.99171 C 9.97093 8.37608 10.3463 8.77978 10.7011 9.09329 C 10.8777 9.24928 11.0668 9.39881 11.2569 9.51341 C 11.4264 9.61559 11.6923 9.75 12 9.75 L 12 9 L 12 8.25 C 12.11 8.25 12.1339 8.29066 12.0313 8.22878 C 11.9493 8.17932 11.8361 8.09447 11.6943 7.96922 C 11.4125 7.72022 11.0873 7.37392 10.7699 7.0083 C 10.4556 6.6464 10.1634 6.2823 9.94884 6.00733 C 9.84186 5.87025 9.75488 5.75623 9.69496 5.67688 C 9.66501 5.63723 9.64185 5.60629 9.62637 5.58552 C 9.61863 5.57514 9.61282 5.5673 9.60904 5.56219 C 9.60714 5.55964 9.60576 5.55777 9.6049 5.5566 C 9.60447 5.55602 9.60417 5.55561 9.604 5.55539 C 9.60392 5.55527 9.60387 5.5552 9.60385 5.55518 C 9.60384 5.55517 9.60385 5.55519 9.60385 5.55518 C 9.60387 5.55521 9.6039 5.55525 9 6 Z"
            fill="currentColor"
          />
        </motion.g>
        <path
          d="M2 14.1932C2.68524 15.2443 3.57104 15.2443 4.27299 14.1932C6.52985 10.7408 8.67954 16.6764 10.273 14.2321C12.703 10.5694 14.4508 16.9218 16.273 14.1932C18.6492 10.5582 20.1295 16.5776 22 14.5842"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2 20.1932C2.68524 21.2443 3.57104 21.2443 4.27299 20.1932C6.52985 16.7408 8.67954 22.6764 10.273 20.2321C12.703 16.5694 14.4508 22.9218 16.273 20.1932C18.6492 16.5582 20.1295 22.5776 22 20.5842"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
});
HugeiconsWavesArrowDownIcon.displayName = 'HugeiconsWavesArrowDownIcon';
export { HugeiconsWavesArrowDownIcon };

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
