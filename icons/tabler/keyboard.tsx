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
import { AnimatePresence, motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface TablerKeyboardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface TablerKeyboardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const TablerKeyboardIcon = forwardRef<
  TablerKeyboardIconHandle,
  TablerKeyboardIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => setIsHovered(true),
      stopAnimation: () => setIsHovered(false),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        setIsHovered(true);
      }
    },
    []
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        setIsHovered(false);
      }
    },
    []
  );
  useEffect(() => {
    const animateKeys = async () => {
      if (isHovered) {
        await controls.start((i) => ({
          opacity: [1, 0.2, 1],
          transition: {
            duration: 1.5,
            times: [0, 0.5, 1],
            delay: i * 0.2 * Math.random(),
            repeat: 1,
            repeatType: 'reverse',
          },
        }));
      } else {
        controls.stop();
        controls.set({ opacity: 1 });
      }
    };
    animateKeys();
  }, [isHovered, controls]);
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8" />
        {iconAccessibility.reduced ? (
          <>
            <motion.path
              d="M10 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={0}
              key={'1-0'}
            />
            <motion.path
              d="M14 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={2}
              key={'1-1'}
            />
            <motion.path
              d="M18 14l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={3}
              key={'1-2'}
            />
            <motion.path
              d="M18 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={4}
              key={'1-3'}
            />
            <motion.path
              d="M6 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={5}
              key={'1-4'}
            />
            <motion.path
              d="M10 14l4 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={6}
              key={'1-5'}
            />
            <motion.path
              d="M6 14l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={7}
              key={'1-6'}
            />
          </>
        ) : (
          <AnimatePresence>
            <motion.path
              d="M10 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={0}
              key={'1-0'}
            />
            <motion.path
              d="M14 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={2}
              key={'1-1'}
            />
            <motion.path
              d="M18 14l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={3}
              key={'1-2'}
            />
            <motion.path
              d="M18 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={4}
              key={'1-3'}
            />
            <motion.path
              d="M6 10l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={5}
              key={'1-4'}
            />
            <motion.path
              d="M10 14l4 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={6}
              key={'1-5'}
            />
            <motion.path
              d="M6 14l0 .01"
              animate={reduceDefinition(controls)}
              initial={{ opacity: 1 }}
              custom={7}
              key={'1-6'}
            />
          </AnimatePresence>
        )}
      </svg>
    </div>
  );
});
TablerKeyboardIcon.displayName = 'TablerKeyboardIcon';
export { TablerKeyboardIcon };

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
