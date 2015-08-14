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

  it('can have children', done => {

    function Wrapper() {
      return Elem.el('div', { className: 'wrapper', id: this.props.id }, this.props.children);
    }

    function Element() {
      return Elem.el('span', 'Element');
    }

    function Component() {
      return Elem.el('div', { id: 'component' }, [
        Elem.el(Wrapper, { id: 'theWrapper' }, [
          Elem.el(Element),
          Elem.el(Element)
        ])
      ]);
    }

    DOM.cleanup();
    DOM.renderComponent(Component);
    let component = DOM.node('#component');
    let theWrapper = DOM.node('#theWrapper');
    expect(component).to.exist;
    expect(theWrapper).to.exist;
    expect(component.childNodes.length).to.be.equal(1);
    expect(theWrapper.childNodes.length).to.be.equal(2);
    expect(component.innerHTML).to.be.equal('<div class="wrapper" id="theWrapper"><span>Element</span><span>Element</span></div>');
    expect(theWrapper.innerHTML).to.be.equal('<span>Element</span><span>Element</span>');
    done();

  });

  it('can display an array of element', done => {

    const Component = [
      Elem.el('p', 'element'),
      Elem.el('p', 'element')
    ];

    DOM.cleanup();
    DOM.renderComponent(Component);
    let span = DOM.node('span');
    expect(span).to.exist;
    expect(span.childNodes.length).to.be.equal(2);
    expect(span.innerHTML).to.be.equal('<p>element</p><p>element</p>');
    done();

  });

  it('do not allow HTML injection', done => {

    const items = [
      {name: 'a'},
      {name: "b\'><img src='javascript:;' onerror=\'alert('alert box should not appear')\'>"},
      {name: 'c'}
    ];

    function Inputs() {
      return Elem.el('div', { id: 'inputs' }, items.map((item, idx) => Elem.el('input', { id: `idx-${idx}`, type: 'text', value: item.name }, [])));
    }

    DOM.cleanup();
    DOM.renderComponent(Inputs);
    let inputs = DOM.node('#inputs');
    let input1 = DOM.node('#idx-0');
    let input2 = DOM.node('#idx-1');
    let input3 = DOM.node('#idx-2');
    expect(inputs).to.exist;
    expect(inputs.childNodes.length).to.be.equal(3);
    expect(input1).to.exist;
    expect(input2).to.exist;
    expect(input3).to.exist;
    expect(input1.value).to.be.equal('a');
    expect(input2.value).to.be.equal("b\'><img src='javascript:;' onerror=\'alert('alert box should not appear')\'>");
    expect(input3.value).to.be.equal('c');
    done();

  });
});
