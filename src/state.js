const _ = require('lodash');

export default function(mod) {

  let theModel = _.extend({}, mod || {});

  let callbacks = [];

  function fireCallbacks() {
    _.each(callbacks, function(callback) {
      callback();
    });
  }

  let api = function() {
    return _.clone(theModel);
  };

  function set(obj, silentOrCallback) {
    let silent = _.isBoolean(silentOrCallback) && silentOrCallback === true;
    if (!_.isUndefined(obj) && _.isObject(obj)) {
      _.map(_.keys(obj), function(k) {
        theModel[k] = obj[k];
      });
      if (!silent) fireCallbacks();
      if (!silent)(silentOrCallback || function() {})();
    }
  }

  return _.extend(api, {
    onChange: function(callback) {
      callbacks.push(callback);
    },
    get: function(key) {
      return theModel[key];
    },
    all: function() {
      return _.clone(theModel);
    },
    forceUpdate: function() {
      fireCallbacks();
    },
    set: set,
    replace: function(obj, silentOrCallback) {
      theModel = {};
      set(obj, silentOrCallback);
    },
    remove: function(key) {
      delete theModel[key];
      fireCallbacks();
    }
  });
};
