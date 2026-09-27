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

export interface HugeiconsScanFaceIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsScanFaceIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HugeiconsScanFaceIcon = forwardRef<
  HugeiconsScanFaceIconHandle,
  HugeiconsScanFaceIconProps
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
        await controls.start('hidden');
        await controls.start('visible');
      },
      stopAnimation: () => controls.start('visible'),
    };
  }, [controls]);
  const handleMouseEnter = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        await controls.start('hidden');
        await controls.start('visible');
      }
    },
    [controls]
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        void e;
      } else {
        controls.start('visible');
      }
    },
    [controls]
  );
  const faceVariants: Variants = {
    visible: { scale: 1 },
    hidden: {
      scale: 0.9,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };
  const cornerVariants: Variants = {
    visible: { scale: 1, rotate: 0, opacity: 1 },
    hidden: {
      scale: 1.2,
      rotate: 45,
      opacity: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };
  const mouthVariants: Variants = {
    visible: { scale: 1, opacity: 1 },
    hidden: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3, delay: 0.1 },
    },
  };
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
        variants={faceVariants}
      >
        <motion.path
          d="M 8.99219 2.5 C 7.12987 2.5 6.19872 2.5 5.4531 2.77138 C 4.20315 3.22633 3.21851 4.21096 2.76357 5.46091 C 2.49219 6.20653 2.49219 7.13769 2.49219 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        />
        <motion.path
          d="M 14.9922 2.5 C 16.8545 2.5 17.7857 2.5 18.5313 2.77138 C 19.7812 3.22633 20.7659 4.21096 21.2208 5.46091 C 21.4922 6.20653 21.4922 7.13769 21.4922 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        />
        <motion.path
          d="M 14.9922 21.5 C 16.8545 21.5 17.7857 21.5 18.5313 21.2286 C 19.7812 20.7737 20.7659 19.789 21.2208 18.5391 C 21.4922 17.7935 21.4922 16.8623 21.4922 15"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        />
        <motion.path
          d="M 8.99219 21.5 C 7.12987 21.5 6.19872 21.5 5.4531 21.2286 C 4.20315 20.7737 3.21851 19.789 2.76357 18.5391 C 2.49219 17.7935 2.49219 16.8623 2.49219 15"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={cornerVariants}
        />
        <motion.path
          d="M8.49219 13C9.29029 14.2144 10.561 15 11.9922 15C13.4234 15 14.6941 14.2144 15.4922 13"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="visible"
          variants={mouthVariants}
        />
        <path
          d="M9.11719 9H8.99219M9.24219 9C9.24219 9.13807 9.13026 9.25 8.99219 9.25C8.85412 9.25 8.74219 9.13807 8.74219 9C8.74219 8.86193 8.85412 8.75 8.99219 8.75C9.13026 8.75 9.24219 8.86193 9.24219 9Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M15.1172 9H14.9922M15.2422 9C15.2422 9.13807 15.1303 9.25 14.9922 9.25C14.8541 9.25 14.7422 9.13807 14.7422 9C14.7422 8.86193 14.8541 8.75 14.9922 8.75C15.1303 8.75 15.2422 8.86193 15.2422 9Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
});
HugeiconsScanFaceIcon.displayName = 'HugeiconsScanFaceIcon';
export { HugeiconsScanFaceIcon };

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
