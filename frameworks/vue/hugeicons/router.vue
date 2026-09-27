<script setup lang="ts">
// @ts-nocheck
/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: https://github.com/pqoqubbw/icons/tree/072c38b1b04ea738d90a084485ccaad4b890ddca
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
import { SVGVisualElement, animateVisualElement, setTarget, scrapeSVGMotionValuesFromProps, resolveMotionValue, resolveVariantFromProps, isControllingVariants, isVariantNode, getDefaultValueType, visualElementStore, camelCaseAttributes, cubicBezier, easeInOut, easeOut, easeIn } from 'motion';
import { onMounted, onBeforeUnmount, shallowRef, useId, watch } from 'vue';
const props = defineProps({ size: { type: Number, default: 28 }, controlled: { type: Boolean, default: false } });
const root = shallowRef();
const instanceId = useId();
function createIconProgram(api) {
  const { Fragment, cn, forwardRef, getDefaultValueType, iconNode, motion, setTarget, useAnimation, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, visualElementStore } = api;
const PATH_VARIANTS = {
    normal: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
    fadeOut: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
    fadeIn: (i) => ({
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: i * 0.1,
        },
    }),
};
const HugeiconsRouterIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const isControlledRef = useRef(false);
    const runPathIntro = useCallback(async () => {
        await pathControls.start('fadeOut');
        pathControls.start('fadeIn');
    }, [pathControls]);
    const { rootRef: iconRootRef, reduceDefinition, ...iconAccessibility } = useIconAccessibility(ref, () => {
        isControlledRef.current = ref != null;
        return {
            startAnimation: async () => {
                await runPathIntro();
            },
            stopAnimation: () => {
                pathControls.start('normal');
            },
        };
    }, [pathControls]);
    const handleMouseEnter = useCallback(async (e) => {
        if (isControlledRef.current) {
            void e;
        }
        else {
            await runPathIntro();
        }
    }, [runPathIntro]);
    const handleMouseLeave = useCallback((e) => {
        if (isControlledRef.current) {
            void e;
        }
        else {
            pathControls.start('normal');
        }
    }, [pathControls]);
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
        iconNode(motion.svg, { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", focusable: "false" },
            iconNode("path", { d: "M17.5 22H6.5C4.62513 22 3.6877 22 3.03054 21.4695C2.8183 21.2982 2.63166 21.0908 2.47746 20.855C2 20.1248 2 19.0832 2 17C2 14.9168 2 13.8752 2.47746 13.145C2.63166 12.9092 2.8183 12.7018 3.03054 12.5305C3.6877 12 4.62513 12 6.5 12H17.5C19.3749 12 20.3123 12 20.9695 12.5305C21.1817 12.7018 21.3683 12.9092 21.5225 13.145C22 13.8752 22 14.9168 22 17C22 19.0832 22 20.1248 21.5225 20.855C21.3683 21.0908 21.1817 21.2982 20.9695 21.4695C20.3123 22 19.3749 22 17.5 22Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M 14.125 17 H 14 M 14.25 17 C 14.25 17.1381 14.1381 17.25 14 17.25 C 13.8619 17.25 13.75 17.1381 13.75 17 C 13.75 16.8619 13.8619 16.75 14 16.75 C 14.1381 16.75 14.25 16.8619 14.25 17 Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M 18.125 17 H 18 M 18.25 17 C 18.25 17.1381 18.1381 17.25 18 17.25 C 17.8619 17.25 17.75 17.1381 17.75 17 C 17.75 16.8619 17.8619 16.75 18 16.75 C 18.1381 16.75 18.25 16.8619 18.25 17 Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M6 17H10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M 12.5496 9.75039 C 12.9638 9.75039 13.2996 9.41461 13.2996 9.00039 C 13.2996 8.58618 12.9638 8.25039 12.5496 8.25039 V 9.00039 V 9.75039 Z M 12.4996 8.25039 C 12.0854 8.25039 11.7496 8.58618 11.7496 9.00039 C 11.7496 9.41461 12.0854 9.75039 12.4996 9.75039 V 9.00039 V 8.25039 Z M 12.5996 9.00039 H 11.8496 C 11.8496 8.64141 12.1406 8.35039 12.4996 8.35039 V 9.10039 V 9.85039 C 12.969 9.85039 13.3496 9.46984 13.3496 9.00039 H 12.5996 Z M 12.4996 9.10039 V 8.35039 C 12.8586 8.35039 13.1496 8.64141 13.1496 9.00039 H 12.3996 H 11.6496 C 11.6496 9.46984 12.0302 9.85039 12.4996 9.85039 V 9.10039 Z M 12.3996 9.00039 H 13.1496 C 13.1496 9.35938 12.8586 9.65039 12.4996 9.65039 V 8.90039 V 8.15039 C 12.0302 8.15039 11.6496 8.53095 11.6496 9.00039 H 12.3996 Z M 12.4996 8.90039 V 9.65039 C 12.1406 9.65039 11.8496 9.35938 11.8496 9.00039 H 12.5996 H 13.3496 C 13.3496 8.53095 12.969 8.15039 12.4996 8.15039 V 8.90039 Z M 12.5496 9.00039 V 8.25039 H 12.4996 V 9.00039 V 9.75039 H 12.5496 V 9.00039 Z", fill: "currentColor" }),
            iconNode(motion.path, { d: "M 9.70761 5.7897 C 9.42153 6.08925 9.43245 6.564 9.73201 6.85008 C 10.0316 7.13616 10.5063 7.12524 10.7924 6.82569 L 10.25 6.30769 L 9.70761 5.7897 Z M 14.2076 6.82569 C 14.4937 7.12524 14.9684 7.13616 15.268 6.85008 C 15.5675 6.564 15.5785 6.08925 15.2924 5.7897 L 14.75 6.30769 L 14.2076 6.82569 Z M 12.5 5.33182 V 4.58182 C 11.4028 4.58182 10.4153 5.04873 9.70761 5.7897 L 10.25 6.30769 L 10.7924 6.82569 C 11.2364 6.36077 11.8398 6.08182 12.5 6.08182 V 5.33182 Z M 14.75 6.30769 L 15.2924 5.7897 C 14.5847 5.04873 13.5972 4.58182 12.5 4.58182 V 5.33182 V 6.08182 C 13.1602 6.08182 13.7636 6.36077 14.2076 6.82569 L 14.75 6.30769 Z", fill: "currentColor", animate: reduceDefinition(pathControls), custom: 1, initial: { opacity: 1 }, variants: PATH_VARIANTS }),
            iconNode(motion.path, { d: "M 16.4576 4.46973 C 16.7437 4.76928 17.2184 4.7802 17.518 4.49412 C 17.8175 4.20804 17.8285 3.7333 17.5424 3.43374 L 17 3.95174 L 16.4576 4.46973 Z M 7.45761 3.43374 C 7.17153 3.7333 7.18245 4.20804 7.48201 4.49412 C 7.78156 4.7802 8.25631 4.76928 8.54239 4.46973 L 8 3.95174 L 7.45761 3.43374 Z M 17 3.95174 L 17.5424 3.43374 C 16.2589 2.08984 14.4759 1.25 12.5 1.25 V 2 V 2.75 C 14.0388 2.75 15.4378 3.40187 16.4576 4.46973 L 17 3.95174 Z M 12.5 2 V 1.25 C 10.5241 1.25 8.74108 2.08984 7.45761 3.43374 L 8 3.95174 L 8.54239 4.46973 C 9.56222 3.40187 10.9612 2.75 12.5 2.75 V 2 Z", fill: "currentColor", animate: reduceDefinition(pathControls), custom: 2, initial: { opacity: 1 }, variants: PATH_VARIANTS }))));
});
HugeiconsRouterIcon.displayName = 'HugeiconsRouterIcon';
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

  return HugeiconsRouterIcon;
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
function startAnimation() { return controller?.startAnimation(); }
function stopAnimation() { return controller?.stopAnimation(); }
onMounted(() => { controller = mountIconProgram(createIconProgram, root.value, () => props.size, () => props.controlled, instanceId); });
watch(() => [props.size, props.controlled], () => controller?.update());
onBeforeUnmount(() => controller?.destroy());
defineExpose({ startAnimation, stopAnimation });
</script>

