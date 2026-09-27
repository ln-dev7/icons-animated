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

export interface HugeiconsDatabaseBackupIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsDatabaseBackupIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const HugeiconsDatabaseBackupIcon = forwardRef<
  HugeiconsDatabaseBackupIconHandle,
  HugeiconsDatabaseBackupIconProps
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
        <ellipse
          cx="12"
          cy="5"
          rx="8"
          ry="3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M4 12C4 13.3979 6.54955 14.5725 10 14.9055"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />

        <path
          d="M12 22C7.58172 22 4 20.6569 4 19L4 5M20 5V10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />

        <motion.g
          animate={reduceDefinition(controls)}
          style={{ transformOrigin: '18px 17.5px' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          variants={{
            normal: { rotate: 0 },
            animate: { rotate: 360 },
          }}
        >
          <path
            d="M17.0904 17.1176C17.5016 17.0677 17.7944 16.6939 17.7445 16.2827C17.6946 15.8715 17.3208 15.5787 16.9096 15.6286L17 16.3731L17.0904 17.1176ZM14.1936 16.3064L13.6633 16.8367H13.6633L14.1936 16.3064ZM14.9351 13.1125C14.9973 12.703 14.7156 12.3206 14.3061 12.2585C13.8966 12.1963 13.5142 12.478 13.4521 12.8875L14.1936 13L14.9351 13.1125ZM17 16.3731L16.9096 15.6286C16.4965 15.6787 15.9048 15.7387 15.3868 15.7486C15.1255 15.7536 14.908 15.7452 14.7515 15.7236C14.6733 15.7128 14.6303 15.7014 14.6139 15.6958C14.5884 15.687 14.6492 15.7013 14.724 15.7761L14.1936 16.3064L13.6633 16.8367C13.8183 16.9917 14.0007 17.0714 14.1297 17.1154C14.2678 17.1626 14.4125 17.1911 14.5465 17.2096C14.8147 17.2466 15.1207 17.254 15.4156 17.2483C16.0098 17.2369 16.6608 17.1698 17.0904 17.1176L17 16.3731ZM14.1936 16.3064L14.724 15.7761C14.8172 15.8693 14.8169 15.9411 14.7965 15.8588C14.7819 15.7999 14.7672 15.7017 14.7584 15.5597C14.741 15.2779 14.752 14.9163 14.7784 14.5426C14.8044 14.1738 14.8436 13.8152 14.8767 13.5472C14.8932 13.4136 14.908 13.3038 14.9186 13.2277C14.9238 13.1898 14.9281 13.1603 14.931 13.1407C14.9324 13.1308 14.9335 13.1235 14.9342 13.1187C14.9345 13.1164 14.9348 13.1146 14.9349 13.1136C14.935 13.1131 14.9351 13.1127 14.9351 13.1125C14.9351 13.1125 14.9351 13.1124 14.9351 13.1124C14.9351 13.1124 14.9351 13.1124 14.9351 13.1124C14.9351 13.1125 14.9351 13.1125 14.1936 13C13.4521 12.8875 13.4521 12.8876 13.4521 12.8876C13.4521 12.8877 13.452 12.8878 13.452 12.8879C13.452 12.888 13.452 12.8882 13.4519 12.8885C13.4519 12.889 13.4518 12.8897 13.4516 12.8906C13.4514 12.8923 13.451 12.8947 13.4505 12.8978C13.4496 12.9039 13.4483 12.9127 13.4467 12.924C13.4434 12.9467 13.4387 12.9793 13.4329 13.0207C13.4214 13.1033 13.4055 13.2211 13.388 13.3636C13.353 13.6474 13.3105 14.0337 13.2821 14.4371C13.254 14.8355 13.2378 15.2732 13.2613 15.6522C13.2729 15.8406 13.2956 16.0382 13.3406 16.2196C13.3797 16.3777 13.4611 16.6346 13.6633 16.8367L14.1936 16.3064Z"
            fill="currentColor"
          />
          <path
            d="M14.5 16C15 15 16 13.5 18 13.5C20.2091 13.5 22 15.2909 22 17.5C22 19.7091 20.2091 21.5 18 21.5C16.8053 21.5 15.7329 20.9762 15 20.1458"
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
HugeiconsDatabaseBackupIcon.displayName = 'HugeiconsDatabaseBackupIcon';
export { HugeiconsDatabaseBackupIcon };

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
