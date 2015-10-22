import * as Utils from './utils';
import * as Docs from './docs';
import * as Perf from './devtools/perfs';
import * as WebComponents from './webcomponents';
import * as InspectorAPI from './devtools/inspectorapi';

export const svgNS = 'http://www.w3.org/2000/svg';
export const registerWebComponent = WebComponents.registerWebComponent;
export const stylesheet = Utils.stylesheet;
export const predicate = Utils.predicate;

// TODO : handle thirdparty integration

// export all sub namespace
export * from './exporter';

const treeCache = {};
let globalRefs = {};
let currentComponentContext;
let currentThisContext;
let errorCallback = (e) => {
  throw e;
};

export function setErrorCallback(cb) {
  errorCallback = cb;
}

export function resetErrorCallback() {
  errorCallback = (e) => {
    throw e;
  };
}

function eventHandlerWrapper(handler) {
  let ctx = {...currentThisContext} || null;
  return (...args) => {
    try {
      // TODO : add devtools integration here
      return handler.apply(ctx, args);
    } catch (e) {
      errorCallback(e);
    }
  };
}

function clearNode(node) {
  while (!Utils.isUndefined(node) && !Object.is(node, null) && node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function styleToString(attrs) {
  if (!attrs) return '';
  let attrsArray = [];
  for (let key in attrs) {
    if (key !== 'extend' && key !== 'mount' && key !== 'unmount' && key !== 'toString') {
      let keyName = Utils.dasherize(key);
      if (key === 'className') {
        keyName = 'class';
      }
      let value = attrs[key];
      if (value) {
        if (Utils.isFunction(value)) {
          value = value();
        }
        if (value) {
          attrsArray.push(`${keyName}: ${value};`);
        }
      }
    }
  }
  return attrsArray.join(' ');
}

function classToArray(attrs) {
  if (!attrs) return [];
  let attrsArray = [];
  for (let key in attrs) {
    let value = attrs[key];
    if (value === true) {
      attrsArray.push(Utils.dasherize(key));
    }
  }
  return attrsArray;
}

function transformAttrs(attrs, attributesHash, handlersHash) {
  if (!attrs) return [];
  let context = {
    ref: undefined
  };
  for (let key in attrs) {
    let keyName = Utils.dasherize(key);
    if (key === 'className') {
      keyName = 'class';
    }
    if (Utils.startsWith(keyName, 'on')) {
      handlersHash[key.toLowerCase()] = eventHandlerWrapper(attrs[key]);
    } else if (keyName === 'ref') {
      context.ref = attrs[key];
    } else {
      let value = attrs[key];
      if (value && Utils.isFunction(value)) {
        value = value();
      }
      if (value) {
        if (Utils.isObject(value) && keyName === 'style') {
          attributesHash.style = styleToString(value);
        } else if (Utils.isArray(value) && keyName === 'class') {
          attributesHash[keyName] = value.join(' ');
        } else if (Utils.isObject(value) && keyName === 'class') {
          attributesHash[keyName] = classToArray(value).join(' ');
        } else {
          attributesHash[keyName] = value;
        }
      }
    }
  }
  return context;
}

function isNode(item) {
  return item instanceof HTMLElement || item instanceof Text || item instanceof SVGElement || item.__isHTMLElement;
}

function makeNode(name, attrs, children, elemkey, namespace) {
  const doc = Utils.getGlobalObject().document || Docs.createJsonDocument();
  const node = namespace ? doc.createElementNS(namespace, Utils.escape(name)) : doc.createElement(Utils.escape(name));
  if (elemkey) {
    node.setAttribute('data-key', elemkey);
  }
  for (let key in attrs) {
    const value = attrs[key];
    if (key === 'attributes') {
      for (let k in attrs.attributes) {
        const v = attrs.attributes[k];
        node.setAttribute(Utils.dasherize(k), v);
      }
    } else if (key.startsWith('on')) {
      node.addEventListener(key.replace('on', ''), value);
    } else if (key === 'innerHTML') {
      node.innerHTML = value;
    } else if (key === 'value' && name === 'input') {
      node.value = value;
    } else if (key === 'indeterminate' && name === 'input') {
      node.indeterminate = value;
    } else {
      node.setAttribute(Utils.dasherize(key), value);
    }
  }
  for (let idx in children) {
    const child = children[idx];
    node.appendChild(child);
  }
  if (InspectorAPI.isEnabled()) {
    node.__children = children;
  }
  return node;
}

function internalEl(name, attrs = {}, childrenArray = [], key, namespace) {
  let innerHTML;
  let children = [].concat.apply([], childrenArray); // perf issue hint : replace with childrenArray;
  let newChildren = [];
  const doc = Utils.getGlobalObject().document;
  for (let i in children) {
    let item = children[i];
    if (item) {
      if (Utils.isFunction(item)) {
        item = item();
      }
      if (item) {
        if (isNode(item)) newChildren.push(item);
        else if (Utils.isObject(item) && item.__asHtml) {
          innerHTML = item.__asHtml;
        } else {
          newChildren.push(doc.createTextNode(item + ''));
        }
      }
    }
  }
  children = newChildren;
  let oldThisContext = currentThisContext;
  if (Utils.isFunction(name) && !name.isElemComponentFactory) {
    let funKey = `Elem.function.${name.componentName || name.name || '<anonymous function>'}.tree`;
    Perf.markStart(funKey);
    let props = {...attrs};
    props.children = children;
    props.key = key;
    props.namespace = namespace;
    let functionContext = {...currentComponentContext};
    if (key) {
      functionContext.__keys.push(key);
      let setGlobalState = functionContext.setState;
      let replaceGlobalState = functionContext.replaceState;
      let globalState = functionContext.state;
      functionContext.globalState = globalState;
      functionContext.setGlobalState = setGlobalState;
      functionContext.replaceGlobalState = replaceGlobalState;
      functionContext.state = globalState[`substateof-${key}`] || {};
      functionContext.replaceState = (state, cb) => setGlobalState({ [`substateof-${key}`]: state }, cb);
      functionContext.setState = (diffState, cb) => {
        let newState = globalState[`substateof-${key}`] || {};
        for (let k in diffState) {
          newState[k] = diffState[k];
        }
        setGlobalState({ [`substateof-${key}`]: newState }, cb);
      };
      functionContext.__isInitialized = () => typeof globalState[`substateof-${key}`] !== 'undefined';
      functionContext.withInitialState = (is) => {
        if (!globalState[`substateof-${key}`]) {
          let initialState = Utils.isFunction(is) ? is() : is;
          functionContext.__internalSetState({ [`substateof-${key}`]: {...initialState} });
        }
        return globalState[`substateof-${key}`];
      };
    }
    let thisContext = {...functionContext, props, children};
    thisContext.withInitialState = (initialState) => {
      thisContext.state = functionContext.withInitialState(initialState);
    };
    thisContext.withInitialContext = (initialCtx) => {
      thisContext.context = functionContext.withInitialContext(initialCtx);
    };
    thisContext.withDefaultProps = (dp) => {
      let defaultProps = Utils.isFunction(dp) ? dp() : dp;
      thisContext.props = Object.assign({}, defaultProps, thisContext.props);
    };
    currentThisContext = thisContext;
    let subTree = name.bind(thisContext)(functionContext, props, children);
    currentThisContext = oldThisContext;
    if (InspectorAPI.isEnabled()) {
      let selectorId = Math.random().toString(15).slice(10, 20) + '';
      subTree.setAttribute('data-inspector-selector', selectorId);
      subTree.inspectorContext = {
        node: `[data-inspector-selector="${selectorId}"]`,
        type: 'function',
        name: name.componentName || name.name || '<anonymous function>',
        state: functionContext.state,
        props: attrs,
        setState: functionContext.setState,
        replaceState: functionContext.replaceState
      };
    }
    Perf.markStop(funKey);
    return subTree;
  }

  let finalAttrs = {
    attributes: {}
  };
  let ctx = transformAttrs(attrs, finalAttrs.attributes, finalAttrs);
  if ((name === 'input' || name === 'INPUT') && attrs.value) {
    finalAttrs.value = attrs.value;
    finalAttrs.attributes.value = attrs.value;
    finalAttrs.attributes.defaultValue = attrs.value;
  }
  if (ctx.ref) {
    let refId = Utils.uniqueId('elemref-');
    finalAttrs.attributes['data-elemref'] = refId;
    globalRefs[ctx.ref] = refId;
  }
  if (innerHTML) {
    finalAttrs.innerHTML = innerHTML;
  }
  return makeNode(name, finalAttrs, children, attrs.key, namespace);
}

export function el(tagName, ...args) {
  let argsLength = args.length;
  let name = Utils.isString(tagName) ? (Utils.escape(tagName) || 'unknown') : tagName;
  if (arguments.length === 2) {
    // 2 args
    if (argsLength === 1 && Utils.isString(args[0])) {
      // el('div', 'Lorem Ipsum')
      return internalEl(name, {}, [args[0]], undefined, undefined);
    }
    if (argsLength === 1 && isNode(args[0])) {
      // el('div', Elem.el(...))
      return internalEl(name, {}, [args[0]], undefined, undefined);
    }
    if (argsLength === 1 && Utils.isArray(args[0])) {
      // el('div', [...])
      return internalEl(name, {}, args[0], undefined, undefined);
    }
    if (argsLength === 1 && Utils.isFunction(args[0])) {
      // el('div', function)
      return internalEl(name, {}, [args[0]], undefined, undefined);
    }
    if (argsLength === 1 && Utils.isObject(args[0]) && args[0].__asHtml) {
      // el('div', { __asHtml: '...' })
      return internalEl(name, {}, [args[0]], undefined, undefined);
    }
    if (argsLength === 1 && Utils.isObject(args[0])) {
      // el('div', {...})
      return internalEl(name, args[0], [], args[0].key, undefined);
    }
  } else if (arguments.length === 3) {
    // 3 args
    if (argsLength === 2 && Utils.isObject(args[0]) && !Utils.isArray(args[1])) {
      // el('div', {...}, 'lorem ipsum')
      return internalEl(name, args[0], [args[1]], args[0].key, undefined);
    }
    if (argsLength === 2 && Utils.isObject(args[0]) && isNode(args[1])) {
      // el('div', {...}, Elem.el(...))
      return internalEl(name, args[0], [args[1]], args[0].key, undefined);
    }
    if (argsLength === 2 && Utils.isObject(args[0]) && Utils.isArray(args[1])) {
      // el('div', {...}, [...])
      return internalEl(name, args[0], args[1], args[0].key, undefined);
    }
    if (argsLength === 2 && Utils.isObject(args[0]) && args[1].__asHtml) {
      // el('div', {...}, { __asHtml: '...' })
      return internalEl(name, args[0], args[1], args[0].key, undefined);
    }
    if (argsLength === 2 && Utils.isFunction(args[1])) {
      // el('div', {...}, function)
      return internalEl(name, args[0], [args[1]], args[0].key, undefined);
    }
    if (argsLength === 2 && Utils.isString(args[0]) && Utils.isObject(args[1])) {
      // el('div', ns, {...})
      return internalEl(name, args[1], [], args[1].key, args[0]);
    }
    if (argsLength === 2 && Utils.isString(args[0]) && !Utils.isObject(args[1]) && !Utils.isArray(args[1])) {
      // el('div', ns, 'Lorem ipsum}')
      return internalEl(name, {}, [args[1]], undefined, args[0]);
    }
  } else if (arguments.length === 4) {
    // 4 args
    if (argsLength === 3 && (Utils.isUndefined(args[0]) || Utils.isString(args[0])) && Utils.isObject(args[1]) && !Utils.isArray(args[2])) {
      // el('div', ns, {...}, 'lorem ipsum')
      return internalEl(name, args[1], [args[2]], args[1].key, args[0]);
    }
    if (argsLength === 3 && (Utils.isUndefined(args[0]) || Utils.isString(args[0])) && Utils.isObject(args[1]) && isNode(args[2])) {
      // el('div', ns, {...}, Elem.el(...))
      return internalEl(name, args[1], [args[2]], args[1].key, args[0]);
    }
    if (argsLength === 3 && (Utils.isUndefined(args[0]) || Utils.isString(args[0])) && Utils.isObject(args[1]) && args[2].__asHtml) {
      // el('div', ns, {...}, { __asHtml: '...' })
      return internalEl(name, args[1], [args[2]], args[1].key, args[0]);
    }
    if (argsLength === 3 && (Utils.isUndefined(args[0]) || Utils.isString(args[0])) && Utils.isObject(args[1]) && Utils.isArray(args[2])) {
      // el('div', ns, {...}, [...])
      return internalEl(name, args[1], args[2], args[1].key, args[0]);
    }
  } else if (argsLength === 0) { // 1 args
    // el('div');
    return internalEl(name, {}, [], undefined, undefined);
  }
  console.warn('Unknown el expression ...', arguments);
  return internalEl(name, args[1], args[2], args[1].key, args[0]);
}

export function svg(name, ...args) {
  return el.apply(null, [name, svgNS, ...args]);
}

export function nbsp(times) {
  return el('span', {
    __asHtml: '&nbsp;'.repeat(times || 1)
  });
}

export function text(spanText) {
  return el('span', {}, spanText);
}

function createComponentContext(refresh, renderNode, refs = {}) {
  let initialized = false;
  let initializedCtx = false;
  let context = {
    __keys: [],
    __oldKeys: [],
    refs,
    state: {},
    context: {},
    refresh,
    redraw: refresh,
    getDOMNode() {
      let doc = Utils.getGlobalObject().document;
      if (renderNode.ownerDocument) {
        doc = renderNode.ownerDocument;
      }
      if (Utils.isString(renderNode)) {
        return doc.querySelector(renderNode);
      }
      return renderNode;
    }
  };
  context.__parentIsInitialized = () => initialized && initializedCtx;
  context.__isInitialized = context.__parentIsInitialized;
  context.__initialized = () => {
    initialized = true;
    initializedCtx = true;
  };
  context.withInitialState = (is = {}) => {
    if (!initialized) {
      let initialState = Utils.isFunction(is) ? is() : is;
      initialized = true;
      context.state = Object.assign({}, initialState, context.state);
    }
    return context.state;
  };
  context.withInitialContext = (ic = {}) => {
    if (!initializedCtx) {
      let initialCtx = Utils.isFunction(ic) ? ic() : ic;
      initializedCtx = true;
      context.context = Object.assign({}, initialCtx, context.context);
    }
    return context.context;
  };
  context.__internalSetState = (diffState) => {
    for (let key in diffState) {
      context.state[key] = diffState[key];
    }
  };
  context.__internalReplaceState = (newState) => context.state = newState;
  context.setState = (diffState, cb) => {
    for (let key in diffState) {
      context.state[key] = diffState[key];
    }
    refresh();
    if (cb) {
      cb();
    }
  };
  context.replaceState = (newState, cb) => {
    context.state = newState;
    refresh();
    if (cb) {
      cb();
    }
  };
  return context;
}

export function render(elementOrFunction, selectorOrNode, props = {}) {
  Perf.markStart('Elem.render');
  let node = selectorOrNode;
  let tree = elementOrFunction;
  let returnApi = {};
  if (Utils.isFunction(tree)) {
    let funKey = `Elem.${tree.name ? 'function' : 'render'}.${tree.componentName || tree.name || ''}.tree`;
    Perf.markStart(funKey);
    // Perf.markStart('Elem.render.tree');
    let functionAsComponentContext = {
      context: undefined,
      props
    };
    let reTree = () => {
      let elems;
      try {
        currentComponentContext = functionAsComponentContext.context;
        let thisContext = {...functionAsComponentContext.context, props: functionAsComponentContext.props};
        thisContext.withInitialState = (initialState) => {
          thisContext.state = functionAsComponentContext.context.withInitialState(initialState);
        };
        thisContext.withInitialContext = (initialCtx) => {
          thisContext.context = functionAsComponentContext.context.withInitialContext(initialCtx);
        };
        thisContext.withDefaultProps = (dp) => {
          let defaultProps = Utils.isFunction(dp) ? dp() : dp;
          thisContext.props = Object.assign({}, defaultProps, thisContext.props);
        };
        currentThisContext = thisContext;
        elems = elementOrFunction.bind(thisContext)(functionAsComponentContext.context, functionAsComponentContext.props);
        currentThisContext = undefined;
        return elems;
      } finally {
        let refs = {...globalRefs};
        globalRefs = {};
        for (let key in functionAsComponentContext.context.refs) {
          delete functionAsComponentContext.context.refs[key];
        }
        for (let key in refs) {
          functionAsComponentContext.context.refs[key] = refs[key];
        }
        currentComponentContext = undefined;
        if (functionAsComponentContext.context.__keys.length !== 0) {
          let diffs = functionAsComponentContext.context.__oldKeys.filter(value => !Utils.contains(functionAsComponentContext.context.__keys, value));
          for (let currentDiff in diffs) {
            let key = `substateof-${diffs[currentDiff]}`;
            delete functionAsComponentContext.context.state[key];
          }
          functionAsComponentContext.context.__oldKeys = [...functionAsComponentContext.context.__keys];
          functionAsComponentContext.context.__keys = [];
        }
        if (InspectorAPI.isEnabled() && !(props.__inspectorSilent || false)) {
          let id = selectorOrNode.id || selectorOrNode;
          let funcName = elementOrFunction.componentName || elementOrFunction.name || '<anonymous function>';
          const inspectChild = (n, children, rank) => {
            if (n && n.inspectorContext) {
              let currentNode = {...n.inspectorContext, children: [], rank: rank + 1};
              if (n.__children) {
                n.__children.forEach(c => inspectChild(c, currentNode.__children, rank + 1));
              }
              if (children) children.push(currentNode);
              return currentNode;
            } else if (n && n.__children) {
              n.__children.forEach(c => inspectChild(c, children, rank));
            }
          };
          let exposeName = `${id} > ${funcName}`;
          let selectorId = Math.random().toString(15).slice(10, 20) + '';
          elems.setAttribute('data-inspector-selector', selectorId);
          let root = {
            name: funcName,
            node: node,
            selectableNode: `[data-inspector-selector="${selectorId}"]`,
            state: functionAsComponentContext.context.state,
            props: props,
            setState: functionAsComponentContext.context.setState,
            replaceState: functionAsComponentContext.context.replaceState,
            rank: 0,
            children: []
          };
          inspectChild(elems, root.children, 0);
          InspectorAPI.exposeComponentTreeAt(exposeName, root);
        }
      }
    };
    let refresh = () => {
      Perf.markStart(funKey);
      let currentTree = reTree();
      render(currentTree, node);
      Perf.markStop(funKey);
    };
    // let refs = {...globalRefs};
    functionAsComponentContext.context = createComponentContext(refresh, node, {});
    functionAsComponentContext.context.state = {};
    tree = reTree();
    functionAsComponentContext.context.__initialized();
    // Perf.markStop('Elem.render.tree');
    returnApi.redraw = functionAsComponentContext.context.redraw;
    returnApi.setState = functionAsComponentContext.context.setState;
    returnApi.replaceState = functionAsComponentContext.context.replaceState;
    Perf.markStop(funKey);
  } else if (Utils.isArray(tree)) {
    tree = el('span', tree);
  }
  let doc = Utils.getGlobalObject().document;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  }
  if (Utils.isString(node)) {
    node = doc.querySelector(node);
  }
  let rootId;
  if (node !== null) {
    rootId = node.rootId;
    Perf.markStart('Elem.render.clear');
    clearNode(node);
    Perf.markStop('Elem.render.clear');
    Perf.markStart('Elem.render.append');
    node.appendChild(tree);
    Perf.markStop('Elem.render.append');
  }
  Perf.markStop('Elem.render');
  return {
    ...returnApi,
    unmount() {
      delete node.rootId;
      clearNode(node);
      delete treeCache[rootId];
      if (InspectorAPI.isEnabled()) {
        InspectorAPI.removeExposedComponent(selectorOrNode.id || selectorOrNode);
      }
    }
  };
}

export function unmount(theNode) {
  let node = theNode;
  let doc = Utils.getGlobalObject().document;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  }
  if (Utils.isString(node)) {
    node = doc.querySelector(node);
  }
  clearNode(node);
  if (node.rootId) {
    delete treeCache[node.rootId];
    delete node.rootId;
  }
  if (InspectorAPI.isEnabled()) {
    InspectorAPI.removeExposedComponent(theNode.id || theNode);
  }
}

