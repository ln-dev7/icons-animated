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
import { AnimatePresence, motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HugeiconsCalendarDaysIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsCalendarDaysIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  animate: (i: number) => ({
    opacity: [1, 0.3, 1],
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      times: [0, 0.5, 1],
    },
  }),
};
const HugeiconsCalendarDaysIcon = forwardRef<
  HugeiconsCalendarDaysIconHandle,
  HugeiconsCalendarDaysIconProps
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
        <path
          d="M16 2V6M8 2V6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />

        <path
          d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M3 10H21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        {iconAccessibility.reduced ? (
          <>
            <motion.path
              d="M7.25 13.875V14M7.5 14C7.5 14.1381 7.38807 14.25 7.25 14.25C7.11193 14.25 7 14.1381 7 14C7 13.8619 7.11193 13.75 7.25 13.75C7.38807 13.75 7.5 13.8619 7.5 14Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-0"
              custom={0}
            />
            <motion.path
              d="M12 13.875V14M12.25 14C12.25 14.1381 12.1381 14.25 12 14.25C11.8619 14.25 11.75 14.1381 11.75 14C11.75 13.8619 11.8619 13.75 12 13.75C12.1381 13.75 12.25 13.8619 12.25 14Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-1"
              custom={1}
            />
            <motion.path
              d="M16.75 13.875V14M17 14C17 14.1381 16.8881 14.25 16.75 14.25C16.6119 14.25 16.5 14.1381 16.5 14C16.5 13.8619 16.6119 13.75 16.75 13.75C16.8881 13.75 17 13.8619 17 14Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-2"
              custom={2}
            />
            <motion.path
              d="M7.25 17.875V18M7.5 18C7.5 18.1381 7.38807 18.25 7.25 18.25C7.11193 18.25 7 18.1381 7 18C7 17.8619 7.11193 17.75 7.25 17.75C7.38807 17.75 7.5 17.8619 7.5 18Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-3"
              custom={3}
            />
            <motion.path
              d="M12 17.875V18M12.25 18C12.25 18.1381 12.1381 18.25 12 18.25C11.8619 18.25 11.75 18.1381 11.75 18C11.75 17.8619 11.8619 17.75 12 17.75C12.1381 17.75 12.25 17.8619 12.25 18Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-4"
              custom={4}
            />
          </>
        ) : (
          <AnimatePresence>
            <motion.path
              d="M7.25 13.875V14M7.5 14C7.5 14.1381 7.38807 14.25 7.25 14.25C7.11193 14.25 7 14.1381 7 14C7 13.8619 7.11193 13.75 7.25 13.75C7.38807 13.75 7.5 13.8619 7.5 14Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-0"
              custom={0}
            />
            <motion.path
              d="M12 13.875V14M12.25 14C12.25 14.1381 12.1381 14.25 12 14.25C11.8619 14.25 11.75 14.1381 11.75 14C11.75 13.8619 11.8619 13.75 12 13.75C12.1381 13.75 12.25 13.8619 12.25 14Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-1"
              custom={1}
            />
            <motion.path
              d="M16.75 13.875V14M17 14C17 14.1381 16.8881 14.25 16.75 14.25C16.6119 14.25 16.5 14.1381 16.5 14C16.5 13.8619 16.6119 13.75 16.75 13.75C16.8881 13.75 17 13.8619 17 14Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-2"
              custom={2}
            />
            <motion.path
              d="M7.25 17.875V18M7.5 18C7.5 18.1381 7.38807 18.25 7.25 18.25C7.11193 18.25 7 18.1381 7 18C7 17.8619 7.11193 17.75 7.25 17.75C7.38807 17.75 7.5 17.8619 7.5 18Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-3"
              custom={3}
            />
            <motion.path
              d="M12 17.875V18M12.25 18C12.25 18.1381 12.1381 18.25 12 18.25C11.8619 18.25 11.75 18.1381 11.75 18C11.75 17.8619 11.8619 17.75 12 17.75C12.1381 17.75 12.25 17.8619 12.25 18Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              animate={reduceDefinition(controls)}
              initial="normal"
              variants={VARIANTS}
              key="native-4-4"
              custom={4}
            />
          </AnimatePresence>
        )}
      </svg>
    </div>
  );
});
HugeiconsCalendarDaysIcon.displayName = 'HugeiconsCalendarDaysIcon';
export { HugeiconsCalendarDaysIcon };

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
