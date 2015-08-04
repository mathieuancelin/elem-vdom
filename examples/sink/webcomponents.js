const Showcase = require('./showcase');
const Elem = require('../../src/main');
const moment = require('moment');

let interval = null;

Showcase.registerTile('Web component example', container => {
  function DateField(ctx, props) {
    return Elem.el('div', [
      Elem.el('h1', moment().format(props.format))
    ]);
  }

  function TimeField(ctx, props) {
    return Elem.el('div', [
      Elem.el('h2', moment().format(props.format))
    ]);
  }

  function GraphicalClock(ctx, props) {
    let hoursRotation = 'rotate(' + ((moment().hours() % 12) * 30) + ')';
    let minutesRotation = 'rotate(' + ((moment().minutes() % 60) * 6) + ')';
    let secondsRotation = 'rotate(' + ((moment().seconds() % 60) * 6) + ')';
    return Elem.el('div', { className: 'clock', style: { marginLeft: '20px', marginTop: '20px', width: props.width + 'px', height: props.height + 'px' } }, [
      Elem.svg('svg', { xmlns: Elem.svgNS, version: '1.1', viewBox: '0 0 100 100'}, [
        Elem.svg('g', { transform: 'translate(50,50)' }, [
          Elem.svg('circle', { className: 'clock-face', r: '48', fill: 'white', stroke: '#333' }),
          Elem.svg('line', { className: 'hour', y1: '2', y2: '-20', transform: hoursRotation, fill: 'white', stroke: '#333' }),
          Elem.svg('line', { className: 'minute', y1: '4', y2: '-30', transform: minutesRotation, fill: 'white', stroke: '#333' }),
          Elem.svg('g', { transform: secondsRotation }, [
            Elem.svg('line', { className: 'second', y1: '10', y2: '-38', fill: 'white', stroke: '#333' }),
            Elem.svg('line', { className: 'second-counterweight', y1: '10', y2: '2', fill: 'white', stroke: 'red' })
          ])
        ])
      ])
    ]);
  }

  function Clock(ctx) {
    if (interval === null) {
      interval = setInterval(ctx.refresh, 1000);
    }
    return Elem.el('div', { style: { display: 'flex' } }, [
      Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        Elem.el(DateField, { format: 'DD/MM/YYYY' }),
        Elem.el(TimeField, { format: 'HH:mm:ss' })
      ]),
      Elem.el(GraphicalClock, { width: 120, height: 120 })
    ]);
  }
  Elem.registerWebComponent('my-clock', Clock);
  Elem.render(Elem.el('my-clock', {}, []), container);
}, () => {
  clearInterval(interval);
});
