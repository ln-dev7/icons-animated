'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface TablerTrashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TablerTrashIconProps extends HTMLAttributes<HTMLDivElement> {
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

const TablerTrashIcon = forwardRef<TablerTrashIconHandle, TablerTrashIconProps>(
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
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ overflow: 'visible' }}
        >
          <motion.g
            variants={LID_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '12px 7px' }}
          >
            <path d="M4 7l16 0" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </motion.g>
          <motion.g
            variants={BODY_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '12px 14px' }}
          >
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

TablerTrashIcon.displayName = 'TablerTrashIcon';

export { TablerTrashIcon };
