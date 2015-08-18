elem-vdom
================

Simple and idiotic lib to build UI components. It's a component library promoting functional composition with the full expressiveness of JavaScript and support for all existing JavaScript libraries. elem-vdom is just a quick and dirty experiment to avoid string templates, string concat and manual mutations when modifying the DOM. `elem-vdom` is fully written in ES2015

[![build status][1]][2]
[![NPM version][3]][4]
[![Dependency status][7]][8]
[![Dev Dependency status][11]][12]
[![Downloads][9]][10]

Install
-------

with npm do :

```
npm install elem-vdom --save
```

Examples
--------

If you want to run examples, just clone the project then :

```
git clone https://github.com/mathieuancelin/elem-vdom.git elem-vdom
cd elem-vdom
npm install
npm start
open http://localhost:8080/examples

```

API
----------

* `Elem.el(name, attributes, children)` : Create a representation of an HTML element. Children can be a string/number/boolean, an `Elem.el`, an array of `Elem.el` or a `__asHtml` object.
* `Elem.svg(name, attributes, children)` : Create a representation of a simple SVG element
* `Elem.render(elem, container)` : render an element to a container in the DOM
* `Elem.renderToString(elem)` : render an element as an HTML string
* `Elem.renderToJson(elem)` : render an element as JSON object
* `Elem.findDOMNode(ref)` : return an actual DOM node based on an element `ref`
* `Elem.stylesheet(obj)` : create an extendable set of CSS inline styles
* `Elem.nbsp(times)` : creates a `<span>` containing one or more `&nbsp;`
* `Elem.text(value)` : creates a `<span>value</span>`
* `Elem.predicate(predicate, elem)` : return element if predicate is true or undefined if false. Predicate can be a function

A few other APIs are also available but none are mandatory to use :

* `Elem.Perf` : performance measurement tools (used in the examples to craft the Perf monitor)
* `Elem.Store` : tools to create flux like store (heavily inspired by Redux)
* `Elem.Devtools` : tools for DX

Dependencies
-------------

elem-vdom depends on `virtual-dom`, `babel-runtime` and `error-stack-parser` but these dependencies are bundled in the distribution package.

How can I use elem-vdom ?
----------------------------

First imports `Elem.min.js` in your page. Then you will be able to build your first node

```javascript
const MyAwesomeNode = Elem.el('h1', 'Hello World!');
Elem.render(MyAwesomeNode, '#container');
```

Of course, you can build much more complicated nodes

```javascript
const node = Elem.el('div', { className: 'col-md-6' }, [
  Elem.el('h3', 'Hello World!'),
  Elem.el('p', { style: { backgroundColor: 'red' } }, "Lorem ipsum ....")
]);
Elem.render(node, '#container');
```

As you construct the node tree with functions and arrays, it is pretty easy to map and filter model objects to render your components easily.

Attributes use camel case shaped keys, so something like `backgroundColor` will be rendered as `background-color`. Also, you can notice that the `class` attribute is named `className`. Also, you can provide an object for `className` value with boolean as values. Every key with a false value will not be rendered.

```javascript
const shouldDisplayDarkBackground = true;
const shouldDisplayBrightBackground = !shouldDisplayDarkBackground;
Elem.el('div', {
  className: {
    withBackground: true,
    darkBackground: shouldDisplayDarkBackground,
    brighBackground: shouldDisplayBrightBackground
  }
}, 'Hello');
```

will produce

```html
<div class="with-background dark-background">Hello</div>
```

As children are just nodes in an array, it is really easy to add or remove elements from your UI. You can also pass undefined elements or functions that can return undefined to not render nodes.

If you want to provide a child as HTML value, just pass an object like `{__asHtml: '&nbsp;;-)'}`.

You can also attach callback to event on elements like

```javascript
function saySomething() {
    alert("Something !");
}

const node = Elem.el('div', { className: 'col-md-6' }, [
  Elem.el('h3', 'Hello World!'),
    Elem.el('button',
      {
        className: ['btn', 'btn-primary'],
        onclick: saySomething
      },
      'Say something'
    ),
  Elem.el('p', { style: { backgroundColor: 'red' } }, "Lorem ipsum ....")
]);
Elem.render(node, '#container');
```

And no, the output _WILL NOT BE_

```html
<div class="col-md-6">
  <h3>Hello World</h3>
  <button class="btn btn-primary" onclick="saySomething">Say Something</button>
  <p style="background-color: red;">Lorem ipsum ....</p>
</div>
```

