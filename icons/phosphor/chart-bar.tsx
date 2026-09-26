/**
 * @license
 * MIT License
 *
 * Copyright (c) 2023 Phosphor Icons
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

export interface PhosphorChartBarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorChartBarIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { scaleY: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    scaleY: [1, 0.48, 1],
    transition: { duration: 0.85, delay: 0.0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { scaleY: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    scaleY: [1, 0.48, 1],
    transition: { duration: 0.85, delay: 0.12, ease: 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: { scaleY: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    scaleY: [1, 0.48, 1],
    transition: { duration: 0.85, delay: 0.24, ease: 'easeInOut' },
  },
};

const PhosphorChartBarIcon = forwardRef<
  PhosphorChartBarIconHandle,
  PhosphorChartBarIconProps
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
          viewBox="0 0 256 256"
          fill="currentColor"
          overflow="visible"
          aria-hidden="true"
          focusable="false"
        >
          <motion.g
            initial="normal"
            animate={controls}
            variants={ICON_VARIANTS}
            style={{ transformOrigin: '128px 128px' }}
          >
            <motion.path
              d="M48,128H96a8,8,0,0,1,8,8V208H40V136a8,8,0,0,1,8-8ZM56,144V200H88V144Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 208px' }}
            />
            <motion.path
              d="M96,80H152a8,8,0,0,1,8,8V208H88V88a8,8,0,0,1,8-8ZM104,96V200H144V96Z"
              variants={DETAIL_1_VARIANTS}
              style={{ transformOrigin: '128px 208px' }}
            />
            <motion.path
              d="M152,32H208a8,8,0,0,1,8,8V208H144V40a8,8,0,0,1,8-8ZM160,48V200H200V48Z"
              variants={DETAIL_2_VARIANTS}
              style={{ transformOrigin: '128px 208px' }}
            />
            <path d="M32,200a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16Z" />
          </motion.g>
        </svg>
      </div>
    );
  }
);
PhosphorChartBarIcon.displayName = 'PhosphorChartBarIcon';
export { PhosphorChartBarIcon };
