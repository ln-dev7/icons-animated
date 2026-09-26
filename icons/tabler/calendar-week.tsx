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

export interface TablerCalendarWeekIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface TablerCalendarWeekIconProps extends HTMLAttributes<HTMLDivElement> {
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
  animate: { 'transition': { 'duration': 0.75, 'ease': 'easeInOut' } },
};

const DETAIL_0_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': { 'duration': 0.55, 'delay': 0.0, 'ease': 'easeInOut' },
  },
};

const DETAIL_1_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': { 'duration': 0.55, 'delay': 0.07, 'ease': 'easeInOut' },
  },
};

const DETAIL_2_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': { 'duration': 0.55, 'delay': 0.14, 'ease': 'easeInOut' },
  },
};

const DETAIL_3_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': {
      'duration': 0.55,
      'delay': 0.21000000000000002,
      'ease': 'easeInOut',
    },
  },
};

const DETAIL_4_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': { 'duration': 0.55, 'delay': 0.28, 'ease': 'easeInOut' },
  },
};

const DETAIL_5_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': {
      'duration': 0.55,
      'delay': 0.35000000000000003,
      'ease': 'easeInOut',
    },
  },
};

const DETAIL_6_VARIANTS: Variants = {
  normal: {
    'opacity': 1,
    'transition': { 'duration': 0.18, 'ease': 'easeOut' },
  },
  animate: {
    'opacity': [1, 0.2, 1],
    'transition': {
      'duration': 0.55,
      'delay': 0.42000000000000004,
      'ease': 'easeInOut',
    },
  },
};

const TablerCalendarWeekIcon = forwardRef<
  TablerCalendarWeekIconHandle,
  TablerCalendarWeekIconProps
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
            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <motion.path
              d="M7 14h.013"
              variants={DETAIL_0_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M10.01 14h.005"
              variants={DETAIL_1_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M13.01 14h.005"
              variants={DETAIL_2_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M16.015 14h.005"
              variants={DETAIL_3_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M13.015 17h.005"
              variants={DETAIL_6_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M7.01 17h.005"
              variants={DETAIL_4_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.path
              d="M10.01 17h.005"
              variants={DETAIL_5_VARIANTS}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
TablerCalendarWeekIcon.displayName = 'TablerCalendarWeekIcon';
export { TablerCalendarWeekIcon };
