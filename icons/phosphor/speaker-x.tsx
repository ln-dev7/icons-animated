'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
import type { TargetAndTransition as NativeMotionTarget } from 'motion/react';
import type { ForwardedRef, HTMLAttributes } from 'react';
import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { AnimatePresence, motion } from 'motion/react';

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
export interface PhosphorSpeakerXIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSpeakerXIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PhosphorSpeakerXIcon = forwardRef<
  PhosphorSpeakerXIconHandle,
  PhosphorSpeakerXIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
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
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="scale(0.09375)">
          <path
            d="M 155.51 24.81 a 8 8 0 0 0 -8.42 0.88 L 77.25 80 H 32 A 16 16 0 0 0 16 96 v 64 a 16 16 0 0 0 16 16 H 77.25 l 69.84 54.31 A 8 8 0 0 0 160 224 V 32 A 8 8 0 0 0 155.51 24.81 Z M 32 96 H 72 v 64 H 32 Z M 144 207.64 L 88 164.09 V 91.91 l 56 -43.55 Z"
            fill="currentColor"
          />
        </g>
        {iconAccessibility.reduced ? (
          <>
            {isHovered ? (
              <Fragment key="volume-icon-active">
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.1 },
                  })}
                  d="M16 9a5 5 0 0 1 0 6"
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.2 },
                  })}
                  d="M19.364 18.364a9 9 0 0 0 0-12.728"
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
              </Fragment>
            ) : (
              <Fragment key="volume-icon-inactive">
                <motion.g
                  animate={reduceDefinition({
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.1 },
                  })}
                  exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                  initial={nativePartTarget(
                    { pathLength: 1, opacity: 1 },
                    false
                  )}
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
                        d="M17.7 9.45L22.8 14.55"
                        fill="none"
                        stroke="white"
                        strokeWidth={2.1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={reduceDefinition({
                          pathLength: [0, 1],
                          opacity: [0, 1],
                          transition: { delay: 0.1 },
                        })}
                        exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                        initial={nativePartTarget(
                          { pathLength: 1, opacity: 1 },
                          true
                        )}
                      />
                      <motion.path
                        d="M22.8 9.45L17.7 14.55"
                        fill="none"
                        stroke="white"
                        strokeWidth={2.1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={reduceDefinition({
                          pathLength: [0, 1],
                          opacity: [0, 1],
                          transition: { delay: 0.1 },
                        })}
                        exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                        initial={nativePartTarget(
                          { pathLength: 1, opacity: 1 },
                          true
                        )}
                      />
                    </mask>
                  </defs>
                  <g mask={'url(#' + nativeMaskId + '-3' + ')'}>
                    <g transform="scale(0.09375)">
                      <path
                        d="M 245.66 146.34 a 8 8 0 0 1 -11.32 11.32 L 216 139.31 l -18.34 18.35 a 8 8 0 0 1 -11.32 -11.32 L 204.69 128 l -18.35 -18.34 a 8 8 0 0 1 11.32 -11.32 L 216 116.69 l 18.34 -18.35 a 8 8 0 0 1 11.32 11.32 L 227.31 128 Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </motion.g>
                <motion.g
                  display="none"
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
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.1 },
                  })}
                  d="M16 9a5 5 0 0 1 0 6"
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  animate={reduceDefinition({
                    opacity: 1,
                    transition: { delay: 0.2 },
                  })}
                  d="M19.364 18.364a9 9 0 0 0 0-12.728"
                  exit={reduceDefinition({ opacity: 0 })}
                  initial={{ opacity: 0 }}
                />
              </Fragment>
            ) : (
              <Fragment key="volume-icon-inactive">
                <motion.g
                  animate={reduceDefinition({
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    transition: { delay: 0.1 },
                  })}
                  exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                  initial={nativePartTarget(
                    { pathLength: 1, opacity: 1 },
                    false
                  )}
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
                        d="M17.7 9.45L22.8 14.55"
                        fill="none"
                        stroke="white"
                        strokeWidth={2.1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={reduceDefinition({
                          pathLength: [0, 1],
                          opacity: [0, 1],
                          transition: { delay: 0.1 },
                        })}
                        exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                        initial={nativePartTarget(
                          { pathLength: 1, opacity: 1 },
                          true
                        )}
                      />
                      <motion.path
                        d="M22.8 9.45L17.7 14.55"
                        fill="none"
                        stroke="white"
                        strokeWidth={2.1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={reduceDefinition({
                          pathLength: [0, 1],
                          opacity: [0, 1],
                          transition: { delay: 0.1 },
                        })}
                        exit={reduceDefinition({ pathLength: 1, opacity: 1 })}
                        initial={nativePartTarget(
                          { pathLength: 1, opacity: 1 },
                          true
                        )}
                      />
                    </mask>
                  </defs>
                  <g mask={'url(#' + nativeMaskId + '-3' + ')'}>
                    <g transform="scale(0.09375)">
                      <path
                        d="M 245.66 146.34 a 8 8 0 0 1 -11.32 11.32 L 216 139.31 l -18.34 18.35 a 8 8 0 0 1 -11.32 -11.32 L 204.69 128 l -18.35 -18.34 a 8 8 0 0 1 11.32 -11.32 L 216 116.69 l 18.34 -18.35 a 8 8 0 0 1 11.32 11.32 L 227.31 128 Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                </motion.g>
                <motion.g
                  display="none"
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
PhosphorSpeakerXIcon.displayName = 'PhosphorSpeakerXIcon';
export { PhosphorSpeakerXIcon };

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
