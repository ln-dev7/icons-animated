import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { mount, tick, unmount } from 'svelte';
import { createApp, h, nextTick, reactive } from 'vue';

import Host from './Host.svelte';

export function setupHarness(entries) {
  let disposers = [];
  let updateControlled = [];
  let readHandles = [];

  async function destroy() {
    const staleHandles = readHandles.map((read) => read()).filter(Boolean);
    await Promise.all(disposers.map((dispose) => dispose()));
    disposers = [];
    readHandles = [];
    updateControlled = [];
    document.body.replaceChildren();
    return staleHandles;
  }

  async function show() {
    await destroy();
    for (const entry of entries) {
      for (const framework of ['react', 'vue', 'svelte']) {
        const host = document.createElement('div');
        host.dataset.icon = entry.name;
        host.dataset.framework = framework;
        document.body.append(host);
        const iconProps = { size: 96, tabindex: 0, 'aria-label': entry.name };
        let getHandle;
        if (framework === 'react') {
          const root = createRoot(host);
          let handle;
          const render = (controlled) =>
            flushSync(() =>
              root.render(
                React.createElement(entry.react, {
                  size: iconProps.size,
                  tabIndex: 0,
                  'aria-label': entry.name,
                  ref: controlled
                    ? (value) => {
                        handle = value;
                      }
                    : undefined,
                })
              )
            );
          render(true);
          getHandle = () => handle;
          updateControlled.push(render);
          disposers.push(() => root.unmount());
        } else if (framework === 'vue') {
          const state = reactive({ ...iconProps, controlled: true });
          let handle;
          const app = createApp({
            setup: () => () =>
              h(entry.vue, { ...state, ref: (value) => (handle = value) }),
          });
          app.mount(host);
          getHandle = () => handle;
          updateControlled.push(
            (controlled) => (state.controlled = controlled)
          );
          disposers.push(() => app.unmount());
        } else {
          const wrapper = mount(Host, {
            target: host,
            props: { Icon: entry.svelte, iconProps },
          });
          getHandle = () => wrapper.getHandle();
          updateControlled.push((controlled) =>
            wrapper.setControlled(controlled)
          );
          disposers.push(() => unmount(wrapper));
        }
        readHandles.push(getHandle);
        host.handle = getHandle;
      }
    }
    await nextTick();
    await tick();
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );
  }

  function hosts(name) {
    return [...document.querySelectorAll(`[data-icon="${name}"]`)];
  }

  window.runtimeTest = {
    show,
    destroy,
    async setControlled(controlled) {
      updateControlled.forEach((update) => update(controlled));
      await nextTick();
      await tick();
    },
    invoke(name, method) {
      hosts(name).forEach((host) => host.handle()?.[method]());
    },
    focus(name) {
      hosts(name).forEach((host) =>
        host.firstElementChild.dispatchEvent(
          new FocusEvent('focusin', { bubbles: true })
        )
      );
    },
    snapshot(name) {
      return Object.fromEntries(
        hosts(name).map((host) => [
          host.dataset.framework,
          [...host.querySelectorAll('svg path, svg line, svg circle')].map(
            (element) => ({
              tag: element.tagName,
              geometry: ['d', 'x1', 'x2', 'y1', 'y2', 'cx', 'cy', 'r'].map(
                (attribute) => element.getAttribute(attribute)
              ),
              opacity: Number(getComputedStyle(element).opacity),
            })
          ),
        ])
      );
    },
    transforms(name) {
      return Object.fromEntries(
        hosts(name).map((host) => [
          host.dataset.framework,
          [...host.querySelectorAll('svg, svg *')].map(
            (element) => getComputedStyle(element).transform
          ),
        ])
      );
    },
    async destroyAndExerciseStaleHandles() {
      const staleHandles = await destroy();
      staleHandles.forEach((handle) => {
        handle.startAnimation();
        handle.stopAnimation();
      });
    },
  };
}
