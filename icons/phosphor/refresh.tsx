'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorRefreshIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorRefreshIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ROTATE_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const PhosphorRefreshIcon = forwardRef<
  PhosphorRefreshIconHandle,
  PhosphorRefreshIconProps
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
        <motion.g variants={ROTATE_VARIANTS} animate={controls}>
          <path d="M176.2 40a96 96 0 1 0 23.8 128" />
          <path d="M184 128h72a8 8 0 0 1 8 8v48" />
        </motion.g>
      </svg>
    </div>
  );
});

PhosphorRefreshIcon.displayName = 'PhosphorRefreshIcon';

export { PhosphorRefreshIcon };