but the following with an event listener on the root element of the component listening to `click` events on the button.

```html
<div class="col-md-6">
  <h3>Hello World</h3>
  <button class="btn btn-primary">Say Something</button>
  <p style="background-color: red;">Lorem ipsum ....</p>
</div>
```

Supported events are

```
wheel scroll touchcancel touchend touchmove touchstart click doubleclick
drag dragend dragenter dragexit dragleave dragover dragstart drop
change input submit focus blur keydown keypress keyup copy cut paste
```

SVG
-------

You can also simply use SVG with elem-vdom, using the dedicated API :

```javascript
function svg() {
  return Elem.svg('svg', { xmlns: Elem.svgNS, version: "1.1", width: "300", height: "200" }, [
    Elem.svg('title', 'Simple SVG pict'),
    Elem.svg('desc', "A rectangle, a line and a circle"),
    Elem.svg('rect', { width: 100, height: 80, x: 0, y: 70, fill: "green" }),
    Elem.svg('line', { x1: "5", y1: "5", x2: "250", y2: "95", stroke: "red" }),
    Elem.svg('circle', { cx: "90", cy: "80", r: "50", fill: "blue" }),
    Elem.svg('text', { x: "180", y: "60" }, 'A text')
  ]);
}
Elem.render(svg, document.getElementById("svg"));
```

I just want functions everywhere man ...
------------------------------

Pretty easy actually, Elem is made for that :-)

```javascript
function DateField() {
  return Elem.el('div', [
    Elem.el('h1', moment().format(this.props.format))
  ]);
}

function TimeField() {
  return Elem.el('div', [
    Elem.el('h2', moment().format(this.props.format))
  ]);
}

function GraphicalClock() {
  const hoursRotation = 'rotate(' + (30 * moment().hours()) + (moment().minutes() / 2) + ')';
  const minutesRotation = 'rotate(' + (6 * moment().minutes()) + (moment().seconds() / 10) + ')';
  const secondsRotation = 'rotate(' + (6 * moment().seconds()) + ')';
  return Elem.el('div', { className: "clock", style: { width: `${this.props.width}px`, height: `${this.props.height}px` } }, [
    Elem.svg('svg', { xmlns: Elem.svgNS, version: "1.1", viewBox: "0 0 100 100"}, [
      Elem.svg('g', { transform: "translate(50,50)" }, [
        Elem.svg('circle', { className: "clock-face", r: "48", fill: 'white', stroke: '#333' }),
        Elem.svg('line', { className: "hour", y1: "2", y2: "-20", transform: hoursRotation }),
        Elem.svg('line', { className: "minute", y1: "4", y2: "-30", transform: minutesRotation }),
        Elem.svg('g', { transform: secondsRotation }, [
          Elem.svg('line', { className: "second", y1: "10", y2: "-38" }),
          Elem.svg('line', { className: "second-counterweight", y1: "10", y2: "2" })
        ])
      ])
    ])
  ]);
}

function Clock() {
  if (this.context.interval === null) {
    this.context.interval = setInterval(this.redraw, 1000);
  }
  return Elem.el('div', { style: { display: 'flex' } }, [
    Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
      Elem.el(DateField, { format: 'DD/MM/YYYY' }),
      Elem.el(TimeField, { format: 'HH:mm:ss' })
    ]),
    Elem.el(GraphicalClock, { width: 120, height: 120 })
  ]);
}

Elem.render(Clock, container);
```

The whole context of the components are also available on `this`. Props are different for each components instance (each function call), the context is the same for the whole tree. The context contains the following.

```javascript
props: 'props of the current element',
refs: 'refs of DOM nodes inside the current render tree'
state: 'mutable state of the current render tree'
refresh or redraw: 'rerender the current function at the same place'
setState: 'mutate the state with diff and trigger a refresh'
replaceState: 'mutate the whole state and trigger a refresh'
getDOMNode: 'return root DOM node of the current render tree'
context: 'a multipurpose object shared by all the components in the tree'
```

What about state and functions
------------------

Stateless functions as components is the key pattern of `elem-vdom`, but sometimes you need more.
When you render a function using `elem-vdom` with `Elem.render(Function, container)`, the function owns a context including a state.
This state will trigger a rendering of the root function each time it is changed with `setState` and `replaceState`. The state is common to the whole component tree. If you want a component (a function) to get its own state, you just have to assign a key to it.

