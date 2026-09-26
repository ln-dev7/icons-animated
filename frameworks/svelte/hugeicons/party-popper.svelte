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
      "scale": [
        1,
        0.88,
        1.1,
        1
      ],
      "rotate": [
        0,
        -7,
        7,
        0
      ],
      "transition": {
        "duration": 0.8,
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
      <path d="M15.9924 8L18.9924 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M14.1897 2C14.5888 2.66667 14.908 4.4 12.9924 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M21.9924 9.80274C21.3257 9.40365 19.5924 9.08438 17.9924 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M5.82422 11C7.97359 12.572 10.6237 13.5 13.4906 13.5C14.1707 13.5 14.8386 13.4478 15.4906 13.3471" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
      <path d="M3.49219 16.5C5.70483 17.7609 8.22705 18.4748 10.904 18.4748C11.44 18.4748 11.9698 18.5312 12.4922 18.4753" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
      <path d="M5.64917 11.0022L4.1788 14.3105C2.32373 18.4844 1.3962 20.5713 2.40852 21.5837C3.42084 22.596 5.5078 21.6685 9.6817 19.8134L12.99 18.343C15.5074 17.2242 16.7661 16.6647 16.9664 15.586C17.1667 14.5073 16.1928 13.5333 14.2448 11.5854L12.4068 9.7474C10.4589 7.79944 9.48487 6.82546 8.40616 7.02575C7.32744 7.22604 6.76802 8.48475 5.64917 11.0022Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
    </g>
  </svg>
</div>
