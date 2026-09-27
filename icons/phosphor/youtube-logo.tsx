/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: youtube @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorYoutubeLogoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorYoutubeLogoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};
const TRIANGLE_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};
const PhosphorYoutubeLogoIcon = forwardRef<
  PhosphorYoutubeLogoIconHandle,
  PhosphorYoutubeLogoIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
  const pathControls = useAnimation();
  const triangleControls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => {
        pathControls.start('animate');
        triangleControls.start('animate');
      },
      stopAnimation: () => {
        pathControls.start('normal');
        triangleControls.start('normal');
      },
    };
  }, [pathControls, triangleControls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        pathControls.start('animate');
        triangleControls.start('animate');
      }
    },
    [pathControls, triangleControls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        pathControls.start('normal');
        triangleControls.start('normal');
      }
    },
    [pathControls, triangleControls]
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
          animate={reduceDefinition(pathControls)}
          initial="normal"
          variants={nativePartVariants(PATH_VARIANTS, false)}
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
                d="M2.0488693131333253 17.83636979294559a28.15603822746331 25.26561442469316 90 0 1 0-11.673316014702863 2.3346632029405727 2.094992904203413 90 0 1 1.466495032942389-1.6342642420584008 57.85295416886739 51.91392416616058 90 0 1 16.969442524047643 0A2.3346632029405727 2.094992904203413 90 0 1 21.951301903065747 6.163053778242725a28.15603822746331 25.26561442469316 90 0 1 0 11.673316014702863 2.3346632029405727 2.094992904203413 90 0 1-1.466495032942389 1.6342642420584008 57.841280852852684 51.90344920163955 90 0 1-16.969442524047643 0A2.3346632029405727 2.094992904203413 90 0 1 2.0488693131333253 17.83636979294559"
                fill="none"
                stroke="white"
                strokeWidth={5.650892106361081}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(pathControls)}
                initial="normal"
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 234.33 69.52 a 24 24 0 0 0 -14.49 -16.4 C 185.56 39.88 131 40 128 40 s -57.56 -0.12 -91.84 13.12 a 24 24 0 0 0 -14.49 16.4 C 19.08 79.5 16 97.74 16 128 s 3.08 48.5 5.67 58.48 a 24 24 0 0 0 14.49 16.41 C 69 215.56 120.4 216 127.34 216 h 1.32 c 6.94 0 58.37 -0.44 91.18 -13.11 a 24 24 0 0 0 14.49 -16.41 c 2.59 -10 5.67 -28.22 5.67 -58.48 S 236.92 79.5 234.33 69.52 Z M 218.84 182.51999999999998 a 8 8 0 0 1 -4.77 5.49 c -31.65 12.22 -85.48 12 -86 12 H 128 c -0.54 0 -54.33 0.2 -86 -12 a 8 8 0 0 1 -4.77 -5.49 C 34.8 173.39 32 156.57 32 128 s 2.8 -45.39 5.16 -54.47 A 8 8 0 0 1 41.93 68 c 30.52 -11.79 81.66 -12 85.85 -12 h 0.27 c 0.54 0 54.38 -0.18 86 12 a 8 8 0 0 1 4.77 5.49 C 221.2 82.61 224 99.43 224 128 S 221.2 173.39 218.84 182.47 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(triangleControls)}
          initial="normal"
          variants={nativePartVariants(TRIANGLE_VARIANTS, false)}
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
                d="M9.75 15.74587470124968l6.0204745418552505-3.77014803626938-6.0204745418552505-3.77014803626938z"
                fill="none"
                stroke="white"
                strokeWidth={5.002104674952221}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(triangleControls)}
                initial="normal"
                variants={nativePartVariants(TRIANGLE_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-1' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 164.44 121.34 l -48 -32 A 8 8 0 0 0 104 96 v 64 a 8 8 0 0 0 12.44 6.66 l 48 -32 a 8 8 0 0 0 0 -13.32 Z M 120 145.05 V 111 l 25.58 17 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorYoutubeLogoIcon.displayName = 'PhosphorYoutubeLogoIcon';
export { PhosphorYoutubeLogoIcon };

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
