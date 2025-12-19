'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorCalendarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorCalendarIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PIN_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: (i: number) => ({
    y: [0, -5, 0],
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

const PhosphorCalendarIcon = forwardRef<
  PhosphorCalendarIconHandle,
  PhosphorCalendarIconProps
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
        viewBox="0 0 256 256"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      >
        <rect x="40" y="40" width="176" height="176" rx="8" />
        <motion.line
          x1="176"
          y1="24"
          x2="176"
          y2="56"
          variants={PIN_VARIANTS}
          animate={controls}
          custom={0}
        />
        <motion.line
          x1="80"
          y1="24"
          x2="80"
          y2="56"
          variants={PIN_VARIANTS}
          animate={controls}
          custom={1}
        />
        <line x1="40" y1="88" x2="216" y2="88" />
        <motion.g variants={CONTENT_VARIANTS} animate={controls}>
          <polyline points="88 128 104 120 104 184" />
          <path d="M138.14,128a16,16,0,1,1,26.64,17.63L136,184h32" />
        </motion.g>
      </svg>
    </div>
  );
});

PhosphorCalendarIcon.displayName = 'PhosphorCalendarIcon';

export { PhosphorCalendarIcon };
