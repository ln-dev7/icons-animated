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
        "duration": 0.75,
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
        -180,
        -360
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
        -180,
        -360
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
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M4 12C4 13.3979 6.54955 14.5725 10 14.9055" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M14.5 16C15 15 16 13.5 18 13.5C20.2091 13.5 22 15.2909 22 17.5C22 19.7091 20.2091 21.5 18 21.5C16.8053 21.5 15.7329 20.9762 15 20.1458" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-origin: 18px 17.5px" data-icon-part="1" />
        <path d="M12 22C7.58172 22 4 20.6569 4 19L4 5M20 5V10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M17.0904 17.1176C17.5016 17.0677 17.7944 16.6939 17.7445 16.2827C17.6946 15.8715 17.3208 15.5787 16.9096 15.6286L17 16.3731L17.0904 17.1176ZM14.1936 16.3064L13.6633 16.8367H13.6633L14.1936 16.3064ZM14.9351 13.1125C14.9973 12.703 14.7156 12.3206 14.3061 12.2585C13.8966 12.1963 13.5142 12.478 13.4521 12.8875L14.1936 13L14.9351 13.1125ZM17 16.3731L16.9096 15.6286C16.4965 15.6787 15.9048 15.7387 15.3868 15.7486C15.1255 15.7536 14.908 15.7452 14.7515 15.7236C14.6733 15.7128 14.6303 15.7014 14.6139 15.6958C14.5884 15.687 14.6492 15.7013 14.724 15.7761L14.1936 16.3064L13.6633 16.8367C13.8183 16.9917 14.0007 17.0714 14.1297 17.1154C14.2678 17.1626 14.4125 17.1911 14.5465 17.2096C14.8147 17.2466 15.1207 17.254 15.4156 17.2483C16.0098 17.2369 16.6608 17.1698 17.0904 17.1176L17 16.3731ZM14.1936 16.3064L14.724 15.7761C14.8172 15.8693 14.8169 15.9411 14.7965 15.8588C14.7819 15.7999 14.7672 15.7017 14.7584 15.5597C14.741 15.2779 14.752 14.9163 14.7784 14.5426C14.8044 14.1738 14.8436 13.8152 14.8767 13.5472C14.8932 13.4136 14.908 13.3038 14.9186 13.2277C14.9238 13.1898 14.9281 13.1603 14.931 13.1407C14.9324 13.1308 14.9335 13.1235 14.9342 13.1187C14.9345 13.1164 14.9348 13.1146 14.9349 13.1136C14.935 13.1131 14.9351 13.1127 14.9351 13.1125C14.9351 13.1125 14.9351 13.1124 14.9351 13.1124C14.9351 13.1124 14.9351 13.1124 14.9351 13.1124C14.9351 13.1125 14.9351 13.1125 14.1936 13C13.4521 12.8875 13.4521 12.8876 13.4521 12.8876C13.4521 12.8877 13.452 12.8878 13.452 12.8879C13.452 12.888 13.452 12.8882 13.4519 12.8885C13.4519 12.889 13.4518 12.8897 13.4516 12.8906C13.4514 12.8923 13.451 12.8947 13.4505 12.8978C13.4496 12.9039 13.4483 12.9127 13.4467 12.924C13.4434 12.9467 13.4387 12.9793 13.4329 13.0207C13.4214 13.1033 13.4055 13.2211 13.388 13.3636C13.353 13.6474 13.3105 14.0337 13.2821 14.4371C13.254 14.8355 13.2378 15.2732 13.2613 15.6522C13.2729 15.8406 13.2956 16.0382 13.3406 16.2196C13.3797 16.3777 13.4611 16.6346 13.6633 16.8367L14.1936 16.3064Z" fill="currentColor" style="transform-origin: 18px 17.5px" data-icon-part="2" />
      </g>
    </svg>
  </div>
</template>