```javascript
Elem.el(MyButton, { key: "button1" })
```

Then the `this.state` passed to the function `MyButton` will be its own. You just have to be careful to assign the same key to the same component each time you render the tree so `elem-vdom` can track down the right sub state and pass it to the component.

You can also specify an initialState to the sub-state of a component

```javascript
Elem.el(MyButton, { key: "button1", initialState: { done: false } })
```

it work also with the main render Function

```javascript
Elem.render(MyButton, container, { initialState: { done: false } });
```

But, I like jsx syntax, how can I use it ?
------------------------------------------

If you use babel, add jsxPragma=Elem.jsx to options in your .babelrc or babel-loader.

see

https://github.com/mathieuancelin/elem-vdom/blob/master/.babelrc#L5

or

https://github.com/mathieuancelin/elem-vdom/blob/master/webpack.config.js#L53

then you can write stuff like :

```javascript

function Bordered() {
  return (
    <div style={{ borderStyle: 'solid', borderColor: this.props.color || 'black', borderWidth: this.props.width || '1px'}}>
      {this.props.children}
    </div>
  );
}

function Child() {
  return <small>Just a child</small>;
}

function Parent() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Bordered color="blue">
        <Child />
      </Bordered>
    </div>
  );
}

Elem.render(Parent, document.getElementById('app'));
```

But, how can I get an actual DOM node from inside my component ?
---------------------------------------

That's pretty easy, you just have to use refs. Refs give you access to any node inside your component that has been marked with a `ref` parameter.

```javascript

function MyComponent() {

  const clickMe => () {
    console.log(Elem.findDOMNode(this.refs.myInputText).value);
  }

  return Elem.el('div', [
    Elem.el('input', { type: 'text', ref: 'myInputText', value: 'Hello World!' }, []),
    Elem.el('button',
      { type: 'button', className: 'btn btn-primary', onclick: clickme },
      'Click me !!!')
  ]);
}

Elem.render(MyComponent, container);
```

But you can't render that stuff server side (universal apps), right ?
---------------------------------------------

Actually you can and it's pretty easy.

First you can use `Elem.renderToString` on any `Elem.el` node you want.

But you can also do the same on components, let's write a funny clock component;

```javascript
export default function Clock() {

  const seconds = (moment().seconds() % 60) * 6;
  const minutes = (moment().minutes() % 60) * 6;
  const hours = (moment().hours() % 12) * 30;

  return Elem.el('div', { className: 'circle'}, [
    Elem.el('div', { className: 'hour',
        style: { transform: `rotate(${this.state.hours}deg)` }}, ''),
    Elem.el('div', { className: 'minute',
        style: { transform: `rotate(${this.state.minutes}deg)` }}, ''),
    Elem.el('div', { className: 'second',
        style: { transform: `rotate(${this.state.seconds}deg)` }}, ''),
    Elem.el('span', { className: 'centered' },
        `${moment().hours()} h ${moment().minutes()} m ${moment().seconds()} s`)
  ]);
}
```

Now we can instanciate it on the server side, and render it as an HTML string :

```javascript
const express = require('express');
const app = express();
const Clock = require('./clock');

app.get('/clock.html', (req, res) => {
  res.send(Elem.renderToString(Clock));
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Clock app listening at http://${host}:${port}`);
});
```

on the client side, you just have to re-render the component at the same div dans Elem while re-attach itself generated DOM.

What about webcomponents ?
----------------------------

Just use `Elem.registerWebComponent(name-with-a-dash, component)` and use it like an average HTML element

```html
<my-awesomecomponent></my-awesomecomponent>
```

About `Elem.predicate`
----------------------------------

You can use `Elem.predicate` to render element if a predicate is true

```javascript
const somethingTrue = true;

function somethingFalse() {
  return false;
}

Elem.render(Elem.el('ul', [
  Elem.predicate(somethingTrue, Elem.el('li', '1')),
  Elem.el('li', '2'),
  Elem.predicate(somethingFalse, Elem.el('li', '3')),
  Elem.el('li', '4')
]), container);
```

will produce :

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>4</li>
</ul>
```

About `Elem.stylesheet`
-------------------------------

The `Elem.stylesheet` function allows you to create something like

