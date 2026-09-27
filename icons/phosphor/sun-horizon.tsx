/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: sunset @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorSunHorizonIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSunHorizonIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const ARROW_VARIANTS: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, 1, 0],
  },
};
const RAYS_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};
const PhosphorSunHorizonIcon = forwardRef<
  PhosphorSunHorizonIconHandle,
  PhosphorSunHorizonIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const arrowControls = useAnimation();
  const raysControls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => {
        arrowControls.start('animate');
        raysControls.start('animate');
      },
      stopAnimation: () => {
        arrowControls.start('normal');
        raysControls.start('normal');
      },
    };
  }, [arrowControls, raysControls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        arrowControls.start('animate');
        raysControls.start('animate');
      }
    },
    [arrowControls, raysControls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        arrowControls.start('normal');
        raysControls.start('normal');
      }
    },
    [arrowControls, raysControls]
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
          animate={reduceDefinition(arrowControls)}
          initial="normal"
          variants={ARROW_VARIANTS}
        ></motion.g>

        {[
          'm4.93 10.93 1.41 1.41',
          'M2 18h2',
          'M20 18h2',
          'm19.07 10.93-1.41 1.41',
          'M22 22H2',
          ,
        ].map((d, index) => (
          <motion.g
            animate={reduceDefinition(raysControls)}
            custom={index + 1}
            initial="normal"
            key={d}
            variants={RAYS_VARIANTS}
          >
            {index === 0 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 72.84 43.58 a 8 8 0 0 1 14.32 -7.16 l 8 16 a 8 8 0 0 1 -14.32 7.16 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 1 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 16.840000000000003 92.42 a 8 8 0 0 1 10.74 -3.57 l 16 8 a 8 8 0 0 1 -7.16 14.31 l -16 -8 A 8 8 0 0 1 16.84 92.42 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 2 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 208.84 107.58 a 8 8 0 0 1 3.58 -10.73 l 16 -8 a 8 8 0 1 1 7.16 14.31 l -16 8 a 8 8 0 0 1 -10.74 -3.58 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 3 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 160.84 52.42 l 8 -16 a 8 8 0 0 1 14.32 7.16 l -8 16 a 8 8 0 1 1 -14.32 -7.16 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 4 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 216 200 a 8 8 0 0 1 -8 8 H 48 a 8 8 0 0 1 0 -16 H 208 A 8 8 0 0 1 216 200 Z"
                  fill="currentColor"
                />
              </g>
            )}
          </motion.g>
        ))}
        <g transform="scale(0.09375)">
          <path
            d="M 240 152 H 199.55 a 73.54 73.54 0 0 0 0.45 -8 a 72 72 0 0 0 -144 0 a 73.54 73.54 0 0 0 0.45 8 H 16 a 8 8 0 0 0 0 16 H 240 a 8 8 0 0 0 0 -16 Z M 72 144 a 56 56 0 1 1 111.41 8 H 72.59 A 56.13 56.13 0 0 1 72 144 Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
});
PhosphorSunHorizonIcon.displayName = 'PhosphorSunHorizonIcon';
export { PhosphorSunHorizonIcon };

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
