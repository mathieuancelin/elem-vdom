const _ = {
  clone: require('lodash/lang/clone'),
  isFunction: require('lodash/lang/isFunction')
};

let nameCounter = 0;

export function createStore() {
  let reducers = Array.slice(arguments).map(f => {
    if (!_.isFunction(f)) {
      throw new Error('Store should be a function ...');
    }
    let __name = f.name || `substate-${nameCounter++}`;
    return {
      getNewState: f,
      name: __name
    };
  });

  let actionsTimeline = [];
  let state = {};
  let listeners = [];

  function dispatch(what) {
    actionsTimeline.push(what);
    let currentState = state;
    reducers.forEach(reducer => {
      currentState[reducer.name] = reducer.getNewState(currentState[reducer.name], what);
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
  let newCtx = {...ctx};
  delete props.actions;
  delete props.tree;
  delete props.store;
  delete props.selector;
  let newProps = {...props, ...bindActionsToDispatch(actions, store.dispatch), ...selector(store.getState())};
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
