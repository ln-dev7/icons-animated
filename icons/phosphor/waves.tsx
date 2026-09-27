/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: waves @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorWavesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorWavesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PhosphorWavesIcon = forwardRef<
  PhosphorWavesIconHandle,
  PhosphorWavesIconProps
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
      if (!isControlledRef.current) {
        controls.start('animate');
      }
      void e;
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      }
      void e;
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
          initial={nativePartTarget({ pathLength: 1 }, false)}
          variants={nativePartVariants(
            {
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: 'linear' },
              },
            },
            false
          )}
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
                d="M2.9837283478392465 6.752703905146657c0.540557114868023 1.1258616325449016 1.081114229736046 2.251723265089803 2.252321311950096 2.251723265089803C7.488370971739439 9.00442717023646 7.488370971739439 4.500980640056852 9.740692283689535 4.500980640056852c2.3424141644281002 0 2.162228459472092 4.503446530179606 4.504642623900192 4.503446530179606 2.252321311950096 0 2.252321311950096-4.503446530179606 4.504642623900192-4.503446530179606 1.1712070822140501 0 1.711764197082073 1.1258616325449016 2.252321311950096 2.251723265089803"
                fill="none"
                stroke="white"
                strokeWidth={7.452741152921665}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                initial={nativePartTarget({ pathLength: 1 }, true)}
                variants={nativePartVariants(
                  {
                    normal: { pathLength: 1 },
                    animate: {
                      pathLength: [0, 1],
                      transition: { duration: 0.4, ease: 'linear' },
                    },
                  },
                  true
                )}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 45.11 79.8 c 31.83 -26.37 53.72 -14.49 79.07 -0.74 c 15.11 8.2 31.35 17 49.93 17 c 14.14 0 29.64 -5.12 47 -19.5 a 8 8 0 1 0 -10.22 -12.31 c -31.83 26.38 -53.72 14.5 -79.07 0.74 C 105.21 50.58 75.06 34.22 34.89 67.5 A 8 8 0 1 0 45.11 79.8 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial={nativePartTarget({ pathLength: 1 }, false)}
          variants={nativePartVariants(
            {
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: 'linear' },
              },
            },
            false
          )}
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
                d="M3.0080133423095683 12.001450625784821c0.539790296481599 1.1259467534344254 1.079580592963198 2.251893506868851 2.2491262353399963 2.251893506868851 2.2491262353399963 0 2.2491262353399963-4.503787013737702 4.498252470679993-4.503787013737702 2.339091284753596 0 2.159161185926396 4.503787013737702 4.498252470679993 4.503787013737702 2.2491262353399963 0 2.2491262353399963-4.503787013737702 4.498252470679993-4.503787013737702 1.169545642376798 0 1.709335938858397 1.1259467534344254 2.2491262353399963 2.251893506868851"
                fill="none"
                stroke="white"
                strokeWidth={7.436921272721707}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                initial={nativePartTarget({ pathLength: 1 }, true)}
                variants={nativePartVariants(
                  {
                    normal: { pathLength: 1 },
                    animate: {
                      pathLength: [0, 1],
                      transition: { duration: 0.4, ease: 'linear' },
                    },
                  },
                  true
                )}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-1' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 210.89 120.25 c -31.83 26.38 -53.72 14.5 -79.07 0.74 c -26.61 -14.43 -56.76 -30.79 -96.93 2.49 a 8 8 0 0 0 10.22 12.31 c 31.83 -26.38 53.72 -14.5 79.07 -0.74 c 15.11 8.19 31.35 17 49.93 17 c 14.14 0 29.64 -5.11 47 -19.5 a 8 8 0 1 0 -10.22 -12.31 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial={nativePartTarget({ pathLength: 1 }, false)}
          variants={nativePartVariants(
            {
              normal: { pathLength: 1 },
              animate: {
                pathLength: [0, 1],
                transition: { duration: 0.4, ease: 'linear' },
              },
            },
            false
          )}
        >
          <defs>
            <mask
              id={nativeMaskId + '-2'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M3.000309607755117 17.246873944991982c0.5400320394725664 1.126466701861956 1.0800640789451328 2.252933403723912 2.25013349780236 2.252933403723912 2.25013349780236 0 2.25013349780236-4.505866807447824 4.50026699560472-4.505866807447824 2.3401388377144547 0 2.1601281578902656 4.505866807447824 4.50026699560472 4.505866807447824 2.25013349780236 0 2.25013349780236-4.505866807447824 4.50026699560472-4.505866807447824 1.1700694188572274 0 1.7101014583297935 1.126466701861956 2.25013349780236 2.252933403723912"
                fill="none"
                stroke="white"
                strokeWidth={7.541906678654414}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                initial={nativePartTarget({ pathLength: 1 }, true)}
                variants={nativePartVariants(
                  {
                    normal: { pathLength: 1 },
                    animate: {
                      pathLength: [0, 1],
                      transition: { duration: 0.4, ease: 'linear' },
                    },
                  },
                  true
                )}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-2' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 222.16 177.25 a 8 8 0 0 1 -1 11.25 c -17.36 14.39 -32.86 19.5 -47 19.5 c -18.58 0 -34.82 -8.82 -49.93 -17 c -25.35 -13.76 -47.24 -25.64 -79.07 0.74 a 8 8 0 1 1 -10.22 -12.31 c 40.17 -33.28 70.32 -16.92 96.93 -2.48 c 25.35 13.75 47.24 25.63 79.07 -0.74 A 8 8 0 0 1 222.16 177.25 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorWavesIcon.displayName = 'PhosphorWavesIcon';
export { PhosphorWavesIcon };

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
