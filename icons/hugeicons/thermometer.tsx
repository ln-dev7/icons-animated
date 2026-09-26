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

export interface HugeiconsThermometerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsThermometerIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    pathLength: [0.08, 1],
    opacity: [0.35, 1],
    transition: { duration: 0.8, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsThermometerIcon = forwardRef<
  HugeiconsThermometerIconHandle,
  HugeiconsThermometerIconProps
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
              d="M13.8801 15.9369L20.6738 8.17267C21.4217 7.31791 21.7956 6.89053 21.9252 6.41326C22.0376 5.99901 22.023 5.56052 21.8833 5.15466C21.7223 4.68707 21.3207 4.28551 20.5176 3.4824C19.7145 2.67928 19.3129 2.27773 18.8453 2.11672C18.4395 1.97696 18.001 1.96236 17.5867 2.07481C17.1095 2.20436 16.6821 2.57832 15.8273 3.32623L8.06312 10.1199C7.10741 10.9562 6.62955 11.3743 6.34846 11.9258C6.06738 12.4774 6.00989 13.1098 5.89492 14.3745L5.87152 14.6319C5.81078 15.3 5.78041 15.6341 5.65293 15.9386C5.52546 16.2431 5.30877 16.4992 4.8754 17.0114L2.27543 20.0841C1.88438 20.5462 1.91286 21.231 2.34094 21.6591C2.76903 22.0871 3.45379 22.1156 3.91594 21.7246L6.98863 19.1246C7.5008 18.6912 7.75689 18.4745 8.06139 18.3471C8.36589 18.2196 8.69998 18.1892 9.36814 18.1285L9.62553 18.1051C10.8902 17.9901 11.5226 17.9326 12.0741 17.6515C12.6257 17.3704 13.0438 16.8926 13.8801 15.9369Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M7.78906 9.89453L9.36983 10.843C9.74255 11.0666 9.86341 11.5501 9.63978 11.9228L9.34781 12.4094C8.96198 13.0524 9.06331 13.8755 9.59357 14.4058C10.1238 14.9361 10.9469 15.0374 11.59 14.6516L12.0766 14.3596C12.4493 14.136 12.9328 14.2568 13.1564 14.6296L14.1049 16.2103"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M17.2634 6.7373L14.1055 9.8952"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsThermometerIcon.displayName = 'HugeiconsThermometerIcon';
export { HugeiconsThermometerIcon };