```javascript
var Style = Elem.stylesheet({
  circle: {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    marginLeft: '10px',
    marginTop: '10px',
    background: 'white',
    border: '3px solid #61b2a7',
    position: 'relative',
  },
  circleCentered: {
    position: 'absolute',
    top: '55%',
    left: '0px',
    width: '120px',
    textAlign: 'center',
    fontFamily: "'Montserrat',sans-serif",
    textShadow: '1px 1px 1px rgba(34, 34, 34, 0.5)'
  },
  circleSecond: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-40% -1px 0 0',
    padding: '40% 1px 0',
    background: '#61b2a9',
    '-webkit-transform-origin': '50% 100%',
    '-ms-transform-origin': '50% 100%',
    transformOrigin: '50% 100%'
  },
  circleMinute: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-40% -3px 0',
    padding: '40% 3px 0',
    borderRadius: '3px',
    background: '#61b2a7',
    '-webkit-transform-origin': '50% 100%',
    '-ms-transform-origin': '50% 100%',
    transformOrigin: '50% 100%'
  },
  circleHour: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-25% -4px 0',
    padding: '25% 4px 0',
    borderRadius: '3px',
    background: '#61b2a7',
    '-webkit-transform-origin': '50% 100%',
    '-ms-transform-origin': '50% 100%',
    transformOrigin: '50% 100%'
  },
  circleAfter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '12px',
    height: '12px',
    margin: '-6px 0 0 -6px',
    background: '#fff',
    borderRadius: '6px',
    content: "",
    background: '#61b2a7',
    display: 'block'
  }
});
```

And use parts for inline styles of your component. Every stylesheet and stylesheet element owns an `extend` function to customize your styles on demand. You can also specify an `extend` member in a stylesheet element for declarative customization.

```javascript
let Style = Elem.stylesheet({
  withBackground: {
    backgroundColor: 'yellow',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black'
  }
});
let CustomBackground = Style.withBackground.extend({
  backgroundColor: 'red',
  borderRadius: '5px',
  borderColor: 'blue'
});
let CustomStyle = Elem.stylesheet({
  customBackground: {
    extend: Style.withBackground,
    backgroundColor: 'red',
    borderRadius: '5px',
    borderColor: 'blue'
  }
});
```

You can also use it as an actual stylesheet for your pages, just call `mount()` on a stylesheet object to mount it in the DOM. You can call `unmount()` to remove it.

About Elem.Perf
---------------------
`Elem.Perf` is a performance measurement tool available through

```javascript
const Perf = Elem.Perf;
// or
const Perf = require('elem-vdom/lib/devtools/perfs');
// or
import * as Perf from 'elem-vdom/lib/devtools/perfs';
```

The API is the following :

* `start` : enable performance measurement
* `stop` : disable performance measurement
* `markStart(name)` : mark the start of a measure
* `markStop(name)` : mark the stop of a measure
* `mark(name, function)` : mark the start and stop of a measure around a block of code
* `measures` : return all collected measures
* `collectMeasures(clear)` : return all collected measures and maybe clear the measures store
* `printMeasures` : print collected measures and clear the measures store

You can use the Perf API to build great perf analysis tools like here : https://github.com/mathieuancelin/elem-vdom/blob/master/src/devtools/perfmonitor.js

You can use it with

```javascript
const Monitor = require('elem-vdom/lib/devtools/perfmonitor');
// or
import * as Monitor from 'elem-vdom/lib/devtools/perfmonitor';

function PerfMonitor() {
  return Elem.el(Monitor, {
    initialState: {
      activated: false,
      measures: Elem.Perf.measures(),
      selected: undefined
    }
  });
}

Elem.render(PerfMonitor, container);

```

