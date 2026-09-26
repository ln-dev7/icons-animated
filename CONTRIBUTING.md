# Contributing

We welcome contributions to our project! Please follow these steps to contribute:

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine:

   ```
   git clone https://github.com/ln-dev7/icons-animated.git
   ```

3. Navigate to the project directory:

   ```
   cd icons-animated
   ```

4. Create a new branch for your feature or bug fix:

   ```
   git checkout -b your-branch-name
   ```

5. Install the project dependencies:

   ```
   pnpm install
   ```

6. **Create your animated icon:**

   a. Navigate to the appropriate icon library directory:
   - For Huge Icons: `/icons/hugeicons/`
   - For Tabler Icons: `/icons/tabler/`
   - For Phosphor Icons: `/icons/phosphor/`

   b. Create a new file with the icon name in lowercase, using hyphens for spaces:

   ```
   /icons/hugeicons/[icon-name].tsx
   # or
   /icons/tabler/[icon-name].tsx
   # or
   /icons/phosphor/[icon-name].tsx
   ```

   For example: `heart.tsx`, `arrow-right.tsx`, `user.tsx`

   c. Start from a current component such as [Hugeicons arrow-down](icons/hugeicons/arrow-down.tsx), preserving its playback lifecycle. Every icon must respect reduced motion, forward mouse/focus callbacks, reset before replay, cancel on unmount, and return to its normal pose after finishing. Keep declarative `normal` / `animate` variants so the Vue/Svelte generator can preserve the animation.

   d. Rename the component and its handle to match the library (`Hugeicons`, `Tabler`, or `Phosphor`) and your icon name in **PascalCase** (e.g., `HugeiconsHeartIcon`, `TablerHeartIcon`, `PhosphorStarIcon`).

   e. Find your icon on the respective icon library website:
   - Huge Icons: [hugeicons.com](https://hugeicons.com/)
   - Tabler: [tabler.io/icons](https://tabler.io/icons)
   - Phosphor: [phosphoricons.com](https://phosphoricons.com/)

   Replace the example SVG shapes with the exact native geometry and retain the library license notice.

   f. Add your animation logic using Motion’s `motion` components and the `controls` object to create engaging hover animations.

7. **Add your icon to the icon list:**

   a. Open the appropriate index file:
   - For Huge Icons: `icons/hugeicons/index.ts`
   - For Tabler: `icons/tabler/index.ts`
   - For Phosphor: `icons/phosphor/index.ts`

   b. Import your new icon component at the top of the file:

   ```tsx
   import { [Library][YourIconName]Icon } from '@/icons/[library]/[icon-name]';
   ```

   c. Add your icon to the `[LIBRARY]_ICON_LIST` array:

   ```tsx
   {
     name: '[icon-name]',
     icon: [Library][YourIconName]Icon,
     keywords: ['keyword1', 'keyword2', 'keyword3'],
   },
   ```

   d. Export your icon at the bottom of the file:

   ```tsx
   export { [Library][YourIconName]Icon } from '@/icons/[library]/[icon-name]';
   ```

8. **Generate and verify the registry:**

   After adding or modifying an icon, run:

   ```
   pnpm run gen-cli
   ```

   This formats and lints the sources first, discovers every `.tsx` icon recursively in the three library directories (excluding `index.tsx`), synchronizes the manifest, builds `registry.json` and `public/r/*.json`, and verifies their contents. New icons receive the registry name `[library]-[icon-name]` and the `motion` dependency automatically. No manual manifest entry is needed. Existing entries retain their custom metadata and dependencies; removed source files are removed from the generated registry.

   Keep icon file names unique within each library, including nested directories. The same name in different libraries is allowed. Keep each library's imports, list and named exports in sync with its source files.

   These checks are read-only and can also run in CI:

   ```
   pnpm run check-imports
   pnpm run check-registry
   ```

   `check-imports` verifies imports, list names, component references and exports for every library. `check-registry` also checks for missing or orphaned manifest entries, stale generated files, and exact agreement between each distributed component and its source. Commit the generated manifest, `registry.json` and affected `public/r/*.json` files with the icon.

9. Build the project to check for errors:

   ```
   pnpm build
   ```

10. Test the application to ensure your changes work as expected:

    ```
    pnpm lint
    ```

11. Commit your changes:

    ```
    git commit -m "Add [library]-[icon-name] animated icon"
    ```

12. Push your changes to your fork:

    ```
    git push origin your-branch-name
    ```

13. Open a pull request on the original repository with a clear description of the icon you've added and the animation you've implemented.

## Icon Naming Convention

- Use lowercase with hyphens for file names: `heart.tsx`, `arrow-right.tsx`
- Use PascalCase with library prefix for component names: `HugeiconsHeartIcon`, `TablerHeartIcon`, `PhosphorArrowRightIcon`
- Follow the original icon library naming conventions

## Resources

- [Huge Icons](https://hugeicons.com/)
- [Tabler Icons](https://tabler.io/icons)
- [Phosphor Icons](https://phosphoricons.com/)
- [Motion (Framer Motion)](https://motion.dev/)
- [Original project: lucide-animated](https://lucide-animated.com/)

Thank you for contributing to our project!

## Vue and Svelte distribution

React files under `icons/` are the canonical source. `pnpm gen-cli` also generates standalone components under `frameworks/vue/` and `frameworks/svelte/`, and publishes their registries under `public/r/vue/` and `public/r/svelte/`. Commit those generated files with the source change. Do not hand-edit generated ports.

Run `pnpm check-frameworks` and `pnpm check-icon-content` along with the existing catalog checks. Test the actual animation at rest, on hover/focus, on repeated imperative calls, after cancellation, and with reduced motion enabled. A new source pattern must be supported by the generator before the icon can be published in all three formats.
