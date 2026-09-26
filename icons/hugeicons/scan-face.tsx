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

export interface HugeiconsScanFaceIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsScanFaceIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { scaleY: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    scaleY: [1, 1, 0.15, 1, 1],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    pathLength: [0.08, 1],
    opacity: [0.35, 1],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsScanFaceIcon = forwardRef<
  HugeiconsScanFaceIconHandle,
  HugeiconsScanFaceIconProps
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
              d="M8.49219 13C9.29029 14.2144 10.561 15 11.9922 15C13.4234 15 14.6941 14.2144 15.4922 13"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M9.11719 9H8.99219M9.24219 9C9.24219 9.13807 9.13026 9.25 8.99219 9.25C8.85412 9.25 8.74219 9.13807 8.74219 9C8.74219 8.86193 8.85412 8.75 8.99219 8.75C9.13026 8.75 9.24219 8.86193 9.24219 9Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '12px 9px' }}
            />
            <motion.path
              d="M15.1172 9H14.9922M15.2422 9C15.2422 9.13807 15.1303 9.25 14.9922 9.25C14.8541 9.25 14.7422 9.13807 14.7422 9C14.7422 8.86193 14.8541 8.75 14.9922 8.75C15.1303 8.75 15.2422 8.86193 15.2422 9Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '12px 9px' }}
            />
            <path
              d="M14.9922 21.5C16.8545 21.5 17.7857 21.5 18.5313 21.2286C19.7812 20.7737 20.7659 19.789 21.2208 18.5391C21.4922 17.7935 21.4922 16.8623 21.4922 15M8.99219 21.5C7.12987 21.5 6.19872 21.5 5.4531 21.2286C4.20315 20.7737 3.21851 19.789 2.76357 18.5391C2.49219 17.7935 2.49219 16.8623 2.49219 15M8.99219 2.5C7.12987 2.5 6.19872 2.5 5.4531 2.77138C4.20315 3.22633 3.21851 4.21096 2.76357 5.46091C2.49219 6.20653 2.49219 7.13769 2.49219 9M14.9922 2.5C16.8545 2.5 17.7857 2.5 18.5313 2.77138C19.7812 3.22633 20.7659 4.21096 21.2208 5.46091C21.4922 6.20653 21.4922 7.13769 21.4922 9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsScanFaceIcon.displayName = 'HugeiconsScanFaceIcon';
export { HugeiconsScanFaceIcon };
