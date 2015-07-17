const _ = require('lodash');
const Utils = require('./utils');
const State = require('./state');
const Docs = require('./docs');
const WebComponents = require('./webcomponents');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const VDOMCreateElement = require('virtual-dom/create-element');
const VNode = require('virtual-dom/vnode/vnode');
const VText = require('virtual-dom/vnode/vtext');

export const svgNS = "http://www.w3.org/2000/svg";
const treeCache = {};
let globalRefs = {};
let currentComponentContext = undefined;

function NotSupported() {
  throw new Error("Not supported yet !!!");
}

function styleToString(attrs) {
  if (!attrs) return '';
  let attrsArray = [];
  for (var key in attrs) {
    if (key !== 'extend') {
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
          attrsArray.push(keyName + ': ' + value + ';');
        }
      }
    }
  }
  return attrsArray.join(' ');
}

function classToArray(attrs) {
  if (!attrs) return [];
  let attrsArray = [];
  for (var key in attrs) {
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
  for (var key in attrs) {
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

export function el(tagName) {
  let args = Array.slice(arguments);
  args = args.slice(1);
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
    return internalEl(name, args[0],  args[1], args[0].key, undefined);
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
  console.warn('Unknown el expression ...', arguments)
  return internalEl(name, args[1], args[2], args[1].key, args[0]);
}

function internalEl(name, attrs, children, key, namespace) {
  let innerHTML = undefined;
  attrs = attrs || {};
  children = children || [];
  let newChildren = [];
  for (var i in children) {
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
    let props = _.clone(attrs);
    props.children = children;
    props.key = key;
    props.namespace = namespace;
    // TODO : hook global resfesh on nested state
    return name(attrs).renderTo();
  }
  if (_.isFunction(name) && !name.isElemComponentFactory) {
    let props = _.clone(attrs);
    props.children = children;
    props.key = key;
    props.namespace = namespace;
    let thisContext = {...currentComponentContext, props: attrs};
    return name.bind(thisContext)(attrs, currentComponentContext);
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

export function svg(name) {
  return el.apply(null, [name, svgNS].concat(Array.slice(arguments).slice(1)));
}

export function nbsp(times) {
  return el('span', {
    __asHtml: _.times(times || 1, function() {
      return '&nbsp;';
    })
  });
}

export function text(text) {
  return el('span', {}, text);
}

export function render(el, node) {
  Perf.markStart('Elem.render');
  let tree = el;
  if (_.isFunction(tree)) {
    let refs = _.clone(globalRefs);
    globalRefs = {};
    Perf.markStart('Elem.render.tree');
    try {
      currentComponentContext = createComponentContext(() => render(el, node), node, refs);
      let thisContext = {...currentComponentContext, props: arguments[2] || {}};
      tree = tree.bind(thisContext)(currentComponentContext, arguments[2] || {});
    } finally {
      currentComponentContext = undefined;
    }
    Perf.markStop('Elem.render.tree');
  }
  let doc = document;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  }
  if (_.isString(node)) {
    node = doc.querySelector(node);
  }
  if (node !== null) {
    let rootId = node.rootId;
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
      while (!_.isUndefined(node) && !_.isNull(node) && node.firstChild) {
        node.removeChild(node.firstChild);
      }
      delete treeCache[rootId];
    }
  };
}

function createComponentContext(refresh, renderNode, refs) {
  let state = State();
  state.onChange(refresh);
  return {
    refs: refs || {},
    state,
    refresh,
    redraw: refresh,
    setState: state.set,
    replaceState: state.replace,
    getDOMNode: function() {
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
}

export function findDOMNode(ref) {
  return document.querySelector(`[data-elemref="${ref}"]`);
}

export function component(comp) {
  const blueprint = {
    state: {},
    props: {},
    setState() {},
    replaceState() {},
    init(ctx) {},
    render(ctx) {},
    initialState() { return {}},
    defaultProps() { return {}}
  };
  let factory = function(props) {
    let instance = _.extend(_.clone(blueprint), comp);
    return {
      isElemComponent: true,
      renderToString() {
        instance.props = instance.defaultProps.bind(instance)();
        instance.state = State(instance.initialState.bind(instance)());
        instance.setState = instance.state.set;
        instance.replaceState = instance.state.replace;
        instance.getDOMNode = () => null;
        _.each(_.keys(instance), k => {
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
        instance.props = instance.defaultProps.bind(instance)();
        instance.state = State(instance.initialState.bind(instance)());
        instance.setState = instance.state.set;
        instance.replaceState = instance.state.replace;
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
        _.each(_.keys(instance), k => {
          if (k !== 'state' && _.isFunction(instance[k])) {
            instance[k] = instance[k].bind(instance);
          }
        });
        instance.init();
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
        instance.state.onChange(instance.refresh);
        Perf.markStop('Elem.component.init');
        return instance.refresh();
      }
    };
  };
  factory.isElemComponentFactory = true;
  return factory;
}

export const registerWebComponent = WebComponents.registerWebComponent;
export const Perf = require('./perfs');
export const style = Utils.style;
export const predicate = Utils.predicate;
export const keyMirror = Utils.keyMirror;

export function renderToJson(el) {
  Perf.markStart('Elem.renderToJson');
  let tree = el;
  if (_.isFunction(tree)) {
    let refs = _.clone(globalRefs);
    globalRefs = {};
    let componentContext = createComponentContext(() => {}, null, refs);
    tree = tree(componentContext);
  }
  let rootNode = VDOMCreateElement(tree, { document: Docs.createJsonDocument() });
  let str = rootNode.render();
  Perf.markStop('Elem.renderToJson');
  return str;
}

export function renderToString(el) {
  Perf.markStart('Elem.renderToString');
  let tree = el;
  if (_.isFunction(tree)) {
    let refs = _.clone(globalRefs);
    globalRefs = {};
    let componentContext = createComponentContext(() => {}, null, refs);
    tree = tree(componentContext);
  }
  let rootNode = VDOMCreateElement(tree, { document: Docs.createStringDocument() });
  let str = rootNode.render();
  Perf.markStop('Elem.renderToString');
  return str;
}

// OK : universal apps
// OK : in place callbacks
// OK : SVG
// OK : nested components
// OK : refs to get DOM nodes
// OK : more perf measures
// OK : ref for root
// OK : webcomponents
// OK : optimize

// TODO : context per tree ??
