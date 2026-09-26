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

export interface HugeiconsMapPinHouseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsMapPinHouseIconProps extends HTMLAttributes<HTMLDivElement> {
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
    y: [0, -1.8, 0, -0.5, 0],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const HugeiconsMapPinHouseIcon = forwardRef<
  HugeiconsMapPinHouseIconHandle,
  HugeiconsMapPinHouseIconProps
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
              d="M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M21.3547 16.4469L18.8796 14.3254C18.6347 14.1154 18.3226 14 18 14C17.6774 14 17.3653 14.1154 17.1204 14.3254L14.6453 16.4469C14.2357 16.7979 14 17.3105 14 17.8499V18.5752C14 19.9081 14 20.5746 14.305 21.0616C14.4655 21.3179 14.6821 21.5345 14.9384 21.695C15.4254 22 16.0919 22 17.4248 22H18.5752C19.9081 22 20.5746 22 21.0616 21.695C21.3179 21.5345 21.5345 21.3179 21.695 21.0616C22 20.5746 22 19.9081 22 18.5752V17.8499C22 17.3105 21.7643 16.7979 21.3547 16.4469Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M18 19V22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M18 10.0355C18 5.59762 14.4183 2 10 2C5.58172 2 2 5.59762 2 10.0355C2 12.5731 3 14.5462 5 16.3086C6.07535 17.2562 7.82291 19.0316 9.04653 20.5628C9.27943 20.8543 9.63972 21 10 21"
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
HugeiconsMapPinHouseIcon.displayName = 'HugeiconsMapPinHouseIcon';
export { HugeiconsMapPinHouseIcon };
