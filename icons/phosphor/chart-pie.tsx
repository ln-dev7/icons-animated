/**
 * @license
 * MIT License
 *
 * Copyright (c) 2023 Phosphor Icons
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

export interface PhosphorChartPieIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorChartPieIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { 'transition': { 'duration': 0.75, 'ease': 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    'x': 0,
    'y': 0,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'x': [0, 5, 0],
    'y': [0, -8.66, 0],
    'transition': { 'duration': 0.9, 'delay': 0, 'ease': 'easeInOut' },
  },
};

const PhosphorChartPieIcon = forwardRef<
  PhosphorChartPieIconHandle,
  PhosphorChartPieIconProps
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
          viewBox="0 0 256 256"
          fill="currentColor"
          overflow="visible"
          aria-hidden="true"
          focusable="false"
        >
          <motion.g
            initial="normal"
            animate={controls}
            variants={ICON_VARIANTS}
            style={{ transformOrigin: '128px 128px' }}
          >
            <path d="M128,24A104,104,0,1,0,232,128A104.11,104.11,0,0,0,218.03183532973543,76.02009563674119L128,128ZM120,40.37v83l-71.89,41.5A88,88,0,0,1,120,40.37ZM128,216a88,88,0,0,1-71.87-37.27L207.89,91.12A88,88,0,0,1,128,216Z" />
            <motion.path
              d="M128,24L128,128L218.03183532973543,76.02009563674119A104.11,104.11,0,0,0,128,24ZM199.87,77.27L136,114.14V40.37A88,88,0,0,1,199.87,77.27ZM127.25,25V128H128.25V25ZM128,128l0.375,0.649519052838329L217.54080992595098,77.16961468957952L217.16580992595098,76.52009563674119Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
PhosphorChartPieIcon.displayName = 'PhosphorChartPieIcon';
export { PhosphorChartPieIcon };
