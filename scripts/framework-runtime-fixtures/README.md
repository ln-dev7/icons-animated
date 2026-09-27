# Framework runtime regression tests

Run `pnpm check-framework-runtime` after installing Chromium with `pnpm exec playwright install chromium`.

To use an existing browser, set `FRAMEWORK_TEST_BROWSER` to its executable path. The tests bind a random localhost port and remove their temporary generated components and bundles when finished.

The suite reads three maintained native components from this repository: Hugeicons Heart, Tabler Volume and Hugeicons Wi-Fi Low. It generates their Vue and Svelte ports in a temporary directory, then compares their behavior with the React source. No upstream checkout or copied icon catalog is needed.

The regressions cover live reduced motion changing a conditional presence branch, relinquishing controlled mode, reentering during an exit, server rendering without a DOM, and unmounting while Wi-Fi has a pending hide timer. The timer tracker watches the fixture's 1,500 ms hide delay, excluding unrelated framework timers such as Vue's global DevTools probe. All three framework timers must exist before teardown; they and the media listeners must return to zero immediately after teardown and remain at zero after the original delay. `Host.svelte` changes props through public Svelte APIs; it does not depend on Svelte's internal runtime.