export function findDOMNode(ref) {
  return Utils.getGlobalObject().document.querySelector(`[data-elemref="${ref}"]`);
}

export function renderToJson(elementOrFunction, props = {}) {
  Perf.markStart('Elem.renderToJson');
  let tree = elementOrFunction;
  if (Utils.isFunction(tree)) {
    let refs = {...globalRefs};
    globalRefs = {};
    let componentContext = createComponentContext(() => {}, null, refs);
    let thisContext = {...componentContext, props};
    tree = tree.bind(thisContext)(componentContext, props);
  }
  let str = JSON.parse(JSON.stringify(tree.render()));
  Perf.markStop('Elem.renderToJson');
  return str;
}

export function renderToString(elementOrFunction, props = {}) {
  Perf.markStart('Elem.renderToString');
  let tree = elementOrFunction;
  if (Utils.isFunction(tree)) {
    let refs = {...globalRefs};
    globalRefs = {};
    let componentContext = createComponentContext(() => {}, null, refs);
    let thisContext = {...componentContext, props};
    tree = tree.bind(thisContext)(componentContext, props);
  }
  let str = tree.renderToHtml();
  Perf.markStop('Elem.renderToString');
  return str;
}

let svgElements = ['altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate',
  'animateColor', 'animateMotion', 'animateTransform',
  'circle', 'clipPath', 'color-profile', 'cursor', 'defs',
  'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer',
  'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight',
  'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format',
  'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker',
  'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon',
  'polyline', 'radialGradient', 'rect', 'set', 'stop', 'svg', 'switch', 'symbol',
  'text', 'textPath', 'tref', 'tspan', 'use', 'view', 'vkern'];

