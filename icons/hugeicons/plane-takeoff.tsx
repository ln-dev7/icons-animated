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

export interface HugeiconsPlaneTakeoffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsPlaneTakeoffIconProps extends HTMLAttributes<HTMLDivElement> {
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
    x: [0, -0.5, 2.4, 0],
    y: [0, 0.5, -2.4, 0],
    rotate: [0, -5, 0, 0],
    transition: { duration: 0.85, ease: 'easeInOut' },
  },
};

const HugeiconsPlaneTakeoffIcon = forwardRef<
  HugeiconsPlaneTakeoffIconHandle,
  HugeiconsPlaneTakeoffIconProps
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
              d="M20.4922 19.5H3.99219"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M7.71721 10.7095C8.17124 10.452 8.39826 10.3233 8.51061 10.1826C8.78548 9.83824 8.79282 9.34147 8.52829 8.98626C8.42016 8.84107 8.20287 8.70686 7.76829 8.43844L5.94973 7.31521C5.83475 7.2442 5.77727 7.2087 5.73942 7.17957C5.23883 6.79429 5.23903 6.01824 5.73981 5.63751C5.77767 5.60872 5.83518 5.57374 5.95018 5.50377C6.10914 5.40706 6.18862 5.35871 6.26699 5.31516C7.2378 4.77574 8.36416 4.61494 9.44248 4.8618C9.52954 4.88173 9.61894 4.90597 9.79776 4.95446L13.9264 6.07387C14.5382 6.23975 14.8441 6.32269 15.1506 6.29928C15.2099 6.29475 15.2688 6.28727 15.3274 6.27685C15.6302 6.22295 15.9069 6.06609 16.4602 5.75238L17.7574 5.01689C18.0356 4.85912 18.1748 4.78024 18.3066 4.72294C19.2496 4.3131 20.3358 4.47623 21.1319 5.14725C21.2432 5.24106 21.3558 5.35774 21.5809 5.59111C21.7061 5.72086 21.7687 5.78574 21.8096 5.84299C22.1102 6.26343 22.0316 6.85459 21.6329 7.17222C21.5786 7.21547 21.5015 7.25981 21.3473 7.34849L9.63351 14.085C7.86837 15.1002 6.9858 15.6077 6.07562 15.4808C5.99037 15.469 5.90569 15.453 5.82184 15.4329C4.92661 15.219 4.26841 14.4207 2.95201 12.8239L2.40113 12.1557C2.23338 11.9522 2.14951 11.8505 2.10199 11.7584C1.88821 11.3442 1.99436 10.8317 2.35285 10.5472C2.43253 10.484 2.54914 10.4277 2.78235 10.3151C3.00135 10.2094 3.11085 10.1565 3.21864 10.1204C3.69094 9.96191 4.20567 10.0075 4.64672 10.2469C4.74737 10.3016 4.84711 10.373 5.04658 10.5158L5.12834 10.5744C5.4272 10.7884 5.57663 10.8953 5.73056 10.9672C6.15275 11.1644 6.63024 11.1907 7.06885 11.041C7.22877 10.9864 7.39158 10.8941 7.71721 10.7095Z"
              stroke="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
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
HugeiconsPlaneTakeoffIcon.displayName = 'HugeiconsPlaneTakeoffIcon';
export { HugeiconsPlaneTakeoffIcon };
