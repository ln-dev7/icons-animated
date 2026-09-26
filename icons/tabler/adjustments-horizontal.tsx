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

export interface TablerAdjustmentsHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface TablerAdjustmentsHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
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
    scaleY: [1, 0.78, 1.04, 1],
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
    ...{ scaleY: [1, 0.3, 1] },
    transition: {
      duration: 0.6,
      delay: Math.min(index * 0.055, 0.22),
      ease: 'easeInOut',
    },
  }),
};

const TablerAdjustmentsHorizontalIcon = forwardRef<
  TablerAdjustmentsHorizontalIconHandle,
  TablerAdjustmentsHorizontalIconProps
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
              d="M12 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
              variants={ELEMENT_VARIANTS}
              custom={0}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M4 6l8 0"
              variants={ELEMENT_VARIANTS}
              custom={1}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M16 6l4 0"
              variants={ELEMENT_VARIANTS}
              custom={2}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
              variants={ELEMENT_VARIANTS}
              custom={3}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M4 12l2 0"
              variants={ELEMENT_VARIANTS}
              custom={4}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M10 12l10 0"
              variants={ELEMENT_VARIANTS}
              custom={5}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M15 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
              variants={ELEMENT_VARIANTS}
              custom={6}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M4 18l11 0"
              variants={ELEMENT_VARIANTS}
              custom={7}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
            <motion.path
              d="M19 18l1 0"
              variants={ELEMENT_VARIANTS}
              custom={8}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);
TablerAdjustmentsHorizontalIcon.displayName = 'TablerAdjustmentsHorizontalIcon';
export { TablerAdjustmentsHorizontalIcon };
