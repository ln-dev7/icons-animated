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

export interface HugeiconsReceiptIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsReceiptIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const DOLLAR_MAIN_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
};
const DOLLAR_SECONDARY_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.5,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.5 },
    },
  },
};
const HugeiconsReceiptIcon = forwardRef<
  HugeiconsReceiptIconHandle,
  HugeiconsReceiptIconProps
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
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        controls.start('animate');
      }
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        controls.start('normal');
      }
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          d="M11.9922 7L11.9922 8.5M11.9922 17L11.9922 15.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={DOLLAR_SECONDARY_VARIANTS}
        />
        <motion.path
          d="M 11.9922 8.5 H 13.4922 C 14.3206 8.5 14.9922 9.17157 14.9922 10 M 11.9922 8.5 H 10.4922 C 9.66376 8.5 8.99219 9.17157 8.99219 10 V 10.5 C 8.99219 11.3284 9.66376 12 10.4922 12 H 13.4922 C 14.3206 12 14.9922 12.6716 14.9922 13.5 V 14 C 14.9922 14.8284 14.3206 15.5 13.4922 15.5 H 11.9922 M 11.9922 15.5 H 10.4922 C 9.66376 15.5 8.99219 14.8284 8.99219 14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={DOLLAR_MAIN_VARIANTS}
        />
        <path
          d="M8.06024 2.72546L7.88823 2.86189C7.70302 3.00878 7.61041 3.08223 7.51824 3.12852C7.19917 3.28874 6.81809 3.26781 6.51881 3.07364C6.43236 3.01754 6.3485 2.93441 6.18079 2.76813C5.78074 2.37152 5.58072 2.17321 5.42995 2.10043C4.89043 1.83999 4.24264 2.10601 4.04689 2.6684C3.99219 2.82556 3.99219 3.10601 3.99219 3.66691V20.698C3.99219 20.9548 3.99219 21.0832 4.00377 21.158C4.11773 21.8938 4.97843 22.2473 5.58378 21.8069C5.64532 21.7621 5.73693 21.6713 5.92007 21.4897C6.03528 21.3755 6.09297 21.3183 6.14757 21.2735C6.65461 20.8578 7.37571 20.8182 7.92595 21.1759C7.98522 21.2144 8.04886 21.2649 8.17614 21.3658L8.31228 21.4738C8.54263 21.6565 8.65783 21.7479 8.77324 21.8104C9.22131 22.053 9.76307 22.053 10.2111 21.8104C10.3265 21.7479 10.4417 21.6565 10.6721 21.4738L10.7422 21.4182C11.0392 21.1827 11.1877 21.0649 11.3406 20.9918C11.7523 20.7949 12.2321 20.7949 12.6438 20.9918C12.7967 21.0649 12.9452 21.1827 13.2422 21.4182L13.3123 21.4738C13.5426 21.6565 13.6578 21.7479 13.7732 21.8104C14.2213 22.053 14.7631 22.053 15.2111 21.8104C15.3265 21.7479 15.4417 21.6565 15.6721 21.4738L15.8082 21.3658C15.9355 21.2649 15.9992 21.2144 16.0584 21.1759C16.6087 20.8182 17.3298 20.8578 17.8368 21.2735C17.8914 21.3183 17.9491 21.3755 18.0643 21.4897C18.2475 21.6713 18.3391 21.7621 18.4006 21.8069C19.0059 22.2473 19.8666 21.8938 19.9806 21.158C19.9922 21.0832 19.9922 20.9548 19.9922 20.698V3.66691C19.9922 3.10601 19.9922 2.82556 19.9375 2.6684C19.7417 2.10601 19.0939 1.83999 18.5544 2.10043C18.4037 2.17321 18.2036 2.37152 17.8036 2.76813C17.6359 2.93441 17.552 3.01754 17.4656 3.07364C17.1663 3.26781 16.7852 3.28874 16.4661 3.12852C16.374 3.08223 16.2814 3.00878 16.0961 2.86189L15.9241 2.72546C15.4536 2.35223 15.2183 2.16562 14.9617 2.08178C14.6568 1.98214 14.3276 1.98214 14.0227 2.08178C13.7661 2.16562 13.5308 2.35224 13.0602 2.72546L12.9922 2.77943C12.635 3.06273 12.4564 3.20438 12.2583 3.2586C12.0842 3.30627 11.9002 3.30627 11.7261 3.2586C11.528 3.20438 11.3494 3.06273 10.9922 2.77943L10.9241 2.72546C10.4536 2.35223 10.2183 2.16562 9.96172 2.08178C9.65676 1.98214 9.32761 1.98214 9.02266 2.08178C8.76609 2.16562 8.53081 2.35223 8.06024 2.72546Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
});
HugeiconsReceiptIcon.displayName = 'HugeiconsReceiptIcon';
export { HugeiconsReceiptIcon };

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
