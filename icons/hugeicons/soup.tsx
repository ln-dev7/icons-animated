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

export interface HugeiconsSoupIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsSoupIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.85, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, -0.8, 0],
    opacity: [1, 0.25, 1],
    transition: { duration: 0.75, delay: 0.0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { y: 0, opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, -0.8, 0],
    opacity: [1, 0.25, 1],
    transition: { duration: 0.75, delay: 0.08, ease: 'easeInOut' },
  },
};

const HugeiconsSoupIcon = forwardRef<
  HugeiconsSoupIconHandle,
  HugeiconsSoupIconProps
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
              d="M7.08049 17.5755C5.76847 16.8585 3.92416 15.4499 3.21951 13.0027C2.98783 12.1981 2.87199 11.7958 3.17408 11.3979C3.47618 11 3.97511 11 4.97297 11H19.0114C20.0093 11 20.5082 11 20.8103 11.3979C21.1124 11.7958 20.9965 12.1981 20.7649 13.0027C20.0605 15.4489 18.2174 16.8573 16.9055 17.5746C16.812 17.6258 16.7652 17.6514 16.7521 17.659C16.3161 17.9148 16.1524 18.3364 16.3025 18.8167C16.307 18.8311 16.318 18.8629 16.34 18.9263C16.3665 19.0029 16.3798 19.0412 16.3887 19.0708C16.6706 20.0083 15.9878 20.9586 15.0036 20.9987C14.9726 21 14.9318 21 14.8502 21L9.14926 20.9997C9.0602 20.9997 9.01557 20.9997 8.98167 20.9982C8.00618 20.9546 7.32822 20.0167 7.59841 19.0847C7.6078 19.0522 7.62205 19.0103 7.65053 18.9264C7.6731 18.86 7.68441 18.8267 7.6892 18.8109C7.83375 18.3337 7.67064 17.9175 7.23931 17.663C7.22502 17.6545 7.17675 17.6282 7.08049 17.5755Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M11.4922 3L11.9922 3.5C12.5445 4.05228 12.5445 4.94772 11.9922 5.5C11.4399 6.05228 11.4399 6.94772 11.9922 7.5L12.4922 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M6.49219 3L6.99219 3.5C7.54447 4.05228 7.54447 4.94772 6.99219 5.5C6.4399 6.05228 6.4399 6.94772 6.99219 7.5L7.49219 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <path
              d="M15.9922 11L18.9922 5"
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
HugeiconsSoupIcon.displayName = 'HugeiconsSoupIcon';
export { HugeiconsSoupIcon };
