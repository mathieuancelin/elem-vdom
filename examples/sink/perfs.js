const Showcase = require('./showcase');
const Elem = require('../../src/main');
const Component = require('../../src/component');

let run = true;

Showcase.registerTile('Performance example', container => {
  run = true;
  let DBMon = Component({
    init() {
      this.loadSamples();
    },
    getInitialState() {
      return {
        databases: []
      };
    },
    loadSamples() {
      if (!run) return;
      Elem.Perf.markStart('Samples.Perfs.loadSamples');
      Elem.Perf.markStart('Samples.Perfs.generateData');
      let db = window.ENV.generateData().toArray();
      Elem.Perf.markStop('Samples.Perfs.generateData');
      Elem.Perf.markStart('Samples.Perfs.setState');
      this.setState({ databases: db });
      Elem.Perf.markStop('Samples.Perfs.setState');
      window.Monitoring.renderRate.ping();
      requestAnimationFrame(this.loadSamples);
      Elem.Perf.markStop('Samples.Perfs.loadSamples');
      // setTimeout(this.loadSamples, window.ENV.timeout);
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
  DBMon().renderTo(container);
  let body = document.querySelector('#theSlider');
  window.ENV.injectSlider(body);
}, () => {
  run = false;
});


Showcase.registerTile('Performance JSX example', container => {
  run = true;
  let DBMon = Component({
    init() {
      this.loadSamples();
    },
    getInitialState() {
      return {
        databases: []
      };
    },
    loadSamples() {
      if (!run) return;
      Elem.Perf.markStart('Samples.Perfs.loadSamples');
      Elem.Perf.markStart('Samples.Perfs.generateData');
      let db = window.ENV.generateData().toArray();
      Elem.Perf.markStop('Samples.Perfs.generateData');
      Elem.Perf.markStart('Samples.Perfs.setState');
      this.setState({ databases: db });
      Elem.Perf.markStop('Samples.Perfs.setState');
      window.Monitoring.renderRate.ping();
      requestAnimationFrame(this.loadSamples);
      Elem.Perf.markStop('Samples.Perfs.loadSamples');
      // setTimeout(this.loadSamples, window.ENV.timeout);
    },
    render() {
      return (
        <div>
          <div id="theSlider"></div>
          <table className="table table-striped latest-data">
            <tbody>
              {
                this.state.databases.map(database => {
                  return (
                    <tr key={database.dbname}>
                      <td className="dbname">{database.dbname}</td>
                      <td className="query-count">
                        <span className={database.lastSample.countClassName}>{database.lastSample.queries.length}</span>
                      </td>
                      {
                        database.lastSample.topFiveQueries.map(query => {
                          return (
                            <td className={'Query ' + query.elapsedClassName}>
                              <span>{query.formatElapsed}</span>
                              <div className="popover left">
                                <div className="popover-content">{query.query}</div>
                                <div className="arrow"></div>
                              </div>
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
    }
  });
  DBMon().renderTo(container);
  let body = document.querySelector('#theSlider');
  window.ENV.injectSlider(body);
}, () => {
  run = false;
});
