/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: mic-off @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
import type {
  TargetAndTransition as NativeMotionTarget,
  Variants as NativeMotionVariants,
  Variants,
} from 'motion/react';
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

function nativePartTarget(
  target: Record<string, unknown>,
  draw: boolean | 'geometry'
): NativeMotionTarget {
  const drawKeys = new Set([
    'pathLength',
    'pathOffset',
    'pathSpacing',
    'strokeDasharray',
    'strokeDashoffset',
  ]);
  return Object.fromEntries(
    Object.entries(target).filter(
      ([key]) =>
        key === 'transition' ||
        (draw === 'geometry'
          ? key === 'd'
          : key !== 'd' && (draw ? drawKeys.has(key) : !drawKeys.has(key)))
    )
  ) as NativeMotionTarget;
}
function nativePartVariants(
  variants: Record<string, unknown>,
  draw: boolean | 'geometry'
): NativeMotionVariants {
  return Object.fromEntries(
    Object.entries(variants).map(([name, target]) => [
      name,
      typeof target === 'function'
        ? (...args: unknown[]) => nativePartTarget(target(...args), draw)
        : nativePartTarget(target as Record<string, unknown>, draw),
    ])
  ) as NativeMotionVariants;
}
export interface PhosphorMicrophoneSlashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorMicrophoneSlashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const LINE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
      delay: 0.15,
      opacity: { duration: 0.1 },
    },
  },
};
const PhosphorMicrophoneSlashIcon = forwardRef<
  PhosphorMicrophoneSlashIconHandle,
  PhosphorMicrophoneSlashIconProps
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
        <g transform="scale(0.09375)">
          <path
            d="M 84 44.87 A 48 48 0 0 1 176 64 v 64 a 49.19 49.19 0 0 1 -0.26 5 a 8 8 0 0 1 -8 7.17 a 8.13 8.13 0 0 1 -0.84 0 a 8 8 0 0 1 -7.12 -8.79 c 0.11 -1.1 0.17 -2.24 0.17 -3.36 V 64 A 32 32 0 0 0 98.64 51.25 A 8 8 0 1 1 84 44.87 Z"
            fill="currentColor"
          />
        </g>

        <g transform="scale(0.09375)">
          <path
            d="M 185.52 156.09 A 63.32 63.32 0 0 0 192 128 a 8 8 0 0 1 16 0 a 79.16 79.16 0 0 1 -8.11 35.12 a 8 8 0 0 1 -7.19 4.49 a 7.88 7.88 0 0 1 -3.51 -0.82 A 8 8 0 0 1 185.52 156.09 Z"
            fill="currentColor"
          />
        </g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={nativePartVariants(LINE_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-5'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M3.7591558331470005 3.7724604693466537l16.479840353256886 19.46943829183762"
                fill="none"
                stroke="white"
                strokeWidth={15.096169113092651}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                initial="normal"
                variants={nativePartVariants(LINE_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-5' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 213.92 218.62 l -160 -176 A 8 8 0 0 0 42.08 53.38 L 80 95.09 V 128 a 48 48 0 0 0 69.11 43.12 l 11.1 12.2 A 63.41 63.41 0 0 1 128 192 a 64.07 64.07 0 0 1 -64 -64 a 8 8 0 0 0 -16 0 a 80.11 80.11 0 0 0 72 79.6 V 240 a 8 8 0 0 0 16 0 V 207.59 a 78.83 78.83 0 0 0 35.16 -12.22 l 30.92 34 a 8 8 0 1 0 11.84 -10.76 Z M 128 160 a 32 32 0 0 1 -32 -32 V 112.69 l 41.66 45.82 A 32 32 0 0 1 128 160 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorMicrophoneSlashIcon.displayName = 'PhosphorMicrophoneSlashIcon';
export { PhosphorMicrophoneSlashIcon };

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
