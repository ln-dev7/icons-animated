<script lang="ts">
// @ts-nocheck
/**
 * @license
 * MIT License
 * Choreography copyright (c) 2024-2026 pqoqubbw
 * Reference: party-popper @ 072c38b1b04ea738d90a084485ccaad4b890ddca
 *
 * Copyright (c) 2023 Phosphor Icons
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
import { onMount } from 'svelte';
let { size = 28, controlled = false, ...rest } = $props();
let root;
const instanceId = $props.id();
function createIconProgram(api) {
  const { Fragment, cn, forwardRef, getDefaultValueType, iconNode, motion, setTarget, useAnimation, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, useState, visualElementStore } = api;
function nativePartTarget(target, draw) {
    const drawKeys = new Set([
        'pathLength',
        'pathOffset',
        'pathSpacing',
        'strokeDasharray',
        'strokeDashoffset',
    ]);
    return Object.fromEntries(Object.entries(target).filter(([key]) => key === 'transition' ||
        (draw === 'geometry'
            ? key === 'd'
            : key !== 'd' && (draw ? drawKeys.has(key) : !drawKeys.has(key)))));
}
function nativePartVariants(variants, draw) {
    return Object.fromEntries(Object.entries(variants).map(([name, target]) => [
        name,
        typeof target === 'function'
            ? (...args) => nativePartTarget(target(...args), draw)
            : nativePartTarget(target, draw),
    ]));
}
const LINES_VARIANTS = {
    normal: {
        opacity: 1,
        pathLength: 1,
        scale: 1,
        translateX: 0,
        translateY: 0,
    },
    animate: {
        opacity: [0, 1],
        scale: [0.3, 0.8, 1, 1.1, 1],
        pathLength: [0, 0.5, 1],
        translateX: [-5, 0],
        translateY: [5, 0],
        transition: {
            duration: 0.7,
            velocity: 0.3,
        },
    },
};
const DOTS_VARIANTS = {
    normal: { opacity: 1, scale: 1, translateX: 0, translateY: 0 },
    animate: {
        opacity: [0, 1],
        translateX: [-5, 0],
        translateY: [5, 0],
        scale: [0.5, 0.8, 1, 1.1, 1],
        transition: {
            duration: 0.7,
        },
    },
};
const POPPER_VARIANTS = {
    normal: { translateX: 0, translateY: 0 },
    animate: {
        translateX: [-1.5, 0],
        translateY: [1.5, 0],
        transition: {
            velocity: 0.3,
        },
    },
};
const PhosphorConfettiIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const nativeMaskId = useId();
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const { rootRef: iconRootRef, reduceDefinition, ...iconAccessibility } = useIconAccessibility(ref, () => {
        isControlledRef.current = ref != null;
        return {
            startAnimation: () => controls.start('animate'),
            stopAnimation: () => controls.start('normal'),
        };
    }, [controls]);
    const handleMouseEnter = useCallback((e) => {
        if (isControlledRef.current) {
            void e;
        }
        else {
            controls.start('animate');
        }
    }, [controls]);
    const handleMouseLeave = useCallback((e) => {
        if (isControlledRef.current) {
            void e;
        }
        else {
            controls.start('normal');
        }
    }, [controls]);
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
        iconNode("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false" },
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: POPPER_VARIANTS }),
            iconNode(motion.g, { animate: reduceDefinition(controls), variants: POPPER_VARIANTS },
                iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("path", { d: "M 111.49 52.63 a 15.8 15.8 0 0 0 -26 5.77 L 33 202.78 A 15.83 15.83 0 0 0 47.76 224 a 16 16 0 0 0 5.46 -1 l 144.37 -52.5 a 15.8 15.8 0 0 0 5.78 -26 Z M 103.16 187.84 l -35 -35 l 13.16 -36.21 l 58.05 58.05 Z M 48.16 207.84 l 14 -38.41 l 24.45 24.45 Z M 156 168.64 L 87.36 100 l 13 -35.87 l 91.43 91.43 Z", fill: "currentColor" }))),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: DOTS_VARIANTS }),
            iconNode(motion.g, { animate: reduceDefinition(controls), variants: DOTS_VARIANTS },
                iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("path", { d: "M 242.53 79.59 l -24 8 a 8 8 0 0 1 -5.06 -15.18 l 24 -8 a 8 8 0 0 1 5.06 15.18 Z", fill: "currentColor" }))),
            iconNode(motion.g, { animate: reduceDefinition(controls), variants: DOTS_VARIANTS },
                iconNode("g", { transform: "scale(0.09375)" },
                    iconNode("path", { d: "M 136 40 V 16 a 8 8 0 0 1 16 0 V 40 a 8 8 0 0 1 -16 0 Z", fill: "currentColor" }))),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: DOTS_VARIANTS }),
            iconNode(motion.g, { animate: reduceDefinition(controls), variants: nativePartVariants(LINES_VARIANTS, false) },
                iconNode("defs", null,
                    iconNode("mask", { id: nativeMaskId + '-6', maskUnits: "userSpaceOnUse", x: "-24", y: "-24", width: "72", height: "72" },
                        iconNode(motion.path, { d: "M15 7.50279237536663l0.9074999998890736-0.795740051491367c0.11999999998533206-0.630586455898819 0.6749999999174928-1.081005352969404 1.3199999998386527-1.081005352969404h0.2849999999651636c0.6599999999193263 0 1.1624999998579042-0.5780375845739174 1.0874999998670718-1.2236380037084225a2.1770246691744943 2.1749999997341436 90 0 1 1.4699999998203177-2.342178264767042L20.999999999266603 1.4972070810921625", fill: "none", stroke: "white", strokeWidth: 5.733543916283979, strokeLinecap: "round", strokeLinejoin: "round", animate: reduceDefinition(controls), variants: nativePartVariants(LINES_VARIANTS, true) }))),
                iconNode("g", { mask: 'url(#' + nativeMaskId + '-6' + ')' },
                    iconNode("g", { transform: "scale(0.09375)" },
                        iconNode("path", { d: "M 160 72 a 37.8 37.8 0 0 1 3.84 -15.58 C 169.14 45.83 179.14 40 192 40 c 6.7 0 11 -2.29 13.65 -7.21 A 22 22 0 0 0 208 23.94 A 8 8 0 0 1 224 24 c 0 12.86 -8.52 32 -32 32 c -6.7 0 -11 2.29 -13.65 7.21 A 22 22 0 0 0 176 72.06 A 8 8 0 0 1 160 72 Z", fill: "currentColor" })))),
            iconNode(motion.g, { animate: reduceDefinition(controls), variants: nativePartVariants(LINES_VARIANTS, false) },
                iconNode("defs", null,
                    iconNode("mask", { id: nativeMaskId + '-7', maskUnits: "userSpaceOnUse", x: "-24", y: "-24", width: "72", height: "72" },
                        iconNode(motion.path, { d: "M19.50007881124548 12.74923231589079h0.4619287418280951c0.4259342944129188 0 0.7918778431338773-0.6413669064799518 0.8578676633950337-1.5047454344337328 0.09598519310713664-1.1223920863399155 0.6718963517499565-1.7884269507614037 1.187816764700816-1.3690716657552817L22.4996160958435 10.282436521737129", fill: "none", stroke: "white", strokeWidth: 5.576616219134198, strokeLinecap: "round", strokeLinejoin: "round", animate: reduceDefinition(controls), variants: nativePartVariants(LINES_VARIANTS, true) }))),
                iconNode("g", { mask: 'url(#' + nativeMaskId + '-7' + ')' },
                    iconNode("g", { transform: "scale(0.09375)" },
                        iconNode("path", { d: "M 237.66 122.34 a 8 8 0 1 1 -11.32 11.31 l -16 -16 a 8 8 0 0 1 11.32 -11.32 Z", fill: "currentColor" })))),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: LINES_VARIANTS }))));
});
PhosphorConfettiIcon.displayName = 'PhosphorConfettiIcon';
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

  return PhosphorConfettiIcon;
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
  <svg data-icon-node="0" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <g data-icon-node="0.0" display="none" />
    <g data-icon-node="0.1" >
      <g data-icon-node="0.1.0" transform="scale(0.09375)">
        <path data-icon-node="0.1.0.0" d="M 111.49 52.63 a 15.8 15.8 0 0 0 -26 5.77 L 33 202.78 A 15.83 15.83 0 0 0 47.76 224 a 16 16 0 0 0 5.46 -1 l 144.37 -52.5 a 15.8 15.8 0 0 0 5.78 -26 Z M 103.16 187.84 l -35 -35 l 13.16 -36.21 l 58.05 58.05 Z M 48.16 207.84 l 14 -38.41 l 24.45 24.45 Z M 156 168.64 L 87.36 100 l 13 -35.87 l 91.43 91.43 Z" fill="currentColor" />
      </g>
    </g>
    <g data-icon-node="0.2" display="none" />
    <g data-icon-node="0.3" >
      <g data-icon-node="0.3.0" transform="scale(0.09375)">
        <path data-icon-node="0.3.0.0" d="M 242.53 79.59 l -24 8 a 8 8 0 0 1 -5.06 -15.18 l 24 -8 a 8 8 0 0 1 5.06 15.18 Z" fill="currentColor" />
      </g>
    </g>
    <g data-icon-node="0.4" >
      <g data-icon-node="0.4.0" transform="scale(0.09375)">
        <path data-icon-node="0.4.0.0" d="M 136 40 V 16 a 8 8 0 0 1 16 0 V 40 a 8 8 0 0 1 -16 0 Z" fill="currentColor" />
      </g>
    </g>
    <g data-icon-node="0.5" display="none" />
    <g data-icon-node="0.6" >
      <defs data-icon-node="0.6.0" >
        <mask data-icon-node="0.6.0.0" id={instanceId + '-0' + "-6"} maskUnits="userSpaceOnUse" x="-24" y="-24" width="72" height="72">
          <path data-icon-node="0.6.0.0.0" d="M15 7.50279237536663l0.9074999998890736-0.795740051491367c0.11999999998533206-0.630586455898819 0.6749999999174928-1.081005352969404 1.3199999998386527-1.081005352969404h0.2849999999651636c0.6599999999193263 0 1.1624999998579042-0.5780375845739174 1.0874999998670718-1.2236380037084225a2.1770246691744943 2.1749999997341436 90 0 1 1.4699999998203177-2.342178264767042L20.999999999266603 1.4972070810921625" fill="none" stroke="white" stroke-width="5.733543916283979" stroke-linecap="round" stroke-linejoin="round" />
        </mask>
      </defs>
      <g data-icon-node="0.6.1" mask={"url(#" + instanceId + '-0' + "-6)"}>
        <g data-icon-node="0.6.1.0" transform="scale(0.09375)">
          <path data-icon-node="0.6.1.0.0" d="M 160 72 a 37.8 37.8 0 0 1 3.84 -15.58 C 169.14 45.83 179.14 40 192 40 c 6.7 0 11 -2.29 13.65 -7.21 A 22 22 0 0 0 208 23.94 A 8 8 0 0 1 224 24 c 0 12.86 -8.52 32 -32 32 c -6.7 0 -11 2.29 -13.65 7.21 A 22 22 0 0 0 176 72.06 A 8 8 0 0 1 160 72 Z" fill="currentColor" />
        </g>
      </g>
    </g>
    <g data-icon-node="0.7" >
      <defs data-icon-node="0.7.0" >
        <mask data-icon-node="0.7.0.0" id={instanceId + '-0' + "-7"} maskUnits="userSpaceOnUse" x="-24" y="-24" width="72" height="72">
          <path data-icon-node="0.7.0.0.0" d="M19.50007881124548 12.74923231589079h0.4619287418280951c0.4259342944129188 0 0.7918778431338773-0.6413669064799518 0.8578676633950337-1.5047454344337328 0.09598519310713664-1.1223920863399155 0.6718963517499565-1.7884269507614037 1.187816764700816-1.3690716657552817L22.4996160958435 10.282436521737129" fill="none" stroke="white" stroke-width="5.576616219134198" stroke-linecap="round" stroke-linejoin="round" />
        </mask>
      </defs>
      <g data-icon-node="0.7.1" mask={"url(#" + instanceId + '-0' + "-7)"}>
        <g data-icon-node="0.7.1.0" transform="scale(0.09375)">
          <path data-icon-node="0.7.1.0.0" d="M 237.66 122.34 a 8 8 0 1 1 -11.32 11.31 l -16 -16 a 8 8 0 0 1 11.32 -11.32 Z" fill="currentColor" />
        </g>
      </g>
    </g>
    <g data-icon-node="0.8" display="none" />
  </svg>
</div>
