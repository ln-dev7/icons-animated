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

export interface HugeiconsConnectIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsConnectIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PLUG_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: -3,
    y: 3,
  },
};
const SOCKET_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 3,
    y: -3,
  },
};
const PATH_VARIANTS = {
  normal: (custom: { x: number; y: number }) => ({
    d:
      custom.x === 7.5
        ? 'M 16.064 11.9651 L 14.5024 13.4896'
        : 'M 10.5114 9.50609 L 12.055 7.95281',
  }),
  animate: (custom: { x: number; y: number }) => ({
    d:
      custom.x === 7.5
        ? 'M13.064 14.9651L12.9933 15.0358'
        : 'M8.9843 11.02351L9.055 10.95281',
  }),
};
const HugeiconsConnectIcon = forwardRef<
  HugeiconsConnectIconHandle,
  HugeiconsConnectIconProps
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
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          d="M 19.4867 4.51472 L 21.9999 2.0011"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={{
            normal: {
              d: 'M 19.4867 4.51472 L 21.9999 2.0011',
            },
            animate: {
              d: 'M17.4867 6.51472L21.9999 2.0011',
            },
          }}
        />
        <motion.path
          d="M 4.51255 19.4866 L 2.00012 21.999"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={{
            normal: {
              d: 'M 4.51255 19.4866 L 2.00012 21.999',
            },
            animate: {
              d: 'M7.51255 16.4866L2.00012 21.999',
            },
          }}
        />
        <motion.path
          d="M 4.51255 19.4866 C 7.02498 21.8794 10.016 20.9223 11.2124 19.9532 C 11.8314 19.4518 12.1097 19.1277 12.3489 18.8884 C 13.1864 18.1107 13.1326 17.3331 12.5882 16.711 C 12.3704 16.462 10.9731 15.1198 9.63313 13.7439 C 8.93922 13.0499 8.46066 12.5595 8.05149 12.1647 C 7.50354 11.6185 7.02499 10.9922 6.30715 11.0101 C 5.64913 11.0101 5.17057 11.5904 4.57237 12.1886 C 3.88422 12.8767 3.37598 13.7439 3.19652 14.5216 C 2.65814 16.7947 3.49562 18.4098 4.51255 19.4866 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={SOCKET_VARIANTS}
        />
        <motion.path
          d="M 16.064 11.9651 L 14.5024 13.4896"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          custom={{ x: 7.5, y: 13.5 }}
          initial="normal"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M 10.5114 9.50609 L 12.055 7.95281"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          custom={{ x: 10.5, y: 16.5 }}
          initial="normal"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M 19.4867 4.51472 C 16.9736 2.12078 13.9929 3.09593 12.7962 4.06548 C 12.177 4.56712 11.8987 4.89138 11.6593 5.13078 C 10.8216 5.90881 10.8755 6.68683 11.42 7.30926 C 11.4983 7.39881 11.7292 7.62975 12.055 7.95281 M 19.4867 4.51472 C 20.504 5.59199 21.3528 7.22547 20.8142 9.49971 C 20.6347 10.2777 20.1264 11.1453 19.438 11.8338 C 18.8397 12.4323 18.361 13.0128 17.7028 13.0128 C 16.9847 13.0308 16.6121 12.5115 16.064 11.9651 M 16.064 11.9651 C 15.6547 11.5701 15.07 10.9721 14.3759 10.2777 C 13.5175 9.39612 12.6355 8.52831 12.055 7.95281"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          variants={PLUG_VARIANTS}
        />
      </svg>
    </div>
  );
});
HugeiconsConnectIcon.displayName = 'HugeiconsConnectIcon';
export { HugeiconsConnectIcon };

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
