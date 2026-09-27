<script lang="ts">
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
import { onMount } from 'svelte';
let { size = 28, controlled = false, ...rest } = $props();
let root;
const instanceId = $props.id();
function createIconProgram(api) {
  const { Fragment, cn, forwardRef, getDefaultValueType, iconNode, motion, setTarget, useAnimation, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, visualElementStore } = api;
const HEAD_VARIANTS = {
    normal: {
        translateY: 0,
    },
    animate: {
        translateY: [0, -3, 0],
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};
const SHAFT_VARIANTS = {
    normal: {
        translateX: 0,
        translateY: 0,
        scale: 1,
    },
    animate: {
        translateY: [0, -3, 0],
        scale: [1, 0.85, 1],
        originX: 1,
        originY: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};
const HugeiconsWavesArrowUpIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        iconNode(motion.svg, { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", focusable: "false", animate: reduceDefinition(controls), style: { overflow: 'visible' } },
            iconNode(motion.g, { animate: reduceDefinition(controls), initial: "normal", variants: SHAFT_VARIANTS },
                iconNode("path", { d: "M 12.75 4 C 12.75 3.58579 12.4142 3.25 12 3.25 C 11.5858 3.25 11.25 3.58579 11.25 4 L 12 4 L 12.75 4 Z M 11.25 9 C 11.25 9.41421 11.5858 9.75 12 9.75 C 12.4142 9.75 12.75 9.41421 12.75 9 H 12 H 11.25 Z M 12 4 L 11.25 4 L 11.25 9 H 12 H 12.75 L 12.75 4 L 12 4 Z", fill: "currentColor" })),
            iconNode(motion.g, { animate: reduceDefinition(controls), initial: "normal", variants: HEAD_VARIANTS },
                iconNode("path", { d: "M 12 3 L 12 2.25 L 12 3 Z M 14.3961 6.44474 C 14.6417 6.77826 15.1112 6.8495 15.4448 6.60387 C 15.7783 6.35823 15.8495 5.88873 15.6039 5.55521 L 15 5.99998 L 14.3961 6.44474 Z M 8.3961 5.55525 C 8.15047 5.88877 8.22172 6.35827 8.55525 6.6039 C 8.88877 6.84953 9.35827 6.77828 9.6039 6.44475 L 9 6 L 8.3961 5.55525 Z M 12 3 L 12 3.75 C 11.8899 3.75 11.866 3.70934 11.9686 3.77122 C 12.0507 3.82069 12.1639 3.90553 12.3056 4.03079 C 12.5875 4.27978 12.9127 4.62608 13.2301 4.9917 C 13.5443 5.3536 13.8366 5.71769 14.0512 5.99266 C 14.1581 6.12974 14.2451 6.24376 14.305 6.32311 C 14.335 6.36276 14.3582 6.3937 14.3736 6.41447 C 14.3814 6.42485 14.3872 6.43269 14.391 6.43779 C 14.3929 6.44035 14.3942 6.44222 14.3951 6.44338 C 14.3955 6.44397 14.3958 6.44437 14.396 6.4446 C 14.3961 6.44471 14.3961 6.44478 14.3962 6.44481 C 14.3962 6.44482 14.3962 6.4448 14.3962 6.44481 C 14.3961 6.44478 14.3961 6.44474 15 5.99998 C 15.6039 5.55521 15.6038 5.55515 15.6038 5.55508 C 15.6038 5.55504 15.6037 5.55495 15.6036 5.55487 C 15.6035 5.55471 15.6034 5.55451 15.6032 5.55426 C 15.6028 5.55376 15.6023 5.55308 15.6017 5.55222 C 15.6004 5.5505 15.5986 5.54807 15.5963 5.54495 C 15.5917 5.5387 15.585 5.52969 15.5764 5.5181 C 15.5591 5.49493 15.534 5.46141 15.502 5.41904 C 15.438 5.33432 15.3462 5.21396 15.2337 5.0698 C 15.0093 4.78228 14.6997 4.39638 14.3628 4.00828 C 14.029 3.62391 13.6537 3.22021 13.2988 2.90671 C 13.1223 2.75072 12.9332 2.60119 12.7431 2.48659 C 12.5736 2.38441 12.3077 2.25 12 2.25 L 12 3 Z M 9 6 C 9.6039 6.44475 9.60387 6.44479 9.60385 6.44482 C 9.60385 6.44482 9.60384 6.44483 9.60385 6.44482 C 9.60387 6.4448 9.60392 6.44473 9.604 6.44461 C 9.60417 6.44439 9.60447 6.44398 9.6049 6.4434 C 9.60576 6.44223 9.60714 6.44036 9.60904 6.43781 C 9.61282 6.4327 9.61863 6.42486 9.62637 6.41448 C 9.64185 6.39371 9.66501 6.36277 9.69496 6.32312 C 9.75488 6.24378 9.84186 6.12976 9.94884 5.99267 C 10.1634 5.7177 10.4556 5.3536 10.7699 4.9917 C 11.0873 4.62608 11.4125 4.27978 11.6943 4.03078 C 11.8361 3.90553 11.9493 3.82068 12.0313 3.77122 C 12.1339 3.70934 12.11 3.75 12 3.75 L 12 3 L 12 2.25 C 11.6923 2.25 11.4264 2.38441 11.2569 2.48659 C 11.0668 2.60119 10.8777 2.75072 10.7011 2.90671 C 10.3463 3.22022 9.97093 3.62392 9.6372 4.00829 C 9.30024 4.3964 8.9907 4.7823 8.76631 5.06983 C 8.65381 5.21399 8.56199 5.33435 8.498 5.41907 C 8.466 5.46145 8.44091 5.49496 8.42364 5.51814 C 8.415 5.52973 8.40831 5.53874 8.40369 5.54498 C 8.40138 5.5481 8.39958 5.55054 8.39831 5.55225 C 8.39767 5.55311 8.39717 5.55379 8.3968 5.55429 C 8.39662 5.55454 8.39647 5.55475 8.39635 5.55491 C 8.39629 5.55499 8.39623 5.55507 8.3962 5.55511 C 8.39615 5.55518 8.3961 5.55525 9 6 Z", fill: "currentColor" })),
            iconNode("path", { d: "M2 14.1932C2.68524 15.2443 3.57104 15.2443 4.27299 14.1932C6.52985 10.7408 8.67954 16.6764 10.273 14.2321C12.703 10.5694 14.4508 16.9218 16.273 14.1932C18.6492 10.5582 20.1295 16.5776 22 14.5842", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M2 20.1932C2.68524 21.2443 3.57104 21.2443 4.27299 20.1932C6.52985 16.7408 8.67954 22.6764 10.273 20.2321C12.703 16.5694 14.4508 22.9218 16.273 20.1932C18.6492 16.5582 20.1295 22.5776 22 20.5842", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }))));
});
HugeiconsWavesArrowUpIcon.displayName = 'HugeiconsWavesArrowUpIcon';
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

  return HugeiconsWavesArrowUpIcon;
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
  <svg data-icon-node="0" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" style="overflow: visible">
    <g data-icon-node="0.0" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box">
      <path data-icon-node="0.0.0" d="M 12.75 4 C 12.75 3.58579 12.4142 3.25 12 3.25 C 11.5858 3.25 11.25 3.58579 11.25 4 L 12 4 L 12.75 4 Z M 11.25 9 C 11.25 9.41421 11.5858 9.75 12 9.75 C 12.4142 9.75 12.75 9.41421 12.75 9 H 12 H 11.25 Z M 12 4 L 11.25 4 L 11.25 9 H 12 H 12.75 L 12.75 4 L 12 4 Z" fill="currentColor" />
    </g>
    <g data-icon-node="0.1" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box">
      <path data-icon-node="0.1.0" d="M 12 3 L 12 2.25 L 12 3 Z M 14.3961 6.44474 C 14.6417 6.77826 15.1112 6.8495 15.4448 6.60387 C 15.7783 6.35823 15.8495 5.88873 15.6039 5.55521 L 15 5.99998 L 14.3961 6.44474 Z M 8.3961 5.55525 C 8.15047 5.88877 8.22172 6.35827 8.55525 6.6039 C 8.88877 6.84953 9.35827 6.77828 9.6039 6.44475 L 9 6 L 8.3961 5.55525 Z M 12 3 L 12 3.75 C 11.8899 3.75 11.866 3.70934 11.9686 3.77122 C 12.0507 3.82069 12.1639 3.90553 12.3056 4.03079 C 12.5875 4.27978 12.9127 4.62608 13.2301 4.9917 C 13.5443 5.3536 13.8366 5.71769 14.0512 5.99266 C 14.1581 6.12974 14.2451 6.24376 14.305 6.32311 C 14.335 6.36276 14.3582 6.3937 14.3736 6.41447 C 14.3814 6.42485 14.3872 6.43269 14.391 6.43779 C 14.3929 6.44035 14.3942 6.44222 14.3951 6.44338 C 14.3955 6.44397 14.3958 6.44437 14.396 6.4446 C 14.3961 6.44471 14.3961 6.44478 14.3962 6.44481 C 14.3962 6.44482 14.3962 6.4448 14.3962 6.44481 C 14.3961 6.44478 14.3961 6.44474 15 5.99998 C 15.6039 5.55521 15.6038 5.55515 15.6038 5.55508 C 15.6038 5.55504 15.6037 5.55495 15.6036 5.55487 C 15.6035 5.55471 15.6034 5.55451 15.6032 5.55426 C 15.6028 5.55376 15.6023 5.55308 15.6017 5.55222 C 15.6004 5.5505 15.5986 5.54807 15.5963 5.54495 C 15.5917 5.5387 15.585 5.52969 15.5764 5.5181 C 15.5591 5.49493 15.534 5.46141 15.502 5.41904 C 15.438 5.33432 15.3462 5.21396 15.2337 5.0698 C 15.0093 4.78228 14.6997 4.39638 14.3628 4.00828 C 14.029 3.62391 13.6537 3.22021 13.2988 2.90671 C 13.1223 2.75072 12.9332 2.60119 12.7431 2.48659 C 12.5736 2.38441 12.3077 2.25 12 2.25 L 12 3 Z M 9 6 C 9.6039 6.44475 9.60387 6.44479 9.60385 6.44482 C 9.60385 6.44482 9.60384 6.44483 9.60385 6.44482 C 9.60387 6.4448 9.60392 6.44473 9.604 6.44461 C 9.60417 6.44439 9.60447 6.44398 9.6049 6.4434 C 9.60576 6.44223 9.60714 6.44036 9.60904 6.43781 C 9.61282 6.4327 9.61863 6.42486 9.62637 6.41448 C 9.64185 6.39371 9.66501 6.36277 9.69496 6.32312 C 9.75488 6.24378 9.84186 6.12976 9.94884 5.99267 C 10.1634 5.7177 10.4556 5.3536 10.7699 4.9917 C 11.0873 4.62608 11.4125 4.27978 11.6943 4.03078 C 11.8361 3.90553 11.9493 3.82068 12.0313 3.77122 C 12.1339 3.70934 12.11 3.75 12 3.75 L 12 3 L 12 2.25 C 11.6923 2.25 11.4264 2.38441 11.2569 2.48659 C 11.0668 2.60119 10.8777 2.75072 10.7011 2.90671 C 10.3463 3.22022 9.97093 3.62392 9.6372 4.00829 C 9.30024 4.3964 8.9907 4.7823 8.76631 5.06983 C 8.65381 5.21399 8.56199 5.33435 8.498 5.41907 C 8.466 5.46145 8.44091 5.49496 8.42364 5.51814 C 8.415 5.52973 8.40831 5.53874 8.40369 5.54498 C 8.40138 5.5481 8.39958 5.55054 8.39831 5.55225 C 8.39767 5.55311 8.39717 5.55379 8.3968 5.55429 C 8.39662 5.55454 8.39647 5.55475 8.39635 5.55491 C 8.39629 5.55499 8.39623 5.55507 8.3962 5.55511 C 8.39615 5.55518 8.3961 5.55525 9 6 Z" fill="currentColor" />
    </g>
    <path data-icon-node="0.2" d="M2 14.1932C2.68524 15.2443 3.57104 15.2443 4.27299 14.1932C6.52985 10.7408 8.67954 16.6764 10.273 14.2321C12.703 10.5694 14.4508 16.9218 16.273 14.1932C18.6492 10.5582 20.1295 16.5776 22 14.5842" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
    <path data-icon-node="0.3" d="M2 20.1932C2.68524 21.2443 3.57104 21.2443 4.27299 20.1932C6.52985 16.7408 8.67954 22.6764 10.273 20.2321C12.703 16.5694 14.4508 22.9218 16.273 20.1932C18.6492 16.5582 20.1295 22.5776 22 20.5842" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
  </svg>
</div>
