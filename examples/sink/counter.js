const Showcase = require('./showcase');
const Elem = require('../../src/main');
const Store = require('../../src/store');

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export default function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}

const counter2 = Store.withInitialState(0).handleActions({
  [INCREMENT_COUNTER]: (state) => state + 1,
  [DECREMENT_COUNTER]: (state) => state - 1
});

Showcase.registerTile('Redux like example', container => {
  let store = Store.createStore({ counter });
  console.log('First state', store.getState());
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(increment());
  store.dispatch(increment());
  store.dispatch(decrement());
  console.log('Final state', store.getState());

  function CounterSelector(state) {
    return {
      counter: state.counter
    };
  }

  function Counter(ctx, props) {
    return Elem.el('div', [
      Elem.el('p', 'count : ' + props.counter),
      Elem.el('button', { type: 'button', onclick: props.increment }, '+1'),
      Elem.el('button', { type: 'button', onclick: props.decrement }, '-1')
    ]);
  }

  function CounterWrapper() {
    return Elem.el(Store.Connector, {
      store,
      selector: CounterSelector,
      actions: { increment, decrement },
      render: Counter
    });
  }

  Elem.render(CounterWrapper, container);
});

Showcase.registerTile('Redux like example simpler', container => {
  let store = Store.createStore({ counter: counter2 });
  console.log('First state', store.getState());
  store.subscribe(() => console.log(store.getState()));
  store.dispatch(increment());
  store.dispatch(increment());
  store.dispatch(decrement());
  console.log('Final state', store.getState());

  function CounterSelector(state) {
    return {
      counter: state.counter
    };
  }

  function Counter(ctx, props) {
    return Elem.el('div', [
      Elem.el('p', 'count : ' + props.counter),
      Elem.el('button', { type: 'button', onclick: props.increment }, '+1'),
      Elem.el('button', { type: 'button', onclick: props.decrement }, '-1')
    ]);
  }

  function CounterWrapper() {
    return Elem.el(Store.Connector, {
      store,
      selector: CounterSelector,
      actions: { increment, decrement },
      render: Counter
    });
  }

  Elem.render(CounterWrapper, container);
});

Showcase.registerTile('Redux like example JSX', container => {
  let store = Store.createStore({ counter: counter2 });

  function CounterSelector(state) {
    return {
      counter: state.counter
    };
  }

  function Counter() {
    return (
      <Store.Connector
        store={store}
        selector={CounterSelector}
        actions={{ increment, decrement }}
        render={ (ctx, props) =>
          <div>
            <p>count : {props.counter + ''}</p>
            <button type="button" onClick={props.increment}>+1</button>
            <button type="button" onClick={props.decrement}>-1</button>
          </div>
        } />
    );
  }

  Elem.render(Counter, container);
});

Showcase.registerTile('Store provider and selector', container => {
  const INCREMENT_COUNTERS = 'INCREMENT_COUNTERS';
  const DECREMENT_COUNTERS = 'DECREMENT_COUNTERS';

  function increments() {
    return {
      type: INCREMENT_COUNTERS
    };
  }

  function decrements() {
    return {
      type: DECREMENT_COUNTERS
    };
  }

  const counters = Store.withInitialState({ value1: 0, value2: 0 }).handleActions({
    [INCREMENT_COUNTERS]: (state) => ({ value1: state.value1 + 1, value2: state.value2 + 2 }),
    [DECREMENT_COUNTERS]: (state) => ({ value1: state.value1 - 1, value2: state.value2 - 2 })
  });


  let store = Store.createStore({ counters });

  function CounterSelector1(state) {
    return {
      counter: state.counters.value1
    };
  }

  function CounterSelector2(state) {
    return {
      counter: state.counters.value2
    };
  }

  function CountLine() {
    return <p onClick={this.props.action}>{this.props.name} : {this.props.counter + ''}</p>;
  }

  function Counter() {
    return (
      <Store.Provider store={store} actions={{ increments, decrements }} render={ () =>
        <div>
          <Store.Selector selector={CounterSelector1} actions={{ action: increments }} name="count1" render={CountLine} />
          <Store.Selector selector={CounterSelector2} actions={{ action: decrements }} name="count2" render={CountLine} />
          <button type="button" onClick={this.context.actions.increments}>+1</button>
          <button type="button" onClick={this.context.actions.decrements}>-1</button>
        </div>
      } />
    );
  }

  Elem.render(Counter, container);
});
