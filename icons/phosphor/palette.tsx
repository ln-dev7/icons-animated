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
export interface PhosphorPaletteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorPaletteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const DASH_LENGTH = 63.12957667928099;
const DRAW_DURATION = 0.45;
const DOT_STAGGER = 0.08;
const DOTS = [
  { cx: 6.5, cy: 12.5 },
  { cx: 8.5, cy: 7.5 },
  { cx: 13.5, cy: 6.5 },
  { cx: 17.5, cy: 10.5 },
];
const OUTLINE_VARIANTS: Variants = {
  normal: {
    strokeDashoffset: 0,
  },
  animate: {
    strokeDashoffset: [DASH_LENGTH, 0],
    transition: {
      duration: DRAW_DURATION,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};
const DOTS_GROUP_VARIANTS: Variants = {
  normal: {},
  animate: {
    transition: {
      delayChildren: DRAW_DURATION,
      staggerChildren: DOT_STAGGER,
    },
  },
};
const DOT_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: { duration: 0.2 },
  },
  animate: {
    scale: [0, 1],
    transition: {
      damping: 10,
      stiffness: 300,
      type: 'spring',
    },
  },
};
const PhosphorPaletteIcon = forwardRef<
  PhosphorPaletteIconHandle,
  PhosphorPaletteIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
  const controls = useAnimation();
  const isControlledRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const startAnimation = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    try {
      await controls.start('animate');
    } finally {
      isAnimatingRef.current = false;
    }
  }, [controls]);
  const stopAnimation = useCallback(async () => {
    isAnimatingRef.current = false;
    await controls.start('normal');
  }, [controls]);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return { startAnimation, stopAnimation };
  }, [controls]);
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
      className={cn('inline-flex items-center justify-center', className)}
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
          initial="normal"
          variants={nativePartVariants(OUTLINE_VARIANTS, false)}
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
                d="M12.001897817086315 2.2509865025410685a0.9747042673729084 0.936873032895892 0 0 0 0 18.73746065791784l0.2436760668432271 0a1.7057324679025896 1.639527807567811 0 0 0 1.3645859743220716-2.623244492108497l-0.2924112802118725-0.3747492131583568a1.7057324679025896 1.639527807567811 0 0 1 1.3645859743220716-2.623244492108497h2.1930846015890437a4.873521336864542 4.68436516447946 0 0 0 4.873521336864542-4.68436516447946 9.747042673729084 8.431857296063027 0 0 0-9.747042673729084-8.431857296063027z"
                fill="none"
                stroke="white"
                strokeWidth={6.113234929765287}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={DASH_LENGTH}
                animate={reduceDefinition(controls)}
                initial="normal"
                variants={nativePartVariants(OUTLINE_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 200.77 53.89 A 103.27 103.27 0 0 0 128 24 h -1.07 A 104 104 0 0 0 24 128 c 0 43 26.58 79.06 69.36 94.17 A 32 32 0 0 0 136 192 a 16 16 0 0 1 16 -16 h 46.21 a 31.81 31.81 0 0 0 31.2 -24.88 a 104.43 104.43 0 0 0 2.59 -24 A 103.28 103.28 0 0 0 200.77 53.89 Z M 213.77 147.6 A 15.89 15.89 0 0 1 198.21 160 H 152 a 32 32 0 0 0 -32 32 a 16 16 0 0 1 -21.31 15.07 C 62.49 194.3 40 164 40 128 a 88 88 0 0 1 87.09 -88 h 0.9 a 88.35 88.35 0 0 1 88 87.25 A 88.86 88.86 0 0 1 213.81 147.6 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={DOTS_GROUP_VARIANTS}
        >
          {DOTS.map((dot) => (
            <motion.g
              key={`${dot.cx}-${dot.cy}`}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              variants={DOT_VARIANTS}
            >
              {dot.cx === 6.5 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 96 156 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 96 156 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {dot.cx === 8.5 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 96 100 A 12 12 0 1 1 84 88 A 12 12 0 0 1 96 100 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {dot.cx === 13.5 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 140 76 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 140 76 Z"
                    fill="currentColor"
                  />
                </g>
              )}
              {dot.cx === 17.5 && (
                <g transform="scale(0.09375)">
                  <path
                    d="M 184 100 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 184 100 Z"
                    fill="currentColor"
                  />
                </g>
              )}
            </motion.g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
});
PhosphorPaletteIcon.displayName = 'PhosphorPaletteIcon';
export { PhosphorPaletteIcon };

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
