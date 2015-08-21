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

});
