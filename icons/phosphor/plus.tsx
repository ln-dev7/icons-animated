'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorPlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorPlusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const VERTICAL_VARIANTS: Variants = {
  normal: { scaleY: 1, opacity: 1 },
  animate: {
    scaleY: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
    },
  },
};

const HORIZONTAL_VARIANTS: Variants = {
  normal: { scaleX: 1, opacity: 1 },
  animate: {
    scaleX: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      delay: 0.15,
    },
  },
};

const PhosphorPlusIcon = forwardRef<
  PhosphorPlusIconHandle,
  PhosphorPlusIconProps
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
        <motion.line
          x1="128"
          y1="40"
          x2="128"
          y2="216"
          variants={VERTICAL_VARIANTS}
          animate={controls}
          style={{ transformOrigin: '128px 128px' }}
        />
        <motion.line
          x1="40"
          y1="128"
          x2="216"
          y2="128"
          variants={HORIZONTAL_VARIANTS}
          animate={controls}
          style={{ transformOrigin: '128px 128px' }}
        />
      </svg>
    </div>
  );
});

PhosphorPlusIcon.displayName = 'PhosphorPlusIcon';

export { PhosphorPlusIcon };
