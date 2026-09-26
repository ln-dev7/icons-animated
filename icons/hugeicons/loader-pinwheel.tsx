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

export interface HugeiconsLoaderPinwheelIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsLoaderPinwheelIconProps extends HTMLAttributes<HTMLDivElement> {
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
    rotate: [0, 90, 180, 360],
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
};

const HugeiconsLoaderPinwheelIcon = forwardRef<
  HugeiconsLoaderPinwheelIconHandle,
  HugeiconsLoaderPinwheelIconProps
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
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M8.99997 3.51721C9.58182 3.47053 10.1737 3.51405 10.7492 3.65094C12.05 3.96034 13.1607 4.72137 13.837 5.76663C14.5133 6.81189 14.6998 8.05575 14.3555 9.22457C14.0112 10.3934 13.1642 11.3914 12.001 11.9991C10.8378 12.6069 9.99082 13.6049 9.6465 14.7737C9.30219 15.9425 9.48869 17.1864 10.165 18.2317C10.8413 19.2769 11.952 20.038 13.2527 20.3473C13.8276 20.4841 14.4188 20.5277 15 20.4812"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M17.8455 5.16003C18.1769 5.6406 18.4352 6.17494 18.6044 6.74182C18.9868 8.023 18.8831 9.36541 18.316 10.4737C17.7489 11.5821 16.765 12.3655 15.5806 12.6517C14.3962 12.938 13.1084 12.7035 12.0005 12C10.8926 11.2964 9.60477 11.062 8.42039 11.3482C7.236 11.6344 6.25204 12.4179 5.68497 13.5262C5.1179 14.6345 5.01417 15.9769 5.39661 17.2581C5.56562 17.8243 5.82347 18.3581 6.15425 18.8382"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M20.8459 13.6421C20.5954 14.1693 20.2618 14.6602 19.8554 15.0901C18.9371 16.0619 17.7227 16.6433 16.4793 16.7064C15.236 16.7694 14.0655 16.309 13.2254 15.4264C12.3853 14.5438 11.9445 13.3113 11.9998 12.0001C12.0551 10.6888 11.6143 9.45635 10.7742 8.57375C9.93413 7.69115 8.76366 7.23074 7.52029 7.29381C6.27692 7.35687 5.06249 7.93825 4.14417 8.91004C3.73833 9.33951 3.40501 9.82969 3.1546 10.3562"
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
HugeiconsLoaderPinwheelIcon.displayName = 'HugeiconsLoaderPinwheelIcon';
export { HugeiconsLoaderPinwheelIcon };
