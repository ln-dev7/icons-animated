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

export interface HugeiconsCloudRainWindIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsCloudRainWindIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.9, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    x: [0, -0.6, 0],
    y: [0, 1.3, 0],
    opacity: [1, 0.25, 1],
    transition: { duration: 0.65, delay: 0.0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    x: [0, -0.6, 0],
    y: [0, 1.3, 0],
    opacity: [1, 0.25, 1],
    transition: { duration: 0.65, delay: 0.07, ease: 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    x: [0, -0.6, 0],
    y: [0, 1.3, 0],
    opacity: [1, 0.25, 1],
    transition: { duration: 0.65, delay: 0.14, ease: 'easeInOut' },
  },
};

const HugeiconsCloudRainWindIcon = forwardRef<
  HugeiconsCloudRainWindIconHandle,
  HugeiconsCloudRainWindIconProps
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
            <path
              d="M17.4776 9.00005C17.485 9.00002 17.4925 9 17.5 9C19.9853 9 22 11.0147 22 13.5C22 15.0602 21.206 16.435 20 17.2422M16.9003 11C17.2119 10.3904 17.4131 9.71494 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 14.6358 2.78555 16.0882 4 17.0004M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.78232 8 8.52268 8.17967 9.18206 8.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M10.1992 22L12.1992 17"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M9 15L7 20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M17 15L15 20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_2_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsCloudRainWindIcon.displayName = 'HugeiconsCloudRainWindIcon';
export { HugeiconsCloudRainWindIcon };
