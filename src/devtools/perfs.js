import _ from '../lodash';
import * as Utils from '../utils';

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
}

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
}

export function collectMeasures(clearMeasures = true) {
  if (!perfs) return [];
  let results = [];
  names.filter(i => i !== ElemMeasure).forEach(name => {
    let rawMeasures = Performances.getEntriesByName(name);
    let timeline = rawMeasures.map(e => ({ at: e.startTime, value: e.duration }));
    let values = rawMeasures.map(entry => entry.duration);
    let totalDuration = values.reduce((a, b) => a + b, 0);
    let meanDuration = totalDuration / values.length;
    let maxDuration = Math.max(...values);
    let minDuration = Math.min(...values);
    let calls = values.length;
    results = [...results, { name, minDuration, meanDuration, maxDuration, totalDuration, calls, values, timeline }];
  });
  if (clearMeasures) Performances.clearMarks();
  if (clearMeasures) Performances.clearMeasures();
  if (clearMeasures) names = [ElemMeasure];
  return results;
}

export function clear() {
  Performances.clearMarks();
  Performances.clearMeasures();
  names = [ElemMeasure];
}

export function measures() {
  return collectMeasures(false);
}

export function printMeasures(clearMeasures = true) {
  if (!perfs) return;
  console.table(collectMeasures(clearMeasures));
}

export function mark(name, func) {
  markStart(name);
  try {
    func();
  } finally {
    markStop(name);
  }
}
