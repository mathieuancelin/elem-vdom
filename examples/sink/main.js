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
export const Elem = require('../../src/main');
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

function render(tile) {
  Elem.unmount(app);
  try {
    Elem.Perf.clear();
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

let last = 0;
let bucket = [];

function SelectedPerfPanel() {
  const items = 112;
  const selectedLive = this.state.measures.filter(i => i.name === this.props.selected.name)[0];
  const lastThirthy = selectedLive.values.slice(selectedLive.values.length >= items ? selectedLive.values.length - items : 0, selectedLive.values.length);
  const max = Math.max(...lastThirthy);
  const style = { marginBottom: '0px' };
  const sinceLast = selectedLive.calls - last;
  last = selectedLive.calls;
  bucket.push(sinceLast);
  if (bucket.length > 20) {
    bucket.shift();
  }
  const rate = (bucket.reduce((a, b) => a + b, 0) / bucket.length).toFixed(2);
  return Elem.el('div', { style: { marginLeft: '20px' } }, [
    Elem.el('h4', [
      Elem.el('span', { style: { cursor: 'pointer' }, onClick: () => this.setState({ selected: undefined }) }, { __asHtml: '&#9668;&nbsp;&nbsp;' }),
      Elem.el('span', this.props.selected.name)
    ]),
    Elem.el('p', { style }, { __asHtml: `<b>minimum duration</b>: ${selectedLive.minDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>mean duration</b>: ${selectedLive.meanDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>maximum duration</b>: ${selectedLive.maxDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>total duration</b>: ${selectedLive.totalDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>number of calls</b>: ${selectedLive.calls}` }),
    Elem.el('p', { style }, { __asHtml: `<b>number of calls / sec</b>: ${rate}` }),
    Elem.el('div', { style: { marginTop: '20px'} }, [
      Elem.el('span', { style: { float: 'right', marginRight: '20px' }}, `max: ${max.toFixed(3)} ms.`)
    ]),
    Elem.el('div', { style: {
        width: '560px',
        height: '51px',
        display: 'flex',
        flexDirection: 'row-reverse',
        border: '1px solid #0f0'
      } },
      lastThirthy.map((value, idx) => {
        let height = ((value * 46) / max) + 2;
        let margin = 50 - height;
        return Elem.el('div', { key: `${idx}`, title: `${value} ms`, style: { cursor: 'pointer', bottom: '0px', backgroundColor: '#0f0', width: '5px', height: `${height}px`, marginTop: `${margin}px` }}, '');
      })
    )
  ]);
}

function SelectionPanel() {
  last = 0;
  bucket = [];
  const actualMeasures = this.props.measures
    .filter(n => !n.name.includes('SelectedPerfPanel') && !n.name.includes('SelectionPanel'));
  const selectMeasure = (measure) => {
    this.setState({ selected: measure });
  };
  return Elem.el('div', { style: { marginLeft: '20px' } }, [
    Elem.el('h4', 'Elem performances profiling'),
    Elem.el('div', {}, [
      Elem.el('ul', { style: { overflowY: 'auto', height: '100%', position: 'absolute', listStyleType: 'none', marginLeft: '0px', paddingLeft: '5px', cursor: 'pointer' } },
                actualMeasures.map(m => Elem.el('li', { key: m.name, onClick: () => selectMeasure(m) }, [
                  Elem.el('span', { __asHtml: '&#9658;&nbsp;' }),
                  Elem.el('span', `${m.name} (${m.meanDuration.toFixed(2)} ms, ${m.calls} times)`)
                ])))
    ])
  ]);
}

let refreshPerfPanelInterval;

function PerfMonitoring() {
  const refreshPerfPanel = () => {
    this.setState({ measures: Elem.Perf.measures() });
  };
  const activate = () => {
    Elem.Perf.start();
    this.setState({ activated: true, measures: Elem.Perf.measures() });
    clearInterval(refreshPerfPanelInterval);
    refreshPerfPanelInterval = setInterval(refreshPerfPanel, 1000);
  };
  const deactivate = () => {
    Elem.Perf.stop();
    Elem.Perf.clear();
    this.setState({ activated: false, selected: undefined });
    clearInterval(refreshPerfPanelInterval);
    refreshPerfPanelInterval = undefined;
  };
  if (this.state.activated === true) {
    const innerPannel = this.state.selected ?
      Elem.el(SelectedPerfPanel, { selected: this.state.selected }) :
      Elem.el(SelectionPanel, { measures: this.state.measures });
    return Elem.el('div', { style: { width: '600px', height: '260px', opacity: '0.9', position: 'fixed', right: '0px', bottom: '0px', backgroundColor: '#020', color: '#0f0' } }, [
      Elem.el('div', { key: 'close_perf_panel', style: { cursor: 'pointer', margin: '3px', float: 'right' }, onClick: deactivate }, { __asHtml: '&#9660;' }),
      innerPannel
    ]);
  } else {
    return Elem.el('div', { style: { opacity: '0.9', position: 'fixed', right: '0px', bottom: '0px', backgroundColor: '#020', color: '#0f0', padding: '10px', cursor: 'pointer' } }, [
      Elem.el('div', { }, [
        Elem.el('span', { onClick: activate }, 'Profiling '),
        Elem.el('span', { onClick: activate }, { __asHtml: '&#9650;' })
      ])
    ]);
  }
}

window.Sink = {
  init() {
    Elem.render(PerfMonitoring, '#perfs', { initialState: { activated: false, measures: Elem.Perf.measures(), selected: undefined }});
    if (window.location.hash) {
      selectedContainer = hashes[window.location.hash].container;
      Elem.render(Sidebar, '#sidebar');
      Elem.Perf.clear();
      render(hashes[window.location.hash]);
    } else {
      let tile = Showcase.getTiles()[0];
      selectedContainer = tile.container;
      Elem.render(Sidebar, '#sidebar');
      Elem.Perf.clear();
      render(tile);
      window.location.hash = tile.title.replace(/ /g, '-');
    }
  }
};
