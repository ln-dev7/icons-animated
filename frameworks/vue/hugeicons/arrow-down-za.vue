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
const SWAP_TRANSITION = {
    type: 'spring',
    stiffness: 240,
    damping: 24,
};
const SWAP_VARIANTS = {
    normal: {
        translateY: 0,
    },
    animate: (custom) => ({
        translateY: custom * 10,
    }),
};
const HugeiconsArrowDownZaIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
            iconNode("path", { d: "M3.75 16C3.75 16 6.69596 20 7.75003 20C8.80411 20 11.75 16 11.75 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode("path", { d: "M7.75 19V4", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }),
            iconNode(motion.path, { d: "M15.75 4H18.115C19.0386 4 19.5004 4 19.6353 4.28792C19.7701 4.57584 19.4745 4.93062 18.8832 5.64018L16.6168 8.35982C16.0255 9.06938 15.7299 9.42416 15.8647 9.71208C15.9996 10 16.4614 10 17.385 10H19.75", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", animate: reduceDefinition(controls), custom: 1, initial: "normal", transition: SWAP_TRANSITION, variants: SWAP_VARIANTS }),
            iconNode(motion.g, { animate: reduceDefinition(controls), custom: -1, initial: "normal", transition: SWAP_TRANSITION, variants: SWAP_VARIANTS },
                iconNode("path", { d: "M16.25 17.249C15.8358 17.249 15.5 17.5847 15.5 17.999C15.5 18.4132 15.8358 18.749 16.25 18.749V17.999V17.249ZM19.25 18.749C19.6642 18.749 20 18.4132 20 17.999C20 17.5847 19.6642 17.249 19.25 17.249V17.999V18.749ZM15.841 18.1076L15.1252 17.8839H15.1252L15.841 18.1076ZM14.5341 19.7752C14.4106 20.1706 14.6309 20.5913 15.0263 20.7148C15.4217 20.8384 15.8423 20.618 15.9659 20.2227L15.25 19.999L14.5341 19.7752ZM19.5341 20.2227C19.6577 20.618 20.0783 20.8384 20.4737 20.7148C20.8691 20.5913 21.0894 20.1706 20.9659 19.7752L20.25 19.999L19.5341 20.2227ZM19.659 18.1076L20.3748 17.8839V17.8839L19.659 18.1076ZM16.25 17.999V18.749H19.25V17.999V17.249H16.25V17.999ZM15.841 18.1076L15.1252 17.8839L14.5341 19.7752L15.25 19.999L15.9659 20.2227L16.5569 18.3313L15.841 18.1076ZM20.25 19.999L20.9659 19.7752L20.3748 17.8839L19.659 18.1076L18.9431 18.3313L19.5341 20.2227L20.25 19.999ZM15.841 18.1076L16.5569 18.3313C16.9552 17.0569 17.2324 16.175 17.4948 15.6036C17.6257 15.3186 17.7254 15.1749 17.7891 15.1094C17.8343 15.0629 17.8129 15.1016 17.75 15.1016V14.3516V13.6016C17.3195 13.6016 16.9735 13.7967 16.7141 14.0633C16.4733 14.3108 16.2884 14.6365 16.1317 14.9775C15.8191 15.6581 15.5094 16.6543 15.1252 17.8839L15.841 18.1076ZM19.659 18.1076L20.3748 17.8839C19.9906 16.6543 19.6809 15.6581 19.3683 14.9775C19.2116 14.6365 19.0267 14.3108 18.7859 14.0633C18.5265 13.7967 18.1805 13.6016 17.75 13.6016V14.3516V15.1016C17.6871 15.1016 17.6657 15.0629 17.7109 15.1094C17.7746 15.1749 17.8743 15.3186 18.0052 15.6036C18.2676 16.175 18.5448 17.0569 18.9431 18.3313L19.659 18.1076Z", fill: "currentColor" })))));
});
HugeiconsArrowDownZaIcon.displayName = 'HugeiconsArrowDownZaIcon';
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

  return HugeiconsArrowDownZaIcon;
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
      <path data-icon-node="0.0" d="M3.75 16C3.75 16 6.69596 20 7.75003 20C8.80411 20 11.75 16 11.75 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path data-icon-node="0.1" d="M7.75 19V4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      <path data-icon-node="0.2" d="M15.75 4H18.115C19.0386 4 19.5004 4 19.6353 4.28792C19.7701 4.57584 19.4745 4.93062 18.8832 5.64018L16.6168 8.35982C16.0255 9.06938 15.7299 9.42416 15.8647 9.71208C15.9996 10 16.4614 10 17.385 10H19.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box" />
      <g data-icon-node="0.3" style="transform: none; transform-origin: 50% 50%; transform-box: fill-box">
        <path data-icon-node="0.3.0" d="M16.25 17.249C15.8358 17.249 15.5 17.5847 15.5 17.999C15.5 18.4132 15.8358 18.749 16.25 18.749V17.999V17.249ZM19.25 18.749C19.6642 18.749 20 18.4132 20 17.999C20 17.5847 19.6642 17.249 19.25 17.249V17.999V18.749ZM15.841 18.1076L15.1252 17.8839H15.1252L15.841 18.1076ZM14.5341 19.7752C14.4106 20.1706 14.6309 20.5913 15.0263 20.7148C15.4217 20.8384 15.8423 20.618 15.9659 20.2227L15.25 19.999L14.5341 19.7752ZM19.5341 20.2227C19.6577 20.618 20.0783 20.8384 20.4737 20.7148C20.8691 20.5913 21.0894 20.1706 20.9659 19.7752L20.25 19.999L19.5341 20.2227ZM19.659 18.1076L20.3748 17.8839V17.8839L19.659 18.1076ZM16.25 17.999V18.749H19.25V17.999V17.249H16.25V17.999ZM15.841 18.1076L15.1252 17.8839L14.5341 19.7752L15.25 19.999L15.9659 20.2227L16.5569 18.3313L15.841 18.1076ZM20.25 19.999L20.9659 19.7752L20.3748 17.8839L19.659 18.1076L18.9431 18.3313L19.5341 20.2227L20.25 19.999ZM15.841 18.1076L16.5569 18.3313C16.9552 17.0569 17.2324 16.175 17.4948 15.6036C17.6257 15.3186 17.7254 15.1749 17.7891 15.1094C17.8343 15.0629 17.8129 15.1016 17.75 15.1016V14.3516V13.6016C17.3195 13.6016 16.9735 13.7967 16.7141 14.0633C16.4733 14.3108 16.2884 14.6365 16.1317 14.9775C15.8191 15.6581 15.5094 16.6543 15.1252 17.8839L15.841 18.1076ZM19.659 18.1076L20.3748 17.8839C19.9906 16.6543 19.6809 15.6581 19.3683 14.9775C19.2116 14.6365 19.0267 14.3108 18.7859 14.0633C18.5265 13.7967 18.1805 13.6016 17.75 13.6016V14.3516V15.1016C17.6871 15.1016 17.6657 15.0629 17.7109 15.1094C17.7746 15.1749 17.8743 15.3186 18.0052 15.6036C18.2676 16.175 18.5448 17.0569 18.9431 18.3313L19.659 18.1076Z" fill="currentColor" />
      </g>
    </svg>
  </div>
</template>
