const Showcase = require('./showcase');
const Elem = require('../../src/main');

Showcase.registerTile('JSX example', container => {

  function SomeSVG() {
    return (
      <svg xmlns={Elem.svgNS} version="1.1" width="300" height="200" style={{ width: '300px', height: '200px' }}>
        <title>Simple SVG pict</title>
        <desc>A rectangle, a line and a circle</desc>
        <rect width="100" height="80" x="0" y="70" fill="green" />
        <line x1="5" y1="5" x2="250" y2="95" stroke="red" />
        <circle cx="90" cy="80" r="50" fill="blue" />
        <text x="180" y="60">A text</text>
      </svg>
    );
  }

  function Child() {
    return <small>Im a child</small>;
  }

  function Parent() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Child />
        <SomeSVG />
      </div>
    );
  }

  Elem.render(Parent, container);
});