![The perf monitor](https://github.com/mathieuancelin/elem-vdom/raw/master/perfmonitor.gif)

About Elem.Store
---------------------

Just a bunch of tools to create stores (heavily inspired by Redux) available through

```javascript
const Store = Elem.Store;
// or
const Store = require('elem-vdom/lib/store');
// or
import * as Store from 'elem-vdom/lib/store';
```

The API is the following :

* `createStore(reducer, initialState)` : Create a store from one or more reducers
* `handleActions(actions, initialState)` : same than createStore with helpers to avoid switch case
* `withInitialState(initialState)` : builder for `handleActions`
* `Provider` : Component that will feed the context with the store and some actions
* `Selector` : Component that will be use to wrap sub components to pass them state parts and actions

```javascript

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

function anotherWayToDefineCountersAsAReducer(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTERS:
    return { value1: state.value1 + 1, value2: state.value2 + 2 };
  case DECREMENT_COUNTERS:
    return { value1: state.value1 - 1, value2: state.value2 - 2 };
  default:
    return state;
  }
}

let store = Store.createStore({ counters });

function CounterSelector1(state) {
  return {
    counter: state.counters.value1 // state.counters because we target the counters reducer
  };
}

function CounterSelector2(state) {
  return {
    counter: state.counters.value2 // state.counters because we target the counters reducer
  };
}

function CountLine() {
  // here this.props.counter come from the store, throught the selector
  // here this.prop.perform come from actions on the Store.Selector
  return <p onClick={this.props.perform}>{this.props.name} : {this.props.counter + ''}</p>;
}

function Counter() {
  return (
    <Store.Provider store={store} actions={{ increments, decrements }} render={ () =>
      <div>
        <Store.Selector
          selector={CounterSelector1}
          actions={{ perform: increments }}
          name="count1"
          render={CountLine} />
        <Store.Selector
          selector={CounterSelector2}
          actions={{ perform: decrements }}
          name="count2"
          render={CountLine} />
        <button type="button" onClick={this.context.actions.increments}>+1</button>
        <button type="button" onClick={this.context.actions.decrements}>-1</button>
      </div>
    } />
  );
}

Elem.render(Counter, container);

```

About Elem.Devtools
---------------------

Just a bunch of tools for DX available through

```javascript
const Devtools = Elem.Devtools;
// or
const Devtools = require('elem-vdom/lib/devtools');
// or
import * as Devtools from 'elem-vdom/lib/devtools';
```

The API is the following :

* `Elem.Devtools.Perf`: the perf API as explained in [About Elem.Perf](#about-elemperf)
* `Elem.Devtools.PerfMonitor`: the perf monitor as explained in [About Elem.Perf](#about-elemperf). Also available at `elem-vdom/lib/devtools/perfmonitor`
* `Elem.Devtools.Redbox(error)` : A component that will display a JavaScript Error in a red box. Also available at `elem-vdom/lib/devtools/redbox`
* `Elem.Devtools.ErrorMonitor(function)` : A function to wrap a function that can throw errors. If so, the Redbox is displayed instead of the wrapped function return. Also available at `elem-vdom/lib/devtools/errormonitor`

```javascript
function App() {
  return <h1>Hello {this.props.who}!</h1>;
}

function DebugApp() {
  return Elem.el(Elem.Devtools.ErrorMonitor(App), { who: 'World' });
}

Elem.render(DebugApp, container);
```

![The Redbox](https://github.com/mathieuancelin/elem-vdom/raw/master/redbox.png)

* `Elem.Devtools.Inspector` : An inspector element to browse component tree created by elem, inspect props and state, updating state live, trigger redraw, etc ... Just use it with `Elem.render(Elem.Devtools.Inspector, '#inspector', { __inspectorSilent: true })`. The '__inspectorSilent' is very important at the root of the tree that include the inspector to avoid the inspector to auto refresh itself.

![The Inspector](https://github.com/mathieuancelin/elem-vdom/raw/master/inspector.gif)

* `Elem.Devtools.InspectorAPI` : API to get internal data about the rendered Elem trees. You can use the API to build tools like the Inpector.
  * `start()` : start inspection
  * `stop()` : stop inspection
  * `isEnabled()` : is inspection started
  * `getExposedStateAndProps()` : get the current internal data
  * `cleanup()` : cleanup current internal data
  * `subscribe(listener)` : subscribe notification of changes of the internal data
  * `ephemeralSubscribe(listener)` : subscribe notification of changes of the internal data, but one shot

[1]: https://api.travis-ci.org/mathieuancelin/elem-vdom.svg
[2]: https://api.travis-ci.org/mathieuancelin/elem-vdom
[3]: https://badge.fury.io/js/elem-vdom.svg
[4]: https://badge.fury.io/js/elem-vdom
[7]: https://david-dm.org/mathieuancelin/elem-vdom.svg
[8]: https://david-dm.org/mathieuancelin/elem-vdom
[9]: https://img.shields.io/npm/dm/elem-vdom.svg
[10]: https://www.npmjs.com/package/elem-vdom
[11]: https://img.shields.io/david/dev/mathieuancelin/elem-vdom.svg
[12]: https://david-dm.org/mathieuancelin/elem-vdom#info=devDependencies&view=table
