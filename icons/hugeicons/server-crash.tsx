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

export interface HugeiconsServerCrashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsServerCrashIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.75, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: { opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    opacity: [1, 0.2, 1, 0.45, 1],
    transition: { duration: 0.75, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsServerCrashIcon = forwardRef<
  HugeiconsServerCrashIconHandle,
  HugeiconsServerCrashIconProps
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
              d="M12.5709 8.5L10.4922 12H13.4925L11.4141 15.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <path
              d="M4.99218 11.9957C3.7524 11.9777 3.04952 11.8858 2.57797 11.4142C1.99219 10.8284 1.99219 9.88562 1.99219 8C1.99219 6.11438 1.99219 5.17157 2.57797 4.58579C3.16376 4 4.10657 4 5.99219 4H17.9922C19.8778 4 20.8206 4 21.4064 4.58579C21.9922 5.17157 21.9922 6.11438 21.9922 8C21.9922 9.88562 21.9922 10.8284 21.4064 11.4142C20.9349 11.8858 20.232 11.9777 18.9922 11.9957"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M18.9922 12.0049C20.232 12.0228 20.9349 12.1148 21.4064 12.5863C21.9922 13.1721 21.9922 14.1149 21.9922 16.0006C21.9922 17.8862 21.9922 18.829 21.4064 19.4148C20.8206 20.0006 19.8778 20.0006 17.9922 20.0006H5.99219C4.10657 20.0006 3.16376 20.0006 2.57797 19.4148C1.99219 18.829 1.99219 17.8862 1.99219 16.0005C1.99219 14.1148 1.99219 13.1719 2.57798 12.5862C3.04821 12.1159 3.74849 12.0232 4.98181 12.0049"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M6.11719 8H5.99219M6.24219 8C6.24219 8.13807 6.13026 8.25 5.99219 8.25C5.85412 8.25 5.74219 8.13807 5.74219 8C5.74219 7.86193 5.85412 7.75 5.99219 7.75C6.13026 7.75 6.24219 7.86193 6.24219 8Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M6.11719 16H5.99219M6.24219 16C6.24219 16.1381 6.13026 16.25 5.99219 16.25C5.85412 16.25 5.74219 16.1381 5.74219 16C5.74219 15.8619 5.85412 15.75 5.99219 15.75C6.13026 15.75 6.24219 15.8619 6.24219 16Z"
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
HugeiconsServerCrashIcon.displayName = 'HugeiconsServerCrashIcon';
export { HugeiconsServerCrashIcon };
