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

export interface HugeiconsUserIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HugeiconsUserIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANT: Variants = {
  normal: {
    transition: { duration: 0.18, delay: 0, ease: 'easeOut' },
    strokeDasharray: 'none',
    opacity: 1,
    strokeDashoffset: 0,
  },
  animate: {
    strokeDasharray: ['0px 1px', '1px 1px'],
    opacity: [0, 1],
    strokeDashoffset: ['-1px', '0px'],
  },
};

const CIRCLE_VARIANT: Variants = {
  normal: {
    transition: { duration: 0.18, delay: 0, ease: 'easeOut' },
    strokeDasharray: 'none',
    strokeDashoffset: 0,
    scale: 1,
  },
  animate: {
    strokeDasharray: ['0px 1px', '1px 1px'],
    strokeDashoffset: ['-1px', '0px'],
    scale: [0.5, 1],
  },
};

const HugeiconsUserIcon = forwardRef<
  HugeiconsUserIconHandle,
  HugeiconsUserIconProps
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
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            pathLength={1}
            initial="normal"
            cx="12"
            cy="8"
            r="5"
            animate={controls}
            variants={CIRCLE_VARIANT}
          />
          <motion.path
            pathLength={1}
            initial="normal"
            d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
            variants={PATH_VARIANT}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            animate={controls}
          />
        </svg>
      </div>
    );
  }
);

HugeiconsUserIcon.displayName = 'HugeiconsUserIcon';

export { HugeiconsUserIcon };
