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

export interface HugeiconsCupSodaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsCupSodaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const STRAW_VARIANTS: Variants = {
  normal: {
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  animate: {
    y: [0, -0.85, 0.15, 0],
    scaleY: [1, 1.06, 0.99, 1],
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      times: [0, 0.35, 0.65, 1],
    },
  },
};

const BUBBLE_VARIANTS: Variants = {
  normal: { opacity: 0, y: 0, scale: 1 },
  animate: (delay: number) => ({
    opacity: [0, 0.9, 0.4, 0],
    y: [0, -3, -10, -14],
    scale: [1, 1, 0.85, 0.6],
    transition: {
      duration: 1.5,
      ease: 'easeIn',
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 0,
      times: [0, 0.08, 0.7, 1],
    },
  }),
};
const BUBBLES = [
  { delay: 0, cx: 8.25, cy: 20.5, r: 0.75 },
  { delay: 0.35, cx: 11.25, cy: 19.5, r: 0.6 },
  { delay: 0.7, cx: 14, cy: 20.75, r: 0.6 },
  { delay: 1.05, cx: 9.75, cy: 19, r: 0.75 },
  { delay: 0.55, cx: 12.5, cy: 20, r: 0.45 },
] as const;
const HugeiconsCupSodaIcon = forwardRef<
  HugeiconsCupSodaIconHandle,
  HugeiconsCupSodaIconProps
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
      className={cn('relative', className)}
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
          d="M18 9L17.3835 17.0147C17.2226 19.1057 17.1422 20.1512 16.5655 20.8729C16.3784 21.107 16.1573 21.3117 15.9095 21.4803C15.1457 22 14.0972 22 12 22C9.90284 22 8.85426 22 8.09047 21.4803C7.84271 21.3117 7.62161 21.107 7.43453 20.8729C6.85778 20.1512 6.77736 19.1057 6.61652 17.0147L6 9H18Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M14.117 6H9.88304C8.49159 6 7.79587 6 7.2721 6.37752C6.74832 6.75503 6.52832 7.41505 6.0883 8.73509L6 9H18L17.9117 8.73509C17.4717 7.41505 17.2517 6.75503 16.7279 6.37752C16.2041 6 15.5084 6 14.117 6Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M4.5 9H19.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />

        <motion.path
          d="M13 6L13.2724 4.91043C13.6069 3.5724 13.7742 2.90339 14.2501 2.49004C14.3027 2.44433 14.3577 2.40141 14.4148 2.36145C14.9312 2 15.6208 2 17 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          style={{
            transformBox: 'fill-box',
            originX: '50%',
            originY: '100%',
          }}
          variants={STRAW_VARIANTS}
        />
        {BUBBLES.map((b, i) => (
          <motion.circle
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            animate={reduceDefinition(controls)}
            custom={b.delay}
            cx={b.cx}
            cy={b.cy}
            fill="currentColor"
            initial="normal"
            key={i}
            r={b.r}
            stroke="none"
            style={{
              transformBox: 'fill-box',
              originX: '50%',
              originY: '50%',
            }}
            variants={BUBBLE_VARIANTS}
          />
        ))}
      </svg>
    </div>
  );
});
HugeiconsCupSodaIcon.displayName = 'HugeiconsCupSodaIcon';
export { HugeiconsCupSodaIcon };

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
