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
        180,
        360
      ],
      "transition": {
        "duration": 0.9,
        "delay": 0,
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
        180,
        360
      ],
      "transition": {
        "duration": 0.9,
        "delay": 0,
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
        180,
        360
      ],
      "transition": {
        "duration": 0.9,
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
      <path d="M9.26281 12.2458C7.19268 12.0545 4.64013 12.1232 3.2361 12.9338L3.08751 13.0196C2.62814 13.2848 2.28791 13.723 2.25891 14.2527C2.21535 15.0482 2.30808 16.3264 3.07103 17.6479C4.42486 19.9928 6.77519 21.0713 7.76997 21.4394C8.06576 21.5489 8.38955 21.5054 8.66269 21.3477C9.16614 21.0571 9.37976 20.4464 9.24709 19.8804C8.87657 18.2997 8.79308 16.0301 9.9787 14.2647C9.52837 13.8126 9.25 13.189 9.25 12.5005C9.25 12.4145 9.25434 12.3296 9.26281 12.2458Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 11.75px 12.5px" data-icon-part="1" />
      <path d="M14.1611 13.1637C13.9722 13.8519 13.4966 14.4215 12.8706 14.7359C13.7391 16.6397 15.09 18.8587 16.5108 19.679L16.6594 19.7648C17.1188 20.03 17.6685 20.1055 18.1416 19.8658C18.8523 19.5058 19.913 18.7864 20.6759 17.4649C22.0297 15.12 21.7886 12.5453 21.61 11.4998C21.5569 11.1889 21.3574 10.9302 21.0842 10.7725C20.5808 10.4818 19.9451 10.6021 19.5213 11C18.3133 12.1341 16.3345 13.368 14.1611 13.1637Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 11.75px 12.5px" data-icon-part="2" />
      <path d="M11.1722 10.0676C11.3577 10.0237 11.5511 10.0005 11.75 10.0005C12.3502 10.0005 12.901 10.212 13.3319 10.5645C14.5328 8.86728 15.75 6.62197 15.75 5.00049V4.82892C15.75 4.29848 15.5406 3.78471 15.0964 3.49477C14.4293 3.0593 13.2759 2.50049 11.75 2.50049C9.04235 2.50049 6.93318 3.99669 6.11697 4.67412C5.87428 4.87556 5.75 5.17768 5.75 5.49308C5.75 6.07441 6.17204 6.56474 6.72854 6.73284C8.25356 7.19351 10.2147 8.2251 11.1722 10.0676Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 11.75px 12.5px" data-icon-part="3" />
      <path d="M14.2499 12.5002C14.2499 13.881 13.1307 15.0002 11.7499 15.0002C10.3692 15.0002 9.24994 13.881 9.24994 12.5002C9.24994 11.1195 10.3692 10.0002 11.7499 10.0002C13.1307 10.0002 14.2499 11.1195 14.2499 12.5002Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" />
    </g>
  </svg>
</div>
