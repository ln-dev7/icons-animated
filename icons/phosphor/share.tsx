'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorShareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorShareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SHARE_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const PhosphorShareIcon = forwardRef<
  PhosphorShareIconHandle,
  PhosphorShareIconProps
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
        <motion.g variants={SHARE_VARIANTS} animate={controls}>
          <circle cx="128" cy="64" r="32" />
          <circle cx="64" cy="192" r="32" />
          <circle cx="192" cy="192" r="32" />
          <line x1="128" y1="96" x2="96" y2="160" />
          <line x1="128" y1="96" x2="160" y2="160" />
        </motion.g>
      </svg>
    </div>
  );
});

PhosphorShareIcon.displayName = 'PhosphorShareIcon';

export { PhosphorShareIcon };
