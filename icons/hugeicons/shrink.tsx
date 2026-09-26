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

export interface HugeiconsShrinkIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsShrinkIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.6, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: { x: 0, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    x: [0, -0.65, 0],
    y: [0, -0.65, 0],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { x: 0, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    x: [0, 0.65, 0],
    y: [0, -0.65, 0],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: { x: 0, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    x: [0, 0.65, 0],
    y: [0, 0.65, 0],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_3_VARIANTS: Variants = {
  normal: { x: 0, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    x: [0, -0.65, 0],
    y: [0, 0.65, 0],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsShrinkIcon = forwardRef<
  HugeiconsShrinkIconHandle,
  HugeiconsShrinkIconProps
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
              d="M14.2224 17.9944C14.2119 17.2445 13.6966 14.761 14.2231 14.2344C14.7497 13.708 17.2324 14.2245 17.9821 14.2352M20.9922 20.9978L14.6074 14.6144"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M9.76223 17.9943C9.77273 17.2444 10.288 14.7608 9.76144 14.2343C9.2349 13.7079 6.75219 14.2244 6.00248 14.2351M2.99243 20.9977L9.37721 14.6143"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M6.00008 9.76109C6.74982 9.77066 9.23335 10.2829 9.75907 9.75561C10.2847 9.22828 9.76527 6.74557 9.75359 5.99568M9.36958 9.36718L2.99438 3.0022"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_2_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M17.9842 9.76109C17.2345 9.77066 14.751 10.2829 14.2253 9.75561C13.6996 9.22828 14.2191 6.74557 14.2307 5.99568M14.6147 9.36718L20.9899 3.0022"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_3_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsShrinkIcon.displayName = 'HugeiconsShrinkIcon';
export { HugeiconsShrinkIcon };
