const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const expect = chai.expect;

describe('elem-vdom', () => {

  describe('can render a component that', () => {

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

  it('does not allow HTML injection', done => {

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
    let img = DOM.node('img');
    expect(img).to.not.exist;
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

  describe('and its SVG support', () => {
    it('can render SVG elements', (done) => {
      function SVG() {
        return Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', width: '300', height: '200', style: { height: '300px' } }, [
          Elem.svg('title', {}, 'Simple SVG pict'),
          Elem.svg('desc', 'A rectangle, a line and a circle'),
          Elem.svg('rect', { width: 100, height: 80, x: 0, y: 70, fill: 'green' }),
          Elem.svg('line', { x1: '5', y1: '5', x2: '250', y2: '95', stroke: 'red' }),
          Elem.svg('circle', { cx: '90', cy: '80', r: '50', fill: 'blue' }),
          Elem.svg('text', { x: '180', y: '60' }, 'A text')
        ]);
      }
      DOM.cleanup();
      DOM.renderComponent(SVG);
      let desc = DOM.node('desc');
      let rect = DOM.node('rect');
      let line = DOM.node('line');
      let circle = DOM.node('circle');
      let text = DOM.node('text');

      expect(desc).to.exist;
      expect(rect).to.exist;
      expect(line).to.exist;
      expect(circle).to.exist;
      expect(text).to.exist;

      expect(desc.innerHTML).to.be.equal('A rectangle, a line and a circle');
      expect(text.innerHTML).to.be.equal('A text');
      done();
    });
  });
});
