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
export interface PhosphorGithubLogoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorGithubLogoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const BODY_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.9, 1],
    transition: {
      duration: 0.4,
    },
  },
};
const TAIL_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
    },
  },
  draw: {
    pathLength: [0, 1],
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
  wag: {
    pathLength: 1,
    rotate: [0, -15, 15, -10, 10, -5, 5],
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};
const PhosphorGithubLogoIcon = forwardRef<
  PhosphorGithubLogoIconHandle,
  PhosphorGithubLogoIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
  const bodyControls = useAnimation();
  const tailControls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: async () => {
        bodyControls.start('animate');
        await tailControls.start('draw');
        tailControls.start('wag');
      },
      stopAnimation: () => {
        bodyControls.start('normal');
        tailControls.start('normal');
      },
    };
  }, [bodyControls, tailControls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        bodyControls.start('animate');
        await tailControls.start('draw');
        tailControls.start('wag');
      }
    },
    [bodyControls, tailControls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        bodyControls.start('normal');
        tailControls.start('normal');
      }
    },
    [bodyControls, tailControls]
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
          animate={reduceDefinition(bodyControls)}
          initial="normal"
          variants={nativePartVariants(BODY_VARIANTS, false)}
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
                d="M13.943022882231205 22.446790597191473v-4.049909705219005a6.043425985409292 4.859891646262806 0 0 0-1.2590470802936025-3.54367099206663c3.777141240880807 0 7.554282481761614-2.0249548526095027 7.554282481761614-5.5686258446761325 0.1007237664234882-1.2655967828809391-0.3399427116792727-2.5109440172357833-1.2590470802936025-3.54367099206663 0.3525331824822087-1.164349040250464 0.3525331824822087-2.379321951816166 0-3.54367099206663 0 0-1.2590470802936025 0-3.777141240880807 1.5187161394571271-3.323884291975111-0.5062387131523757-6.748492350373709-0.5062387131523757-10.07237664234882 0C2.6115991595887813 2.1972420710964458 1.3525520792951795 2.1972420710964458 1.3525520792951795 2.1972420710964458c-0.37771412408808075 1.164349040250464-0.37771412408808075 2.379321951816166 0 3.54367099206663A6.802631374826333 5.470415534324572 0 0 0 0.09350499900157683 9.284584055229706c0 3.54367099206663 3.777141240880807 5.5686258446761325 7.554282481761614 5.5686258446761325-0.491028361314505 0.49611393888932814-0.8561520145996497 1.063101297619989-1.070190018249562 1.6705877534028397-0.21403800364991243 0.6074864557828508-0.27699035766459257 1.2453472343548442-0.18885706204404037 1.8730832386637901v4.049909705219005"
                fill="none"
                stroke="white"
                strokeWidth={12.737181993982388}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={reduceDefinition(bodyControls)}
                initial="normal"
                variants={nativePartVariants(BODY_VARIANTS, true)}
              />
            </mask>
          </defs>
          <g mask={'url(#' + nativeMaskId + '-0' + ')'}>
            <g transform="scale(0.09375)">
              <path
                d="M 208.31 75.68 A 59.78 59.78 0 0 0 202.93 28 A 8 8 0 0 0 196 24 a 59.75 59.75 0 0 0 -48 24 H 124 A 59.75 59.75 0 0 0 76 24 a 8 8 0 0 0 -6.93 4 a 59.78 59.78 0 0 0 -5.38 47.68 A 58.14 58.14 0 0 0 56 104 v 8 a 56.06 56.06 0 0 0 48.44 55.47 A 39.8 39.8 0 0 0 96 192 v 8 H 72 a 24 24 0 0 1 -24 -24 A 40 40 0 0 0 8 136 a 8 8 0 0 0 0 16 a 24 24 0 0 1 24 24 a 40 40 0 0 0 40 40 H 96 v 16 a 8 8 0 0 0 16 0 V 192 a 24 24 0 0 1 48 0 v 40 a 8 8 0 0 0 16 0 V 192 a 39.8 39.8 0 0 0 -8.44 -24.53 A 56.06 56.06 0 0 0 216 112 v -8 A 58.14 58.14 0 0 0 208.31 75.68 Z M 200 112 a 40 40 0 0 1 -40 40 H 112 a 40 40 0 0 1 -40 -40 v -8 a 41.74 41.74 0 0 1 6.9 -22.48 A 8 8 0 0 0 80 73.83 a 43.81 43.81 0 0 1 0.79 -33.58 a 43.88 43.88 0 0 1 32.32 20.06 A 8 8 0 0 0 119.82 64 h 32.35 a 8 8 0 0 0 6.74 -3.69 a 43.87 43.87 0 0 1 32.32 -20.06 A 43.81 43.81 0 0 1 192 73.83 a 8.09 8.09 0 0 0 1 7.65 A 41.72 41.72 0 0 1 200 104 Z"
                fill="currentColor"
              />
            </g>
          </g>
        </motion.g>
        <motion.g
          display="none"
          animate={reduceDefinition(tailControls)}
          initial="normal"
          variants={TAIL_VARIANTS}
        />
      </svg>
    </div>
  );
});
PhosphorGithubLogoIcon.displayName = 'PhosphorGithubLogoIcon';
export { PhosphorGithubLogoIcon };

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
