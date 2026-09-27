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

export interface PhosphorDiscordLogoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorDiscordLogoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const VARIANTS: Variants = {
  normal: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    translateX: [0, -2, 2, -2, 2, 0],
    opacity: 1,
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ease: 'easeInOut',
    },
  },
};
const PhosphorDiscordLogoIcon = forwardRef<
  PhosphorDiscordLogoIconHandle,
  PhosphorDiscordLogoIconProps
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
        viewBox="0 0 44 44"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        style={{ overflow: 'visible' }}
      >
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={VARIANTS}
        >
          <g transform="scale(0.171875)">
            <path
              d="M 238.45 192.9 l -67 29.71 a 16.17 16.17 0 0 1 -21.71 -9.1 l -8.11 -22 q -6.72 0.45 -13.63 0.46 t -13.63 -0.46 l -8.11 22 a 16.18 16.18 0 0 1 -21.71 9.1 l -67 -29.71 a 15.93 15.93 0 0 1 -9.06 -18.51 L 38 58 A 16.07 16.07 0 0 1 51 46.14 l 36.06 -5.93 a 16.22 16.22 0 0 1 18.26 11.88 l 3.26 12.84 Q 118.11 64 128 64 t 19.4 0.93 l 3.26 -12.84 a 16.21 16.21 0 0 1 18.26 -11.88 L 205 46.14 A 16.07 16.07 0 0 1 218 58 l 29.53 116.38 A 15.93 15.93 0 0 1 238.45 192.9 Z M 232 178.28 L 202.47 62 s 0 0 -0.08 0 L 166.33 56 a 0.17 0.17 0 0 0 -0.17 0 l -2.83 11.14 c 5 0.94 10 2.06 14.83 3.42 A 8 8 0 0 1 176 86.31 a 8.09 8.09 0 0 1 -2.16 -0.3 A 172.25 172.25 0 0 0 128 80 a 172.25 172.25 0 0 0 -45.84 6 a 8 8 0 1 1 -4.32 -15.4 c 4.82 -1.36 9.78 -2.48 14.82 -3.42 L 89.83 56 s 0 0 -0.12 0 h 0 L 53.61 61.93 a 0.17 0.17 0 0 0 -0.09 0 L 24 178.33 L 91 208 a 0.23 0.23 0 0 0 0.22 0 L 98 189.72 a 173.2 173.2 0 0 1 -20.14 -4.32 A 8 8 0 0 1 82.16 170 A 171.85 171.85 0 0 0 128 176 a 171.85 171.85 0 0 0 45.84 -6 a 8 8 0 0 1 4.32 15.41 A 173.2 173.2 0 0 1 158 189.72 L 164.75 208 a 0.22 0.22 0 0 0 0.21 0 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={VARIANTS}
        >
          <g transform="scale(0.171875)">
            <path
              d="M 104 140 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 104 140 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={VARIANTS}
        />
        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={VARIANTS}
        />
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={VARIANTS}
        >
          <g transform="scale(0.171875)">
            <path
              d="M 164 128 a 12 12 0 1 0 12 12 A 12 12 0 0 0 164 128 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorDiscordLogoIcon.displayName = 'PhosphorDiscordLogoIcon';
export { PhosphorDiscordLogoIcon };

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
