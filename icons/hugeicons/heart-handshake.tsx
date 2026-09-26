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

export interface HugeiconsHeartHandshakeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsHeartHandshakeIconProps extends HTMLAttributes<HTMLDivElement> {
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
    scale: [1, 1.13, 1, 1.06, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

const HugeiconsHeartHandshakeIcon = forwardRef<
  HugeiconsHeartHandshakeIconHandle,
  HugeiconsHeartHandshakeIconProps
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
              d="M19.6692 14.6692C21.01 12.9629 22 11.0686 22 9.19444C22 6.32563 19.8947 4 17 4C15.5 4 14 4.5 12 6.5C10 4.5 8.5 4 7 4C4.10526 4 2 6.32563 2 9.19444C2 14.2666 9.25143 19.4872 11.0835 20.7252C11.3541 20.9081 11.6734 21 12 21C12.3266 21 12.6459 20.9081 12.9165 20.7252C13.0217 20.6541 13.1449 20.5699 13.2835 20.4732C14.2796 19.7789 14.3586 18.3586 13.5 17.5"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M18.5 11L19.49 11.99C20.1988 12.6988 20.3483 13.795 19.7336 14.5868C18.9878 15.5474 17.5632 15.5632 16.7032 14.7032L16.5 14.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M16.5 14.5L16.6942 14.6942C17.5691 15.5691 17.51 17.0612 16.5833 17.8811C15.7193 18.6455 14.4965 18.4965 13.6808 17.6808L13.5 17.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M12.0002 6.5L9.25019 9.25C8.55983 9.94036 8.55983 11.0596 9.25019 11.75C9.94055 12.4404 11.0598 12.4404 11.7502 11.75L13.5002 10C14.0454 9.45475 14.3181 9.18212 14.6122 9.03639C15.1717 8.75911 15.8287 8.75911 16.3882 9.03639C16.6823 9.18212 16.9549 9.45475 17.5002 10L19.0002 11.5"
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
HugeiconsHeartHandshakeIcon.displayName = 'HugeiconsHeartHandshakeIcon';
export { HugeiconsHeartHandshakeIcon };
