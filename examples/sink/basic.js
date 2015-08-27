const Showcase = require('./showcase');
const Elem = require('../../src/main');
import * as TestComponent from './testcomponent';

Showcase.registerTile('Hello World example', container => {
  let MyAwesomeNode = Elem.el('h1', 'Hello World!');
  Elem.render(MyAwesomeNode, container);
});

Showcase.registerTile('Fix #9', container => {
  let MyAwesomeNodes = [
    Elem.el('h1', 'Hello World!'),
    Elem.el('h2', 'Goodbye World!'),
    Elem.el('a', { href: 'http://www.google.fr', target: '_blank' }, 'google'),
  ];
  Elem.render(MyAwesomeNodes, container);
});

Showcase.registerTile('component', container => {
  const Component = Elem.createComponent(TestComponent);
  Elem.render(Component, container, { props2: 'props2' });
});

Showcase.registerTile('Deep example', container => {
  function Child1() {
    return <div>{this.props.children}</div>;
  }
  function Child2() {
    return <ul>{this.props.children}</ul>;
  }
  function Child3() {
    return <li>Hello World</li>;
  }
  function Child4() {
    return <span>Goodbye World</span>;
  }
  function App() {
    return (
      <Child1>
        <Child2>
          <Child3 />
          <Child3 />
          <Child3 />
        </Child2>
        <Child4 />
      </Child1>
    );
  }
  Elem.render(App, container);
});

Showcase.registerTile('Style usage', container => {
  let node = Elem.el('div', {
    className: 'col-md-6'
  }, [
    Elem.el('h3', 'Hello World!'),
    Elem.el('span', Elem.el('b', '...')),
    Elem.el('p', {
      style: {
        backgroundColor: 'red'
      }
    }, 'Lorem ipsum ....')
  ]);
  Elem.render(node, container);
});

Showcase.registerTile('Advanced style usage', container => {
  let shouldDisplayDarkBackground = true;
  let shouldDisplayBrightBackground = !shouldDisplayDarkBackground;
  let node = Elem.el('div', {
    className: {
      withBackground: true,
      darkBackground: shouldDisplayDarkBackground,
      brighBackground: shouldDisplayBrightBackground
    }
  }, 'Hello');
  Elem.render(node, container);
});

Showcase.registerTile('Event callbacks usage', container => {
  function saySomething() {
    alert('Something !');
  }
  let node = Elem.el('div', {
    className: 'col-md-6'
  }, [
    Elem.el('h3', 'Hello World!'),
    Elem.el('button', {
      className: ['btn', 'btn-primary'],
      onclick: saySomething
    }, 'Say something'),
    Elem.el('p', {
      style: {
        backgroundColor: 'red'
      }
    }, 'Lorem ipsum ....')
  ]);
  Elem.render(node, container);
});

Showcase.registerTile('Stylesheet usage', container => {
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
  let node = Elem.el('div', {
    className: 'col-md-6'
  }, [
    Elem.el('h3', {
      style: Style.withBackground
    }, 'Hello World!'),
    Elem.el('p', {
      style: CustomBackground
    }, 'Lorem ipsum ....'),
    Elem.el('p', {
      style: CustomStyle.customBackground
    }, 'Lorem ipsum 2 ....')
  ]);
  Elem.render(node, container);
});

let interval;

Showcase.registerTile('Predicate usage', container => {
  let show = false;

  function saySomething() {
    alert('Something !');
  }

  function node() {
    return Elem.el('div', {
      className: 'col-md-6'
    }, [
      Elem.el('h3', 'Hello World!'),
      Elem.predicate(show, Elem.el('button', {
        className: ['btn', 'btn-primary'],
        onclick: saySomething
      }, 'Say something')),
      Elem.el('p', {
        style: {
          backgroundColor: 'red'
        }
      }, 'Lorem ipsum ....')
    ]);
  }
  Elem.render(node, container);
  interval = setInterval(() => {
    show = !show;
    Elem.render(node, container);
  }, 1000);
}, () => {
  clearInterval(interval);
});

Showcase.registerTile('Repeat and text example', container => {
  let MyAwesomeNode = Elem.el('div', [
    Elem.text('Hello World!'),
    Elem.nbsp(2),
    Elem.text('2'),
    Elem.nbsp(5),
    Elem.text('5')
  ]);
  Elem.render(MyAwesomeNode, container);
});
