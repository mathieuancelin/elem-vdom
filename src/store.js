const _ = {
  clone: require('lodash/lang/clone'),
  isFunction: require('lodash/lang/isFunction'),
  isObject: require('lodash/lang/isObject')
};

let nameCounter = 0;

export function createStore(reducer = {}, initialState = {}) {
  let reducers = [];
  if (_.isObject(reducer)) {
    for (let key in reducer) {
      let f = reducer[key];
      if (!_.isFunction(f)) {
        throw new Error('Store should be a function ...');
      }
      let __name = f.name || `substate-${nameCounter++}`;
      reducers.push({
        getNewState: f,
        name: __name
      });
    }
  } else if (_.isFunction(reducer)) {
    let name = reducer.name || 'reducer';
    reducers = [{
      getNewState: reducer,
      name
    }];
  } else {
    throw new Error('Store should be a function or an object of functions ...');
  }

  let actionsTimeline = [];
  let state = initialState;
  let listeners = [];

  function dispatch(what) {
    actionsTimeline.push(what);
    let currentState = state;
    reducers.forEach(r => {
      currentState[r.name] = r.getNewState(currentState[r.name], what);
    });
    state = currentState;
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  dispatch({ type: '@@init' });

  return {
    dispatch,
    subscribe,
    setState(newState) {
      state = newState;
      listeners.forEach(listener => listener());
      return state;
    },
    getState() {
      return _.clone(state);
    }
  };
}

export function bindActionsToDispatch(actions, dispatch) {
  let boundActions = {};
  for (let key in actions) {
    let value = actions[key];
    let name = value.name || `boundaction-${nameCounter++}`;
    boundActions[name] = () => {
      let action = value.apply(null, arguments);
      dispatch(action);
    };
  }
  return boundActions;
}

export function Connector(ctx, props) {
  let { store, selector, actions, tree } = props;
  if (!tree) {
    tree = () => {
      return props.children;
    };
  }
  let newCtx = {...ctx};
  delete props.actions;
  delete props.tree;
  delete props.store;
  delete props.selector;
  let boundActions = bindActionsToDispatch(actions, store.dispatch);
  let newProps = {...props, ...boundActions, ...selector(store.getState()), actions: boundActions};
  newCtx.store = store;
  newCtx.dispatch = store.dispatch;
  let fakeCtx = {
    unsubscribe: null
  };
  fakeCtx.unsubscribe = store.subscribe(() => {
    ctx.refresh();
    fakeCtx.unsubscribe();
  });
  return tree(newCtx, newProps);
}
