/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: https://github.com/pqoqubbw/icons/tree/072c38b1b04ea738d90a084485ccaad4b890ddca
 *
 * Copyright (c) 2025 Hugeicons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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

export interface HugeiconsClipboardCheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsClipboardCheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
const CHECK_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      pathLength: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.3, ease: 'easeInOut' },
    },
  },
};
const HugeiconsClipboardCheckIcon = forwardRef<
  HugeiconsClipboardCheckIconHandle,
  HugeiconsClipboardCheckIconProps
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
          d="M14.45 4L13.7149 4.1492C13.7853 4.49569 14.088 4.746 14.4416 4.74995L14.45 4ZM9.54997 4L9.55835 4.74995C9.91188 4.746 10.2146 4.49569 10.285 4.1492L9.54997 4ZM19.1213 4.87868L19.6517 4.34835L19.6517 4.34835L19.1213 4.87868ZM19.1213 21.1213L19.6517 21.6517V21.6517L19.1213 21.1213ZM16 4.01732L16.0226 3.26766C16.0179 3.26752 16.0131 3.26742 16.0084 3.26737L16 4.01732ZM4.87868 4.87868L5.40901 5.40901V5.40901L4.87868 4.87868ZM8 4.01732L7.99162 3.26737C7.98688 3.26742 7.98215 3.26752 7.97741 3.26766L8 4.01732ZM14.45 4L15.185 3.8508C14.8838 2.36703 13.5732 1.25 12 1.25V2V2.75C12.8457 2.75 13.5529 3.35073 13.7149 4.1492L14.45 4ZM12 2V1.25C10.4268 1.25 9.11615 2.36703 8.81496 3.8508L9.54997 4L10.285 4.1492C10.4471 3.35073 11.1542 2.75 12 2.75V2ZM20 10H20.75C20.75 8.60699 20.7516 7.48678 20.6335 6.60825C20.5125 5.70814 20.2536 4.95027 19.6517 4.34835L19.1213 4.87868L18.591 5.40901C18.8678 5.68577 19.0482 6.07435 19.1469 6.80812C19.2484 7.56347 19.25 8.56458 19.25 10H20ZM20 16H20.75V10H20H19.25V16H20ZM20 16H19.25C19.25 17.4354 19.2484 18.4365 19.1469 19.1919C19.0482 19.9257 18.8678 20.3142 18.591 20.591L19.1213 21.1213L19.6517 21.6517C20.2536 21.0497 20.5125 20.2919 20.6335 19.3918C20.7516 18.5132 20.75 17.393 20.75 16H20ZM14 22V22.75C15.393 22.75 16.5132 22.7516 17.3918 22.6335C18.2919 22.5125 19.0497 22.2536 19.6517 21.6517L19.1213 21.1213L18.591 20.591C18.3142 20.8678 17.9257 21.0482 17.1919 21.1469C16.4365 21.2484 15.4354 21.25 14 21.25V22ZM16 4.01732L15.9774 4.76698C17.5421 4.81413 18.1804 4.99842 18.591 5.40901L19.1213 4.87868L19.6517 4.34835C18.7796 3.47633 17.5648 3.31413 16.0226 3.26766L16 4.01732ZM10 22V22.75H14V22V21.25H10V22ZM10 22V21.25C8.56458 21.25 7.56347 21.2484 6.80812 21.1469C6.07434 21.0482 5.68577 20.8678 5.40901 20.591L4.87868 21.1213L4.34835 21.6517C4.95027 22.2536 5.70814 22.5125 6.60825 22.6335C7.48678 22.7516 8.60699 22.75 10 22.75V22ZM4 16H3.25C3.25 17.393 3.24841 18.5132 3.36652 19.3918C3.48754 20.2919 3.74643 21.0497 4.34835 21.6517L4.87868 21.1213L5.40901 20.591C5.13225 20.3142 4.9518 19.9257 4.85315 19.1919C4.75159 18.4365 4.75 17.4354 4.75 16H4ZM4 10H4.75C4.75 8.56458 4.75159 7.56347 4.85315 6.80812C4.9518 6.07435 5.13225 5.68577 5.40901 5.40901L4.87868 4.87868L4.34835 4.34835C3.74643 4.95027 3.48754 5.70814 3.36652 6.60825C3.24841 7.48678 3.25 8.60699 3.25 10H4ZM8 4.01732L7.97741 3.26766C6.43521 3.31413 5.22037 3.47633 4.34835 4.34835L4.87868 4.87868L5.40901 5.40901C5.8196 4.99842 6.4579 4.81413 8.02259 4.76698L8 4.01732ZM4 10H3.25V16H4H4.75V10H4ZM8 4.01732L8.00838 4.76728L9.55835 4.74995L9.54997 4L9.54159 3.25005L7.99162 3.26737L8 4.01732ZM16 4.01732L16.0084 3.26737L14.4583 3.25005L14.45 4L14.4416 4.74995L15.9916 4.76728L16 4.01732Z"
          fill="currentColor"
        />
        <path
          d="M16 4L16 5C16 5.94281 16 6.41421 15.7071 6.70711C15.4142 7 14.9428 7 14 7L10 7C9.05718 7 8.58577 7 8.29287 6.7071C7.99998 6.4142 7.99998 5.94279 8 4.99997L8.00002 4"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <motion.path
          d="M9 14L11 16L15 12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          animate={reduceDefinition(controls)}
          initial="normal"
          style={{ transformOrigin: 'center' }}
          variants={CHECK_VARIANTS}
        />
      </svg>
    </div>
  );
});
HugeiconsClipboardCheckIcon.displayName = 'HugeiconsClipboardCheckIcon';
export { HugeiconsClipboardCheckIcon };

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
