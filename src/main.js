import * as Utils from './utils';
import * as Docs from './docs';
import * as Perf from './perfs';
import * as WebComponents from './webcomponents';
import _ from './lodash';

import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import VDOMCreateElement from 'virtual-dom/create-element';
import VNode from 'virtual-dom/vnode/vnode';
import VText from 'virtual-dom/vnode/vtext';

export const svgNS = 'http://www.w3.org/2000/svg';
export const registerWebComponent = WebComponents.registerWebComponent;
export const stylesheet = Utils.stylesheet;
export const predicate = Utils.predicate;
export const keyMirror = Utils.keyMirror;

// export all sub namespace
export * from './exporter';

/** Remove these, api does too much already ??? **/
export const uuid = Utils.uuid;
export const invariant = Utils.invariant;
export const invariantLog = Utils.invariantLog;
/** **/

const treeCache = {};
let globalRefs = {};
let currentComponentContext;

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
        if (_.isFunction(value)) {
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
      handlersHash[key] = attrs[key];
    } else if (keyName === 'ref') {
      context.ref = attrs[key];
    } else {
      let value = attrs[key];
      if (value && _.isFunction(value)) {
        value = value();
      }
      if (value) {
        if (_.isObject(value) && keyName === 'style') {
          attributesHash.style = styleToString(value);
        } else if (_.isArray(value) && keyName === 'class') {
          attributesHash[keyName] = value.join(' ');
        } else if (_.isObject(value) && keyName === 'class') {
          attributesHash[keyName] = classToArray(value).join(' ');
        } else {
          attributesHash[keyName] = value;
        }
      }
    }
  }
  return context;
}

function internalEl(name, attrs = {}, childrenArray = [], key, namespace) {
  let innerHTML;
  let children = childrenArray;
  let newChildren = [];
  for (let i in children) {
    let item = children[i];
    if (item) {
      if (_.isFunction(item)) {
        item = item();
      }
      if (item) {
        if (item instanceof VNode) newChildren.push(item);
        else if (_.isObject(item) && item.__asHtml) {
          innerHTML = item.__asHtml;
          newChildren.push(new VText(''));
        } else {
          newChildren.push(new VText(item + ''));
        }
      }
    }
  }
  children = newChildren;

  if (_.isFunction(name) && name.isElemComponentFactory) {
    let props = {...attrs};
    props.children = children;
    props.key = key;
    props.namespace = namespace;
    // TODO : hook global resfesh on nested state
    return name(attrs).renderTo();
  }
  if (_.isFunction(name) && !name.isElemComponentFactory) {
    let props = {...attrs};
    props.children = children;
    props.key = key;
    props.namespace = namespace;
    let thisContext = {...currentComponentContext, props, children};
    return name.bind(thisContext)(currentComponentContext, props, children);
  }

  let finalAttrs = {
    attributes: {}
  };
  let ctx = transformAttrs(attrs, finalAttrs.attributes, finalAttrs);
  if (ctx.ref) {
    let refId = Utils.uniqueId('elemref-');
    finalAttrs.attributes['data-elemref'] = refId;
    globalRefs[ctx.ref] = refId;
  }
  if (innerHTML) {
    finalAttrs.innerHTML = innerHTML;
  }
  return new VNode(name, finalAttrs, children, attrs.key, namespace);
}

