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

export interface HeroiconsHandRaisedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HeroiconsHandRaisedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HeroiconsHandRaisedIcon = forwardRef<
  HeroiconsHandRaisedIconHandle,
  HeroiconsHandRaisedIconProps
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
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={{
            normal: { rotate: 0, originX: '50%', originY: '90%' },
            animate: {
              rotate: [0, -15, 10, -5, 0],
              transition: {
                duration: 0.8,
                ease: 'easeInOut',
              },
            },
          }}
        >
          <path d="M10.05 4.575A1.575 1.575 0 1 0 6.9 4.575V7.575" />
          <path d="M10.05 4.575L10.125 10.5" />
          <path d="M6.9 7.575V12" />

          <path d="M10.05 4.575V3.075A1.575 1.575 0 0 1 13.2 3.075V4.575" />
          <path d="M13.2 11.25V4.575" />
          <path d="M13.17 16.318A4.49 4.49 0 0 1 16.35 15" />

          <path d="M13.2 4.575A1.575 1.575 0 0 1 16.35 4.575V15" />
          <path d="M16.352 15H16.35" />

          <path d="M6.9 7.575A1.575 1.575 0 1 0 3.75 7.575V15.75A6.75 6.75 0 0 0 10.5 22.5H12.518A5.25 5.25 0 0 0 16.23 20.962L17.962 19.23A5.25 5.25 0 0 0 19.5 15.518L19.503 13.494A0.668 0.668 0 0 1 19.701 13.023 1.575 1.575 0 1 0 17.473 10.795 3.818 3.818 0 0 0 16.353 13.482" />
        </motion.svg>
      </div>
    );
  }
);
HeroiconsHandRaisedIcon.displayName = 'HeroiconsHandRaisedIcon';
export { HeroiconsHandRaisedIcon };

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
