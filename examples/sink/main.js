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
export const Counter = require('./counter');

let selectedContainer = 'foo';
let app = '#app';

let hashes = {};
Showcase.getTiles().forEach(i => {
  let hash = '#' + i.title.replace(/ /g, '-');
  hashes[hash] = i;
});

function showTileHandler(tile, ctx) {
  return () => {
    selectedContainer = tile.container;
    tile.render(app);
    ctx.refresh();
    window.location.hash = tile.title.replace(/ /g, '-');
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
    if (window.location.hash) {
      selectedContainer = hashes[window.location.hash].container;
      Elem.render(Sidebar, '#sidebar');
      hashes[window.location.hash].render(app);
    } else {
      let tile = Showcase.getTiles()[0];
      selectedContainer = tile.container;
      Elem.render(Sidebar, '#sidebar');
      tile.render(app);
      window.location.hash = tile.title.replace(/ /g, '-');
    }
  }
};
