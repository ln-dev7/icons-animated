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

export interface HugeiconsBotMessageSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsBotMessageSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
export const HugeiconsBotMessageSquareIcon = forwardRef<
  HugeiconsBotMessageSquareIconHandle,
  HugeiconsBotMessageSquareIconProps
>(({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);
  const {
    rootRef: iconRootRef,
    reduceDefinition,
    ...iconAccessibility
  } = useIconAccessibility(ref, () => {
    isControlledRef.current = ref != null;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) void e;
      else controls.start('animate');
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) void e;
      else controls.start('normal');
    },
    [controls]
  );
  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
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
        variants={{
          normal: { rotate: 0, y: 0, scale: 1 },
          animate: {
            rotate: [0, -3, 3, 0, 0],
            y: [0, 1.5, -1.5, 0],
            scale: [1, 1.03, 1],
            transition: {
              duration: 1,
              ease: 'easeInOut',
              repeat: 0,
            },
          },
        }}
      >
        <path
          d="M11.999 8V5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M13.499 3.5C13.499 4.32843 12.8275 5 11.999 5C11.1706 5 10.499 4.32843 10.499 3.5C10.499 2.67157 11.1706 2 11.999 2C12.8275 2 13.499 2.67157 13.499 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M4.5 16H4C3.05719 16 2.58579 16 2.29289 15.7071C2 15.4142 2 14.9428 2 14V12.5C2 12.0341 2 11.8011 2.07612 11.6173C2.17761 11.3723 2.37229 11.1776 2.61732 11.0761C2.80109 11 3.03406 11 3.5 11H4.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M19.4961 11H19.9961C20.9389 11 21.4103 11 21.7032 11.2929C21.9961 11.5858 21.9961 12.0572 21.9961 13V14C21.9961 14.9428 21.9961 15.4142 21.7032 15.7071C21.4103 16 20.9389 16 19.9961 16H19.4961"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <motion.path
          d="M19.499 15V12C19.499 10.1144 19.499 9.17157 18.9132 8.58579C18.3275 8 17.3846 8 15.499 8H8.49902C6.61341 8 5.6706 8 5.08481 8.58579C4.49902 9.17157 4.49902 10.1144 4.49902 12V16.5C4.49902 16.9647 4.49902 17.197 4.53745 17.3902C4.69527 18.1836 5.31546 18.8038 6.10884 18.9616C6.30204 19 6.53437 19 6.99902 19C6.99902 20.3737 6.99902 21.0605 7.37501 21.3608C7.4763 21.4416 7.59236 21.5021 7.71671 21.5387C8.1783 21.6745 8.74098 21.2806 9.86634 20.4929L11.4825 19.3615C11.7387 19.1822 11.8668 19.0925 12.0136 19.0463C12.1604 19 12.3167 19 12.6295 19H15.499C17.3846 19 18.3275 19 18.9132 18.4142C19.499 17.8284 19.499 16.8856 19.499 15Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
          variants={{
            normal: { scale: 1, originX: 0.5, originY: 0.5 },
            animate: {
              scale: [1, 1.04, 1],
              transition: {
                duration: 0.6,
                ease: 'easeInOut',
                repeat: 1,
              },
            },
          }}
        />
        <motion.path
          d="M8.99902 11.5V12.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          variants={{
            normal: { scaleY: 1, originY: 0.5 },
            animate: {
              scaleY: [1, 0.1, 1],
              transition: { duration: 0.4, ease: 'easeInOut', delay: 0.1 },
            },
          }}
        />
        <motion.path
          d="M14.999 11.5V12.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          variants={{
            normal: { scaleY: 1, originY: 0.5 },
            animate: {
              scaleY: [1, 0.1, 1],
              transition: { duration: 0.4, ease: 'easeInOut', delay: 0.2 },
            },
          }}
        />
        <motion.circle
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          cx="10"
          cy="18"
          r="0.5"
          variants={{
            normal: { opacity: 0 },
            animate: {
              opacity: [0.3, 1, 0.3],
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.2,
                delay: 0,
              },
            },
          }}
        />
        <motion.circle
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          cx="12"
          cy="18"
          r="0.5"
          variants={{
            normal: { opacity: 0 },
            animate: {
              opacity: [0.3, 1, 0.3],
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.2,
                delay: 0.3,
              },
            },
          }}
        />
        <motion.circle
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          cx="14"
          cy="18"
          r="0.5"
          variants={{
            normal: { opacity: 0 },
            animate: {
              opacity: [0.3, 1, 0.3],
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.2,
                delay: 0.6,
              },
            },
          }}
        />
        <path
          d="M9.99902 15.5C9.99902 15.5 10.6657 16 11.999 16C13.3324 16 13.999 15.5 13.999 15.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
});
HugeiconsBotMessageSquareIcon.displayName = 'HugeiconsBotMessageSquareIcon';

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
