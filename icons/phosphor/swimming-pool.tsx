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

export interface PhosphorSwimmingPoolIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSwimmingPoolIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PhosphorSwimmingPoolIcon = forwardRef<
  PhosphorSwimmingPoolIconHandle,
  PhosphorSwimmingPoolIconProps
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
            d="M 24 168 a 8 8 0 0 1 8 -8 c 14.42 0 22.19 5.18 28.44 9.34 C 66 173.06 70.42 176 80 176 s 14 -2.94 19.56 -6.66 c 6.24 -4.16 14 -9.34 28.43 -9.34 s 22.2 5.18 28.44 9.34 c 5.58 3.72 10 6.66 19.57 6.66 s 14 -2.94 19.56 -6.66 c 6.25 -4.16 14 -9.34 28.44 -9.34 a 8 8 0 0 1 0 16 c -9.58 0 -14 2.94 -19.56 6.66 c -6.25 4.16 -14 9.34 -28.44 9.34 s -22.2 -5.18 -28.44 -9.34 C 142 178.94 137.57 176 128 176 s -14 2.94 -19.56 6.66 c -6.24 4.16 -14 9.34 -28.43 9.34 s -22.19 -5.18 -28.44 -9.34 C 46 178.94 41.58 176 32 176 A 8 8 0 0 1 24 168 Z"
            fill="currentColor"
          />
          <path
            d="M 232 208 a 8 8 0 0 1 -8 8 c -9.58 0 -14 2.94 -19.56 6.66 c -6.25 4.16 -14 9.34 -28.44 9.34 s -22.2 -5.18 -28.44 -9.34 C 142 218.94 137.57 216 128 216 s -14 2.94 -19.56 6.66 c -6.24 4.16 -14 9.34 -28.43 9.34 s -22.19 -5.18 -28.44 -9.34 C 46 218.94 41.58 216 32 216 a 8 8 0 0 1 0 -16 c 14.42 0 22.19 5.18 28.44 9.34 C 66 213.06 70.42 216 80 216 s 14 -2.94 19.56 -6.66 c 6.24 -4.16 14 -9.34 28.43 -9.34 s 22.2 5.18 28.44 9.34 c 5.58 3.72 10 6.66 19.57 6.66 s 14 -2.94 19.56 -6.66 c 6.25 -4.16 14 -9.34 28.44 -9.34 A 8 8 0 0 1 232 208 Z"
            fill="currentColor"
          />
        </g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial={{ y: 0, opacity: 1 }}
          variants={{
            normal: { y: 0, opacity: 1 },
            animate: {
              y: [13, 0],
              opacity: [0, 0, 1],
              transition: { duration: 1, times: [0, 0.5, 1], repeat: 0 },
            },
          }}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 88 149.39 a 8 8 0 0 0 8 -8 V 128 h 64 v 15.29 a 8 8 0 0 0 16 0 V 32 a 8 8 0 0 0 -16 0 V 48 H 96 V 32 a 8 8 0 0 0 -16 0 V 141.39 A 8 8 0 0 0 88 149.39 Z M 96 112 V 96 h 64 v 16 Z M 160 64 V 80 H 96 V 64 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorSwimmingPoolIcon.displayName = 'PhosphorSwimmingPoolIcon';
export { PhosphorSwimmingPoolIcon };

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
