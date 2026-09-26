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

export interface HugeiconsMessageSquarePlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsMessageSquarePlusIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { transition: { duration: 0.65, ease: 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  animate: {
    scale: [1, 0.8, 1.12, 1],
    opacity: [1, 0.55, 1, 1],
    transition: { duration: 0.65, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsMessageSquarePlusIcon = forwardRef<
  HugeiconsMessageSquarePlusIconHandle,
  HugeiconsMessageSquarePlusIconProps
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
              d="M1.99634 10.5C1.99634 9.72921 2.0098 8.97679 2.03543 8.2503C2.11916 5.87683 2.16103 4.69009 3.12641 3.71745C4.09178 2.74481 5.31203 2.6926 7.75254 2.58819C9.09151 2.5309 10.5172 2.5 11.9963 2.5C13.4754 2.5 14.9012 2.5309 16.2401 2.58819C18.6806 2.6926 19.9009 2.74481 20.8663 3.71745C21.8316 4.69009 21.8735 5.87683 21.9572 8.2503C21.9829 8.97679 21.9963 9.72921 21.9963 10.5C21.9963 11.2708 21.9829 12.0232 21.9572 12.7497C21.8735 15.1232 21.8316 16.3099 20.8663 17.2826C19.9009 18.2552 18.6806 18.3074 16.24 18.4118C15.5061 18.4432 14.7462 18.4667 13.9656 18.4815C13.2245 18.4955 12.8539 18.5026 12.5283 18.6266C12.2028 18.7506 11.9288 18.9855 11.3809 19.4553L9.20137 21.3242C9.06907 21.4376 8.90053 21.5 8.72625 21.5C8.32313 21.5 7.99634 21.1732 7.99634 20.7701V18.4219C7.91476 18.4186 7.83348 18.4153 7.75253 18.4118C5.31203 18.3074 4.09178 18.2552 3.12641 17.2825C2.16103 16.3099 2.11916 15.1232 2.03543 12.7497C2.0098 12.0232 1.99634 11.2708 1.99634 10.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M15.4963 10.5H8.49634M11.9963 7V14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformOrigin: '12px 10.5px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsMessageSquarePlusIcon.displayName = 'HugeiconsMessageSquarePlusIcon';
export { HugeiconsMessageSquarePlusIcon };
