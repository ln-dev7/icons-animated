'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorSaveIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorSaveIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CHECK_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const PhosphorSaveIcon = forwardRef<
  PhosphorSaveIconHandle,
  PhosphorSaveIconProps
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
        style={{ overflow: 'visible' }}
      >
        <path d="M224 96V216a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h96l56 56Z" />
        <motion.path
          d="M128 152v56"
          variants={CHECK_VARIANTS}
          animate={controls}
        />
        <motion.path
          d="M96 152h64"
          variants={CHECK_VARIANTS}
          animate={controls}
        />
        <motion.path
          d="M96 208h64"
          variants={CHECK_VARIANTS}
          animate={controls}
        />
      </svg>
    </div>
  );
});

PhosphorSaveIcon.displayName = 'PhosphorSaveIcon';

export { PhosphorSaveIcon };
