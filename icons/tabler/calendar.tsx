'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface TablerCalendarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TablerCalendarIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PIN_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: (i: number) => ({
    y: [0, -2, 0],
    transition: {
      duration: 0.3,
      delay: i * 0.1,
    },
  }),
};

const CONTENT_VARIANTS: Variants = {
  normal: { opacity: 1, pathLength: 1 },
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
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
          d="M16 3v4"
          variants={PIN_VARIANTS}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M8 3v4"
          variants={PIN_VARIANTS}
          animate={controls}
          custom={1}
        />
        <path d="M4 11h16" />
        <motion.g variants={CONTENT_VARIANTS} animate={controls}>
          <path d="M11 15h1" />
          <path d="M12 15v3" />
        </motion.g>
      </svg>
    </div>
  );
});

TablerCalendarIcon.displayName = 'TablerCalendarIcon';

export { TablerCalendarIcon };
