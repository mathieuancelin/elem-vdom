const Showcase = require('./showcase');
const Elem = require('../..');

Showcase.registerTile('Hello World example', container => {
  var MyAwesomeNode = Elem.el('h1', 'Hello World!');
  Elem.render(MyAwesomeNode, container);
});

Showcase.registerTile('Style usage', container => {
  var node = Elem.el('div', { className: 'col-md-6' }, [
    Elem.el('h3', 'Hello World!'),
    Elem.el('p', { style: { backgroundColor: 'red' } }, "Lorem ipsum ....")
  ]);
  Elem.render(node, container);
});

Showcase.registerTile('Advanced style usage', container => {
  var shouldDisplayDarkBackground = true;
  var shouldDisplayBrightBackground = !shouldDisplayDarkBackground;
  var node =Elem.el('div', {
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
      alert("Something !");
  }
  var node = Elem.el('div', { className: 'col-md-6' }, [
    Elem.el('h3', 'Hello World!'),
    Elem.el('button', {
        className: ['btn', 'btn-primary'],
        onclick: saySomething
      }, 'Say something'),
    Elem.el('p', { style: { backgroundColor: 'red' } }, "Lorem ipsum ....")
  ]);
  Elem.render(node, container);
});

Showcase.registerTile('Stylesheet usage', container => {
  var Style = Elem.stylesheet({
    withBackground: {
      backgroundColor: 'yellow',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'black'
    }
  });
  var CustomBackground = Style.withBackground.extend({
    backgroundColor: 'red',
    borderRadius: '5px',
    borderColor: 'blue'
  });
  var CustomStyle = Elem.stylesheet({
    customBackground: {
      extend: Style.withBackground,
      backgroundColor: 'red',
      borderRadius: '5px',
      borderColor: 'blue'
    }
  });
  var node = Elem.el('div', { className: 'col-md-6' }, [
    Elem.el('h3', { style: Style.withBackground }, 'Hello World!'),
    Elem.el('p', { style: CustomBackground }, "Lorem ipsum ...."),
    Elem.el('p', { style: CustomStyle.customBackground }, "Lorem ipsum 2 ...."),
  ]);
  Elem.render(node, container);
});

var interval;

Showcase.registerTile('Predicate usage', container => {
  var show = false;
  function saySomething() {
      alert("Something !");
  }
  function node() {
    return Elem.el('div', { className: 'col-md-6' }, [
      Elem.el('h3', 'Hello World!'),
      Elem.predicate(show, Elem.el('button', {
          className: ['btn', 'btn-primary'],
          onclick: saySomething
        }, 'Say something')),
      Elem.el('p', { style: { backgroundColor: 'red' } }, "Lorem ipsum ....")
    ]);
  }
  interval = setInterval(function() {
    show = !show;
    Elem.render(node, container);
  }, 1000);
}, function() {
  clearInterval(interval);
});
