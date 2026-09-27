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

export interface HugeiconsServerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsServerIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const TOP_RECT_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, 12, 12, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      repeat: 1,
      times: [0, 0.35, 0.65, 1],
    },
  },
};
const BOTTOM_RECT_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -12, -12, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      repeat: 1,
      times: [0, 0.35, 0.65, 1],
    },
  },
};
const HugeiconsServerIcon = forwardRef<
  HugeiconsServerIconHandle,
  HugeiconsServerIconProps
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="overflow-visible"
      >
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={TOP_RECT_VARIANTS}
        >
          <path
            d="M1.99219 7.99988C1.99219 6.11426 1.99219 5.17145 2.57797 4.58566C3.16376 3.99988 4.10657 3.99988 5.99219 3.99988H17.9922C19.8778 3.99988 20.8206 3.99988 21.4064 4.58566C21.9922 5.17145 21.9922 6.11426 21.9922 7.99988C21.9922 9.8855 21.9922 10.8283 21.4064 11.4141C20.8206 11.9999 19.8778 11.9999 17.9922 11.9999H5.99219C4.10657 11.9999 3.16376 11.9999 2.57797 11.4141C1.99219 10.8283 1.99219 9.8855 1.99219 7.99988Z"
            stroke="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.11719 7.99988H5.99219M6.24219 7.99988C6.24219 8.13795 6.13026 8.24988 5.99219 8.24988C5.85412 8.24988 5.74219 8.13795 5.74219 7.99988C5.74219 7.86181 5.85412 7.74988 5.99219 7.74988C6.13026 7.74988 6.24219 7.86181 6.24219 7.99988Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M10.1172 7.99988H9.99219M10.2422 7.99988C10.2422 8.13795 10.1303 8.24988 9.99219 8.24988C9.85412 8.24988 9.74219 8.13795 9.74219 7.99988C9.74219 7.86181 9.85412 7.74988 9.99219 7.74988C10.1303 7.74988 10.2422 7.86181 10.2422 7.99988Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.g>
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          variants={BOTTOM_RECT_VARIANTS}
        >
          <path
            d="M1.99219 16C1.99219 14.1143 1.99219 13.1714 2.57798 12.5856C3.16378 11.9998 4.10659 11.9999 5.99223 11.9999L17.9922 12C19.8778 12 20.8206 12 21.4064 12.5858C21.9922 13.1716 21.9922 14.1144 21.9922 16C21.9922 17.8857 21.9922 18.8285 21.4064 19.4143C20.8206 20.0001 19.8778 20.0001 17.9922 20.0001H5.99219C4.10657 20.0001 3.16376 20.0001 2.57797 19.4143C1.99219 18.8285 1.99219 17.8857 1.99219 16Z"
            stroke="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.11719 15.9999H5.99219M6.24219 15.9999C6.24219 16.1379 6.13026 16.2499 5.99219 16.2499C5.85412 16.2499 5.74219 16.1379 5.74219 15.9999C5.74219 15.8618 5.85412 15.7499 5.99219 15.7499C6.13026 15.7499 6.24219 15.8618 6.24219 15.9999Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M10.1172 15.9999H9.99219M10.2422 15.9999C10.2422 16.1379 10.1303 16.2499 9.99219 16.2499C9.85412 16.2499 9.74219 16.1379 9.74219 15.9999C9.74219 15.8618 9.85412 15.7499 9.99219 15.7499C10.1303 15.7499 10.2422 15.8618 10.2422 15.9999Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.g>
      </svg>
    </div>
  );
});
HugeiconsServerIcon.displayName = 'HugeiconsServerIcon';
export { HugeiconsServerIcon };

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
