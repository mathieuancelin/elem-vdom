const chai = require('chai');
const Elem = require('../lib/main');
const DOM = require('./utils/dom');
const expect = chai.expect;

describe('elem-vdom', () => {

  it('can be used with simple JSX', done => {

    function SimpleComponent() {
      return <h1>Hello World!</h1>;
    }

    DOM.renderComponent(SimpleComponent);
    let node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.a('string');
    expect(node.innerHTML).to.be.equal('Hello World!');
    done();
  });

});
