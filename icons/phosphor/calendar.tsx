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

export interface PhosphorCalendarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorCalendarIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PIN_VARIANTS: Variants = {
  normal: { transition: { duration: 0.18, delay: 0, ease: 'easeOut' }, y: 0 },
  animate: (i: number) => ({
    y: [0, -5, 0],
    transition: {
      duration: 0.3,
      delay: i * 0.1,
    },
  }),
};

const CONTENT_VARIANTS: Variants = {
  normal: {
    transition: { duration: 0.18, delay: 0, ease: 'easeOut' },
    opacity: 1,
    pathLength: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.4,
      delay: 0.2,
    },
  },
};

const PhosphorCalendarIcon = forwardRef<
  PhosphorCalendarIconHandle,
  PhosphorCalendarIconProps
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
    const motionPreference = useRef(reducedMotion);
    const sequence = useRef(0);
    const startAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      controls.set('normal');
      if (motionPreference.current) return;
      void controls.start('animate').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls]);
    const stopAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      if (motionPreference.current) {
        controls.set('normal');
        return;
      }
      void controls.start('normal').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls]);
    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }), [
      startAnimation,
      stopAnimation,
    ]);
    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updatePreference = () => {
        motionPreference.current = media.matches;
        if (media.matches) {
          sequence.current += 1;
          controls.stop();
          controls.set('normal');
        }
      };
      updatePreference();
      media.addEventListener('change', updatePreference);
      return () => {
        media.removeEventListener('change', updatePreference);
        sequence.current += 1;
        controls.stop();
      };
    }, [controls]);

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
          aria-hidden="true"
          focusable="false"
          overflow="visible"
          width={size}
          height={size}
          viewBox="0 0 256 256"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        >
          <rect x="40" y="40" width="176" height="176" rx="8" />
          <motion.line
            initial="normal"
            x1="176"
            y1="24"
            x2="176"
            y2="56"
            variants={PIN_VARIANTS}
            animate={controls}
            custom={0}
          />
          <motion.line
            initial="normal"
            x1="80"
            y1="24"
            x2="80"
            y2="56"
            variants={PIN_VARIANTS}
            animate={controls}
            custom={1}
          />
          <line x1="40" y1="88" x2="216" y2="88" />
          <motion.g
            initial="normal"
            variants={CONTENT_VARIANTS}
            animate={controls}
          >
            <polyline points="88 128 104 120 104 184" />
            <path d="M138.14,128a16,16,0,1,1,26.64,17.63L136,184h32" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PhosphorCalendarIcon.displayName = 'PhosphorCalendarIcon';

export { PhosphorCalendarIcon };
