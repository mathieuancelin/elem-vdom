/* eslint no-unused-vars:0 */
const chai = require('chai');
const Elem = require('../src/main');
const Store = Elem.Store;
const DOM = require('./utils/dom');
const expect = chai.expect;

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

describe('elem-vdom Store API', () => {

  it('can handle a state through reducers', done => {

    function counter(state = 0, action) {
      switch (action.type) {
      case INCREMENT_COUNTER:
        return state + 1;
      case DECREMENT_COUNTER:
        return state - 1;
      default:
        return state;
      }
    }

    let called = 0;
    let store = Store.createStore({ counter });
    expect(store.getState().counter).to.be.equal(0);
    store.subscribe(() => called = called + 1);
    expect(called).to.be.equal(0);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(1);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(2);
    expect(called).to.be.equal(2);
    store.dispatch(decrement());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(3);

    done();
  });

  it('can handle a state through simplified reducers', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1,
      [DECREMENT_COUNTER]: (state) => state - 1
    });

    let called = 0;
    let store = Store.createStore({ counter });
    expect(store.getState().counter).to.be.equal(0);
    store.subscribe(() => called = called + 1);
    expect(called).to.be.equal(0);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(1);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(2);
    expect(called).to.be.equal(2);
    store.dispatch(decrement());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(3);

    done();
  });

  it('can provide ephemeral listeners', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1,
      [DECREMENT_COUNTER]: (state) => state - 1
    });

    let called = 0;
    let store = Store.createStore({ counter });
    expect(store.getState().counter).to.be.equal(0);
    store.ephemeralSubscribe(() => called = called + 1);
    expect(called).to.be.equal(0);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(1);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(2);
    expect(called).to.be.equal(1);
    store.dispatch(decrement());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(1);

    done();
  });

  it('allow store customization with plugins', done => {

    let actionTypes = [];

    const plugin = store => next => action => {
      actionTypes.push(action.type);
      let result = next(action);
      return result;
    };

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1,
      [DECREMENT_COUNTER]: (state) => state - 1
    });

    let called = 0;
    let createStore = Store.enrichCreateStoreWith(plugin);
    let store = createStore({ counter });
    expect(store.getState().counter).to.be.equal(0);
    store.ephemeralSubscribe(() => called = called + 1);
    expect(called).to.be.equal(0);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(1);
    expect(actionTypes).to.have.deep.property('[0]', INCREMENT_COUNTER);
    store.dispatch(increment());
    expect(store.getState().counter).to.be.equal(2);
    expect(called).to.be.equal(1);
    expect(actionTypes).to.have.deep.property('[1]', INCREMENT_COUNTER);
    store.dispatch(decrement());
    expect(store.getState().counter).to.be.equal(1);
    expect(called).to.be.equal(1);
    expect(actionTypes).to.have.deep.property('[2]', DECREMENT_COUNTER);

    done();
  });

  it('provides helpers to connect with stores (RAW)', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1
    });

    let store = Store.createStore({ counter });

    function CountLabel() {
      return <p id="label">{this.context.getState().counter + ''}</p>;
    }

    function Clicker() {
      return (
        <Store.Provider store={store} actions={{ increment }} render={ () =>
          <div>
            <Store.Selector render={CountLabel} />
            <button type="button" onClick={this.context.actions.increment}>+1</button>
          </div>
        } />
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);

    let node = DOM.node('#label');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('0');
    store.dispatch(increment());
    expect(DOM.node('#label').innerHTML).to.be.equal('1');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('2');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('3');

    done();
  });

  it('provides helpers to connect with stores (auto selector)', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1
    });

    let store = Store.createStore({ counter });

    function CountLabel() {
      return (
        <div>
          <p id="label">{this.props.counter + ''}</p>
          <button type="button" onClick={this.props.increment}>+1</button>
        </div>
      );
    }

    function Clicker() {
      return (
        <Store.Provider store={store} actions={{ increment }} render={ () =>
          <Store.Selector render={CountLabel} />
        } />
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);

    let node = DOM.node('#label');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('0');
    store.dispatch(increment());
    expect(DOM.node('#label').innerHTML).to.be.equal('1');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('2');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('3');

    done();
  });

  it('provides helpers to connect with stores (actions selector)', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1
    });

    let store = Store.createStore({ counter });

    function CountLabel() {
      return (
        <div>
          <p id="label">{this.props.counter + ''}</p>
          <button type="button" onClick={this.props.increment}>+1</button>
        </div>
      );
    }

    function Clicker() {
      return (
        <Store.Provider store={store} render={ () =>
          <Store.Selector actions={{ increment }} render={CountLabel} />
        } />
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);

    let node = DOM.node('#label');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('0');
    store.dispatch(increment());
    expect(DOM.node('#label').innerHTML).to.be.equal('1');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('2');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('3');

    done();
  });

  it('provides helpers to connect with stores (state selector)', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1
    });

    let store = Store.createStore({ counter });

    function CountLabel() {
      return (
        <div>
          <p id="label">{this.props.value + ''}</p>
          <button type="button" onClick={this.props.increment}>+1</button>
        </div>
      );
    }

    function Clicker() {
      return (
        <Store.Provider store={store} render={ () =>
          <Store.Selector actions={{ increment }} selector={(s) => ({ value: s.counter })} render={CountLabel} />
        } />
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);

    let node = DOM.node('#label');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('0');
    store.dispatch(increment());
    expect(DOM.node('#label').innerHTML).to.be.equal('1');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('2');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('3');

    done();
  });

  it('provides helpers to connect with stores (connect)', done => {

    const counter = Store.withInitialState(0).handleActions({
      [INCREMENT_COUNTER]: (state) => state + 1
    });

    let store = Store.createStore({ counter });

    function CountLabel() {
      return (
        <div>
          <p id="label">{this.props.value + ''}</p>
          <button type="button" onClick={this.props.increment}>+1</button>
        </div>
      );
    }

    const CountLabelWrapper = Store.connect((s) => ({ value: s.counter }), { increment })(CountLabel);

    function Clicker() {
      return (
        <Store.Provider store={store} render={ () =>
          <span>
            <CountLabelWrapper />
          </span>
        } />
      );
    }

    DOM.cleanup();
    DOM.renderComponent(Clicker);

    let node = DOM.node('#label');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.equal('0');
    store.dispatch(increment());
    expect(DOM.node('#label').innerHTML).to.be.equal('1');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('2');
    DOM.click('button');
    expect(DOM.node('#label').innerHTML).to.be.equal('3');

    done();
  });

});
