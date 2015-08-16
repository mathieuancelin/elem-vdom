const Showcase = require('./showcase');
const Elem = require('../../src/main');
const Inspector = require('../../src/devtools/inspector');

let requestId;

Showcase.registerTile('One bubble', container => {
  const baseSpeed = 1;
  function Bubble() {
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
    requestId = requestAnimationFrame(() => this.setState(newState));
    return Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', width: '600', height: '600', style: { borderStyle: 'solid', borderColor: 'black', height: '600px', width: '600px' } }, [
      Elem.svg('circle', { cx: this.state.x, cy: this.state.y, r: this.state.r, fill: 'blue' }),
    ]);
  }
  Elem.render(Bubble, container, { initialState: { x: 300, y: 30, r: 30, incrementY: baseSpeed, incrementX: baseSpeed, speed: baseSpeed } });
}, () => {
  cancelAnimationFrame(requestId);
  requestId = undefined;
});

Showcase.registerTile('Bubbles ...', container => {

  const baseSpeed = 1;
  const bubblesCount = 4;
  const colors = ['blue', 'red', 'green', 'yellow', 'orange', 'black'];

  function rnd(of) {
    return Math.random() * of + 1;
  }

  function Bubble() {
    let { x, y, r, color } = this.props;
    return Elem.svg('circle', { cx: x, cy: y, r: r, fill: color, key: this.props.key });
  }

  function Bubbles() {
    let { bubbles } = this.state;
    let { number } = this.context;
    if (!bubbles) {
      bubbles = [];
      for (let i = 0; i < bubblesCount; i++) {
        bubbles.push({ x: rnd(600), y: rnd(600), r: 10 + rnd(40), speed: baseSpeed, incrementX: baseSpeed, incrementY: baseSpeed, color: colors[parseInt(rnd(6), 10) - 1] });
      }
    }
    if (number < bubbles.length) {
      for (let i = 0; i < (bubbles.length - number); i++) {
        bubbles.pop();
      }
    } else if (number > bubbles.length) {
      for (let i = 0; i < (number - bubbles.length); i++) {
        bubbles.push({ x: rnd(600), y: rnd(600), r: 10 + rnd(40), speed: baseSpeed, incrementX: baseSpeed, incrementY: baseSpeed, color: colors[parseInt(rnd(6), 10) - 1] });
      }
    }
    for (let i in bubbles) {
      let bubble = bubbles[i];
      bubble.speed = baseSpeed + rnd(5);
      if (bubble.x <= bubble.r) {
        bubble.incrementX = 0 + bubble.speed;
      } else if (bubble.x >= (600 - bubble.r)) {
        bubble.incrementX = 0 - bubble.speed;
      }
      if (bubble.y <= bubble.r) {
        bubble.incrementY = 0 + bubble.speed;
      } else if (bubble.y >= (600 - bubble.r)) {
        bubble.incrementY = 0 - bubble.speed;
      }
      bubble.x = bubble.x + bubble.incrementX;
      bubble.y = bubble.y + bubble.incrementY;
    }
    requestId = requestAnimationFrame(() => this.setState({ bubbles: [...bubbles] }));
    const changeBubbles = (n) => {
      this.context.number = n; // because we dont want to trigger another animation frame here
    };
    return Elem.el('div', [
      Elem.el('input', { type: 'range', min: '4', max: '15', value: this.state.number || '4', onChange: (e) => changeBubbles(e.target.value) }),
      Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', width: '600', height: '600', style: { borderStyle: 'solid', borderColor: 'black', height: '600px', width: '600px' } },
        bubbles.map((bubble, key) => Elem.el(Bubble, {...bubble, key}))
      )
    ]);
  }

  Elem.render(Bubbles, container);
  // TODO : remove that
  Elem.render(Inspector, '#test');

}, () => {
  cancelAnimationFrame(requestId);
  requestId = undefined;
});
