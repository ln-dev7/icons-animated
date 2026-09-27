/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: smile @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorSmileyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSmileyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PhosphorSmileyIcon = forwardRef<
  PhosphorSmileyIconHandle,
  PhosphorSmileyIconProps
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
      strokeWidth: 2,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 1.15, 1.05, 1.1],
      rotate: [0, -3, 3, 0],
      strokeWidth: [2, 2.5, 2.5, 2.5],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut',
      },
    },
  };
  const mouthVariants: Variants = {
    normal: {
      d: 'M16.3996875 14.625c-0.9646874999999999 1.6678125-2.5687499999999996 2.625-4.3996875 2.625s-3.4340625000000005-0.9562499999999999-4.39875-2.625a0.75 0.75 0 1 1 1.2974999999999999-0.75c0.7003125 1.2103125000000001 1.8009375 1.875 3.10125 1.875s2.4009375-0.6656249999999999 3.1003125000000002-1.875a0.75 0.75 0 0 1 1.299375 0.75Z',
      pathLength: 1,
      pathOffset: 0,
      strokeWidth: 2,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      d: 'M17.501569824630586 14.321869693212788c-1.205859375 2.918671875-3.2109374999999996 4.59375-5.4996093749999995 4.59375s-4.292578125-1.6734375-5.4984375-4.59375a1.3125 0.9375 90 1 1 1.6218749999999997-1.3125c0.875390625 2.118046875 2.2511718750000003 3.28125 3.8765625 3.28125s3.001171875-1.1648437499999997 3.8753906250000005-3.28125a1.3125 0.9375 90 0 1 1.6242187499999998 1.3125Z',
      pathLength: [0.3, 1, 1],
      pathOffset: [0, 0, 0],
      strokeWidth: 2.5,
      transition: {
        d: { duration: 0.4, ease: 'easeOut' },
        pathLength: {
          duration: 0.5,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        },
        delay: 0.1,
      },
    },
  };
  const eyeVariants: Variants = {
    normal: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 1.5, 0.8, 1.2],
      opacity: [1, 1, 1, 1],
      transition: {
        duration: 0.5,
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
        <motion.g>
          <g transform="scale(0.09375)">
            <path
              d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z M 128 216 a 88 88 0 1 1 88 -88 A 88.1 88.1 0 0 1 128 216 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
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
                d="M7.4852098894680505 13.475070989646516s1.6901056170036028 3.774872172139535 4.506948312009608 3.774872172139535 4.506948312009608-3.774872172139535 4.506948312009608-3.774872172139535"
                fill="none"
                stroke="white"
                strokeWidth={8.99938772126757}
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
              d="M16.3996875 14.625c-0.9646874999999999 1.6678125-2.5687499999999996 2.625-4.3996875 2.625s-3.4340625000000005-0.9562499999999999-4.39875-2.625a0.75 0.75 0 1 1 1.2974999999999999-0.75c0.7003125 1.2103125000000001 1.8009375 1.875 3.10125 1.875s2.4009375-0.6656249999999999 3.1003125000000002-1.875a0.75 0.75 0 0 1 1.299375 0.75Z"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={nativePartVariants(mouthVariants, 'geometry')}
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={eyeVariants}
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
          variants={eyeVariants}
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
PhosphorSmileyIcon.displayName = 'PhosphorSmileyIcon';
export { PhosphorSmileyIcon };

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