export function el(tagName, ...args) {
  let argsLength = args.length;
  let name = _.isString(tagName) ? (_.escape(tagName) || 'unknown') : tagName;
  // 1 args
  if (argsLength === 0) {
    // el('div', undefined, {}, []);
    return internalEl(name, {}, [], undefined, undefined);
  }
  // 2 args
  if (argsLength === 1 && _.isFunction(args[0])) {
    // el('div', function)
    return el(name, args[0]()); // forced to recurse
  }
  if (argsLength === 1 && _.isArray(args[0])) {
    // el('div', [...])
    return internalEl(name, {}, args[0], undefined, undefined);
  }
  if (argsLength === 1 && _.isObject(args[0]) && args[0].__asHtml) {
    // el('div', { __asHtml: '...' })
    return internalEl(name, {}, [args[0]], undefined, undefined);
  }
  if (argsLength === 1 && _.isObject(args[0])) {
    // el('div', {...})
    return internalEl(name, args[0], [], undefined, undefined);
  }
  if (argsLength === 1 && _.isString(args[0])) {
    // el('div', 'Lorem Ipsum')
    return internalEl(name, {}, [args[0]], undefined, undefined);
  }
  // 3 args
  if (argsLength === 2 && _.isFunction(args[1])) {
    // el('div', {...}, function)
    return el(name, args[0], args[1]()); // forced to recurse
  }
  if (argsLength === 2 && _.isObject(args[0]) && !_.isArray(args[1])) {
    // el('div', {...}, 'lorem ipsum')
    return internalEl(name, args[0], [args[1]], args[0].key, undefined);
  }
  if (argsLength === 2 && _.isObject(args[0]) && _.isArray(args[1])) {
    // el('div', {...}, [...])
    return internalEl(name, args[0], args[1], args[0].key, undefined);
  }
  if (argsLength === 2 && _.isString(args[0]) && _.isObject(args[1])) {
    // el('div', ns, {...})
    return internalEl(name, args[1], [], args[1].key, args[0]);
  }
  if (argsLength === 2 && _.isString(args[0]) && !_.isObject(args[1]) && !_.isArray(args[1])) {
    // el('div', ns, 'Lorem ipsum}')
    return internalEl(name, {}, [args[1]], undefined, args[0]);
  }
  // 4 args
  if (argsLength === 3 && (_.isUndefined(args[0]) || _.isString(args[0])) && _.isObject(args[1]) && !_.isArray(args[2])) {
    // el('div', ns, {...}, 'lorem ipsum')
    return internalEl(name, args[1], [args[2]], args[1].key, args[0]);
  }
  if (argsLength === 3 && (_.isUndefined(args[0]) || _.isString(args[0])) && _.isObject(args[1]) && _.isArray(args[2])) {
    // el('div', ns, {...}, [...])
    return internalEl(name, args[1], args[2], args[1].key, args[0]);
  }
  console.warn('Unknown el expression ...', arguments);
  return internalEl(name, args[1], args[2], args[1].key, args[0]);
}

export function svg(name, ...args) {
  return el.apply(null, [name, svgNS].concat(args));
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
  let context = {
    refs,
    state: {},
    refresh,
    redraw: refresh,
    getDOMNode() {
      let doc = document;
      if (renderNode.ownerDocument) {
        doc = renderNode.ownerDocument;
      }
      if (_.isString(renderNode)) {
        return doc.querySelector(renderNode);
      }
      return renderNode;
    }
  };
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
  if (_.isFunction(tree)) {
    Perf.markStart('Elem.render.tree');
    let functionAsComponentContext = {
      context: undefined,
      props
    };
    let reTree = () => {
      try {
        let refs = {...globalRefs};
        globalRefs = {};
        functionAsComponentContext.context.refs = refs;
        currentComponentContext = functionAsComponentContext.context;
        let thisContext = {...functionAsComponentContext.context, props: functionAsComponentContext.props};
        return elementOrFunction.bind(thisContext)(functionAsComponentContext.context, functionAsComponentContext.props);
      } finally {
        currentComponentContext = undefined;
      }
    };
    let refresh = () => {
      let currentTree = reTree();
      render(currentTree, node);
    };
    let refs = {...globalRefs};
    globalRefs = {};
    functionAsComponentContext.context = createComponentContext(refresh, node, refs);
    tree = reTree();
    Perf.markStop('Elem.render.tree');
  }
  let doc = document;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  }
  if (_.isString(node)) {
    node = doc.querySelector(node);
  }
  let rootId;
  if (node !== null) {
    rootId = node.rootId;
    if (!rootId) {
      rootId = Utils.uniqueId('data-rootid-');
      node.rootId = rootId;
    }
    let oldDom = treeCache[rootId];
    if (!oldDom) {
      Perf.markStart('Elem.render.create');
      let rootNode = VDOMCreateElement(tree);
      node.appendChild(rootNode);
      treeCache[rootId] = {
        tree: tree,
        rootNode: rootNode
      };
      Perf.markStop('Elem.render.create');
    } else {
      Perf.markStart('Elem.render.diff');
      let patches = diff(oldDom.tree, tree);
      Perf.markStop('Elem.render.diff');
      Perf.markStart('Elem.render.patch');
      let rootNode = patch(oldDom.rootNode, patches);
      treeCache[rootId] = {
        tree: tree,
        rootNode: rootNode
      };
      Perf.markStop('Elem.render.patch');
    }
  }
  Perf.markStop('Elem.render');
  return {
    unmount() {
      delete node.rootId;
      while (!_.isUndefined(node) && !Object.is(node, null) && node.firstChild) {
        node.removeChild(node.firstChild);
      }
      delete treeCache[rootId];
    }
  };
}

