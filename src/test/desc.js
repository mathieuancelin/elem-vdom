const chai = require('chai');
const DOM = require('./dom');
const expect = chai.expect;

export function it(what, block) {
  expect(block).to.exist;
  global.it(what, done => {
    DOM.cleanup();
    block(DOM, expect);
    DOM.cleanup();
    done();
  });
}
