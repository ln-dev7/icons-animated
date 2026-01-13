'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorUploadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorUploadIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.5, 1],
    },
  },
};

const BAR_VARIANTS: Variants = {
  normal: { scaleX: 1 },
  animate: {
    scaleX: [1, 0.95, 1],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

const PhosphorUploadIcon = forwardRef<
  PhosphorUploadIconHandle,
  PhosphorUploadIconProps
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
        fill="currentColor"
        style={{ overflow: 'visible' }}
      >
        <motion.g variants={BAR_VARIANTS} animate={controls}>
          <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Z" />
        </motion.g>
        <motion.g variants={ARROW_VARIANTS} animate={controls}>
          <path d="M93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z" />
        </motion.g>
      </svg>
    </div>
  );
});

PhosphorUploadIcon.displayName = 'PhosphorUploadIcon';

export { PhosphorUploadIcon };
