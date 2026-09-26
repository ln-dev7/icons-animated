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
      "opacity": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "opacity": [
        1,
        0.15,
        1
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
      "opacity": 1,
      "transition": {
        "duration": 0.18,
        "ease": "easeOut"
      }
    },
    "animate": {
      "opacity": [
        1,
        0.15,
        1
      ],
      "transition": {
        "duration": 0.55,
        "delay": 0.14,
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
        0.15,
        1
      ],
      "transition": {
        "duration": 0.55,
        "delay": 0.07,
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
        0.15,
        1
      ],
      "transition": {
        "duration": 0.55,
        "delay": 0.21000000000000002,
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
        <path d="M1.99219 7.99988C1.99219 6.11426 1.99219 5.17145 2.57797 4.58566C3.16376 3.99988 4.10657 3.99988 5.99219 3.99988H17.9922C19.8778 3.99988 20.8206 3.99988 21.4064 4.58566C21.9922 5.17145 21.9922 6.11426 21.9922 7.99988C21.9922 9.8855 21.9922 10.8283 21.4064 11.4141C20.8206 11.9999 19.8778 11.9999 17.9922 11.9999H5.99219C4.10657 11.9999 3.16376 11.9999 2.57797 11.4141C1.99219 10.8283 1.99219 9.8855 1.99219 7.99988Z" stroke="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M1.99219 16C1.99219 14.1143 1.99219 13.1714 2.57798 12.5856C3.16378 11.9998 4.10659 11.9999 5.99223 11.9999L17.9922 12C19.8778 12 20.8206 12 21.4064 12.5858C21.9922 13.1716 21.9922 14.1144 21.9922 16C21.9922 17.8857 21.9922 18.8285 21.4064 19.4143C20.8206 20.0001 19.8778 20.0001 17.9922 20.0001H5.99219C4.10657 20.0001 3.16376 20.0001 2.57797 19.4143C1.99219 18.8285 1.99219 17.8857 1.99219 16Z" stroke="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        <path d="M6.11719 7.99988H5.99219M6.24219 7.99988C6.24219 8.13795 6.13026 8.24988 5.99219 8.24988C5.85412 8.24988 5.74219 8.13795 5.74219 7.99988C5.74219 7.86181 5.85412 7.74988 5.99219 7.74988C6.13026 7.74988 6.24219 7.86181 6.24219 7.99988Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="1" />
        <path d="M6.11719 15.9999H5.99219M6.24219 15.9999C6.24219 16.1379 6.13026 16.2499 5.99219 16.2499C5.85412 16.2499 5.74219 16.1379 5.74219 15.9999C5.74219 15.8618 5.85412 15.7499 5.99219 15.7499C6.13026 15.7499 6.24219 15.8618 6.24219 15.9999Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="2" />
        <path d="M10.1172 7.99988H9.99219M10.2422 7.99988C10.2422 8.13795 10.1303 8.24988 9.99219 8.24988C9.85412 8.24988 9.74219 8.13795 9.74219 7.99988C9.74219 7.86181 9.85412 7.74988 9.99219 7.74988C10.1303 7.74988 10.2422 7.86181 10.2422 7.99988Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="3" />
        <path d="M10.1172 15.9999H9.99219M10.2422 15.9999C10.2422 16.1379 10.1303 16.2499 9.99219 16.2499C9.85412 16.2499 9.74219 16.1379 9.74219 15.9999C9.74219 15.8618 9.85412 15.7499 9.99219 15.7499C10.1303 15.7499 10.2422 15.8618 10.2422 15.9999Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform-box: fill-box; transform-origin: center" data-icon-part="4" />
      </g>
    </svg>
  </div>
</template>
