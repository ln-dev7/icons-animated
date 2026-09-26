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

export interface HugeiconsLockOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsLockOpenIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { rotate: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    rotate: [0, -12, 0],
    transition: { duration: 0.8, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsLockOpenIcon = forwardRef<
  HugeiconsLockOpenIconHandle,
  HugeiconsLockOpenIconProps
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
              d="M13.4955 9H10.4961C8.16128 9 6.99386 9 6.11018 9.47237C5.41244 9.84535 4.84098 10.4169 4.46807 11.1146C3.99578 11.9984 3.99589 13.1658 3.9961 15.5006C3.99632 17.835 3.99643 19.0023 4.46877 19.8858C4.84172 20.5835 5.41317 21.1548 6.11085 21.5277C6.99445 22 8.16166 22 10.4961 22H13.4955C15.8301 22 16.9974 22 17.8811 21.5277C18.5788 21.1548 19.1503 20.5833 19.5232 19.8856C19.9955 19.0019 19.9955 17.8346 19.9955 15.5C19.9955 13.1654 19.9955 11.9981 19.5232 11.1144C19.1503 10.4167 18.5788 9.84525 17.8811 9.47231C16.9974 9 15.8301 9 13.4955 9Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M7.49609 9V6.5C7.49609 4.01472 9.51081 2 11.9961 2C13.9554 2 15.3783 3.25221 15.9961 5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '7.5px 9px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsLockOpenIcon.displayName = 'HugeiconsLockOpenIcon';
export { HugeiconsLockOpenIcon };
