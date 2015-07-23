const Showcase = require('./showcase');
const Elem = require('../..');

Showcase.registerTile('Children example', function(container) {

  function Frame() {
    var children = this.props.children;
    delete this.props.children;
    var style = this.props;
    style.padding = '5px';
    return Elem.el('div', { style: style }, children);
  }

  function Sample() {
    return Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        Elem.el('p', 'not framed'),
        Elem.el(Frame, { borderStyle: 'solid', borderColor: 'black', borderWidth: '1px' }, [
          Elem.el('h1', 'Hello World'),
          Elem.el('p', 'Lorem Ipsum ...')
        ]),
        Elem.el('p', 'not framed too'),
      ]);
  }

  Elem.render(Sample, container);
});
