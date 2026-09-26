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

export interface HugeiconsEvChargerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsEvChargerIconProps extends HTMLAttributes<HTMLDivElement> {
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

const HugeiconsEvChargerIcon = forwardRef<
  HugeiconsEvChargerIconHandle,
  HugeiconsEvChargerIconProps
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
              d="M2.75 21H15.75"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M15 21V8.5C15 6.15442 15 4.98164 14.3801 4.17372C14.2205 3.96572 14.0343 3.77954 13.8263 3.61994C13.0184 3 11.8456 3 9.5 3C7.15442 3 5.98164 3 5.17372 3.61994C4.96572 3.77954 4.77954 3.96572 4.61994 4.17372C4 4.98164 4 6.15442 4 8.5V21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M9.25 7L8.29498 8.91459C8.05232 9.40106 7.93099 9.6443 8.04065 9.82215C8.15031 10 8.42161 10 8.96421 10H9.53579C10.0784 10 10.3497 10 10.4594 10.1779C10.569 10.3557 10.4477 10.5989 10.205 11.0854L9.25 13"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <path
              d="M17.75 5C18.2144 5 18.4466 5 18.6416 5.02567C19.9878 5.2029 21.0471 6.26222 21.2243 7.60842C21.25 7.80337 21.25 8.03558 21.25 8.5V17.25C21.25 18.2165 20.4665 19 19.5 19C18.5335 19 17.75 18.2165 17.75 17.25V15.75C17.75 15.0522 17.75 14.7033 17.6639 14.4194C17.47 13.7802 16.9698 13.28 16.3306 13.0861C16.0467 13 15.6978 13 15 13"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M7.5 17H11.5"
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
HugeiconsEvChargerIcon.displayName = 'HugeiconsEvChargerIcon';
export { HugeiconsEvChargerIcon };
