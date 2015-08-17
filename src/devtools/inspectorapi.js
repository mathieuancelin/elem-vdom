import * as Utils from '../utils';

let enabled = false;
let globalStore = {};
let childrenStore = [];
let listeners = [];

function callListeners() {
  listeners.forEach(l => l());
}

export function start() {
  globalStore = {};
  childrenStore = [];
  enabled = true;
}

export function stop() {
  globalStore = {};
  childrenStore = [];
  enabled = false;
}

export function isEnabled() {
  return enabled;
}

export function removeExposedComponent(name) {
  delete globalStore[name];
  callListeners();
}

export function getExposedStateAndProps() {
  return {...globalStore};
}

export function cleanup() {
  globalStore = {};
  childrenStore = [];
  callListeners();
}

export function cleanupGoneComponents() {
  Object.keys(globalStore).forEach(key => {
    if (!document.contains(globalStore[key].node)) {
      delete globalStore[key];
    }
  });
  callListeners();
}

export function exposeAt(name, data) {
  if (enabled) {
    if (Utils.isString(data.node)) {
      data.node = document.querySelector(data.node);
    }
    globalStore[name] = data;
    callListeners();
  }
}

export function exposeStateAndProps(name, maybeNode, state, props, setState, replaceState) {
  if (enabled) {
    let node = maybeNode;
    if (Utils.isString(node)) {
      node = document.querySelector(node);
    }
    let children = [...childrenStore];
    childrenStore = [];
    globalStore[name] = {
      name,
      node,
      state,
      props,
      setState,
      replaceState,
      children
    };
    callListeners();
  }
}

export function exposeChildrenStateAndProps(name, state, props, setState, replaceState, collectChildren = false) {
  if (enabled) {
    let children = [];
    if (collectChildren) {
      children = [...childrenStore];
      childrenStore = [];
    }
    childrenStore.push({
      name,
      state,
      props,
      setState,
      replaceState,
      children
    });
  }
}

export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    let index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

export function ephemeralSubscribe(listener) {
  let ctx = {};
  ctx.ephemeralListener = () => {
    listener();
    let index = listeners.indexOf(ctx.ephemeralListener);
    listeners.splice(index, 1);
  };
  listeners.push(ctx.ephemeralListener);
}
