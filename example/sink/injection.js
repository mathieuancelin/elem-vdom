const Showcase = require('./showcase');
const Elem = require('../..');


Showcase.registerTile('No injectable HTML', function(container) {
  var items = [{name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a\"><img src='javascript:;' onerror=\"alert('alert box should not appear')\">"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}, {name: "a"}, {name: "b"}, {name: "c"}];
  function display() {
      return Elem.el('div', items.map(function(item) { return Elem.el('input', { type: 'text', value: item.name }, []); }));
  }
  // warmup
  //for (var i = 0; i < 400; i++) {
  //  Elem.render(display, container);
  //}
  Elem.Perf.start();
  Elem.Perf.markStart('perfs');
  Elem.render(display, container);
  Elem.Perf.markStop('perfs');
  Elem.Perf.printMeasures();
  //for (var j = 0; j < 4; j++) {
  //  Elem.render(display, container);
  //  Elem.Perf.printMeasures();
  //}
  Elem.Perf.stop();
});
