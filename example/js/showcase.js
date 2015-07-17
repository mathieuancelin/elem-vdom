var Showcase = Showcase || {};
(function(exports) {

  var tiles = [];
  var counter = 0;

  exports.registerTile = function(title, tile) {
    tile.container = 'tile-' + counter;
    tile.title = title;
    counter += 1;
    tiles.push(tile);
  };

  exports.render = function(node) {
    var rows = [];
    tiles.forEach(function(tile) {
      rows.push(
        Elem.el('div', { className: "row" }, [
          Elem.el('div', { className: 'col-md-12', style: { backgroundColor: 'lightgrey'} }, [
            Elem.el('h5', tile.title)
          ])
        ])
      );
      rows.push(
        Elem.el('div', { className: "row" }, [
          Elem.el('div', { className: 'col-md-12', id: tile.container, style: { borderStyle: 'solid', borderWidth: '1px', borderColor: 'lightgrey'} }, '')
        ])
      );
    });
    Elem.render(Elem.el('span', rows), node);
    tiles.forEach(function(tile) {
      tile('#' + tile.container);
    });
  };
})(Showcase);
