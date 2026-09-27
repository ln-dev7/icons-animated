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

export interface HugeiconsHeartPulseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsHeartPulseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HEART_DRAW_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
  draw: { pathLength: [0, 1], opacity: [0, 1] },
};
const HEART_PULSE_VARIANTS: Variants = {
  normal: { scale: 1 },
  pulse: { scale: [1, 1.08, 1] },
};
const LINE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: { pathLength: [0, 1], pathOffset: [1, 0], opacity: [0, 1] },
};
const HugeiconsHeartPulseIcon = forwardRef<
  HugeiconsHeartPulseIconHandle,
  HugeiconsHeartPulseIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const heartDrawControls = useAnimation();
  const heartPulseControls = useAnimation();
  const lineControls = useAnimation();
  const isControlledRef = useRef(false);
  const startAnimation = useCallback(async () => {
    heartDrawControls.start('hidden', { duration: 0 });
    await lineControls.start('animate', {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    });
    await heartDrawControls.start('draw', {
      duration: 0.5,
      ease: 'easeOut',
      opacity: { duration: 0.1 },
    });
    heartPulseControls.start('pulse', {
      duration: 0.9,
      repeat: 1,
      ease: 'easeInOut',
    });
  }, [heartDrawControls, heartPulseControls, lineControls]);
  const stopAnimation = useCallback(() => {
    heartDrawControls.start('normal', { duration: 0.3 });
    heartPulseControls.start('normal', { duration: 0.3 });
    lineControls.start('normal', { duration: 0.3 });
  }, [heartDrawControls, heartPulseControls, lineControls]);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return { startAnimation, stopAnimation };
  }, [heartDrawControls, heartPulseControls, lineControls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        startAnimation();
      }
    },
    [startAnimation]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        stopAnimation();
      }
    },
    [stopAnimation]
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
        <motion.g
          animate={reduceDefinition(heartPulseControls)}
          style={{ originX: '12px', originY: '12px' }}
          variants={HEART_PULSE_VARIANTS}
        >
          <motion.path
            d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            animate={reduceDefinition(heartDrawControls)}
            variants={HEART_DRAW_VARIANTS}
          />
        </motion.g>
        <motion.path
          d="M4.00098 13.0001L7.84158 13.0001C8.16139 13.0001 8.32129 13.0001 8.44652 12.9212C8.57176 12.8423 8.63475 12.7019 8.76073 12.4211L8.92748 12.0493C9.377 11.0472 9.60176 10.5462 9.95039 10.5639C10.299 10.5817 10.4668 11.1027 10.8024 12.1447L11.267 13.5872C11.578 14.5529 11.7335 15.0357 12.0706 15.0624C12.4078 15.089 12.6442 14.6372 13.1172 13.7335L13.737 12.5491C14.0098 12.0278 14.1462 11.7672 14.3422 11.7045C14.4453 11.6716 14.5567 11.6716 14.6597 11.7045C14.8557 11.7672 14.9921 12.0278 15.2649 12.5491C15.3598 12.7303 15.4072 12.8209 15.4821 12.8831C15.5229 12.9169 15.5691 12.9442 15.619 12.9639C15.7107 13.0001 15.8168 13.0001 16.0288 13.0001L20.001 13.0001"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(lineControls)}
          variants={LINE_VARIANTS}
        />
      </svg>
    </div>
  );
});
HugeiconsHeartPulseIcon.displayName = 'HugeiconsHeartPulseIcon';
export { HugeiconsHeartPulseIcon };

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
