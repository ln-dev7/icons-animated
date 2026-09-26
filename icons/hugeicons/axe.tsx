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

export interface HugeiconsAxeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsAxeIconProps extends HTMLAttributes<HTMLDivElement> {
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
    rotate: [0, -18, 9, -3, 0],
    transition: { duration: 0.65, ease: 'easeInOut' },
  },
};

const HugeiconsAxeIcon = forwardRef<
  HugeiconsAxeIconHandle,
  HugeiconsAxeIconProps
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
              d="M10.202 9.30552L13.3086 12.4119C13.5485 12.6518 13.6684 12.7717 13.7417 12.9212C13.8149 13.0708 13.8362 13.2391 13.8786 13.5757L14.1093 15.4031C14.2062 16.1709 14.2547 16.5548 14.6168 16.8157C14.979 17.0767 15.2756 17.0177 15.8687 16.8997C17.1633 16.6421 18.5479 15.8974 19.7226 14.7227C20.8974 13.548 21.6422 12.1634 21.8998 10.8687C22.0177 10.2758 22.0767 9.9793 21.8158 9.61719C21.5549 9.25508 21.1711 9.20655 20.4034 9.1095L18.5759 8.87844C18.2395 8.8359 18.0712 8.81463 17.9218 8.74141C17.7724 8.6682 17.6524 8.5483 17.4126 8.3085L14.3059 5.20192C13.7464 4.64254 13.4667 4.36286 13.165 4.21335C12.5909 3.92888 11.9169 3.92888 11.3428 4.21335C11.0411 4.36286 10.7614 4.64254 10.202 5.20192C9.64259 5.76129 9.36288 6.04097 9.21336 6.34269C8.92888 6.91673 8.92888 7.5907 9.21336 8.16475C9.36288 8.46646 9.64259 8.74615 10.202 9.30552Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M12.5 12L5.01777 19.4822C4.68625 19.8138 4.23661 20 3.76777 20C2.79146 20 2 19.2085 2 18.2322C2 17.7634 2.18625 17.3138 2.51777 16.9822L10 9.5"
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
HugeiconsAxeIcon.displayName = 'HugeiconsAxeIcon';
export { HugeiconsAxeIcon };
