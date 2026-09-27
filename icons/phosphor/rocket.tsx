/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: rocket @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorRocketIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorRocketIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [0, 0, -3, 2, -2, 1, -1, 0],
    y: [0, -3, 0, -2, -3, -1, -2, 0],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'reverse',
      times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    },
  },
};
const FIRE_VARIANTS: Variants = {
  normal: {
    d: 'M14.25 21a0.75 0.75 0 0 1-0.75 0.75H10.5a0.75 0.75 0 0 1 0-1.5h3A0.75 0.75 0 0 1 14.25 21Z',
  },
  animate: {
    d: [
      'M14.25 21a0.75 0.75 0 0 1-0.75 0.75H10.5a0.75 0.75 0 0 1 0-1.5h3A0.75 0.75 0 0 1 14.25 21Z',
      'M14.7 21.075a0.9 0.8250000000000001 0 0 1-0.8999999999999999 0.8250000000000001H10.2a0.9 0.8250000000000001 0 0 1 0-1.6500000000000001h3.5999999999999996A0.9 0.8250000000000001 0 0 1 14.7 21.075Z',
      'M14.34 20.970000000000002a0.78 0.72 0 0 1-0.78 0.72H10.44a0.78 0.72 0 0 1 0-1.44h3.12A0.78 0.72 0 0 1 14.34 20.970000000000002Z',
      'M14.61 21.029999999999998a0.87 0.78 0 0 1-0.8699999999999999 0.78H10.26a0.87 0.78 0 0 1 0-1.56h3.4799999999999995A0.87 0.78 0 0 1 14.61 21.029999999999998Z',
      'M14.25 21a0.75 0.75 0 0 1-0.75 0.75H10.5a0.75 0.75 0 0 1 0-1.5h3A0.75 0.75 0 0 1 14.25 21Z',
    ],
    transition: {
      duration: 2,
      ease: [0.4, 0, 0.2, 1],
      repeat: Number.POSITIVE_INFINITY,
      times: [0, 0.2, 0.5, 0.8, 1],
    },
  },
};
const PhosphorRocketIcon = forwardRef<
  PhosphorRocketIconHandle,
  PhosphorRocketIconProps
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
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        animate={reduceDefinition(controls)}
        variants={VARIANTS}
      >
        <motion.path
          d="M14.25 21a0.75 0.75 0 0 1-0.75 0.75H10.5a0.75 0.75 0 0 1 0-1.5h3A0.75 0.75 0 0 1 14.25 21Z"
          animate={reduceDefinition(controls)}
          variants={FIRE_VARIANTS}
        />
        <g transform="scale(0.09375)">
          <path
            d="M 128 112 a 12 12 0 1 0 -12 -12 A 12 12 0 0 0 128 112 Z"
            fill="currentColor"
          />
          <path
            d="M 223.62 155.82999999999998 l -12.36 55.63 a 16 16 0 0 1 -25.51 9.11 L 158.51 200 h -61 L 70.25 220.57 a 16 16 0 0 1 -25.51 -9.11 L 32.38 155.83 a 16.09 16.09 0 0 1 3.32 -13.71 l 28.56 -34.26 a 123.07 123.07 0 0 1 8.57 -36.67 c 12.9 -32.34 36 -52.63 45.37 -59.85 a 16 16 0 0 1 19.6 0 c 9.34 7.22 32.47 27.51 45.37 59.85 a 123.07 123.07 0 0 1 8.57 36.67 l 28.56 34.26 A 16.09 16.09 0 0 1 223.62 155.83 Z M 99.43 184 h 57.14 c 21.12 -37.54 25.07 -73.48 11.74 -106.88 C 156.55 47.64 134.49 29 128 24 c -6.51 5 -28.57 23.64 -40.33 53.12 C 74.36 110.52 78.31 146.46 99.43 184 Z M 84.43 189.85 Q 68.28 160.5 64.83 132.16 L 48 152.36 L 60.36 208 l 0.18 -0.13 Z M 208 152.36 l -16.83 -20.2 q -3.42 28.28 -19.56 57.69 l 23.85 18 l 0.18 0.13 Z"
            fill="currentColor"
          />
        </g>
      </motion.svg>
    </div>
  );
});
PhosphorRocketIcon.displayName = 'PhosphorRocketIcon';
export { PhosphorRocketIcon };

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
