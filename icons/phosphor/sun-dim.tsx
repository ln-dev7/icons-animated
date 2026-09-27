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

export interface PhosphorSunDimIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSunDimIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};
const PhosphorSunDimIcon = forwardRef<
  PhosphorSunDimIconHandle,
  PhosphorSunDimIconProps
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
            d="M 192 128 a 64 64 0 1 1 -64 -64 A 64.07 64.07 0 0 1 192 128 Z M 176 128 a 48 48 0 1 0 -48 48 A 48.05 48.05 0 0 0 176 128 Z"
            fill="currentColor"
          />
        </g>
        {[
          'M12 4h.01',
          'M20 12h.01',
          'M12 20h.01',
          'M4 12h.01',
          'M17.657 6.343h.01',
          'M17.657 17.657h.01',
          'M6.343 17.657h.01',
          'M6.343 6.343h.01',
        ].map((d, index) => (
          <motion.g
            animate={reduceDefinition(controls)}
            custom={index + 1}
            key={d}
            variants={PATH_VARIANTS}
          >
            {index === 0 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 120 40 V 32 a 8 8 0 0 1 16 0 v 8 a 8 8 0 0 1 -16 0 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 1 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 224 120 h -8 a 8 8 0 0 0 0 16 h 8 a 8 8 0 0 0 0 -16 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 2 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 128 208 a 8 8 0 0 0 -8 8 v 8 a 8 8 0 0 0 16 0 v -8 A 8 8 0 0 0 128 208 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 3 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 40 120 H 32 a 8 8 0 0 0 0 16 h 8 a 8 8 0 0 0 0 -16 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 4 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 192 72 a 8 8 0 0 0 5.66 -2.34 l 8 -8 a 8 8 0 0 0 -11.32 -11.32 l -8 8 A 8 8 0 0 0 192 72 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 5 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 197.66 186.34 a 8 8 0 0 0 -11.32 11.32 l 8 8 a 8 8 0 0 0 11.32 -11.32 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 6 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 58.34 186.34 l -8 8 a 8 8 0 0 0 11.32 11.32 l 8 -8 a 8 8 0 0 0 -11.32 -11.32 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 7 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 58.34 69.66 A 8 8 0 0 0 69.66 58.34 l -8 -8 A 8 8 0 0 0 50.34 61.66 Z"
                  fill="currentColor"
                />
              </g>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
});
PhosphorSunDimIcon.displayName = 'PhosphorSunDimIcon';
export { PhosphorSunDimIcon };

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
