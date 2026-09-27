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
export interface PhosphorFingerprintIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorFingerprintIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    opacity: [0, 0, 1, 1, 1],
    pathLength: [0.1, 0.3, 0.5, 0.7, 0.9, 1],
    transition: {
      opacity: { duration: 0.5 },
      pathLength: {
        duration: 2,
      },
    },
  },
};
const PhosphorFingerprintIcon = forwardRef<
  PhosphorFingerprintIconHandle,
  PhosphorFingerprintIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
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
          variants={nativePartVariants(PATH_VARIANTS, false)}
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
                d="M15.749897408316297 8.25a6.635701487629444 4.482286998383242 0 0 0-6.635701487629444 4.482286998383242c0 2.2859663691754535-0.3317850743814722 5.625270182970969-0.8626411933918277 8.964573996766484"
                fill="none"
                stroke="white"
                strokeWidth={15.0405981881343}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-1' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 128 88 a 40 40 0 0 0 -40 40 a 8 8 0 0 0 16 0 a 24 24 0 0 1 48 0 a 214.09 214.09 0 0 1 -20.51 92 A 8 8 0 1 0 146 226.83 A 230 230 0 0 0 168 128 A 40 40 0 0 0 128 88 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(PATH_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-3'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M12.749667037582157 11.250000000000002c0 2.738428754137567 0 7.3408300215956634-3.7493644925953493 10.217330813756973"
                fill="none"
                stroke="white"
                strokeWidth={5.073097701246057}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-3' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 128 120 a 8 8 0 0 0 -8 8 a 184.12 184.12 0 0 1 -23 89.1 a 8 8 0 0 0 14 7.76 A 200.19 200.19 0 0 0 136 128 A 8 8 0 0 0 128 120 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(PATH_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-5'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M16.008823009939732 20.39515812362807c0.4760986406017494-0.6249297101399577 1.7060201288229353-2.395563888869838 1.9837443358406226-3.1454795410377874"
                fill="none"
                stroke="white"
                strokeWidth={4.141051748622969}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-5' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 185.93 184.25 a 8 8 0 0 0 -9.75 5.75 c -1.46 5.69 -3.15 11.4 -5 17 a 8 8 0 0 0 5 10.13 a 7.88 7.88 0 0 0 2.55 0.42 a 8 8 0 0 0 7.58 -5.46 c 2 -5.92 3.79 -12 5.35 -18.05 A 8 8 0 0 0 185.94 184.26 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(PATH_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-7'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M1.7515244236794634 17.985611294799092a15.734910310135861 11.109517002510271 90 0 1 19.99713060451849-9.440946186081517"
                fill="none"
                stroke="white"
                strokeWidth={21.09001927244557}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-7' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 128 24 A 104.11 104.11 0 0 0 24 128 a 87.76 87.76 0 0 1 -5 29.33 a 8 8 0 0 0 15.09 5.33 A 103.9 103.9 0 0 0 40 128 a 88 88 0 0 1 176 0 a 282.24 282.24 0 0 1 -5.29 54.45 a 8 8 0 0 0 6.3 9.4 a 8.22 8.22 0 0 0 1.55 0.15 a 8 8 0 0 0 7.84 -6.45 A 298.37 298.37 0 0 0 232 128 A 104.12 104.12 0 0 0 128 24 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
        />

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
        />

        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(PATH_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-13'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M3.993489734453032 20.23640778348506C6.029464872967903 18.078667007489216 8.065440011482771 13.763185455497531 8.065440011482771 9.44770390350585a24.431701662178448 8.630963103983369 0 0 1 1.3844630941901122-2.8769877013277894"
                fill="none"
                stroke="white"
                strokeWidth={7.38640722388348}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-13' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 72 128 a 134.63 134.63 0 0 1 -14.16 60.47 a 8 8 0 1 1 -14.32 -7.12 A 118.8 118.8 0 0 0 56 128 A 71.73 71.73 0 0 1 83 71.8 A 8 8 0 1 1 93 84.29 A 55.76 55.76 0 0 0 72 128 Z"
                fill="currentColor"
              />
              <path
                d="M 94.4 152.17 A 8 8 0 0 0 85 158.42 a 151 151 0 0 1 -17.21 45.44 a 8 8 0 0 0 13.86 8 a 166.67 166.67 0 0 0 19 -50.25 A 8 8 0 0 0 94.4 152.17 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>

        <motion.g
          display="none"
          animate={reduceDefinition(controls)}
          variants={PATH_VARIANTS}
        />

        <motion.g
          animate={reduceDefinition(controls)}
          variants={nativePartVariants(PATH_VARIANTS, false)}
        >
          <defs>
            <mask
              id={nativeMaskId + '-17'}
              maskUnits="userSpaceOnUse"
              x="-24"
              y="-24"
              width="72"
              height="72"
            >
              <motion.path
                d="M10.518066763750335 6.30480180783124a7.874823121753828 5.48295987797165 90 0 1 8.224439816957476 6.824846705519984v2.624941040584609"
                fill="none"
                stroke="white"
                strokeWidth={5.538797993627291}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(controls)}
                variants={nativePartVariants(PATH_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-17' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 128 56 a 72.85 72.85 0 0 0 -9 0.56 a 8 8 0 0 0 2 15.87 A 56.08 56.08 0 0 1 184 128 a 252.12 252.12 0 0 1 -1.92 31 A 8 8 0 0 0 189 168 a 8.39 8.39 0 0 0 1 0.06 a 8 8 0 0 0 7.92 -7 a 266.48 266.48 0 0 0 2 -33 A 72.08 72.08 0 0 0 128 56 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorFingerprintIcon.displayName = 'PhosphorFingerprintIcon';
export { PhosphorFingerprintIcon };

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
