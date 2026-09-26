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

export interface HugeiconsFoldersIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsFoldersIconProps extends HTMLAttributes<HTMLDivElement> {
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
    y: [0, -0.7, 0],
    scale: [1, 0.96, 1.04, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
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
      duration: 0.5499999999999999,
      delay: Math.min(index * 0.055, 0.22),
      ease: 'easeInOut',
    },
  }),
};

const HugeiconsFoldersIcon = forwardRef<
  HugeiconsFoldersIconHandle,
  HugeiconsFoldersIconProps
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
              d="M7.5 9.05568H16.275C18.171 9.05568 19.119 9.05568 19.8 9.50509C20.0949 9.69965 20.348 9.94965 20.545 10.2408C21 10.9134 21 11.8497 21 13.7223C21 16.8434 21 18.4039 20.2416 19.5249C19.9133 20.0102 19.4914 20.4268 19.0001 20.7511C17.8651 21.5001 16.285 21.5001 13.125 21.5001H12C7.75736 21.5001 5.63604 21.5001 4.31802 20.1984C3 18.8966 3 16.8015 3 12.6112V9.89503C3 8.28039 3 7.47307 3.34228 6.86729C3.58628 6.43547 3.94704 6.07916 4.38426 5.83818C4.99761 5.50012 5.81502 5.50012 7.44984 5.50012C8.49722 5.50012 9.02091 5.50012 9.47933 5.66991C10.526 6.05756 10.9576 6.99663 11.4299 7.92957L12 9.05568"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={0}
            />
            <motion.path
              d="M3 2.5001H8.5C9.47008 2.5001 10.4182 2.47179 11.2387 3.05532C12.29 3.80299 12.71 5.1972 13.7613 5.94487C14.5818 6.52841 15.5299 6.5001 16.5 6.5001H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={1}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsFoldersIcon.displayName = 'HugeiconsFoldersIcon';
export { HugeiconsFoldersIcon };
