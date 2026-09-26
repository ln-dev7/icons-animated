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

export interface HugeiconsKeySquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsKeySquareIconProps extends HTMLAttributes<HTMLDivElement> {
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
    rotate: [0, -6, 6, -3, 0],
    scale: [1, 0.96, 1],
    transition: { duration: 0.65, ease: 'easeInOut' },
  },
};

const HugeiconsKeySquareIcon = forwardRef<
  HugeiconsKeySquareIconHandle,
  HugeiconsKeySquareIconProps
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
              d="M13.2124 14.2847L9.80113 17.7174H7.77746V19.7538H5.75379V21.7901H2.21237V19.9071C2.21237 19.0782 2.21237 18.6637 2.36852 18.2921C2.52467 17.9204 2.82077 17.6303 3.41297 17.05L9.21237 11.3671"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M18.9972 5.26071C18.7789 5.04288 18.5606 4.82505 18.3435 4.60847C16.916 3.18405 16.2022 2.47184 15.3534 2.28211C14.924 2.18613 14.4792 2.18575 14.0496 2.28097C13.2004 2.46923 12.4856 3.18005 11.0559 4.60168C9.61818 6.03125 8.89934 6.74603 8.70747 7.59848C8.61047 8.02944 8.60984 8.47651 8.70562 8.90775C8.89509 9.76074 9.61191 10.4775 11.0456 11.9112L12.0815 12.9471C13.5177 14.3833 14.2359 15.1014 15.0904 15.2904C15.5208 15.3856 15.9668 15.3848 16.3967 15.288C17.2506 15.0959 17.9661 14.3752 19.3971 12.9338C20.8195 11.501 21.5308 10.7846 21.7178 9.93331C21.812 9.50466 21.8109 9.06025 21.7147 8.63205C21.5237 7.78161 20.8092 7.06873 19.3803 5.64298C19.2528 5.51573 19.125 5.38822 18.9972 5.26071Z"
              stroke="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeWidth="1.5"
            />
            <path
              d="M15.2124 5.79016L18.2124 8.79016"
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
HugeiconsKeySquareIcon.displayName = 'HugeiconsKeySquareIcon';
export { HugeiconsKeySquareIcon };
