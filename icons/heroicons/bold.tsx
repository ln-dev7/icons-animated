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

export interface HeroiconsBoldIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HeroiconsBoldIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: {
    strokeWidth: 1.5,
  },
  animate: {
    strokeWidth: 2.625,
  },
};
const HeroiconsBoldIcon = forwardRef<
  HeroiconsBoldIconHandle,
  HeroiconsBoldIconProps
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
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          d="M6.75 3.744H5.997V11.994H13.122A4.125 4.125 0 0 0 13.122 3.744H6.75Z"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 3.744V4.124"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 20.246H13.497A4.5 4.5 0 0 0 13.497 11.245H5.997V20.245H6.75Z"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 20.246V19.876"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 4.125H12.75A3.75 3.75 0 1 1 12.75 11.625H6.75"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 4.125V11.625"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 11.625V19.875"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M6.75 11.625H13.125A4.125 4.125 0 0 1 13.125 19.875H6.75"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M7.497 4.495H12.372A3.375 3.375 0 0 1 12.372 11.245H7.497V4.495Z"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
        <motion.path
          d="M7.497 11.995H12.747A3.75 3.75 0 0 1 12.747 19.495H7.497V11.995Z"
          animate={reduceDefinition(controls)}
          transition={{ duration: 0.6 }}
          variants={PATH_VARIANTS}
        />
      </svg>
    </div>
  );
});
HeroiconsBoldIcon.displayName = 'HeroiconsBoldIcon';
export { HeroiconsBoldIcon };

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
