/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: phone-call @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorPhoneCallIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorPhoneCallIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PHONE_CALL_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    rotate: [10, 20, -10, 10, 0],
    scale: [1, 1.1, 1.2, 1.1, 1],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
    },
  },
};
const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};
const PhosphorPhoneCallIcon = forwardRef<
  PhosphorPhoneCallIconHandle,
  PhosphorPhoneCallIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const svgControls = useAnimation();
  const pathControls = useAnimation();
  const isControlledRef = useRef(false);
  const runPathIntro = useCallback(async () => {
    await pathControls.start('fadeOut');
    pathControls.start('fadeIn');
  }, [pathControls]);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: async () => {
        await Promise.all([svgControls.start('animate'), runPathIntro()]);
      },
      stopAnimation: () => {
        svgControls.start('normal');
        pathControls.start('normal');
      },
    };
  }, [svgControls, pathControls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        await Promise.all([svgControls.start('animate'), runPathIntro()]);
      }
    },
    [runPathIntro, svgControls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        svgControls.start('normal');
        pathControls.start('normal');
      }
    },
    [pathControls, svgControls]
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        animate={reduceDefinition(svgControls)}
        initial="normal"
        style={{ overflow: 'visible' }}
        variants={PHONE_CALL_VARIANTS}
      >
        <motion.g
          animate={reduceDefinition(pathControls)}
          custom={2}
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 144.27 45.93 a 8 8 0 0 1 9.8 -5.66 a 86.22 86.22 0 0 1 61.66 61.66 a 8 8 0 0 1 -5.66 9.8 A 8.23 8.23 0 0 1 208 112 a 8 8 0 0 1 -7.73 -5.94 a 70.35 70.35 0 0 0 -50.33 -50.33 A 8 8 0 0 1 144.27 45.93 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(pathControls)}
          custom={1}
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 141.94 87.72999999999999 c 13.79 3.68 22.65 12.54 26.33 26.33 A 8 8 0 0 0 176 120 a 8.23 8.23 0 0 0 2.07 -0.27 a 8 8 0 0 0 5.66 -9.8 c -5.12 -19.16 -18.5 -32.54 -37.66 -37.66 a 8 8 0 1 0 -4.13 15.46 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <g transform="scale(0.09375)">
          <path
            d="M 223.88 183.07999999999998 A 56.26 56.26 0 0 1 168 232 C 88.6 232 24 167.4 24 88 A 56.26 56.26 0 0 1 72.92 32.12 a 16 16 0 0 1 16.62 9.52 l 21.12 47.15 l 0 0.12 A 16 16 0 0 1 109.39 104 c -0.18 0.27 -0.37 0.52 -0.57 0.77 L 88 129.45 c 7.49 15.22 23.41 31 38.83 38.51 l 24.34 -20.71 a 8.12 8.12 0 0 1 0.75 -0.56 a 16 16 0 0 1 15.17 -1.4 l 0.13 0.06 l 47.11 21.11 A 16 16 0 0 1 223.88 183.08 Z M 208 181.07999999999998 s -0.07 0 -0.11 0 h 0 l -47 -21.05 l -24.35 20.71 a 8.44 8.44 0 0 1 -0.74 0.56 a 16 16 0 0 1 -15.75 1.14 c -18.73 -9.05 -37.4 -27.58 -46.46 -46.11 a 16 16 0 0 1 1 -15.7 a 6.13 6.13 0 0 1 0.57 -0.77 L 96 95.15 l -21 -47 a 0.61 0.61 0 0 1 0 -0.12 A 40.2 40.2 0 0 0 40 88 A 128.14 128.14 0 0 0 168 216 A 40.21 40.21 0 0 0 208 181.07 Z"
            fill="currentColor"
          />
        </g>
      </motion.svg>
    </div>
  );
});
PhosphorPhoneCallIcon.displayName = 'PhosphorPhoneCallIcon';
export { PhosphorPhoneCallIcon };

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