export function jsx(type, attributes, ...children) {
  let attrs = attributes || {};
  if (Array.includes(svgElements, type)) {
    return internalEl(type, attrs, children || [], attrs.key || undefined, svgNS);
  }
  return internalEl(type, attrs, children || [], attrs.key || undefined, undefined);
}

export function createComponent(options) {
  if (!options.render) {
    throw new Error('A component should have at least one render function');
  }
  if (!options.name) {
    console.warn('A component should have a name');
  }
  function ElemComponent(ctx, props) {
    let initialized = ctx.__isInitialized();
    let pinitialized = ctx.__parentIsInitialized();
    if (options.getDefaultProps) {
      this.withDefaultProps(() => options.getDefaultProps.bind(this)(ctx, props));
    }
    if (!initialized && options.getInitialState) {
      let state = ctx.withInitialState(() => options.getInitialState.bind(this)(ctx, props));
      ctx.state = state;
      this.state = state;
    }
    if (!pinitialized && !props.key && options.getRootContext) {
      let context = ctx.withInitialContext(() => options.getRootContext.bind(this)(ctx, props));
      ctx.context = context;
      this.context = context;
    }
    if (!initialized && options.init) {
      options.init.bind(this)(ctx, props);
    }
    return options.render.bind(this)(ctx, props);
  }
  ElemComponent.componentName = options.name || 'ElemComponent';
  return ElemComponent;
}
