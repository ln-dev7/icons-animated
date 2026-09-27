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
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getDefaultValueType, setTarget, visualElementStore } from 'motion';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorCloudSunIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorCloudSunIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const CLOUD_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [-1, 1, -1, 1, 0],
    y: [-1, 1, -1, 1, 0],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};
const SUN_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};
const PhosphorCloudSunIcon = forwardRef<
  PhosphorCloudSunIconHandle,
  PhosphorCloudSunIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const nativeMaskId = useId();
  const cloudControls = useAnimation();
  const sunControls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => {
        cloudControls.start('animate');
        sunControls.start('animate');
      },
      stopAnimation: () => {
        cloudControls.start('normal');
        sunControls.start('normal');
      },
    };
  }, [cloudControls, sunControls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        cloudControls.start('animate');
        sunControls.start('animate');
      }
    },
    [cloudControls, sunControls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        cloudControls.start('normal');
        sunControls.start('normal');
      }
    },
    [cloudControls, sunControls]
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
        style={{ overflow: 'visible' }}
      >
        <motion.g
          animate={reduceDefinition(cloudControls)}
          initial="normal"
          variants={CLOUD_VARIANTS}
        >
          <g transform="scale(0.09375)">
            <g>
              <defs>
                <clipPath
                  id={nativeMaskId + '-clip-0'}
                  clipPathUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 12.35H5.8L8.5 11.3L9.6 9L12.9 6H24V24H0Z"
                    transform="scale(10.666666666666666)"
                    clipRule="evenodd"
                    shapeRendering="crispEdges"
                  />
                </clipPath>
              </defs>
              <g clipPath={'url(#' + nativeMaskId + '-clip-0)'}>
                <path
                  d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </motion.g>
        {[
          'M12 2v2',
          'm4.93 4.93 1.41 1.41',
          'M20 12h2',
          'm19.07 4.93-1.41 1.41',
          'M15.947 12.65a4 4 0 0 0-5.925-4.128',
        ].map((d, index) => (
          <motion.g
            animate={reduceDefinition(sunControls)}
            custom={index + 1}
            initial="normal"
            key={d}
            variants={SUN_VARIANTS}
          >
            {index === 0 && (
              <g transform="scale(0.09375)">
                <g>
                  <defs>
                    <clipPath
                      id={nativeMaskId + '-clip-1'}
                      clipPathUnits="userSpaceOnUse"
                    >
                      <path
                        d="M7 0H9V5.2H7Z"
                        transform="scale(10.666666666666666)"
                        clipRule="evenodd"
                        shapeRendering="crispEdges"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath={'url(#' + nativeMaskId + '-clip-1)'}>
                    <path
                      d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </g>
            )}
            {index === 1 && (
              <g transform="scale(0.09375)">
                <g>
                  <defs>
                    <clipPath
                      id={nativeMaskId + '-clip-3'}
                      clipPathUnits="userSpaceOnUse"
                    >
                      <path
                        d="M2 4.5H5.2V7.5H2Z"
                        transform="scale(10.666666666666666)"
                        clipRule="evenodd"
                        shapeRendering="crispEdges"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath={'url(#' + nativeMaskId + '-clip-3)'}>
                    <path
                      d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </g>
            )}
            {index === 2 && (
              <g transform="scale(0.09375)">
                <g>
                  <defs>
                    <clipPath
                      id={nativeMaskId + '-clip-4'}
                      clipPathUnits="userSpaceOnUse"
                    >
                      <path
                        d="M0 9.5H4.5V12.3H0Z"
                        transform="scale(10.666666666666666)"
                        clipRule="evenodd"
                        shapeRendering="crispEdges"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath={'url(#' + nativeMaskId + '-clip-4)'}>
                    <path
                      d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </g>
            )}
            {index === 3 && (
              <g transform="scale(0.09375)">
                <g>
                  <defs>
                    <clipPath
                      id={nativeMaskId + '-clip-2'}
                      clipPathUnits="userSpaceOnUse"
                    >
                      <path
                        d="M11.2 3H14V6.2H11.2Z"
                        transform="scale(10.666666666666666)"
                        clipRule="evenodd"
                        shapeRendering="crispEdges"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath={'url(#' + nativeMaskId + '-clip-2)'}>
                    <path
                      d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </g>
            )}
            {index === 4 && (
              <g transform="scale(0.09375)">
                <g>
                  <defs>
                    <clipPath
                      id={nativeMaskId + '-clip-5'}
                      clipPathUnits="userSpaceOnUse"
                    >
                      <path
                        d="M-24-24H48V48H-24Z M0 12.35H5.8L8.5 11.3L9.6 9L12.9 6H24V24H0Z M7 0H9V5.2H7Z M11.2 3H14V6.2H11.2Z M2 4.5H5.2V7.5H2Z M0 9.5H4.5V12.3H0Z"
                        transform="scale(10.666666666666666)"
                        clipRule="evenodd"
                        shapeRendering="crispEdges"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath={'url(#' + nativeMaskId + '-clip-5)'}>
                    <path
                      d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </g>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
});
PhosphorCloudSunIcon.displayName = 'PhosphorCloudSunIcon';
export { PhosphorCloudSunIcon };

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
