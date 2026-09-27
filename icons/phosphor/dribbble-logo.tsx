/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: dribbble @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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
export interface PhosphorDribbbleLogoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorDribbbleLogoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const CIRCLE_VARIANTS: Variants = {
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
const PhosphorDribbbleLogoIcon = forwardRef<
  PhosphorDribbbleLogoIconHandle,
  PhosphorDribbbleLogoIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
  const circleControls = useAnimation();
  const path1Controls = useAnimation();
  const path2Controls = useAnimation();
  const path3Controls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => {
        circleControls.start('animate');
        path1Controls.start('animate');
        path2Controls.start('animate');
        path3Controls.start('animate');
      },
      stopAnimation: () => {
        circleControls.start('normal');
        path1Controls.start('normal');
        path2Controls.start('normal');
        path3Controls.start('normal');
      },
    };
  }, [circleControls, path1Controls, path2Controls, path3Controls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        circleControls.start('animate');
        path1Controls.start('animate');
        path2Controls.start('animate');
        path3Controls.start('animate');
      }
    },
    [circleControls, path1Controls, path2Controls, path3Controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        circleControls.start('normal');
        path1Controls.start('normal');
        path2Controls.start('normal');
        path3Controls.start('normal');
      }
    },
    [circleControls, path1Controls, path2Controls, path3Controls]
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
          animate={reduceDefinition(circleControls)}
          initial="normal"
          variants={nativePartVariants(CIRCLE_VARIANTS, false)}
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
                d="M2.252137380499888 11.995716253087828a9.745716253087828 9.741282091113238 90 1 0 19.482564182226476 0 9.745716253087828 9.741282091113238 90 1 0-19.482564182226476 0Z"
                fill="none"
                stroke="white"
                strokeWidth={19.119084144968713}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(circleControls)}
                initial="normal"
                variants={nativePartVariants(CIRCLE_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z M 215.65 120.18 Q 211.83 120 208 120 a 168.58 168.58 0 0 0 -43.94 5.84 A 166.52 166.52 0 0 0 150.61 96 a 168.32 168.32 0 0 0 38.2 -31.55 A 87.78 87.78 0 0 1 215.65 120.18 Z M 176.28 54.46 A 151.75 151.75 0 0 1 142 82.52 a 169.22 169.22 0 0 0 -38.63 -39 a 88 88 0 0 1 73 10.94 Z M 85.65 50.88 a 153.13 153.13 0 0 1 42 39.18 A 151.82 151.82 0 0 1 64 104 a 154.19 154.19 0 0 1 -20.28 -1.35 A 88.39 88.39 0 0 1 85.65 50.88 Z M 40 128 a 87.73 87.73 0 0 1 0.53 -9.64 A 168.85 168.85 0 0 0 64 120 a 167.84 167.84 0 0 0 72.52 -16.4 a 150.82 150.82 0 0 1 12.31 27.13 a 167.11 167.11 0 0 0 -24.59 11.6 a 169.22 169.22 0 0 0 -55.07 51.06 A 87.8 87.8 0 0 1 40 128 Z M 82 203 a 152.91 152.91 0 0 1 50.24 -46.79 a 148.81 148.81 0 0 1 20.95 -10 a 152.48 152.48 0 0 1 3.73 33.47 a 152.93 152.93 0 0 1 -3.49 32.56 A 87.92 87.92 0 0 1 82 203 Z M 171.06 204.73 a 170 170 0 0 0 1.86 -25 a 168.69 168.69 0 0 0 -4.45 -38.47 A 152.31 152.31 0 0 1 208 136 q 3.8 0 7.61 0.19 A 88.13 88.13 0 0 1 171.06 204.72 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(path1Controls)}
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(path2Controls)}
          initial="normal"
          variants={PATH_VARIANTS}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(path3Controls)}
          initial="normal"
          variants={PATH_VARIANTS}
        />
      </svg>
    </div>
  );
});
PhosphorDribbbleLogoIcon.displayName = 'PhosphorDribbbleLogoIcon';
export { PhosphorDribbbleLogoIcon };

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
