<script lang="ts">
// @ts-nocheck
import { SVGVisualElement, animateVisualElement, setTarget, scrapeSVGMotionValuesFromProps, resolveMotionValue, resolveVariantFromProps, isControllingVariants, isVariantNode, getDefaultValueType, visualElementStore, camelCaseAttributes, cubicBezier, easeInOut, easeOut, easeIn } from 'motion';
import { onMount } from 'svelte';
let { size = 28, controlled = false, ...rest } = $props();
let root;
const instanceId = $props.id();
function createIconProgram(api) {
  const { Fragment, cn, forwardRef, getDefaultValueType, iconNode, motion, setTarget, useAnimation, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, useState, visualElementStore } = api;
const CLOUD_VARIANTS = {
    normal: {
        x: 0,
        y: 0,
    },
    animate: {
        x: [-1, 1, -1, 1, 0],
        y: [-1, 1, -1, 1, 0],
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};
const SUN_VARIANTS = {
    normal: { opacity: 1 },
    animate: (i) => ({
        opacity: [0, 1],
        transition: { delay: i * 0.1, duration: 0.3 },
    }),
};
const PhosphorCloudSunIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const nativeMaskId = useId();
    const cloudControls = useAnimation();
    const sunControls = useAnimation();
    const isControlledRef = useRef(false);
    const { rootRef: iconRootRef, reduceDefinition, ...iconAccessibility } = useIconAccessibility(ref, () => {
        isControlledRef.current = ref != null;
        return {
            startAnimation: () => {
                cloudControls.start('animate');
                sunControls.start('animate');
            },
            stopAnimation: () => {
                cloudControls.start('normal');
                sunControls.start('normal');
            },
        };
    }, [cloudControls, sunControls]);
    const handleMouseEnter = useCallback((e) => {
        if (isControlledRef.current) {
            void e;
        }
        else {
            cloudControls.start('animate');
            sunControls.start('animate');
        }
    }, [cloudControls, sunControls]);
    const handleMouseLeave = useCallback((e) => {
        if (isControlledRef.current) {
            void e;
        }
        else {
            cloudControls.start('normal');
            sunControls.start('normal');
        }
    }, [cloudControls, sunControls]);
    return (iconNode("div", { className: cn(className), ...props, ref: iconRootRef, onMouseEnter: (event) => {
            if (!iconAccessibility.controlled && !iconAccessibility.reduced) {
                handleMouseEnter(event);
            }
            onMouseEnter?.(event);
        }, onMouseLeave: (event) => {
            if (!iconAccessibility.controlled) {
                handleMouseLeave(event);
            }
            onMouseLeave?.(event);
        }, onFocus: (event) => {
            if (!iconAccessibility.controlled && !iconAccessibility.reduced) {
                iconAccessibility.startAnimation();
            }
            props.onFocus?.(event);
        }, onBlur: (event) => {
            if (!iconAccessibility.controlled) {
                iconAccessibility.stopAnimation();
            }
            props.onBlur?.(event);
        } },
        iconNode("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false", style: { overflow: 'visible' } },
            iconNode(motion.g, { animate: reduceDefinition(cloudControls), initial: "normal", variants: CLOUD_VARIANTS },
                iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("g", null,
                        iconNode("defs", null,
                            iconNode("clipPath", { id: nativeMaskId + '-clip-0', clipPathUnits: "userSpaceOnUse" },
                                iconNode("path", { d: "M0 12.35H5.8L8.5 11.3L9.6 9L12.9 6H24V24H0Z", transform: "scale(10.666666666666666)", clipRule: "evenodd", shapeRendering: "crispEdges" }))),
                        iconNode("g", { clipPath: 'url(#' + nativeMaskId + '-clip-0)' },
                            iconNode("path", { d: "M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z", fill: "currentColor" }))))),
            [
                'M12 2v2',
                'm4.93 4.93 1.41 1.41',
                'M20 12h2',
                'm19.07 4.93-1.41 1.41',
                'M15.947 12.65a4 4 0 0 0-5.925-4.128',
            ].map((d, index) => (iconNode(motion.g, { animate: reduceDefinition(sunControls), custom: index + 1, initial: "normal", key: d, variants: SUN_VARIANTS },
                index === 0 && (iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("g", null,
                        iconNode("defs", null,
                            iconNode("clipPath", { id: nativeMaskId + '-clip-1', clipPathUnits: "userSpaceOnUse" },
                                iconNode("path", { d: "M7 0H9V5.2H7Z", transform: "scale(10.666666666666666)", clipRule: "evenodd", shapeRendering: "crispEdges" }))),
                        iconNode("g", { clipPath: 'url(#' + nativeMaskId + '-clip-1)' },
                            iconNode("path", { d: "M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z", fill: "currentColor" }))))),
                index === 1 && (iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("g", null,
                        iconNode("defs", null,
                            iconNode("clipPath", { id: nativeMaskId + '-clip-3', clipPathUnits: "userSpaceOnUse" },
                                iconNode("path", { d: "M2 4.5H5.2V7.5H2Z", transform: "scale(10.666666666666666)", clipRule: "evenodd", shapeRendering: "crispEdges" }))),
                        iconNode("g", { clipPath: 'url(#' + nativeMaskId + '-clip-3)' },
                            iconNode("path", { d: "M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z", fill: "currentColor" }))))),
                index === 2 && (iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("g", null,
                        iconNode("defs", null,
                            iconNode("clipPath", { id: nativeMaskId + '-clip-4', clipPathUnits: "userSpaceOnUse" },
                                iconNode("path", { d: "M0 9.5H4.5V12.3H0Z", transform: "scale(10.666666666666666)", clipRule: "evenodd", shapeRendering: "crispEdges" }))),
                        iconNode("g", { clipPath: 'url(#' + nativeMaskId + '-clip-4)' },
                            iconNode("path", { d: "M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z", fill: "currentColor" }))))),
                index === 3 && (iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("g", null,
                        iconNode("defs", null,
                            iconNode("clipPath", { id: nativeMaskId + '-clip-2', clipPathUnits: "userSpaceOnUse" },
                                iconNode("path", { d: "M11.2 3H14V6.2H11.2Z", transform: "scale(10.666666666666666)", clipRule: "evenodd", shapeRendering: "crispEdges" }))),
                        iconNode("g", { clipPath: 'url(#' + nativeMaskId + '-clip-2)' },
                            iconNode("path", { d: "M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z", fill: "currentColor" }))))),
                index === 4 && (iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("g", null,
                        iconNode("defs", null,
                            iconNode("clipPath", { id: nativeMaskId + '-clip-5', clipPathUnits: "userSpaceOnUse" },
                                iconNode("path", { d: "M-24-24H48V48H-24Z M0 12.35H5.8L8.5 11.3L9.6 9L12.9 6H24V24H0Z M7 0H9V5.2H7Z M11.2 3H14V6.2H11.2Z M2 4.5H5.2V7.5H2Z M0 9.5H4.5V12.3H0Z", transform: "scale(10.666666666666666)", clipRule: "evenodd", shapeRendering: "crispEdges" }))),
                        iconNode("g", { clipPath: 'url(#' + nativeMaskId + '-clip-5)' },
                            iconNode("path", { d: "M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z", fill: "currentColor" })))))))))));
});
PhosphorCloudSunIcon.displayName = 'PhosphorCloudSunIcon';
function useIconAccessibility(ref, createHandle, controllers) {
    const rawHandle = createHandle();
    const raw = useRef(rawHandle);
    useEffect(() => {
        raw.current = rawHandle;
    }, [rawHandle]);
    const controls = useRef(controllers);
    const rootRef = useRef(null);
    const preference = useRef(false);
    const mounted = useRef(true);
    const [reduced, setReduced] = useState(false);
    const api = useMemo(() => ({
        startAnimation() {
            if (mounted.current &&
                !preference.current &&
                !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                void raw.current.startAnimation();
            }
        },
        stopAnimation() {
            if (mounted.current)
                void raw.current.stopAnimation();
        },
    }), []);
    useImperativeHandle(ref, () => api, [api]);
    useEffect(() => {
        mounted.current = true;
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const snapshots = [];
        rootRef.current
            ?.querySelectorAll('svg, svg *')
            .forEach((element) => {
            const visual = visualElementStore.get(element);
            if (visual)
                snapshots.push({
                    visual,
                    values: { ...visual.latestValues },
                    attributes: Object.fromEntries([...element.attributes].map((attribute) => [
                        attribute.name,
                        attribute.value,
                    ])),
                });
        });
        const restore = () => {
            for (const snapshot of snapshots) {
                const { visual, values, attributes } = snapshot;
                visual.values.forEach((value) => value.stop());
                const props = visual.getProps();
                const reset = {};
                visual.values.forEach((_motionValue, key) => {
                    const attribute = key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
                    const defaults = {
                        opacity: 1,
                        pathLength: 1,
                        pathSpacing: 1,
                        pathOffset: 0,
                        strokeDashoffset: 0,
                    };
                    const value = values[key] ??
                        props.style?.[key] ??
                        props[key] ??
                        getDefaultValueType(key)?.default ??
                        defaults[key] ??
                        attributes[attribute];
                    if (typeof value === 'number' || typeof value === 'string')
                        reset[key] = value;
                });
                setTarget(visual, reset);
                visual.render();
            }
        };
        const activeControls = controls.current;
        const originals = activeControls.map((control) => {
            const original = control.start;
            control.start = (definition, transition) => {
                if (!mounted.current)
                    return new Promise(() => { });
                if (preference.current) {
                    control.set(definition);
                    return Promise.resolve();
                }
                return original(definition, transition);
            };
            return original;
        });
        const change = () => {
            preference.current = media.matches;
            setReduced(media.matches);
            if (media.matches) {
                void raw.current.stopAnimation();
                activeControls.forEach((control) => control.stop());
                restore();
            }
        };
        change();
        media.addEventListener('change', change);
        return () => {
            mounted.current = false;
            media.removeEventListener('change', change);
            activeControls.forEach((control, index) => {
                control.stop();
                control.start = originals[index];
            });
        };
    }, []);
    return {
        ...api,
        rootRef,
        controlled: ref != null,
        reduced,
        reduceDefinition(definition) {
            if (reduced &&
                definition &&
                typeof definition === 'object' &&
                !Array.isArray(definition) &&
                !('start' in definition)) {
                return {
                    ...definition,
                    transition: { type: false, duration: 0, delay: 0, repeat: 0 },
                };
            }
            return definition;
        },
    };
}

  return PhosphorCloudSunIcon;
}

