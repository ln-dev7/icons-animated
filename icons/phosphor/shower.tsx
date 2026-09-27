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

export interface PhosphorShowerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorShowerIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const DROP_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const DROP_CHILD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.2, 1],
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
};
const DROP_PATH = [
  { id: 'drop1', d: 'M14 17v.01' },
  { id: 'drop2', d: 'M10 16v.01' },
  { id: 'drop3', d: 'M13 13v.01' },
  { id: 'drop4', d: 'M16 10v.01' },
  { id: 'drop5', d: 'M11 20v.01' },
  { id: 'drop6', d: 'M17 14v.01' },
  { id: 'drop7', d: 'M20 11v.01' },
];
const PhosphorShowerIcon = forwardRef<
  PhosphorShowerIconHandle,
  PhosphorShowerIconProps
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
      >
        <g transform="scale(0.09375)">
          <path
            d="M 256 40 a 8 8 0 0 1 -8 8 H 219.31 L 191.46 75.86 L 169.8 202.65 a 16 16 0 0 1 -27.09 8.66 l -98 -98 a 16 16 0 0 1 8.69 -27.1 L 180.14 64.54 l 30.2 -30.2 A 8 8 0 0 1 216 32 h 32 A 8 8 0 0 1 256 40 Z M 174.21 81.79 L 56 102 l 98 98 Z"
            fill="currentColor"
          />
        </g>

        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={DROP_VARIANTS}
        >
          {DROP_PATH.map((path) => (
            <motion.g key={path.id} variants={DROP_CHILD_VARIANTS}>
              {path.id === 'drop1' && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 84 192 a 12 12 0 1 0 12 12 A 12 12 0 0 0 84 192 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {path.id === 'drop2' && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 20 192 a 12 12 0 1 0 12 12 A 12 12 0 0 0 20 192 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {path.id === 'drop3' && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 52 160 a 12 12 0 1 0 12 12 A 12 12 0 0 0 52 160 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {path.id === 'drop4' && <g transform="scale(0.09375)"></g>}
              {path.id === 'drop5' && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 64 236 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 64 236 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {path.id === 'drop6' && <g transform="scale(0.09375)"></g>}
              {path.id === 'drop7' && <g transform="scale(0.09375)"></g>}
            </motion.g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorShowerIcon.displayName = 'PhosphorShowerIcon';
export { PhosphorShowerIcon };

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
