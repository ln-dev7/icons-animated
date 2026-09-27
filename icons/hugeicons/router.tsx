/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: https://github.com/pqoqubbw/icons/tree/072c38b1b04ea738d90a084485ccaad4b890ddca
 *
 * Copyright (c) 2025 Hugeicons
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

export interface HugeiconsRouterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsRouterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
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
const HugeiconsRouterIcon = forwardRef<
  HugeiconsRouterIconHandle,
  HugeiconsRouterIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        await runPathIntro();
      },
      stopAnimation: () => {
        pathControls.start('normal');
      },
    };
  }, [pathControls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        await runPathIntro();
      }
    },
    [runPathIntro]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        pathControls.start('normal');
      }
    },
    [pathControls]
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
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M17.5 22H6.5C4.62513 22 3.6877 22 3.03054 21.4695C2.8183 21.2982 2.63166 21.0908 2.47746 20.855C2 20.1248 2 19.0832 2 17C2 14.9168 2 13.8752 2.47746 13.145C2.63166 12.9092 2.8183 12.7018 3.03054 12.5305C3.6877 12 4.62513 12 6.5 12H17.5C19.3749 12 20.3123 12 20.9695 12.5305C21.1817 12.7018 21.3683 12.9092 21.5225 13.145C22 13.8752 22 14.9168 22 17C22 19.0832 22 20.1248 21.5225 20.855C21.3683 21.0908 21.1817 21.2982 20.9695 21.4695C20.3123 22 19.3749 22 17.5 22Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M 14.125 17 H 14 M 14.25 17 C 14.25 17.1381 14.1381 17.25 14 17.25 C 13.8619 17.25 13.75 17.1381 13.75 17 C 13.75 16.8619 13.8619 16.75 14 16.75 C 14.1381 16.75 14.25 16.8619 14.25 17 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M 18.125 17 H 18 M 18.25 17 C 18.25 17.1381 18.1381 17.25 18 17.25 C 17.8619 17.25 17.75 17.1381 17.75 17 C 17.75 16.8619 17.8619 16.75 18 16.75 C 18.1381 16.75 18.25 16.8619 18.25 17 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M6 17H10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M 12.5496 9.75039 C 12.9638 9.75039 13.2996 9.41461 13.2996 9.00039 C 13.2996 8.58618 12.9638 8.25039 12.5496 8.25039 V 9.00039 V 9.75039 Z M 12.4996 8.25039 C 12.0854 8.25039 11.7496 8.58618 11.7496 9.00039 C 11.7496 9.41461 12.0854 9.75039 12.4996 9.75039 V 9.00039 V 8.25039 Z M 12.5996 9.00039 H 11.8496 C 11.8496 8.64141 12.1406 8.35039 12.4996 8.35039 V 9.10039 V 9.85039 C 12.969 9.85039 13.3496 9.46984 13.3496 9.00039 H 12.5996 Z M 12.4996 9.10039 V 8.35039 C 12.8586 8.35039 13.1496 8.64141 13.1496 9.00039 H 12.3996 H 11.6496 C 11.6496 9.46984 12.0302 9.85039 12.4996 9.85039 V 9.10039 Z M 12.3996 9.00039 H 13.1496 C 13.1496 9.35938 12.8586 9.65039 12.4996 9.65039 V 8.90039 V 8.15039 C 12.0302 8.15039 11.6496 8.53095 11.6496 9.00039 H 12.3996 Z M 12.4996 8.90039 V 9.65039 C 12.1406 9.65039 11.8496 9.35938 11.8496 9.00039 H 12.5996 H 13.3496 C 13.3496 8.53095 12.969 8.15039 12.4996 8.15039 V 8.90039 Z M 12.5496 9.00039 V 8.25039 H 12.4996 V 9.00039 V 9.75039 H 12.5496 V 9.00039 Z"
          fill="currentColor"
        />
        <motion.path
          d="M 9.70761 5.7897 C 9.42153 6.08925 9.43245 6.564 9.73201 6.85008 C 10.0316 7.13616 10.5063 7.12524 10.7924 6.82569 L 10.25 6.30769 L 9.70761 5.7897 Z M 14.2076 6.82569 C 14.4937 7.12524 14.9684 7.13616 15.268 6.85008 C 15.5675 6.564 15.5785 6.08925 15.2924 5.7897 L 14.75 6.30769 L 14.2076 6.82569 Z M 12.5 5.33182 V 4.58182 C 11.4028 4.58182 10.4153 5.04873 9.70761 5.7897 L 10.25 6.30769 L 10.7924 6.82569 C 11.2364 6.36077 11.8398 6.08182 12.5 6.08182 V 5.33182 Z M 14.75 6.30769 L 15.2924 5.7897 C 14.5847 5.04873 13.5972 4.58182 12.5 4.58182 V 5.33182 V 6.08182 C 13.1602 6.08182 13.7636 6.36077 14.2076 6.82569 L 14.75 6.30769 Z"
          fill="currentColor"
          animate={reduceDefinition(pathControls)}
          custom={1}
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M 16.4576 4.46973 C 16.7437 4.76928 17.2184 4.7802 17.518 4.49412 C 17.8175 4.20804 17.8285 3.7333 17.5424 3.43374 L 17 3.95174 L 16.4576 4.46973 Z M 7.45761 3.43374 C 7.17153 3.7333 7.18245 4.20804 7.48201 4.49412 C 7.78156 4.7802 8.25631 4.76928 8.54239 4.46973 L 8 3.95174 L 7.45761 3.43374 Z M 17 3.95174 L 17.5424 3.43374 C 16.2589 2.08984 14.4759 1.25 12.5 1.25 V 2 V 2.75 C 14.0388 2.75 15.4378 3.40187 16.4576 4.46973 L 17 3.95174 Z M 12.5 2 V 1.25 C 10.5241 1.25 8.74108 2.08984 7.45761 3.43374 L 8 3.95174 L 8.54239 4.46973 C 9.56222 3.40187 10.9612 2.75 12.5 2.75 V 2 Z"
          fill="currentColor"
          animate={reduceDefinition(pathControls)}
          custom={2}
          initial={{ opacity: 1 }}
          variants={PATH_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});
HugeiconsRouterIcon.displayName = 'HugeiconsRouterIcon';
export { HugeiconsRouterIcon };

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
