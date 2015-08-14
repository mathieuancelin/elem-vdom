/* eslint no-unused-vars:0 */

const env = require('./utils/env');

env.setupEnv();

const tests = [
  require('./basic.spec.js'),
  require('./el.spec.js'),
  require('./jsx.spec.js')
];

// TODO : stylesheet
// TODO : state
// TODO : substate
// TODO : refs
// TODO : SVG
// TODO : universal
