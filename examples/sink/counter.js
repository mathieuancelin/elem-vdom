const Showcase = require('./showcase');
const Elem = require('../..');
const Redux = require('../../src/redux');

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export default function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}

Showcase.registerTile('Redux like example', container => {
  let store = Redux.createStore(counter);
  console.log('First state', store.getState());
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(increment());
  store.dispatch(increment());
  store.dispatch(decrement());
  console.log('Final state', store.getState());

  function Counter() {
    return Elem.el(Redux.Connector, {
      store,
      selector: (state) => {
        return { counter: state.counter }
      },
      actions: { increment, decrement },
      tree: (ctx, props) => {
        return Elem.el('div', [
          Elem.el('p', 'count : ' + props.counter),
          Elem.el('button', { type: 'button', onclick: props.increment }, '+1'),
          Elem.el('button', { type: 'button', onclick: props.decrement }, '-1')
        ]);
      }
    });
  }

  Elem.render(Counter, container);
});
