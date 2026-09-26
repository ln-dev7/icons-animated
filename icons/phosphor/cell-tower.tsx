/**
 * @license
 * MIT License
 *
 * Copyright (c) 2023 Phosphor Icons
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

export interface PhosphorCellTowerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PhosphorCellTowerIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    opacity: [1, 0.25, 1],
    transition: { duration: 0.65, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    opacity: [1, 0.25, 1],
    transition: { duration: 0.65, delay: 0.18, ease: 'easeInOut' },
  },
};

const PhosphorCellTowerIcon = forwardRef<
  PhosphorCellTowerIconHandle,
  PhosphorCellTowerIconProps
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
          viewBox="0 0 256 256"
          fill="currentColor"
          overflow="visible"
          aria-hidden="true"
          focusable="false"
        >
          <motion.g
            initial="normal"
            animate={controls}
            variants={ICON_VARIANTS}
            style={{ transformOrigin: '128px 128px' }}
          >
            <path d="M135.16,84.42a8,8,0,0,0-14.32,0l-72,144a8,8,0,0,0,14.31,7.16L77,208h102.1l13.79,27.58A8,8,0,0,0,200,240a8,8,0,0,0,7.15-11.58ZM128,105.89,155.06,160H100.94ZM85,192l8-16h70.1l8,16Z" />
            <motion.path
              d="M159.54,93.74a32,32,0,1,0-63,0,8,8,0,1,1-15.74,2.85,48,48,0,1,1,94.46,0,8,8,0,0,1-7.86,6.58,8.74,8.74,0,0,1-1.43-.13A8,8,0,0,1,159.49,93.74Z"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M64.15,136.21a80,80,0,1,1,127.7,0,8,8,0,0,1-12.76-9.65,64,64,0,1,0-102.18,0,8,8,0,0,1-12.76,9.65Z"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
PhosphorCellTowerIcon.displayName = 'PhosphorCellTowerIcon';
export { PhosphorCellTowerIcon };
