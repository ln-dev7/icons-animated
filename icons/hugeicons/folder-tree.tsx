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
import type { ForwardedRef, HTMLAttributes, MouseEvent } from 'react';
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

export interface HugeiconsFolderTreeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsFolderTreeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const DURATION = 0.35;
const BRANCH_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};
const PANEL_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
  },
};
const CALCULATE_DELAY = (index: number) => index * DURATION + 0.1;
const HugeiconsFolderTreeIcon = forwardRef<
  HugeiconsFolderTreeIconHandle,
  HugeiconsFolderTreeIconProps
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
    (event: MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void event;
      } else {
        controls.start('animate');
      }
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void event;
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
        <motion.path
          d="M12 7V5.33333C12 4.55608 12 4.16746 12.1405 3.86607C12.2896 3.54646 12.5465 3.28958 12.8661 3.14054C13.1675 3 13.5561 3 14.3333 3C14.7406 3 14.9443 3 15.1321 3.04949C15.3321 3.10217 15.519 3.19563 15.6811 3.324C15.8334 3.44459 15.9556 3.6075 16.2 3.93333L17 5H18.5C19.4346 5 19.9019 5 20.25 5.20096C20.478 5.33261 20.6674 5.52197 20.799 5.75C21 6.09808 21 6.56538 21 7.5C21 8.43462 21 8.90192 20.799 9.25C20.6674 9.47803 20.478 9.66739 20.25 9.79904C19.9019 10 19.4346 10 18.5 10H15C13.5858 10 12.8787 10 12.4393 9.56066C12 9.12132 12 8.41421 12 7Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(0),
            opacity: { delay: CALCULATE_DELAY(0) },
          }}
          variants={PANEL_VARIANTS}
        />
        <motion.path
          d="M12 18V16.3333C12 15.5561 12 15.1675 12.1405 14.8661C12.2896 14.5465 12.5465 14.2896 12.8661 14.1405C13.1675 14 13.5561 14 14.3333 14C14.7406 14 14.9443 14 15.1321 14.0495C15.3321 14.1022 15.519 14.1956 15.6811 14.324C15.8334 14.4446 15.9556 14.6075 16.2 14.9333L17 16H18.5C19.4346 16 19.9019 16 20.25 16.201C20.478 16.3326 20.6674 16.522 20.799 16.75C21 17.0981 21 17.5654 21 18.5C21 19.4346 21 19.9019 20.799 20.25C20.6674 20.478 20.478 20.6674 20.25 20.799C19.9019 21 19.4346 21 18.5 21H15C13.5858 21 12.8787 21 12.4393 20.5607C12 20.1213 12 19.4142 12 18Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(2),
            opacity: { delay: CALCULATE_DELAY(2) },
          }}
          variants={PANEL_VARIANTS}
        />
        <motion.path
          d="M3 3C3 3.92997 3 4.39496 3.10222 4.77646C3.37962 5.81173 4.18827 6.62038 5.22354 6.89778C5.60504 7 6.07003 7 7 7L8 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(1),
            opacity: { delay: CALCULATE_DELAY(1) },
          }}
          variants={BRANCH_VARIANTS}
        />
        <motion.path
          d="M3 3V13C3 14.8692 3 15.8038 3.40192 16.5C3.66523 16.9561 4.04394 17.3348 4.5 17.5981C5.19615 18 6.13077 18 8 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          transition={{
            duration: DURATION,
            delay: CALCULATE_DELAY(3),
            opacity: { delay: CALCULATE_DELAY(3) },
          }}
          variants={BRANCH_VARIANTS}
        />
      </svg>
    </div>
  );
});
HugeiconsFolderTreeIcon.displayName = 'HugeiconsFolderTreeIcon';
export { HugeiconsFolderTreeIcon };

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
