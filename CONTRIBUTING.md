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

   c. Copy and paste the following template code into your new file:

   ```tsx
   'use client';

   import { useAnimation, motion } from 'motion/react';
   import type { HTMLAttributes } from 'react';
   import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
   import { cn } from '@/lib/utils';

   // For Huge Icons, use: Hugeicons[YourIconName]IconHandle
   // For Tabler Icons, use: Tabler[YourIconName]IconHandle
   // For Phosphor Icons, use: Phosphor[YourIconName]IconHandle
   export interface [Library][YourIconName]IconHandle {
     startAnimation: () => void;
     stopAnimation: () => void;
   }

   interface [Library][YourIconName]IconProps extends HTMLAttributes<HTMLDivElement> {
     size?: number;
   }

   const [Library][YourIconName]Icon = forwardRef<[Library][YourIconName]IconHandle, [Library][YourIconName]IconProps>(
     ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
       const controls = useAnimation();
       const isControlledRef = useRef(false);

       useImperativeHandle(ref, () => {
         isControlledRef.current = true;
         return {
           startAnimation: () => controls.start('animate'),
           stopAnimation: () => controls.start('normal'),
         };
       });

       const handleMouseEnter = useCallback(
         (e: React.MouseEvent<HTMLDivElement>) => {
           if (!isControlledRef.current) {
             controls.start('animate');
           } else {
             onMouseEnter?.(e);
           }
         },
         [controls, onMouseEnter]
       );

       const handleMouseLeave = useCallback(
         (e: React.MouseEvent<HTMLDivElement>) => {
           if (!isControlledRef.current) {
             controls.start('normal');
           } else {
             onMouseLeave?.(e);
           }
         },
         [controls, onMouseLeave]
       );

       return (
         <div
           className={cn(className)}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
           {...props}
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width={size}
             height={size}
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             {/* your svg code here */}
           </svg>
         </div>
       );
     }
   );

   [Library][YourIconName]Icon.displayName = '[Library][YourIconName]Icon';

   export { [Library][YourIconName]Icon };
   ```

   d. Replace `[Library]` with `Hugeicons`, `Tabler`, or `Phosphor` and `[YourIconName]` with your icon name in **PascalCase** (e.g., `HugeiconsHeartIcon`, `TablerHeartIcon`, `PhosphorStarIcon`).

   e. Find your icon on the respective icon library website:
   - Huge Icons: [hugeicons.com](https://hugeicons.com/)
   - Tabler: [tabler.io/icons](https://tabler.io/icons)
   - Phosphor: [phosphoricons.com](https://phosphoricons.com/)

   Copy the SVG path elements and replace the `{/* your svg code here */}` comment with the actual SVG content.

   f. Add your animation logic using Framer Motion's `motion` components and the `controls` object to create engaging hover animations.

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

8. **Update the registry (for new icons):**

   After creating a new icon, you need to update the registry so it can be used with the shadcn CLI.

   a. Open `scripts/registry-components.ts`

   b. Add your icon to the components array:

   ```tsx
   {
     'name': '[library]-[icon-name]',
     'path': path.join(__dirname, '../icons/[library]/[icon-name].tsx'),
     'registryDependencies': [],
     'dependencies': ['motion'],
   },
   ```

   c. Run the registry build:

   ```
   pnpm run gen-cli
   ```

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
