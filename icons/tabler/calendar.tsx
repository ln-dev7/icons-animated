'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

export interface TablerCalendarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TablerCalendarIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PIN_VARIANTS: Variants = {
  normal: { transition: { duration: 0.18, delay: 0, ease: 'easeOut' }, y: 0 },
  animate: (i: number) => ({
    y: [0, -2, 0],
    transition: {
      duration: 0.3,
      delay: i * 0.1,
    },
  }),
};

const CONTENT_VARIANTS: Variants = {
  normal: {
    transition: { duration: 0.18, delay: 0, ease: 'easeOut' },
    opacity: 1,
    pathLength: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.4,
      delay: 0.2,
    },
  },
};

const TablerCalendarIcon = forwardRef<
  TablerCalendarIconHandle,
  TablerCalendarIconProps
>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      className,
      size = 28,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reducedMotion = useReducedMotion();
    const motionPreference = useRef(reducedMotion);
    const sequence = useRef(0);
    const startAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      controls.set('normal');
      if (motionPreference.current) return;
      void controls.start('animate').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls]);
    const stopAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      if (motionPreference.current) {
        controls.set('normal');
        return;
      }
      void controls.start('normal').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls]);
    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }), [
      startAnimation,
      stopAnimation,
    ]);
    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updatePreference = () => {
        motionPreference.current = media.matches;
        if (media.matches) {
          sequence.current += 1;
          controls.stop();
          controls.set('normal');
        }
      };
      updatePreference();
      media.addEventListener('change', updatePreference);
      return () => {
        media.removeEventListener('change', updatePreference);
        sequence.current += 1;
        controls.stop();
      };
    }, [controls]);

    return (
      <div
        {...props}
        className={cn(className)}
        onMouseEnter={(event) => {
          if (!ref) startAnimation();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (!ref) stopAnimation();
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          if (!ref) startAnimation();
          onFocus?.(event);
        }}
        onBlur={(event) => {
          if (!ref) stopAnimation();
          onBlur?.(event);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          overflow="visible"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
          <motion.path
            initial="normal"
            d="M16 3v4"
            variants={PIN_VARIANTS}
            animate={controls}
            custom={0}
          />
          <motion.path
            initial="normal"
            d="M8 3v4"
            variants={PIN_VARIANTS}
            animate={controls}
            custom={1}
          />
          <path d="M4 11h16" />
          <motion.g
            initial="normal"
            variants={CONTENT_VARIANTS}
            animate={controls}
          >
            <path d="M11 15h1" />
            <path d="M12 15v3" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

TablerCalendarIcon.displayName = 'TablerCalendarIcon';

export { TablerCalendarIcon };
