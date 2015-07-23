const Showcase = require('./showcase');
const Elem = require('../..');

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

  Elem.Perf.start();
  Elem.Perf.markStart('perfs');
  Elem.render(display, container);
  Elem.Perf.markStop('perfs');
  Elem.Perf.printMeasures();
  Elem.Perf.stop();
});
