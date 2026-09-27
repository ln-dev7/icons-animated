export const FRAMEWORKS = ['react', 'vue', 'svelte'] as const;

export type IconFramework = (typeof FRAMEWORKS)[number];

export const FRAMEWORK_INFO = {
  react: {
    name: 'React',
    extension: 'tsx',
    cli: 'shadcn',
    version: 'React 19',
  },
  vue: {
    name: 'Vue',
    extension: 'vue',
    cli: 'shadcn-vue@latest',
    version: 'Vue 3.5+',
  },
  svelte: {
    name: 'Svelte',
    extension: 'svelte',
    cli: 'shadcn-svelte@latest',
    version: 'Svelte 5.20+',
  },
} as const;
