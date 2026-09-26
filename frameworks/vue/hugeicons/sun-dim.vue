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
        "duration": 0.8,
        "ease": "easeInOut"
      }
    },
    "transition": {}
  },
  {
    "normal": {
      "scale": 1,
      "opacity": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "scale": [
        1,
        0.87,
        1
      ],
      "opacity": [
        1,
        0.5,
        1
      ],
      "transition": {
        "duration": 0.85,
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
        <path d="M16.9923 11.9999C16.9923 14.7614 14.7537 16.9999 11.9923 16.9999C9.23089 16.9999 6.99231 14.7614 6.99231 11.9999C6.99231 9.23852 9.23089 6.99994 11.9923 6.99994C14.7537 6.99994 16.9923 9.23852 16.9923 11.9999Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M12.117 3.24994H11.992M12.1165 20.7499H11.9915M20.7423 12.1249V11.9999M3.24231 12.1249V11.9999M18.2675 5.90092L18.1791 5.81253M5.89282 18.275L5.80443 18.1866M18.091 18.2755L18.1794 18.1871M5.71659 5.90114L5.80498 5.81275M12.242 3.24994C12.242 3.38801 12.1301 3.49994 11.992 3.49994C11.8539 3.49994 11.742 3.38801 11.742 3.24994C11.742 3.11187 11.8539 2.99994 11.992 2.99994C12.1301 2.99994 12.242 3.11187 12.242 3.24994ZM12.2415 20.7499C12.2415 20.888 12.1296 20.9999 11.9915 20.9999C11.8535 20.9999 11.7415 20.888 11.7415 20.7499C11.7415 20.6119 11.8535 20.4999 11.9915 20.4999C12.1296 20.4999 12.2415 20.6119 12.2415 20.7499ZM20.7423 12.2499C20.6042 12.2499 20.4923 12.138 20.4923 11.9999C20.4923 11.8619 20.6042 11.7499 20.7423 11.7499C20.8804 11.7499 20.9923 11.8619 20.9923 11.9999C20.9923 12.138 20.8804 12.2499 20.7423 12.2499ZM3.24231 12.2499C3.10424 12.2499 2.99231 12.138 2.99231 11.9999C2.99231 11.8619 3.10424 11.7499 3.24231 11.7499C3.38038 11.7499 3.49231 11.8619 3.49231 11.9999C3.49231 12.138 3.38038 12.2499 3.24231 12.2499ZM18.3559 5.98931C18.2583 6.08694 18.1 6.08694 18.0024 5.98931C17.9047 5.89168 17.9047 5.73339 18.0024 5.63576C18.1 5.53813 18.2583 5.53813 18.3559 5.63576C18.4535 5.73339 18.4535 5.89168 18.3559 5.98931ZM5.98121 18.3633C5.88358 18.461 5.72528 18.461 5.62765 18.3633C5.53002 18.2657 5.53002 18.1074 5.62765 18.0098C5.72528 17.9122 5.88358 17.9122 5.98121 18.0098C6.07884 18.1074 6.07884 18.2657 5.98121 18.3633ZM18.0026 18.3639C17.9049 18.2663 17.9049 18.108 18.0026 18.0103C18.1002 17.9127 18.2585 17.9127 18.3561 18.0103C18.4538 18.108 18.4538 18.2663 18.3561 18.3639C18.2585 18.4615 18.1002 18.4615 18.0026 18.3639ZM5.62821 5.98953C5.53058 5.8919 5.53058 5.73361 5.62821 5.63598C5.72584 5.53835 5.88413 5.53835 5.98176 5.63598C6.07939 5.73361 6.07939 5.8919 5.98176 5.98953C5.88413 6.08716 5.72584 6.08716 5.62821 5.98953Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 12px 12px" data-icon-part="1" />
      </g>
    </svg>
  </div>
</template>
