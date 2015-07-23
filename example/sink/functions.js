const Showcase = require('./showcase');
const Elem = require('../..');

var interval = null;

Showcase.registerTile('Function composition example', function(container) {

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
    var hoursRotation = 'rotate(' + ((moment().hours() % 12) * 30) + ')';
    var minutesRotation = 'rotate(' + ((moment().minutes() % 60) * 6) + ')';
    var secondsRotation = 'rotate(' + ((moment().seconds() % 60) * 6) + ')';
    return Elem.el('div', { className: "clock", style: { width: props.width + 'px', height: props.height + 'px' } }, [
      Elem.svg('svg', { xmlns: Elem.svgNS, version: "1.1", viewBox: "0 0 100 100"}, [
        Elem.svg('g', { transform: "translate(50,50)" }, [
          Elem.svg('circle', { className: "clock-face", r: "48", fill: 'white', stroke: '#333' }),
          Elem.svg('line', { className: "hour", y1: "2", y2: "-20", transform: hoursRotation }),
          Elem.svg('line', { className: "minute", y1: "4", y2: "-30", transform: minutesRotation }),
          Elem.svg('g', { transform: secondsRotation }, [
            Elem.svg('line', { className: "second", y1: "10", y2: "-38" }),
            Elem.svg('line', { className: "second-counterweight", y1: "10", y2: "2" })
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

  Elem.render(Clock, container);
}, function() {
  clearInterval(interval);
});

Showcase.registerTile('Function composition example with "this"', function(container) {

  function DateField() {
    return Elem.el('div', [
      Elem.el('h1', moment().format(this.props.format))
    ]);
  }

  function TimeField() {
    return Elem.el('div', [
      Elem.el('h2', moment().format(this.props.format))
    ]);
  }

  function GraphicalClock() {
    var hoursRotation = 'rotate(' + ((moment().hours() % 12) * 30) + ')';
    var minutesRotation = 'rotate(' + ((moment().minutes() % 60) * 6) + ')';
    var secondsRotation = 'rotate(' + ((moment().seconds() % 60) * 6) + ')';
    return Elem.el('div', { className: "clock", style: { width: this.props.width + 'px', height: this.props.height + 'px' } }, [
      Elem.svg('svg', { xmlns: Elem.svgNS, version: "1.1", viewBox: "0 0 100 100"}, [
        Elem.svg('g', { transform: "translate(50,50)" }, [
          Elem.svg('circle', { className: "clock-face", r: "48", fill: 'white', stroke: '#333' }),
          Elem.svg('line', { className: "hour", y1: "2", y2: "-20", transform: hoursRotation }),
          Elem.svg('line', { className: "minute", y1: "4", y2: "-30", transform: minutesRotation }),
          Elem.svg('g', { transform: secondsRotation }, [
            Elem.svg('line', { className: "second", y1: "10", y2: "-38" }),
            Elem.svg('line', { className: "second-counterweight", y1: "10", y2: "2" })
          ])
        ])
      ])
    ]);
  }

  var oldCtx = undefined;

  function Clock(ctx) {
    console.log(oldCtx == ctx);
    oldCtx = ctx;
    if (interval === null) {
      interval = setInterval(this.refresh, 1000);
    }
    return Elem.el('div', { style: { display: 'flex' } }, [
      Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        Elem.el(DateField, { format: 'DD/MM/YYYY' }),
        Elem.el(TimeField, { format: 'HH:mm:ss' })
      ]),
      Elem.el(GraphicalClock, { width: 120, height: 120 })
    ]);
  }

  Elem.render(Clock, container);
}, function() {
  clearInterval(interval);
});