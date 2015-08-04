const Showcase = require('../showcase');
const Elem = require('../../../src/main');
const Store = require('../../../src/store');

import Counter from './components';
import counter from './store';
import { increment } from './actions';

let interval = null;

Showcase.registerTile('Statefull Redux like example', container => {
  let store = Store.createStore({ counter });
  Elem.render(Counter, container, { store });

  interval = setInterval(() => {
    store.dispatch(increment());
  }, 1000);
}, () => {
  clearInterval(interval);
});
