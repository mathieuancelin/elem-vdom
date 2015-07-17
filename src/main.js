const _ = require('lodash');
const Utils = require('./utils');
const State = require('./state');
const Docs = require('./docs');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const VDOMCreateElement = require('virtual-dom/create-element');
const VNode = require('virtual-dom/vnode/vnode');
const VText = require('virtual-dom/vnode/vtext');

export const svgNS = "http://www.w3.org/2000/svg";
const treeCache = {};
let globalRefs = {};

function NotSupported() {
  throw new Error("Not supported yet !!!");
}

function styleToString(attrs) {
  if (_.isUndefined(attrs)) return '';
  let attrsArray = _.map(_.keys(attrs), key => {
    if (key === 'extend') {
      return undefined;
    }
    let keyName = Utils.dasherize(key);
    if (key === 'className') {
      keyName = 'class';
    }
    let value = attrs[key];
    if (!_.isUndefined(value) && _.isFunction(value)) {
      value = value();
    }
    if (!_.isUndefined(value)) {
      return keyName + ': ' + value + ';';
    } else {
      return undefined;
    }
  });
  attrsArray = _.filter(attrsArray, item => !_.isUndefined(item));
  return attrsArray.join(' ');
}

function classToArray(attrs) { /* Handle class as object with boolean values */
  if (_.isUndefined(attrs)) return [];
  let attrsArray = _.map(_.keys(attrs), key => {
    let value = attrs[key];
    if (!_.isUndefined(value) && value === true) {
      return Utils.dasherize(key);
    } else {
      return undefined;
    }
  });
  attrsArray = _.filter(attrsArray, item => !_.isUndefined(item));
  return attrsArray;
}

function asAttribute(key, value) {
  return {
    key,
    value
  };
}

function transformAttrs(attrs) {
  if (_.isUndefined(attrs)) return [];
  let context = {
    ref: undefined,
    handlers: [],
    attrs: []
  };
  let attrsArray = [];
  _.each(_.keys(attrs), key => {
    let keyName = Utils.dasherize(key);
    if (key === 'className') {
      keyName = 'class';
    }
    if (_.startsWith(keyName, 'on')) {
      context.handlers.push({
        key: key,
        value: attrs[key]
      });
    } else if (keyName === 'ref') {
      context.ref = attrs[key];
    } else {
      let value = attrs[key];
      if (!_.isUndefined(value) && _.isFunction(value)) {
        value = value();
      }
      if (!_.isUndefined(value)) {
        if (_.isObject(value) && keyName === 'style') {
          attrsArray.push(asAttribute('style', styleToString(value)));
        } else if (_.isArray(value) && keyName === 'class') {
          attrsArray.push(asAttribute(keyName, value.join(' ')));
        } else if (_.isObject(value) && keyName === 'class') {
          attrsArray.push(asAttribute(keyName, classToArray(value).join(' ')));
        } else {
          attrsArray.push(asAttribute(keyName, value));
        }
      }
    }
  });
  context.attrs = attrsArray;
  return context;
}

