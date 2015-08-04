const Showcase = require('./showcase');
const Elem = require('../../src/main');

Showcase.registerTile('Hello World example', container => {
  let MyAwesomeNode = Elem.el('h1', 'Hello World!');
  Elem.render(MyAwesomeNode, container);
});

Showcase.registerTile('Style usage', container => {
  let node = Elem.el('div', {
    className: 'col-md-6'
  }, [
    Elem.el('h3', 'Hello World!'),
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
