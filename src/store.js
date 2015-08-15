import _ from './lodash';

let nameCounter = 0;

export function createStore(reducer = {}, initialState = {}) {
  let reducers = [];
  if (_.isObject(reducer)) {
    for (let key in reducer) {
      let f = reducer[key];
      if (!_.isFunction(f)) {
        throw new Error('Store should be a function ...');
      }
      let __name = f.name || key || `substate-${nameCounter++}`;
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
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function ephemeralSubscribe(listener) {
    let ctx = {};
    ctx.ephemeralListener = () => {
      listener();
      let index = listeners.indexOf(ctx.ephemeralListener);
      listeners.splice(index, 1);
    };
    listeners.push(ctx.ephemeralListener);
  }

  dispatch({ type: '@@init' });

  return {
    dispatch,
    subscribe,
    ephemeralSubscribe,
    setState(newState) {
      state = newState;
      listeners.forEach(listener => listener());
      return state;
    },
    getState() {
      return {...state};
    }
  };
}

export function bindActionsToDispatch(actions, dispatch) {
  let boundActions = {};
  for (let key in actions) {
    let value = actions[key];
    let name = key || value.name || `boundaction-${nameCounter++}`;
    boundActions[name] = () => {
      let action = value.apply(null, arguments);
      dispatch(action);
    };
  }
  return boundActions;
}

// export default const myStore = Store.handleActions({ ... }, { ... })
export function handleActions(actions, initialState = {}) {
  return (state, action) => {
    let actualAction = actions[action.type];
    if (actualAction) {
      return actualAction(state, action);
    } else {
      return state || initialState;
    }
  };
}

// export default const myStore = Store.withInitialState({ ... }).handleActions({ ... })
export function withInitialState(initialState) {
  const apiHandleActions = handleActions;
  return {
    handleActions(actions) {
      return apiHandleActions(actions, initialState);
    }
  };
}

export function Provider(ctx, props) {
  let { store, actions = {}, render } = props;
  let boundActions = bindActionsToDispatch(actions, store.dispatch);
  ctx.context.actions = boundActions;
  ctx.context.store = store;
  ctx.context.dispatch = store.dispatch;
  ctx.context.getState = store.getState;
  store.ephemeralSubscribe(() => ctx.refresh());
  let bindContext = {...ctx, props };
  return render.bind(bindContext)(ctx, props);
}

export function Selector(ctx, props) {
  let { selector, actions = {}, render } = props;
  let { store } = ctx.context;
  let boundActions = bindActionsToDispatch(actions, store.dispatch);
  let newProps = {...props, ...boundActions, ...selector(store.getState())};
  return render.bind({ ctx, props: newProps })(ctx, newProps);
}

export function Connector(ctx, props) {
  let { store, selector, actions, render } = props;
  let newCtx = {...ctx};
  delete props.actions;
  delete props.render;
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
  return render.bind({ ...newCtx, props: newProps })(newCtx, newProps);
}
