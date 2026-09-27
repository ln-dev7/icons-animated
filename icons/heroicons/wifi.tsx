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

export interface HeroiconsWifiIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HeroiconsWifiIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HeroiconsWifiIcon = forwardRef<
  HeroiconsWifiIconHandle,
  HeroiconsWifiIconProps
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
      startAnimation: async () => {
        await controls.start('fadeOut');
        controls.start('fadeIn');
      },
      stopAnimation: () => controls.start('fadeIn'),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        await controls.start('fadeOut');
        controls.start('fadeIn');
      }
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      controls.start('fadeIn');
      void e;
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
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          d="M12.53 18.22L12 18.75 11.47 18.22A0.75 0.75 0 0 1 12.53 18.22Z"
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
          key={'0-0'}
        />
        <motion.path
          d="M8.288 15.038A5.25 5.25 0 0 1 15.712 15.038"
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
          key={'0-1'}
        />
        <motion.path
          d="M5.106 11.856C8.913 8.048 15.086 8.048 18.894 11.856"
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
                delay: 0.2,
              },
            },
          }}
          key={'0-2'}
        />
        <motion.path
          d="M1.924 8.674C7.489 3.109 16.511 3.109 22.076 8.674"
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
                delay: 0.30000000000000004,
              },
            },
          }}
          key={'0-3'}
        />
      </svg>
    </div>
  );
});
HeroiconsWifiIcon.displayName = 'HeroiconsWifiIcon';
export { HeroiconsWifiIcon };

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
