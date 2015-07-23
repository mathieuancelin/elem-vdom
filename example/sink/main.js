const basic = require('./basic');
const children = require('./children');
const component = require('./component');
const functions = require('./functions');
const injection = require('./injection');
const main = require('./main');
const nested = require('./nested');
const refs = require('./refs');
const svg = require('./svg');
const universal = require('./universal');
const webcomponents = require('./webcomponents');
const Elem = require('../..');
const Showcase = require('./showcase');

function showTileHandler(tile) {
  return () => {
    tile.render('#app');
  };
}

function Sidebar() {
  return Elem.el('ul', { className: 'list-group' },
    Showcase.getTiles().map(tile =>
      Elem.el('li', { className: 'list-group-item', style: { cursor: 'pointer' }, onclick: showTileHandler(tile) }, tile.title)));
}

window.Sink = {
  init() {
    Elem.render(Sidebar, '#sidebar');
    Showcase.getTiles()[0].render('#app');
  }
};
