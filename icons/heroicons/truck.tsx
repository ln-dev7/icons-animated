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

export interface HeroiconsTruckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HeroiconsTruckIconProps extends HTMLAttributes<HTMLDivElement> {
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
const HeroiconsTruckIcon = forwardRef<
  HeroiconsTruckIconHandle,
  HeroiconsTruckIconProps
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
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
            animate={reduceDefinition(controls)}
            custom={i}
            initial="normal"
            key={`speed-${i}`}
            strokeLinecap="round"
            strokeWidth="1.5"
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
          <path d="M8.25 18.75H14.25" />
          <path d="M5.25 18.75H3.375A1.125 1.125 0 0 1 2.25 17.625V14.25" />
          <path d="M19.5 18.75H20.625C21.246 18.75 21.754 18.246 21.715 17.626A17.902 17.902 0 0 0 18.502 8.433 2.056 2.056 0 0 0 16.922 7.573H14.25" />
          <path d="M16.5 18.75H14.25" />
          <path d="M14.25 7.573V6.615C14.25 6.047 13.828 5.567 13.263 5.509A48.554 48.554 0 0 0 3.237 5.509 1.106 1.106 0 0 0 2.25 6.615V14.25" />
          <path d="M14.25 7.573V14.25" />
          <path d="M14.25 18.75V14.25" />
          <path d="M14.25 14.25H2.25" />
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={TRUCK_VARIANTS}
        >
          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            style={{ transformOrigin: '6.75px 18.75px' }}
            variants={WHEEL_VARIANTS}
          >
            <path d="M8.25 18.75A1.5 1.5 0 0 1 5.25 18.75M8.25 18.75A1.5 1.5 0 0 0 5.25 18.75" />
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
            style={{ transformOrigin: '18px 18.75px' }}
            variants={WHEEL_VARIANTS}
          >
            <path d="M19.5 18.75A1.5 1.5 0 0 1 16.5 18.75M19.5 18.75A1.5 1.5 0 0 0 16.5 18.75" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
});
HeroiconsTruckIcon.displayName = 'HeroiconsTruckIcon';
export { HeroiconsTruckIcon };

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
