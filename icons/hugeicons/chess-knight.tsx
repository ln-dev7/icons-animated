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

export interface HugeiconsChessKnightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsChessKnightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const KNIGHT_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 12,
    },
  },
  animate: {
    rotate: [0, 12, 38, 42, 38, 10, -5, 0],
    y: [0, -2, -9, -12, -9, -2, 1, 0],
    transition: {
      duration: 0.9,
      times: [0, 0.1, 0.3, 0.45, 0.6, 0.78, 0.9, 1],
      ease: 'easeInOut',
    },
  },
};
const HugeiconsChessKnightIcon = forwardRef<
  HugeiconsChessKnightIconHandle,
  HugeiconsChessKnightIconProps
>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      className,
      size = 28,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const motionPreference = useRef(false);
    const startAnimation = useCallback(() => {
      if (!motionPreference.current) return controls.start('animate');
    }, [controls]);
    const stopAnimation = useCallback(() => {
      if (motionPreference.current) {
        controls.stop();
        controls.set('normal');
        return;
      }
      return controls.start('normal');
    }, [controls]);
    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updatePreference = () => {
        motionPreference.current = media.matches;
        if (media.matches) {
          controls.stop();
          controls.set('normal');
        }
      };
      updatePreference();
      media.addEventListener('change', updatePreference);
      return () => {
        media.removeEventListener('change', updatePreference);
        controls.stop();
      };
    }, [controls]);
    const isControlled = !!ref;
    const {
      rootRef: iconRootRef,
      reduceDefinition,
      ...iconAccessibility
    } = useIconAccessibility(
      ref,
      () => ({
        startAnimation: () => startAnimation(),
        stopAnimation: () => stopAnimation(),
      }),
      [controls]
    );
    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlled) startAnimation();
        void e;
      },
      [startAnimation, isControlled]
    );
    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlled) stopAnimation();
        void e;
      },
      [stopAnimation, isControlled]
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
            ((event) => {
              if (!isControlled) startAnimation();
              void event;
            })(event);
          }
          onFocus?.(event);
        }}
        onBlur={(event) => {
          if (!iconAccessibility.controlled) {
            ((event) => {
              if (!isControlled) stopAnimation();
              void event;
            })(event);
          }
          onBlur?.(event);
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
          style={{ overflow: 'visible' }}
        >
          <motion.g
            animate={reduceDefinition(controls)}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
            variants={KNIGHT_VARIANTS}
          >
            <path
              d="M16.5 22H6.5C6.03501 22 5.80252 22 5.61177 21.9489C5.09413 21.8102 4.68981 21.4059 4.55111 20.8882C4.5 20.6975 4.5 20.465 4.5 20C4.5 18.8954 5.39543 18 6.5 18H16.5C17.6046 18 18.5 18.8954 18.5 20C18.5 20.465 18.5 20.6975 18.4489 20.8882C18.3102 21.4059 17.9059 21.8102 17.3882 21.9489C17.1975 22 16.965 22 16.5 22Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />

            <path
              d="M16.5412 18L18.6065 12.5989C18.9952 11.5824 19.1895 11.0741 19.2894 10.6776C20.3197 6.58681 17.4559 2.53744 13.1858 2.04748C12.772 2 12.2181 2 11.1105 2C10.9388 2 10.8529 2 10.7806 2.00675C10.05 2.0749 9.47154 2.6418 9.402 3.35789C9.39512 3.42878 9.39512 3.51293 9.39512 3.68122V4.5L5.28271 6.91832C5.00991 7.07874 4.87351 7.15895 4.77626 7.26052C4.58792 7.45725 4.48866 7.72022 4.50103 7.98973C4.50742 8.12887 4.55772 8.27677 4.65832 8.57257C4.84057 9.10842 4.93169 9.37635 5.07488 9.59175C5.35194 10.0085 5.77752 10.3092 6.26857 10.435C6.52235 10.5 6.81051 10.5 7.38682 10.5H10.1768C10.5512 10.5 10.7384 10.5 10.9111 10.4807C11.8188 10.3793 12.6328 9.88594 13.1308 9.13532C13.2255 8.99249 13.3092 8.82829 13.4764 8.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />

            <path
              d="M6.5 18C6.5 17.8188 6.5 17.7283 6.50377 17.6415C6.54858 16.6096 6.9908 15.6351 7.73785 14.9219C7.80064 14.8619 7.86882 14.8023 8.00515 14.683L8.99485 13.817C9.13117 13.6977 9.19936 13.6381 9.26215 13.5781C10.0092 12.8649 10.4514 11.8904 10.4962 10.8585C10.5 10.7717 10.5 10.6812 10.5 10.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsChessKnightIcon.displayName = 'HugeiconsChessKnightIcon';
export { HugeiconsChessKnightIcon };

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
