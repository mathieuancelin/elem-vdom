const Showcase = require('./showcase');
const Elem = require('../..');

//Elem.Perf.start();
var counter = 0;

var DBMon = Elem.component({
  init: function() {
    this.loadSamples();
  },

  getInitialState: function() {
    return {
      databases: []
    };
  },

  loadSamples: function() {
    //var startdb = Date.now();
    var db = ENV.generateData().toArray();
    //var stopdb = Date.now();
    //var start = Date.now();
    this.setState({ databases: db });
    //var stop = Date.now();
    //console.log((stopdb - startdb) + ' ms. - ' + (stop - start) + ' ms.');
    Monitoring.renderRate.ping();
    //Elem.Perf.printMeasures();
    //counter += 1;
    //if (counter < 10) {
      setTimeout(this.loadSamples, ENV.timeout);
    //}
  },

  render: function() {
    //var startRows = Date.now();
    var rows = this.state.databases.map(function(database) {
      var base = [
        Elem.el('td', { className: "dbname" }, [database.dbname]),
        Elem.el('td', { className: "query-count" }, [
          Elem.el('span', { className: database.lastSample.countClassName }, [database.lastSample.queries.length])
        ])
      ];
      base = base.concat(
        database.lastSample.topFiveQueries.map(function(query, index) {
          return Elem.el('td', { className: "Query " + query.elapsedClassName }, [
            Elem.el('span', {}, [query.formatElapsed]),
            Elem.el('div', { className: "popover left" }, [
              Elem.el('div', { className: "popover-content" }, [query.query]),
              Elem.el('div', { className: "arrow" }, [''])
            ])
          ]);
        })
      );
      return Elem.el('tr', { key: database.dbname }, base);
    });
    //console.log('rows ' + (Date.now() - startRows) + ' ms.');
    //startRows = Date.now();
    var finalElem = Elem.el('div', [
      Elem.el('table', { className: "table table-striped latest-data" }, [
        Elem.el('tbody', rows)
      ])
    ]);
    //console.log('final ' + (Date.now() - startRows) + ' ms.');
    return finalElem;
  }
});
DBMon({}).renderTo('#app');