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

export interface PhosphorBinaryIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorBinaryIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const FLIP_DURATION = 0.12;
const FLIP_STAGGER = 0.06;
const FLIP_OUT_VARIANTS: Variants = {
  normal: (custom: number) => ({
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: FLIP_DURATION,
      delay: custom * FLIP_STAGGER + FLIP_DURATION,
    },
  }),
  animate: (custom: number) => ({
    rotateX: -90,
    opacity: 0,
    transition: {
      duration: FLIP_DURATION,
      delay: custom * FLIP_STAGGER,
    },
  }),
};
const FLIP_IN_VARIANTS: Variants = {
  normal: (custom: number) => ({
    rotateX: 90,
    opacity: 0,
    transition: {
      duration: FLIP_DURATION,
      delay: custom * FLIP_STAGGER,
    },
  }),
  animate: (custom: number) => ({
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: FLIP_DURATION,
      delay: custom * FLIP_STAGGER + FLIP_DURATION,
    },
  }),
};
const PhosphorBinaryIcon = forwardRef<
  PhosphorBinaryIconHandle,
  PhosphorBinaryIconProps
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
        <motion.g
          animate={reduceDefinition(controls)}
          custom={0}
          initial="normal"
          variants={FLIP_OUT_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 94 24 C 71.63 24 56 43.74 56 72 s 15.63 48 38 48 s 38 -19.74 38 -48 S 116.37 24 94 24 Z M 94 104 c -17.37 0 -22 -20.11 -22 -32 s 4.63 -32 22 -32 s 22 20.11 22 32 S 111.37 104 94 104 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          custom={0}
          initial="normal"
          variants={FLIP_IN_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 145 49.22 a 8 8 0 0 1 3.11 -10.88 l 24 -13.33 A 8 8 0 0 1 184 32 v 80 a 8 8 0 0 1 -16 0 V 45.6 l -12.12 6.73 A 8 8 0 0 1 145 49.22 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          custom={1}
          initial="normal"
          variants={FLIP_OUT_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 145 49.22 a 8 8 0 0 1 3.11 -10.88 l 24 -13.33 A 8 8 0 0 1 184 32 v 80 a 8 8 0 0 1 -16 0 V 45.6 l -12.12 6.73 A 8 8 0 0 1 145 49.22 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          custom={1}
          initial="normal"
          variants={FLIP_IN_VARIANTS}
        >
          <g transform="translate(6.56366986766678 0.00028999926514039487)">
            <g transform="scale(0.09375)">
              <path
                d="M 94 24 C 71.63 24 56 43.74 56 72 s 15.63 48 38 48 s 38 -19.74 38 -48 S 116.37 24 94 24 Z M 94 104 c -17.37 0 -22 -20.11 -22 -32 s 4.63 -32 22 -32 s 22 20.11 22 32 S 111.37 104 94 104 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          custom={2}
          initial="normal"
          variants={FLIP_OUT_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 104 144 v 80 a 8 8 0 0 1 -16 0 V 157.6 l -12.12 6.73 a 8 8 0 0 1 -7.76 -14 l 24 -13.33 A 8 8 0 0 1 104 144 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          custom={2}
          initial="normal"
          variants={FLIP_IN_VARIANTS}
        >
          <g transform="translate(-7.687710726079764 -0.00031221713679840946)">
            <g transform="scale(0.09375)">
              <path
                d="M 166 136 c -22.37 0 -38 19.74 -38 48 s 15.63 48 38 48 s 38 -19.74 38 -48 S 188.37 136 166 136 Z M 166 216 c -17.37 0 -22 -20.11 -22 -32 s 4.63 -32 22 -32 s 22 20.11 22 32 S 183.37 216 166 216 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          custom={3}
          initial="normal"
          variants={FLIP_OUT_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 166 136 c -22.37 0 -38 19.74 -38 48 s 15.63 48 38 48 s 38 -19.74 38 -48 S 188.37 136 166 136 Z M 166 216 c -17.37 0 -22 -20.11 -22 -32 s 4.63 -32 22 -32 s 22 20.11 22 32 S 183.37 216 166 216 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          custom={3}
          initial="normal"
          variants={FLIP_IN_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <path
              d="M 104 144 v 80 a 8 8 0 0 1 -16 0 V 157.6 l -12.12 6.73 a 8 8 0 0 1 -7.76 -14 l 24 -13.33 A 8 8 0 0 1 104 144 Z"
              fill="currentColor"
            />
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorBinaryIcon.displayName = 'PhosphorBinaryIcon';
export { PhosphorBinaryIcon };

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
