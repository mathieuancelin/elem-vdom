const chai = require('chai');
const Elem = require('../src/main');
const DOM = require('../src/test/dom');
const expect = chai.expect;

describe('elem-vdom components api', () => {

  it('can be used as root component', done => {
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
      getRootContext() {
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

    done();
  });

  it('can be used as leaf component', done => {
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
      getRootContext() {
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

    function test() {
      return <div><Component props2="props2" /></div>;
    }

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

  it('can be used as multiple leaf component', done => {
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
      getRootContext() {
        contextCounter = contextCounter + 1;
        return { ctx: 'ctx' };
      },
      render() {
        return (
          <div>
            <span id={this.props.id + 'props1'}>{this.props.props1}</span>
            <span id={this.props.id + 'props2'}>{this.props.props2}</span>
            <span id={this.props.id + 'state1'}>{this.state.state1}</span>
            <span id={this.props.id + 'contextspan'}>{this.context.ctx}</span>
            <button type="button" onClick={this.redraw}>Click</button>
          </div>
        );
      }
    });

    function test() {
      return <div><Component id="one" props2="props2" /><Component id="two" props2="props3" /></div>;
    }

    DOM.cleanup();
    DOM.renderComponent(test);
    DOM.select('#oneprops1').shouldExist().html().shouldBe('props1');
    DOM.select('#twoprops1').shouldExist().html().shouldBe('props1');
    DOM.select('#oneprops2').shouldExist().html().shouldBe('props2');
    DOM.select('#twoprops2').shouldExist().html().shouldBe('props3');
    DOM.select('#onestate1').shouldExist().html().shouldBe('state1');
    DOM.select('#twostate1').shouldExist().html().shouldBe('state1');
    DOM.select('#onecontextspan').shouldExist().html().shouldBe('ctx');
    DOM.select('#twocontextspan').shouldExist().html().shouldBe('ctx');
    expect(initCounter).to.be.equal(1);
    expect(stateCounter).to.be.equal(1);
    expect(propsCounter).to.be.equal(2);
    expect(contextCounter).to.be.equal(1);

    done();
  });

  it('can be used as leaf components with states', done => {
    let initCounter = 0;
    let propsCounter = 0;
    let stateCounter = 0;

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
      render() {
        return (
          <div>
            <span>{this.props.props1}</span>
            <span>{this.props.props2}</span>
            <span>{this.state.state1}</span>
            <button type="button" onClick={this.redraw}>Click</button>
          </div>
        );
      }
    });

    function test() {
      return <div><Component key="one" props2="props2" /><Component key="two" props2="props2" /></div>;
    }

    DOM.cleanup();
    DOM.renderComponent(test);
    expect(initCounter).to.be.equal(2);
    expect(stateCounter).to.be.equal(2);
    expect(propsCounter).to.be.equal(2);

    done();
  });
});
