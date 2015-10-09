/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const expect = chai.expect;

describe('elem-vdom devtool', () => {

  it('can render a big redbox', done => {

    function App() {
      yo;
      return <h1 id="pouet">Hello {this.props.who}!</h1>;
    }

    function DebugApp() {
      return Elem.el(Elem.Devtools.ErrorMonitor(App), { who: 'World' });
    }

    DOM.cleanup();
    DOM.renderComponent(DebugApp);
    let node = DOM.node('#errorTitle');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('ReferenceError: yo is not defined');
    done();
  });
});
