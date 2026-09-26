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

export interface HugeiconsConnectIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsConnectIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { x: 0, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    x: [0, 0.65, 0],
    y: [0, -0.65, 0],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { x: 0, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    x: [0, -0.65, 0],
    y: [0, 0.65, 0],
    transition: { duration: 0.7, delay: 0, ease: 'easeInOut' },
  },
};

const HugeiconsConnectIcon = forwardRef<
  HugeiconsConnectIconHandle,
  HugeiconsConnectIconProps
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
              d="M4.51255 19.4866C7.02498 21.8794 10.016 20.9223 11.2124 19.9532C11.8314 19.4518 12.1097 19.1277 12.3489 18.8884C13.1864 18.1107 13.1326 17.3331 12.5882 16.711C12.3704 16.462 10.9731 15.1198 9.63313 13.7439C8.93922 13.0499 8.46066 12.5595 8.05149 12.1647C7.50354 11.6185 7.02499 10.9922 6.30715 11.0101C5.64913 11.0101 5.17057 11.5904 4.57237 12.1886C3.88422 12.8767 3.37598 13.7439 3.19652 14.5216C2.65814 16.7947 3.49562 18.4098 4.51255 19.4866ZM4.51255 19.4866L2.00012 21.999"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M19.4867 4.51472C16.9736 2.12078 13.9929 3.09593 12.7962 4.06548C12.177 4.56712 11.8987 4.89138 11.6593 5.13078C10.8216 5.90881 10.8755 6.68683 11.42 7.30926C11.4983 7.39881 11.7292 7.62975 12.055 7.95281M19.4867 4.51472C20.504 5.59199 21.3528 7.22547 20.8142 9.49971C20.6347 10.2777 20.1264 11.1453 19.438 11.8338C18.8397 12.4323 18.361 13.0128 17.7028 13.0128C16.9847 13.0308 16.6121 12.5115 16.064 11.9651M19.4867 4.51472L21.9999 2.0011M16.064 11.9651C15.6547 11.5701 15.07 10.9721 14.3759 10.2777C13.5175 9.39612 12.6355 8.52831 12.055 7.95281M16.064 11.9651L14.5024 13.4896M10.5114 9.50609L12.055 7.95281"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsConnectIcon.displayName = 'HugeiconsConnectIcon';
export { HugeiconsConnectIcon };