export function unmount(theNode) {
  let node = theNode;
  let doc = document;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  }
  if (_.isString(node)) {
    node = doc.querySelector(node);
  }
  while (!_.isUndefined(node) && !Object.is(node, null) && node.firstChild) {
    node.removeChild(node.firstChild);
  }
  if (node.rootId) {
    delete treeCache[node.rootId];
    delete node.rootId;
  }
}

export function findDOMNode(ref) {
  return document.querySelector(`[data-elemref="${ref}"]`);
}

export function renderToJson(elementOrFunction, props = {}) {
  Perf.markStart('Elem.renderToJson');
  let tree = elementOrFunction;
  if (_.isFunction(tree)) {
    let refs = {...globalRefs};
    globalRefs = {};
    let componentContext = createComponentContext(() => {}, null, refs);
    let thisContext = {...componentContext, props};
    tree = tree.bind(thisContext)(componentContext, props);
  }
  let rootNode = VDOMCreateElement(tree, { document: Docs.createJsonDocument() });
  let str = rootNode.render();
  Perf.markStop('Elem.renderToJson');
  return str;
}

export function renderToString(elementOrFunction, props = {}) {
  Perf.markStart('Elem.renderToString');
  let tree = elementOrFunction;
  if (_.isFunction(tree)) {
    let refs = {...globalRefs};
    globalRefs = {};
    let componentContext = createComponentContext(() => {}, null, refs);
    let thisContext = {...componentContext, props};
    tree = tree.bind(thisContext)(componentContext, props);
  }
  let rootNode = VDOMCreateElement(tree, { document: Docs.createStringDocument() });
  let str = rootNode.render();
  Perf.markStop('Elem.renderToString');
  return str;
}

export function component(comp) {
  const blueprint = {
    state: {},
    props: {},
    setState() {},
    replaceState() {},
    init() {},
    render() {},
    initialState() { return {}; },
    defaultProps() { return {}; }
  };
  let factory = (props) => {
    let instance = Object.assign({...blueprint}, comp);
    return {
      isElemComponent: true,
      renderToString() {
        instance.props = instance.defaultProps.bind(instance)() || props;
        instance.state = instance.initialState();
        instance.setState = instance.state.set;
        instance.replaceState = instance.state.replace;
        instance.setState = (diffState, cb) => {
          for (let key in diffState) {
            instance.state[key] = diffState[key];
          }
          if (cb) cb();
        };
        instance.replaceState = (newState, cb) => {
          instance.state = newState;
          if (cb) cb();
        };
        instance.getDOMNode = () => null;
        Object.keys(instance).forEach(k => {
          if (k !== 'state' && _.isFunction(instance[k])) {
            instance[k] = instance[k].bind(instance);
          }
        });
        instance.init();
        let tree = instance.render();
        return renderToString(tree);
      },
      renderTo(node) {
        Perf.markStart('Elem.component.init');
        instance.props = instance.defaultProps.bind(instance)() || props;
        instance.state = instance.initialState();
        instance.setState = (diffState, cb) => {
          for (let key in diffState) {
            instance.state[key] = diffState[key];
          }
          instance.refresh();
          if (cb) cb();
        };
        instance.replaceState = (newState, cb) => {
          instance.state = newState;
          instance.refresh();
          if (cb) cb();
        };
        instance.getDOMNode = () => {
          let doc = document;
          if (node.ownerDocument) {
            doc = node.ownerDocument;
          }
          if (_.isString(node)) {
            return doc.querySelector(node);
          }
          return node;
        };
        Object.keys(instance).forEach(k => {
          if (k !== 'state' && _.isFunction(instance[k])) {
            instance[k] = instance[k].bind(instance);
          }
        });
        instance.refresh = () => {
          Perf.markStart('Elem.component.tree');
          let tree = instance.render();
          Perf.markStop('Elem.component.tree');
          if (!_.isUndefined(node)) {
            Perf.markStart('Elem.component.render');
            let r = render(tree, node);
            Perf.markStop('Elem.component.render');
            return r;
          } else {
            return tree;
          }
        };
        instance.init();
        Perf.markStop('Elem.component.init');
        return instance.refresh();
      }
    };
  };
  factory.isElemComponentFactory = true;
  return factory;
}
