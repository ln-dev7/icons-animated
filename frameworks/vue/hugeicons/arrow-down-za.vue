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
        "duration": 0.55,
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
        0.8,
        0
      ],
      "transition": {
        "duration": 0.7,
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
        0.8,
        0
      ],
      "transition": {
        "duration": 0.7,
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
        <path d="M7.75 19V4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="1" />
        <path d="M3.75 16C3.75 16 6.69596 20 7.75003 20C8.80411 20 11.75 16 11.75 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="2" />
        <path d="M16.25 17.249C15.8358 17.249 15.5 17.5847 15.5 17.999C15.5 18.4132 15.8358 18.749 16.25 18.749V17.999V17.249ZM19.25 18.749C19.6642 18.749 20 18.4132 20 17.999C20 17.5847 19.6642 17.249 19.25 17.249V17.999V18.749ZM15.841 18.1076L15.1252 17.8839H15.1252L15.841 18.1076ZM14.5341 19.7752C14.4106 20.1706 14.6309 20.5913 15.0263 20.7148C15.4217 20.8384 15.8423 20.618 15.9659 20.2227L15.25 19.999L14.5341 19.7752ZM19.5341 20.2227C19.6577 20.618 20.0783 20.8384 20.4737 20.7148C20.8691 20.5913 21.0894 20.1706 20.9659 19.7752L20.25 19.999L19.5341 20.2227ZM19.659 18.1076L20.3748 17.8839V17.8839L19.659 18.1076ZM16.25 17.999V18.749H19.25V17.999V17.249H16.25V17.999ZM15.841 18.1076L15.1252 17.8839L14.5341 19.7752L15.25 19.999L15.9659 20.2227L16.5569 18.3313L15.841 18.1076ZM20.25 19.999L20.9659 19.7752L20.3748 17.8839L19.659 18.1076L18.9431 18.3313L19.5341 20.2227L20.25 19.999ZM15.841 18.1076L16.5569 18.3313C16.9552 17.0569 17.2324 16.175 17.4948 15.6036C17.6257 15.3186 17.7254 15.1749 17.7891 15.1094C17.8343 15.0629 17.8129 15.1016 17.75 15.1016V14.3516V13.6016C17.3195 13.6016 16.9735 13.7967 16.7141 14.0633C16.4733 14.3108 16.2884 14.6365 16.1317 14.9775C15.8191 15.6581 15.5094 16.6543 15.1252 17.8839L15.841 18.1076ZM19.659 18.1076L20.3748 17.8839C19.9906 16.6543 19.6809 15.6581 19.3683 14.9775C19.2116 14.6365 19.0267 14.3108 18.7859 14.0633C18.5265 13.7967 18.1805 13.6016 17.75 13.6016V14.3516V15.1016C17.6871 15.1016 17.6657 15.0629 17.7109 15.1094C17.7746 15.1749 17.8743 15.3186 18.0052 15.6036C18.2676 16.175 18.5448 17.0569 18.9431 18.3313L19.659 18.1076Z" fill="currentColor" />
        <path d="M15.75 4H18.115C19.0386 4 19.5004 4 19.6353 4.28792C19.7701 4.57584 19.4745 4.93062 18.8832 5.64018L16.6168 8.35982C16.0255 9.06938 15.7299 9.42416 15.8647 9.71208C15.9996 10 16.4614 10 17.385 10H19.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      </g>
    </svg>
  </div>
</template>
