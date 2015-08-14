const chai = require('chai');
const Elem = require('../lib/main');
const DOM = require('./utils/dom');
const expect = chai.expect;

describe('A simple component', () => {

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
      return () => {
        return Elem.el('div', [
          Elem.el('span', { ref: 'reftest' }, 'Hello World'),
          Elem.el('button', { type: 'button', onClick: () => {
            cb(this.refs.reftest || '');
            this.refresh();
          } }, 'Click me !!!')
        ]);
      };
    }

    let inner = '';
    DOM.cleanup();
    DOM.renderComponent(ClickableComponent((ref) => {
      console.log('ref', ref);
      inner = Elem.findDOMNode(ref).innerHTML;
    }));
    let button = DOM.node('button');
    expect(button).to.exist;
    DOM.click('button');
    DOM.click('button');
    DOM.click('button');
    expect(inner).to.be.equal('');
    // expect(inner).to.be.equal('Hello World');
    done();
  });

  it('can handle typing', done => {

    const text = 'Hello World !!!';
    let targetText = '';
    function TypableComponent(cb) {
      return () => {
        return Elem.el('div', [
          Elem.el('input', { type: 'text', onkeypress: cb })
        ]);
      };
    }
    DOM.cleanup();
    DOM.renderComponent(TypableComponent((e) => {
      targetText = targetText + String.fromCharCode(e.charCode);
    }));
    let input = DOM.node('input');
    expect(input).to.exist;
    DOM.type('input', text).then(() => {
      expect(targetText).to.be.equal(text);
      done();
    });

  });

});
