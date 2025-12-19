'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HugeiconsTrashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HugeiconsTrashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LID_VARIANTS: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: -2,
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

const HugeiconsTrashIcon = forwardRef<
  HugeiconsTrashIconHandle,
  HugeiconsTrashIconProps
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
        <motion.g
          variants={LID_VARIANTS}
          animate={controls}
          style={{ transformOrigin: '12px 5px' }}
        >
          <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" />
        </motion.g>
        <motion.g
          variants={BODY_VARIANTS}
          animate={controls}
          style={{ transformOrigin: '12px 14px' }}
        >
          <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" />
          <path d="M9.5 16.5V10.5" />
          <path d="M14.5 16.5V10.5" />
        </motion.g>
      </svg>
    </div>
  );
});

HugeiconsTrashIcon.displayName = 'HugeiconsTrashIcon';

export { HugeiconsTrashIcon };
