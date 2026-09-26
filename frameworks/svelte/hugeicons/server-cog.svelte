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
        "duration": 0.9,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "rotate": 0,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "rotate": [
        0,
        90,
        180
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
      <path d="M4.99218 11.996C3.7524 11.9781 3.04952 11.8861 2.57797 11.4146C1.99219 10.8288 1.99219 9.88598 1.99219 8.00037C1.99219 6.11475 1.99219 5.17194 2.57797 4.58615C3.16376 4.00037 4.10657 4.00037 5.99219 4.00037H17.9922C19.8778 4.00037 20.8206 4.00037 21.4064 4.58615C21.9922 5.17194 21.9922 6.11475 21.9922 8.00037C21.9922 9.88598 21.9922 10.8288 21.4064 11.4146C20.9349 11.8861 20.232 11.9781 18.9922 11.996" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M18.9922 12.0052C20.232 12.0232 20.9349 12.1152 21.4064 12.5867C21.9922 13.1725 21.9922 14.1153 21.9922 16.0009C21.9922 17.8866 21.9922 18.8294 21.4064 19.4152C20.8206 20.001 19.8778 20.001 17.9922 20.001H5.99219C4.10657 20.001 3.16376 20.001 2.57797 19.4152C1.99219 18.8294 1.99219 17.8865 1.99219 16.0009C1.99219 14.1152 1.99219 13.1723 2.57798 12.5865C3.04821 12.1163 3.74849 12.0235 4.98181 12.0052" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M6.11719 8.00037H5.99219M6.24219 8.00037C6.24219 8.13844 6.13026 8.25037 5.99219 8.25037C5.85412 8.25037 5.74219 8.13844 5.74219 8.00037C5.74219 7.8623 5.85412 7.75037 5.99219 7.75037C6.13026 7.75037 6.24219 7.8623 6.24219 8.00037Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M6.11719 16.0004H5.99219M6.24219 16.0004C6.24219 16.1384 6.13026 16.2504 5.99219 16.2504C5.85412 16.2504 5.74219 16.1384 5.74219 16.0004C5.74219 15.8623 5.85412 15.7504 5.99219 15.7504C6.13026 15.7504 6.24219 15.8623 6.24219 16.0004Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path d="M11.9922 14.0004L11.9922 15.5004M11.9922 14.0004C12.7292 14.0004 13.3731 13.6017 13.72 13.0083M11.9922 14.0004C11.2552 14.0004 10.6113 13.6017 10.2643 13.0083M11.9922 10.0004L11.9922 8.50037M11.9922 10.0004C12.7292 10.0004 13.3731 10.399 13.72 10.9925M10.2643 13.0083C10.0913 12.7123 9.99219 12.3679 9.99219 12.0004C9.99219 11.6328 10.0913 11.2884 10.2644 10.9925C10.6113 10.399 11.2552 10.0004 11.9922 10.0004M14.9922 10.2504L13.72 10.9925M8.99219 13.7504L10.2643 13.0083M14.9922 13.7504L13.72 13.0083M8.99219 10.2504L10.2644 10.9925M13.72 13.0083C13.893 12.7123 13.9922 12.3679 13.9922 12.0004C13.9922 11.6328 13.893 11.2884 13.72 10.9925" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 12px 12px" data-icon-part="1" />
    </g>
  </svg>
</div>
