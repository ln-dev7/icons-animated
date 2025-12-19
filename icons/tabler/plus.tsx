'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface TablerPlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TablerPlusIconProps extends HTMLAttributes<HTMLDivElement> {
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

const TablerPlusIcon = forwardRef<TablerPlusIconHandle, TablerPlusIconProps>(
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
        >
          <motion.path
            d="M12 5l0 14"
            variants={VERTICAL_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M5 12l14 0"
            variants={HORIZONTAL_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

TablerPlusIcon.displayName = 'TablerPlusIcon';

export { TablerPlusIcon };
