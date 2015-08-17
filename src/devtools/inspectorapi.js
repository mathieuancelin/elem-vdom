import * as Utils from '../utils';

let enabled = false;
let globalStore = {};
let listeners = [];

function callListeners() {
  listeners.forEach(l => l());
}

export function start() {
  globalStore = {};
  enabled = true;
}

export function stop() {
  globalStore = {};
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
  callListeners();
}

export function cleanupGoneComponents(notify = false) {
  Object.keys(globalStore).forEach(key => {
    if (!document.contains(globalStore[key].node)) {
      delete globalStore[key];
    }
  });
  if (notify) {
    callListeners();
  }
}

export function exposeComponentTreeAt(name, data) {
  if (enabled) {
    if (Utils.isString(data.node)) {
      data.node = document.querySelector(data.node);
    }
    globalStore[name] = data;
    cleanupGoneComponents();
    callListeners();
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
