const Elem = require('../../../src/main');
const Store = require('../../../src/store');

import * as actions from './actions';

function selector(state) {
  return {
    counter: state.counter
  };
}

function Counter(ctx, props) {
  return Elem.el('div', [
    Elem.el('p', 'count : ' + props.counter)
  ]);
}

export default function CounterWrapper(ctx, props) {
  return Elem.el(Store.Provider, {
    store: props.store,
    actions,
    render: () => Elem.el(Store.Selector, { selector, render: Counter })
  });
}