function mountIconProgram(createProgram, container, getSize, isControlled, instanceId) {
  let alive = true;
  let cursor = 0;
  let idCounter = 0;
  let handle;
  let component;
  let currentTree;
  let rendering = false;
  let queued = false;
  const slots = [];
  const effects = [];
  const nodes = new Map();
  const controllers = new Set();
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const flat = values => values.flat(Infinity).filter(value => value !== null && value !== undefined && value !== false && value !== true);
  const isController = value => Boolean(value && value.__controller);
  const isLabel = value => typeof value === 'string' || Array.isArray(value);
  const svgCaseAttributes = new Set([...camelCaseAttributes, ...["viewBox","preserveAspectRatio","pathLength","gradientUnits","gradientTransform","patternUnits","patternContentUnits","patternTransform","maskUnits","maskContentUnits","clipPathUnits","markerWidth","markerHeight","markerUnits","refX","refY","textLength","lengthAdjust","keyPoints","keyTimes","keySplines","baseFrequency","kernelMatrix","kernelUnitLength","numOctaves","stitchTiles","stdDeviation","filterRes","filterUnits","primitiveUnits","xChannelSelector","yChannelSelector","pointsAtX","pointsAtY","pointsAtZ","specularConstant","specularExponent","surfaceScale","limitingConeAngle","targetX","targetY","preserveAlpha","tableValues","startOffset","repeatCount","repeatDur","calcMode"]]);
  const attributeName = name => svgCaseAttributes.has(name) ? name : name === 'className' ? 'class' : name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
  const motionKeys = new Set(['initial','animate','exit','variants','transition','custom','inherit','key','ref','children']);
  function sameDependencies(previous, next) {
    return previous && next && previous.length === next.length && next.every((value,index) => Object.is(value,previous[index]));
  }
  function dispatch(node, definition, override, instant = false) {
    if (instant) {
      const set = (visual, value) => {
        if (Array.isArray(value)) return [...value].reverse().forEach(label => set(visual,label));
        setTarget(visual,value);
        if (typeof value === 'string') visual.variantChildren?.forEach(child => set(child,value));
        visual.render();
      };
      set(node.visual,definition);
      return Promise.resolve();
    }
    return animateVisualElement(node.visual,definition,{transitionOverride:override});
  }
  function stopNode(node) { node.visual?.values.forEach(value => value.stop()); }
  function createController() {
    const subscribers = new Set();
    const control = {
      __controller:true, subscribers,
      start(definition,transitionOverride) {
        if (!alive || media.matches) return Promise.resolve();
        return Promise.all([...subscribers].map(node => dispatch(node,definition,transitionOverride)));
      },
      set(definition) {
        if (!alive) return;
        subscribers.forEach(node => { void dispatch(node,definition,undefined,true); });
      },
      stop() { subscribers.forEach(stopNode); },
    };
    controllers.add(control);
    return control;
  }
  function stored(initialize) {
    const index=cursor++;
    return slots[index] ?? (slots[index]=initialize());
  }
  function rerender() {
    if (!alive || queued) return;
    queued=true;
    const channel=new MessageChannel();
    channel.port1.onmessage=() => {channel.port1.close();channel.port2.close();queued=false;if(alive)draw();};
    channel.port2.postMessage(null);
  }
  const api = {
    iconNode:(tag,props,...children) => ({tag,props:props || {},children:flat(children)}),
    motion:new Proxy({}, {get:(_,key) => 'motion.' + String(key)}),
    Fragment:'fragment', AnimatePresence:'presence',
    forwardRef:callback => callback,
    useAnimation:() => stored(createController),
    useAnimationControls:() => stored(createController),
    useId:() => stored(() => instanceId + '-' + idCounter++),
    useRef:value => stored(() => ({current:value})),
    useState(initial) {
      const slot=stored(() => ({value:typeof initial === 'function' ? initial() : initial}));
      return [slot.value,value => {const next=typeof value === 'function' ? value(slot.value) : value;if(!Object.is(next,slot.value)){slot.value=next;rerender();}}];
    },
    useCallback(callback,dependencies) {
      const slot=stored(() => ({callback,dependencies}));
      if(!sameDependencies(slot.dependencies,dependencies)){slot.callback=callback;slot.dependencies=dependencies;}
      return slot.callback;
    },
    useMemo(callback,dependencies) {
      const slot=stored(() => ({value:callback(),dependencies}));
      if(!sameDependencies(slot.dependencies,dependencies)){slot.value=callback();slot.dependencies=dependencies;}
      return slot.value;
    },
    useEffect(callback,dependencies) {
      const slot=stored(() => ({dependencies:undefined,cleanup:undefined}));
      if(!sameDependencies(slot.dependencies,dependencies)){
        slot.dependencies=dependencies;
        effects.push(() => {slot.cleanup?.();slot.cleanup=callback();});
      }
    },
    useImperativeHandle(_ref,callback) { handle=callback(); },
    useReducedMotion:() => media.matches,
    cn:(...values) => values.filter(Boolean).join(' '),
    cubicBezier, easeInOut, easeOut, easeIn, getDefaultValueType, setTarget, visualElementStore,
  };
  api.useLayoutEffect=api.useEffect;
  function applyAttributes(element, props, previous = {}) {
    for (const [name,value] of Object.entries(props)) {
      if (motionKeys.has(name) || name.startsWith('on') || value === undefined || value === null || typeof value === 'function') continue;
      if (Object.is(value,previous[name])) continue;
      if (name === 'style') {
        for (const [key,item] of Object.entries(value)) {
          if (['originX','originY'].includes(key)) continue;
          if (Object.is(item,previous.style?.[key])) continue;
          element.style[key]=item;
        }
      } else element.setAttribute(attributeName(name),String(value));
    }
  }
  function motionNode(descriptor, element, id, parentVariant, inheritedInitial) {
    const props=descriptor.props;
    const controller=isController(props.animate) ? props.animate : undefined;
    const controlling=isControllingVariants(props);
    const variantNode=isVariantNode(props);
    let initial=props.initial;
    if(initial === undefined && variantNode && !controlling && props.inherit !== false) initial=inheritedInitial;
    const blockInitial=initial === false || inheritedInitial === false;
    const latestValues={};
    const scraped=scrapeSVGMotionValuesFromProps(props,{});
    for(const key in scraped) latestValues[key]=resolveMotionValue(scraped[key]);
    const initialTarget=blockInitial ? props.animate : initial;
    if(initialTarget && typeof initialTarget !== 'boolean' && !isController(initialTarget)) {
      const definitions=Array.isArray(initialTarget) ? initialTarget : [initialTarget];
      for(const definition of definitions) {
        const resolved=resolveVariantFromProps(props,definition);
        if(!resolved) continue;
        const {transition,transitionEnd,...target}=resolved;
        for(const key in target) {
          const raw=target[key];
          const value=Array.isArray(raw) ? raw[blockInitial ? raw.length-1 : 0] : raw;
          if(value !== null) latestValues[key]=value;
        }
        Object.assign(latestValues,transitionEnd);
      }
    }
    const visual=new SVGVisualElement({
      parent:parentVariant?.visual,props,presenceContext:null,reducedMotionConfig:'never',
      visualState:{latestValues,renderState:{style:{},transform:{},transformOrigin:{},vars:{},attrs:{}}},
    });
    visual.mount(element);
    visual.render();
    const node={id,tag:descriptor.tag,descriptor,element,props,visual,controller,rest:{...latestValues},attributes:Object.fromEntries([...element.attributes].map(attribute=>[attribute.name,attribute.value]))};
    controller?.subscribers.add(node);
    if(props.animate && !controller && !blockInitial && !media.matches) void dispatch(node,props.animate);
    return {node,nextVariant:node,nextInitial:initial};
  }
  function removeTree(id) {
    for(const [key,node] of nodes) if(key === id || key.startsWith(id + '.')) {
      node.controller?.subscribers.delete(node);
      stopNode(node);
      node.visual?.unmount();
      nodes.delete(key);
    }
  }
  function mountTree(descriptor, parentElement, id, parentVariant, inheritedInitial, reuse=true) {
    if(typeof descriptor === 'string' || typeof descriptor === 'number') {
      if(!reuse) parentElement.appendChild(document.createTextNode(String(descriptor)));
      return;
    }
    if(descriptor.tag === 'fragment' || descriptor.tag === 'presence') {
      let element=reuse ? container.querySelector('[data-icon-node="'+id+'"]') : null;
      if(!element){element=document.createElementNS('http://www.w3.org/2000/svg','g');element.setAttribute('data-icon-node',id);parentElement.appendChild(element);}
      const node={id,tag:descriptor.tag,element,props:descriptor.props,presence:descriptor.tag === 'presence',descriptor,parentVariant,inheritedInitial,pending:false,version:0};
      nodes.set(id,node);
      descriptor.children.forEach((child,index) => mountTree(child,element,id + '.' + index,parentVariant,descriptor.props.initial === false ? false : inheritedInitial,reuse));
      return;
    }
    const animated=descriptor.tag.startsWith('motion.');
    const tag=descriptor.tag.replace(/^motion\./,'');
    let element=reuse ? container.querySelector('[data-icon-node="'+id+'"]') : null;
    if(!element){element=document.createElementNS('http://www.w3.org/2000/svg',tag);element.setAttribute('data-icon-node',id);parentElement.appendChild(element);}
    applyAttributes(element,descriptor.props);
    let nextVariant=parentVariant, nextInitial=inheritedInitial;
    if(animated) {
      const result=motionNode(descriptor,element,id,parentVariant,inheritedInitial);
      nodes.set(id,result.node);nextVariant=result.nextVariant;nextInitial=result.nextInitial;
    } else nodes.set(id,{id,tag:descriptor.tag,descriptor,element,props:descriptor.props});
    descriptor.children.forEach((child,index) => mountTree(child,element,id + '.' + index,nextVariant,nextInitial,reuse));
  }
  function presenceKey(descriptor) { return descriptor.children.map((child,index) => child?.props?.key ?? index).join('|'); }
  function reconcile(descriptor, id, parentElement, parentVariant, inheritedInitial) {
    if(typeof descriptor !== 'object') return;
    const node=nodes.get(id);
    if(!node || node.tag !== descriptor.tag) {
      const before=node?.element.nextSibling;
      node?.element.remove();
      removeTree(id);
      mountTree(descriptor,parentElement,id,parentVariant,inheritedInitial,false);
      if(before?.parentNode === parentElement) parentElement.insertBefore(nodes.get(id).element,before);
      return;
    }
    if(descriptor.tag === 'presence') {
      node.next=descriptor;
      if(node.pending) {
        if(presenceKey(descriptor) !== presenceKey(node.descriptor)) return;
        node.pending=false;
        node.version++;
        for(const [key,child] of nodes) if(key.startsWith(id+'.') && child.visual && child.props.animate && !isController(child.props.animate)) void dispatch(child,child.props.animate);
      }
      if(presenceKey(descriptor) !== presenceKey(node.descriptor)) {
        node.pending=true;
        const version=++node.version;
        const exits=[];
        for(const [key,child] of nodes) if(!media.matches && key.startsWith(id+'.') && child.props?.exit) exits.push(dispatch(child,child.props.exit));
        void Promise.all(exits).then(() => {
          if(!alive || nodes.get(id) !== node || node.version !== version) return;
          const next=node.next;
          for(const childId of [...nodes.keys()]) if(childId.startsWith(id+'.')) removeTree(childId);
          node.element.replaceChildren();node.descriptor=next;node.pending=false;
          next.children.forEach((child,index) => mountTree(child,node.element,id+'.'+index,node.parentVariant,node.inheritedInitial,false));
        });
        return;
      }
    }
    if(descriptor.tag !== 'fragment' && descriptor.tag !== 'presence') applyAttributes(node.element,descriptor.props,node.props);
    node.props=descriptor.props;node.visual?.update(descriptor.props,null);
    const nextVariant=node.visual ? node : parentVariant;
    const nextInitial=descriptor.props.initial ?? inheritedInitial;
    descriptor.children.forEach((child,index) => reconcile(child,id+'.'+index,node.element,nextVariant,nextInitial));
    for(let index=descriptor.children.length;index<node.descriptor.children.length;index++) {
      const childId=id+'.'+index;
      nodes.get(childId)?.element.remove();
      removeTree(childId);
    }
    node.descriptor=descriptor;
  }
  function draw() {
    if(rendering) return;
    rendering=true;cursor=0;
    const tree=component({size:getSize()},isControlled() ? {} : null);
    if(tree.props.ref && typeof tree.props.ref === 'object') tree.props.ref.current=container;
    if(!currentTree) tree.children.forEach((child,index) => mountTree(child,container,String(index),undefined,undefined));
    else tree.children.forEach((child,index) => reconcile(child,String(index),container,undefined,undefined));
    currentTree=tree;rendering=false;
    effects.splice(0).forEach(effect => effect());
  }
  component=createProgram(api);
  draw();
  function startAnimation() {
    if(alive && !media.matches) return handle?.startAnimation();
  }
  function stopAnimation() {
    if(alive) return handle?.stopAnimation();
  }
  const start=event => {
    if(isControlled() || media.matches) return;
    const handler=currentTree.props[event.type === 'focusin' ? 'onFocus' : 'onMouseEnter'] ?? currentTree.props.onMouseEnter;
    if(handler) void handler(event);else void startAnimation();
  };
  const stop=event => {
    if(isControlled()) return;
    const handler=currentTree.props[event.type === 'focusout' ? 'onBlur' : 'onMouseLeave'] ?? currentTree.props.onMouseLeave;
    if(handler) void handler(event);else void stopAnimation();
  };
  const preferenceChanged=() => {
    if(media.matches) {
      void handle?.stopAnimation();
      controllers.forEach(controller => controller.stop());
      for(const node of nodes.values()) if(node.visual) {
        stopNode(node);
        const rest={};
        node.visual.values.forEach((_value,key) => {
          const value=node.rest[key] ?? node.props.style?.[key] ?? node.props[key] ?? getDefaultValueType(key)?.default ?? ({opacity:1,pathLength:1,pathSpacing:1,pathOffset:0,strokeDashoffset:0})[key] ?? node.attributes[attributeName(key)];
          if(value !== undefined) rest[key]=value;
        });
        setTarget(node.visual,rest);node.visual.render();
      }
    }
    rerender();
  };
  container.addEventListener('mouseenter',start);
  container.addEventListener('mouseleave',stop);
  container.addEventListener('focusin',start);
  container.addEventListener('focusout',stop);
  media.addEventListener('change',preferenceChanged);
  return {startAnimation,stopAnimation,update:draw,destroy() {
    alive=false;
    controllers.forEach(controller => controller.stop());
    for(const node of nodes.values()) {stopNode(node);node.visual?.unmount();}
    slots.forEach(slot => slot.cleanup?.());
    container.removeEventListener('mouseenter',start);
    container.removeEventListener('mouseleave',stop);
    container.removeEventListener('focusin',start);
    container.removeEventListener('focusout',stop);
    media.removeEventListener('change',preferenceChanged);
  }};
}

