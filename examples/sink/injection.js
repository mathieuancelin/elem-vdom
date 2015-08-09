const Showcase = require('./showcase');
const Elem = require('../../src/main');

Showcase.registerTile('No injectable HTML', container => {
  let items = [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: "a\'><img src='javascript:;' onerror=\'alert('alert box should not appear')\'>"},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'},
    {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'}, {name: 'b'},
    {name: 'c'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'a'},
    {name: 'b'}, {name: 'c'}
  ];

  function display() {
    return Elem.el('div', items.map(item => Elem.el('input', { type: 'text', value: item.name }, [])));
  }

  Elem.render(display, container);
});
