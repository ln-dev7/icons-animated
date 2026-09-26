<script setup lang="ts">
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
import { onMounted, onBeforeUnmount, shallowRef } from 'vue';

const props = withDefaults(defineProps<{ size?: number; controlled?: boolean }>(), {
  size: 28,
  controlled: false,
});
const root = shallowRef<HTMLDivElement>();

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
      "y": [
        0,
        -0.7,
        0
      ],
      "scale": [
        1,
        0.96,
        1.04,
        1
      ],
      "transition": {
        "duration": 0.7,
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
        "duration": 0.5499999999999999,
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
        "duration": 0.5499999999999999,
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
        "duration": 0.5499999999999999,
        "delay": 0.11,
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
  const container = root.value;
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

function startAnimation() {
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

function stopAnimation() {
  sequence += 1;
  cancelAnimations();
  if (!initialized) return;
  animations = run('normal', Boolean(media?.matches));
}

function mountAnimation() {
  const container = root.value;
  if (!container) return () => {};
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const start = () => { if (!props.controlled) startAnimation(); };
  const stop = () => { if (!props.controlled) stopAnimation(); };
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

let cleanup = () => {};
onMounted(() => { cleanup = mountAnimation(); });
onBeforeUnmount(() => cleanup());
defineExpose({ startAnimation, stopAnimation });
</script>

<template>
  <div ref="root">
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" overflow="visible" aria-hidden="true" focusable="false">
      <g style="transform-origin: 12px 12px" data-icon-part="0">
        <path d="M17.7463 2.49976C19.39 2.49976 20.2119 2.49976 20.7651 2.95374C20.8663 3.03684 20.9592 3.1297 21.0423 3.23097C21.4963 3.78414 21.4963 4.60602 21.4963 6.24976C21.4963 7.8935 21.4963 8.71537 21.0423 9.26854C20.9592 9.36981 20.8663 9.46267 20.7651 9.54578C20.2119 9.99976 19.39 9.99976 17.7463 9.99976L6.74628 9.99976C5.10254 9.99976 4.28067 9.99976 3.72749 9.54578C3.62622 9.46267 3.53336 9.36981 3.45026 9.26854C2.99628 8.71537 2.99628 7.8935 2.99628 6.24976C2.99628 4.60601 2.99628 3.78414 3.45026 3.23097C3.53336 3.1297 3.62622 3.03684 3.72749 2.95373C4.28067 2.49976 5.10254 2.49976 6.74628 2.49976L17.7463 2.49976Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" data-icon-part="1" />
        <path d="M17.7462 13.9999C19.39 13.9998 20.2118 13.9998 20.765 14.4538C20.8663 14.5369 20.9592 14.6298 21.0423 14.731C21.4963 15.2842 21.4963 16.1061 21.4963 17.75C21.4963 19.3937 21.4963 20.2156 21.0423 20.7688C20.9592 20.8701 20.8664 20.9629 20.7651 21.046C20.2119 21.5 19.3901 21.5 17.7464 21.5001C16.1026 21.5001 15.2807 21.5001 14.7275 21.0462C14.6262 20.963 14.5334 20.8702 14.4503 20.7689C13.9963 20.2157 13.9963 19.3938 13.9963 17.75C13.9963 16.1062 13.9963 15.2843 14.4502 14.7312C14.5333 14.6299 14.6262 14.537 14.7275 14.4539C15.2806 13.9999 16.1025 13.9999 17.7462 13.9999Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" data-icon-part="2" />
        <path d="M6.24628 13.9998C7.89002 13.9998 8.71189 13.9998 9.26506 14.4537C9.36633 14.5368 9.45919 14.6297 9.5423 14.731C9.99628 15.2841 9.99628 16.1061 9.99628 17.7499C9.99628 19.3938 9.99628 20.2158 9.5423 20.7689C9.45919 20.8702 9.36633 20.9631 9.26506 21.0462C8.71189 21.5001 7.89002 21.5001 6.24628 21.5001C4.60254 21.5001 3.78067 21.5001 3.22749 21.0462C3.12622 20.9631 3.03336 20.8702 2.95026 20.7689C2.49628 20.2158 2.49628 19.3938 2.49628 17.7499C2.49628 16.1061 2.49628 15.2841 2.95026 14.731C3.03336 14.6297 3.12622 14.5368 3.22749 14.4537C3.78067 13.9998 4.60254 13.9998 6.24628 13.9998Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" data-icon-part="3" />
      </g>
    </svg>
  </div>
</template>
