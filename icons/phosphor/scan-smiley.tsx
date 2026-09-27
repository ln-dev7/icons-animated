/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: scan-face @ 072c38b1b04ea738d90a084485ccaad4b890ddca
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

export interface PhosphorScanSmileyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorScanSmileyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PhosphorScanSmileyIcon = forwardRef<
  PhosphorScanSmileyIconHandle,
  PhosphorScanSmileyIconProps
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
      startAnimation: async () => {
        await controls.start('hidden');
        await controls.start('visible');
      },
      stopAnimation: () => controls.start('visible'),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        await controls.start('hidden');
        await controls.start('visible');
      }
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        controls.start('visible');
      }
    },
    [controls]
  );
  const faceVariants: Variants = {
    visible: { scale: 1 },
    hidden: {
      scale: 0.9,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };
  const cornerVariants: Variants = {
    visible: { scale: 1, rotate: 0, opacity: 1 },
    hidden: {
      scale: 1.2,
      rotate: 45,
      opacity: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };
  const mouthVariants: Variants = {
    visible: { scale: 1, opacity: 1 },
    hidden: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3, delay: 0.1 },
    },
  };
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
        animate={reduceDefinition(controls)}
        variants={faceVariants}
      >
        <motion.g
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 40 84 a 8 8 0 0 0 8 -8 V 48 H 76 a 8 8 0 0 0 0 -16 H 40 a 8 8 0 0 0 -8 8 V 76 A 8 8 0 0 0 40 84 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 224 40 V 76 a 8 8 0 0 1 -16 0 V 48 H 180 a 8 8 0 0 1 0 -16 h 36 A 8 8 0 0 1 224 40 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 216 172 a 8 8 0 0 0 -8 8 v 28 H 180 a 8 8 0 0 0 0 16 h 36 a 8 8 0 0 0 8 -8 V 180 A 8 8 0 0 0 216 172 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 76 208 H 48 V 180 a 8 8 0 0 0 -16 0 v 36 a 8 8 0 0 0 8 8 H 76 a 8 8 0 0 0 0 -16 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={mouthVariants}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 146.71 146 c -3.81 3.37 -12 6 -18.71 6 s -14.9 -2.63 -18.71 -6 a 8 8 0 1 0 -10.58 12 c 7.83 6.91 20.35 10 29.29 10 s 21.46 -3.09 29.29 -10 a 8 8 0 1 0 -10.58 -12 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <g transform="scale(0.09375)">
          <path
            d="M 116 116 a 12 12 0 1 0 -12 12 A 12 12 0 0 0 116 116 Z"
            fill="currentColor"
          />
        </g>
        <g transform="scale(0.09375)">
          <path
            d="M 152 104 a 12 12 0 1 0 12 12 A 12 12 0 0 0 152 104 Z"
            fill="currentColor"
          />
        </g>
        <g transform="scale(0.09375)">
          <path
            d="M 128 200 a 72 72 0 1 1 72 -72 A 72.08 72.08 0 0 1 128 200 Z M 184 128 a 56 56 0 1 0 -56 56 A 56.06 56.06 0 0 0 184 128 Z"
            fill="currentColor"
          />
        </g>
      </motion.svg>
    </div>
  );
});
PhosphorScanSmileyIcon.displayName = 'PhosphorScanSmileyIcon';
export { PhosphorScanSmileyIcon };

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
