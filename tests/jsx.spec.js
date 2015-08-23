/* eslint no-unused-vars:0 */
const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const Tests = require('../src/test/desc');
const expect = chai.expect;

describe('elem-vdom JSX support', () => {

  Tests.it('can render a simple JSX tree', () => {

    function SimpleComponent() {
      return <h1>Hello World!</h1>;
    }

    DOM.renderComponent(SimpleComponent);
    let node = DOM.node('h1');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.a('string');
    expect(node.innerHTML).to.be.equal('Hello World!');
  });

  Tests.it('can render multiples arrays with flattening', () => {

    function Index() {
      return (
        <ul className="theList" id="list">
          <li id="zero">0</li>
          {
            [1, 2, 3].map(index =>
              <li id={index}>{index}</li>
            )
          }
          <li id="4">4</li>
        </ul>
      );
    }

    DOM.renderComponent(Index);
    let node = DOM.node('#list');
    let lis = DOM.nodes('li');
    expect(node.className).to.be.equal('theList');
    expect(node.id).to.be.equal('list');
    expect(node).to.exist;
    expect(node.childNodes.length).to.be.equal(5);
    expect(lis.length).to.be.equal(5);
    expect(node.innerHTML).to.be.equal('<li id="zero">0</li><li id="1">1</li><li id="2">2</li><li id="3">3</li><li id="4">4</li>');
  });

  Tests.it('can render component with children', () => {

    function Wrapper() {
      return <div className="wrapper" id={this.props.id}>{this.props.children}</div>;
    }

    function Element() {
      return <span>Element</span>;
    }

    function Component() {
      return (
        <div id="component">
          <Wrapper id="theWrapper">
            <Element />
            <Element />
          </Wrapper>
        </div>
      );
    }

    DOM.renderComponent(Component);
    let component = DOM.node('#component');
    let theWrapper = DOM.node('#theWrapper');
    expect(component).to.exist;
    expect(theWrapper).to.exist;
    expect(component.childNodes.length).to.be.equal(1);
    expect(theWrapper.childNodes.length).to.be.equal(2);
    expect(component.innerHTML).to.be.equal('<div class="wrapper" id="theWrapper"><span>Element</span><span>Element</span></div>');
    expect(theWrapper.innerHTML).to.be.equal('<span>Element</span><span>Element</span>');
  });

});
