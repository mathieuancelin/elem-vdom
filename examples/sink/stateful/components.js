const Elem = require('../../..');
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
  return Elem.el(Store.Connector, {
    store: props.store,
    selector,
    actions,
    tree: Counter
  });
}
