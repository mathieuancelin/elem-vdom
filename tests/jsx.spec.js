/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const it = require('../src/test/desc').it;
const expect = chai.expect;

describe('elem-vdom JSX support', () => {

  it('can render a simple JSX tree', () => {

    function SimpleComponent() {
      return <h1>Hello World!</h1>;
    }

    DOM.renderComponent(SimpleComponent);
    DOM.select('h1')
      .shouldExist()
      .html()
        .shouldBe('Hello World!');
  });

  it('can render multiples arrays with flattening', () => {

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

    DOM.select('#list')
      .shouldExist()
      .className().shouldBe('theList')
      .id().shouldBe('list')
      .children().count().shouldBe(5)
      .html()
        .shouldBe('<li id="zero">0</li><li id="1">1</li><li id="2">2</li><li id="3">3</li><li id="4">4</li>');

    let lis = DOM.nodes('li');
    expect(lis.length).to.be.equal(5);
  });

  it('can render component with children', () => {

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

    DOM.select('#component')
      .shouldExist()
      .children()
        .count()
          .shouldBe(1)
      .html()
        .shouldBe('<div class="wrapper" id="theWrapper"><span>Element</span><span>Element</span></div>');

    DOM.select('#theWrapper')
      .shouldExist()
      .children()
        .count()
          .shouldBe(2)
      .html()
        .shouldBe('<span>Element</span><span>Element</span>');

  });

});
