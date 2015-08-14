const chai = require('chai');
const Elem = require('../lib/main');
const DOM = require('./utils/dom');
const expect = chai.expect;

describe('Elem.el', () => {

  it('can handle 2 args with a VNode', done => {

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


  // 1 args
  it('can handle 1 arg with empty element', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('button'));
    let node = DOM.node('button');
    expect(node).to.exist;
    done();
  });

  // 2 args
  it('can handle 2 args with a function', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('p', () => Elem.el('span', 'Lorem ipsum')));
    let node = DOM.node('p');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
    done();
  });
  it('can handle 2 args with an element', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('p', Elem.el('span', 'Lorem ipsum')));
    let node = DOM.node('p');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
    done();
  });
  it('can handle 2 args with an array of elements', done => {
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
  it('can handle 2 args with inner HTML', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('span', { __asHtml: '<h1>...</h1>' }));
    let node = DOM.node('span');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('<h1>...</h1>');
    done();
  });
  it('can handle 2 args with props', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('span', { className: 'solid' }));
    let node = DOM.node('span');
    expect(node).to.exist;
    expect(node.className).to.be.equal('solid');
    done();
  });
  it('can handle 2 args with text', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('span', 'Lorem ipsum'));
    let node = DOM.node('span');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Lorem ipsum');
    done();
  });

  // 3 args
  it('can handle 3 args with function', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('p', { className: 'text' }, () => Elem.el('span', 'Lorem ipsum')));
    let node = DOM.node('p');
    expect(node).to.exist;
    expect(node.className).to.be.equal('text');
    expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
    done();
  });
  it('can handle 3 args with props and text', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('span', { className: 'text' }, 'Lorem ipsum'));
    let node = DOM.node('span');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Lorem ipsum');
    expect(node.className).to.be.equal('text');
    done();
  });
  it('can handle 3 args with props and html', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('span', { className: 'text' }, {__asHtml: '<span>Lorem ipsum</span>' }));
    let node = DOM.node('span');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
    expect(node.className).to.be.equal('text');
    done();
  });
  it('can handle 3 args with props and element', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('span', { className: 'text' }, Elem.el('span', 'Lorem ipsum')));
    let node = DOM.node('span');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('<span>Lorem ipsum</span>');
    expect(node.className).to.be.equal('text');
    done();
  });
  it('can handle 3 args with props and array of elements', done => {
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
  it('can handle 3 args with namespace and props', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('line', Elem.svgNS, { className: 'text' }));
    let node = DOM.node('line');
    expect(node).to.exist;
    expect(node.className).to.be.equal('text');
    done();
  });
  it('can handle 3 args with namespace and text', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('text', Elem.svgNS, 'Lorem ipsum'));
    let node = DOM.node('text');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('Lorem ipsum');
    done();
  });

  // 4 args
  it('can handle 4 args with namespace, props and text', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, 'Lorem ipsum'));
    let node = DOM.node('svg');
    expect(node).to.exist;
    expect(node.className).to.be.equal('text');
    expect(node.innerHTML).to.be.equal('Lorem ipsum');
    done();
  });
  it('can handle 4 args with namespace, props and element', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, Elem.el('text', 'Lorem ipsum')));
    let node = DOM.node('svg');
    expect(node).to.exist;
    expect(node.className).to.be.equal('text');
    expect(node.innerHTML).to.be.equal('<text>Lorem ipsum</text>');
    done();
  });
  it('can handle 4 args with namespace, props and html', done => {
    DOM.cleanup();
    DOM.renderComponent(Elem.el('svg', Elem.svgNS, { className: 'text' }, { __asHtml: '<text>Lorem ipsum</text>' }));
    let node = DOM.node('svg');
    expect(node).to.exist;
    expect(node.className).to.be.equal('text');
    expect(node.innerHTML).to.be.equal('<text>Lorem ipsum</text>');
    done();
  });
  it('can handle 4 args with namespace, props and array of elements', done => {
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
