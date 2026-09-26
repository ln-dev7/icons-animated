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

export interface PhosphorSunIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorSunIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.8, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    rotate: [0, 24, 0],
    scale: [1, 1.08, 1],
    transition: { duration: 0.9, delay: 0, ease: 'easeInOut' },
  },
};

const PhosphorSunIcon = forwardRef<PhosphorSunIconHandle, PhosphorSunIconProps>(
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
            <path d="M192,128a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128ZM176,128a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128Z" />
            <motion.path
              d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M58.34,186.34l-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M197.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M128,208a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
            <motion.path
              d="M240,120H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '128px 128px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
PhosphorSunIcon.displayName = 'PhosphorSunIcon';
export { PhosphorSunIcon };
