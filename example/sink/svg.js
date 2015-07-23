const Showcase = require('./showcase');
const Elem = require('../..');

Showcase.registerTile('SVG usage example', container => {
  function svg() {
    return Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', width: '300', height: '200', style: { height: '300px' } }, [
      Elem.svg('title', {}, 'Simple SVG pict'),
      Elem.svg('desc', 'A rectangle, a line and a circle'),
      Elem.svg('rect', { width: 100, height: 80, x: 0, y: 70, fill: 'green' }),
      Elem.svg('line', { x1: '5', y1: '5', x2: '250', y2: '95', stroke: 'red' }),
      Elem.svg('circle', { cx: '90', cy: '80', r: '50', fill: 'blue' }),
      Elem.svg('text', { x: '180', y: '60' }, 'A text')
    ]);
  }
  Elem.render(svg, container);
});
