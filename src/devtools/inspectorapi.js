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

export function exposeStateAndProps(name, state, props, setState, replaceState) {
  if (enabled) {
    let children = [...childrenStore];
    childrenStore = [];
    globalStore[name] = {
      name,
      state,
      props,
      setState,
      replaceState,
      children
    };
    callListeners();
  }
}

export function exposeChildrenStateAndProps(name, state, props, setState, replaceState) {
  if (enabled) {
    childrenStore.push({
      name,
      state,
      props,
      setState,
      replaceState
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
