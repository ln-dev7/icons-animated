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

export interface PhosphorTruckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorTruckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const TRUCK_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'loop',
    },
  },
};
const WHEEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.5,
      ease: 'linear',
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};
const SPEED_LINE_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    x: 0,
    scaleX: 0,
  },
  animate: (custom: number) => ({
    opacity: [0, 0.7, 0.5, 0],
    x: [0, -4, -10, -16],
    scaleX: [0.2, 1, 0.8, 0.3],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: Number.POSITIVE_INFINITY,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1],
    },
  }),
};
const PhosphorTruckIcon = forwardRef<
  PhosphorTruckIconHandle,
  PhosphorTruckIconProps
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
      className={className}
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
        className="overflow-visible"
      >
        {[
          { y: 8, width: 5, x: 0 },
          { y: 11, width: 7, x: -1 },
          { y: 14, width: 4, x: 0 },
        ].map((line, i) => (
          <motion.line
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            animate={reduceDefinition(controls)}
            custom={i}
            initial="normal"
            key={`speed-${i}`}
            strokeLinecap="round"
            strokeWidth="2"
            variants={SPEED_LINE_VARIANTS}
            x1={line.x}
            x2={line.x + line.width}
            y1={line.y}
            y2={line.y}
          />
        ))}

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={TRUCK_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-0'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M-24-24H48V48H-24Z M4.495 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z M14.995000000000001 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
                <path
                  d="M 255.42 117 l -14 -35 A 15.93 15.93 0 0 0 226.58 72 H 192 V 64 a 8 8 0 0 0 -8 -8 H 32 A 16 16 0 0 0 16 72 V 184 a 16 16 0 0 0 16 16 H 49 a 32 32 0 0 0 62 0 h 50 a 32 32 0 0 0 62 0 h 17 a 16 16 0 0 0 16 -16 V 120 A 7.94 7.94 0 0 0 255.42 117 Z M 192 88 h 34.58 l 9.6 24 H 192 Z M 32 72 H 176 v 64 H 32 Z M 80 208 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 80 208 Z M 161 184 H 111 a 32 32 0 0 0 -62 0 H 32 V 152 H 176 v 12.31 A 32.11 32.11 0 0 0 161 184 Z M 192 208 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 192 208 Z M 240 184 H 223 a 32.06 32.06 0 0 0 -31 -24 V 128 h 48 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={TRUCK_VARIANTS}
        >
          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            style={{ transformOrigin: '7.5px 18px' }}
            variants={WHEEL_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-1'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path
                      d="M4.495 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z"
                      transform="scale(10.666666666666666)"
                      clipRule="evenodd"
                      shapeRendering="crispEdges"
                    />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                  <path
                    d="M 255.42 117 l -14 -35 A 15.93 15.93 0 0 0 226.58 72 H 192 V 64 a 8 8 0 0 0 -8 -8 H 32 A 16 16 0 0 0 16 72 V 184 a 16 16 0 0 0 16 16 H 49 a 32 32 0 0 0 62 0 h 50 a 32 32 0 0 0 62 0 h 17 a 16 16 0 0 0 16 -16 V 120 A 7.94 7.94 0 0 0 255.42 117 Z M 192 88 h 34.58 l 9.6 24 H 192 Z M 32 72 H 176 v 64 H 32 Z M 80 208 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 80 208 Z M 161 184 H 111 a 32 32 0 0 0 -62 0 H 32 V 152 H 176 v 12.31 A 32.11 32.11 0 0 0 161 184 Z M 192 208 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 192 208 Z M 240 184 H 223 a 32.06 32.06 0 0 0 -31 -24 V 128 h 48 Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </g>
          </motion.g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={TRUCK_VARIANTS}
        >
          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            style={{ transformOrigin: '18px 18px' }}
            variants={WHEEL_VARIANTS}
          >
            <g transform="scale(0.09375)">
              <g>
                <defs>
                  <clipPath
                    id={nativeMaskId + '-clip-2'}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path
                      d="M14.995000000000001 18a3.005 3.005 0 1 0 6.01 0a3.005 3.005 0 1 0 -6.01 0Z"
                      transform="scale(10.666666666666666)"
                      clipRule="evenodd"
                      shapeRendering="crispEdges"
                    />
                  </clipPath>
                </defs>
                <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                  <path
                    d="M 255.42 117 l -14 -35 A 15.93 15.93 0 0 0 226.58 72 H 192 V 64 a 8 8 0 0 0 -8 -8 H 32 A 16 16 0 0 0 16 72 V 184 a 16 16 0 0 0 16 16 H 49 a 32 32 0 0 0 62 0 h 50 a 32 32 0 0 0 62 0 h 17 a 16 16 0 0 0 16 -16 V 120 A 7.94 7.94 0 0 0 255.42 117 Z M 192 88 h 34.58 l 9.6 24 H 192 Z M 32 72 H 176 v 64 H 32 Z M 80 208 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 80 208 Z M 161 184 H 111 a 32 32 0 0 0 -62 0 H 32 V 152 H 176 v 12.31 A 32.11 32.11 0 0 0 161 184 Z M 192 208 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 192 208 Z M 240 184 H 223 a 32.06 32.06 0 0 0 -31 -24 V 128 h 48 Z"
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
PhosphorTruckIcon.displayName = 'PhosphorTruckIcon';
export { PhosphorTruckIcon };

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
