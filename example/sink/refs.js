const Showcase = require('./showcase');
const Elem = require('../..');

Showcase.registerTile('Refs usage example', container => {
  function refTest(context) {
    return Elem.el('div', { style: { display: 'flex', flexDirection: 'column' } }, [
      Elem.el('input', {
        type: 'text',
        ref: 'theText',
        placeholder: 'type your value here',
        onchange: context.refresh,
        onkeypress: context.refresh,
        onkeydown: context.refresh,
        onkeyup: context.refresh
      }),
      Elem.el('span', {
        style: {
          backgroundColor: 'lightgrey',
          width: '100%' }
        },
        (Elem.findDOMNode(context.refs.theText) || { value: ''}).value
      )
    ]);
  }

  Elem.render(refTest, container);
});