let controller;
export function startAnimation() { return controller?.startAnimation(); }
export function stopAnimation() { return controller?.stopAnimation(); }
$effect(() => { size; controlled; controller?.update(); });
onMount(() => {
  controller = mountIconProgram(createIconProgram, root, () => size, () => controlled, instanceId);
  return () => controller?.destroy();
});
</script>

<div  bind:this={root} {...rest} class={["", rest.class].filter(Boolean).join(' ')}>
  <svg data-icon-node="0" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" style="overflow: visible">
    <g data-icon-node="0.0" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box">
      <g data-icon-node="0.0.0" transform="scale(0.09375)">
        <g data-icon-node="0.0.0.0" >
          <defs data-icon-node="0.0.0.0.0" >
            <clipPath data-icon-node="0.0.0.0.0.0" id={instanceId + '-0' + "-clip-0"} clipPathUnits="userSpaceOnUse">
              <path data-icon-node="0.0.0.0.0.0.0" d="M0 12.35H5.8L8.5 11.3L9.6 9L12.9 6H24V24H0Z" transform="scale(10.666666666666666)" clip-rule="evenodd" shape-rendering="crispEdges" />
            </clipPath>
          </defs>
          <g data-icon-node="0.0.0.0.1" clip-path={"url(#" + instanceId + '-0' + "-clip-0)"}>
            <path data-icon-node="0.0.0.0.1.0" d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z" fill="currentColor" />
          </g>
        </g>
      </g>
    </g>
    <g data-icon-node="0.1" style="opacity: 1">
      <g data-icon-node="0.1.0" transform="scale(0.09375)">
        <g data-icon-node="0.1.0.0" >
          <defs data-icon-node="0.1.0.0.0" >
            <clipPath data-icon-node="0.1.0.0.0.0" id={instanceId + '-0' + "-clip-1"} clipPathUnits="userSpaceOnUse">
              <path data-icon-node="0.1.0.0.0.0.0" d="M7 0H9V5.2H7Z" transform="scale(10.666666666666666)" clip-rule="evenodd" shape-rendering="crispEdges" />
            </clipPath>
          </defs>
          <g data-icon-node="0.1.0.0.1" clip-path={"url(#" + instanceId + '-0' + "-clip-1)"}>
            <path data-icon-node="0.1.0.0.1.0" d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z" fill="currentColor" />
          </g>
        </g>
      </g>
    </g>
    <g data-icon-node="0.2" style="opacity: 1">
      <g data-icon-node="0.2.0" transform="scale(0.09375)">
        <g data-icon-node="0.2.0.0" >
          <defs data-icon-node="0.2.0.0.0" >
            <clipPath data-icon-node="0.2.0.0.0.0" id={instanceId + '-0' + "-clip-3"} clipPathUnits="userSpaceOnUse">
              <path data-icon-node="0.2.0.0.0.0.0" d="M2 4.5H5.2V7.5H2Z" transform="scale(10.666666666666666)" clip-rule="evenodd" shape-rendering="crispEdges" />
            </clipPath>
          </defs>
          <g data-icon-node="0.2.0.0.1" clip-path={"url(#" + instanceId + '-0' + "-clip-3)"}>
            <path data-icon-node="0.2.0.0.1.0" d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z" fill="currentColor" />
          </g>
        </g>
      </g>
    </g>
    <g data-icon-node="0.3" style="opacity: 1">
      <g data-icon-node="0.3.0" transform="scale(0.09375)">
        <g data-icon-node="0.3.0.0" >
          <defs data-icon-node="0.3.0.0.0" >
            <clipPath data-icon-node="0.3.0.0.0.0" id={instanceId + '-0' + "-clip-4"} clipPathUnits="userSpaceOnUse">
              <path data-icon-node="0.3.0.0.0.0.0" d="M0 9.5H4.5V12.3H0Z" transform="scale(10.666666666666666)" clip-rule="evenodd" shape-rendering="crispEdges" />
            </clipPath>
          </defs>
          <g data-icon-node="0.3.0.0.1" clip-path={"url(#" + instanceId + '-0' + "-clip-4)"}>
            <path data-icon-node="0.3.0.0.1.0" d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z" fill="currentColor" />
          </g>
        </g>
      </g>
    </g>
    <g data-icon-node="0.4" style="opacity: 1">
      <g data-icon-node="0.4.0" transform="scale(0.09375)">
        <g data-icon-node="0.4.0.0" >
          <defs data-icon-node="0.4.0.0.0" >
            <clipPath data-icon-node="0.4.0.0.0.0" id={instanceId + '-0' + "-clip-2"} clipPathUnits="userSpaceOnUse">
              <path data-icon-node="0.4.0.0.0.0.0" d="M11.2 3H14V6.2H11.2Z" transform="scale(10.666666666666666)" clip-rule="evenodd" shape-rendering="crispEdges" />
            </clipPath>
          </defs>
          <g data-icon-node="0.4.0.0.1" clip-path={"url(#" + instanceId + '-0' + "-clip-2)"}>
            <path data-icon-node="0.4.0.0.1.0" d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z" fill="currentColor" />
          </g>
        </g>
      </g>
    </g>
    <g data-icon-node="0.5" style="opacity: 1">
      <g data-icon-node="0.5.0" transform="scale(0.09375)">
        <g data-icon-node="0.5.0.0" >
          <defs data-icon-node="0.5.0.0.0" >
            <clipPath data-icon-node="0.5.0.0.0.0" id={instanceId + '-0' + "-clip-5"} clipPathUnits="userSpaceOnUse">
              <path data-icon-node="0.5.0.0.0.0.0" d="M-24-24H48V48H-24Z M0 12.35H5.8L8.5 11.3L9.6 9L12.9 6H24V24H0Z M7 0H9V5.2H7Z M11.2 3H14V6.2H11.2Z M2 4.5H5.2V7.5H2Z M0 9.5H4.5V12.3H0Z" transform="scale(10.666666666666666)" clip-rule="evenodd" shape-rendering="crispEdges" />
            </clipPath>
          </defs>
          <g data-icon-node="0.5.0.0.1" clip-path={"url(#" + instanceId + '-0' + "-clip-5)"}>
            <path data-icon-node="0.5.0.0.1.0" d="M 164 72 a 76.2 76.2 0 0 0 -20.26 2.73 a 55.63 55.63 0 0 0 -9.41 -11.54 l 9.51 -13.57 a 8 8 0 1 0 -13.11 -9.18 L 121.22 54 A 55.9 55.9 0 0 0 96 48 c -0.58 0 -1.16 0 -1.74 0 L 91.37 31.71 a 8 8 0 1 0 -15.75 2.77 L 78.5 50.82 A 56.1 56.1 0 0 0 55.23 65.67 L 41.61 56.14 a 8 8 0 1 0 -9.17 13.11 L 46 78.77 A 55.55 55.55 0 0 0 40 104 c 0 0.57 0 1.15 0 1.72 L 23.71 108.6 a 8 8 0 0 0 1.38 15.88 a 8.24 8.24 0 0 0 1.39 -0.12 l 16.32 -2.88 a 55.74 55.74 0 0 0 5.86 12.42 A 52 52 0 0 0 84 224 h 80 a 76 76 0 0 0 0 -152 Z M 56 104 a 40 40 0 0 1 72.54 -23.24 a 76.26 76.26 0 0 0 -35.62 40 a 52.14 52.14 0 0 0 -31 4.17 A 40 40 0 0 1 56 104 Z M 164 208 H 84 a 36 36 0 1 1 4.78 -71.69 c -0.37 2.37 -0.63 4.79 -0.77 7.23 a 8 8 0 0 0 16 0.92 a 58.91 58.91 0 0 1 1.88 -11.81 c 0 -0.16 0.09 -0.32 0.12 -0.48 A 60.06 60.06 0 1 1 164 208 Z" fill="currentColor" />
          </g>
        </g>
      </g>
    </g>
  </svg>
</div>
