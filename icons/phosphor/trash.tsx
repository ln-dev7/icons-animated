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

export interface PhosphorTrashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhosphorTrashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LID_VARIANTS: Variants = {
  normal: {
    transition: { duration: 0.18, delay: 0, ease: 'easeOut' },
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [0, -5, -5, 0],
    rotate: [-3, 3, 0],
    transition: {
      duration: 0.4,
      rotate: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: {
    transition: { duration: 0.18, delay: 0, ease: 'easeOut' },
    scale: 1,
  },
  animate: {
    scale: [1, 0.95, 1],
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const PhosphorTrashIcon = forwardRef<
  PhosphorTrashIconHandle,
  PhosphorTrashIconProps
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
    const motionPreference = useRef(reducedMotion);
    const sequence = useRef(0);
    const startAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      controls.set('normal');
      if (motionPreference.current) return;
      void controls.start('animate').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls]);
    const stopAnimation = useCallback(() => {
      const current = ++sequence.current;
      controls.stop();
      if (motionPreference.current) {
        controls.set('normal');
        return;
      }
      void controls.start('normal').then(() => {
        if (sequence.current === current) controls.set('normal');
      });
    }, [controls]);
    useImperativeHandle(ref, () => ({ startAnimation, stopAnimation }), [
      startAnimation,
      stopAnimation,
    ]);
    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updatePreference = () => {
        motionPreference.current = media.matches;
        if (media.matches) {
          sequence.current += 1;
          controls.stop();
          controls.set('normal');
        }
      };
      updatePreference();
      media.addEventListener('change', updatePreference);
      return () => {
        media.removeEventListener('change', updatePreference);
        sequence.current += 1;
        controls.stop();
      };
    }, [controls]);

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
          aria-hidden="true"
          focusable="false"
          overflow="visible"
          width={size}
          height={size}
          viewBox="0 0 256 256"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
          style={{ overflow: 'visible' }}
        >
          <motion.g
            initial="normal"
            variants={LID_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '128px 56px' }}
          >
            <line x1="216" y1="56" x2="40" y2="56" />
            <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" />
          </motion.g>
          <motion.g
            initial="normal"
            variants={BODY_VARIANTS}
            animate={controls}
            style={{ transformOrigin: '128px 140px' }}
          >
            <line x1="104" y1="104" x2="104" y2="168" />
            <line x1="152" y1="104" x2="152" y2="168" />
            <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PhosphorTrashIcon.displayName = 'PhosphorTrashIcon';

export { PhosphorTrashIcon };
