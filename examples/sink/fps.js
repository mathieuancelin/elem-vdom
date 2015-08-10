const Showcase = require('./showcase');
const Elem = require('../../src/main');

Showcase.registerTile('FPS intensive example', container => {
  const baseSpeed = 10;
  function BlueBall() {
    let { x, y, incrementY, incrementX, speed } = this.state;
    speed = baseSpeed + (Math.random() * 5);
    if (x <= 30) {
      incrementX = 0 + speed;
    } else if (x >= 570) {
      incrementX = 0 - speed;
    }
    if (y <= 30) {
      incrementY = 0 + speed;
    } else if (y >= 570) {
      incrementY = 0 - speed;
    }
    let newState = {
      incrementX,
      incrementY,
      x: x + incrementX,
      y: y + incrementY
    };
    requestAnimationFrame(() => this.setState(newState));
    return Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', width: '600', height: '600', style: { borderStyle: 'solid', borderColor: 'black', height: '600px', width: '600px' } }, [
      Elem.svg('circle', { cx: this.state.x, cy: this.state.y, r: this.state.r, fill: 'blue' }),
    ]);
  }
  Elem.render(BlueBall, container, { initialState: { x: 300, y: 30, r: 30, incrementY: baseSpeed, incrementX: baseSpeed, speed: baseSpeed } });
});
