'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
import type { ForwardedRef, HTMLAttributes } from 'react';
import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HeroiconsSpeakerWaveIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HeroiconsSpeakerWaveIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HeroiconsSpeakerWaveIcon = forwardRef<
  HeroiconsSpeakerWaveIconHandle,
  HeroiconsSpeakerWaveIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
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
  }, []);
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
        <path d="M6.75 8.25L11.47 3.53A0.75 0.75 0 0 1 12.75 4.06V19.94A0.75 0.75 0 0 1 11.47 20.47L6.75 15.75H4.51C3.63 15.75 2.806 15.243 2.572 14.396A9.009 9.009 0 0 1 2.25 12C2.25 11.17 2.362 10.367 2.572 9.604 2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        {iconAccessibility.reduced ? (
          <>
            {isHovered ? (
              <Fragment key="volume-icon-active">
                <motion.path
                  d="M16.463 8.288A5.25 5.25 0 0 1 16.463 15.712"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.1 },
                  })}
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
                <motion.path
                  d="M19.114 18.364A9 9 0 0 0 19.114 5.636"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.2 },
                  })}
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
              </Fragment>
            ) : (
              <Fragment key="volume-icon-inactive">
                <motion.path
                  d="M16.463 8.288A5.25 5.25 0 0 1 16.463 15.712"
                  animate={reduceDefinition({
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.1 },
                  })}
                  exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                  initial={{ pathLength: 1, opacity: 1 }}
                />
                <motion.path
                  d="M19.114 5.636A9 9 0 0 1 19.114 18.364"
                  animate={reduceDefinition({
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.2 },
                  })}
                  exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                  initial={{ pathLength: 1, opacity: 1 }}
                />
              </Fragment>
            )}
          </>
        ) : (
          <AnimatePresence initial={false} mode="wait">
            {isHovered ? (
              <Fragment key="volume-icon-active">
                <motion.path
                  d="M16.463 8.288A5.25 5.25 0 0 1 16.463 15.712"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.1 },
                  })}
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
                <motion.path
                  d="M19.114 18.364A9 9 0 0 0 19.114 5.636"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.2 },
                  })}
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
              </Fragment>
            ) : (
              <Fragment key="volume-icon-inactive">
                <motion.path
                  d="M16.463 8.288A5.25 5.25 0 0 1 16.463 15.712"
                  animate={reduceDefinition({
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.1 },
                  })}
                  exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                  initial={{ pathLength: 1, opacity: 1 }}
                />
                <motion.path
                  d="M19.114 5.636A9 9 0 0 1 19.114 18.364"
                  animate={reduceDefinition({
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.2 },
                  })}
                  exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                  initial={{ pathLength: 1, opacity: 1 }}
                />
              </Fragment>
            )}
          </AnimatePresence>
        )}
      </svg>
    </div>
  );
});
HeroiconsSpeakerWaveIcon.displayName = 'HeroiconsSpeakerWaveIcon';
export { HeroiconsSpeakerWaveIcon };

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
