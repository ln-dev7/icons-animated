# Animation reference and native geometry

The animation reference is the 467-icon [Lucide Animated](https://lucide-animated.com/) catalog, verified against [pqoqubbw/icons revision 072c38b1](https://github.com/pqoqubbw/icons/tree/072c38b1b04ea738d90a084485ccaad4b890ddca). All 467 published registry sources matched that snapshot. Its MIT notice is centralized in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). Include that file and [LICENSE](../LICENSE) when redistributing the components.

Native Hugeicons, Tabler and Phosphor geometry takes priority when the designs differ. The integration transfers the reference animation program: controllers, keyframes, durations, delays, easing, spring parameters, sequences, repeats, state changes and start/stop behavior. Paths are assigned by their meaning (hand, wheel, knob, flap, etc.). Compound native paths are partitioned where necessary so those parts can move independently.

## Scope

| Library   | Reference names covered | Adapted components | Total catalog |
| --------- | ----------------------: | -----------------: | ------------: |
| Hugeicons |                     467 |                467 |           479 |
| Tabler    |                     375 |                372 |           382 |
| Phosphor  |                     316 |                316 |           326 |

Several Tabler reference names have the same program and share a component. Different programs receive separate variants, such as `git-compare-arrows` and `users-round`. The 32 existing icons without a direct reference remain available; they are not counted as reference transfers. Missing native counterparts are listed in [catalog coverage](CATALOG_COVERAGE.md).

The [per-component ledger](animation-parity.json) records source paths, reference names, native part mappings, limitations and source hashes. It describes fidelity to an animation program, not pixel identity between different icon designs.

## Declared differences

- Native contour counts, dimensions and pivot positions differ. A reference gesture may drive multiple native contours, or have fewer contours to animate. Pivots and morph coordinates are adapted to the native design while retaining the source timing.
- Phosphor Regular uses filled shapes in a 256 × 256 coordinate system. A stroke being drawn in Lucide cannot always have the same visual effect on a filled shape. Native contours, partitions and clipping preserve the original glyph; unavoidable drawing differences appear in the ledger.
- Some native icons lack a permanent glyph detail animated by the reference. That detail remains absent. For example, the Hugeicons `volume` rest glyph has no mute cross. Missing details do not shorten an awaited reference animation sequence.
- Temporary effects, such as speed lines or a battery charge fill, may retain or adapt the reference overlay. They are hidden at rest and recorded separately from native glyph parts in the ledger.
- Source initial opacity and path length are preserved. An initially hidden check mark, a partly transparent folder or a final pose held until pointer leave can therefore differ from the static native package preview.
- The reference `accessibility` is a wheelchair, `radio` represents radio-frequency waves, and `delete` is a trash can. Their native matches were corrected; earlier public exports remain available.

## React, Vue and Svelte

React retains the complete adapted source program. Vue and Svelte components are generated from that same program, including state, effects, asynchronous controller sequences and presence transitions. They use the public Motion SVG animation engine directly and have no React runtime dependency. Generation evaluates reviewed local sources only at build time; downloaded components contain ordinary JavaScript without runtime `eval` or `Function` compilation.

The engine versions are pinned to the reference lockfile: `motion@13.1.1`, `framer-motion@13.1.1`, `motion-dom@13.1.1` and `motion-utils@13.0.0`. Registry entries carry the same pins so installing an icon does not silently change its interpolation or spring behavior.

Some framework CLIs save caret ranges in the consuming project's `package.json` even when the registry requests an exact version. Keep the generated lockfile, or use your package manager's exact-version option when recording these four dependencies, to retain the verified engine on future installs.

Keyboard focus and reduced-motion handling extend the reference interaction. Focus previews use the same program as hover. Reduced motion shows the normal pose and stops active motion, including when the preference changes during playback. Consumer callbacks are preserved. Controlled start/stop behavior and framework prop changes are checked separately from the normal hover timeline.

## Verification and maintenance

Verification combines source-program comparison, semantic mapping review, browser sampling against the reference, neutralized native-geometry comparisons, selected visual inspection and framework compilation. Rest-state geometry comparisons remove animation opacity and transforms so intentional initial states are not mistaken for missing native paths. Path partitions can produce small antialiasing differences.

This does not claim exhaustive visual inspection of every frame. Random keyboard sequences, infinite loops and different native silhouettes make that claim inappropriate. The ledger explicitly distinguishes adaptations and absent parts.

The integration was checked with TypeScript, all registry and catalog checks, 2,374 Vue/Svelte compilations, a production Next build and 27 site interaction checks. Browser smoke runs cover all 1,155 transfers. The 159 whole-icon transfers also passed 795 reference transform/opacity comparisons. The final accessibility integration was visually reviewed on 48 complex Hugeicons/Tabler examples, with 48 stable reduced-motion results; Phosphor and whole-icon browser runs were repeated after integration.

The permanent `pnpm check-framework-runtime` suite exercises React, Vue and Svelte with local native components. It checks nine server renders, live reduced-motion changes, controlled-to-autonomous prop updates, a quick restart during a presence exit, and immediate cleanup of all three Wi-Fi timers and media-query listeners. Install a Playwright Chromium browser with `pnpm exec playwright install chromium`, or set `FRAMEWORK_TEST_BROWSER` to an existing Chromium executable. See the [test harness notes](../scripts/framework-runtime-fixtures/README.md).

The official Vue and Svelte CLIs were also exercised in separate consuming projects: three icons per framework installed byte-identical to their registry sources, passed strict type checking without `allowJs`, and built with Vite. Generated SFCs use TypeScript wrappers; the embedded JavaScript program has a local type-check suppression, while the public component contract is checked by both framework type checkers. Permanent negative tests reject an unknown exported method and a nonnumeric `size`. A regression test covers dynamic mask IDs, which require expressions accepted by both the Vue compiler and `vue-tsc`.

After changing an icon:

1. Review its reference program and native part assignments, including interrupted playback and any awaited calls.
2. Update its ledger entry and source hash after formatting. Record any new native limitation.
3. Run `pnpm gen-cli`, `pnpm check-animation-parity`, `pnpm check-catalog-coverage`, `pnpm check-frameworks`, `pnpm check-framework-runtime`, `pnpm check-icon-content` and `pnpm exec tsc --noEmit`.
4. Exercise the changed icon in React, Vue and Svelte, including hover, stop, keyboard focus and reduced motion; inspect the resulting native shape.

An upstream revision or Motion version change requires a fresh comparison. The pinned snapshot is a reproducible baseline, not an assertion that future Lucide Animated releases remain identical.
