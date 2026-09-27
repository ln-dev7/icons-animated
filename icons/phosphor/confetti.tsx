/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: party-popper @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorConfettiIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorConfettiIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const LINES_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    translateX: 0,
    translateY: 0,
  },
  animate: {
    opacity: [0, 1],
    scale: [0.3, 0.8, 1, 1.1, 1],
    pathLength: [0, 0.5, 1],
    translateX: [-5, 0],
    translateY: [5, 0],
    transition: {
      duration: 0.7,
      velocity: 0.3,
    },
  },
};
const DOTS_VARIANTS: Variants = {
  normal: { opacity: 1, scale: 1, translateX: 0, translateY: 0 },
  animate: {
    opacity: [0, 1],
    translateX: [-5, 0],
    translateY: [5, 0],
    scale: [0.5, 0.8, 1, 1.1, 1],
    transition: {
      duration: 0.7,
    },
  },
};
const POPPER_VARIANTS: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [-1.5, 0],
    translateY: [1.5, 0],
    transition: {
      velocity: 0.3,
    },
  },
};
const PhosphorConfettiIcon = forwardRef<
  PhosphorConfettiIconHandle,
  PhosphorConfettiIconProps
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
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={POPPER_VARIANTS}
        />
        <motion.g
          animate={reduceDefinition(controls)}
          variants={POPPER_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 111.49 52.63 a 15.8 15.8 0 0 0 -26 5.77 L 33 202.78 A 15.83 15.83 0 0 0 47.76 224 a 16 16 0 0 0 5.46 -1 l 144.37 -52.5 a 15.8 15.8 0 0 0 5.78 -26 Z M 103.16 187.84 l -35 -35 l 13.16 -36.21 l 58.05 58.05 Z M 48.16 207.84 l 14 -38.41 l 24.45 24.45 Z M 156 168.64 L 87.36 100 l 13 -35.87 l 91.43 91.43 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={DOTS_VARIANTS}
        />
        <motion.g animate={reduceDefinition(controls)} variants={DOTS_VARIANTS}>
          <g transform="scale(0.09375)">
            <path
              d="M 242.53 79.59 l -24 8 a 8 8 0 0 1 -5.06 -15.18 l 24 -8 a 8 8 0 0 1 5.06 15.18 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g animate={reduceDefinition(controls)} variants={DOTS_VARIANTS}>
          <g transform="scale(0.09375)">
            <path
              d="M 136 40 V 16 a 8 8 0 0 1 16 0 V 40 a 8 8 0 0 1 -16 0 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={DOTS_VARIANTS}
        />
        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(LINES_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-6'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M15 7.50279237536663l0.9074999998890736-0.795740051491367c0.11999999998533206-0.630586455898819 0.6749999999174928-1.081005352969404 1.3199999998386527-1.081005352969404h0.2849999999651636c0.6599999999193263 0 1.1624999998579042-0.5780375845739174 1.0874999998670718-1.2236380037084225a2.1770246691744943 2.1749999997341436 90 0 1 1.4699999998203177-2.342178264767042L20.999999999266603 1.4972070810921625"
                fill="none"
                stroke="white"
                strokeWidth={5.733543916283979}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(LINES_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-6' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 160 72 a 37.8 37.8 0 0 1 3.84 -15.58 C 169.14 45.83 179.14 40 192 40 c 6.7 0 11 -2.29 13.65 -7.21 A 22 22 0 0 0 208 23.94 A 8 8 0 0 1 224 24 c 0 12.86 -8.52 32 -32 32 c -6.7 0 -11 2.29 -13.65 7.21 A 22 22 0 0 0 176 72.06 A 8 8 0 0 1 160 72 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(LINES_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-7'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M19.50007881124548 12.74923231589079h0.4619287418280951c0.4259342944129188 0 0.7918778431338773-0.6413669064799518 0.8578676633950337-1.5047454344337328 0.09598519310713664-1.1223920863399155 0.6718963517499565-1.7884269507614037 1.187816764700816-1.3690716657552817L22.4996160958435 10.282436521737129"
                fill="none"
                stroke="white"
                strokeWidth={5.576616219134198}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(LINES_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-7' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 237.66 122.34 a 8 8 0 1 1 -11.32 11.31 l -16 -16 a 8 8 0 0 1 11.32 -11.32 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={LINES_VARIANTS}
        />
      </svg>
    </div>
  );
});
PhosphorConfettiIcon.displayName = 'PhosphorConfettiIcon';
export { PhosphorConfettiIcon };

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
