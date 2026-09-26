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
        "duration": 0.7,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "scale": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "scale": [
        1,
        1.1,
        1,
        1.06,
        1
      ],
      "transition": {
        "duration": 0.8,
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
      <path d="M15.2053 10.7181C13.7947 9.60121 11 7.0478 11 4.74998C11 3.23121 12.0526 2 13.5 2C14.25 2 15 2.2647 16 3.32352C17 2.2647 17.75 2 18.5 2C19.9474 2 21 3.23121 21 4.74998C21 7.0478 18.2053 9.60121 16.7947 10.7181C16.32 11.094 15.68 11.094 15.2053 10.7181Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 16px 6.5px" data-icon-part="1" />
      <path d="M2 19V13C2 12.535 2 12.3025 2.05111 12.1118C2.18981 11.5941 2.59413 11.1898 3.11177 11.0511C3.30252 11 3.53501 11 4 11C4.46499 11 4.69748 11 4.88823 11.0511C5.40587 11.1898 5.81019 11.5941 5.94889 12.1118C6 12.3025 6 12.535 6 13V19C6 19.465 6 19.6975 5.94889 19.8882C5.81019 20.4059 5.40587 20.8102 4.88823 20.9489C4.69748 21 4.46499 21 4 21C3.53501 21 3.30252 21 3.11177 20.9489C2.59413 20.8102 2.18981 20.4059 2.05111 19.8882C2 19.6975 2 19.465 2 19Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M6 12H7.76845C8.58101 12 9.38511 12.165 10.132 12.4851L14.8574 14.5103C15.5506 14.8074 16 15.489 16 16.2431C16 16.9373 15.4373 17.5 14.7431 17.5H14.0986C13.3729 17.5 12.6538 17.3615 11.98 17.092L10.5 16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M14 17.5H20.5749C21.362 17.5 22 18.138 22 18.9251C22 19.5613 21.5782 20.1205 20.9664 20.2953L15.7451 21.7871C15.2508 21.9283 14.7392 22 14.2251 22C13.7437 22 13.2645 21.9372 12.7994 21.8132L6 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
    </g>
  </svg>
</div>
