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

export interface HugeiconsDownloadIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HugeiconsDownloadIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: { transition: { duration: 0.18, delay: 0, ease: 'easeOut' }, y: 0 },
  animate: {
    y: [0, 3, 0],
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const HugeiconsDownloadIcon = forwardRef<
  HugeiconsDownloadIconHandle,
  HugeiconsDownloadIconProps
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
          <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" />
          <motion.g
            initial="normal"
            variants={ARROW_VARIANTS}
            animate={controls}
          >
            <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

HugeiconsDownloadIcon.displayName = 'HugeiconsDownloadIcon';

export { HugeiconsDownloadIcon };
