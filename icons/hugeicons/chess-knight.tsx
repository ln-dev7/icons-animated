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

export interface HugeiconsChessKnightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsChessKnightIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: {
    scale: [1, 0.96, 1],
    transition: { duration: 0.75, ease: 'easeInOut' },
  },
};

const ELEMENT_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.18 },
  },
  animate: (index: number) => ({
    ...{ pathLength: [0.3, 1], opacity: [0.45, 1] },
    transition: {
      duration: 0.6,
      delay: Math.min(index * 0.055, 0.22),
      ease: 'easeInOut',
    },
  }),
};

const HugeiconsChessKnightIcon = forwardRef<
  HugeiconsChessKnightIconHandle,
  HugeiconsChessKnightIconProps
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
            <motion.path
              d="M16.5 22H6.5C6.03501 22 5.80252 22 5.61177 21.9489C5.09413 21.8102 4.68981 21.4059 4.55111 20.8882C4.5 20.6975 4.5 20.465 4.5 20C4.5 18.8954 5.39543 18 6.5 18H16.5C17.6046 18 18.5 18.8954 18.5 20C18.5 20.465 18.5 20.6975 18.4489 20.8882C18.3102 21.4059 17.9059 21.8102 17.3882 21.9489C17.1975 22 16.965 22 16.5 22Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={0}
            />
            <motion.path
              d="M16.5412 18L18.6065 12.5989C18.9952 11.5824 19.1895 11.0741 19.2894 10.6776C20.3197 6.58681 17.4559 2.53744 13.1858 2.04748C12.772 2 12.2181 2 11.1105 2C10.9388 2 10.8529 2 10.7806 2.00675C10.05 2.0749 9.47154 2.6418 9.402 3.35789C9.39512 3.42878 9.39512 3.51293 9.39512 3.68122V4.5L5.28271 6.91832C5.00991 7.07874 4.87351 7.15895 4.77626 7.26052C4.58792 7.45725 4.48866 7.72022 4.50103 7.98973C4.50742 8.12887 4.55772 8.27677 4.65832 8.57257C4.84057 9.10842 4.93169 9.37635 5.07488 9.59175C5.35194 10.0085 5.77752 10.3092 6.26857 10.435C6.52235 10.5 6.81051 10.5 7.38682 10.5H10.1768C10.5512 10.5 10.7384 10.5 10.9111 10.4807C11.8188 10.3793 12.6328 9.88594 13.1308 9.13532C13.2255 8.99249 13.3092 8.82829 13.4764 8.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={1}
            />
            <motion.path
              d="M6.5 18C6.5 17.8188 6.5 17.7283 6.50377 17.6415C6.54858 16.6096 6.9908 15.6351 7.73785 14.9219C7.80064 14.8619 7.86882 14.8023 8.00515 14.683L8.99485 13.817C9.13117 13.6977 9.19936 13.6381 9.26215 13.5781C10.0092 12.8649 10.4514 11.8904 10.4962 10.8585C10.5 10.7717 10.5 10.6812 10.5 10.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={ELEMENT_VARIANTS}
              custom={2}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsChessKnightIcon.displayName = 'HugeiconsChessKnightIcon';
export { HugeiconsChessKnightIcon };
