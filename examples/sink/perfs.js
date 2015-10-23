const Showcase = require('./showcase');
const Elem = require('../../src/main');

let run = true;

Showcase.registerTile('Performance component example', container => {
  run = true;

  function loadSamples(mon) {
    if (!run) return;
    Elem.Perf.markStart('Samples.Perfs.loadSamples');
    Elem.Perf.markStart('Samples.Perfs.generateData');
    let db = window.ENV.generateData().toArray();
    Elem.Perf.markStop('Samples.Perfs.generateData');
    Elem.Perf.markStart('Samples.Perfs.setState');
    mon.setState({ databases: db });
    Elem.Perf.markStop('Samples.Perfs.setState');
    window.Monitoring.renderRate.ping();
    requestAnimationFrame(() => loadSamples(mon));
    Elem.Perf.markStop('Samples.Perfs.loadSamples');
  }

  let DBMon = Elem.createComponent({
    getInitialState() {
      return {
        databases: []
      };
    },
    render() {
      let rows = this.state.databases.map(database => {
        let base = [
          Elem.el('td', {className: 'dbname'}, [database.dbname]),
          Elem.el('td', { className: 'query-count' }, [
            Elem.el('span', { className: database.lastSample.countClassName }, [database.lastSample.queries.length])
          ])
        ];
        base = base.concat(
          database.lastSample.topFiveQueries.map(query => {
            return Elem.el('td', { className: 'Query ' + query.elapsedClassName }, [
              Elem.el('span', {}, [query.formatElapsed]),
              Elem.el('div', { className: 'popover left' }, [
                Elem.el('div', { className: 'popover-content' }, [query.query]),
                Elem.el('div', { className: 'arrow' }, [''])
              ])
            ]);
          })
        );
        return Elem.el('tr', {key: database.dbname}, base);
      });
      let finalElem = Elem.el('div', [
        Elem.el('div', { id: 'theSlider' }, ''),
        Elem.el('table', { className: 'table table-striped latest-data' }, [
          Elem.el('tbody', rows)
        ])
      ]);
      return finalElem;
    }
  });

  let mon = Elem.render(DBMon, container);
  let body = document.querySelector('#theSlider');
  window.ENV.injectSlider(body);

  loadSamples(mon);

}, () => {
  run = false;
});
