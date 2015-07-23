const Elem = require('../..');

let tiles = [];

let counter = 0;

let lastRendered = {
  title: '',
  unmount: () => {},
  render: () => {}
};

export function getTiles() {
  return tiles;
}

export function registerTile(title, tile, unmount) {
  tile.container = 'tile-' + counter;
  tile.title = title;
  tile.unmount = unmount || () => {};
  tile.render = (node) => {
    let element = Elem.el('div', { style: { marginTop: '10px', marginRight: '10px' } }, [
      Elem.el('div', { className: 'row' }, [
        Elem.el('div', { className: 'col-md-12', style: { backgroundColor: 'lightgrey'} }, [
          Elem.el('h5', tile.title)
        ])
      ]),
      Elem.el('div', { className: 'row' }, [
        Elem.el('div', { className: 'col-md-12', id: tile.container, style: { borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgrey'} }, '')
      ])
    ]);
    lastRendered.unmount();
    lastRendered = tile;
    Elem.render(element, node);
    tile('#' + tile.container);
  };
  counter += 1;
  tiles.push(tile);
}
