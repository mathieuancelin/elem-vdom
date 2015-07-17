const _ = require('lodash');

// Avoid some issues in non browser environments
if (typeof globalObject === 'undefined') {
  globalObject = {
    __fake: true
  };
}
// Avoid some issues in older browsers
if (typeof globalObject.console === 'undefined') {
  globalObject.console = {
    log() {},
    error() {},
    table() {},
    debug() {},
    trace() {}
  };
}

function getGlobalObject() {
  // Workers don’t have `window`, only `self`
  if (typeof self !== undefined) {
    return self;
  }
  if (typeof global !== undefined) {
    return global;
  }
  if (typeof window !== undefined) {
    return window;
  }
  // Not all environments allow eval and Function
  // Use only as a last resort:
  return new Function('return this')();
}

const globalObject = getGlobalObject() || {}; //global || window || {};

globalObject.__ElemInternals = globalObject.__ElemInternals || {};
globalObject.__ElemInternals.Utils = globalObject.__ElemInternals.Utils || {};
globalObject.__ElemInternals.Utils.__idCounter = globalObject.__ElemInternals.Utils.__idCounter || 0;

export const memoGobalObject = _.memoize(getGlobalObject);

export function uniqueId(prefix) {
  const id = ++globalObject.__ElemInternals.Utils.__idCounter + '';
  return prefix ? prefix + id : id;
}

export function dasherize(what) {
  return what.replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase().replace(/_/g, '-');
}

export function startsWith(source, start) {
  return source.indexOf(start) === 0;
}

// Works with deep structures
export function keyMirror(obj, p) {
  let prefix = p;
  if (!prefix) {
    prefix = '';
  }
  let ret = {};
  let key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    if (obj[key] instanceof Object) {
      ret[key] = keyMirror(obj[key], key + '.');
    } else {
      ret[key] = prefix + key;
    }
  }
  return ret;
}

export function predicate(predicate, what) {
  if (_.isFunction(predicate)) {
    if (predicate() === true) {
      return what;
    } else {
      return undefined;
    }
  } else {
    if (predicate === true) {
      return what;
    } else {
      return undefined;
    }
  }
};

export function style(obj) {
  let result = {};
  let keys = _.keys(obj);
  _.each(keys, (key) => {
    let clazz = obj[key];
    if (_.isObject(clazz)) {
      result[key] = _.extend({}, {
        extend: function(o) {
          return _.extend({}, clazz, o);
        }
      }, clazz);
    }
  });
  result.extend = (o) => {
    return _.extend({}, obj, o);
  };
  return result;
};
