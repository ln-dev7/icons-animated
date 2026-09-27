/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: graduation-cap @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorGraduationCapIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorGraduationCapIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const CAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    y: [0, -2, 0],
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};
const TASSEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 15, -10, 5, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      delay: 0.1,
    },
  },
};
const PhosphorGraduationCapIcon = forwardRef<
  PhosphorGraduationCapIconHandle,
  PhosphorGraduationCapIconProps
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
          animate={reduceDefinition(controls)}
          style={{ transformOrigin: '12px 12px' }}
          variants={CAP_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-0'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <rect x={-256} y={-256} width={472} height={768} />
                  <rect x={216} y={-256} width={296} height={360} />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
                <path
                  d="M 251.76 88.94 l -120 -64 a 8 8 0 0 0 -7.52 0 l -120 64 a 8 8 0 0 0 0 14.12 L 32 117.87 v 48.42 a 15.91 15.91 0 0 0 4.06 10.65 C 49.16 191.53 78.51 216 128 216 a 130 130 0 0 0 48 -8.76 V 240 a 8 8 0 0 0 16 0 V 199.51 a 115.63 115.63 0 0 0 27.94 -22.57 A 15.91 15.91 0 0 0 224 166.29 V 117.87 l 27.76 -14.81 a 8 8 0 0 0 0 -14.12 Z M 128 200 c -43.27 0 -68.72 -21.14 -80 -33.71 V 126.4 l 76.24 40.66 a 8 8 0 0 0 7.52 0 L 176 143.47 v 46.34 C 163.4 195.69 147.52 200 128 200 Z M 208 166.25 a 97.83 97.83 0 0 1 -16 14.25 V 134.93 l 16 -8.53 Z M 188 118.94 l -0.22 -0.13 l -56 -29.87 a 8 8 0 0 0 -7.52 14.12 L 171 128 l -43 22.93 L 25 96 L 128 41.07 L 231 96 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>

          <motion.g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'top center',
            }}
            variants={TASSEL_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-1'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <rect x={216} y={104} width={296} height={408} />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                  <path
                    d="M 251.76 88.94 l -120 -64 a 8 8 0 0 0 -7.52 0 l -120 64 a 8 8 0 0 0 0 14.12 L 32 117.87 v 48.42 a 15.91 15.91 0 0 0 4.06 10.65 C 49.16 191.53 78.51 216 128 216 a 130 130 0 0 0 48 -8.76 V 240 a 8 8 0 0 0 16 0 V 199.51 a 115.63 115.63 0 0 0 27.94 -22.57 A 15.91 15.91 0 0 0 224 166.29 V 117.87 l 27.76 -14.81 a 8 8 0 0 0 0 -14.12 Z M 128 200 c -43.27 0 -68.72 -21.14 -80 -33.71 V 126.4 l 76.24 40.66 a 8 8 0 0 0 7.52 0 L 176 143.47 v 46.34 C 163.4 195.69 147.52 200 128 200 Z M 208 166.25 a 97.83 97.83 0 0 1 -16 14.25 V 134.93 l 16 -8.53 Z M 188 118.94 l -0.22 -0.13 l -56 -29.87 a 8 8 0 0 0 -7.52 14.12 L 171 128 l -43 22.93 L 25 96 L 128 41.07 L 231 96 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorGraduationCapIcon.displayName = 'PhosphorGraduationCapIcon';
export { PhosphorGraduationCapIcon };

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
