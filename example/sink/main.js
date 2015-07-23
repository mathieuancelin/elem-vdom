export const basic = require('./basic');
export const children = require('./children');
export const component = require('./component');
export const functions = require('./functions');
export const injection = require('./injection');
export const main = require('./main');
export const refs = require('./refs');
export const svg = require('./svg');
export const universal = require('./universal');
export const webcomponents = require('./webcomponents');
export const perfs = require('./perfs');
export const Elem = require('../..');
export const Showcase = require('./showcase');

let selectedContainer = 'foo';

function showTileHandler(tile, ctx) {
  return () => {
    selectedContainer = tile.container;
    tile.render('#app');
    ctx.refresh();
  };
}

function Sidebar(ctx) {
  return Elem.el('ul', { className: 'list-group', style: { marginTop: '10px' } },
    Showcase.getTiles().map(tile =>
      Elem.el('li', {
        className: 'list-group-item',
        style: {
          cursor: 'pointer',
          color: selectedContainer === tile.container ? 'white' : 'black',
          backgroundColor: selectedContainer === tile.container ? 'grey' : 'white'
        },
        onclick: showTileHandler(tile, ctx)
      },
      tile.title)
    )
  );
}

window.Sink = {
  init() {
    selectedContainer = Showcase.getTiles()[0].container;
    Elem.render(Sidebar, '#sidebar');
    Showcase.getTiles()[0].render('#app');
  }
};
