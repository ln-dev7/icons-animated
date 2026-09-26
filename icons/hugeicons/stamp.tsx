/**
 * @license
 * MIT License
 *
 * Copyright (c) 2025 Hugeicons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

export interface HugeiconsStampIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsStampIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ICON_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    scale: [1, 0.96, 1],
    transition: { duration: 0.75, ease: 'easeInOut' },
  },
};

const ELEMENT_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.18 },
  },
  animate: (index: number) => ({
    ...{ pathLength: [0.3, 1], opacity: [0.45, 1] },
    transition: {
      duration: 0.6,
      delay: Math.min(index * 0.055, 0.22),
      ease: 'easeInOut',
    },
  }),
};

const HugeiconsStampIcon = forwardRef<
  HugeiconsStampIconHandle,
  HugeiconsStampIconProps
>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      className,
      size = 28,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reducedMotion = useReducedMotion();
    const sequence = useRef(0);
    const startAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      controls.set('normal');
      if (reducedMotion) return;
      void controls.start('animate').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls, reducedMotion]);
    const stopAnimation = useCallback(() => {
      sequence.current += 1;
      void controls.start('normal');
    }, [controls]);
    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }), [
      startAnimation,
      stopAnimation,
    ]);
    useEffect(() => {
      if (reducedMotion) {
        sequence.current += 1;
        controls.set('normal');
      }
      return () => {
        sequence.current += 1;
        controls.stop();
      };
    }, [controls, reducedMotion]);
    return (
      <div
        {...props}
        className={cn(className)}
        onMouseEnter={(event) => {
          if (!ref) startAnimation();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (!ref) stopAnimation();
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          if (!ref) startAnimation();
          onFocus?.(event);
        }}
        onBlur={(event) => {
          if (!ref) stopAnimation();
          onBlur?.(event);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          aria-hidden="true"
          focusable="false"
        >
          <motion.g
            initial="normal"
            animate={controls}
            variants={ICON_VARIANTS}
            style={{ transformOrigin: '12px 12px' }}
          >
            <motion.path
              d="M17.6667 21H6.33333C6.02334 21 5.86835 21 5.74118 20.9574C5.39609 20.8418 5.12654 20.5049 5.03407 20.0735C5 19.9146 5 19.7208 5 19.3333C5 18.5584 5 18.1709 5.06815 17.853C5.25308 16.9902 5.79218 16.3164 6.48236 16.0852C6.7367 16 7.04669 16 7.66667 16H16.3333C16.9533 16 17.2633 16 17.5176 16.0852C18.2078 16.3164 18.7469 16.9902 18.9319 17.853C19 18.1709 19 18.5584 19 19.3333C19 19.7208 19 19.9146 18.9659 20.0735C18.8735 20.5049 18.6039 20.8418 18.2588 20.9574C18.1317 21 17.9767 21 17.6667 21Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={0}
            />
            <motion.path
              d="M9.50044 16C10.0151 13.4523 10.0845 11.9663 9.75631 11.0497C9.68503 10.8507 9.56363 10.6749 9.44039 10.5034C8.62715 9.37155 8.25775 8.48762 8.11746 7.94129C8.03527 7.62119 8.0097 7.28611 8.02447 6.95595C8.0513 6.35609 8.2462 5.4471 8.87882 4.56208C9.72889 3.37285 11.3129 3.007 12.0004 3C12.688 3.007 14.3133 3.37285 15.1634 4.56208C15.796 5.4471 15.9909 6.35609 16.0177 6.95595C16.0325 7.28611 16.0069 7.62119 15.9247 7.94129C15.7845 8.48762 15.4151 9.37155 14.6018 10.5034C14.4786 10.6749 14.3572 10.8507 14.2859 11.0497C13.9577 11.9663 13.9858 13.4523 14.5004 16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={1}
            />
            <motion.path
              d="M14 13H10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={2}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsStampIcon.displayName = 'HugeiconsStampIcon';
export { HugeiconsStampIcon };
