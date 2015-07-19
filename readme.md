elem-vdom
================

Simple and idiotic lib to build UI components. It's a component library promoting functional composition with the full expressiveness of JavaScript and support for all existing JavaScript libraries. elem-vdom is just a quick and dirty experiment to avoid string templates, string concat and manual mutations when modifying the DOM.

Install
-------

with npm do :

```
npm install elem-vdom --save
```

API
----------

* `Elem.el(name, attributes, children)` : Create a representation of an HTML element. Children can be a string/number/boolean, an `Elem.el`, an array of `Elem.el` or a `__asHtml` object.
* `Elem.svg(name, attributes, children)` : Create a representation of a simple SVG element
* `Elem.findDOMNode(ref)` : return an actual DOM node based on an element `ref`
* `Elem.nbsp(times)` : creates a `<span>` containing one or more `&nbsp;`
* `Elem.text(value)` : creates a `<span>value</span>`
* `Elem.render(elem, container)` : render an element to a container in the DOM
* `Elem.renderToString(elem)` : render an element as an HTML string
* `Elem.renderToJson(elem)` : render an element as JSON object
* `Elem.component(options)` : Return a factory function for simple component model. See the component section for options
* `Elem.predicate(predicate, elem)` : return element if predicate is true or undefined if false. Predicate can be a function
* `Elem.stylesheet(obj)` : create an extendable set of CSS inline styles
* `Elem.Perf` : performance measurement tools
  * `Elem.Perf.start` : enable performance measures
  * `Elem.Perf.stop` : disable performance measures
  * `Elem.Perf.markStart(name)` : mark the start of a measure
  * `Elem.Perf.markStop(name)` : mark the stop of a measure
  * `Elem.Perf.mark(name, block)` : mark the start and stop of a measure around a block of code
  * `Elem.Perf.collectMeasures` : return all collected measures and clear the measures store
  * `Elem.Perf.printMeasures` : print collected measures and clear the measures store

Dependencies
-------------

elem-vdom depends on `virtual-dom` and `lodash`

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

As you construct the node tree with functions and arrays, it is pretty easy to map and filter model objects to render your components easily (see the Todo List example above).

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
let interval = null;

function DateField(ctx, props) {
  return Elem.el('div', [
    Elem.el('h1', moment().format(props.format))
  ]);
}

function TimeField(ctx, props) {
  return Elem.el('div', [
    Elem.el('h2', moment().format(props.format))
  ]);
}

function GraphicalClock(ctx, props) {
  const hoursRotation = 'rotate(' + (30 * moment().hours()) + (moment().minutes() / 2) + ')';
  const minutesRotation = 'rotate(' + (6 * moment().minutes()) + (moment().seconds() / 10) + ')';
  const secondsRotation = 'rotate(' + (6 * moment().seconds()) + ')';
  return Elem.el('div', { className: "clock", style: { width: `${props.width}px`, height: `${props.height}px` } }, [
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

function Clock(ctx) {
  if (interval === null) {
    interval = setInterval(ctx.refresh, 1000);
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

Context (`ctx`) and `props` of the components are also available on `this`. Props are different for each components instance (each function call), the context is the same for the whole tree. The context contains the following.

```javascript
refs: 'refs of DOM nodes inside the current render tree'
state: 'mutable state of the current render tree'
refresh: 'rerender the current function at the same place'
setState: 'mutate the state with diff and trigger a refresh'
replaceState: 'mutate the whole state and trigger a refresh'
getDOMNode: 'return root DOM node of the current render tree'
```

But can I also create reusable components ?
-----------------------------------

Of course you can. You just need to to something like

```javascript
const Timer = Elem.component({
  init() {
    this.setState({time: 0});
    setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
  },
  render() {
    return Elem.el('span', `Elapsed : ${this.state.time}`));
  }
});
Timer().renderTo('#timer'); // render inside #timer div
```

when creating a component, you can define

```javascript
{
  init: 'init function that receive the state and props as parameters'
  initialState: 'function that returns the initial state of the component. If undefined, an empty one will be created'
  defaultProps: 'function that returns the initial properties for the component, can be passed at instanciation if factory mode'
  render: 'function that will return an Elem node'
}
```

You can access a lot of pretty interesting stuff inside `Elem.component` like :

```javascript
this.state: 'the state of the component'
this.props: 'props of the component'
this.setState(diff): 'mutate the state with a diff and trigger a refresh'
this.replaceState(newState): 'change the state and trigger a refresh'
this.getDOMNode(): 'return root DOM node of the component'
```

Don't worry about `this`, every function in `Elem.component` is bound to the component object.

```javascript

const Hello = Elem.component({
  render() {
    return Elem.el('div', [
      Elem.el('h3', "Hello " + this.props.name + "!")
    ]);
  }
});

Hello({ name: "World" }).renderTo('#hello'); // pass name: '...' as this.props
Hello({ name: "World" }).renderToString();

```

You can also use a component into a tree of elements by using a component factory like :

```javascript

const InnerComponent = Elem.component({
  render() {
    return Elem.el('div', [
      Elem.el('h3', "Hello " + this.props.name + "!")
    ]);
  }
});

const CompositeComponent = Elem.component({
  render() {
    return Elem.el('div', [
      Elem.el('h3', 'Inner component demo'),
      Elem.el(InnerComponent, { name: 'World'})
    ]);
  }
});

CompositeComponent().renderTo(container);

```

The `component(props)` function returns a function (if you don't provide a container) that you can call to create component that will be rendered in the element tree. The main advantage of using `component` as factory is that when you change the state of the inner component, only that component will be re-rendered instead of the whole root component and its children.

But, how can I get an actual DOM node from inside my component ?
---------------------------------------

That's pretty easy, you just have to use refs. Refs give you access to any node inside your component that has been marked with a `ref` parameter.

```javascript

function MyComponent() {

  function clickMe() {
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
export default Elem.component({
  init() {
    this.update();
    setInterval(update, 1000);
  },
  update() {
    this.setState({
      seconds: (moment().seconds() % 60) * 6,
      minutes: (moment().minutes() % 60) * 6,
      hours: (moment().hours() % 12) * 30,
    });
  },
  render() {
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
});
```

Now we can instanciate it on the server side, and render it as an HTML string :

```javascript
const express = require('express');
const app = express();
const Clock = require('./clock');

app.get('/clock.html', (req, res) => {
  const clock = Clock(); // instanciate a component
  res.send(clock.renderToString());
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

What is this `stylesheet` function ?
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

You can also use it as an actual stylesheet for your pages, just call `mount()` on a stylesheet object to mount it in the DOM. You can call `unmount()` to remove it.
