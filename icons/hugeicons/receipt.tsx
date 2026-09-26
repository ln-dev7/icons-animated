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

export interface HugeiconsReceiptIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsReceiptIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.65, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    pathLength: [0.08, 1],
    opacity: [0.35, 1],
    transition: { duration: 0.8, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsReceiptIcon = forwardRef<
  HugeiconsReceiptIconHandle,
  HugeiconsReceiptIconProps
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
              d="M8.06024 2.72546L7.88823 2.86189C7.70302 3.00878 7.61041 3.08223 7.51824 3.12852C7.19917 3.28874 6.81809 3.26781 6.51881 3.07364C6.43236 3.01754 6.3485 2.93441 6.18079 2.76813C5.78074 2.37152 5.58072 2.17321 5.42995 2.10043C4.89043 1.83999 4.24264 2.10601 4.04689 2.6684C3.99219 2.82556 3.99219 3.10601 3.99219 3.66691V20.698C3.99219 20.9548 3.99219 21.0832 4.00377 21.158C4.11773 21.8938 4.97843 22.2473 5.58378 21.8069C5.64532 21.7621 5.73693 21.6713 5.92007 21.4897C6.03528 21.3755 6.09297 21.3183 6.14757 21.2735C6.65461 20.8578 7.37571 20.8182 7.92595 21.1759C7.98522 21.2144 8.04886 21.2649 8.17614 21.3658L8.31228 21.4738C8.54263 21.6565 8.65783 21.7479 8.77324 21.8104C9.22131 22.053 9.76307 22.053 10.2111 21.8104C10.3265 21.7479 10.4417 21.6565 10.6721 21.4738L10.7422 21.4182C11.0392 21.1827 11.1877 21.0649 11.3406 20.9918C11.7523 20.7949 12.2321 20.7949 12.6438 20.9918C12.7967 21.0649 12.9452 21.1827 13.2422 21.4182L13.3123 21.4738C13.5426 21.6565 13.6578 21.7479 13.7732 21.8104C14.2213 22.053 14.7631 22.053 15.2111 21.8104C15.3265 21.7479 15.4417 21.6565 15.6721 21.4738L15.8082 21.3658C15.9355 21.2649 15.9992 21.2144 16.0584 21.1759C16.6087 20.8182 17.3298 20.8578 17.8368 21.2735C17.8914 21.3183 17.9491 21.3755 18.0643 21.4897C18.2475 21.6713 18.3391 21.7621 18.4006 21.8069C19.0059 22.2473 19.8666 21.8938 19.9806 21.158C19.9922 21.0832 19.9922 20.9548 19.9922 20.698V3.66691C19.9922 3.10601 19.9922 2.82556 19.9375 2.6684C19.7417 2.10601 19.0939 1.83999 18.5544 2.10043C18.4037 2.17321 18.2036 2.37152 17.8036 2.76813C17.6359 2.93441 17.552 3.01754 17.4656 3.07364C17.1663 3.26781 16.7852 3.28874 16.4661 3.12852C16.374 3.08223 16.2814 3.00878 16.0961 2.86189L15.9241 2.72546C15.4536 2.35223 15.2183 2.16562 14.9617 2.08178C14.6568 1.98214 14.3276 1.98214 14.0227 2.08178C13.7661 2.16562 13.5308 2.35224 13.0602 2.72546L12.9922 2.77943C12.635 3.06273 12.4564 3.20438 12.2583 3.2586C12.0842 3.30627 11.9002 3.30627 11.7261 3.2586C11.528 3.20438 11.3494 3.06273 10.9922 2.77943L10.9241 2.72546C10.4536 2.35223 10.2183 2.16562 9.96172 2.08178C9.65676 1.98214 9.32761 1.98214 9.02266 2.08178C8.76609 2.16562 8.53081 2.35223 8.06024 2.72546Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M11.9922 8.5H13.4922C14.3206 8.5 14.9922 9.17157 14.9922 10M11.9922 8.5H10.4922C9.66376 8.5 8.99219 9.17157 8.99219 10V10.5C8.99219 11.3284 9.66376 12 10.4922 12H13.4922C14.3206 12 14.9922 12.6716 14.9922 13.5V14C14.9922 14.8284 14.3206 15.5 13.4922 15.5H11.9922M11.9922 8.5V7M11.9922 15.5H10.4922C9.66376 15.5 8.99219 14.8284 8.99219 14M11.9922 15.5V17"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsReceiptIcon.displayName = 'HugeiconsReceiptIcon';
export { HugeiconsReceiptIcon };
