<script setup lang="ts">
// @ts-nocheck
import { SVGVisualElement, animateVisualElement, setTarget, scrapeSVGMotionValuesFromProps, resolveMotionValue, resolveVariantFromProps, isControllingVariants, isVariantNode, getDefaultValueType, visualElementStore, camelCaseAttributes, cubicBezier, easeInOut, easeOut, easeIn } from 'motion';
import { onMounted, onBeforeUnmount, shallowRef, useId, watch } from 'vue';
const props = defineProps({ size: { type: Number, default: 28 }, controlled: { type: Boolean, default: false } });
const root = shallowRef();
const instanceId = useId();
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
const BRAIN_STEM_VARIANTS = {
    normal: { pathLength: 1, pathOffset: 0 },
    animate: {
        pathLength: [1, 0.4, 1],
        pathOffset: [0, 0.25, 0],
        transition: {
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
            ease: 'easeInOut',
        },
    },
};
const BRAIN_SIDE_VARIANTS = {
    normal: { pathLength: 1, pathOffset: 0 },
    animate: {
        pathLength: [1, 0.5, 1],
        pathOffset: [0, 0.25, 0],
        transition: {
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
            ease: 'easeInOut',
        },
    },
};
const BRAIN_TOP_ARC_VARIANTS = {
    normal: { pathLength: 1, pathOffset: 0 },
    animate: {
        pathLength: [1, 0.8, 1],
        pathOffset: [0, 0.07, 0],
        transition: {
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
            ease: 'easeInOut',
        },
    },
};
const BRAIN_LOWER_ARC_VARIANTS = {
    normal: { pathLength: 1, pathOffset: 0 },
    animate: {
        pathLength: [1, 0.8, 1],
        pathOffset: [0, 0.14, 0],
        transition: {
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
            ease: 'easeInOut',
        },
    },
};
const PhosphorBrainIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        iconNode(motion.svg, { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false", animate: reduceDefinition(controls), variants: {
                normal: {
                    scale: 1,
                    strokeWidth: 2,
                },
                animate: {
                    scale: [1, 1.08, 1],
                    strokeWidth: [2, 2.25, 2],
                    transition: {
                        duration: 1.4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                    },
                },
            } },
            iconNode(motion.g, { animate: reduceDefinition(controls), variants: nativePartVariants(BRAIN_STEM_VARIANTS, false) },
                iconNode("defs", null,
                    iconNode("mask", { id: nativeMaskId + '-0', maskUnits: "userSpaceOnUse", x: "-24", y: "-24", width: "72", height: "72" },
                        iconNode(motion.path, { d: "M12.003406480838777 20.983146407474244V2.2540680186282422", fill: "none", stroke: "white", strokeWidth: 24.493343106356438, strokeLinecap: "round", strokeLinejoin: "round", animate: reduceDefinition(controls), variants: nativePartVariants(BRAIN_STEM_VARIANTS, true) }))),
                iconNode("g", { mask: 'url(#' + nativeMaskId + '-0' + ')' },
                    iconNode("g", { transform: "scale(0.09375)" },
                        iconNode("path", { d: "M 248 124 a 56.11 56.11 0 0 0 -32 -50.61 V 72 a 48 48 0 0 0 -88 -26.49 A 48 48 0 0 0 40 72 v 1.39 a 56 56 0 0 0 0 101.2 V 176 a 48 48 0 0 0 88 26.49 A 48 48 0 0 0 216 176 v -1.41 A 56.09 56.09 0 0 0 248 124 Z M 88 208 a 32 32 0 0 1 -31.81 -28.56 A 55.87 55.87 0 0 0 64 180 h 8 a 8 8 0 0 0 0 -16 H 64 A 40 40 0 0 1 50.67 86.27 A 8 8 0 0 0 56 78.73 V 72 a 32 32 0 0 1 64 0 v 68.26 A 47.8 47.8 0 0 0 88 128 a 8 8 0 0 0 0 16 a 32 32 0 0 1 0 64 Z M 192 164 h -8 a 8 8 0 0 0 0 16 h 8 a 55.87 55.87 0 0 0 7.81 -0.56 A 32 32 0 1 1 168 144 a 8 8 0 0 0 0 -16 a 47.8 47.8 0 0 0 -32 12.26 V 72 a 32 32 0 0 1 64 0 v 6.73 a 8 8 0 0 0 5.33 7.54 A 40 40 0 0 1 192 164 Z", fill: "currentColor" })))),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: BRAIN_SIDE_VARIANTS }),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: BRAIN_TOP_ARC_VARIANTS }),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: BRAIN_TOP_ARC_VARIANTS }),
            iconNode("g", { transform: "scale(0.09375)" },
                iconNode("path", { d: "M 208 112 a 8 8 0 0 1 -8 8 h -4 a 36 36 0 0 1 -36 -36 V 80 a 8 8 0 0 1 16 0 v 4 a 20 20 0 0 0 20 20 h 4 A 8 8 0 0 1 208 112 Z", fill: "currentColor" })),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: BRAIN_LOWER_ARC_VARIANTS }),
            iconNode(motion.g, { display: "none", animate: reduceDefinition(controls), variants: BRAIN_LOWER_ARC_VARIANTS }),
            iconNode("g", { transform: "scale(0.09375)" },
                iconNode("path", { d: "M 60 120 H 56 a 8 8 0 0 1 0 -16 h 4 A 20 20 0 0 0 80 84 V 80 a 8 8 0 0 1 16 0 v 4 A 36 36 0 0 1 60 120 Z", fill: "currentColor" })))));
});
PhosphorBrainIcon.displayName = 'PhosphorBrainIcon';
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

  return PhosphorBrainIcon;
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
    <svg data-icon-node="0" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <g data-icon-node="0.0" >
        <defs data-icon-node="0.0.0" >
          <mask data-icon-node="0.0.0.0" :id="instanceId + '-0' + '-0'" maskUnits="userSpaceOnUse" x="-24" y="-24" width="72" height="72">
            <path data-icon-node="0.0.0.0.0" d="M12.003406480838777 20.983146407474244V2.2540680186282422" fill="none" stroke="white" stroke-width="24.493343106356438" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
        </defs>
        <g data-icon-node="0.0.1" :mask="'url(#' + instanceId + '-0' + '-0)'">
          <g data-icon-node="0.0.1.0" transform="scale(0.09375)">
            <path data-icon-node="0.0.1.0.0" d="M 248 124 a 56.11 56.11 0 0 0 -32 -50.61 V 72 a 48 48 0 0 0 -88 -26.49 A 48 48 0 0 0 40 72 v 1.39 a 56 56 0 0 0 0 101.2 V 176 a 48 48 0 0 0 88 26.49 A 48 48 0 0 0 216 176 v -1.41 A 56.09 56.09 0 0 0 248 124 Z M 88 208 a 32 32 0 0 1 -31.81 -28.56 A 55.87 55.87 0 0 0 64 180 h 8 a 8 8 0 0 0 0 -16 H 64 A 40 40 0 0 1 50.67 86.27 A 8 8 0 0 0 56 78.73 V 72 a 32 32 0 0 1 64 0 v 68.26 A 47.8 47.8 0 0 0 88 128 a 8 8 0 0 0 0 16 a 32 32 0 0 1 0 64 Z M 192 164 h -8 a 8 8 0 0 0 0 16 h 8 a 55.87 55.87 0 0 0 7.81 -0.56 A 32 32 0 1 1 168 144 a 8 8 0 0 0 0 -16 a 47.8 47.8 0 0 0 -32 12.26 V 72 a 32 32 0 0 1 64 0 v 6.73 a 8 8 0 0 0 5.33 7.54 A 40 40 0 0 1 192 164 Z" fill="currentColor" />
          </g>
        </g>
      </g>
      <g data-icon-node="0.1" display="none" />
      <g data-icon-node="0.2" display="none" />
      <g data-icon-node="0.3" display="none" />
      <g data-icon-node="0.4" transform="scale(0.09375)">
        <path data-icon-node="0.4.0" d="M 208 112 a 8 8 0 0 1 -8 8 h -4 a 36 36 0 0 1 -36 -36 V 80 a 8 8 0 0 1 16 0 v 4 a 20 20 0 0 0 20 20 h 4 A 8 8 0 0 1 208 112 Z" fill="currentColor" />
      </g>
      <g data-icon-node="0.5" display="none" />
      <g data-icon-node="0.6" display="none" />
      <g data-icon-node="0.7" transform="scale(0.09375)">
        <path data-icon-node="0.7.0" d="M 60 120 H 56 a 8 8 0 0 1 0 -16 h 4 A 20 20 0 0 0 80 84 V 80 a 8 8 0 0 1 16 0 v 4 A 36 36 0 0 1 60 120 Z" fill="currentColor" />
      </g>
    </svg>
  </div>
</template>
