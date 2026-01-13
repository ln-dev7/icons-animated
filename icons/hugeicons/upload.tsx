'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HugeiconsUploadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HugeiconsUploadIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -3, 0],
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const HugeiconsUploadIcon = forwardRef<
  HugeiconsUploadIconHandle,
  HugeiconsUploadIconProps
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ overflow: 'visible' }}
      >
        <path d="M2.99994 17C2.99994 17.93 2.99994 18.395 3.10216 18.7765C3.37956 19.8117 4.18821 20.6204 5.22348 20.8978C5.60498 21 6.06997 21 6.99994 21L16.9999 21C17.9299 21 18.3949 21 18.7764 20.8978C19.8117 20.6204 20.6203 19.8117 20.8977 18.7765C20.9999 18.395 20.9999 17.93 20.9999 17" />
        <motion.g variants={ARROW_VARIANTS} animate={controls}>
          <path d="M16.5 7.49993C16.5 7.49993 13.1858 2.99997 12 2.99996C10.8141 2.99995 7.50002 7.49996 7.50002 7.49996M12 3.99996V16" />
        </motion.g>
      </svg>
    </div>
  );
});

HugeiconsUploadIcon.displayName = 'HugeiconsUploadIcon';

export { HugeiconsUploadIcon };
