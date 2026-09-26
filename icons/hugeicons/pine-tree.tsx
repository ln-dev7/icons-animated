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

export interface HugeiconsPineTreeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsPineTreeIconProps extends HTMLAttributes<HTMLDivElement> {
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
    rotate: [0, -7, 5, -2, 0],
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

const HugeiconsPineTreeIcon = forwardRef<
  HugeiconsPineTreeIconHandle,
  HugeiconsPineTreeIconProps
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
              d="M9.00029 18H8.14381C6.28118 18 5.34987 18 5.06954 17.4356C4.78921 16.8713 5.37195 16.1695 6.53741 14.7659L8.3946 12.5293C7.21777 12.5293 6.62936 12.5293 6.34654 12.3092C6.07959 12.1015 5.93719 11.779 5.9667 11.449C5.99796 11.0995 6.40519 10.6892 7.21967 9.86865L9.51513 7.55599C8.56581 7.55599 8.09115 7.55599 7.84713 7.41507C7.45628 7.18937 7.26532 6.74247 7.37756 6.31617C7.44763 6.05 7.78408 5.72657 8.45699 5.07971L10.6296 2.99124C11.3177 2.32974 11.6618 1.99899 12.0883 2C12.5148 2.00101 12.8571 2.33339 13.5419 2.99813L15.6736 5.06754C16.3542 5.72818 16.6945 6.05851 16.7616 6.33134C16.8645 6.74982 16.6774 7.18482 16.2977 7.40951C16.0501 7.55599 15.5677 7.55599 14.6029 7.55599L16.5179 9.72481C17.3938 10.7168 17.8317 11.2128 17.7869 11.636C17.7636 11.8558 17.6651 12.0619 17.5071 12.2218C17.2029 12.5293 16.528 12.5293 15.1783 12.5293L17.1952 14.6725C18.5397 16.1011 19.2119 16.8155 18.9407 17.4077C18.6695 18 17.6701 18 15.6714 18H15.1783"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M12 14V22"
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
HugeiconsPineTreeIcon.displayName = 'HugeiconsPineTreeIcon';
export { HugeiconsPineTreeIcon };
