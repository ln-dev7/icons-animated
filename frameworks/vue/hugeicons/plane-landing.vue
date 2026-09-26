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
      "x": [
        -2.2,
        0,
        0
      ],
      "y": [
        -2,
        0,
        0
      ],
      "rotate": [
        -8,
        3,
        0
      ],
      "transition": {
        "duration": 0.7,
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
        <path d="M7.40612 8.14474C7.95105 8.29843 8.22351 8.37527 8.41603 8.35777C8.88701 8.31496 9.2645 7.96241 9.32511 7.50877C9.34989 7.32334 9.28175 7.06427 9.14547 6.54614L8.5752 4.37793C8.53914 4.24085 8.52112 4.17231 8.51355 4.12304C8.41353 3.47137 8.99451 2.91221 9.66799 3.01195C9.71891 3.01949 9.78971 3.03724 9.93131 3.07274C10.127 3.1218 10.2249 3.14633 10.3183 3.1735C11.4752 3.51003 12.4694 4.23566 13.1213 5.21922C13.1739 5.29862 13.2251 5.38289 13.3276 5.55143L15.693 9.44276C16.0435 10.0194 16.2187 10.3077 16.4741 10.5199C16.5235 10.5609 16.5748 10.5995 16.628 10.6358C16.9033 10.8232 17.2353 10.9168 17.8994 11.1041L19.4563 11.5432C19.7903 11.6374 19.9573 11.6845 20.1025 11.7417C21.1408 12.1508 21.8615 13.0799 21.9769 14.1583C21.9931 14.3091 21.9931 14.4773 21.9931 14.8137C21.9931 15.0007 21.9931 15.0942 21.982 15.1661C21.9005 15.6937 21.3971 16.061 20.8501 15.9921C20.7756 15.9827 20.6826 15.957 20.4966 15.9057L6.36649 12.0093C4.23725 11.4221 3.17263 11.1285 2.56143 10.3571C2.50418 10.2848 2.45044 10.21 2.40038 10.133C1.8659 9.30996 1.95278 8.2428 2.12653 6.10847L2.19924 5.21531C2.22138 4.94334 2.23245 4.80735 2.26448 4.7055C2.40861 4.24727 2.87453 3.95722 3.36559 4.02003C3.47472 4.03398 3.60733 4.08053 3.87255 4.17361C4.12159 4.26103 4.24612 4.30473 4.35681 4.3592C4.84183 4.59787 5.20703 5.01532 5.37005 5.51738C5.40725 5.63195 5.43118 5.75794 5.47904 6.00991L5.49866 6.11318C5.57037 6.49069 5.60623 6.67944 5.67186 6.84625C5.85186 7.30378 6.20262 7.67949 6.65497 7.89928C6.8199 7.97942 7.0153 8.03452 7.40612 8.14474Z" stroke="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M20.4931 21.0005H3.99307" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      </g>
    </svg>
  </div>
</template>
