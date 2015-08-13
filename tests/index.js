const env = require('./utils/env');

env.setupEnv();

const tests = [
  require('./basic.spec.js'),
  require('./el.spec.js'),
  require('./jsx.spec.js')
];
