const chai = require('chai');
const Elem = require('../lib/main');
const DOM = require('./utils/dom');
const expect = chai.expect;

describe('elem-vdom components', () => {

  it('can be stateful', done => {

    function Clicker() {
      const click = () => this.setState({ count: (this.state.count || 0) + 1 });
      return (
        <div>
          <h1>Clicked {this.state.count || '0'} times</h1>
          <button type="button" onClick={click}>Click</button>
        </div>
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);
    let node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Clicked 0 times');
    DOM.click('button');
    node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Clicked 1 times');
    DOM.click('button');
    node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Clicked 2 times');
    done();
  });

});
