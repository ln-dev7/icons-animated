'use client';

import type {
  LegacyAnimationControls,
  ResolvedValues,
  VisualElement,
} from 'motion';
import type { Transition, Variants } from 'motion/react';
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

export interface HugeiconsFolderUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsFolderUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const ARROW_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: { y: [0, -2, 0] },
};
const ARROW_TRANSITION: Transition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};
const HugeiconsFolderUpIcon = forwardRef<
  HugeiconsFolderUpIconHandle,
  HugeiconsFolderUpIconProps
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
      >
        <path
          d="M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <motion.g
          animate={reduceDefinition(controls)}
          initial="normal"
          transition={ARROW_TRANSITION}
          variants={ARROW_VARIANTS}
        >
          <path
            d="M12.7539 11.9995C12.7539 11.5853 12.4181 11.2495 12.0039 11.2495C11.5897 11.2495 11.2539 11.5853 11.2539 11.9995L12.0039 11.9995L12.7539 11.9995ZM11.2539 16.9995C11.2539 17.4137 11.5897 17.7495 12.0039 17.7495C12.4181 17.7495 12.7539 17.4137 12.7539 16.9995H12.0039H11.2539ZM12.0039 10.9995L12.0039 10.2495L12.0039 10.9995ZM8.40001 13.5547C8.15438 13.8882 8.22562 14.3577 8.55914 14.6034C8.89266 14.849 9.36216 14.7778 9.6078 14.4443L9.00391 13.9995L8.40001 13.5547ZM14.4 14.4443C14.6456 14.7778 15.1151 14.849 15.4487 14.6034C15.7822 14.3578 15.8534 13.8883 15.6078 13.5548L15.0039 13.9995L14.4 14.4443ZM12.0039 11.9995L11.2539 11.9995L11.2539 16.9995H12.0039H12.7539L12.7539 11.9995L12.0039 11.9995ZM12.0039 10.9995L12.0039 10.2495C11.6962 10.2495 11.4303 10.3839 11.2608 10.4861C11.0707 10.6007 10.8816 10.7502 10.7051 10.9062C10.3502 11.2197 9.97487 11.6234 9.64114 12.0078C9.30417 12.3959 8.99462 12.7818 8.77023 13.0693C8.65772 13.2135 8.56591 13.3338 8.50192 13.4185C8.46991 13.4609 8.44483 13.4944 8.42755 13.5176C8.41892 13.5292 8.41223 13.5382 8.4076 13.5445C8.40529 13.5476 8.40349 13.55 8.40222 13.5517C8.40159 13.5526 8.40109 13.5533 8.40072 13.5538C8.40053 13.554 8.40038 13.5542 8.40026 13.5544C8.40021 13.5545 8.40014 13.5545 8.40011 13.5546C8.40006 13.5547 8.40001 13.5547 9.00391 13.9995C9.6078 14.4443 9.60777 14.4443 9.60775 14.4443C9.60775 14.4443 9.60774 14.4443 9.60775 14.4443C9.60777 14.4443 9.60782 14.4442 9.6079 14.4441C9.60807 14.4439 9.60837 14.4435 9.6088 14.4429C9.60966 14.4417 9.61104 14.4399 9.61293 14.4373C9.61672 14.4322 9.62253 14.4244 9.63027 14.414C9.64575 14.3932 9.66891 14.3623 9.69886 14.3226C9.75879 14.2433 9.84576 14.1293 9.95275 13.9922C10.1673 13.7172 10.4596 13.3531 10.7738 12.9912C11.0912 12.6256 11.4165 12.2793 11.6983 12.0303C11.84 11.905 11.9532 11.8202 12.0353 11.7707C12.1379 11.7089 12.114 11.7495 12.0039 11.7495L12.0039 10.9995ZM15.0039 13.9995C15.6078 13.5548 15.6078 13.5547 15.6077 13.5546C15.6077 13.5546 15.6076 13.5545 15.6076 13.5544C15.6074 13.5543 15.6073 13.5541 15.6071 13.5538C15.6067 13.5533 15.6062 13.5526 15.6056 13.5518C15.6043 13.55 15.6025 13.5476 15.6002 13.5445C15.5956 13.5382 15.5889 13.5292 15.5803 13.5176C15.563 13.4945 15.5379 13.461 15.5059 13.4186C15.4419 13.3339 15.3501 13.2135 15.2376 13.0693C15.0132 12.7818 14.7037 12.3959 14.3667 12.0078C14.033 11.6234 13.6576 11.2197 13.3028 10.9062C13.1263 10.7502 12.9371 10.6007 12.747 10.4861C12.5775 10.3839 12.3116 10.2495 12.0039 10.2495L12.0039 10.9995L12.0039 11.7495C11.8939 11.7495 11.87 11.7089 11.9726 11.7707C12.0547 11.8202 12.1678 11.905 12.3096 12.0303C12.5914 12.2793 12.9166 12.6256 13.234 12.9912C13.5483 13.3531 13.8405 13.7172 14.0551 13.9922C14.162 14.1293 14.249 14.2433 14.309 14.3226C14.3389 14.3623 14.3621 14.3932 14.3775 14.414C14.3853 14.4244 14.3911 14.4322 14.3949 14.4373C14.3968 14.4399 14.3981 14.4417 14.399 14.4429C14.3994 14.4435 14.3997 14.4439 14.3999 14.4441C14.4 14.4442 14.4 14.4443 14.4001 14.4443C14.4001 14.4443 14.4001 14.4443 14.4001 14.4443C14.4 14.4443 14.4 14.4443 15.0039 13.9995Z"
            fill="currentColor"
          />
        </motion.g>
      </svg>
    </div>
  );
});
HugeiconsFolderUpIcon.displayName = 'HugeiconsFolderUpIcon';
export { HugeiconsFolderUpIcon };

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
