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

export interface TablerKeyboardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface TablerKeyboardIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { 'transition': { 'duration': 0.65, 'ease': 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.0, 'ease': 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.06, 'ease': 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.12, 'ease': 'easeInOut' },
  },
};

const DETAIL_3_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.18, 'ease': 'easeInOut' },
  },
};

const DETAIL_4_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.24, 'ease': 'easeInOut' },
  },
};

const DETAIL_5_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.3, 'ease': 'easeInOut' },
  },
};

const DETAIL_6_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.25, 1],
    'transition': { 'duration': 0.45, 'delay': 0.36, 'ease': 'easeInOut' },
  },
};

const TablerKeyboardIcon = forwardRef<
  TablerKeyboardIconHandle,
  TablerKeyboardIconProps
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
            <path d="M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8" />
            <motion.path
              d="M6 10l0 .01"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M10 10l0 .01"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M14 10l0 .01"
              variants={DETAIL_2_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M18 10l0 .01"
              variants={DETAIL_3_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M6 14l0 .01"
              variants={DETAIL_4_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M18 14l0 .01"
              variants={DETAIL_6_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M10 14l4 .01"
              variants={DETAIL_5_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
TablerKeyboardIcon.displayName = 'TablerKeyboardIcon';
export { TablerKeyboardIcon };
