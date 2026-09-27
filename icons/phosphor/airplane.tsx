'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
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

export interface PhosphorAirplaneIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorAirplaneIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const SPEED_LINES = [
  { x1: 5, y1: 15, x2: 1, y2: 19, delay: 0.1 },
  { x1: 7, y1: 17, x2: 3, y2: 21, delay: 0.2 },
  { x1: 9, y1: 19, x2: 5, y2: 23, delay: 0.3 },
];
const PhosphorAirplaneIcon = forwardRef<
  PhosphorAirplaneIconHandle,
  PhosphorAirplaneIconProps
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
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className="overflow-visible"
      >
        <motion.g
          animate={reduceDefinition(controls)}
          transition={{
            duration: 0.5,
          }}
          variants={{
            normal: { x: 0, y: 0, scale: 1 },
            animate: {
              x: 3,
              y: -3,
              scale: 0.8,
            },
          }}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 235.58 128.84 L 160 91.06 V 48 a 32 32 0 0 0 -64 0 V 91.06 L 20.42 128.84 A 8 8 0 0 0 16 136 v 32 a 8 8 0 0 0 9.57 7.84 L 96 161.76 v 18.93 L 82.34 194.34 A 8 8 0 0 0 80 200 v 32 a 8 8 0 0 0 11 7.43 l 37 -14.81 l 37 14.81 A 8 8 0 0 0 176 232 V 200 a 8 8 0 0 0 -2.34 -5.66 L 160 180.69 V 161.76 l 70.43 14.08 A 8 8 0 0 0 240 168 V 136 A 8 8 0 0 0 235.58 128.84 Z M 224 158.24 l -70.43 -14.08 A 8 8 0 0 0 144 152 v 32 a 8 8 0 0 0 2.34 5.66 L 160 203.31 v 16.87 l -29 -11.61 a 8 8 0 0 0 -5.94 0 L 96 220.18 V 203.31 l 13.66 -13.65 A 8 8 0 0 0 112 184 V 152 a 8 8 0 0 0 -9.57 -7.84 L 32 158.24 v -17.3 l 75.58 -37.78 A 8 8 0 0 0 112 96 V 48 a 16 16 0 0 1 32 0 V 96 a 8 8 0 0 0 4.42 7.16 L 224 140.94 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        {SPEED_LINES.map((line, index) => (
          <motion.line
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reduceDefinition(controls)}
            initial={{ opacity: 0, pathLength: 1, pathSpacing: 1 }}
            key={index}
            stroke="currentColor"
            strokeWidth="1"
            transition={{ duration: 0.15, delay: line.delay }}
            variants={{
              normal: {
                pathOffset: [0, 1],
                translateX: -3,
                translateY: 3,
                opacity: 0,
                transition: {
                  duration: 0.3,
                  times: [0, 0.6, 1],
                },
              },
              animate: {
                pathOffset: [1, 2],
                translateX: [0, 0],
                translateY: [0, 0],
                opacity: 1,
              },
            }}
            x1={line.x1}
            x2={line.x2}
            y1={line.y1}
            y2={line.y2}
          />
        ))}
      </svg>
    </div>
  );
});
PhosphorAirplaneIcon.displayName = 'PhosphorAirplaneIcon';
export { PhosphorAirplaneIcon };

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
