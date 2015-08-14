import _ from './lodash';
import * as Elem from './main';

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
      return {...state};
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

export function Connector(ctx, props) {
  let { store, selector, actions, render } = props;
  if (!render && _.isFunction(props.children[0])) {
    render = props.children[0];
  } else if (!render) {
    render = () => Elem.el('span', props.children);
  }
  let newCtx = {...ctx};
  delete props.actions;
  delete props.render;
  delete props.store;
  delete props.selector;
  let boundActions = bindActionsToDispatch(actions, store.dispatch);
  let newProps = {...props, ...boundActions, ...selector(store.getState()), actions: boundActions};
  newCtx.store = store;
  newCtx.dispatch = store.dispatch;
  newCtx.context.actions = boundActions;
  newCtx.context.store = store;
  newCtx.context.dispatch = store.dispatch;
  newCtx.context.state = {...selector(store.getState())};
  let fakeCtx = {
    unsubscribe: null
  };
  fakeCtx.unsubscribe = store.subscribe(() => {
    ctx.refresh();
    fakeCtx.unsubscribe();
  });
  return render.bind({ ...newCtx, props: newProps })(newCtx, newProps);
}

export function ComposableConnector(store, selector, actions) {
  return (render) => {
    return (ctx, props) => {
      return Connector(ctx, { ...props, store, selector, actions, render });
    };
  };
}
