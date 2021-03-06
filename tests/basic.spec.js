/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const expect = chai.expect;

describe('elem-vdom simple component', () => {

  it('can be rendered in the DOM', done => {

    function SimpleComponent() {
      return Elem.el('h1', 'Hello World!');
    }

    DOM.renderComponent(SimpleComponent);
    let node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.a('string');
    expect(node.innerHTML).to.be.equal('Hello World!');
    done();

  });

  it('can be unmounted', done => {

    function SimpleComponent() {
      return Elem.el('h1', 'Hello World!');
    }

    DOM.cleanup();
    let component = DOM.renderComponent(SimpleComponent);
    let node = DOM.node('h1');
    expect(node).to.exist;
    component.unmount();
    node = DOM.node('h1');
    expect(node).to.not.exist;
    done();

  });

  it('can handle click', done => {

    function ClickableComponent(cb) {
      return () => {
        return Elem.el('div', [
          Elem.el('button', { type: 'button', onClick: cb }, 'Click me !!!')
        ]);
      };
    }

    let clicked = false;
    DOM.cleanup();
    DOM.renderComponent(ClickableComponent(() => clicked = true));
    let button = DOM.node('button');
    expect(button).to.exist;
    DOM.click('button');
    expect(clicked).to.be.true;
    done();

  });

  it('can use refs', done => {

    function ClickableComponent(cb) {
      return (ctx) => {
        return Elem.el('div', [
          Elem.el('span', { ref: 'reftest' }, 'Hello World'),
          Elem.el('button', { type: 'button', onClick: () => {
            ctx.refresh();
            cb(ctx.refs.reftest);
          } }, 'Click me !!!')
        ]);
      };
    }

    let inner = '';
    DOM.cleanup();
    DOM.renderComponent(ClickableComponent(ref => {
      inner = Elem.findDOMNode(ref).innerHTML;
    }));
    let button = DOM.node('button');
    expect(button).to.exist;
    DOM.click('button');
    DOM.click('button');
    DOM.click('button');
    expect(inner).to.be.equal('Hello World');
    done();
  });

  it('can handle typing', done => {

    const text = 'Hello World !!!';
    let targetText = '';
    function TypableComponent(cb) {
      return () => {
        return Elem.el('div', [
          Elem.el('input', { type: 'text', onchange: cb })
        ]);
      };
    }
    DOM.cleanup();
    DOM.renderComponent(TypableComponent((e) => {
      targetText = e.target.value;
    }));
    let input = DOM.node('input');
    expect(input).to.exist;
    DOM.change(input, text);
    expect(targetText).to.be.equal(text);
    done();
  });

});
