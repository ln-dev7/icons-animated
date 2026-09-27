/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: accessibility @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorWheelchairMotionIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorWheelchairMotionIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const CIRCLE_VARIANTS: Variants = {
  initial: {
    y: 0,
    x: 0,
  },
  animate: {
    y: [0, 1, -1, 0],
    x: [0, 1, -1, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};
const PRIMARY_GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};
const SECONDARY_GROUP_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: -360,
    transition: {
      duration: 1,
      delay: 0.4,
      ease: 'easeInOut',
    },
  },
};
const PATH_VARIANTS: Variants = {
  initial: {
    rotate: 0,
    d: 'M8 5 L5 8',
  },
  animate: {
    rotate: [0, -60, 0],
    d: ['M8 5 L5 8', 'M8 5 L4 9', 'M8 5 L5 8'],
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: 'easeInOut',
    },
    transformOrigin: 'top right',
  },
};
const PhosphorWheelchairMotionIcon = forwardRef<
  PhosphorWheelchairMotionIconHandle,
  PhosphorWheelchairMotionIconProps
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
      stopAnimation: () => controls.start('initial'),
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
          animate={reduceDefinition(controls)}
          initial="initial"
          variants={CIRCLE_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 176 80 a 32 32 0 1 0 -32 -32 A 32 32 0 0 0 176 80 Z M 176 32 a 16 16 0 1 1 -16 16 A 16 16 0 0 1 176 32 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="initial"
          variants={PRIMARY_GROUP_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 206.19 130.93 a 8 8 0 0 1 1.65 6.64 l -16 80 A 8 8 0 0 1 184 224 a 7.77 7.77 0 0 1 -1.58 -0.16 a 8 8 0 0 1 -6.27 -9.41 L 190.24 144 H 128 a 8 8 0 0 1 -6.94 -12 l 20.06 -34.9 a 80.09 80.09 0 0 0 -88 9.17 A 8 8 0 1 1 42.91 94 a 96 96 0 0 1 113.46 -6.42 a 8 8 0 0 1 2.57 10.69 L 141.82 128 H 200 A 8 8 0 0 1 206.19 130.93 Z"
              fill="currentColor"
            />
          </g>

          <motion.g
            display="none"
            animate={reduceDefinition(controls)}
            initial="initial"
            variants={PATH_VARIANTS}
          />
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="initial"
          variants={SECONDARY_GROUP_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 168 168 a 64 64 0 1 1 -64 -64 a 8 8 0 0 1 0 16 a 48 48 0 1 0 48 48 a 8 8 0 0 1 16 0 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorWheelchairMotionIcon.displayName = 'PhosphorWheelchairMotionIcon';
export { PhosphorWheelchairMotionIcon };

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
