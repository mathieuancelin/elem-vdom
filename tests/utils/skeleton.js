const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('./utils/dom');
const expect = chai.expect;

function Component() {
  return Elem.el('h1', 'Hello World!');
}

describe('Description', () => {

  it('can do xxx', done => {
    DOM.cleanup();
    DOM.renderComponent(Component);
    let node = DOM.node('xxxx');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.a('string');
    done();
  });

  it('can do xxx', done => {
    done();
  });

});
