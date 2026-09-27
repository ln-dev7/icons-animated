/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: brain @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorBrainIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorBrainIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const BRAIN_STEM_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.4, 1],
    pathOffset: [0, 0.25, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};
const BRAIN_SIDE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.5, 1],
    pathOffset: [0, 0.25, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};
const BRAIN_TOP_ARC_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.8, 1],
    pathOffset: [0, 0.07, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};
const BRAIN_LOWER_ARC_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0 },
  animate: {
    pathLength: [1, 0.8, 1],
    pathOffset: [0, 0.14, 0],
    transition: {
      duration: 1.4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};
const PhosphorBrainIcon = forwardRef<
  PhosphorBrainIconHandle,
  PhosphorBrainIconProps
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        animate={reduceDefinition(controls)}
        variants={{
          normal: {
            scale: 1,
            strokeWidth: 2,
          },
          animate: {
            scale: [1, 1.08, 1],
            strokeWidth: [2, 2.25, 2],
            transition: {
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
          },
        }}
      >
        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(BRAIN_STEM_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-0'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M12.003406480838777 20.983146407474244V2.2540680186282422"
                fill="none"
                stroke="white"
                strokeWidth={24.493343106356438}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(BRAIN_STEM_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 248 124 a 56.11 56.11 0 0 0 -32 -50.61 V 72 a 48 48 0 0 0 -88 -26.49 A 48 48 0 0 0 40 72 v 1.39 a 56 56 0 0 0 0 101.2 V 176 a 48 48 0 0 0 88 26.49 A 48 48 0 0 0 216 176 v -1.41 A 56.09 56.09 0 0 0 248 124 Z M 88 208 a 32 32 0 0 1 -31.81 -28.56 A 55.87 55.87 0 0 0 64 180 h 8 a 8 8 0 0 0 0 -16 H 64 A 40 40 0 0 1 50.67 86.27 A 8 8 0 0 0 56 78.73 V 72 a 32 32 0 0 1 64 0 v 68.26 A 47.8 47.8 0 0 0 88 128 a 8 8 0 0 0 0 16 a 32 32 0 0 1 0 64 Z M 192 164 h -8 a 8 8 0 0 0 0 16 h 8 a 55.87 55.87 0 0 0 7.81 -0.56 A 32 32 0 1 1 168 144 a 8 8 0 0 0 0 -16 a 47.8 47.8 0 0 0 -32 12.26 V 72 a 32 32 0 0 1 64 0 v 6.73 a 8 8 0 0 0 5.33 7.54 A 40 40 0 0 1 192 164 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={BRAIN_SIDE_VARIANTS}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={BRAIN_TOP_ARC_VARIANTS}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={BRAIN_TOP_ARC_VARIANTS}
        />

        <g transform="scale(0.09375)">
          <path
            d="M 208 112 a 8 8 0 0 1 -8 8 h -4 a 36 36 0 0 1 -36 -36 V 80 a 8 8 0 0 1 16 0 v 4 a 20 20 0 0 0 20 20 h 4 A 8 8 0 0 1 208 112 Z"
            fill="currentColor"
          />
        </g>

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={BRAIN_LOWER_ARC_VARIANTS}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={BRAIN_LOWER_ARC_VARIANTS}
        />
        <g transform="scale(0.09375)">
          <path
            d="M 60 120 H 56 a 8 8 0 0 1 0 -16 h 4 A 20 20 0 0 0 80 84 V 80 a 8 8 0 0 1 16 0 v 4 A 36 36 0 0 1 60 120 Z"
            fill="currentColor"
          />
        </g>
      </motion.svg>
    </div>
  );
});
PhosphorBrainIcon.displayName = 'PhosphorBrainIcon';
export { PhosphorBrainIcon };

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
