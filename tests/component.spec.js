const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const expect = chai.expect;

describe('elem-vdom components api', () => {

  it('just works', done => {
    let initCounter = 0;
    let propsCounter = 0;
    let stateCounter = 0;
    let contextCounter = 0;
    const Component = Elem.createComponent({
      name: 'MyAwesomeComponent',
      init() {
        initCounter = initCounter + 1;
      },
      getInitialState() {
        stateCounter = stateCounter + 1;
        return { state1: 'state1' };
      },
      getDefaultProps() {
        propsCounter = propsCounter + 1;
        return { props1: 'props1' };
      },
      getParentContext() {
        contextCounter = contextCounter + 1;
        return { ctx: 'ctx' };
      },
      render() {
        return (
          <div>
            <span id="props1">{this.props.props1}</span>
            <span id="props2">{this.props.props2}</span>
            <span id="state1">{this.state.state1}</span>
            <span id="contextspan">{this.context.ctx}</span>
            <button type="button" onClick={this.redraw}>Click</button>
          </div>
        );
      }
    });

    DOM.cleanup();
    DOM.renderComponent(Component, { props2: 'props2' });
    DOM.select('#props1').shouldExist().html().shouldBe('props1');
    DOM.select('#props2').shouldExist().html().shouldBe('props2');
    DOM.select('#state1').shouldExist().html().shouldBe('state1');
    DOM.select('#contextspan').shouldExist().html().shouldBe('ctx');
    expect(initCounter).to.be.equal(1);
    expect(stateCounter).to.be.equal(1);
    expect(propsCounter).to.be.equal(1);
    expect(contextCounter).to.be.equal(1);
    DOM.select('button').click();
    DOM.select('#props1').shouldExist().html().shouldBe('props1');
    DOM.select('#props2').shouldExist().html().shouldBe('props2');
    DOM.select('#state1').shouldExist().html().shouldBe('state1');
    DOM.select('#contextspan').shouldExist().html().shouldBe('ctx');
    expect(initCounter).to.be.equal(1);
    expect(stateCounter).to.be.equal(1);
    expect(propsCounter).to.be.equal(2);
    expect(contextCounter).to.be.equal(1);

    function test() {
      return <div><Component props2="props2" /></div>;
    }

    initCounter = 0;
    propsCounter = 0;
    stateCounter = 0;
    contextCounter = 0;
    DOM.cleanup();
    DOM.renderComponent(test);
    DOM.select('#props1').shouldExist().html().shouldBe('props1');
    DOM.select('#props2').shouldExist().html().shouldBe('props2');
    DOM.select('#state1').shouldExist().html().shouldBe('state1');
    DOM.select('#contextspan').shouldExist().html().shouldBe('ctx');
    expect(initCounter).to.be.equal(1);
    expect(stateCounter).to.be.equal(1);
    expect(propsCounter).to.be.equal(1);
    expect(contextCounter).to.be.equal(1);
    DOM.select('button').click();
    DOM.select('#props1').shouldExist().html().shouldBe('props1');
    DOM.select('#props2').shouldExist().html().shouldBe('props2');
    DOM.select('#state1').shouldExist().html().shouldBe('state1');
    DOM.select('#contextspan').shouldExist().html().shouldBe('ctx');
    expect(initCounter).to.be.equal(1);
    expect(stateCounter).to.be.equal(1);
    expect(propsCounter).to.be.equal(2);
    expect(contextCounter).to.be.equal(1);


    done();
  });
});
