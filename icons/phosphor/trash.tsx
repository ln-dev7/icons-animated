'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorTrashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorTrashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LID_VARIANTS: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: -5,
    rotate: [-3, 3, 0],
    transition: {
      duration: 0.4,
      rotate: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.95, 1],
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const PhosphorTrashIcon = forwardRef<
  PhosphorTrashIconHandle,
  PhosphorTrashIconProps
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
        <motion.g
          variants={LID_VARIANTS}
          animate={controls}
          style={{ transformOrigin: '128px 56px' }}
        >
          <line x1="216" y1="56" x2="40" y2="56" />
          <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" />
        </motion.g>
        <motion.g
          variants={BODY_VARIANTS}
          animate={controls}
          style={{ transformOrigin: '128px 140px' }}
        >
          <line x1="104" y1="104" x2="104" y2="168" />
          <line x1="152" y1="104" x2="152" y2="168" />
          <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" />
        </motion.g>
      </svg>
    </div>
  );
});

PhosphorTrashIcon.displayName = 'PhosphorTrashIcon';

export { PhosphorTrashIcon };
