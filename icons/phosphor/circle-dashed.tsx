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

export interface PhosphorCircleDashedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorCircleDashedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};
const PhosphorCircleDashedIcon = forwardRef<
  PhosphorCircleDashedIconHandle,
  PhosphorCircleDashedIconProps
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
        {[
          'M10.1 2.182a10 10 0 0 1 3.8 0',
          'M13.9 21.818a10 10 0 0 1-3.8 0',
          'M17.609 3.721a10 10 0 0 1 2.69 2.7',
          'M2.182 13.9a10 10 0 0 1 0-3.8',
          'M20.279 17.609a10 10 0 0 1-2.7 2.69',
          'M21.818 10.1a10 10 0 0 1 0 3.8',
          'M3.721 6.391a10 10 0 0 1 2.7-2.69',
          'M6.391 20.279a10 10 0 0 1-2.69-2.7',
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
                  d="M 96.26 37.05 A 8 8 0 0 1 102 27.29 a 104.11 104.11 0 0 1 52 0 a 8 8 0 0 1 -2 15.75 a 8.15 8.15 0 0 1 -2 -0.26 a 88.09 88.09 0 0 0 -44 0 A 8 8 0 0 1 96.26 37.05 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 1 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 150 213.22 a 88 88 0 0 1 -44 0 a 8 8 0 1 0 -4 15.49 a 104.11 104.11 0 0 0 52 0 a 8 8 0 0 0 -4 -15.49 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 2 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 212.79000000000002 104.46000000000001 a 8 8 0 0 0 15.42 -4.28 a 104 104 0 0 0 -26 -45 a 8 8 0 1 0 -11.41 11.22 A 88 88 0 0 1 212.79 104.45 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 3 && <g transform="scale(0.09375)"></g>}
            {index === 4 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 222.65 146 a 8 8 0 0 0 -9.85 5.58 a 87.91 87.91 0 0 1 -22 38.08 a 8 8 0 1 0 11.42 11.21 a 104 104 0 0 0 26 -45 A 8 8 0 0 0 222.65 146 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 5 && <g transform="scale(0.09375)"></g>}
            {index === 6 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 53.79 55.14 a 104.05 104.05 0 0 0 -26 45 a 8 8 0 0 0 15.42 4.27 a 88 88 0 0 1 22 -38.09 A 8 8 0 0 0 53.79 55.14 Z"
                  fill="currentColor"
                />
              </g>
            )}
            {index === 7 && (
              <g transform="scale(0.09375)">
                <path
                  d="M 43.21 151.55 a 8 8 0 1 0 -15.42 4.28 a 104.12 104.12 0 0 0 26 45 a 8 8 0 0 0 11.41 -11.22 A 88.14 88.14 0 0 1 43.21 151.55 Z"
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
PhosphorCircleDashedIcon.displayName = 'PhosphorCircleDashedIcon';
export { PhosphorCircleDashedIcon };

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
