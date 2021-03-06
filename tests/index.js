/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

const env = require('../src/test/env');

env.setupEnv();

const tests = [
  require('./basic.spec.js'),
  require('./elem.spec.js'),
  require('./el.spec.js'),
  require('./jsx.spec.js'),
  require('./state.spec.js'),
  require('./stylesheet.spec.js'),
  require('./universal.spec.js'),
  require('./store.spec.js'),
  require('./devtools.spec.js'),
  require('./component.spec.js'),
];
