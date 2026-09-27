<script lang="ts">
// @ts-nocheck
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
        translateY: [0, 3, 0],
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
        translateY: [0, 3, 0],
        scale: [1, 0.85, 1],
        originX: 1,
        originY: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};
const HugeiconsWavesArrowDownIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        iconNode(motion.svg, { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", focusable: "false", style: { overflow: 'visible' } },
            iconNode(motion.g, { animate: reduceDefinition(controls), initial: "normal", variants: SHAFT_VARIANTS },
                iconNode("path", { d: "M 11.25 8 C 11.25 8.41421 11.5858 8.75 12 8.75 C 12.4142 8.75 12.75 8.41421 12.75 8 H 12 H 11.25 Z M 12.75 3 C 12.75 2.58579 12.4142 2.25 12 2.25 C 11.5858 2.25 11.25 2.58579 11.25 3 L 12 3 L 12.75 3 Z M 12 8 H 12.75 L 12.75 3 L 12 3 L 11.25 3 L 11.25 8 H 12 Z", fill: "currentColor" })),
            iconNode(motion.g, { animate: reduceDefinition(controls), initial: "normal", variants: HEAD_VARIANTS },
                iconNode("path", { d: "M 12 9 L 12 9.75 L 12 9 Z M 15.6039 6.44479 C 15.8495 6.11127 15.7783 5.64177 15.4448 5.39613 C 15.1112 5.1505 14.6417 5.22174 14.3961 5.55526 L 15 6.00002 L 15.6039 6.44479 Z M 9.6039 5.55525 C 9.35827 5.22172 8.88877 5.15047 8.55525 5.3961 C 8.22172 5.64173 8.15047 6.11123 8.3961 6.44475 L 9 6 L 9.6039 5.55525 Z M 12 9 L 12 9.75 C 12.3077 9.75 12.5736 9.61559 12.7431 9.51341 C 12.9332 9.39881 13.1223 9.24928 13.2988 9.09329 C 13.6537 8.77979 14.029 8.37609 14.3628 7.99172 C 14.6997 7.60362 15.0093 7.21773 15.2337 6.9302 C 15.3462 6.78604 15.438 6.66568 15.502 6.58096 C 15.534 6.53859 15.5591 6.50507 15.5764 6.4819 C 15.585 6.47031 15.5917 6.4613 15.5963 6.45505 C 15.5986 6.45193 15.6004 6.4495 15.6017 6.44778 C 15.6023 6.44692 15.6028 6.44624 15.6032 6.44574 C 15.6034 6.44549 15.6035 6.44529 15.6036 6.44513 C 15.6037 6.44505 15.6038 6.44496 15.6038 6.44492 C 15.6038 6.44485 15.6039 6.44479 15 6.00002 C 14.3961 5.55526 14.3961 5.55522 14.3962 5.55519 C 14.3962 5.5552 14.3962 5.55518 14.3962 5.5552 C 14.3961 5.55522 14.3961 5.55529 14.396 5.5554 C 14.3958 5.55563 14.3955 5.55603 14.3951 5.55662 C 14.3942 5.55778 14.3929 5.55965 14.391 5.56221 C 14.3872 5.56731 14.3814 5.57515 14.3736 5.58553 C 14.3582 5.6063 14.335 5.63724 14.305 5.67689 C 14.2451 5.75624 14.1581 5.87026 14.0512 6.00734 C 13.8366 6.28231 13.5443 6.6464 13.2301 7.0083 C 12.9127 7.37392 12.5875 7.72022 12.3056 7.96921 C 12.1639 8.09447 12.0507 8.17931 11.9686 8.22878 C 11.866 8.29066 11.8899 8.25 12 8.25 L 12 9 Z M 9 6 C 8.3961 6.44475 8.39615 6.44482 8.3962 6.44489 C 8.39623 6.44493 8.39629 6.44501 8.39635 6.44509 C 8.39647 6.44525 8.39662 6.44546 8.3968 6.44571 C 8.39717 6.44621 8.39767 6.44689 8.39831 6.44775 C 8.39958 6.44946 8.40138 6.4519 8.40369 6.45502 C 8.40831 6.46126 8.415 6.47027 8.42364 6.48186 C 8.44091 6.50504 8.466 6.53855 8.498 6.58093 C 8.56199 6.66565 8.65381 6.78601 8.76631 6.93017 C 8.9907 7.2177 9.30024 7.60361 9.6372 7.99171 C 9.97093 8.37608 10.3463 8.77978 10.7011 9.09329 C 10.8777 9.24928 11.0668 9.39881 11.2569 9.51341 C 11.4264 9.61559 11.6923 9.75 12 9.75 L 12 9 L 12 8.25 C 12.11 8.25 12.1339 8.29066 12.0313 8.22878 C 11.9493 8.17932 11.8361 8.09447 11.6943 7.96922 C 11.4125 7.72022 11.0873 7.37392 10.7699 7.0083 C 10.4556 6.6464 10.1634 6.2823 9.94884 6.00733 C 9.84186 5.87025 9.75488 5.75623 9.69496 5.67688 C 9.66501 5.63723 9.64185 5.60629 9.62637 5.58552 C 9.61863 5.57514 9.61282 5.5673 9.60904 5.56219 C 9.60714 5.55964 9.60576 5.55777 9.6049 5.5566 C 9.60447 5.55602 9.60417 5.55561 9.604 5.55539 C 9.60392 5.55527 9.60387 5.5552 9.60385 5.55518 C 9.60384 5.55517 9.60385 5.55519 9.60385 5.55518 C 9.60387 5.55521 9.6039 5.55525 9 6 Z", fill: "currentColor" })),
            iconNode("path", { d: "M2 14.1932C2.68524 15.2443 3.57104 15.2443 4.27299 14.1932C6.52985 10.7408 8.67954 16.6764 10.273 14.2321C12.703 10.5694 14.4508 16.9218 16.273 14.1932C18.6492 10.5582 20.1295 16.5776 22 14.5842", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M2 20.1932C2.68524 21.2443 3.57104 21.2443 4.27299 20.1932C6.52985 16.7408 8.67954 22.6764 10.273 20.2321C12.703 16.5694 14.4508 22.9218 16.273 20.1932C18.6492 16.5582 20.1295 22.5776 22 20.5842", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }))));
});
HugeiconsWavesArrowDownIcon.displayName = 'HugeiconsWavesArrowDownIcon';
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

  return HugeiconsWavesArrowDownIcon;
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
      <path data-icon-node="0.0.0" d="M 11.25 8 C 11.25 8.41421 11.5858 8.75 12 8.75 C 12.4142 8.75 12.75 8.41421 12.75 8 H 12 H 11.25 Z M 12.75 3 C 12.75 2.58579 12.4142 2.25 12 2.25 C 11.5858 2.25 11.25 2.58579 11.25 3 L 12 3 L 12.75 3 Z M 12 8 H 12.75 L 12.75 3 L 12 3 L 11.25 3 L 11.25 8 H 12 Z" fill="currentColor" />
    </g>
    <g data-icon-node="0.1" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box">
      <path data-icon-node="0.1.0" d="M 12 9 L 12 9.75 L 12 9 Z M 15.6039 6.44479 C 15.8495 6.11127 15.7783 5.64177 15.4448 5.39613 C 15.1112 5.1505 14.6417 5.22174 14.3961 5.55526 L 15 6.00002 L 15.6039 6.44479 Z M 9.6039 5.55525 C 9.35827 5.22172 8.88877 5.15047 8.55525 5.3961 C 8.22172 5.64173 8.15047 6.11123 8.3961 6.44475 L 9 6 L 9.6039 5.55525 Z M 12 9 L 12 9.75 C 12.3077 9.75 12.5736 9.61559 12.7431 9.51341 C 12.9332 9.39881 13.1223 9.24928 13.2988 9.09329 C 13.6537 8.77979 14.029 8.37609 14.3628 7.99172 C 14.6997 7.60362 15.0093 7.21773 15.2337 6.9302 C 15.3462 6.78604 15.438 6.66568 15.502 6.58096 C 15.534 6.53859 15.5591 6.50507 15.5764 6.4819 C 15.585 6.47031 15.5917 6.4613 15.5963 6.45505 C 15.5986 6.45193 15.6004 6.4495 15.6017 6.44778 C 15.6023 6.44692 15.6028 6.44624 15.6032 6.44574 C 15.6034 6.44549 15.6035 6.44529 15.6036 6.44513 C 15.6037 6.44505 15.6038 6.44496 15.6038 6.44492 C 15.6038 6.44485 15.6039 6.44479 15 6.00002 C 14.3961 5.55526 14.3961 5.55522 14.3962 5.55519 C 14.3962 5.5552 14.3962 5.55518 14.3962 5.5552 C 14.3961 5.55522 14.3961 5.55529 14.396 5.5554 C 14.3958 5.55563 14.3955 5.55603 14.3951 5.55662 C 14.3942 5.55778 14.3929 5.55965 14.391 5.56221 C 14.3872 5.56731 14.3814 5.57515 14.3736 5.58553 C 14.3582 5.6063 14.335 5.63724 14.305 5.67689 C 14.2451 5.75624 14.1581 5.87026 14.0512 6.00734 C 13.8366 6.28231 13.5443 6.6464 13.2301 7.0083 C 12.9127 7.37392 12.5875 7.72022 12.3056 7.96921 C 12.1639 8.09447 12.0507 8.17931 11.9686 8.22878 C 11.866 8.29066 11.8899 8.25 12 8.25 L 12 9 Z M 9 6 C 8.3961 6.44475 8.39615 6.44482 8.3962 6.44489 C 8.39623 6.44493 8.39629 6.44501 8.39635 6.44509 C 8.39647 6.44525 8.39662 6.44546 8.3968 6.44571 C 8.39717 6.44621 8.39767 6.44689 8.39831 6.44775 C 8.39958 6.44946 8.40138 6.4519 8.40369 6.45502 C 8.40831 6.46126 8.415 6.47027 8.42364 6.48186 C 8.44091 6.50504 8.466 6.53855 8.498 6.58093 C 8.56199 6.66565 8.65381 6.78601 8.76631 6.93017 C 8.9907 7.2177 9.30024 7.60361 9.6372 7.99171 C 9.97093 8.37608 10.3463 8.77978 10.7011 9.09329 C 10.8777 9.24928 11.0668 9.39881 11.2569 9.51341 C 11.4264 9.61559 11.6923 9.75 12 9.75 L 12 9 L 12 8.25 C 12.11 8.25 12.1339 8.29066 12.0313 8.22878 C 11.9493 8.17932 11.8361 8.09447 11.6943 7.96922 C 11.4125 7.72022 11.0873 7.37392 10.7699 7.0083 C 10.4556 6.6464 10.1634 6.2823 9.94884 6.00733 C 9.84186 5.87025 9.75488 5.75623 9.69496 5.67688 C 9.66501 5.63723 9.64185 5.60629 9.62637 5.58552 C 9.61863 5.57514 9.61282 5.5673 9.60904 5.56219 C 9.60714 5.55964 9.60576 5.55777 9.6049 5.5566 C 9.60447 5.55602 9.60417 5.55561 9.604 5.55539 C 9.60392 5.55527 9.60387 5.5552 9.60385 5.55518 C 9.60384 5.55517 9.60385 5.55519 9.60385 5.55518 C 9.60387 5.55521 9.6039 5.55525 9 6 Z" fill="currentColor" />
    </g>
    <path data-icon-node="0.2" d="M2 14.1932C2.68524 15.2443 3.57104 15.2443 4.27299 14.1932C6.52985 10.7408 8.67954 16.6764 10.273 14.2321C12.703 10.5694 14.4508 16.9218 16.273 14.1932C18.6492 10.5582 20.1295 16.5776 22 14.5842" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
    <path data-icon-node="0.3" d="M2 20.1932C2.68524 21.2443 3.57104 21.2443 4.27299 20.1932C6.52985 16.7408 8.67954 22.6764 10.273 20.2321C12.703 16.5694 14.4508 22.9218 16.273 20.1932C18.6492 16.5582 20.1295 22.5776 22 20.5842" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
  </svg>
</div>
