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

export interface HugeiconsSunDimIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsSunDimIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};
const HugeiconsSunDimIcon = forwardRef<
  HugeiconsSunDimIconHandle,
  HugeiconsSunDimIconProps
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
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M16.9923 11.9999C16.9923 14.7614 14.7537 16.9999 11.9923 16.9999C9.23089 16.9999 6.99231 14.7614 6.99231 11.9999C6.99231 9.23852 9.23089 6.99994 11.9923 6.99994C14.7537 6.99994 16.9923 9.23852 16.9923 11.9999Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <motion.path
          d="M 12.117 3.24994 H 11.992 M 12.242 3.24994 C 12.242 3.38801 12.1301 3.49994 11.992 3.49994 C 11.8539 3.49994 11.742 3.38801 11.742 3.24994 C 11.742 3.11187 11.8539 2.99994 11.992 2.99994 C 12.1301 2.99994 12.242 3.11187 12.242 3.24994 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-0"
          custom={1}
        />
        <motion.path
          d="M 20.7423 12.1249 V 11.9999 M 20.7423 12.2499 C 20.6042 12.2499 20.4923 12.138 20.4923 11.9999 C 20.4923 11.8619 20.6042 11.7499 20.7423 11.7499 C 20.8804 11.7499 20.9923 11.8619 20.9923 11.9999 C 20.9923 12.138 20.8804 12.2499 20.7423 12.2499 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-1"
          custom={2}
        />
        <motion.path
          d="M 12.1165 20.7499 H 11.9915 M 12.2415 20.7499 C 12.2415 20.888 12.1296 20.9999 11.9915 20.9999 C 11.8535 20.9999 11.7415 20.888 11.7415 20.7499 C 11.7415 20.6119 11.8535 20.4999 11.9915 20.4999 C 12.1296 20.4999 12.2415 20.6119 12.2415 20.7499 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-2"
          custom={3}
        />
        <motion.path
          d="M 3.24231 12.1249 V 11.9999 M 3.24231 12.2499 C 3.10424 12.2499 2.99231 12.138 2.99231 11.9999 C 2.99231 11.8619 3.10424 11.7499 3.24231 11.7499 C 3.38038 11.7499 3.49231 11.8619 3.49231 11.9999 C 3.49231 12.138 3.38038 12.2499 3.24231 12.2499 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-3"
          custom={4}
        />
        <motion.path
          d="M 18.2675 5.90092 L 18.1791 5.81253 M 18.3559 5.98931 C 18.2583 6.08694 18.1 6.08694 18.0024 5.98931 C 17.9047 5.89168 17.9047 5.73339 18.0024 5.63576 C 18.1 5.53813 18.2583 5.53813 18.3559 5.63576 C 18.4535 5.73339 18.4535 5.89168 18.3559 5.98931 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-4"
          custom={5}
        />
        <motion.path
          d="M 18.091 18.2755 L 18.1794 18.1871 M 18.0026 18.3639 C 17.9049 18.2663 17.9049 18.108 18.0026 18.0103 C 18.1002 17.9127 18.2585 17.9127 18.3561 18.0103 C 18.4538 18.108 18.4538 18.2663 18.3561 18.3639 C 18.2585 18.4615 18.1002 18.4615 18.0026 18.3639 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-5"
          custom={6}
        />
        <motion.path
          d="M 5.89282 18.275 L 5.80443 18.1866 M 5.98121 18.3633 C 5.88358 18.461 5.72528 18.461 5.62765 18.3633 C 5.53002 18.2657 5.53002 18.1074 5.62765 18.0098 C 5.72528 17.9122 5.88358 17.9122 5.98121 18.0098 C 6.07884 18.1074 6.07884 18.2657 5.98121 18.3633 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-6"
          custom={7}
        />
        <motion.path
          d="M 5.71659 5.90114 L 5.80498 5.81275 M 5.62821 5.98953 C 5.53058 5.8919 5.53058 5.73361 5.62821 5.63598 C 5.72584 5.53835 5.88413 5.53835 5.98176 5.63598 C 6.07939 5.73361 6.07939 5.8919 5.98176 5.98953 C 5.88413 6.08716 5.72584 6.08716 5.62821 5.98953 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
          key="native-1-7"
          custom={8}
        />
      </svg>
    </div>
  );
});
HugeiconsSunDimIcon.displayName = 'HugeiconsSunDimIcon';
export { HugeiconsSunDimIcon };

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
