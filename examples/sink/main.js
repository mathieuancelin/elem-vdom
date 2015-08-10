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
export const FPS = require('./fps');
export const StatefulCounter = require('./stateful/app');

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

let onExampleChange = [];
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

function computeColor(name) {
  if (name.indexOf('Elem.function.') === 0) {
    return '#0f0';
  } else if (name.indexOf('Elem.') === 0) {
    return 'red'; // '#e50000'; // #0b0
  } else {
    return '#0f0';
  }
}

function SelectedPerfPanel() {
  const items = 112;
  const selectedLive = this.state.measures.filter(i => i.name === this.props.selected.name)[0];
  const lastThirthy = selectedLive.values.slice(selectedLive.values.length >= items ? selectedLive.values.length - items : 0, selectedLive.values.length);
  const max = Math.max(...lastThirthy);
  const style = { marginBottom: '0px' };
  const sinceLast = selectedLive.calls - this.context.last;
  this.context.last = selectedLive.calls;
  this.context.bucket.push(sinceLast);
  if (this.context.bucket.length > 20) {
    this.context.bucket.shift();
  }
  const rate = (this.context.bucket.reduce((a, b) => a + b, 0) / this.context.bucket.length).toFixed(2);
  return Elem.el('div', { style: { marginLeft: '20px' } }, [
    Elem.el('h4', { style: { color: computeColor(this.props.selected.name) } }, [
      Elem.el('span', { style: { cursor: 'pointer' }, onClick: () => this.setState({ selected: undefined }) }, { __asHtml: '&#9668;&nbsp;&nbsp;' }),
      Elem.el('span', { key: 'measure_name' }, this.props.selected.name),
      Elem.nbsp(2),
      Elem.el('span', { className: 'glyphicon glyphicon-time' }, '')
    ]),
    Elem.el('p', { style }, { __asHtml: `<b>minimum duration</b>: ${selectedLive.minDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>mean duration</b>: ${selectedLive.meanDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>maximum duration</b>: ${selectedLive.maxDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>total duration</b>: ${selectedLive.totalDuration} ms.` }),
    Elem.el('p', { style }, { __asHtml: `<b>number of calls</b>: ${selectedLive.calls}` }),
    Elem.el('p', { style }, { __asHtml: `<b>number of calls / sec</b>: ${rate}` }),
    Elem.el('div', { style: { marginTop: '20px'} }, [
      Elem.el('span', { style: { float: 'left' }}, `Duration timeline`),
      Elem.el('span', { style: { float: 'right', marginRight: '20px' }}, `yAxis from 0 to ${max.toFixed(3)} ms.`)
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
  this.context.last = 0;
  this.context.bucket = [];
  const actualMeasures = this.props.measures
    .filter(n => !n.name.includes('SelectedPerfPanel') && !n.name.includes('SelectionPanel') && !n.name.includes('SinkPerfMonitoring') && !n.name.includes('SinkSidebar'))
    .sort((a, b) => a.name.localeCompare(b.name));
  const selectMeasure = (measure) => {
    this.setState({ selected: measure });
  };
  const selectedElemRender = actualMeasures.filter(i => i.name === 'Elem.render')[0];
  let rateLabel = '0.0 RPS';
  if (selectedElemRender) {
    if (!this.context.bucketElemRender) {
      this.context.bucketElemRender = [];
    }
    if (!this.context.lastElemRender) {
      this.context.lastElemRender = 0;
    }
    const sinceLastElemRender = selectedElemRender.calls - this.context.lastElemRender;
    this.context.lastElemRender = selectedElemRender.calls;
    this.context.bucketElemRender.push(sinceLastElemRender);
    if (this.context.bucketElemRender.length > 10) {
      this.context.bucketElemRender.shift();
    }
    const rate = (this.context.bucketElemRender.reduce((a, b) => a + b, 0) / this.context.bucketElemRender.length).toFixed(1);
    rateLabel = `${rate} RPS`;
  }
  return Elem.el('div', { style: { marginLeft: '20px' } }, [
    Elem.el('h4', [
      Elem.el('span', { key: 'home_title_icon', className: 'glyphicon glyphicon-dashboard' }, ''),
      Elem.nbsp(),
      Elem.el('span', { key: 'home_title' }, 'Elem performances profiling'),
      Elem.el('small', { onClick: () => Elem.Perf.clear(), style: { marginRight: '20px', color: 'red', cursor: 'pointer', float: 'right' } }, [
        Elem.el('span', { className: 'glyphicon glyphicon-trash', style: { marginRight: '10px'} }, ''),
        Elem.el('span', 'clear measures')
      ])
    ]),
    Elem.el('div', { style: { display: 'flex' } }, [
      Elem.el('div', { style: { width: '450px' } }, [
        Elem.el('ul', { style: { listStyleType: 'none', marginLeft: '0px', paddingLeft: '5px', cursor: 'pointer' } },
          actualMeasures.map(m => Elem.el('li', { key: m.name, onClick: () => selectMeasure(m), style: { color: computeColor(m.name) } }, [
            Elem.el('span', { __asHtml: '&#9658;&nbsp;' }),
            Elem.el('span', `${m.name} (${m.meanDuration.toFixed(2)} ms, ${m.calls} times)`)
          ])))
      ]),
      Elem.el('div', { style: { width: '150px', height: '200px' } }, [
        Elem.el('span',
          {
            title: 'current Elem.render per second',
            style: {
              fontSize: '25px',
              fontWeight: 'normal',
              paddingTop: '45%',
              textAlign: 'right',
              cursor: 'pointer'
            }
          },
          rateLabel)
      ])
    ])
  ]);
}

function SinkPerfMonitoring() {
  const refreshPerfPanel = () => {
    this.setState({ measures: Elem.Perf.measures() });
  };
  const activate = () => {
    Elem.Perf.start();
    this.setState({ activated: true, measures: Elem.Perf.measures() });
    clearInterval(this.context.refreshPerfPanelInterval);
    this.context.refreshPerfPanelInterval = setInterval(refreshPerfPanel, 1000);
  };
  const deactivate = () => {
    Elem.Perf.stop();
    Elem.Perf.clear();
    this.setState({ activated: false, selected: undefined });
    clearInterval(this.context.refreshPerfPanelInterval);
    this.context.refreshPerfPanelInterval = undefined;
  };
  if (!this.context.hooked) {
    this.context.hooked = true;
    this.context.bucketElemRender = [];
    this.context.lastElemRender = 0;
    onExampleChange.push(() => {
      this.context.bucketElemRender = [];
      this.context.lastElemRender = 0;
    });
  }
  if (this.state.activated === true) {
    const innerPannel = this.state.selected ?
      Elem.el(SelectedPerfPanel, { selected: this.state.selected }) :
      Elem.el(SelectionPanel, { measures: this.state.measures });
    return Elem.el('div', { style: { width: '600px', height: '300px', opacity: '0.9', position: 'fixed', right: '0px', bottom: '0px', backgroundColor: '#020', color: '#0f0', overflowY: 'auto' } }, [
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
    Elem.render(SinkPerfMonitoring, '#perfs', { initialState: { activated: false, measures: Elem.Perf.measures(), selected: undefined }});
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
