const Showcase = require('./showcase');
const Elem = require('../../src/main');

Showcase.registerTile('Children example', container => {
  function Frame() {
    let children = this.props.children;
    let style = this.props;
    delete style.children;
    style.padding = '5px';
    return Elem.el('div', { style }, children);
  }

  function Sample() {
    return Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
      Elem.el('p', 'not framed'),
      Elem.el(Frame, { borderStyle: 'solid', borderColor: 'black', borderWidth: '1px' }, [
        Elem.el('h1', 'Hello World'),
        Elem.el('p', 'Lorem Ipsum ...')
      ]),
      Elem.el('p', 'not framed too')
    ]);
  }

  Elem.render(Sample, container);
});
