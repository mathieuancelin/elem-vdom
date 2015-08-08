import _ from './lodash';
import * as Utils from './utils';

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

export function collectMeasures(clear = true) {
  if (!perfs) return [];
  let results = [];
  names.forEach(name => {
    let measures = Performances.getEntriesByName(name).map(entry => {
      let { n, duration, entryType, startTime} = entry;
      return { name: n, duration, entryType, startTime };
    });
    results = [...results, ...measures];
  });
  if (clear) Performances.clearMarks();
  if (clear) Performances.clearMeasures();
  names = [ElemMeasure];
  return results;
}

export function collectMeanMeasures(clear = true) {
  if (!perfs) return [];
  let results = [];
  names.filter(i => i !== ElemMeasure).forEach(name => {
    let measures = Performances.getEntriesByName(name).map(entry => entry.duration);
    let totalTime = measures.reduce((a, b) => a + b, 0);
    let meanDuration = totalTime / measures.length;
    let maxDuration = Math.max(...measures);
    let minDuration = Math.min(...measures);
    results = [...results, { name, minDuration, meanDuration, maxDuration, totalTime, called: measures.length, entryType: 'meanDuration' }];
  });
  if (clear) Performances.clearMarks();
  if (clear) Performances.clearMeasures();
  names = [ElemMeasure];
  return results;
}

export function printMeanMeasures(clear = true) {
  if (!perfs) return;
  console.table(collectMeanMeasures(clear));
}

export function printMeasures(clear = true) {
  if (!perfs) return;
  console.table(collectMeasures(clear));
}

export function mark(name, func) {
  markStart(name);
  try {
    func();
  } finally {
    markStop(name);
  }
}
