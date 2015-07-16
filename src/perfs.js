const _ = require('lodash');
const Utils = require('./utils');

let globalObject = Utils.memoGobalObject();

let perfs = false;

export function start() {
  perfs = true;
}

export function stop() {
  perfs = false;
}

// perfs measures (http://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
let Performances = {
  mark() {},
  measure() {},
  getEntriesByName() {
    return [];
  },
  getEntriesByType() {
    return [];
  },
  clearMarks() {},
  clearMeasures() {}
};

if (typeof globalObject.performance !== 'undefined' && typeof globalObject.performance.mark !== 'undefined' && typeof globalObject.performance.measure !== 'undefined') {
  Performances = globalObject.performance;
}

const ElemMeasureStart = 'ElemMeasureStart';
const ElemMeasureStop = 'ElemMeasureStop';
const ElemMeasure = 'ElemComponentRenderingMeasure';
let names = [ElemMeasure];

export function markStart(name) {
  if (perfs) {
    if (name) {
      Performances.mark(name + '_start');
    } else {
      Performances.mark(ElemMeasureStart);
    }
  }
};

export function markStop(name) {
  if (perfs) {
    if (name) {
      Performances.mark(name + '_stop');
      Performances.measure(name, name + '_start', name + '_stop');
      if (!_.contains(names, name)) names.push(name);
    } else {
      Performances.mark(ElemMeasureStop);
      Performances.measure(ElemMeasure, ElemMeasureStart, ElemMeasureStop);
    }
  }
};

export function collectMeasures() {
  if (!perfs) return [];
  let results = [];
  _.each(names, function(name) {
    results = results.concat(Performances.getEntriesByName(name));
  });
  Performances.clearMarks();
  Performances.clearMeasures();
  names = [ElemMeasure];
  return results;
};

export function printMeasures() {
  if (!perfs) return;
  console.table(collectMeasures().map(item => {
    return {
      name: item.name,
      duration: item.duration,
      entryType: item.entryType,
      startTime: item.startTime
    };
  }));
};
