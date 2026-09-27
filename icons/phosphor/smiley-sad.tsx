/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: frown @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorSmileySadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSmileySadIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PhosphorSmileySadIcon = forwardRef<
  PhosphorSmileySadIconHandle,
  PhosphorSmileySadIconProps
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
      if (!isControlledRef.current) controls.start('animate');
      void e;
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) controls.start('normal');
      void e;
    },
    [controls]
  );
  const faceVariants: Variants = {
    normal: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 1.15, 1.05, 1.08],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut',
      },
    },
  };
  const mouthVariants: Variants = {
    normal: {
      d: 'M16.39875 16.125a0.75 0.75 0 1 1-1.2974999999999999 0.75c-0.7003125-1.2103125000000001-1.8009375-1.875-3.10125-1.875s-2.4009375 0.6656249999999999-3.10125 1.875a0.75 0.75 0 1 1-1.2974999999999999-0.75c0.9646874999999999-1.6678125 2.5678125-2.625 4.39875-2.625S15.4340625 14.456249999999999 16.39875 16.125Z',
      pathLength: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      d: 'M16.39875 17.059084466004638a0.9375 0.75 90 1 1-1.2974999999999999 0.9375c-0.7003125-1.5128906250000003-1.8009375-2.34375-3.10125-2.34375s-2.4009375 0.8320312499999999-3.10125 2.34375a0.9375 0.75 90 1 1-1.2974999999999999-0.9375c0.9646874999999999-2.0847656249999997 2.5678125-3.28125 4.39875-3.28125S15.4340625 14.973146966004638 16.39875 17.059084466004638Z',
      pathLength: [0.3, 1, 1],
      transition: {
        d: { duration: 0.5, ease: 'easeOut' },
        pathLength: {
          duration: 0.5,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        },
        delay: 0.1,
      },
    },
  };
  const leftEyeVariants: Variants = {
    normal: {
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 1.3, 0.9, 1.1],
      y: [0, -0.5, 0.3, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut',
      },
    },
  };
  const rightEyeVariants: Variants = {
    normal: {
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 0.9, 1.3, 1.1],
      y: [0, -0.5, 0.3, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut',
      },
    },
  };
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
        initial="normal"
        variants={faceVariants}
      >
        <g transform="scale(0.09375)">
          <path
            d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z M 128 216 a 88 88 0 1 1 88 -88 A 88.1 88.1 0 0 1 128 216 Z"
            fill="currentColor"
          />
        </g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={nativePartVariants(mouthVariants, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-1'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M16.51574366288268 17.27731580780569s-1.693408069917098-3.7773073436484736-4.515754853112261-3.7773073436484736-4.515754853112261 3.7773073436484736-4.515754853112261 3.7773073436484736"
                fill="none"
                stroke="white"
                strokeWidth={9.000062263456607}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                initial="normal"
                variants={nativePartVariants(mouthVariants, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-1' + ')'}>
            <motion.path
              d="M16.39875 16.125a0.75 0.75 0 1 1-1.2974999999999999 0.75c-0.7003125-1.2103125000000001-1.8009375-1.875-3.10125-1.875s-2.4009375 0.6656249999999999-3.10125 1.875a0.75 0.75 0 1 1-1.2974999999999999-0.75c0.9646874999999999-1.6678125 2.5678125-2.625 4.39875-2.625S15.4340625 14.456249999999999 16.39875 16.125Z"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={nativePartVariants(mouthVariants, 'geometry')}
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={leftEyeVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 80 108 a 12 12 0 1 1 12 12 A 12 12 0 0 1 80 108 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={rightEyeVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 176 108 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 176 108 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
});
PhosphorSmileySadIcon.displayName = 'PhosphorSmileySadIcon';
export { PhosphorSmileySadIcon };

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
