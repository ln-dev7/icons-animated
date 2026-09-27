/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: sliders-horizontal @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
import type { Transition } from 'motion/react';
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

export interface PhosphorSlidersHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSlidersHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};
const PhosphorSlidersHorizontalIcon = forwardRef<
  PhosphorSlidersHorizontalIconHandle,
  PhosphorSlidersHorizontalIconProps
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
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          initial={false}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              x2: 14,
            },
            animate: {
              x2: 10,
            },
          }}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              x1: 10,
            },
            animate: {
              x1: 5,
            },
          }}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              x2: 12,
            },
            animate: {
              x2: 18,
            },
          }}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              x1: 8,
            },
            animate: {
              x1: 13,
            },
          }}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              x2: 12,
            },
            animate: {
              x2: 4,
            },
          }}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              x1: 16,
            },
            animate: {
              x1: 8,
            },
          }}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              d: 'M3.75 8.25H12.84375A3 3 0 0 0 18.65625 8.25H20.25A0.75 0.75 0 0 0 20.25 6.75H18.65625A3 3 0 0 0 12.84375 6.75H3.75A0.75 0.75 0 0 0 3.75 8.25ZM15.75 6A1.5 1.5 0 1 1 14.25 7.5 1.5 1.5 0 0 1 15.75 6Z',
            },
            animate: {
              x1: 9,
              x2: 9,
            },
          }}
        />

        <motion.path
          d="M3.75 8.25H6.84375a3 3 0 0 0 5.8125 0h7.59375a0.75 0.75 0 0 0 0-1.5H12.65625a3 3 0 0 0-5.8125 0H3.75a0.75 0.75 0 0 0 0 1.5ZM9.75 6A1.5 1.5 0 1 1 8.25 7.5 1.5 1.5 0 0 1 9.75 6Z"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              d: 'M20.25 15.75H10.65625A3 3 0 0 0 4.84375 15.75H3.75A0.75 0.75 0 0 0 3.75 17.25H4.84375A3 3 0 0 0 10.65625 17.25H20.25A0.75 0.75 0 0 0 20.25 15.75ZM7.75 18A1.5 1.5 0 1 1 9.25 16.5 1.5 1.5 0 0 1 7.75 18Z',
            },
            animate: {
              d: 'M3.75 8.25H12.84375A3 3 0 0 0 18.65625 8.25H20.25A0.75 0.75 0 0 0 20.25 6.75H18.65625A3 3 0 0 0 12.84375 6.75H3.75A0.75 0.75 0 0 0 3.75 8.25ZM15.75 6A1.5 1.5 0 1 1 14.25 7.5 1.5 1.5 0 0 1 15.75 6Z',
            },
          }}
        />

        <motion.path
          d="M20.25 15.75H18.65625a3 3 0 0 0-5.8125 0H3.75a0.75 0.75 0 0 0 0 1.5h9.09375a3 3 0 0 0 5.8125 0h1.59375a0.75 0.75 0 0 0 0-1.5ZM15.75 18a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15.75 18Z"
          animate={reduceDefinition(controls)}
          transition={DEFAULT_TRANSITION}
          variants={{
            normal: {
              d: 'M20.25 15.75H18.65625A3 3 0 0 0 12.84375 15.75H3.75A0.75 0.75 0 0 0 3.75 17.25H12.84375A3 3 0 0 0 18.65625 17.25H20.25A0.75 0.75 0 0 0 20.25 15.75ZM15.75 18A1.5 1.5 0 1 1 17.25 16.5 1.5 1.5 0 0 1 15.75 18Z',
            },
            animate: {
              d: 'M20.25 15.75H10.65625A3 3 0 0 0 4.84375 15.75H3.75A0.75 0.75 0 0 0 3.75 17.25H4.84375A3 3 0 0 0 10.65625 17.25H20.25A0.75 0.75 0 0 0 20.25 15.75ZM7.75 18A1.5 1.5 0 1 1 9.25 16.5 1.5 1.5 0 0 1 7.75 18Z',
            },
          }}
        />
      </svg>
    </div>
  );
});
PhosphorSlidersHorizontalIcon.displayName = 'PhosphorSlidersHorizontalIcon';
export { PhosphorSlidersHorizontalIcon };

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
