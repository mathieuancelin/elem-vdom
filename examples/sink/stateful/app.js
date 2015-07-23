const Showcase = require('../showcase');
const Elem = require('../../..');
const Counter = require('./components');
const Stores = require('../../../src/stores');

import counter from './store';
import { increment } from './actions';

let interval = null;

Showcase.registerTile('Statefull Redux like example', container => {
  let store = Stores.createStore(counter);
  Elem.render(Counter, container, { store });

  interval = setInterval(() => {
    store.dispatch(increment());
  }, 1000);
}, () => {
  clearInterval(interval);
});
