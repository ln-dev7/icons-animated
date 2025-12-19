'use client';

import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HugeiconsHomeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HugeiconsHomeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  duration: 0.6,
  opacity: { duration: 0.2 },
};

const PATH_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

const HugeiconsHomeIcon = forwardRef<
  HugeiconsHomeIconHandle,
  HugeiconsHomeIconProps
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
      >
        <path d="M9.06165 4.82633L3.23911 9.92134C2.7855 10.3032 3.05587 11 3.66673 11H4.5V18C4.5 19.8856 4.5 20.8284 5.08579 21.4142C5.67157 22 6.61438 22 8.5 22H15.5C17.3856 22 18.3284 22 18.9142 21.4142C19.5 20.8284 19.5 19.8856 19.5 18V11H20.3333C20.9441 11 21.2145 10.3032 20.7609 9.92134L14.9383 4.82633C13.5469 3.60878 12.8512 3 12 3C11.1488 3 10.4531 3.60878 9.06165 4.82633Z" />
        <motion.path
          d="M12 16V22"
          variants={PATH_VARIANTS}
          transition={DEFAULT_TRANSITION}
          animate={controls}
        />
      </svg>
    </div>
  );
});

HugeiconsHomeIcon.displayName = 'HugeiconsHomeIcon';

export { HugeiconsHomeIcon };
