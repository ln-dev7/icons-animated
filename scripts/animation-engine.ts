/** Runtime versions used by the pinned Lucide Animated reference. */
export const ANIMATION_ENGINE_DEPENDENCIES = [
  'motion@13.1.1',
  'framer-motion@13.1.1',
  'motion-dom@13.1.1',
  'motion-utils@13.0.0',
];

export function withAnimationEngine(dependencies: string[] = []) {
  return [
    ...dependencies.filter(
      (dependency) =>
        !/^(?:motion|framer-motion|motion-dom|motion-utils)(?:@|$)/.test(
          dependency
        )
    ),
    ...ANIMATION_ENGINE_DEPENDENCIES,
  ];
}
