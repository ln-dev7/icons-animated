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

export interface HugeiconsFolderSyncIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsFolderSyncIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.7, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: { rotate: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    rotate: [0, 180, 360],
    transition: { duration: 0.9, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsFolderSyncIcon = forwardRef<
  HugeiconsFolderSyncIconHandle,
  HugeiconsFolderSyncIconProps
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
              d="M8.00164 6.50013H16.754C18.8613 6.50013 19.9149 6.50013 20.6718 7.00574C20.9995 7.22462 21.2808 7.50588 21.4997 7.83346C21.8937 8.42301 21.9808 9.19265 22 10.5003M12.0027 6.50013L11.3691 5.23321C10.8442 4.18363 10.3645 3.12714 9.20122 2.69101C8.69172 2.5 8.10969 2.5 6.94562 2.5C5.12865 2.5 4.22017 2.5 3.53848 2.88033C3.05255 3.15144 2.6516 3.5523 2.38042 4.03811C2 4.71963 2 5.6279 2 7.44443V10.5003C2 15.2145 2 17.5716 3.46487 19.0361C4.82227 20.3931 6.94628 20.4927 11.0025 20.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M21.4649 15C20.7733 13.8044 19.4806 13 18 13C16.4726 13 15.1451 13.8561 14.4713 15.1147M14.5351 19C15.2267 20.1956 16.5194 21 18 21C19.5227 21 20.8467 20.1492 21.5224 18.897M17 15.5H16C15.0572 15.5 14.5858 15.5 14.2929 15.2071C14 14.9142 14 14.4428 14 13.5V12.5M19 18.5H20C20.9428 18.5 21.4142 18.5 21.7071 18.7929C22 19.0858 22 19.5572 22 20.5V21.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '18px 17px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsFolderSyncIcon.displayName = 'HugeiconsFolderSyncIcon';
export { HugeiconsFolderSyncIcon };
