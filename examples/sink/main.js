import ErrorStackParser from 'error-stack-parser';

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
export const StatefulCounter = require('./stateful/app');

let selectedContainer = 'foo';
let app = '#app';

let hashes = {};
Showcase.getTiles().forEach(i => {
  let hash = '#' + i.title.replace(/ /g, '-');
  hashes[hash] = i;
});

function Redbox(error, title) {
  const frames = ErrorStackParser.parse(error).map(f => {
    const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`;
    return Elem.el('div', { className: 'frame' }, [
      Elem.el('div', f.functionName || 'closure ...'),
      Elem.el('div', { className: 'file' }, [
        Elem.el('a', { href: link }, link)
      ])
    ]);
  });
  return Elem.el('div', { className: 'redbox' }, [
    Elem.el('div', { className: 'message' }, `${error.name}: ${error.message}`),
    Elem.el('div', { className: 'stack' }, frames)
  ]);
}

function render(tile) {
  Elem.unmount(app);
  try {
    tile.render(app);
  } catch (e) {
    Elem.render(Redbox(e), app);
  }
}

function showTileHandler(tile, ctx) {
  return () => {
    window.location.hash = tile.title.replace(/ /g, '-');
    selectedContainer = tile.container;
    render(tile);
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
    if (window.location.hash) {
      selectedContainer = hashes[window.location.hash].container;
      Elem.render(Sidebar, '#sidebar');
      render(hashes[window.location.hash]);
    } else {
      let tile = Showcase.getTiles()[0];
      selectedContainer = tile.container;
      Elem.render(Sidebar, '#sidebar');
      render(tile);
      window.location.hash = tile.title.replace(/ /g, '-');
    }
  }
};
