<script lang="ts">
// @ts-nocheck
import { SVGVisualElement, animateVisualElement, setTarget, scrapeSVGMotionValuesFromProps, resolveMotionValue, resolveVariantFromProps, isControllingVariants, isVariantNode, getDefaultValueType, visualElementStore, camelCaseAttributes, cubicBezier, easeInOut, easeOut, easeIn } from 'motion';
import { onMount } from 'svelte';
let { size = 28, controlled = false, ...rest } = $props();
let root;
const instanceId = $props.id();
function createIconProgram(api) {
  const { Fragment, cn, forwardRef, getDefaultValueType, iconNode, motion, setTarget, useAnimation, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, visualElementStore } = api;
const WIND_VARIANTS = {
    normal: (custom) => ({
        pathLength: 1,
        opacity: 1,
        pathOffset: 0,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
            delay: custom,
        },
    }),
    animate: (custom) => ({
        pathLength: [0, 1],
        opacity: [0, 1],
        pathOffset: [1, 0],
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
            delay: custom,
        },
    }),
};
const ARROW_VARIANTS = {
    normal: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
    animate: {
        y: [-10, 0],
        opacity: [0, 1],
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
            delay: 0.35,
        },
    },
};
const HugeiconsWindArrowDownIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
            iconNode(motion.path, { d: "M9 18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18C15 16.3431 13.6569 15 12 15H3", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", animate: reduceDefinition(controls), custom: 0.2, initial: "normal", variants: WIND_VARIANTS }),
            iconNode(motion.path, { d: "M15 9C15 7.34315 16.3431 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", animate: reduceDefinition(controls), custom: 0.4, initial: "normal", variants: WIND_VARIANTS }),
            iconNode(motion.path, { d: "M9.25 8C9.25 8.41421 9.58579 8.75 10 8.75C10.4142 8.75 10.75 8.41421 10.75 8H10H9.25ZM10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3L10 3L10.75 3ZM9.99998 9L9.99999 9.75L9.99998 9ZM13.1039 6.94478C13.3495 6.61126 13.2783 6.14177 12.9448 5.89613C12.6112 5.65049 12.1417 5.72174 11.8961 6.05526L12.5 6.50002L13.1039 6.94478ZM8.1039 6.05525C7.85827 5.72172 7.38877 5.65047 7.05525 5.8961C6.72172 6.14173 6.65047 6.61123 6.8961 6.94475L7.5 6.5L8.1039 6.05525ZM10 8H10.75L10.75 3L10 3L9.25 3L9.25 8H10ZM9.99998 9L9.99999 9.75C10.2912 9.75 10.5369 9.6234 10.6838 9.53489C10.8512 9.43397 11.0151 9.30397 11.1651 9.17142C11.4669 8.90479 11.7839 8.56359 12.0634 8.24172C12.3461 7.91612 12.6055 7.59272 12.7933 7.35207C12.8875 7.23135 12.9644 7.13052 13.0181 7.05948C13.0449 7.02393 13.066 6.99579 13.0805 6.97628C13.0878 6.96652 13.0934 6.95891 13.0974 6.95362C13.0993 6.95097 13.1009 6.94889 13.102 6.94741C13.1025 6.94668 13.1029 6.94608 13.1033 6.94565C13.1034 6.94543 13.1036 6.94524 13.1037 6.9451C13.1037 6.94503 13.1038 6.94495 13.1038 6.94491C13.1038 6.94484 13.1039 6.94478 12.5 6.50002C11.8961 6.05526 11.8961 6.05522 11.8962 6.05518C11.8962 6.05519 11.8962 6.05516 11.8962 6.05517C11.8962 6.05518 11.8961 6.05522 11.8961 6.05531C11.8959 6.05547 11.8957 6.05579 11.8954 6.05625C11.8947 6.05718 11.8936 6.05869 11.892 6.06077C11.8889 6.06493 11.8842 6.07136 11.8778 6.07991C11.8651 6.09702 11.8459 6.12259 11.8211 6.15541C11.7715 6.22108 11.6995 6.31557 11.6108 6.42921C11.4328 6.65731 11.1907 6.9589 10.9307 7.2583C10.6675 7.56142 10.4007 7.84522 10.1719 8.04734C10.0567 8.14915 9.96871 8.21447 9.90934 8.25027C9.82937 8.29847 9.87346 8.25 9.99997 8.25L9.99998 9ZM7.5 6.5C6.8961 6.94475 6.89615 6.94481 6.8962 6.94488C6.89622 6.94492 6.89628 6.945 6.89633 6.94507C6.89644 6.94521 6.89657 6.9454 6.89674 6.94562C6.89706 6.94605 6.8975 6.94664 6.89804 6.94738C6.89913 6.94886 6.90067 6.95094 6.90263 6.95358C6.90655 6.95888 6.9122 6.96649 6.91947 6.97625C6.93401 6.99576 6.95508 7.02391 6.98192 7.05945C7.03559 7.13049 7.1125 7.23132 7.20671 7.35204C7.39452 7.5927 7.65392 7.9161 7.93661 8.24171C8.21608 8.56358 8.53306 8.90478 8.83482 9.17141C8.98484 9.30397 9.14878 9.43397 9.3162 9.53489C9.46302 9.62341 9.70876 9.75 9.99999 9.75L9.99998 9L9.99997 8.25C10.1265 8.25 10.1706 8.29847 10.0906 8.25027C10.0313 8.21447 9.94327 8.14916 9.82803 8.04734C9.59928 7.84522 9.33245 7.56142 9.06927 7.2583C8.80932 6.9589 8.56725 6.6573 8.38924 6.42921C8.30055 6.31556 8.22848 6.22107 8.17888 6.1554C8.15409 6.12258 8.13495 6.09701 8.12221 6.0799C8.11583 6.07135 8.11106 6.06492 8.10798 6.06076C8.10643 6.05868 8.10532 6.05717 8.10463 6.05624C8.10429 6.05578 8.10406 6.05546 8.10394 6.0553C8.10387 6.05521 8.10384 6.05517 8.10383 6.05516C8.10383 6.05515 8.10385 6.05518 8.10385 6.05517C8.10387 6.0552 8.1039 6.05525 7.5 6.5Z", fill: "currentColor", animate: reduceDefinition(controls), initial: "normal", variants: ARROW_VARIANTS }))));
});
HugeiconsWindArrowDownIcon.displayName = 'HugeiconsWindArrowDownIcon';
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

  return HugeiconsWindArrowDownIcon;
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
    <path data-icon-node="0.0" d="M9 18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18C15 16.3431 13.6569 15 12 15H3" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" pathLength="1" stroke-dashoffset="0" stroke-dasharray="1 1" style="opacity: 1" />
    <path data-icon-node="0.1" d="M15 9C15 7.34315 16.3431 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" pathLength="1" stroke-dashoffset="0" stroke-dasharray="1 1" style="opacity: 1" />
    <path data-icon-node="0.2" d="M9.25 8C9.25 8.41421 9.58579 8.75 10 8.75C10.4142 8.75 10.75 8.41421 10.75 8H10H9.25ZM10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3L10 3L10.75 3ZM9.99998 9L9.99999 9.75L9.99998 9ZM13.1039 6.94478C13.3495 6.61126 13.2783 6.14177 12.9448 5.89613C12.6112 5.65049 12.1417 5.72174 11.8961 6.05526L12.5 6.50002L13.1039 6.94478ZM8.1039 6.05525C7.85827 5.72172 7.38877 5.65047 7.05525 5.8961C6.72172 6.14173 6.65047 6.61123 6.8961 6.94475L7.5 6.5L8.1039 6.05525ZM10 8H10.75L10.75 3L10 3L9.25 3L9.25 8H10ZM9.99998 9L9.99999 9.75C10.2912 9.75 10.5369 9.6234 10.6838 9.53489C10.8512 9.43397 11.0151 9.30397 11.1651 9.17142C11.4669 8.90479 11.7839 8.56359 12.0634 8.24172C12.3461 7.91612 12.6055 7.59272 12.7933 7.35207C12.8875 7.23135 12.9644 7.13052 13.0181 7.05948C13.0449 7.02393 13.066 6.99579 13.0805 6.97628C13.0878 6.96652 13.0934 6.95891 13.0974 6.95362C13.0993 6.95097 13.1009 6.94889 13.102 6.94741C13.1025 6.94668 13.1029 6.94608 13.1033 6.94565C13.1034 6.94543 13.1036 6.94524 13.1037 6.9451C13.1037 6.94503 13.1038 6.94495 13.1038 6.94491C13.1038 6.94484 13.1039 6.94478 12.5 6.50002C11.8961 6.05526 11.8961 6.05522 11.8962 6.05518C11.8962 6.05519 11.8962 6.05516 11.8962 6.05517C11.8962 6.05518 11.8961 6.05522 11.8961 6.05531C11.8959 6.05547 11.8957 6.05579 11.8954 6.05625C11.8947 6.05718 11.8936 6.05869 11.892 6.06077C11.8889 6.06493 11.8842 6.07136 11.8778 6.07991C11.8651 6.09702 11.8459 6.12259 11.8211 6.15541C11.7715 6.22108 11.6995 6.31557 11.6108 6.42921C11.4328 6.65731 11.1907 6.9589 10.9307 7.2583C10.6675 7.56142 10.4007 7.84522 10.1719 8.04734C10.0567 8.14915 9.96871 8.21447 9.90934 8.25027C9.82937 8.29847 9.87346 8.25 9.99997 8.25L9.99998 9ZM7.5 6.5C6.8961 6.94475 6.89615 6.94481 6.8962 6.94488C6.89622 6.94492 6.89628 6.945 6.89633 6.94507C6.89644 6.94521 6.89657 6.9454 6.89674 6.94562C6.89706 6.94605 6.8975 6.94664 6.89804 6.94738C6.89913 6.94886 6.90067 6.95094 6.90263 6.95358C6.90655 6.95888 6.9122 6.96649 6.91947 6.97625C6.93401 6.99576 6.95508 7.02391 6.98192 7.05945C7.03559 7.13049 7.1125 7.23132 7.20671 7.35204C7.39452 7.5927 7.65392 7.9161 7.93661 8.24171C8.21608 8.56358 8.53306 8.90478 8.83482 9.17141C8.98484 9.30397 9.14878 9.43397 9.3162 9.53489C9.46302 9.62341 9.70876 9.75 9.99999 9.75L9.99998 9L9.99997 8.25C10.1265 8.25 10.1706 8.29847 10.0906 8.25027C10.0313 8.21447 9.94327 8.14916 9.82803 8.04734C9.59928 7.84522 9.33245 7.56142 9.06927 7.2583C8.80932 6.9589 8.56725 6.6573 8.38924 6.42921C8.30055 6.31556 8.22848 6.22107 8.17888 6.1554C8.15409 6.12258 8.13495 6.09701 8.12221 6.0799C8.11583 6.07135 8.11106 6.06492 8.10798 6.06076C8.10643 6.05868 8.10532 6.05717 8.10463 6.05624C8.10429 6.05578 8.10406 6.05546 8.10394 6.0553C8.10387 6.05521 8.10384 6.05517 8.10383 6.05516C8.10383 6.05515 8.10385 6.05518 8.10385 6.05517C8.10387 6.0552 8.1039 6.05525 7.5 6.5Z" fill="currentColor" style="transform: none; opacity: 1; transform-origin: 50% 50%; transform-box: fill-box" />
  </svg>
</div>
