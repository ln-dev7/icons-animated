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
        0.96,
        1
      ],
      "transition": {
        "duration": 0.75,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.055,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.11,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.165,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.22,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.22,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.22,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "pathLength": 1,
      "opacity": 1,
      "scaleY": 1,
      "y": 0,
      "transition": {
        "duration": 0.18
      }
    },
    "animate": {
      "pathLength": [
        0.3,
        1
      ],
      "opacity": [
        0.45,
        1
      ],
      "transition": {
        "duration": 0.6,
        "delay": 0.22,
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
      <path d="M14.244 3.00632C13.801 3.40963 12.6212 5.00086 11.991 5C11.3608 4.99909 10.1858 3.40451 9.744 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="1" />
      <path d="M14.244 20.9937C13.801 20.5904 12.6212 18.9991 11.991 19C11.3608 19.0009 10.1858 20.5955 9.744 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="2" />
      <path d="M20.9077 9.45191C20.337 9.26993 18.3691 9.04383 18.0547 8.4976C17.7404 7.9514 18.5338 6.13651 18.6632 5.55164" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="3" />
      <path d="M5.33024 18.4456C5.45802 17.8603 6.24618 16.043 5.93032 15.4976C5.61445 14.9523 3.64599 14.732 3.07477 14.5516" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="4" />
      <path d="M3.07602 9.45203C3.64679 9.27005 5.61472 9.04395 5.9291 8.49772C6.2434 7.95152 5.44996 6.13663 5.32055 5.55176" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="5" />
      <path d="M18.6529 18.4457C18.5252 17.8604 17.737 16.0431 18.0529 15.4977C18.3687 14.9524 20.3372 14.7321 20.9084 14.5518" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="6" />
      <path d="M15.4581 9.97911L17.994 8.49982M11.9937 8.02071L11.9937 4.99982M17.9937 15.4998L15.458 14.0206M5.99424 15.4998L8.56579 13.9997M11.9937 18.9998L11.9937 15.9789M8.56579 10.0001L5.994 8.49982" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-icon-part="7" />
      <path d="M15.4957 11.7313C15.4955 10.8861 15.4955 10.4635 15.2945 10.1155C15.0935 9.76744 14.7275 9.55617 13.9955 9.13361L13.5316 8.86583C12.7996 8.44326 12.4336 8.23198 12.0317 8.23199C11.6298 8.23201 11.2638 8.44332 10.5318 8.86593L10.0679 9.13379C9.33581 9.55644 8.96978 9.76777 8.76882 10.1158C8.56786 10.4639 8.56786 10.8866 8.56786 11.7319L8.56786 12.2677C8.56786 13.113 8.56786 13.5356 8.76881 13.8837C8.96976 14.2318 9.33578 14.4431 10.0678 14.8658L10.5319 15.1337C11.264 15.5564 11.63 15.7678 12.032 15.7678C12.4339 15.7678 12.7999 15.5564 13.532 15.1338L13.9958 14.866C14.728 14.4433 15.0941 14.2319 15.295 13.8838C15.496 13.5356 15.4959 13.1129 15.4958 12.2674L15.4957 11.7313Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" data-icon-part="8" />
    </g>
  </svg>
</div>
