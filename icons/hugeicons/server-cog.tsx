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

export interface HugeiconsServerCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsServerCogIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const COG_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};
const HugeiconsServerCogIcon = forwardRef<
  HugeiconsServerCogIconHandle,
  HugeiconsServerCogIconProps
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
        animate={reduceDefinition(controls)}
      >
        <motion.g
          animate={reduceDefinition(controls)}
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
          variants={COG_VARIANTS}
        >
          <path
            d="M11.9922 14.0004L11.9922 15.5004M11.9922 14.0004C12.7292 14.0004 13.3731 13.6017 13.72 13.0083M11.9922 14.0004C11.2552 14.0004 10.6113 13.6017 10.2643 13.0083M11.9922 10.0004L11.9922 8.50037M11.9922 10.0004C12.7292 10.0004 13.3731 10.399 13.72 10.9925M10.2643 13.0083C10.0913 12.7123 9.99219 12.3679 9.99219 12.0004C9.99219 11.6328 10.0913 11.2884 10.2644 10.9925C10.6113 10.399 11.2552 10.0004 11.9922 10.0004M14.9922 10.2504L13.72 10.9925M8.99219 13.7504L10.2643 13.0083M14.9922 13.7504L13.72 13.0083M8.99219 10.2504L10.2644 10.9925M13.72 13.0083C13.893 12.7123 13.9922 12.3679 13.9922 12.0004C13.9922 11.6328 13.893 11.2884 13.72 10.9925"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.g>

        <path
          d="M4.99218 11.996C3.7524 11.9781 3.04952 11.8861 2.57797 11.4146C1.99219 10.8288 1.99219 9.88598 1.99219 8.00037C1.99219 6.11475 1.99219 5.17194 2.57797 4.58615C3.16376 4.00037 4.10657 4.00037 5.99219 4.00037H17.9922C19.8778 4.00037 20.8206 4.00037 21.4064 4.58615C21.9922 5.17194 21.9922 6.11475 21.9922 8.00037C21.9922 9.88598 21.9922 10.8288 21.4064 11.4146C20.9349 11.8861 20.232 11.9781 18.9922 11.996"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M18.9922 12.0052C20.232 12.0232 20.9349 12.1152 21.4064 12.5867C21.9922 13.1725 21.9922 14.1153 21.9922 16.0009C21.9922 17.8866 21.9922 18.8294 21.4064 19.4152C20.8206 20.001 19.8778 20.001 17.9922 20.001H5.99219C4.10657 20.001 3.16376 20.001 2.57797 19.4152C1.99219 18.8294 1.99219 17.8865 1.99219 16.0009C1.99219 14.1152 1.99219 13.1723 2.57798 12.5865C3.04821 12.1163 3.74849 12.0235 4.98181 12.0052"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M6.11719 16.0004H5.99219M6.24219 16.0004C6.24219 16.1384 6.13026 16.2504 5.99219 16.2504C5.85412 16.2504 5.74219 16.1384 5.74219 16.0004C5.74219 15.8623 5.85412 15.7504 5.99219 15.7504C6.13026 15.7504 6.24219 15.8623 6.24219 16.0004Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M6.11719 8.00037H5.99219M6.24219 8.00037C6.24219 8.13844 6.13026 8.25037 5.99219 8.25037C5.85412 8.25037 5.74219 8.13844 5.74219 8.00037C5.74219 7.8623 5.85412 7.75037 5.99219 7.75037C6.13026 7.75037 6.24219 7.8623 6.24219 8.00037Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
});
HugeiconsServerCogIcon.displayName = 'HugeiconsServerCogIcon';
export { HugeiconsServerCogIcon };

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
