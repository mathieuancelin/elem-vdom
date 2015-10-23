export const basic = require('./basic');
export const children = require('./children');
export const functions = require('./functions');
export const injection = require('./injection');
export const main = require('./main');
export const refs = require('./refs');
export const svg = require('./svg');
export const universal = require('./universal');
export const webcomponents = require('./webcomponents');
export const perfs = require('./perfs');
export const Elem = require('../../src/main');
export const Showcase = require('./showcase');
export const Counter = require('./counter');
export const FPS = require('./fps');
export const JSX = require('./jsx');
export const ThirdParty = require('./thirdparty');
export const StatefulCounter = require('./stateful/app');

const SinkPerfMonitoring = require('../../src/devtools/perfmonitor');
const Inspector = require('../../src/devtools/inspector');

/* eslint no-extend-native: 0 */
if (!String.prototype.includes) {
  String.prototype.includes = function includes(what) {
    return what.indexOf(what) > -1;
  };
}
if (!String.prototype.repeat) {
  String.prototype.repeat = function repeat(howMuch) {
    let finalStr = '';
    for (let i = 0; i < howMuch; i++) {
      finalStr += this;
    }
    return finalStr;
  };
}

Elem.Devtools.InspectorAPI.start();

let onExampleChange = [];
let selectedContainer = 'foo';
let app = '#app';

let hashes = {};
Showcase.getTiles().forEach(i => {
  let hash = '#' + i.title.replace(/ /g, '-');
  hashes[hash] = i;
});

Elem.setErrorCallback((e) => {
  Elem.unmount(app);
  Elem.render(Elem.Devtools.Redbox(e), app);
});

function render(tile) {
  Elem.unmount(app);
  try {
    Elem.Perf.clear();
    onExampleChange.forEach(e => e());
    tile.render(app);
  } catch (e) {
    console.log(e);
    Elem.render(Elem.Devtools.Redbox(e), app);
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

function SinkSidebar(ctx) {
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

function TheInspector() {
  let borderWidth = 10;
  let width = this.state.width || 900;
  let height = this.state.height || 400;
  const activate = () => this.setState({ show: true });
  const deactivate = () => this.setState({ show: false });
  const resizeHeight = (e) => {
    if ((e.which || e.button) === 1) {
      let diffy = this.state.origin.y - e.clientY;
      this.setState({ height: height + diffy, origin: { x: e.clientX, y: e.clientY } });
    }
  };
  const resizeWidth = (e) => {
    if ((e.which || e.button) === 1) {
      let diffx = this.state.origin.x - e.clientX;
      this.setState({ width: width + diffx, origin: { x: e.clientX, y: e.clientY } });
    }
  };
  const enableResize = (e) => this.setState({ origin: { x: e.clientX, y: e.clientY } });
  if (this.state.show) {
    return Elem.el('div', { style: { display: 'flex', width: (width + borderWidth) + 'px', height: height + 'px', opacity: '0.9', position: 'fixed', right: '0px', bottom: '0px', backgroundColor: '#020', color: '#0f0', overflowY: 'auto' } }, [
      Elem.el('div', { onmousedown: enableResize, onmousemove: resizeWidth, style: { width: borderWidth + 'px', height: (height + borderWidth) + 'px', cursor: 'ew-resize' }}),
      Elem.el('div', { style: { width: (width - borderWidth) + 'px' }}, [
        Elem.el('div', { onmousedown: enableResize, onmousemove: resizeHeight, style: { height: borderWidth + 'px', width: width + 'px', cursor: 'ns-resize' }}),
        Elem.el('div', { key: 'close_inspector_panel', style: { cursor: 'pointer', margin: '3px', float: 'right' }, onClick: deactivate }, { __asHtml: '&#9660;' }),
        Elem.el(Inspector, { filter: ['#test', '#perfs', '#inspector', '#sidebar'] })
      ])
    ]);
  } else {
    return Elem.el('div', { style: { opacity: '0.9', position: 'fixed', right: '100px', bottom: '0px', backgroundColor: '#020', color: '#0f0', padding: '10px', cursor: 'pointer' } }, [
      Elem.el('div', { }, [
        Elem.el('span', { onClick: activate }, 'Inspector '),
        Elem.el('span', { onClick: activate }, { __asHtml: '&#9650;' })
      ])
    ]);
  }
}

window.Sink = {
  init() {
    Elem.render(TheInspector, '#inspector', { __inspectorSilent: true });
    Elem.render(SinkPerfMonitoring, '#perfs', { cleanupHook: onExampleChange });
    if (window.location.hash) {
      selectedContainer = hashes[window.location.hash].container;
      Elem.render(SinkSidebar, '#sidebar');
      Elem.Perf.clear();
      render(hashes[window.location.hash]);
    } else {
      let tile = Showcase.getTiles()[0];
      selectedContainer = tile.container;
      Elem.render(SinkSidebar, '#sidebar');
      Elem.Perf.clear();
      render(tile);
      window.location.hash = tile.title.replace(/ /g, '-');
    }
  }
};
