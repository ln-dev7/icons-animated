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

export interface HugeiconsMessageSquareMoreIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface HugeiconsMessageSquareMoreIconProps extends HTMLAttributes<HTMLDivElement> {
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
  normal: { y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, -0.65, 0],
    transition: { duration: 0.55, delay: 0.0, ease: 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: { y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, -0.65, 0],
    transition: { duration: 0.55, delay: 0.09, ease: 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: { y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  animate: {
    y: [0, -0.65, 0],
    transition: { duration: 0.55, delay: 0.18, ease: 'easeInOut' },
  },
};

const HugeiconsMessageSquareMoreIcon = forwardRef<
  HugeiconsMessageSquareMoreIconHandle,
  HugeiconsMessageSquareMoreIconProps
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
              d="M1.99609 10.5C1.99609 9.72921 2.00956 8.97679 2.03519 8.2503C2.11892 5.87683 2.16078 4.69009 3.12616 3.71745C4.09154 2.74481 5.31179 2.6926 7.75229 2.58819C9.09126 2.5309 10.517 2.5 11.9961 2.5C13.4752 2.5 14.9009 2.5309 16.2399 2.58819C18.6804 2.6926 19.9006 2.74481 20.866 3.71745C21.8314 4.69009 21.8733 5.87683 21.957 8.2503C21.9826 8.97679 21.9961 9.72921 21.9961 10.5C21.9961 11.2708 21.9826 12.0232 21.957 12.7497C21.8733 15.1232 21.8314 16.3099 20.866 17.2826C19.9006 18.2552 18.6804 18.3074 16.2398 18.4118C15.5059 18.4432 14.7459 18.4667 13.9654 18.4815C13.2242 18.4955 12.8537 18.5026 12.5281 18.6266C12.2025 18.7506 11.9285 18.9855 11.3806 19.4553L9.20113 21.3242C9.06882 21.4376 8.90029 21.5 8.726 21.5C8.32289 21.5 7.99609 21.1732 7.99609 20.7701V18.4219C7.91451 18.4186 7.83324 18.4153 7.75229 18.4118C5.31179 18.3074 4.09154 18.2552 3.12616 17.2825C2.16078 16.3099 2.11892 15.1232 2.03519 12.7497C2.00956 12.0232 1.99609 11.2708 1.99609 10.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M12.1218 10.5H11.9968M12.2468 10.5C12.2468 10.6381 12.1349 10.75 11.9968 10.75C11.8588 10.75 11.7468 10.6381 11.7468 10.5C11.7468 10.3619 11.8588 10.25 11.9968 10.25C12.1349 10.25 12.2468 10.3619 12.2468 10.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M8.12109 10.5H7.99609M8.24609 10.5C8.24609 10.6381 8.13416 10.75 7.99609 10.75C7.85802 10.75 7.74609 10.6381 7.74609 10.5C7.74609 10.3619 7.85802 10.25 7.99609 10.25C8.13416 10.25 8.24609 10.3619 8.24609 10.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M16.1211 10.5H15.9961M16.2461 10.5C16.2461 10.6381 16.1342 10.75 15.9961 10.75C15.858 10.75 15.7461 10.6381 15.7461 10.5C15.7461 10.3619 15.858 10.25 15.9961 10.25C16.1342 10.25 16.2461 10.3619 16.2461 10.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={DETAIL_2_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
HugeiconsMessageSquareMoreIcon.displayName = 'HugeiconsMessageSquareMoreIcon';
export { HugeiconsMessageSquareMoreIcon };
