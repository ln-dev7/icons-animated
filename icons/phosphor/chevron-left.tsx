'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorChevronLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorChevronLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CHEVRON_VARIANTS: Variants = {
  normal: { x: 0 },
  animate: {
    x: [0, -40, 0],
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const PhosphorChevronLeftIcon = forwardRef<
  PhosphorChevronLeftIconHandle,
  PhosphorChevronLeftIconProps
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
        <motion.g variants={CHEVRON_VARIANTS} animate={controls}>
          <polyline points="160 208 80 128 160 48" />
        </motion.g>
      </svg>
    </div>
  );
});

PhosphorChevronLeftIcon.displayName = 'PhosphorChevronLeftIcon';

export { PhosphorChevronLeftIcon };
