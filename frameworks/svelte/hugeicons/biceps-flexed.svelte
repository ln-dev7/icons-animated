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
const BICEPS_FLEXED_PATH_VARIANTS = {
    normal: {
        rotate: 0,
        scale: 1,
    },
    animate: {
        rotate: [0, 15, 0],
        scale: [1, 1.3, 1],
        transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
        },
    },
};
const HugeiconsBicepsFlexedIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
            iconNode(motion.path, { d: "M14.0572 13.5007C15.0392 12.8626 16.2601 12.4845 17.583 12.4845C17.89 12.4845 18.1916 12.5087 18.4859 12.5541C20.5435 12.8711 21.5 15.1369 21.5 17.2882C21.5 19.4396 20.5229 21.6772 18.4586 21.944C18.173 21.9809 17.8806 22 17.583 22C16.0782 22 14.6783 21.7884 13.6388 20.9838C11.9516 21.7108 7.94665 22.2381 3.86255 19.5433C2.56508 18.6872 2.20099 16.9591 2.74139 15.4688C4.10525 11.7076 5.9132 8.13499 8.12417 4.83224L8.76809 3.87035C8.82437 3.78628 8.85254 3.7442 8.88188 3.70467C9.1131 3.39308 9.42667 3.15746 9.78466 3.0263C9.83008 3.00965 9.87745 2.99496 9.97218 2.96557L11.9827 2.34181C12.784 2.09319 13.1847 1.96887 13.5677 2.00667C13.8594 2.03547 14.1413 2.13138 14.3926 2.28739C14.7224 2.49217 14.9734 2.83828 15.4754 3.53048L15.8631 4.06515C16.0785 4.36218 16.1863 4.51069 16.2497 4.64886C16.5277 5.25409 16.391 5.9761 15.9127 6.42813C15.8035 6.53132 15.6496 6.62684 15.3417 6.81786C15.2057 6.90228 15.1376 6.9445 15.0688 6.9778C14.7741 7.12029 14.4422 7.15797 14.1246 7.08498C14.0504 7.06793 13.9752 7.04198 13.8246 6.99008L13.0976 6.73946C12.4006 6.4992 12.0522 6.37908 11.7252 6.5071C11.3982 6.63513 11.2247 6.94481 10.8776 7.56416C10.0227 9.09 9.09556 11.192 8.7256 13.8702C10.0358 13.0234 13.2458 12.041 15.6041 14.8864", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", animate: reduceDefinition(controls), initial: "normal", variants: BICEPS_FLEXED_PATH_VARIANTS }))));
});
HugeiconsBicepsFlexedIcon.displayName = 'HugeiconsBicepsFlexedIcon';
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

  return HugeiconsBicepsFlexedIcon;
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
    <path data-icon-node="0.0" d="M14.0572 13.5007C15.0392 12.8626 16.2601 12.4845 17.583 12.4845C17.89 12.4845 18.1916 12.5087 18.4859 12.5541C20.5435 12.8711 21.5 15.1369 21.5 17.2882C21.5 19.4396 20.5229 21.6772 18.4586 21.944C18.173 21.9809 17.8806 22 17.583 22C16.0782 22 14.6783 21.7884 13.6388 20.9838C11.9516 21.7108 7.94665 22.2381 3.86255 19.5433C2.56508 18.6872 2.20099 16.9591 2.74139 15.4688C4.10525 11.7076 5.9132 8.13499 8.12417 4.83224L8.76809 3.87035C8.82437 3.78628 8.85254 3.7442 8.88188 3.70467C9.1131 3.39308 9.42667 3.15746 9.78466 3.0263C9.83008 3.00965 9.87745 2.99496 9.97218 2.96557L11.9827 2.34181C12.784 2.09319 13.1847 1.96887 13.5677 2.00667C13.8594 2.03547 14.1413 2.13138 14.3926 2.28739C14.7224 2.49217 14.9734 2.83828 15.4754 3.53048L15.8631 4.06515C16.0785 4.36218 16.1863 4.51069 16.2497 4.64886C16.5277 5.25409 16.391 5.9761 15.9127 6.42813C15.8035 6.53132 15.6496 6.62684 15.3417 6.81786C15.2057 6.90228 15.1376 6.9445 15.0688 6.9778C14.7741 7.12029 14.4422 7.15797 14.1246 7.08498C14.0504 7.06793 13.9752 7.04198 13.8246 6.99008L13.0976 6.73946C12.4006 6.4992 12.0522 6.37908 11.7252 6.5071C11.3982 6.63513 11.2247 6.94481 10.8776 7.56416C10.0227 9.09 9.09556 11.192 8.7256 13.8702C10.0358 13.0234 13.2458 12.041 15.6041 14.8864" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box" />
  </svg>
</div>
