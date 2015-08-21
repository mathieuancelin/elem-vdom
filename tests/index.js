/* eslint no-unused-vars:0 */

const env = require('./utils/env');

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
  require('./devtools.spec.js')
];

// TODO : more devtools
