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

export interface HugeiconsBluetoothSearchingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsBluetoothSearchingIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    opacity: [1, 0.2, 1],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsBluetoothSearchingIcon = forwardRef<
  HugeiconsBluetoothSearchingIconHandle,
  HugeiconsBluetoothSearchingIconProps
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
              d="M10.0014 11.9979L13.4202 8.57917C14.1575 7.84185 14.5262 7.47319 14.5015 7.0269C14.4768 6.58062 14.0692 6.25445 13.254 5.6021C11.8414 4.47176 11.1351 3.90659 10.5683 4.17899C10.0014 4.4514 10.0014 5.3547 10.0014 7.1613V11.9979ZM10.0014 11.9979L10 11.9993M10.0014 11.9979V12.0007M10 11.9993L5 16.9994M10 11.9993L10.0014 12.0007M10 11.9993L5 6.99932M10.0014 12.0007V16.8374C10.0014 18.644 10.0014 19.5473 10.5683 19.8197C11.1352 20.0921 11.8414 19.5269 13.254 18.3966C14.0692 17.7442 14.4768 17.4181 14.5015 16.9718C14.5262 16.5255 14.1575 16.1568 13.4202 15.4195L10.0014 12.0007Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M18.1353 9.49C18.7019 10.2006 19.0096 11.0829 19.0078 11.9918C19.006 12.9006 18.6947 13.7817 18.1253 14.49M15 11.99L15 12"
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
HugeiconsBluetoothSearchingIcon.displayName = 'HugeiconsBluetoothSearchingIcon';
export { HugeiconsBluetoothSearchingIcon };
