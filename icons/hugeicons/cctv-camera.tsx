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

export interface HugeiconsCctvCameraIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsCctvCameraIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { rotate: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    rotate: [0, 8, -5, 0],
    transition: { duration: 0.9, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsCctvCameraIcon = forwardRef<
  HugeiconsCctvCameraIconHandle,
  HugeiconsCctvCameraIconProps
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
              d="M8 14L7.64311 15.7845C7.33525 17.3237 7.18133 18.0934 6.62837 18.5467C6.07541 19 5.29054 19 3.72078 19H2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M2 17V21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M16.951 11.5083L21.2025 11.5411C21.3272 11.542 21.45 11.5724 21.5611 11.6298C21.9565 11.8341 22.1137 12.3247 21.9123 12.7257L19.4857 17.555C19.2843 17.9559 18.8005 18.1153 18.4051 17.911C18.294 17.8536 18.1975 17.7707 18.1235 17.669L15.5984 14.2003M13.017 10.4647L12.9606 10.5768M15.1475 15.0976L17.4018 10.611C17.8998 9.61987 17.5112 8.40699 16.5338 7.90198L7.68514 3.32994C6.21904 2.57242 4.42496 3.16355 3.67795 4.65027L2.32536 7.34221C1.57835 8.82892 2.16128 10.6482 3.62738 11.4058L12.476 15.9778C13.4534 16.4828 14.6495 16.0887 15.1475 15.0976ZM13.0733 10.3525C13.1955 10.4156 13.2441 10.5672 13.1818 10.6911C13.1196 10.815 12.9701 10.8643 12.8479 10.8012C12.7257 10.738 12.6772 10.5864 12.7394 10.4625C12.8017 10.3386 12.9512 10.2894 13.0733 10.3525Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '8px 14px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsCctvCameraIcon.displayName = 'HugeiconsCctvCameraIcon';
export { HugeiconsCctvCameraIcon };
