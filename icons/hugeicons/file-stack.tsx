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

export interface HugeiconsFileStackIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsFileStackIconProps extends HTMLAttributes<HTMLDivElement> {
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
    y: [0, -0.7, 0],
    scale: [1, 0.96, 1.04, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

const ELEMENT_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.18 },
  },
  animate: (index: number) => ({
    ...{ pathLength: [0.3, 1], opacity: [0.45, 1] },
    transition: {
      duration: 0.5499999999999999,
      delay: Math.min(index * 0.055, 0.22),
      ease: 'easeInOut',
    },
  }),
};

const HugeiconsFileStackIcon = forwardRef<
  HugeiconsFileStackIconHandle,
  HugeiconsFileStackIconProps
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
              d="M20.6527 3.65269L20.0355 3.03553C19.6795 2.67949 19.5015 2.50147 19.2971 2.36916C19.0625 2.21732 18.8022 2.1095 18.5289 2.05099C18.2908 2 18.0391 2 17.5355 2C16.3835 2 15.8075 2 15.3581 2.20169C14.844 2.43247 14.4325 2.844 14.2017 3.35815C14 3.80748 14 4.3835 14 5.53553V8C14 9.59133 14 10.387 14.3768 10.9614C14.5497 11.2251 14.7749 11.4503 15.0386 11.6232C15.613 12 16.4087 12 18 12C19.5913 12 20.387 12 20.9614 11.6232C21.2251 11.4503 21.4503 11.2251 21.6232 10.9614C22 10.387 22 9.59133 22 8V6.90538C22 5.96526 22 5.49519 21.8249 5.07252C21.6498 4.64985 21.3175 4.31746 20.6527 3.65269Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={0}
            />
            <motion.path
              d="M16 15.9571C15.8185 16.2218 15.5822 16.448 15.3055 16.6216C14.7027 17 13.8677 17 12.1977 17C10.5277 17 9.69273 17 9.08989 16.6216C8.81325 16.448 8.57686 16.2218 8.3954 15.9571C8 15.3802 8 14.5812 8 12.9831V10.5082C8 9.35133 8 8.77287 8.21166 8.32165C8.45385 7.80532 8.88571 7.39206 9.42527 7.1603C9.61718 7.07787 9.83111 7.02899 10.0989 7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={1}
            />
            <motion.path
              d="M10 20.9571C9.81855 21.2218 9.58216 21.448 9.30551 21.6216C8.70267 22 7.86768 22 6.1977 22C4.52772 22 3.69273 22 3.08989 21.6216C2.81325 21.448 2.57686 21.2218 2.3954 20.9571C2 20.3802 2 19.5812 2 17.9831V15.5082C2 14.3513 2 13.7729 2.21166 13.3216C2.45385 12.8053 2.88571 12.3921 3.42527 12.1603C3.61718 12.0779 3.83111 12.029 4.09885 12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={2}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsFileStackIcon.displayName = 'HugeiconsFileStackIcon';
export { HugeiconsFileStackIcon };
