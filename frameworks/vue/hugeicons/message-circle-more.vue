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
      "transition": {
        "duration": 0.65,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "y": 0,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "y": [
        0,
        -0.65,
        0
      ],
      "transition": {
        "duration": 0.55,
        "delay": 0.09,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "y": 0,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "y": [
        0,
        -0.65,
        0
      ],
      "transition": {
        "duration": 0.55,
        "delay": 0,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "y": 0,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "y": [
        0,
        -0.65,
        0
      ],
      "transition": {
        "duration": 0.55,
        "delay": 0.18,
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
        <path d="M21.4961 12C21.4961 17.2467 17.2428 21.5 11.9961 21.5C10.368 21.5 8.83549 21.0904 7.49609 20.3687C5.62786 19.362 4.37071 20.2979 3.26202 20.4658C3.09383 20.4913 2.92634 20.4302 2.80606 20.31C2.6235 20.1274 2.58875 19.8451 2.6896 19.6074C3.12475 18.5818 3.5243 16.6382 2.9795 15C2.6659 14.057 2.49609 13.0483 2.49609 12C2.49609 6.75329 6.74939 2.5 11.9961 2.5C17.2428 2.5 21.4961 6.75329 21.4961 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M12.1218 12H11.9968M12.2468 12C12.2468 12.1381 12.1349 12.25 11.9968 12.25C11.8588 12.25 11.7468 12.1381 11.7468 12C11.7468 11.8619 11.8588 11.75 11.9968 11.75C12.1349 11.75 12.2468 11.8619 12.2468 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="1" />
        <path d="M8.12109 12H7.99609M8.24609 12C8.24609 12.1381 8.13416 12.25 7.99609 12.25C7.85802 12.25 7.74609 12.1381 7.74609 12C7.74609 11.8619 7.85802 11.75 7.99609 11.75C8.13416 11.75 8.24609 11.8619 8.24609 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="2" />
        <path d="M16.1211 12H15.9961M16.2461 12C16.2461 12.1381 16.1342 12.25 15.9961 12.25C15.858 12.25 15.7461 12.1381 15.7461 12C15.7461 11.8619 15.858 11.75 15.9961 11.75C16.1342 11.75 16.2461 11.8619 16.2461 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="3" />
      </g>
    </svg>
  </div>
</template>
