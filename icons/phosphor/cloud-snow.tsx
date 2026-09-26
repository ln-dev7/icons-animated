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

export interface PhosphorCloudSnowIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorCloudSnowIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, 8, 0],
    opacity: [1, 0.35, 1],
    transition: { duration: 0.85, delay: 0.0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, 8, 0],
    opacity: [1, 0.35, 1],
    transition: { duration: 0.85, delay: 0.07, ease: 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, 8, 0],
    opacity: [1, 0.35, 1],
    transition: { duration: 0.85, delay: 0.14, ease: 'easeInOut' },
  },
};

const DETAIL_3_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, 8, 0],
    opacity: [1, 0.35, 1],
    transition: {
      duration: 0.85,
      delay: 0.21000000000000002,
      ease: 'easeInOut',
    },
  },
};

const DETAIL_4_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, 8, 0],
    opacity: [1, 0.35, 1],
    transition: { duration: 0.85, delay: 0.28, ease: 'easeInOut' },
  },
};

const PhosphorCloudSnowIcon = forwardRef<
  PhosphorCloudSnowIconHandle,
  PhosphorCloudSnowIconProps
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
            <path d="M232,92a76.08,76.08,0,0,1-76,76H76A52,52,0,0,1,76,64a53.26,53.26,0,0,1,8.92.76A76.08,76.08,0,0,1,232,92ZM216,92A60.06,60.06,0,0,0,96,88.46a8,8,0,0,1-16-.92q.21-3.66.77-7.23A38.11,38.11,0,0,0,76,80a36,36,0,0,0,0,72h80A60.07,60.07,0,0,0,216,92Z" />
            <motion.path
              d="M88,196a12,12,0,1,1-12-12A12,12,0,0,1,88,196Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M116,200a12,12,0,1,0,12,12A12,12,0,0,0,116,200Z"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M164,184a12,12,0,1,0,12,12A12,12,0,0,0,164,184Z"
              variants={DETAIL_2_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M68,224a12,12,0,1,0,12,12A12,12,0,0,0,68,224Z"
              variants={DETAIL_3_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M156,224a12,12,0,1,0,12,12A12,12,0,0,0,156,224Z"
              variants={DETAIL_4_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
PhosphorCloudSnowIcon.displayName = 'PhosphorCloudSnowIcon';
export { PhosphorCloudSnowIcon };
