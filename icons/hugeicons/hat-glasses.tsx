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

export interface HugeiconsHatGlassesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsHatGlassesIconProps extends HTMLAttributes<HTMLDivElement> {
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

const HugeiconsHatGlassesIcon = forwardRef<
  HugeiconsHatGlassesIconHandle,
  HugeiconsHatGlassesIconProps
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
              d="M2 11L2.09969 11.0498C3.34939 11.6747 4.72741 12 6.12461 12H17.8754C19.2726 12 20.6506 11.6747 21.9003 11.0498L22 11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={0}
            />
            <motion.path
              d="M4.5 11.75L5.95607 6.02568C6.2363 4.92402 6.37641 4.3732 6.63691 4.03341C7.10346 3.42485 7.86014 3.13788 8.59632 3.29029C9.00738 3.37539 9.45841 3.70202 10.3605 4.35529C10.833 4.69747 11.0692 4.86855 11.3172 4.96174C11.7583 5.12751 12.2417 5.12751 12.6828 4.96174C12.9308 4.86855 13.167 4.69747 13.6395 4.35529C14.5416 3.70202 14.9926 3.37539 15.4037 3.29029C16.1399 3.13788 16.8965 3.42485 17.3631 4.03341C17.6236 4.37319 17.7637 4.92403 18.0439 6.02568L19.5 11.75"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={1}
            />
            <motion.path
              d="M17 20.75C18.6569 20.75 20 19.4069 20 17.75C20 16.0931 18.6569 14.75 17 14.75C15.3431 14.75 14 16.0931 14 17.75C14 19.4069 15.3431 20.75 17 20.75Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={2}
            />
            <motion.path
              d="M7 20.75C8.65685 20.75 10 19.4069 10 17.75C10 16.0931 8.65685 14.75 7 14.75C5.34315 14.75 4 16.0931 4 17.75C4 19.4069 5.34315 20.75 7 20.75Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={3}
            />
            <motion.path
              d="M10 17.75H14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={4}
            />
            <motion.path
              d="M2 17.75H4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={5}
            />
            <motion.path
              d="M20 17.75H22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={6}
            />
            <motion.path
              d="M5.5 9H18.4962"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={7}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsHatGlassesIcon.displayName = 'HugeiconsHatGlassesIcon';
export { HugeiconsHatGlassesIcon };
