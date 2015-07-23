const Showcase = require('./showcase');
const Elem = require('../..');

var Style = Elem.stylesheet({
  circle: {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    marginLeft: '10px',
    marginTop: '10px',
    background: 'white',
    border: '3px solid #61b2a7',
    position: 'relative',
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
    content: "",
    background: '#61b2a7',
    display: 'block'
  }
});

Showcase.registerTile('Universal app example with JSON output', function(container) {
  var seconds = (moment().seconds() % 60) * 6;
  var minutes = (moment().minutes() % 60) * 6;
  var hours = (moment().hours() % 12) * 30;
  var clock = Elem.el('div', {}, [
    Elem.el('div', { style: Style.circle }, [
      Elem.el('div', { style: Style.circleHour.extend({ transform: 'rotate(' + hours + 'deg)'    , '-webkit-transform': 'rotate(' + hours + 'deg)'  , '-moz-transform': 'rotate(' + hours + 'deg)'  , '-ms-transform': 'rotate(' + hours + 'deg)'   }) }, ''),
      Elem.el('div', { style: Style.circleMinute.extend({ transform: 'rotate(' + minutes + 'deg)', '-webkit-transform': 'rotate(' + minutes + 'deg)', '-moz-transform': 'rotate(' + minutes + 'deg)', '-ms-transform': 'rotate(' + minutes + 'deg)' }) }, ''),
      Elem.el('div', { style: Style.circleSecond.extend({ transform: 'rotate(' + seconds + 'deg)', '-webkit-transform': 'rotate(' + seconds + 'deg)', '-moz-transform': 'rotate(' + seconds + 'deg)', '-ms-transform': 'rotate(' + seconds + 'deg)' }) }, ''),
      Elem.el('span', { style: Style.circleAfter }, ''),
      Elem.el('span', { style: Style.circleCentered }, moment().hours() + ' h ' + moment().minutes() + ' m ' + moment().seconds() + ' s')
    ])
  ]);
  var str = Elem.renderToJson(clock);
  console.log(JSON.stringify(str, null, 2));
  Elem.render(Elem.el('span', { __asHtml: JSON.stringify(str, null, 2).replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>') }), container);
});
Showcase.registerTile('Universal app example with HTML output', function(container) {
  var seconds = (moment().seconds() % 60) * 6;
  var minutes = (moment().minutes() % 60) * 6;
  var hours = (moment().hours() % 12) * 30;
  var clock = Elem.el('div', {}, [
    Elem.el('div', { style: Style.circle }, [
      Elem.el('div', { style: Style.circleHour.extend({ transform: 'rotate(' + hours + 'deg)'    , '-webkit-transform': 'rotate(' + hours + 'deg)'  , '-moz-transform': 'rotate(' + hours + 'deg)'  , '-ms-transform': 'rotate(' + hours + 'deg)'   }) }, ''),
      Elem.el('div', { style: Style.circleMinute.extend({ transform: 'rotate(' + minutes + 'deg)', '-webkit-transform': 'rotate(' + minutes + 'deg)', '-moz-transform': 'rotate(' + minutes + 'deg)', '-ms-transform': 'rotate(' + minutes + 'deg)' }) }, ''),
      Elem.el('div', { style: Style.circleSecond.extend({ transform: 'rotate(' + seconds + 'deg)', '-webkit-transform': 'rotate(' + seconds + 'deg)', '-moz-transform': 'rotate(' + seconds + 'deg)', '-ms-transform': 'rotate(' + seconds + 'deg)' }) }, ''),
      Elem.el('span', { style: Style.circleAfter }, ''),
      Elem.el('span', { style: Style.circleCentered }, moment().hours() + ' h ' + moment().minutes() + ' m ' + moment().seconds() + ' s')
    ])
  ]);
  var str = Elem.renderToString(clock);
  console.log(str);
  str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  Elem.render(Elem.el('span', { __asHtml: str }), container);
});

Showcase.registerTile('Stylesheet output', function(container) {
  Elem.render(Elem.el('span', { __asHtml: Style.toString() }), container);
});
Showcase.registerTile('Stylesheet mount', function(container) {
  Style.mount(true);
  Elem.render(Elem.el('span', { __asHtml: document.querySelector('style').innerHTML.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;') }), container);
  Style.unmount();
});
