'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
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

export interface HugeiconsWifiLowIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsWifiLowIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HugeiconsWifiLowIcon = forwardRef<
  HugeiconsWifiLowIconHandle,
  HugeiconsWifiLowIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const questionControls = useAnimation();
  const isControlledRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      questionControls.start('hide');
    }, 1500);
  }, [questionControls]);
  const cancelHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);
  useEffect(() => () => cancelHide(), [cancelHide]);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: async () => {
        await controls.start('fadeOut');
        controls.start('fadeIn');
        questionControls.start('show');
        scheduleHide();
      },
      stopAnimation: () => {
        cancelHide();
        controls.start('fadeIn');
        questionControls.start('hide');
      },
    };
  }, [controls, questionControls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        cancelHide();
        await controls.start('fadeOut');
        controls.start('fadeIn');
        questionControls.start('show');
        scheduleHide();
      }
    },
    [controls, questionControls, scheduleHide, cancelHide]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      cancelHide();
      controls.start('fadeIn');
      questionControls.start('hide');
      void e;
    },
    [controls, questionControls, cancelHide]
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
        <motion.path
          d="M 12.1256 19.2506 H 12.0006 M 12.2506 19.2506 C 12.2506 19.3887 12.1387 19.5006 12.0006 19.5006 C 11.8625 19.5006 11.7506 19.3887 11.7506 19.2506 C 11.7506 19.1126 11.8625 19.0006 12.0006 19.0006 C 12.1387 19.0006 12.2506 19.1126 12.2506 19.2506 Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial={{ opacity: 1 }}
          variants={{
            fadeOut: {
              opacity: 1,
              transition: { duration: 0.2 },
            },
            fadeIn: {
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0,
              },
            },
          }}
          key="native-0-0"
        />
        <motion.path
          d="M 8.5 15.9293 C 9.43464 15.0132 10.6912 14.5 12 14.5 C 13.3088 14.5 14.5654 15.0132 15.5 15.9293"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial={{ opacity: 1 }}
          variants={{
            fadeOut: {
              opacity: 0,
              transition: { duration: 0.2 },
            },
            fadeIn: {
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.1,
              },
            },
          }}
          key="native-0-1"
        />
        <motion.text
          animate={reduceDefinition(questionControls)}
          dominantBaseline="central"
          fill="currentColor"
          fontSize="8"
          fontWeight="bold"
          initial={{ opacity: 0, scale: 0 }}
          stroke="none"
          style={{ transformOrigin: '12px 8px' }}
          textAnchor="middle"
          variants={{
            hide: {
              opacity: 0,
              scale: 0,
              transition: { duration: 0.15 },
            },
            show: {
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 18,
                delay: 0.1,
              },
            },
          }}
          x="12"
          y="8"
        >
          ?
        </motion.text>
      </svg>
    </div>
  );
});
HugeiconsWifiLowIcon.displayName = 'HugeiconsWifiLowIcon';
export { HugeiconsWifiLowIcon };

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
