import React from 'react';
import { renderToString as renderReact } from 'react-dom/server';
import { render as renderSvelte } from 'svelte/server';
import { createSSRApp, h } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';

export async function renderEntries(entries) {
  const results = [];
  for (const entry of entries) {
    const props = { size: 48, controlled: true, 'aria-label': entry.name };
    results.push({
      name: entry.name,
      react: renderReact(
        React.createElement(entry.react, { size: 48, 'aria-label': entry.name })
      ),
      vue: await renderVue(createSSRApp({ render: () => h(entry.vue, props) })),
      svelte: renderSvelte(entry.svelte, { props }).body,
    });
  }
  return results;
}
