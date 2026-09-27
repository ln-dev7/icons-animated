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

export interface HugeiconsFan01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsFan01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const FAN_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 10,
      duration: 0.5,
    },
  },
  animate: {
    rotate: 270,
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 80,
      damping: 13,
    },
  },
};
const HugeiconsFan01Icon = forwardRef<
  HugeiconsFan01IconHandle,
  HugeiconsFan01IconProps
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
    const isControlledRef = useRef(false);
    const {
      rootRef: iconRootRef,
      reduceDefinition,
      ...iconAccessibility
    } = useIconAccessibility(ref, () => {
      isControlledRef.current = ref != null;
      return {
        startAnimation: () => startAnimation(),
        stopAnimation: () => stopAnimation(),
      };
    }, [controls]);
    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) startAnimation();
        void e;
      },
      [startAnimation]
    );
    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) stopAnimation();
        void e;
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
            ((event) => {
              if (!isControlledRef.current) startAnimation();
              void event;
            })(event);
          }
          onFocus?.(event);
        }}
        onBlur={(event) => {
          if (!iconAccessibility.controlled) {
            ((event) => {
              if (!isControlledRef.current) stopAnimation();
              void event;
            })(event);
          }
          onBlur?.(event);
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={FAN_VARIANTS}
        >
          <path
            d="M9.26281 12.2458C7.19268 12.0545 4.64013 12.1232 3.2361 12.9338L3.08751 13.0196C2.62814 13.2848 2.28791 13.723 2.25891 14.2527C2.21535 15.0482 2.30808 16.3264 3.07103 17.6479C4.42486 19.9928 6.77519 21.0713 7.76997 21.4394C8.06576 21.5489 8.38955 21.5054 8.66269 21.3477C9.16614 21.0571 9.37976 20.4464 9.24709 19.8804C8.87657 18.2997 8.79308 16.0301 9.9787 14.2647C9.52837 13.8126 9.25 13.189 9.25 12.5005C9.25 12.4145 9.25434 12.3296 9.26281 12.2458Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />

          <path
            d="M14.1611 13.1637C13.9722 13.8519 13.4966 14.4215 12.8706 14.7359C13.7391 16.6397 15.09 18.8587 16.5108 19.679L16.6594 19.7648C17.1188 20.03 17.6685 20.1055 18.1416 19.8658C18.8523 19.5058 19.913 18.7864 20.6759 17.4649C22.0297 15.12 21.7886 12.5453 21.61 11.4998C21.5569 11.1889 21.3574 10.9302 21.0842 10.7725C20.5808 10.4818 19.9451 10.6021 19.5213 11C18.3133 12.1341 16.3345 13.368 14.1611 13.1637Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />

          <path
            d="M11.1722 10.0676C11.3577 10.0237 11.5511 10.0005 11.75 10.0005C12.3502 10.0005 12.901 10.212 13.3319 10.5645C14.5328 8.86728 15.75 6.62197 15.75 5.00049V4.82892C15.75 4.29848 15.5406 3.78471 15.0964 3.49477C14.4293 3.0593 13.2759 2.50049 11.75 2.50049C9.04235 2.50049 6.93318 3.99669 6.11697 4.67412C5.87428 4.87556 5.75 5.17768 5.75 5.49308C5.75 6.07441 6.17204 6.56474 6.72854 6.73284C8.25356 7.19351 10.2147 8.2251 11.1722 10.0676Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />

          <path
            d="M14.2499 12.5002C14.2499 13.881 13.1307 15.0002 11.7499 15.0002C10.3692 15.0002 9.24994 13.881 9.24994 12.5002C9.24994 11.1195 10.3692 10.0002 11.7499 10.0002C13.1307 10.0002 14.2499 11.1195 14.2499 12.5002Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);
HugeiconsFan01Icon.displayName = 'HugeiconsFan01Icon';
export { HugeiconsFan01Icon };

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
