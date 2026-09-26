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
        "duration": 0.8,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "opacity": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "opacity": [
        1,
        0.2,
        1,
        0.45,
        1
      ],
      "transition": {
        "duration": 0.75,
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
      <path d="M11.9922 8.99988L9.49219 11.4999" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M14.9922 11.9999L12.4922 14.4999" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M4.99219 18.9999L2.99237 21.0002" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M7.19135 9.52039L14.4716 16.8006" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M7.71255 10.0399L6.15251 11.6C5.32501 12.4275 4.86013 13.5498 4.86013 14.72C4.86013 14.8523 4.80343 14.9876 4.70894 15.1227C4.03073 16.0921 3.71818 17.2257 4.55476 18.0623L5.93031 19.4378C6.76675 20.2743 7.90038 19.9622 8.86953 19.2839C9.00474 19.1893 9.14021 19.1325 9.2726 19.1325C10.4429 19.1325 11.5652 18.6676 12.3927 17.8401L13.9527 16.2801L7.71255 10.0399Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M18.9922 2.99988L17.4072 4.84909C16.7965 5.56152 16.4912 5.91773 16.625 6.20881C16.7589 6.49988 17.2281 6.49988 18.1664 6.49988H18.5398C19.5813 6.49988 20.1021 6.49988 20.229 6.81109C20.3559 7.12229 19.9836 7.48644 19.2391 8.21474L17.4141 9.99988" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="1" />
    </g>
  </svg>
</div>
