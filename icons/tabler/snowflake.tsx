/**
 * @license
 * MIT License
 *
 * Copyright (c) 2020-2026 Paweł Kuna
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

export interface TablerSnowflakeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface TablerSnowflakeIconProps extends HTMLAttributes<HTMLDivElement> {
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

const TablerSnowflakeIcon = forwardRef<
  TablerSnowflakeIconHandle,
  TablerSnowflakeIconProps
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
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
              d="M10 4l2 1l2 -1"
              variants={ELEMENT_VARIANTS}
              custom={0}
            />
            <motion.path
              d="M12 2v6.5l3 1.72"
              variants={ELEMENT_VARIANTS}
              custom={1}
            />
            <motion.path
              d="M17.928 6.268l.134 2.232l1.866 1.232"
              variants={ELEMENT_VARIANTS}
              custom={2}
            />
            <motion.path
              d="M20.66 7l-5.629 3.25l.01 3.458"
              variants={ELEMENT_VARIANTS}
              custom={3}
            />
            <motion.path
              d="M19.928 14.268l-1.866 1.232l-.134 2.232"
              variants={ELEMENT_VARIANTS}
              custom={4}
            />
            <motion.path
              d="M20.66 17l-5.629 -3.25l-2.99 1.738"
              variants={ELEMENT_VARIANTS}
              custom={5}
            />
            <motion.path
              d="M14 20l-2 -1l-2 1"
              variants={ELEMENT_VARIANTS}
              custom={6}
            />
            <motion.path
              d="M12 22v-6.5l-3 -1.72"
              variants={ELEMENT_VARIANTS}
              custom={7}
            />
            <motion.path
              d="M6.072 17.732l-.134 -2.232l-1.866 -1.232"
              variants={ELEMENT_VARIANTS}
              custom={8}
            />
            <motion.path
              d="M3.34 17l5.629 -3.25l-.01 -3.458"
              variants={ELEMENT_VARIANTS}
              custom={9}
            />
            <motion.path
              d="M4.072 9.732l1.866 -1.232l.134 -2.232"
              variants={ELEMENT_VARIANTS}
              custom={10}
            />
            <motion.path
              d="M3.34 7l5.629 3.25l2.99 -1.738"
              variants={ELEMENT_VARIANTS}
              custom={11}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
TablerSnowflakeIcon.displayName = 'TablerSnowflakeIcon';
export { TablerSnowflakeIcon };
