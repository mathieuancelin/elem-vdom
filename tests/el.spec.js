/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const expect = chai.expect;

describe('elem-vdom Elem.el API', () => {

  describe('can handle 1 arg', () => {
    // 1 args
    it('with empty element', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('button'));
      let node = DOM.node('button');
      expect(node).to.exist;
      done();
    });
    it('with a function', done => {
      function Component() {
        return Elem.el('button');
      }
      DOM.cleanup();
      DOM.renderComponent(Elem.el(Component));
      let node = DOM.node('button');
      expect(node).to.exist;
      done();
    });
  });

  describe('can handle 2 args', () => {
    // 2 args
    it('with a function', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('p', () => Elem.el('span', 'Lorem ipsum')));
      let node = DOM.node('p');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
      done();
    });
    it('with a component', done => {
      function Component() {
        return Elem.el('p', Elem.el('span', { id: this.props.id }, 'Lorem ipsum'));
      }
      DOM.cleanup();
      DOM.renderComponent(Elem.el(Component, { id: 'theId' }));
      let node = DOM.node('p');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<span id="theId">Lorem ipsum</span>');
      done();
    });
    it('with a VNode', done => {

      function SimpleComponent() {
        return Elem.el('h1', Elem.el('a', 'Hello World!'));
      }

      DOM.renderComponent(SimpleComponent);
      let node = DOM.node('h1');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.a('string');
      expect(node.innerHTML).to.be.equal('<a>Hello World!</a>');

      node = DOM.node('a');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.a('string');
      expect(node.innerHTML).to.be.equal('Hello World!');
      done();
    });
    it('with an element', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('p', Elem.el('span', 'Lorem ipsum')));
      let node = DOM.node('p');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
      done();
    });
    it('with an array of elements', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', [
        Elem.el('span', 'Lorem ipsum 1'),
        Elem.el('span', 'Lorem ipsum 2')
      ]));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum 1</span><span>Lorem ipsum 2</span>');
      done();
    });
    it('with inner HTML', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', { __asHtml: '<h1>...</h1>' }));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<h1>...</h1>');
      done();
    });
    it('with props', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', { className: 'solid' }));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.className).to.be.equal('solid');
      done();
    });
    it('with text', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', 'Lorem ipsum'));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('Lorem ipsum');
      done();
    });
  });

  describe('can handle 3 args', () => {
    // 3 args
    it('with function', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('p', { className: 'text' }, () => Elem.el('span', 'Lorem ipsum')));
      let node = DOM.node('p');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
      done();
    });
    it('with props and text', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', { className: 'text' }, 'Lorem ipsum'));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('Lorem ipsum');
      expect(node.className).to.be.equal('text');
      done();
    });
    it('with props and html', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', { className: 'text' }, {__asHtml: '<span>Lorem ipsum</span>' }));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
      expect(node.className).to.be.equal('text');
      done();
    });
    it('with props and element', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('span', { className: 'text' }, Elem.el('span', 'Lorem ipsum')));
      let node = DOM.node('span');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
      expect(node.className).to.be.equal('text');
      done();
    });
    it('with props and array of elements', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('p', { className: 'text' }, [
        Elem.el('span', 'Lorem ipsum 1'),
        Elem.el('span', 'Lorem ipsum 2')
      ]));
      let node = DOM.node('p');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum 1</span><span>Lorem ipsum 2</span>');
      done();
    });
    it('with namespace and props', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('line', Elem.svgNS, { className: 'text' }));
      let node = DOM.node('line');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      done();
    });
    it('with namespace and text', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('text', Elem.svgNS, 'Lorem ipsum'));
      let node = DOM.node('text');
      expect(node).to.exist;
      expect(node.innerHTML).to.be.equal('Lorem ipsum');
      done();
    });
  });

  describe('can handle 4 args', () => {
    // 4 args
    it('with namespace, props and text', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, 'Lorem ipsum'));
      let node = DOM.node('svg');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      expect(node.innerHTML).to.be.equal('Lorem ipsum');
      done();
    });
    it('with namespace, props and element', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, Elem.el('text', 'Lorem ipsum')));
      let node = DOM.node('svg');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      expect(node.innerHTML).to.be.equal('<text>Lorem ipsum</text>');
      done();
    });
    it('with namespace, props and html', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, { __asHtml: '<text>Lorem ipsum</text>' }));
      let node = DOM.node('svg');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      expect(node.innerHTML).to.be.equal('<text>Lorem ipsum</text>');
      done();
    });
    it('with namespace, props and array of elements', done => {
      DOM.cleanup();
      DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, [
        Elem.el('span', 'Lorem ipsum 1'),
        Elem.el('span', 'Lorem ipsum 2')
      ]));
      let node = DOM.node('svg');
      expect(node).to.exist;
      expect(node.className).to.be.equal('text');
      expect(node.innerHTML).to.be.equal('<span>Lorem ipsum 1</span><span>Lorem ipsum 2</span>');
      done();
    });
  });
});
