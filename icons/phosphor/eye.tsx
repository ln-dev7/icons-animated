'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorEyeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorEyeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const EYE_VARIANTS: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: [1, 0.1, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
    },
  },
};

const PhosphorEyeIcon = forwardRef<PhosphorEyeIconHandle, PhosphorEyeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          <motion.g
            variants={EYE_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '128px 128px' }}
          >
            <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" />
            <circle cx="128" cy="128" r="40" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PhosphorEyeIcon.displayName = 'PhosphorEyeIcon';

export { PhosphorEyeIcon };
