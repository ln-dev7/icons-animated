<script lang="ts">
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
import { animate } from 'motion';
import type { AnimationOptions, AnimationPlaybackControlsWithThen, DOMKeyframesDefinition } from 'motion';
import { onMount } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type Props = HTMLAttributes<HTMLDivElement> & { size?: number; controlled?: boolean };
let { size = 28, controlled = false, ...rest }: Props = $props();
let root: HTMLDivElement;

type State = 'normal' | 'animate';
type Part = {
  normal: DOMKeyframesDefinition & { transition?: AnimationOptions };
  animate: DOMKeyframesDefinition & { transition?: AnimationOptions };
  transition: AnimationOptions;
};

const parts = [
  {
    "normal": {
      "x": 0,
      "y": 0,
      "rotate": 0,
      "scale": 1,
      "scaleX": 1,
      "scaleY": 1,
      "opacity": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "transition": {
        "duration": 0.75,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "scaleY": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "scaleY": [
        1,
        1,
        0.1,
        1,
        1
      ],
      "transition": {
        "duration": 0.65,
        "delay": 0,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "scaleY": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "scaleY": [
        1,
        1,
        0.1,
        1,
        1
      ],
      "transition": {
        "duration": 0.65,
        "delay": 0,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  }
] as unknown as Part[];
let animations: AnimationPlaybackControlsWithThen[] = [];
let sequence = 0;
let media: MediaQueryList | undefined;
let initialized = false;

function cancelAnimations() {
  animations.forEach((animation) => animation.stop());
  animations = [];
}

function run(state: State, instant = false) {
  const container = root;
  if (!container) return [];
  return parts.flatMap((part, index) => {
    const element = container.querySelector<SVGElement>(`[data-icon-part="${index}"]`);
    if (!element) return [];
    const { transition, ...keyframes } = part[state];
    if (!Object.keys(keyframes).length) return [];
    const options: AnimationOptions = instant
      ? { duration: 0, delay: 0, type: 'tween' }
      : { ...part.transition, ...transition };
    const animation = animate(element, keyframes, options);
    if (instant) animation.complete();
    return [animation];
  });
}

export function startAnimation() {
  if (!media || media.matches) return;
  const current = ++sequence;
  cancelAnimations();
  initialized = true;
  run('normal', true);
  animations = run('animate');
  void Promise.all(animations).then(() => {
    if (sequence === current) {
      animations = [];
      run('normal', true);
    }
  });
}

export function stopAnimation() {
  sequence += 1;
  cancelAnimations();
  if (!initialized) return;
  animations = run('normal', Boolean(media?.matches));
}

function mountAnimation() {
  const container = root;
  if (!container) return () => {};
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const start = () => { if (!controlled) startAnimation(); };
  const stop = () => { if (!controlled) stopAnimation(); };
  const preferenceChanged = () => {
    if (media?.matches) stopAnimation();
  };
  container.addEventListener('mouseenter', start);
  container.addEventListener('mouseleave', stop);
  container.addEventListener('focusin', start);
  container.addEventListener('focusout', stop);
  media.addEventListener('change', preferenceChanged);
  if (!media.matches) {
    initialized = true;
    run('normal', true);
  }
  return () => {
    sequence += 1;
    cancelAnimations();
    container.removeEventListener('mouseenter', start);
    container.removeEventListener('mouseleave', stop);
    container.removeEventListener('focusin', start);
    container.removeEventListener('focusout', stop);
    media?.removeEventListener('change', preferenceChanged);
    media = undefined;
  };
}

onMount(mountAnimation);
</script>

<div bind:this={root} {...rest}>
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible" aria-hidden="true" focusable="false">
    <g style="transform-origin: 12px 12px" data-icon-part="0">
      <path d="M19.499 15V12C19.499 10.1144 19.499 9.17157 18.9132 8.58579C18.3275 8 17.3846 8 15.499 8H8.49902C6.61341 8 5.6706 8 5.08481 8.58579C4.49902 9.17157 4.49902 10.1144 4.49902 12V16.5C4.49902 16.9647 4.49902 17.197 4.53745 17.3902C4.69527 18.1836 5.31546 18.8038 6.10884 18.9616C6.30204 19 6.53437 19 6.99902 19C6.99902 20.3737 6.99902 21.0605 7.37501 21.3608C7.4763 21.4416 7.59236 21.5021 7.71671 21.5387C8.1783 21.6745 8.74098 21.2806 9.86634 20.4929L11.4825 19.3615C11.7387 19.1822 11.8668 19.0925 12.0136 19.0463C12.1604 19 12.3167 19 12.6295 19H15.499C17.3846 19 18.3275 19 18.9132 18.4142C19.499 17.8284 19.499 16.8856 19.499 15Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M11.999 8V5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
      <path d="M4.5 16H4C3.05719 16 2.58579 16 2.29289 15.7071C2 15.4142 2 14.9428 2 14V12.5C2 12.0341 2 11.8011 2.07612 11.6173C2.17761 11.3723 2.37229 11.1776 2.61732 11.0761C2.80109 11 3.03406 11 3.5 11H4.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
      <path d="M19.4961 11H19.9961C20.9389 11 21.4103 11 21.7032 11.2929C21.9961 11.5858 21.9961 12.0572 21.9961 13V14C21.9961 14.9428 21.9961 15.4142 21.7032 15.7071C21.4103 16 20.9389 16 19.9961 16H19.4961" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
      <path d="M13.499 3.5C13.499 4.32843 12.8275 5 11.999 5C11.1706 5 10.499 4.32843 10.499 3.5C10.499 2.67157 11.1706 2 11.999 2C12.8275 2 13.499 2.67157 13.499 3.5Z" stroke="currentColor" stroke-width="1.5" />
      <path d="M8.99902 11.5V12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 12px 12px" data-icon-part="1" />
      <path d="M14.999 11.5V12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 12px 12px" data-icon-part="2" />
      <path d="M9.99902 15.5C9.99902 15.5 10.6657 16 11.999 16C13.3324 16 13.999 15.5 13.999 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
    </g>
  </svg>
</div>
