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

export interface HeroiconsFaceSmileIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HeroiconsFaceSmileIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HeroiconsFaceSmileIcon = forwardRef<
  HeroiconsFaceSmileIconHandle,
  HeroiconsFaceSmileIconProps
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
      if (!isControlledRef.current) controls.start('animate');
      void e;
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) controls.start('normal');
      void e;
    },
    [controls]
  );
  const faceVariants: Variants = {
    normal: {
      scale: 1,
      rotate: 0,
      strokeWidth: 1.5,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 1.15, 1.05, 1.1],
      rotate: [0, -3, 3, 0],
      strokeWidth: [2, 2.5, 2.5, 2.5],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut',
      },
    },
  };
  const mouthVariants: Variants = {
    normal: {
      d: 'M15.182 15.182A4.5 4.5 0 0 1 8.818 15.182',
      pathLength: 1,
      pathOffset: 0,
      strokeWidth: 1.5,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      d: 'M15.977 14.546A7.796 5.568 90 0 1 8.023 14.546',
      pathLength: [0.3, 1, 1],
      pathOffset: [0, 0, 0],
      strokeWidth: 1.875,
      transition: {
        d: { duration: 0.4, ease: 'easeOut' },
        pathLength: {
          duration: 0.5,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        },
        delay: 0.1,
      },
    },
  };
  const eyeVariants: Variants = {
    normal: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    animate: {
      scale: [1, 1.5, 0.8, 1.2],
      opacity: [1, 1, 1, 1],
      transition: {
        duration: 0.5,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut',
      },
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
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        animate={reduceDefinition(controls)}
        initial="normal"
        variants={faceVariants}
      >
        <motion.path d="M21 12A9 9 0 1 1 3 12 9 9 0 0 1 21 12Z" />
        <motion.path
          d="M15.182 15.182A4.5 4.5 0 0 1 8.818 15.182"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={mouthVariants}
        />
        <motion.path
          d="M9.75 9.75C9.75 10.164 9.582 10.5 9.375 10.5S9 10.164 9 9.75 9.168 9 9.375 9 9.75 9.336 9.75 9.75ZM9.375 9.75H9.383V9.765H9.375V9.75Z"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={eyeVariants}
        />
        <motion.path
          d="M15 9.75C15 10.164 14.832 10.5 14.625 10.5S14.25 10.164 14.25 9.75 14.418 9 14.625 9 15 9.336 15 9.75ZM14.625 9.75H14.633V9.765H14.625V9.75Z"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={eyeVariants}
        />
      </motion.svg>
    </div>
  );
});
HeroiconsFaceSmileIcon.displayName = 'HeroiconsFaceSmileIcon';
export { HeroiconsFaceSmileIcon };

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
