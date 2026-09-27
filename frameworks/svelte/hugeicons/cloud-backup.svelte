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
const BACKUP_VARIANTS = {
    normal: { rotate: 0 },
    animate: { rotate: -360 },
};
const BACKUP_TRANSITION = {
    duration: 0.8,
    ease: 'easeInOut',
};
const HugeiconsCloudBackupIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        iconNode("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", focusable: "false" },
            iconNode("path", { d: "M17.4776 9.00005C17.485 9.00002 17.4925 9 17.5 9C19.9853 9 22 11.0147 22 13.5C22 15.2415 21.0108 16.7519 19.5636 17.5M16.9003 11C17.2119 10.3904 17.4131 9.71494 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 14.9791 3.14985 16.6896 4.81794 17.5M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.7111 8 8.38754 8.14845 9 8.41604", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode(motion.g, { animate: reduceDefinition(controls), initial: "normal", transition: BACKUP_TRANSITION, variants: BACKUP_VARIANTS },
                iconNode("path", { d: "M7.82918 16.1646C7.64394 16.5351 7.79411 16.9856 8.16459 17.1708C8.53507 17.3561 8.98558 17.2059 9.17082 16.8354L8.5 16.5L7.82918 16.1646ZM9.5623 20.1495C9.28821 19.839 8.81425 19.8094 8.5037 20.0835C8.19315 20.3576 8.1636 20.8316 8.4377 21.1421L9 20.6458L9.5623 20.1495ZM8.93511 13.6125C8.99726 13.203 8.71565 12.8206 8.30612 12.7585C7.8966 12.6963 7.51423 12.978 7.45209 13.3875L8.1936 13.5L8.93511 13.6125ZM11.6125 17.5479C12.0221 17.4857 12.3037 17.1034 12.2415 16.6938C12.1794 16.2843 11.797 16.0027 11.3875 16.0649L11.5 16.8064L11.6125 17.5479ZM16 18H16.75C16.75 15.3766 14.6234 13.25 12 13.25V14V14.75C13.7949 14.75 15.25 16.2051 15.25 18H16ZM12 22V22.75C14.6234 22.75 16.75 20.6234 16.75 18H16H15.25C15.25 19.7949 13.7949 21.25 12 21.25V22ZM12 14V13.25C9.5419 13.25 8.35298 15.117 7.82918 16.1646L8.5 16.5L9.17082 16.8354C9.64702 15.883 10.4581 14.75 12 14.75V14ZM9 20.6458L8.4377 21.1421C9.30697 22.127 10.5812 22.75 12 22.75V22V21.25C11.0294 21.25 10.1589 20.8255 9.5623 20.1495L9 20.6458ZM8.19363 16.8064L8.72396 16.2761C8.8172 16.3693 8.81693 16.4411 8.79653 16.3588C8.78192 16.2999 8.76719 16.2017 8.75841 16.0597C8.74099 15.7779 8.75204 15.4163 8.77839 15.0426C8.80439 14.6738 8.84365 14.3152 8.8767 14.0472C8.89317 13.9136 8.90796 13.8038 8.91855 13.7277C8.92385 13.6898 8.92808 13.6603 8.93095 13.6407C8.93239 13.6308 8.93348 13.6235 8.93418 13.6187C8.93454 13.6164 8.93479 13.6146 8.93495 13.6136C8.93503 13.6131 8.93508 13.6127 8.93511 13.6125C8.93512 13.6125 8.93513 13.6124 8.93513 13.6124C8.93513 13.6124 8.93513 13.6124 8.93513 13.6124C8.93512 13.6125 8.93511 13.6125 8.1936 13.5C7.45209 13.3875 7.45208 13.3876 7.45207 13.3876C7.45206 13.3877 7.45204 13.3878 7.45203 13.3879C7.45201 13.388 7.45197 13.3882 7.45193 13.3885C7.45186 13.389 7.45175 13.3897 7.45162 13.3906C7.45136 13.3923 7.451 13.3947 7.45055 13.3978C7.44963 13.4039 7.44833 13.4127 7.44668 13.424C7.44338 13.4467 7.43868 13.4793 7.43292 13.5207C7.42139 13.6033 7.40555 13.7211 7.38798 13.8636C7.35297 14.1474 7.31055 14.5337 7.2821 14.9371C7.25401 15.3355 7.23784 15.7732 7.26126 16.1522C7.27291 16.3406 7.29561 16.5382 7.34056 16.7196C7.37973 16.8777 7.46115 17.1346 7.66329 17.3367L8.19363 16.8064ZM11.5 16.8064C11.3875 16.0649 11.3875 16.0649 11.3876 16.0648C11.3876 16.0648 11.3876 16.0648 11.3876 16.0648C11.3876 16.0648 11.3875 16.0648 11.3874 16.0649C11.3873 16.0649 11.3869 16.0649 11.3864 16.065C11.3853 16.0652 11.3836 16.0654 11.3813 16.0658C11.3765 16.0665 11.3692 16.0676 11.3593 16.069C11.3397 16.0719 11.3102 16.0761 11.2722 16.0814C11.1962 16.092 11.0863 16.1068 10.9528 16.1233C10.6848 16.1563 10.3262 16.1956 9.95741 16.2216C9.58373 16.248 9.22207 16.259 8.9403 16.2416C8.79827 16.2328 8.70012 16.2181 8.64115 16.2035C8.55886 16.1831 8.63072 16.1828 8.72396 16.2761L8.19363 16.8064L7.66329 17.3367C7.86544 17.5389 8.12231 17.6203 8.28039 17.6594C8.46181 17.7044 8.6594 17.7271 8.84777 17.7387C9.22678 17.7622 9.66449 17.746 10.0629 17.7179C10.4663 17.6894 10.8526 17.647 11.1365 17.612C11.2789 17.5944 11.3967 17.5786 11.4794 17.5671C11.5207 17.5613 11.5534 17.5566 11.576 17.5533C11.5873 17.5516 11.5961 17.5503 11.6022 17.5494C11.6053 17.549 11.6077 17.5486 11.6094 17.5483C11.6103 17.5482 11.611 17.5481 11.6115 17.548C11.6118 17.548 11.612 17.548 11.6122 17.5479C11.6122 17.5479 11.6123 17.5479 11.6124 17.5479C11.6125 17.5479 11.6125 17.5479 11.5 16.8064Z", fill: "currentColor" })))));
});
HugeiconsCloudBackupIcon.displayName = 'HugeiconsCloudBackupIcon';
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

  return HugeiconsCloudBackupIcon;
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
  <svg data-icon-node="0" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path data-icon-node="0.0" d="M17.4776 9.00005C17.485 9.00002 17.4925 9 17.5 9C19.9853 9 22 11.0147 22 13.5C22 15.2415 21.0108 16.7519 19.5636 17.5M16.9003 11C17.2119 10.3904 17.4131 9.71494 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 14.9791 3.14985 16.6896 4.81794 17.5M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.7111 8 8.38754 8.14845 9 8.41604" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
    <g data-icon-node="0.1" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box">
      <path data-icon-node="0.1.0" d="M7.82918 16.1646C7.64394 16.5351 7.79411 16.9856 8.16459 17.1708C8.53507 17.3561 8.98558 17.2059 9.17082 16.8354L8.5 16.5L7.82918 16.1646ZM9.5623 20.1495C9.28821 19.839 8.81425 19.8094 8.5037 20.0835C8.19315 20.3576 8.1636 20.8316 8.4377 21.1421L9 20.6458L9.5623 20.1495ZM8.93511 13.6125C8.99726 13.203 8.71565 12.8206 8.30612 12.7585C7.8966 12.6963 7.51423 12.978 7.45209 13.3875L8.1936 13.5L8.93511 13.6125ZM11.6125 17.5479C12.0221 17.4857 12.3037 17.1034 12.2415 16.6938C12.1794 16.2843 11.797 16.0027 11.3875 16.0649L11.5 16.8064L11.6125 17.5479ZM16 18H16.75C16.75 15.3766 14.6234 13.25 12 13.25V14V14.75C13.7949 14.75 15.25 16.2051 15.25 18H16ZM12 22V22.75C14.6234 22.75 16.75 20.6234 16.75 18H16H15.25C15.25 19.7949 13.7949 21.25 12 21.25V22ZM12 14V13.25C9.5419 13.25 8.35298 15.117 7.82918 16.1646L8.5 16.5L9.17082 16.8354C9.64702 15.883 10.4581 14.75 12 14.75V14ZM9 20.6458L8.4377 21.1421C9.30697 22.127 10.5812 22.75 12 22.75V22V21.25C11.0294 21.25 10.1589 20.8255 9.5623 20.1495L9 20.6458ZM8.19363 16.8064L8.72396 16.2761C8.8172 16.3693 8.81693 16.4411 8.79653 16.3588C8.78192 16.2999 8.76719 16.2017 8.75841 16.0597C8.74099 15.7779 8.75204 15.4163 8.77839 15.0426C8.80439 14.6738 8.84365 14.3152 8.8767 14.0472C8.89317 13.9136 8.90796 13.8038 8.91855 13.7277C8.92385 13.6898 8.92808 13.6603 8.93095 13.6407C8.93239 13.6308 8.93348 13.6235 8.93418 13.6187C8.93454 13.6164 8.93479 13.6146 8.93495 13.6136C8.93503 13.6131 8.93508 13.6127 8.93511 13.6125C8.93512 13.6125 8.93513 13.6124 8.93513 13.6124C8.93513 13.6124 8.93513 13.6124 8.93513 13.6124C8.93512 13.6125 8.93511 13.6125 8.1936 13.5C7.45209 13.3875 7.45208 13.3876 7.45207 13.3876C7.45206 13.3877 7.45204 13.3878 7.45203 13.3879C7.45201 13.388 7.45197 13.3882 7.45193 13.3885C7.45186 13.389 7.45175 13.3897 7.45162 13.3906C7.45136 13.3923 7.451 13.3947 7.45055 13.3978C7.44963 13.4039 7.44833 13.4127 7.44668 13.424C7.44338 13.4467 7.43868 13.4793 7.43292 13.5207C7.42139 13.6033 7.40555 13.7211 7.38798 13.8636C7.35297 14.1474 7.31055 14.5337 7.2821 14.9371C7.25401 15.3355 7.23784 15.7732 7.26126 16.1522C7.27291 16.3406 7.29561 16.5382 7.34056 16.7196C7.37973 16.8777 7.46115 17.1346 7.66329 17.3367L8.19363 16.8064ZM11.5 16.8064C11.3875 16.0649 11.3875 16.0649 11.3876 16.0648C11.3876 16.0648 11.3876 16.0648 11.3876 16.0648C11.3876 16.0648 11.3875 16.0648 11.3874 16.0649C11.3873 16.0649 11.3869 16.0649 11.3864 16.065C11.3853 16.0652 11.3836 16.0654 11.3813 16.0658C11.3765 16.0665 11.3692 16.0676 11.3593 16.069C11.3397 16.0719 11.3102 16.0761 11.2722 16.0814C11.1962 16.092 11.0863 16.1068 10.9528 16.1233C10.6848 16.1563 10.3262 16.1956 9.95741 16.2216C9.58373 16.248 9.22207 16.259 8.9403 16.2416C8.79827 16.2328 8.70012 16.2181 8.64115 16.2035C8.55886 16.1831 8.63072 16.1828 8.72396 16.2761L8.19363 16.8064L7.66329 17.3367C7.86544 17.5389 8.12231 17.6203 8.28039 17.6594C8.46181 17.7044 8.6594 17.7271 8.84777 17.7387C9.22678 17.7622 9.66449 17.746 10.0629 17.7179C10.4663 17.6894 10.8526 17.647 11.1365 17.612C11.2789 17.5944 11.3967 17.5786 11.4794 17.5671C11.5207 17.5613 11.5534 17.5566 11.576 17.5533C11.5873 17.5516 11.5961 17.5503 11.6022 17.5494C11.6053 17.549 11.6077 17.5486 11.6094 17.5483C11.6103 17.5482 11.611 17.5481 11.6115 17.548C11.6118 17.548 11.612 17.548 11.6122 17.5479C11.6122 17.5479 11.6123 17.5479 11.6124 17.5479C11.6125 17.5479 11.6125 17.5479 11.5 16.8064Z" fill="currentColor" />
    </g>
  </svg>
</div>
