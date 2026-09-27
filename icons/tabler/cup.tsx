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

export interface TablerCupIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface TablerCupIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const STRAW_VARIANTS: Variants = {
  normal: {
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  animate: {
    y: [0, -0.85, 0.15, 0],
    scaleY: [1, 1.06, 0.99, 1],
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      times: [0, 0.35, 0.65, 1],
    },
  },
};
const WAVE_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  animate: {
    y: [0, -1, 0],
    transition: {
      duration: 1.8,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
};
const BUBBLE_VARIANTS: Variants = {
  normal: { opacity: 0, y: 0, scale: 1 },
  animate: (delay: number) => ({
    opacity: [0, 0.9, 0.4, 0],
    y: [0, -3, -10, -14],
    scale: [1, 1, 0.85, 0.6],
    transition: {
      duration: 1.5,
      ease: 'easeIn',
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 0,
      times: [0, 0.08, 0.7, 1],
    },
  }),
};
const BUBBLES = [
  { delay: 0, cx: 8.25, cy: 20.5, r: 0.75 },
  { delay: 0.35, cx: 11.25, cy: 19.5, r: 0.6 },
  { delay: 0.7, cx: 14, cy: 20.75, r: 0.6 },
  { delay: 1.05, cx: 9.75, cy: 19, r: 0.75 },
  { delay: 0.55, cx: 12.5, cy: 20, r: 0.45 },
] as const;
const TablerCupIcon = forwardRef<TablerCupIconHandle, TablerCupIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        className={cn('relative', className)}
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
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.5 11l-1.5 10h-8l-1.5 -10" />
          <path d="M5 11h14v-3h-14l0 3" />
          <path d="M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
          <motion.path
            d=""
            display="none"
            animate={reduceDefinition(controls)}
            variants={WAVE_VARIANTS}
          />
          <motion.path
            d="M15 5v-2"
            animate={reduceDefinition(controls)}
            style={{
              transformBox: 'fill-box',
              originX: '50%',
              originY: '100%',
            }}
            variants={STRAW_VARIANTS}
          />
          {BUBBLES.map((b, i) => (
            <motion.circle
              animate={reduceDefinition(controls)}
              custom={b.delay}
              cx={b.cx}
              cy={b.cy}
              fill="currentColor"
              initial="normal"
              key={i}
              r={b.r}
              stroke="none"
              style={{
                transformBox: 'fill-box',
                originX: '50%',
                originY: '50%',
              }}
              variants={BUBBLE_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);
TablerCupIcon.displayName = 'TablerCupIcon';
export { TablerCupIcon };

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
