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

export interface PhosphorRabbitIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorRabbitIconProps extends HTMLAttributes<HTMLDivElement> {
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
    y: [0, -11.7333, 0],
    rotate: [0, -4, 4, 0],
    transition: { duration: 0.75, ease: 'easeInOut' },
  },
};

const PhosphorRabbitIcon = forwardRef<
  PhosphorRabbitIconHandle,
  PhosphorRabbitIconProps
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
            <path d="M112,164a12,12,0,1,1-12-12A12,12,0,0,1,112,164Zm44-12a12,12,0,1,0,12,12A12,12,0,0,0,156,152Zm60,36a52,52,0,0,1-88,37.52A52,52,0,1,1,56.72,149.8,71.58,71.58,0,0,1,63,129C44,91.1,32.53,40.76,45.64,19.08A22,22,0,0,1,65.06,8c14.12,0,26,11.89,36.44,36.36,6.22,14.62,10.85,31.32,14,44.74a71.8,71.8,0,0,1,25,0c3.13-13.42,7.76-30.12,14-44.74C164.9,19.89,176.82,8,190.94,8a22,22,0,0,1,19.42,11.08C223.47,40.76,212,91.1,193,129a71.58,71.58,0,0,1,6.26,20.76A51.77,51.77,0,0,1,216,188ZM155.89,93.63a71.72,71.72,0,0,1,26.88,19.64A218.45,218.45,0,0,0,197.6,67.08c3.49-18.13,3.15-33-.93-39.72A6,6,0,0,0,190.94,24c-6.61,0-14.52,9.7-21.72,26.62C163.29,64.56,158.87,80.74,155.89,93.63ZM73.23,113.27a71.72,71.72,0,0,1,26.88-19.64c-3-12.89-7.4-29.07-13.33-43C79.58,33.7,71.67,24,65.06,24a6,6,0,0,0-5.73,3.36C55.25,34.1,54.91,49,58.4,67.08A218.45,218.45,0,0,0,73.23,113.27ZM200,188a35.87,35.87,0,0,0-13.34-28,8,8,0,0,1-2.92-5.45,56,56,0,0,0-111.48,0A8,8,0,0,1,69.34,160a36,36,0,1,0,47.28,54.21l-9.74-8.09a8,8,0,1,1,10.24-12.3L128,202.9l10.88-9.05a8,8,0,0,1,10.24,12.3l-9.74,8.09A36,36,0,0,0,200,188Z" />
          </motion.g>
        </svg>
      </div>
    );
  }
);
PhosphorRabbitIcon.displayName = 'PhosphorRabbitIcon';
export { PhosphorRabbitIcon };
