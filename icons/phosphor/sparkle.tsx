/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: sparkles @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorSparkleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSparkleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const SPARKLE_VARIANTS: Variants = {
  initial: {
    y: 0,
    fill: 'none',
  },
  hover: {
    y: [0, -1, 0, 0],
    fill: 'currentColor',
    transition: {
      duration: 1,
      bounce: 0.3,
    },
  },
};
const STAR_VARIANTS: Variants = {
  initial: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  blink: () => ({
    opacity: [0, 1, 0, 0, 0, 0, 1],
    transition: {
      duration: 2,
      type: 'spring',
      stiffness: 70,
      damping: 10,
      mass: 0.4,
    },
  }),
};
const PhosphorSparkleIcon = forwardRef<
  PhosphorSparkleIconHandle,
  PhosphorSparkleIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const starControls = useAnimation();
  const sparkleControls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => {
        sparkleControls.start('hover');
        starControls.start('blink', { delay: 1 });
      },
      stopAnimation: () => {
        sparkleControls.start('initial');
        starControls.start('initial');
      },
    };
  }, [starControls, sparkleControls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        sparkleControls.start('hover');
        starControls.start('blink', { delay: 1 });
      }
    },
    [sparkleControls, starControls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        sparkleControls.start('initial');
        starControls.start('initial');
      }
    },
    [sparkleControls, starControls]
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
          animate={reduceDefinition(sparkleControls)}
          variants={SPARKLE_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 197.58 129.06 L 146 110 l -19 -51.62 a 15.92 15.92 0 0 0 -29.88 0 L 78 110 l -51.62 19 a 15.92 15.92 0 0 0 0 29.88 L 78 178 l 19 51.62 a 15.92 15.92 0 0 0 29.88 0 L 146 178 l 51.62 -19 a 15.92 15.92 0 0 0 0 -29.88 Z M 137 164.22 a 8 8 0 0 0 -4.74 4.74 L 112 223.85 L 91.78 169 A 8 8 0 0 0 87 164.22 L 32.15 144 L 87 123.78 A 8 8 0 0 0 91.78 119 L 112 64.15 L 132.22 119 a 8 8 0 0 0 4.74 4.74 L 191.85 144 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(starControls)}
          variants={STAR_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 144 40 a 8 8 0 0 1 8 -8 h 16 V 16 a 8 8 0 0 1 16 0 V 32 h 16 a 8 8 0 0 1 0 16 H 184 V 64 a 8 8 0 0 1 -16 0 V 48 H 152 A 8 8 0 0 1 144 40 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(starControls)}
          variants={STAR_VARIANTS}
        />
        <motion.g
          animate={reduceDefinition(starControls)}
          variants={STAR_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 248 88 a 8 8 0 0 1 -8 8 h -8 v 8 a 8 8 0 0 1 -16 0 V 96 h -8 a 8 8 0 0 1 0 -16 h 8 V 72 a 8 8 0 0 1 16 0 v 8 h 8 A 8 8 0 0 1 248 88 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(starControls)}
          variants={STAR_VARIANTS}
        />
      </svg>
    </div>
  );
});
PhosphorSparkleIcon.displayName = 'PhosphorSparkleIcon';
export { PhosphorSparkleIcon };

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