<template>
  <div ref="root" class="">
    <svg data-icon-node="0" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path data-icon-node="0.0" d="M17.5 22H6.5C4.62513 22 3.6877 22 3.03054 21.4695C2.8183 21.2982 2.63166 21.0908 2.47746 20.855C2 20.1248 2 19.0832 2 17C2 14.9168 2 13.8752 2.47746 13.145C2.63166 12.9092 2.8183 12.7018 3.03054 12.5305C3.6877 12 4.62513 12 6.5 12H17.5C19.3749 12 20.3123 12 20.9695 12.5305C21.1817 12.7018 21.3683 12.9092 21.5225 13.145C22 13.8752 22 14.9168 22 17C22 19.0832 22 20.1248 21.5225 20.855C21.3683 21.0908 21.1817 21.2982 20.9695 21.4695C20.3123 22 19.3749 22 17.5 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path data-icon-node="0.1" d="M 14.125 17 H 14 M 14.25 17 C 14.25 17.1381 14.1381 17.25 14 17.25 C 13.8619 17.25 13.75 17.1381 13.75 17 C 13.75 16.8619 13.8619 16.75 14 16.75 C 14.1381 16.75 14.25 16.8619 14.25 17 Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path data-icon-node="0.2" d="M 18.125 17 H 18 M 18.25 17 C 18.25 17.1381 18.1381 17.25 18 17.25 C 17.8619 17.25 17.75 17.1381 17.75 17 C 17.75 16.8619 17.8619 16.75 18 16.75 C 18.1381 16.75 18.25 16.8619 18.25 17 Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path data-icon-node="0.3" d="M6 17H10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path data-icon-node="0.4" d="M 12.5496 9.75039 C 12.9638 9.75039 13.2996 9.41461 13.2996 9.00039 C 13.2996 8.58618 12.9638 8.25039 12.5496 8.25039 V 9.00039 V 9.75039 Z M 12.4996 8.25039 C 12.0854 8.25039 11.7496 8.58618 11.7496 9.00039 C 11.7496 9.41461 12.0854 9.75039 12.4996 9.75039 V 9.00039 V 8.25039 Z M 12.5996 9.00039 H 11.8496 C 11.8496 8.64141 12.1406 8.35039 12.4996 8.35039 V 9.10039 V 9.85039 C 12.969 9.85039 13.3496 9.46984 13.3496 9.00039 H 12.5996 Z M 12.4996 9.10039 V 8.35039 C 12.8586 8.35039 13.1496 8.64141 13.1496 9.00039 H 12.3996 H 11.6496 C 11.6496 9.46984 12.0302 9.85039 12.4996 9.85039 V 9.10039 Z M 12.3996 9.00039 H 13.1496 C 13.1496 9.35938 12.8586 9.65039 12.4996 9.65039 V 8.90039 V 8.15039 C 12.0302 8.15039 11.6496 8.53095 11.6496 9.00039 H 12.3996 Z M 12.4996 8.90039 V 9.65039 C 12.1406 9.65039 11.8496 9.35938 11.8496 9.00039 H 12.5996 H 13.3496 C 13.3496 8.53095 12.969 8.15039 12.4996 8.15039 V 8.90039 Z M 12.5496 9.00039 V 8.25039 H 12.4996 V 9.00039 V 9.75039 H 12.5496 V 9.00039 Z" fill="currentColor" />
      <path data-icon-node="0.5" d="M 9.70761 5.7897 C 9.42153 6.08925 9.43245 6.564 9.73201 6.85008 C 10.0316 7.13616 10.5063 7.12524 10.7924 6.82569 L 10.25 6.30769 L 9.70761 5.7897 Z M 14.2076 6.82569 C 14.4937 7.12524 14.9684 7.13616 15.268 6.85008 C 15.5675 6.564 15.5785 6.08925 15.2924 5.7897 L 14.75 6.30769 L 14.2076 6.82569 Z M 12.5 5.33182 V 4.58182 C 11.4028 4.58182 10.4153 5.04873 9.70761 5.7897 L 10.25 6.30769 L 10.7924 6.82569 C 11.2364 6.36077 11.8398 6.08182 12.5 6.08182 V 5.33182 Z M 14.75 6.30769 L 15.2924 5.7897 C 14.5847 5.04873 13.5972 4.58182 12.5 4.58182 V 5.33182 V 6.08182 C 13.1602 6.08182 13.7636 6.36077 14.2076 6.82569 L 14.75 6.30769 Z" fill="currentColor" style="opacity: 1" />
      <path data-icon-node="0.6" d="M 16.4576 4.46973 C 16.7437 4.76928 17.2184 4.7802 17.518 4.49412 C 17.8175 4.20804 17.8285 3.7333 17.5424 3.43374 L 17 3.95174 L 16.4576 4.46973 Z M 7.45761 3.43374 C 7.17153 3.7333 7.18245 4.20804 7.48201 4.49412 C 7.78156 4.7802 8.25631 4.76928 8.54239 4.46973 L 8 3.95174 L 7.45761 3.43374 Z M 17 3.95174 L 17.5424 3.43374 C 16.2589 2.08984 14.4759 1.25 12.5 1.25 V 2 V 2.75 C 14.0388 2.75 15.4378 3.40187 16.4576 4.46973 L 17 3.95174 Z M 12.5 2 V 1.25 C 10.5241 1.25 8.74108 2.08984 7.45761 3.43374 L 8 3.95174 L 8.54239 4.46973 C 9.56222 3.40187 10.9612 2.75 12.5 2.75 V 2 Z" fill="currentColor" style="opacity: 1" />
    </svg>
  </div>
</template>
