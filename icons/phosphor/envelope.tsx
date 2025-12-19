'use client';

import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';

import { cn } from '@/lib/utils';

export interface PhosphorEnvelopeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorEnvelopeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  duration: 0.6,
  opacity: { duration: 0.2 },
};

const FLAP_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
  },
};

const PhosphorEnvelopeIcon = forwardRef<
  PhosphorEnvelopeIconHandle,
  PhosphorEnvelopeIconProps
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
      >
        <path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z" />
        <motion.polyline
          points="224 56 128 144 32 56"
          variants={FLAP_VARIANTS}
          transition={DEFAULT_TRANSITION}
          animate={controls}
        />
        <motion.line
          x1="110.55"
          y1="128"
          x2="34.47"
          y2="197.74"
          variants={FLAP_VARIANTS}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.2 }}
          animate={controls}
        />
        <motion.line
          x1="221.53"
          y1="197.74"
          x2="145.45"
          y2="128"
          variants={FLAP_VARIANTS}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.2 }}
          animate={controls}
        />
      </svg>
    </div>
  );
});

PhosphorEnvelopeIcon.displayName = 'PhosphorEnvelopeIcon';

export { PhosphorEnvelopeIcon };
