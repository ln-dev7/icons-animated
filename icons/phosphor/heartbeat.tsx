'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
import type {
  TargetAndTransition as NativeMotionTarget,
  Variants as NativeMotionVariants,
  Variants,
} from 'motion/react';
import type { ForwardedRef, HTMLAttributes } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

function nativePartTarget(
  target: Record<string, unknown>,
  draw: boolean | 'geometry'
): NativeMotionTarget {
  const drawKeys = new Set([
    'pathLength',
    'pathOffset',
    'pathSpacing',
    'strokeDasharray',
    'strokeDashoffset',
  ]);
  return Object.fromEntries(
    Object.entries(target).filter(
      ([key]) =>
        key === 'transition' ||
        (draw === 'geometry'
          ? key === 'd'
          : key !== 'd' && (draw ? drawKeys.has(key) : !drawKeys.has(key)))
    )
  ) as NativeMotionTarget;
}
function nativePartVariants(
  variants: Record<string, unknown>,
  draw: boolean | 'geometry'
): NativeMotionVariants {
  return Object.fromEntries(
    Object.entries(variants).map(([name, target]) => [
      name,
      typeof target === 'function'
        ? (...args: unknown[]) => nativePartTarget(target(...args), draw)
        : nativePartTarget(target as Record<string, unknown>, draw),
    ])
  ) as NativeMotionVariants;
}
export interface PhosphorHeartbeatIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorHeartbeatIconProps extends HTMLAttributes<HTMLDivElement> {
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
const PhosphorHeartbeatIcon = forwardRef<
  PhosphorHeartbeatIconHandle,
  PhosphorHeartbeatIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
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
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <motion.g
          animate={reduceDefinition(heartPulseControls)}
          style={{ originX: '12px', originY: '12px' }}
          variants={HEART_PULSE_VARIANTS}
        >
          <motion.g
            animate={reduceDefinition(heartDrawControls)}
            variants={nativePartVariants(HEART_DRAW_VARIANTS, false)}
          >
            <defs>
              <mask
                id={nativeMaskId + '-0'}
                maskUnits="userSpaceOnUse"
                x="-24"
                y="-24"
                width="72"
                height="72"
              >
                <motion.path
                  d="M1.5101299336890581 9.565224071406387a5.797970983291397 5.770652820574498 90 0 1 10.062969309478182-3.8751529699234863 0.5903388637533059 0.5875573780948581 90 0 0 0.8582534558599889 0A5.78742921786723 5.76016072453709 90 0 1 22.494322008505414 9.565224071406387c0 2.4140642821340546-1.5738144056112269 4.2167061696664705-3.1476288112224537 5.797970983291397l-5.762259143744571 5.600839969859489a2.1083530848332357 2.0984192074816357 90 0 1-3.1476288112224537 0.020029354305915733L4.657758744911511 15.363195054697783c-1.5738144056112269-1.5812648136249265-3.1476288112224537-3.3733649357331768-3.1476288112224537-5.797970983291397"
                  fill="none"
                  stroke="white"
                  strokeWidth={6.682976169440011}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={reduceDefinition(heartDrawControls)}
                  variants={nativePartVariants(HEART_DRAW_VARIANTS, true)}
                />
              </mask>
            </defs>
            <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
              <g transform="scale(0.09375)">
                <path
                  d="M 178 40 c -20.65 0 -38.73 8.88 -50 23.89 C 116.73 48.88 98.65 40 78 40 a 62.07 62.07 0 0 0 -62 62 c 0 0.75 0 1.5 0 2.25 a 8 8 0 1 0 16 -0.5 c 0 -0.58 0 -1.17 0 -1.75 A 46.06 46.06 0 0 1 78 56 c 19.45 0 35.78 10.36 42.6 27 a 8 8 0 0 0 14.8 0 c 6.82 -16.67 23.15 -27 42.6 -27 a 46.06 46.06 0 0 1 46 46 c 0 53.61 -77.76 102.15 -96 112.8 c -10.83 -6.31 -42.63 -26 -66.68 -52.21 a 8 8 0 1 0 -11.8 10.82 c 31.17 34 72.93 56.68 74.69 57.63 a 8 8 0 0 0 7.58 0 C 136.21 228.66 240 172 240 102 A 62.07 62.07 0 0 0 178 40 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </motion.g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(lineControls)}
          variants={nativePartVariants(LINE_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-1'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M2.258372774919634 12.746289528218737H7.0830812115052915l0.3841328373077753-0.8693909627748243 1.5365313492311012 3.9122593324867094 1.5365313492311012-6.08573673942377 1.152398511923326 3.042868369711885h4.048760105223951"
                fill="none"
                stroke="white"
                strokeWidth={7.344636058343238}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(lineControls)}
                variants={nativePartVariants(LINE_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-1' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 72 144 H 32 a 8 8 0 0 1 0 -16 H 67.72 l 13.62 -20.44 a 8 8 0 0 1 13.32 0 l 25.34 38 l 9.34 -14 A 8 8 0 0 1 136 128 h 24 a 8 8 0 0 1 0 16 H 140.28 l -13.62 20.44 a 8 8 0 0 1 -13.32 0 L 88 126.42 l -9.34 14 A 8 8 0 0 1 72 144 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorHeartbeatIcon.displayName = 'PhosphorHeartbeatIcon';
export { PhosphorHeartbeatIcon };

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
