/* eslint no-unused-vars:0 */
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

  it('can be stateful with inner components', done => {

    function ClickerButton() {
      return <button type="button" onClick={this.props.onClick}>Click</button>;
    }

    function Clicker() {
      const click = () => this.setState({ count: (this.state.count || 0) + 1 });
      return (
        <div>
          <h1>Clicked {this.state.count || '0'} times</h1>
          <ClickerButton onClick={click} />
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

  it('can use sub states', done => {

    function ClickLine() {
      const click = () => this.setState({ count: (this.state.count || 0) + 1 });
      return <button type="button" onClick={click}>Clicked {this.state.count || '0'} times</button>;
    }

    function Clicker() {
      return (
        <div>
          <h1>Clicked {this.state.count || '999'} times</h1>
          <ClickLine key="line1" />
          <ClickLine key="line2" />
          <ClickLine key="line3" />
          <ClickLine key="line4" />
        </div>
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);
    let node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Clicked 999 times');

    expect(DOM.nodes('button').length).to.be.equal(4);
    expect(DOM.nodes('button')[0].innerHTML).to.be.equal('Clicked 0 times');
    expect(DOM.nodes('button')[1].innerHTML).to.be.equal('Clicked 0 times');
    expect(DOM.nodes('button')[2].innerHTML).to.be.equal('Clicked 0 times');
    expect(DOM.nodes('button')[3].innerHTML).to.be.equal('Clicked 0 times');

    DOM.nodes('button')[0].click();
    expect(DOM.nodes('button')[0].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[1].innerHTML).to.be.equal('Clicked 0 times');
    expect(DOM.nodes('button')[2].innerHTML).to.be.equal('Clicked 0 times');
    expect(DOM.nodes('button')[3].innerHTML).to.be.equal('Clicked 0 times');

    DOM.nodes('button')[1].click();
    expect(DOM.nodes('button')[0].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[1].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[2].innerHTML).to.be.equal('Clicked 0 times');
    expect(DOM.nodes('button')[3].innerHTML).to.be.equal('Clicked 0 times');

    DOM.nodes('button')[2].click();
    expect(DOM.nodes('button')[0].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[1].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[2].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[3].innerHTML).to.be.equal('Clicked 0 times');

    DOM.nodes('button')[3].click();
    expect(DOM.nodes('button')[0].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[1].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[2].innerHTML).to.be.equal('Clicked 1 times');
    expect(DOM.nodes('button')[3].innerHTML).to.be.equal('Clicked 1 times');

    DOM.nodes('button')[0].click();
    DOM.nodes('button')[1].click();
    DOM.nodes('button')[2].click();
    DOM.nodes('button')[3].click();

    expect(DOM.nodes('button')[0].innerHTML).to.be.equal('Clicked 2 times');
    expect(DOM.nodes('button')[1].innerHTML).to.be.equal('Clicked 2 times');
    expect(DOM.nodes('button')[2].innerHTML).to.be.equal('Clicked 2 times');
    expect(DOM.nodes('button')[3].innerHTML).to.be.equal('Clicked 2 times');

    expect(node.innerHTML).to.be.equal('Clicked 999 times');

    done();
  });

});
