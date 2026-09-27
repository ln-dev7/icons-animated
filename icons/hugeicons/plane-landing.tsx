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

export interface HugeiconsPlaneLandingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsPlaneLandingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const PLANE_LANDING_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  animate: {
    x: [-38, 1, 0],
    y: [-20, 1, 0],
    opacity: [0, 1, 1],
    scale: [0.5, 1],
    rotate: [16, -5, 0],
    transition: {
      duration: 1.1,
      ease: [0.25, 1, 0.5, 1],
      times: [0, 0.65, 1],
    },
  },
};
const HugeiconsPlaneLandingIcon = forwardRef<
  HugeiconsPlaneLandingIconHandle,
  HugeiconsPlaneLandingIconProps
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
        className="overflow-visible"
      >
        <path
          d="M20.4931 21.0005H3.99307"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <motion.path
          d="M7.40612 8.14474C7.95105 8.29843 8.22351 8.37527 8.41603 8.35777C8.88701 8.31496 9.2645 7.96241 9.32511 7.50877C9.34989 7.32334 9.28175 7.06427 9.14547 6.54614L8.5752 4.37793C8.53914 4.24085 8.52112 4.17231 8.51355 4.12304C8.41353 3.47137 8.99451 2.91221 9.66799 3.01195C9.71891 3.01949 9.78971 3.03724 9.93131 3.07274C10.127 3.1218 10.2249 3.14633 10.3183 3.1735C11.4752 3.51003 12.4694 4.23566 13.1213 5.21922C13.1739 5.29862 13.2251 5.38289 13.3276 5.55143L15.693 9.44276C16.0435 10.0194 16.2187 10.3077 16.4741 10.5199C16.5235 10.5609 16.5748 10.5995 16.628 10.6358C16.9033 10.8232 17.2353 10.9168 17.8994 11.1041L19.4563 11.5432C19.7903 11.6374 19.9573 11.6845 20.1025 11.7417C21.1408 12.1508 21.8615 13.0799 21.9769 14.1583C21.9931 14.3091 21.9931 14.4773 21.9931 14.8137C21.9931 15.0007 21.9931 15.0942 21.982 15.1661C21.9005 15.6937 21.3971 16.061 20.8501 15.9921C20.7756 15.9827 20.6826 15.957 20.4966 15.9057L6.36649 12.0093C4.23725 11.4221 3.17263 11.1285 2.56143 10.3571C2.50418 10.2848 2.45044 10.21 2.40038 10.133C1.8659 9.30996 1.95278 8.2428 2.12653 6.10847L2.19924 5.21531C2.22138 4.94334 2.23245 4.80735 2.26448 4.7055C2.40861 4.24727 2.87453 3.95722 3.36559 4.02003C3.47472 4.03398 3.60733 4.08053 3.87255 4.17361C4.12159 4.26103 4.24612 4.30473 4.35681 4.3592C4.84183 4.59787 5.20703 5.01532 5.37005 5.51738C5.40725 5.63195 5.43118 5.75794 5.47904 6.00991L5.49866 6.11318C5.57037 6.49069 5.60623 6.67944 5.67186 6.84625C5.85186 7.30378 6.20262 7.67949 6.65497 7.89928C6.8199 7.97942 7.0153 8.03452 7.40612 8.14474Z"
          stroke="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          style={{ originX: 0.5, originY: 0.5 }}
          variants={PLANE_LANDING_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});
HugeiconsPlaneLandingIcon.displayName = 'HugeiconsPlaneLandingIcon';
export { HugeiconsPlaneLandingIcon };

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
