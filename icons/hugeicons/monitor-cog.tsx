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

export interface HugeiconsMonitorCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsMonitorCogIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { rotate: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    rotate: [0, 90, 180],
    transition: { duration: 0.8, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsMonitorCogIcon = forwardRef<
  HugeiconsMonitorCogIconHandle,
  HugeiconsMonitorCogIconProps
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
              d="M15.9922 21H13.9922H9.99219H7.99219"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M10.4922 21V17M13.4922 17V21"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M15.9922 3H7.99219C5.16376 3 3.74955 3 2.87087 3.87868C1.99219 4.75736 1.99219 6.17157 1.99219 9V11C1.99219 13.8284 1.99219 15.2426 2.87087 16.1213C3.74955 17 5.16376 17 7.99219 17H15.9922C18.8206 17 20.2348 17 21.1135 16.1213C21.9922 15.2426 21.9922 13.8284 21.9922 11V9C21.9922 6.17157 21.9922 4.75736 21.1135 3.87868C20.2348 3 18.8206 3 15.9922 3Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M11.9922 12L11.9922 13.5M11.9922 12C12.7292 12 13.3731 11.6013 13.72 11.0079M11.9922 12C11.2552 12 10.6113 11.6013 10.2643 11.0079M11.9922 8L11.9922 6.5M11.9922 8C12.7292 8 13.3731 8.39866 13.72 8.99209M10.2643 11.0079C10.0913 10.712 9.99219 10.3676 9.99219 10C9.99219 9.63244 10.0913 9.28804 10.2644 8.99209C10.6113 8.39865 11.2552 8 11.9922 8M14.9922 8.25L13.72 8.99209M8.99219 11.75L10.2643 11.0079M14.9922 11.75L13.72 11.0079M8.99219 8.25L10.2644 8.99209M13.72 11.0079C13.893 10.7119 13.9922 10.3676 13.9922 10C13.9922 9.63244 13.893 9.28805 13.72 8.99209"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '12px 10px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsMonitorCogIcon.displayName = 'HugeiconsMonitorCogIcon';
export { HugeiconsMonitorCogIcon };