export function el(tagName) {
  let args = Array.slice(arguments);
  args = args.slice(1);
  let argsLength = args.length;
  let namespace = undefined;
  let attrs = undefined;
  let children = undefined;
  let name = _.isString(tagName) ? (_.escape(tagName) || 'unknown') : tagName;
  // 1 args
  if (argsLength === 0) {
    return el(name, undefined, {}, []);
  }
  // 2 args
  if (argsLength === 1 && _.isFunction(args[0])) {
    return el(name, args[0]());
  }
  if (argsLength === 1 && _.isArray(args[0])) {
    return el(name, undefined, {}, args[0]);
  }
  if (argsLength === 1 && _.isObject(args[0]) && args[0].__asHtml) {
    return el(name, undefined, {}, [args[0]]);
  }
  if (argsLength === 1 && _.isObject(args[0])) {
    return el(name, undefined, args[0], []);
  }
  if (argsLength === 1 && _.isString(args[0])) {
    return el(name, undefined, {}, [args[0]]);
  }
  // 3 args
  if (argsLength === 2 && _.isFunction(args[1])) {
    return el(name, args[0], args[1]());
  }
  if (argsLength === 2 && _.isObject(args[0]) && !_.isArray(args[1])) {
    return el(name, undefined, args[0], [args[1]]);
  }
  if (argsLength === 2 && _.isObject(args[0]) && _.isArray(args[1])) {
    // attrs and array children
    return el(name, undefined, args[0], args[1]);
  }
  if (argsLength === 2 && _.isString(args[0]) && _.isObject(args[1])) {
    return el(name, undefined, args[0], args[1], []);
  }
  // 4 args
  if (argsLength === 3 && (_.isUndefined(args[0]) || _.isString(args[0])) && _.isObject(args[1]) && !_.isArray(args[2])) {
    return el(name, args[0], args[1], [args[2]]);
  }
  if (argsLength === 3 && (_.isUndefined(args[0]) || _.isString(args[0])) && _.isObject(args[1]) && _.isArray(args[2])) {
    // namespace, attrs and array children
    namespace = args[0];
    attrs = args[1];
    children = args[2];
  }
  return internalEl(name, attrs, children, args.key, namespace, vdomNodeMaker, vdomTextMaker);
}

function vdomTextMaker(str) {
  return new VText(str + '');
}

function vdomNodeMaker(name, attrs, children, key, namespace) {
  return new VNode(name, attrs, children, key, namespace);
}

function internalEl(name, attrs, children, key, namespace, nodeMaker, textMaker) {
  let innerHTML = undefined;
  attrs = attrs || {};
  children = children || [];
  children = _.chain(children)
    .map(child => {
      if (_.isFunction(child)) {
        return child();
      } else {
        return child;
      }
    })
    .filter(item => !_.isUndefined(item))
    .map(item => {
      if (item instanceof VNode) {
        return item;
      } else if (_.isObject(item) && item.__asHtml) {
        innerHTML = item.__asHtml;
        return textMaker('');
      } else {
        return textMaker(item + '');
      }
    }).value();

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
    return name(attrs);
  }

  let finalAttrs = {};
  finalAttrs.attributes = {};
  let ctx = transformAttrs(attrs);
  if (ctx.ref) {
    let refId = Utils.uniqueId('elemref-');
    finalAttrs.attributes['data-elemref'] = refId;
    globalRefs[ctx.ref] = refId;
  }
  ctx.attrs.forEach(item => finalAttrs.attributes[item.key] = item.value);
  ctx.handlers.forEach(item => finalAttrs[item.key] = item.value);
  if (innerHTML) {
      finalAttrs.innerHTML = innerHTML;
  }
  return nodeMaker(name, finalAttrs, children, attrs.key, namespace);
}

export function svg(name, attrs = {}, children = []) {
  if (!children) {
    return el(name, svgNS, {}, attrs);
  }
  return el(name, svgNS, attrs, children);
};

export function nbsp(times) {
  return el('span', {
    __asHtml: _.times(times || 1, function() {
      return '&nbsp;';
    })
  });
};

export function text(text) {
  return el('span', {}, text);
};

export function render(el, node) {
  Perf.markStart('Elem.render');
  let tree = el;
  if (_.isFunction(tree)) {
    let refs = _.clone(globalRefs);
    globalRefs = {};
    Perf.markStart('Elem.render.tree');
    tree = tree(createComponentContext(() => render(el, node), node, refs));
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
};

function createComponentContext(refresh, renderNode, refs) {
  let state = State();
  state.onChange(refresh);
  return {
    refs: refs || {},
    props: {},
    state,
    refresh,
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

export const registerWebComponent = NotSupported;
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
    tree = tree(createComponentContext(() => {}, null, refs));
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
    tree = tree(createComponentContext(() => {}, null, refs));
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

// TODO : context per tree ??
// TODO : webcomponents
