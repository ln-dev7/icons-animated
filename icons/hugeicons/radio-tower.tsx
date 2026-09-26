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

export interface HugeiconsRadioTowerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsRadioTowerIconProps extends HTMLAttributes<HTMLDivElement> {
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
    opacity: [1, 0.15, 1],
    transition: { duration: 0.65, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    opacity: [1, 0.15, 1],
    transition: { duration: 0.65, delay: 0.12, ease: 'easeInOut' },
  },
};

const HugeiconsRadioTowerIcon = forwardRef<
  HugeiconsRadioTowerIconHandle,
  HugeiconsRadioTowerIconProps
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
            <circle
              cx="11.9922"
              cy="8.65723"
              r="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="11.9922"
              cy="8.65723"
              r="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.path
              d="M15.5277 12.1931C17.4803 10.2405 17.4803 7.07469 15.5277 5.12207M8.45665 12.1931C6.50403 10.2405 6.50403 7.07469 8.45665 5.12207"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M15.5277 12.1931C17.4803 10.2405 17.4803 7.07469 15.5277 5.12207M8.45665 12.1931C6.50403 10.2405 6.50403 7.07469 8.45665 5.12207"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M17.649 14.3137C20.7732 11.1895 20.7732 6.12419 17.649 3M6.33533 14.3137C3.21114 11.1895 3.21114 6.12419 6.33533 3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M17.649 14.3137C20.7732 11.1895 20.7732 6.12419 17.649 3M6.33533 14.3137C3.21114 11.1895 3.21114 6.12419 6.33533 3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <path
              d="M11.9922 11V21M8.49219 21H15.4922"
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
HugeiconsRadioTowerIcon.displayName = 'HugeiconsRadioTowerIcon';
export { HugeiconsRadioTowerIcon };
