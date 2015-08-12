const Showcase = require('./showcase');
const Elem = require('../../src/main');
const Component = require('../../src/component');
const moment = require('moment');

let interval;

let Style = Elem.stylesheet({
  circle: {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    marginLeft: '10px',
    marginTop: '10px',
    background: 'white',
    border: '3px solid #61b2a7',
    position: 'relative'
  },
  circleCentered: {
    position: 'absolute',
    top: '55%',
    left: '0px',
    width: '120px',
    textAlign: 'center',
    fontFamily: "'Montserrat',sans-serif",
    textShadow: '1px 1px 1px rgba(34, 34, 34, 0.5)'
  },
  circleSecond: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-40% -1px 0 0',
    padding: '40% 1px 0',
    background: '#61b2a9',
    '-webkit-transform-origin': '50% 100%',
    '-ms-transform-origin': '50% 100%',
    transformOrigin: '50% 100%'
  },
  circleMinute: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-40% -3px 0',
    padding: '40% 3px 0',
    borderRadius: '3px',
    background: '#61b2a7',
    '-webkit-transform-origin': '50% 100%',
    '-ms-transform-origin': '50% 100%',
    transformOrigin: '50% 100%'
  },
  circleHour: {
    width: '0',
    height: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-25% -4px 0',
    padding: '25% 4px 0',
    borderRadius: '3px',
    background: '#61b2a7',
    '-webkit-transform-origin': '50% 100%',
    '-ms-transform-origin': '50% 100%',
    transformOrigin: '50% 100%'
  },
  circleAfter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '12px',
    height: '12px',
    margin: '-6px 0 0 -6px',
    borderRadius: '6px',
    content: '',
    background: '#61b2a7',
    display: 'block'
  }
});

Showcase.registerTile('Component usage', container => {
  let Clock = Component({
    init() {
      interval = setInterval(this.update, 1000);
    },
    update() {
      this.setState({
        seconds: (moment().seconds() % 60) * 6,
        minutes: (moment().minutes() % 60) * 6,
        hours: (moment().hours() % 12) * 30
      });
    },
    initialState() {
      return {
        seconds: (moment().seconds() % 60) * 6,
        minutes: (moment().minutes() % 60) * 6,
        hours: (moment().hours() % 12) * 30
      };
    },
    render() {
      return Elem.el('div', {}, [
        Elem.el('div', { style: Style.circle }, [
          Elem.el('div', { style: Style.circleHour.extend({ transform: 'rotate(' + this.state.hours + 'deg)', '-webkit-transform': 'rotate(' + this.state.hours + 'deg)', '-moz-transform': 'rotate(' + this.state.hours + 'deg)', '-ms-transform': 'rotate(' + this.state.hours + 'deg)' }) }, ''),
          Elem.el('div', { style: Style.circleMinute.extend({ transform: 'rotate(' + this.state.minutes + 'deg)', '-webkit-transform': 'rotate(' + this.state.minutes + 'deg)', '-moz-transform': 'rotate(' + this.state.minutes + 'deg)', '-ms-transform': 'rotate(' + this.state.minutes + 'deg)' }) }, ''),
          Elem.el('div', { style: Style.circleSecond.extend({ transform: 'rotate(' + this.state.seconds + 'deg)', '-webkit-transform': 'rotate(' + this.state.seconds + 'deg)', '-moz-transform': 'rotate(' + this.state.seconds + 'deg)', '-ms-transform': 'rotate(' + this.state.seconds + 'deg)' }) }, ''),
          Elem.el('span', { style: Style.circleAfter }, ''),
          Elem.el('span', { style: Style.circleCentered }, moment().hours() + ' h ' + moment().minutes() + ' m ' + moment().seconds() + ' s')
        ])
      ]);
    }
  });
  Clock().renderTo(container);
}, () => {
  clearInterval(interval);
});

Showcase.registerTile('Stateful component usage', container => {
  let Counter = Component({
    init() {
      interval = setInterval(this.update, 1000);
    },
    update() {
      this.setState({
        counter: this.state.counter + 1
      });
    },
    initialState() {
      return {
        counter: 0
      };
    },
    render() {
      return Elem.el('div', {}, [
        Elem.el('h1', '' + this.state.counter)
      ]);
    }
  });
  Counter().renderTo(container);
}, () => {
  clearInterval(interval);
});
