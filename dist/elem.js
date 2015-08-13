(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Elem"] = factory();
	else
		root["Elem"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = isWidget

	function isWidget(w) {
	    return w && w.type === "Widget"
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint eqeqeq:0 */

	// import isFunction from 'lodash/lang/isFunction';
	// import isObject from 'lodash/lang/isObject';
	// import isArray from 'lodash/lang/isArray';
	// import isString from 'lodash/lang/isString';
	// import isUndefined from 'lodash/lang/isUndefined';
	// import contains from 'lodash/collection/contains';
	// import escape from 'lodash/string/escape';

	'use strict';

	var _Object$keys = __webpack_require__(20)['default'];

	var _Array$includes = __webpack_require__(18)['default'];

	exports.__esModule = true;
	var escapeMap = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;'
	};
	var source = '(?:' + _Object$keys(escapeMap).join('|') + ')';
	var testRegexp = RegExp(source);
	var replaceRegexp = RegExp(source, 'g');

	function isObject(χ) {
	  return !!χ && (typeof χ == 'object' || typeof χ == 'function');
	}

	function escape() {
	  var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var string = value === null ? '' : '' + value;
	  return testRegexp.test(string) ? string.replace(replaceRegexp, function (match) {
	    return escapeMap[match];
	  }) : string;
	}

	exports['default'] = {
	  escape: escape,
	  isObject: isObject,
	  isArray: Array.isArray,
	  isUndefined: function isUndefined(χ) {
	    return χ === undefined;
	  },
	  contains: _Array$includes,
	  isFunction: function isFunction(χ) {
	    return isObject(χ) && Object.prototype.toString.call(χ) == '[object Function]';
	  },
	  isString: function isString(χ) {
	    return typeof χ == 'string' || !!χ && typeof χ == 'object' && Object.prototype.toString.call(χ) == '[object String]';
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _Object$assign = __webpack_require__(19)['default'];

	var _Object$keys = __webpack_require__(20)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	exports.__esModule = true;
	exports.memoize = memoize;
	exports.uniqueId = uniqueId;
	exports.dasherize = dasherize;
	exports.startsWith = startsWith;
	exports.keyMirror = keyMirror;
	exports.predicate = predicate;
	exports.stylesheet = stylesheet;
	exports.NotSupported = NotSupported;
	exports.uuid = uuid;
	exports.invariant = invariant;
	exports.invariantLog = invariantLog;

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	function getGlobalObject() {
	  // Workers don’t have `window`, only `self`
	  if (typeof self !== 'undefined') {
	    return self;
	  }
	  if (typeof global !== 'undefined') {
	    return global;
	  }
	  if (typeof window !== 'undefined') {
	    return window;
	  }
	  // Not all environments allow eval and Function
	  // Use only as a last resort:
	  return new Function('return this')();
	}

	var globalObject = getGlobalObject() || {}; // global || window || {};

	// Avoid some issues in non browser environments
	if (typeof globalObject === 'undefined') {
	  globalObject = {
	    __fake: true
	  };
	}
	// Avoid some issues in older browsers
	if (typeof globalObject.console === 'undefined') {
	  globalObject.console = {
	    log: function log() {},
	    error: function error() {},
	    table: function table() {},
	    debug: function debug() {},
	    trace: function trace() {}
	  };
	}

	globalObject.__ElemInternals = globalObject.__ElemInternals || {};
	globalObject.__ElemInternals.Utils = globalObject.__ElemInternals.Utils || {};
	globalObject.__ElemInternals.Utils.__idCounter = globalObject.__ElemInternals.Utils.__idCounter || 0;

	function memoize(func) {
	  var cache = undefined;
	  return function memoizer() {
	    if (!cache) {
	      cache = func();
	    }
	    return cache;
	  };
	}

	var memoGobalObject = memoize(getGlobalObject);

	exports.memoGobalObject = memoGobalObject;

	function uniqueId(prefix) {
	  var id = ++globalObject.__ElemInternals.Utils.__idCounter + '';
	  return prefix ? prefix + id : id;
	}

	function dasherize(what) {
	  return what.replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase().replace(/_/g, '-');
	}

	function startsWith(source, start) {
	  return source.indexOf(start) === 0;
	}

	// Works with deep structures

	function keyMirror(obj, p) {
	  var prefix = p;
	  if (!prefix) {
	    prefix = '';
	  }
	  var ret = {};
	  var key = undefined;
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

	function predicate(p, what) {
	  if (_lodash2['default'].isFunction(p)) {
	    if (p() === true) {
	      return what;
	    } else {
	      return undefined;
	    }
	  } else {
	    if (p === true) {
	      return what;
	    } else {
	      return undefined;
	    }
	  }
	}

	function stylesheet(obj, type, media) {
	  var stylesheetElement = undefined;
	  var mounted = false;
	  var result = {};
	  var sheet = obj;
	  while (sheet.extend) {
	    if (sheet.extend) {
	      var value = sheet.extend;
	      delete sheet.extend;
	      sheet = _Object$assign({}, value, sheet);
	    }
	  }
	  var keys = _Object$keys(sheet);
	  keys.forEach(function (key) {
	    var clazz = sheet[key];
	    if (_lodash2['default'].isObject(clazz)) {
	      // Handle 'class' that extends other 'classes'
	      while (clazz.extend) {
	        if (clazz.extend) {
	          var value = clazz.extend;
	          delete clazz.extend;
	          clazz = _Object$assign({}, value, clazz);
	        }
	      }
	      // Add an extend function to a 'class'
	      result[key] = _Object$assign({}, {
	        extend: function extend(o) {
	          return _Object$assign({}, clazz, o);
	        }
	      }, clazz);
	    }
	  });
	  // Add an extend function to the sheet
	  result.extend = function (o) {
	    return _Object$assign({}, sheet, o);
	  };
	  result.toString = function (asClasses) {
	    return _Object$keys(result).filter(function (key) {
	      return key !== 'extend' && key !== 'mount' && key !== 'unmount' && key !== 'toString';
	    }).map(function (key) {
	      var value = result[key];
	      return (asClasses ? '.' : '') + dasherize(key) + ' {\n' + _Object$keys(value).filter(function (k) {
	        return k !== 'extend';
	      }).map(function (k) {
	        return '    ' + dasherize(k) + ': ' + value[k] + ';';
	      }).join('\n') + '\n}';
	    }).join('\n');
	  };
	  result.mount = function (asClasses) {
	    if (!mounted && typeof document !== 'undefined') {
	      stylesheetElement = document.createElement('style');
	      if (type) stylesheetElement.setAttribute('type', type);
	      if (media) stylesheetElement.setAttribute('media', media);
	      stylesheetElement.innerHTML = result.toString(asClasses);
	      document.head.appendChild(stylesheetElement);
	      mounted = true;
	    }
	    return result;
	  };
	  result.unmount = function () {
	    if (mounted && typeof document !== 'undefined') {
	      stylesheetElement.parentNode.removeChild(stylesheetElement);
	      mounted = false;
	    }
	    return result;
	  };
	  return result;
	}

	function NotSupported() {
	  throw new Error('Not supported yet !!!');
	}

	function uuid() {
	  // Math.random().toString(15).slice(10, 20)
	  var d = Date.now();
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = (d + Math.random() * 16) % 16 | 0;
	    d = Math.floor(d / 16);
	    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
	  });
	}

	function invariant(condition, message) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  if (!condition) {
	    (function () {
	      var argIndex = 0;
	      throw new Error('Violation : ' + message.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    })();
	  }
	}

	function invariantLog(condition, message) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	    args[_key2 - 2] = arguments[_key2];
	  }

	  if (!condition) {
	    (function () {
	      var argIndex = 0;
	      console.error('Violation : ' + message.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    })();
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "2"


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(58)
	  , core      = __webpack_require__(2)
	  , PROTOTYPE = 'prototype';
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var ES5Object = __webpack_require__(24)
	  , defined   = __webpack_require__(55);
	module.exports = function(it, realString){
	  return (realString ? Object : ES5Object)(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)

	module.exports = isVirtualNode

	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(22)['default'];

	var _Object$is = __webpack_require__(43)['default'];

	var _Array$includes = __webpack_require__(18)['default'];

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	var _defaults = __webpack_require__(21)['default'];

	var _interopExportWildcard = __webpack_require__(23)['default'];

	exports.__esModule = true;
	exports.el = el;
	exports.svg = svg;
	exports.nbsp = nbsp;
	exports.text = text;
	exports.render = render;
	exports.unmount = unmount;
	exports.findDOMNode = findDOMNode;
	exports.renderToJson = renderToJson;
	exports.renderToString = renderToString;
	exports.jsx = jsx;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _docs = __webpack_require__(35);

	var Docs = _interopRequireWildcard(_docs);

	var _devtoolsPerfs = __webpack_require__(17);

	var Perf = _interopRequireWildcard(_devtoolsPerfs);

	var _webcomponents = __webpack_require__(38);

	var WebComponents = _interopRequireWildcard(_webcomponents);

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _virtualDomDiff = __webpack_require__(70);

	var _virtualDomDiff2 = _interopRequireDefault(_virtualDomDiff);

	var _virtualDomPatch = __webpack_require__(71);

	var _virtualDomPatch2 = _interopRequireDefault(_virtualDomPatch);

	var _virtualDomCreateElement = __webpack_require__(69);

	var _virtualDomCreateElement2 = _interopRequireDefault(_virtualDomCreateElement);

	var _virtualDomVnodeVnode = __webpack_require__(76);

	var _virtualDomVnodeVnode2 = _interopRequireDefault(_virtualDomVnodeVnode);

	var _virtualDomVnodeVtext = __webpack_require__(77);

	var _virtualDomVnodeVtext2 = _interopRequireDefault(_virtualDomVnodeVtext);

	var svgNS = 'http://www.w3.org/2000/svg';
	exports.svgNS = svgNS;
	var registerWebComponent = WebComponents.registerWebComponent;
	exports.registerWebComponent = registerWebComponent;
	var stylesheet = Utils.stylesheet;
	exports.stylesheet = stylesheet;
	var predicate = Utils.predicate;

	exports.predicate = predicate;
	// export all sub namespace

	var _exporter = __webpack_require__(36);

	_defaults(exports, _interopExportWildcard(_exporter, _defaults));

	var treeCache = {};
	var globalRefs = {};
	var currentComponentContext = undefined;

	function clearNode(node) {
	  while (!_lodash2['default'].isUndefined(node) && !_Object$is(node, null) && node.firstChild) {
	    node.removeChild(node.firstChild);
	  }
	}

	function styleToString(attrs) {
	  if (!attrs) return '';
	  var attrsArray = [];
	  for (var key in attrs) {
	    if (key !== 'extend' && key !== 'mount' && key !== 'unmount' && key !== 'toString') {
	      var keyName = Utils.dasherize(key);
	      if (key === 'className') {
	        keyName = 'class';
	      }
	      var value = attrs[key];
	      if (value) {
	        if (_lodash2['default'].isFunction(value)) {
	          value = value();
	        }
	        if (value) {
	          attrsArray.push(keyName + ': ' + value + ';');
	        }
	      }
	    }
	  }
	  return attrsArray.join(' ');
	}

	function classToArray(attrs) {
	  if (!attrs) return [];
	  var attrsArray = [];
	  for (var key in attrs) {
	    var value = attrs[key];
	    if (value === true) {
	      attrsArray.push(Utils.dasherize(key));
	    }
	  }
	  return attrsArray;
	}

	function transformAttrs(attrs, attributesHash, handlersHash) {
	  if (!attrs) return [];
	  var context = {
	    ref: undefined
	  };
	  for (var key in attrs) {
	    var keyName = Utils.dasherize(key);
	    if (key === 'className') {
	      keyName = 'class';
	    }
	    if (Utils.startsWith(keyName, 'on')) {
	      handlersHash[key.toLowerCase()] = attrs[key];
	    } else if (keyName === 'ref') {
	      context.ref = attrs[key];
	    } else {
	      var value = attrs[key];
	      if (value && _lodash2['default'].isFunction(value)) {
	        value = value();
	      }
	      if (value) {
	        if (_lodash2['default'].isObject(value) && keyName === 'style') {
	          attributesHash.style = styleToString(value);
	        } else if (_lodash2['default'].isArray(value) && keyName === 'class') {
	          attributesHash[keyName] = value.join(' ');
	        } else if (_lodash2['default'].isObject(value) && keyName === 'class') {
	          attributesHash[keyName] = classToArray(value).join(' ');
	        } else {
	          attributesHash[keyName] = value;
	        }
	      }
	    }
	  }
	  return context;
	}

	function internalEl(name, attrs, childrenArray, key, namespace) {
	  if (attrs === undefined) attrs = {};
	  if (childrenArray === undefined) childrenArray = [];

	  var innerHTML = undefined;
	  var children = childrenArray;
	  var newChildren = [];
	  for (var i in children) {
	    var item = children[i];
	    if (item) {
	      if (_lodash2['default'].isFunction(item)) {
	        item = item();
	      }
	      if (item) {
	        if (item instanceof _virtualDomVnodeVnode2['default']) newChildren.push(item);else if (_lodash2['default'].isObject(item) && item.__asHtml) {
	          innerHTML = item.__asHtml;
	          newChildren.push(new _virtualDomVnodeVtext2['default'](''));
	        } else {
	          newChildren.push(new _virtualDomVnodeVtext2['default'](item + ''));
	        }
	      }
	    }
	  }
	  children = newChildren;

	  if (_lodash2['default'].isFunction(name) && name.isElemComponentFactory) {
	    var props = _extends({}, attrs);
	    props.children = children;
	    props.key = key;
	    props.namespace = namespace;
	    // TODO : hook global resfesh on nested state and keep state ...
	    return name(attrs).renderTo();
	  }
	  if (_lodash2['default'].isFunction(name) && !name.isElemComponentFactory) {
	    var funKey = 'Elem.function.' + (name.name || '<anonymous function>') + '.tree';
	    Perf.markStart(funKey);
	    var props = _extends({}, attrs);
	    props.children = children;
	    props.key = key;
	    props.namespace = namespace;
	    var functionContext = _extends({}, currentComponentContext);
	    if (key) {
	      var _functionContext$__internalSetState;

	      (function () {
	        functionContext.__keys.push(key);
	        if (props.initialState && !functionContext.state['substateof-' + key]) {
	          functionContext.__internalSetState((_functionContext$__internalSetState = {}, _functionContext$__internalSetState['substateof-' + key] = props.initialState, _functionContext$__internalSetState));
	        }
	        var setGlobalState = functionContext.setState;
	        var replaceGlobalState = functionContext.replaceState;
	        var globalState = functionContext.state;
	        functionContext.globalState = globalState;
	        functionContext.setGlobalState = setGlobalState;
	        functionContext.replaceGlobalState = replaceGlobalState;
	        functionContext.state = globalState['substateof-' + key] || {};
	        functionContext.replaceState = function (state, cb) {
	          var _setGlobalState;

	          return setGlobalState((_setGlobalState = {}, _setGlobalState['substateof-' + key] = _virtualDomDiff2['default'], _setGlobalState), cb);
	        };
	        functionContext.setState = function (diffState, cb) {
	          var _setGlobalState2;

	          var newState = globalState['substateof-' + key] || {};
	          for (var k in diffState) {
	            newState[k] = diffState[k];
	          }
	          setGlobalState((_setGlobalState2 = {}, _setGlobalState2['substateof-' + key] = newState, _setGlobalState2), cb);
	        };
	      })();
	    }
	    var thisContext = _extends({}, functionContext, { props: props, children: children });
	    var subTree = name.bind(thisContext)(functionContext, props, children);
	    Perf.markStop(funKey);
	    return subTree;
	  }

	  var finalAttrs = {
	    attributes: {}
	  };
	  var ctx = transformAttrs(attrs, finalAttrs.attributes, finalAttrs);
	  if (ctx.ref) {
	    var refId = Utils.uniqueId('elemref-');
	    finalAttrs.attributes['data-elemref'] = refId;
	    globalRefs[ctx.ref] = refId;
	  }
	  if (innerHTML) {
	    finalAttrs.innerHTML = innerHTML;
	  }
	  return new _virtualDomVnodeVnode2['default'](name, finalAttrs, children, attrs.key, namespace);
	}

	function el(_x5) {
	  var _arguments = arguments;
	  var _again = true;

	  _function: while (_again) {
	    var tagName = _x5;
	    _len = args = _key = argsLength = name = undefined;

	    for (var _len = _arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = _arguments[_key];
	    }

	    _again = false;

	    var argsLength = args.length;
	    var name = _lodash2['default'].isString(tagName) ? _lodash2['default'].escape(tagName) || 'unknown' : tagName;
	    // 1 args
	    if (argsLength === 0) {
	      // el('div', undefined, {}, []);
	      return internalEl(name, {}, [], undefined, undefined);
	    }
	    // 2 args
	    if (argsLength === 1 && _lodash2['default'].isFunction(args[0])) {
	      // el('div', function)
	      _arguments = [_x5 = name, args[0]()];
	      _again = true;
	      continue _function;
	      // forced to recurse
	    }
	    if (argsLength === 1 && args[0] instanceof _virtualDomVnodeVnode2['default']) {
	      // el('div', Elem.el(...))
	      return internalEl(name, {}, [args[0]], undefined, undefined); // forced to recurse
	    }
	    if (argsLength === 1 && _lodash2['default'].isArray(args[0])) {
	      // el('div', [...])
	      return internalEl(name, {}, args[0], undefined, undefined);
	    }
	    if (argsLength === 1 && _lodash2['default'].isObject(args[0]) && args[0].__asHtml) {
	      // el('div', { __asHtml: '...' })
	      return internalEl(name, {}, [args[0]], undefined, undefined);
	    }
	    if (argsLength === 1 && _lodash2['default'].isObject(args[0])) {
	      // el('div', {...})
	      return internalEl(name, args[0], [], args[0].key, undefined);
	    }
	    if (argsLength === 1 && _lodash2['default'].isString(args[0])) {
	      // el('div', 'Lorem Ipsum')
	      return internalEl(name, {}, [args[0]], undefined, undefined);
	    }
	    // 3 args
	    if (argsLength === 2 && _lodash2['default'].isFunction(args[1])) {
	      // el('div', {...}, function)
	      _arguments = [_x5 = name, args[0], args[1]()];
	      _again = true;
	      continue _function;
	      // forced to recurse
	    }
	    if (argsLength === 2 && _lodash2['default'].isObject(args[0]) && !_lodash2['default'].isArray(args[1])) {
	      // el('div', {...}, 'lorem ipsum')
	      return internalEl(name, args[0], [args[1]], args[0].key, undefined);
	    }
	    if (argsLength === 2 && _lodash2['default'].isObject(args[0]) && _lodash2['default'].isArray(args[1])) {
	      // el('div', {...}, [...])
	      return internalEl(name, args[0], args[1], args[0].key, undefined);
	    }
	    if (argsLength === 2 && _lodash2['default'].isString(args[0]) && _lodash2['default'].isObject(args[1])) {
	      // el('div', ns, {...})
	      return internalEl(name, args[1], [], args[1].key, args[0]);
	    }
	    if (argsLength === 2 && _lodash2['default'].isString(args[0]) && !_lodash2['default'].isObject(args[1]) && !_lodash2['default'].isArray(args[1])) {
	      // el('div', ns, 'Lorem ipsum}')
	      return internalEl(name, {}, [args[1]], undefined, args[0]);
	    }
	    // 4 args
	    if (argsLength === 3 && (_lodash2['default'].isUndefined(args[0]) || _lodash2['default'].isString(args[0])) && _lodash2['default'].isObject(args[1]) && !_lodash2['default'].isArray(args[2])) {
	      // el('div', ns, {...}, 'lorem ipsum')
	      return internalEl(name, args[1], [args[2]], args[1].key, args[0]);
	    }
	    if (argsLength === 3 && (_lodash2['default'].isUndefined(args[0]) || _lodash2['default'].isString(args[0])) && _lodash2['default'].isObject(args[1]) && _lodash2['default'].isArray(args[2])) {
	      // el('div', ns, {...}, [...])
	      return internalEl(name, args[1], args[2], args[1].key, args[0]);
	    }
	    console.warn('Unknown el expression ...', _arguments);
	    return internalEl(name, args[1], args[2], args[1].key, args[0]);
	  }
	}

	function svg(name) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  return el.apply(null, [name, svgNS].concat(args));
	}

	function nbsp(times) {
	  return el('span', {
	    __asHtml: '&nbsp;'.repeat(times || 1)
	  });
	}

	function text(spanText) {
	  return el('span', {}, spanText);
	}

	function createComponentContext(refresh, renderNode) {
	  var refs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var context = {
	    __keys: [],
	    __oldKeys: [],
	    refs: refs,
	    state: {},
	    context: {},
	    refresh: refresh,
	    redraw: refresh,
	    getDOMNode: function getDOMNode() {
	      var doc = document;
	      if (renderNode.ownerDocument) {
	        doc = renderNode.ownerDocument;
	      }
	      if (_lodash2['default'].isString(renderNode)) {
	        return doc.querySelector(renderNode);
	      }
	      return renderNode;
	    }
	  };
	  context.__internalSetState = function (diffState) {
	    for (var key in diffState) {
	      context.state[key] = diffState[key];
	    }
	  };
	  context.__internalReplaceState = function (newState) {
	    return context.state = newState;
	  };
	  context.setState = function (diffState, cb) {
	    for (var key in diffState) {
	      context.state[key] = diffState[key];
	    }
	    refresh();
	    if (cb) {
	      cb();
	    }
	  };
	  context.replaceState = function (newState, cb) {
	    context.state = newState;
	    refresh();
	    if (cb) {
	      cb();
	    }
	  };
	  return context;
	}

	function render(elementOrFunction, selectorOrNode) {
	  var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  Perf.markStart('Elem.render');
	  var node = selectorOrNode;
	  var tree = elementOrFunction;
	  if (_lodash2['default'].isFunction(tree)) {
	    (function () {
	      var funKey = 'Elem.' + (tree.name ? 'function' : 'render') + '.' + (tree.name || '') + '.tree';
	      Perf.markStart(funKey);
	      // Perf.markStart('Elem.render.tree');
	      var functionAsComponentContext = {
	        context: undefined,
	        props: props
	      };
	      var reTree = function reTree() {
	        try {
	          var _refs = _extends({}, globalRefs);
	          globalRefs = {};
	          functionAsComponentContext.context.refs = _refs;
	          currentComponentContext = functionAsComponentContext.context;
	          var thisContext = _extends({}, functionAsComponentContext.context, { props: functionAsComponentContext.props });
	          return elementOrFunction.bind(thisContext)(functionAsComponentContext.context, functionAsComponentContext.props);
	        } finally {
	          currentComponentContext = undefined;
	          if (functionAsComponentContext.context.__keys.length !== 0) {
	            var diffs = functionAsComponentContext.context.__oldKeys.filter(function (value) {
	              return !_lodash2['default'].contains(functionAsComponentContext.context.__keys, value);
	            });
	            for (var currentDiff in diffs) {
	              var key = 'substateof-' + diffs[currentDiff];
	              delete functionAsComponentContext.context.state[key];
	            }
	            functionAsComponentContext.context.__oldKeys = [].concat(functionAsComponentContext.context.__keys);
	            functionAsComponentContext.context.__keys = [];
	          }
	        }
	      };
	      var refresh = function refresh() {
	        Perf.markStart(funKey);
	        var currentTree = reTree();
	        render(currentTree, node);
	        Perf.markStop(funKey);
	      };
	      var refs = _extends({}, globalRefs);
	      globalRefs = {};
	      functionAsComponentContext.context = createComponentContext(refresh, node, refs);
	      if (props.initialState) {
	        functionAsComponentContext.context.state = props.initialState;
	      } else {
	        functionAsComponentContext.context.state = {};
	      }
	      tree = reTree();
	      // Perf.markStop('Elem.render.tree');
	      Perf.markStop(funKey);
	    })();
	  } else if (_lodash2['default'].isArray(tree)) {
	    tree = el('span', tree);
	  }
	  var doc = document;
	  if (node.ownerDocument) {
	    doc = node.ownerDocument;
	  }
	  if (_lodash2['default'].isString(node)) {
	    node = doc.querySelector(node);
	  }
	  var rootId = undefined;
	  if (node !== null) {
	    rootId = node.rootId;
	    if (!rootId) {
	      rootId = Utils.uniqueId('data-rootid-');
	      node.rootId = rootId;
	    }
	    var oldDom = treeCache[rootId];
	    if (!oldDom) {
	      Perf.markStart('Elem.render.create');
	      var rootNode = _virtualDomCreateElement2['default'](tree);
	      clearNode(node);
	      node.appendChild(rootNode);
	      treeCache[rootId] = {
	        tree: tree,
	        rootNode: rootNode
	      };
	      Perf.markStop('Elem.render.create');
	    } else {
	      Perf.markStart('Elem.render.diff');
	      var patches = _virtualDomDiff2['default'](oldDom.tree, tree);
	      Perf.markStop('Elem.render.diff');
	      Perf.markStart('Elem.render.patch');
	      var rootNode = _virtualDomPatch2['default'](oldDom.rootNode, patches);
	      treeCache[rootId] = {
	        tree: tree,
	        rootNode: rootNode
	      };
	      Perf.markStop('Elem.render.patch');
	    }
	  }
	  Perf.markStop('Elem.render');
	  return {
	    unmount: function unmount() {
	      delete node.rootId;
	      clearNode(node);
	      delete treeCache[rootId];
	    }
	  };
	}

	function unmount(theNode) {
	  var node = theNode;
	  var doc = document;
	  if (node.ownerDocument) {
	    doc = node.ownerDocument;
	  }
	  if (_lodash2['default'].isString(node)) {
	    node = doc.querySelector(node);
	  }
	  clearNode(node);
	  if (node.rootId) {
	    delete treeCache[node.rootId];
	    delete node.rootId;
	  }
	}

	function findDOMNode(ref) {
	  return document.querySelector('[data-elemref="' + ref + '"]');
	}

	function renderToJson(elementOrFunction) {
	  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  Perf.markStart('Elem.renderToJson');
	  var tree = elementOrFunction;
	  if (_lodash2['default'].isFunction(tree)) {
	    var refs = _extends({}, globalRefs);
	    globalRefs = {};
	    var componentContext = createComponentContext(function () {}, null, refs);
	    var thisContext = _extends({}, componentContext, { props: props });
	    tree = tree.bind(thisContext)(componentContext, props);
	  }
	  var rootNode = _virtualDomCreateElement2['default'](tree, { document: Docs.createJsonDocument() });
	  var str = rootNode.render();
	  Perf.markStop('Elem.renderToJson');
	  return str;
	}

	function renderToString(elementOrFunction) {
	  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  Perf.markStart('Elem.renderToString');
	  var tree = elementOrFunction;
	  if (_lodash2['default'].isFunction(tree)) {
	    var refs = _extends({}, globalRefs);
	    globalRefs = {};
	    var componentContext = createComponentContext(function () {}, null, refs);
	    var thisContext = _extends({}, componentContext, { props: props });
	    tree = tree.bind(thisContext)(componentContext, props);
	  }
	  var rootNode = _virtualDomCreateElement2['default'](tree, { document: Docs.createStringDocument() });
	  var str = rootNode.render();
	  Perf.markStop('Elem.renderToString');
	  return str;
	}

	var svgElements = ['altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use', 'view', 'vkern'];

	function jsx(type, attributes) {
	  var children = [];

	  for (var _len3 = arguments.length, chldn = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	    chldn[_key3 - 2] = arguments[_key3];
	  }

	  for (var i = 0; i < chldn.length; i++) {
	    var value = chldn[i];
	    if (_lodash2['default'].isArray(value)) {
	      for (var j = 0; j < value.length; j++) {
	        children.push(value[j]);
	      }
	    } else {
	      children.push(value);
	    }
	  }
	  var attrs = attributes || {};
	  if (_Array$includes(svgElements, type)) {
	    return internalEl(type, attrs, children || [], attrs.key || undefined, svgNS);
	  }
	  return internalEl(type, attrs, children || [], attrs.key || undefined, undefined);
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(1)
	  , core     = __webpack_require__(2)
	  , $def     = __webpack_require__(9)
	  , toObject = __webpack_require__(10)
	  , isObject = __webpack_require__(59);
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = (core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(toObject(it, true));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(57).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = isThunk

	function isThunk(t) {
	    return t && t.type === "Thunk"
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = isHook

	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)

	module.exports = isVirtualText

	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(6)['default'];

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	exports.__esModule = true;
	exports.start = start;
	exports.stop = stop;
	exports.markStart = markStart;
	exports.markStop = markStop;
	exports.collectMeasures = collectMeasures;
	exports.clear = clear;
	exports.measures = measures;
	exports.printMeasures = printMeasures;
	exports.mark = mark;

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var globalObject = Utils.memoGobalObject();

	var perfs = false;

	function start() {
	  perfs = true;
	}

	function stop() {
	  perfs = false;
	}

	// perfs measures (http://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
	var Performances = {
	  mark: function mark() {},
	  measure: function measure() {},
	  getEntriesByName: function getEntriesByName() {
	    return [];
	  },
	  getEntriesByType: function getEntriesByType() {
	    return [];
	  },
	  clearMarks: function clearMarks() {},
	  clearMeasures: function clearMeasures() {}
	};

	if (typeof globalObject.performance !== 'undefined' && typeof globalObject.performance.mark !== 'undefined' && typeof globalObject.performance.measure !== 'undefined') {
	  Performances = globalObject.performance;
	}

	var ElemMeasureStart = 'ElemMeasureStart';
	var ElemMeasureStop = 'ElemMeasureStop';
	var ElemMeasure = 'ElemComponentRenderingMeasure';
	var names = [ElemMeasure];

	function markStart(name) {
	  if (perfs) {
	    if (name) {
	      Performances.mark(name + '_start');
	    } else {
	      Performances.mark(ElemMeasureStart);
	    }
	  }
	}

	function markStop(name) {
	  if (perfs) {
	    if (name) {
	      Performances.mark(name + '_stop');
	      Performances.measure(name, name + '_start', name + '_stop');
	      if (!_lodash2['default'].contains(names, name)) names.push(name);
	    } else {
	      Performances.mark(ElemMeasureStop);
	      Performances.measure(ElemMeasure, ElemMeasureStart, ElemMeasureStop);
	    }
	  }
	}

	function collectMeasures() {
	  var clearMeasures = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	  if (!perfs) return [];
	  var results = [];
	  names.filter(function (i) {
	    return i !== ElemMeasure;
	  }).forEach(function (name) {
	    var rawMeasures = Performances.getEntriesByName(name);
	    var timeline = rawMeasures.map(function (e) {
	      return { at: e.startTime, value: e.duration };
	    });
	    var values = rawMeasures.map(function (entry) {
	      return entry.duration;
	    });
	    var totalDuration = values.reduce(function (a, b) {
	      return a + b;
	    }, 0);
	    var meanDuration = totalDuration / values.length;
	    var maxDuration = Math.max.apply(Math, values);
	    var minDuration = Math.min.apply(Math, values);
	    var calls = values.length;
	    results = [].concat(results, [{ name: name, minDuration: minDuration, meanDuration: meanDuration, maxDuration: maxDuration, totalDuration: totalDuration, calls: calls, values: values, timeline: timeline }]);
	  });
	  if (clearMeasures) Performances.clearMarks();
	  if (clearMeasures) Performances.clearMeasures();
	  if (clearMeasures) names = [ElemMeasure];
	  return results;
	}

	function clear() {
	  Performances.clearMarks();
	  Performances.clearMeasures();
	  names = [ElemMeasure];
	}

	function measures() {
	  return collectMeasures(false);
	}

	function printMeasures() {
	  var clearMeasures = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	  if (!perfs) return;
	  console.table(collectMeasures(clearMeasures));
	}

	function mark(name, func) {
	  markStart(name);
	  try {
	    func();
	  } finally {
	    markStop(name);
	  }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyNames = __webpack_require__(42)["default"];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(41)["default"];

	var _Object$defineProperty = __webpack_require__(40)["default"];

	exports["default"] = function (obj, defaults) {
	  var keys = _Object$getOwnPropertyNames(defaults);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];

	    var value = _Object$getOwnPropertyDescriptor(defaults, key);

	    if (value && value.configurable && obj[key] === undefined) {
	      _Object$defineProperty(obj, key, value);
	    }
	  }

	  return obj;
	};

	exports.__esModule = true;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(19)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj, defaults) {
	  var newObj = defaults({}, obj);
	  delete newObj["default"];
	  return newObj;
	};

	exports.__esModule = true;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for not array-like ES3 strings
	var cof     = __webpack_require__(54)
	  , $Object = Object;
	module.exports = 0 in $Object('z') ? $Object : function(it){
	  return cof(it) == 'String' ? it.split('') : $Object(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(80);

	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }

	    module.exports = doccy;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString

	module.exports = nativeIsArray || isArray

	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27)
	var isHook = __webpack_require__(15)

	module.exports = applyProperties

	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]

	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}

	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]

	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}

	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined

	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]

	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }

	        return
	    }

	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }

	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }

	    var replacer = propName === "style" ? "" : undefined

	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(26)

	var applyProperties = __webpack_require__(29)

	var isVNode = __webpack_require__(11)
	var isVText = __webpack_require__(16)
	var isWidget = __webpack_require__(3)
	var handleThunk = __webpack_require__(31)

	module.exports = createElement

	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null

	    vnode = handleThunk(vnode).a

	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }

	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)

	    var props = vnode.properties
	    applyProperties(node, props)

	    var children = vnode.children

	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }

	    return node
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isVNode = __webpack_require__(11)
	var isVText = __webpack_require__(16)
	var isWidget = __webpack_require__(3)
	var isThunk = __webpack_require__(14)

	module.exports = handleThunk

	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b

	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }

	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }

	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}

	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode

	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }

	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }

	    return renderedThunk
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)

	VirtualPatch.NONE = 0
	VirtualPatch.VTEXT = 1
	VirtualPatch.VNODE = 2
	VirtualPatch.WIDGET = 3
	VirtualPatch.PROPS = 4
	VirtualPatch.ORDER = 5
	VirtualPatch.INSERT = 6
	VirtualPatch.REMOVE = 7
	VirtualPatch.THUNK = 8

	module.exports = VirtualPatch

	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type)
	    this.vNode = vNode
	    this.patch = patch
	}

	VirtualPatch.prototype.version = version
	VirtualPatch.prototype.type = "VirtualPatch"


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	exports.__esModule = true;
	exports.Redbox = Redbox;
	exports.ErrorMonitor = ErrorMonitor;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _main = __webpack_require__(12);

	var Elem = _interopRequireWildcard(_main);

	var _errorStackParser = __webpack_require__(67);

	var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var RedboxStyle = Utils.stylesheet({

	  redbox: {
	    boxSizing: 'border-box',
	    fontFamily: 'sans-serif',
	    fontSize: '1em',
	    position: 'fixed',
	    padding: '10px',
	    top: '0',
	    bottom: '0',
	    width: '100%',
	    background: 'rgb(204, 0, 0)',
	    color: 'white'
	  },

	  message: {
	    fontWeight: 'bold'
	  },

	  stack: {
	    fontFamily: 'monospace',
	    marginTop: '2em'
	  },

	  stackframe: {
	    marginTop: '1em'
	  },

	  stackframeFile: {
	    fontSize: '0.8em',
	    color: 'rgba(255, 255, 255, 0.7)'
	  },

	  stackframeFileLink: {
	    textDecoration: 'none',
	    color: 'rgba(255, 255, 255, 0.7)'
	  }
	});

	exports.RedboxStyle = RedboxStyle;

	function Redbox(error) {
	  var frames = _errorStackParser2['default'].parse(error).map(function (f) {
	    var link = f.fileName + '#' + f.lineNumber + ':' + f.columnNumber;
	    return Elem.el('div', { style: RedboxStyle.stackframe }, [Elem.el('div', f.functionName || '<anonymous function>'), Elem.el('div', { style: RedboxStyle.stackframeFile }, [Elem.el('a', { href: link, style: RedboxStyle.stackframeFileLink }, link)])]);
	  });
	  return Elem.el('div', { style: RedboxStyle.redbox }, [Elem.el('div', { style: RedboxStyle.message }, error.name + ': ' + error.message), Elem.el('div', { style: RedboxStyle.stack }, frames)]);
	}

	function ErrorMonitor(wrapped) {
	  if (!_lodash2['default'].isFunction(wrapped)) {
	    throw new Error('ErrorMonitor should only wrap functions');
	  }
	  return function (ctx) {
	    try {
	      return wrapped(ctx);
	    } catch (e) {
	      return Redbox(e);
	    }
	  };
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _defaults = __webpack_require__(21)['default'];

	var _interopExportWildcard = __webpack_require__(23)['default'];

	exports.__esModule = true;

	var _devtools = __webpack_require__(33);

	_defaults(exports, _interopExportWildcard(_devtools, _defaults));

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.createStringDocument = createStringDocument;
	exports.createJsonDocument = createJsonDocument;

	function createStringDocument() {
	  function node(name) {
	    var a = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    var attrs = a;
	    var children = [];
	    return {
	      setAttribute: function setAttribute(key, value) {
	        attrs.push({ key: key, value: value });
	      },
	      removeAttribute: function removeAttribute(key) {
	        attrs = attrs.filter(function (item) {
	          return item.key !== key;
	        });
	      },
	      appendChild: function appendChild(child) {
	        children.push(child);
	      },
	      render: function render() {
	        var _this = this;

	        if (this.innerHTML) {
	          (function () {
	            var html = _this.innerHTML;
	            children.push({
	              render: function render() {
	                return html;
	              }
	            });
	          })();
	        }
	        attrs = attrs.map(function (attr) {
	          var key = attr.key;
	          var value = attr.value;
	          return key + '="' + value + '"';
	        });
	        var selfCloseTag = children.length === 0;
	        if (selfCloseTag) return '<' + name + ' ' + attrs.join(' ') + ' />';
	        return '<' + name + (attrs.length > 0 ? ' ' : '') + attrs.join(' ') + '>' + children.map(function (child) {
	          return child.render();
	        }).join('') + '</' + name + '>';
	      }
	    };
	  }

	  function createElementNS(ns, name, attrs) {
	    return node(name, attrs, ns);
	  }

	  function createElement(name, attrs) {
	    return node(name, attrs);
	  }

	  function createTextNode(str) {
	    return {
	      render: function render() {
	        return str;
	      }
	    };
	  }

	  return {
	    createTextNode: createTextNode,
	    createElementNS: createElementNS,
	    createElement: createElement
	  };
	}

	function createJsonDocument() {
	  function node(name) {
	    var a = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    var attrs = a;
	    var children = [];
	    return {
	      setAttribute: function setAttribute(key, value) {
	        attrs.push({ key: key, value: value });
	      },
	      removeAttribute: function removeAttribute(key) {
	        attrs = attrs.filter(function (item) {
	          return item.key !== key;
	        });
	      },
	      appendChild: function appendChild(child) {
	        children.push(child);
	      },
	      render: function render() {
	        var _this2 = this;

	        if (this.innerHTML) {
	          (function () {
	            var html = _this2.innerHTML;
	            children = [{
	              render: function render() {
	                return html;
	              }
	            }];
	          })();
	        }
	        return {
	          name: name,
	          attrs: attrs,
	          children: children.map(function (child) {
	            return child.render();
	          })
	        };
	      }
	    };
	  }

	  function createElementNS(ns, name, attrs) {
	    return node(name, attrs, ns);
	  }

	  function createElement(name, attrs) {
	    return node(name, attrs);
	  }

	  function createTextNode(str) {
	    return {
	      render: function render() {
	        return str;
	      }
	    };
	  }

	  return {
	    createTextNode: createTextNode,
	    createElementNS: createElementNS,
	    createElement: createElement
	  };
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _devtoolsPerfs = __webpack_require__(17);

	var Perf = _interopRequireWildcard(_devtoolsPerfs);

	var _store = __webpack_require__(37);

	var Store = _interopRequireWildcard(_store);

	var _devtools = __webpack_require__(34);

	var Devtools = _interopRequireWildcard(_devtools);

	// the shape of the APIs exported from Elem namespace (UMD)
	exports['default'] = {
	  Utils: Utils,
	  Perf: Perf,
	  Store: Store,
	  Devtools: Devtools
	};
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(22)['default'];

	var _interopRequireDefault = __webpack_require__(6)['default'];

	exports.__esModule = true;
	exports.createStore = createStore;
	exports.bindActionsToDispatch = bindActionsToDispatch;
	exports.handleActions = handleActions;
	exports.withInitialState = withInitialState;
	exports.Connector = Connector;
	exports.ComposableConnector = ComposableConnector;

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var nameCounter = 0;

	function createStore() {
	  var reducer = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var reducers = [];
	  if (_lodash2['default'].isObject(reducer)) {
	    for (var key in reducer) {
	      var f = reducer[key];
	      if (!_lodash2['default'].isFunction(f)) {
	        throw new Error('Store should be a function ...');
	      }
	      var __name = f.name || key || 'substate-' + nameCounter++;
	      reducers.push({
	        getNewState: f,
	        name: __name
	      });
	    }
	  } else if (_lodash2['default'].isFunction(reducer)) {
	    var _name = reducer.name || 'reducer';
	    reducers = [{
	      getNewState: reducer,
	      name: _name
	    }];
	  } else {
	    throw new Error('Store should be a function or an object of functions ...');
	  }

	  var actionsTimeline = [];
	  var state = initialState;
	  var listeners = [];

	  function dispatch(what) {
	    actionsTimeline.push(what);
	    var currentState = state;
	    reducers.forEach(function (r) {
	      currentState[r.name] = r.getNewState(currentState[r.name], what);
	    });
	    state = currentState;
	    listeners.forEach(function (listener) {
	      return listener();
	    });
	  }

	  function subscribe(listener) {
	    listeners.push(listener);
	    return function () {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  dispatch({ type: '@@init' });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    setState: function setState(newState) {
	      state = newState;
	      listeners.forEach(function (listener) {
	        return listener();
	      });
	      return state;
	    },
	    getState: function getState() {
	      return _extends({}, state);
	    }
	  };
	}

	function bindActionsToDispatch(actions, dispatch) {
	  var _arguments = arguments;

	  var boundActions = {};

	  var _loop = function (key) {
	    var value = actions[key];
	    var name = value.name || 'boundaction-' + nameCounter++;
	    boundActions[name] = function () {
	      var action = value.apply(null, _arguments);
	      dispatch(action);
	    };
	  };

	  for (var key in actions) {
	    _loop(key);
	  }
	  return boundActions;
	}

	// export default const myStore = Store.handleActions({ ... }, { ... })

	function handleActions(actions) {
	  var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  return function (state, action) {
	    var actualAction = actions[action.type];
	    if (actualAction) {
	      return actualAction(state, action);
	    } else {
	      return state || initialState;
	    }
	  };
	}

	// export default const myStore = Store.withInitialState({ ... }).handleActions({ ... })

	function withInitialState(initialState) {
	  var apiHandleActions = handleActions;
	  return {
	    handleActions: function handleActions(actions) {
	      return apiHandleActions(actions, initialState);
	    }
	  };
	}

	function Connector(ctx, props) {
	  var store = props.store;
	  var selector = props.selector;
	  var actions = props.actions;
	  var render = props.render;

	  if (!render) {
	    render = function () {
	      return props.children;
	    };
	  }
	  var newCtx = _extends({}, ctx);
	  delete props.actions;
	  delete props.render;
	  delete props.store;
	  delete props.selector;
	  var boundActions = bindActionsToDispatch(actions, store.dispatch);
	  var newProps = _extends({}, props, boundActions, selector(store.getState()), { actions: boundActions });
	  newCtx.store = store;
	  newCtx.dispatch = store.dispatch;
	  var fakeCtx = {
	    unsubscribe: null
	  };
	  fakeCtx.unsubscribe = store.subscribe(function () {
	    ctx.refresh();
	    fakeCtx.unsubscribe();
	  });
	  return render(newCtx, newProps);
	}

	function ComposableConnector(store, selector, actions) {
	  return function (render) {
	    return function (ctx, props) {
	      return Connector(ctx, _extends({}, props, { store: store, selector: selector, actions: actions, render: render }));
	    };
	  };
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(39)['default'];

	var _interopRequireWildcard = __webpack_require__(7)['default'];

	var _main = __webpack_require__(12);

	var Elem = _interopRequireWildcard(_main);

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var registrationFunction = undefined;

	try {
	  registrationFunction = (document.registerElement || document.register).bind(document);
	} catch (e) {}

	function registerWebComponent(tag, elemTree) {
	  console.log('registering WebComponent ' + tag);
	  var thatDoc = document;
	  var ElementProto = _Object$create(HTMLElement.prototype);

	  function renderElemTree(attrs, node) {
	    if (elemTree.isElemComponentFactory) {
	      return elemTree(attrs).renderTo(node);
	    } else {
	      return Elem.render(elemTree, node, attrs);
	    }
	  }

	  ElementProto.createdCallback = function createWebcomponentInstance() {
	    var props = {};
	    for (var i in this.attributes) {
	      var item = this.attributes[i];
	      props[item.name] = item.value;
	    }
	    this.props = props;
	    this.fragment = thatDoc.createElement('content');
	    this.fragment.setAttribute('id', Utils.uuid());
	    this.appendChild(this.fragment);
	    this.renderedElement = renderElemTree(props, this.fragment);
	  };

	  ElementProto.attributeChangedCallback = function changeAttribute(attr, oldVal, newVal) {
	    this.props[attr] = newVal;
	    renderElemTree(this.props, this.fragment);
	  };

	  registrationFunction(tag, {
	    prototype: ElementProto
	  });
	}

	if (registrationFunction) {
	  exports.registerWebComponent = registerWebComponent;
	} else {
	  exports.registerWebComponent = function () {
	    if (window.console) console.error('[Elem] WebComponent not available here :(');
	  };
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	module.exports = __webpack_require__(2).Array.includes;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	module.exports = __webpack_require__(2).Object.assign;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	__webpack_require__(13);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	__webpack_require__(13);
	module.exports = function getOwnPropertyNames(it){
	  return $.getNames(it);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	module.exports = __webpack_require__(2).Object.is;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	module.exports = __webpack_require__(2).Object.keys;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toObject = __webpack_require__(10)
	  , toLength = __webpack_require__(62)
	  , toIndex  = __webpack_require__(61);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toObject  = __webpack_require__(10)
	  , ES5Object = __webpack_require__(24)
	  , enumKeys  = __webpack_require__(56);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = toObject(target, true)
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , isEnum     = $.isEnum
	    , getSymbols = $.getSymbols;
	  if(getSymbols)for(var symbols = getSymbols(it), i = 0, key; symbols.length > i; ){
	    if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toString = {}.toString
	  , toObject = __webpack_require__(10)
	  , getNames = __webpack_require__(1).getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toObject(it));
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	var global = typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	module.exports = global;
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 59 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(25)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(9);
	$def($def.S, 'Object', {assign: __webpack_require__(53)});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $def = __webpack_require__(9);
	$def($def.S, 'Object', {
	  is: __webpack_require__(60)
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def      = __webpack_require__(9)
	  , $includes = __webpack_require__(52)(true);
	$def($def.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments[1]);
	  }
	});
	__webpack_require__(63)('includes');

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(68)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('stackframe'));
	    } else {
	        root.ErrorStackParser = factory(root.StackFrame);
	    }
	}(this, function ErrorStackParser(StackFrame) {
	    'use strict';

	    var FIREFOX_SAFARI_STACK_REGEXP = /\S+\:\d+/;
	    var CHROME_IE_STACK_REGEXP = /\s+at /;

	    return {
	        /**
	         * Given an Error object, extract the most information from it.
	         * @param error {Error}
	         * @return Array[StackFrame]
	         */
	        parse: function ErrorStackParser$$parse(error) {
	            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
	                return this.parseOpera(error);
	            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
	                return this.parseV8OrIE(error);
	            } else if (error.stack && error.stack.match(FIREFOX_SAFARI_STACK_REGEXP)) {
	                return this.parseFFOrSafari(error);
	            } else {
	                throw new Error('Cannot parse given Error object');
	            }
	        },

	        /**
	         * Separate line and column numbers from a URL-like string.
	         * @param urlLike String
	         * @return Array[String]
	         */
	        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
	            // Fail-fast but return locations like "(native)"
	            if (urlLike.indexOf(':') === -1) {
	                return [urlLike];
	            }

	            var locationParts = urlLike.replace(/[\(\)\s]/g, '').split(':');
	            var lastNumber = locationParts.pop();
	            var possibleNumber = locationParts[locationParts.length - 1];
	            if (!isNaN(parseFloat(possibleNumber)) && isFinite(possibleNumber)) {
	                var lineNumber = locationParts.pop();
	                return [locationParts.join(':'), lineNumber, lastNumber];
	            } else {
	                return [locationParts.join(':'), lastNumber, undefined];
	            }
	        },

	        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
	            return error.stack.split('\n').slice(1).map(function (line) {
	                var tokens = line.replace(/^\s+/, '').split(/\s+/).slice(1);
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionName = (!tokens[0] || tokens[0] === 'Anonymous') ? undefined : tokens[0];
	                return new StackFrame(functionName, undefined, locationParts[0], locationParts[1], locationParts[2]);
	            }, this);
	        },

	        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
	            return error.stack.split('\n').filter(function (line) {
	                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP);
	            }, this).map(function (line) {
	                var tokens = line.split('@');
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionName = tokens.shift() || undefined;
	                return new StackFrame(functionName, undefined, locationParts[0], locationParts[1], locationParts[2]);
	            }, this);
	        },

	        parseOpera: function ErrorStackParser$$parseOpera(e) {
	            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
	                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
	                return this.parseOpera9(e);
	            } else if (!e.stack) {
	                return this.parseOpera10(e);
	            } else {
	                return this.parseOpera11(e);
	            }
	        },

	        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	            var lines = e.message.split('\n');
	            var result = [];

	            for (var i = 2, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(undefined, undefined, match[2], match[1]));
	                }
	            }

	            return result;
	        },

	        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	            var lines = e.stacktrace.split('\n');
	            var result = [];

	            for (var i = 0, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(match[3] || undefined, undefined, match[2], match[1]));
	                }
	            }

	            return result;
	        },

	        // Opera 10.65+ Error.stack very similar to FF/Safari
	        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
	            return error.stack.split('\n').filter(function (line) {
	                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) &&
	                    !line.match(/^Error created at/);
	            }, this).map(function (line) {
	                var tokens = line.split('@');
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionCall = (tokens.shift() || '');
	                var functionName = functionCall
	                        .replace(/<anonymous function(: (\w+))?>/, '$2')
	                        .replace(/\([^\)]*\)/g, '') || undefined;
	                var argsRaw;
	                if (functionCall.match(/\(([^\)]*)\)/)) {
	                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
	                }
	                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ? undefined : argsRaw.split(',');
	                return new StackFrame(functionName, args, locationParts[0], locationParts[1], locationParts[2]);
	            }, this);
	        }
	    };
	}));



/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.StackFrame = factory();
	    }
	}(this, function () {
	    'use strict';
	    function _isNumber(n) {
	        return !isNaN(parseFloat(n)) && isFinite(n);
	    }

	    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
	        if (functionName !== undefined) {
	            this.setFunctionName(functionName);
	        }
	        if (args !== undefined) {
	            this.setArgs(args);
	        }
	        if (fileName !== undefined) {
	            this.setFileName(fileName);
	        }
	        if (lineNumber !== undefined) {
	            this.setLineNumber(lineNumber);
	        }
	        if (columnNumber !== undefined) {
	            this.setColumnNumber(columnNumber);
	        }
	        if (source !== undefined) {
	            this.setSource(source);
	        }
	    }

	    StackFrame.prototype = {
	        getFunctionName: function () {
	            return this.functionName;
	        },
	        setFunctionName: function (v) {
	            this.functionName = String(v);
	        },

	        getArgs: function () {
	            return this.args;
	        },
	        setArgs: function (v) {
	            if (Object.prototype.toString.call(v) !== '[object Array]') {
	                throw new TypeError('Args must be an Array');
	            }
	            this.args = v;
	        },

	        // NOTE: Property name may be misleading as it includes the path,
	        // but it somewhat mirrors V8's JavaScriptStackTraceApi
	        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
	        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
	        getFileName: function () {
	            return this.fileName;
	        },
	        setFileName: function (v) {
	            this.fileName = String(v);
	        },

	        getLineNumber: function () {
	            return this.lineNumber;
	        },
	        setLineNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Line Number must be a Number');
	            }
	            this.lineNumber = Number(v);
	        },

	        getColumnNumber: function () {
	            return this.columnNumber;
	        },
	        setColumnNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Column Number must be a Number');
	            }
	            this.columnNumber = Number(v);
	        },

	        getSource: function () {
	            return this.source;
	        },
	        setSource: function (v) {
	            this.source = String(v);
	        },

	        toString: function() {
	            var functionName = this.getFunctionName() || '{anonymous}';
	            var args = '(' + (this.getArgs() || []).join(',') + ')';
	            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
	            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
	            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
	            return functionName + args + fileName + lineNumber + columnNumber;
	        }
	    };

	    return StackFrame;
	}));


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var createElement = __webpack_require__(30)

	module.exports = createElement


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(79)

	module.exports = diff


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var patch = __webpack_require__(74)

	module.exports = patch


/***/ },
/* 72 */
/***/ function(module, exports) {

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.

	var noChild = {}

	module.exports = domIndex

	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {}
	    } else {
	        indices.sort(ascending)
	        return recurse(rootNode, tree, indices, nodes, 0)
	    }
	}

	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {}


	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode
	        }

	        var vChildren = tree.children

	        if (vChildren) {

	            var childNodes = rootNode.childNodes

	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1

	                var vChild = vChildren[i] || noChild
	                var nextIndex = rootIndex + (vChild.count || 0)

	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
	                }

	                rootIndex = nextIndex
	            }
	        }
	    }

	    return nodes
	}

	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false
	    }

	    var minIndex = 0
	    var maxIndex = indices.length - 1
	    var currentIndex
	    var currentItem

	    while (minIndex <= maxIndex) {
	        currentIndex = ((maxIndex + minIndex) / 2) >> 0
	        currentItem = indices[currentIndex]

	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1
	        } else  if (currentItem > right) {
	            maxIndex = currentIndex - 1
	        } else {
	            return true
	        }
	    }

	    return false;
	}

	function ascending(a, b) {
	    return a > b ? 1 : -1
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var applyProperties = __webpack_require__(29)

	var isWidget = __webpack_require__(3)
	var VPatch = __webpack_require__(32)

	var updateWidget = __webpack_require__(75)

	module.exports = applyPatch

	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type
	    var vNode = vpatch.vNode
	    var patch = vpatch.patch

	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode)
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions)
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions)
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch)
	            return domNode
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties)
	            return domNode
	        case VPatch.THUNK:
	            return replaceRoot(domNode,
	                renderOptions.patch(domNode, patch, renderOptions))
	        default:
	            return domNode
	    }
	}

	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode

	    if (parentNode) {
	        parentNode.removeChild(domNode)
	    }

	    destroyWidget(domNode, vNode);

	    return null
	}

	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions)

	    if (parentNode) {
	        parentNode.appendChild(newNode)
	    }

	    return parentNode
	}

	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode

	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text)
	        newNode = domNode
	    } else {
	        var parentNode = domNode.parentNode
	        newNode = renderOptions.render(vText, renderOptions)

	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode)
	        }
	    }

	    return newNode
	}

	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget)
	    var newNode

	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode
	    } else {
	        newNode = renderOptions.render(widget, renderOptions)
	    }

	    var parentNode = domNode.parentNode

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }

	    if (!updating) {
	        destroyWidget(domNode, leftVNode)
	    }

	    return newNode
	}

	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode
	    var newNode = renderOptions.render(vNode, renderOptions)

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }

	    return newNode
	}

	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode)
	    }
	}

	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes
	    var keyMap = {}
	    var node
	    var remove
	    var insert

	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i]
	        node = childNodes[remove.from]
	        if (remove.key) {
	            keyMap[remove.key] = node
	        }
	        domNode.removeChild(node)
	    }

	    var length = childNodes.length
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j]
	        node = keyMap[insert.key]
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
	    }
	}

	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
	    }

	    return newRoot;
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(26)
	var isArray = __webpack_require__(28)

	var render = __webpack_require__(30)
	var domIndex = __webpack_require__(72)
	var patchOp = __webpack_require__(73)
	module.exports = patch

	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {}
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
	        ? renderOptions.patch
	        : patchRecursive
	    renderOptions.render = renderOptions.render || render

	    return renderOptions.patch(rootNode, patches, renderOptions)
	}

	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches)

	    if (indices.length === 0) {
	        return rootNode
	    }

	    var index = domIndex(rootNode, patches.a, indices)
	    var ownerDocument = rootNode.ownerDocument

	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument
	    }

	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i]
	        rootNode = applyPatch(rootNode,
	            index[nodeIndex],
	            patches[nodeIndex],
	            renderOptions)
	    }

	    return rootNode
	}

	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode
	    }

	    var newNode

	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions)

	            if (domNode === rootNode) {
	                rootNode = newNode
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions)

	        if (domNode === rootNode) {
	            rootNode = newNode
	        }
	    }

	    return rootNode
	}

	function patchIndices(patches) {
	    var indices = []

	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key))
	        }
	    }

	    return indices
	}


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var isWidget = __webpack_require__(3)

	module.exports = updateWidget

	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id
	        } else {
	            return a.init === b.init
	        }
	    }

	    return false
	}


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)
	var isVNode = __webpack_require__(11)
	var isWidget = __webpack_require__(3)
	var isThunk = __webpack_require__(14)
	var isVHook = __webpack_require__(15)

	module.exports = VirtualNode

	var noProperties = {}
	var noChildren = []

	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null

	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks

	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }

	                hooks[propName] = property
	            }
	        }
	    }

	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0

	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }

	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }

	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }

	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}

	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(8)

	module.exports = VirtualText

	function VirtualText(text) {
	    this.text = String(text)
	}

	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27)
	var isHook = __webpack_require__(15)

	module.exports = diffProps

	function diffProps(a, b) {
	    var diff

	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {}
	            diff[aKey] = undefined
	        }

	        var aValue = a[aKey]
	        var bValue = b[aKey]

	        if (aValue === bValue) {
	            continue
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {}
	                diff[aKey] = bValue
	            } else if (isHook(bValue)) {
	                 diff = diff || {}
	                 diff[aKey] = bValue
	            } else {
	                var objectDiff = diffProps(aValue, bValue)
	                if (objectDiff) {
	                    diff = diff || {}
	                    diff[aKey] = objectDiff
	                }
	            }
	        } else {
	            diff = diff || {}
	            diff[aKey] = bValue
	        }
	    }

	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {}
	            diff[bKey] = b[bKey]
	        }
	    }

	    return diff
	}

	function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value)
	  } else if (value.__proto__) {
	    return value.__proto__
	  } else if (value.constructor) {
	    return value.constructor.prototype
	  }
	}


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(28)

	var VPatch = __webpack_require__(32)
	var isVNode = __webpack_require__(11)
	var isVText = __webpack_require__(16)
	var isWidget = __webpack_require__(3)
	var isThunk = __webpack_require__(14)
	var handleThunk = __webpack_require__(31)

	var diffProps = __webpack_require__(78)

	module.exports = diff

	function diff(a, b) {
	    var patch = { a: a }
	    walk(a, b, patch, 0)
	    return patch
	}

	function walk(a, b, patch, index) {
	    if (a === b) {
	        return
	    }

	    var apply = patch[index]
	    var applyClear = false

	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index)
	    } else if (b == null) {

	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index)
	            apply = patch[index]
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName &&
	                a.namespace === b.namespace &&
	                a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties)
	                if (propsPatch) {
	                    apply = appendPatch(apply,
	                        new VPatch(VPatch.PROPS, a, propsPatch))
	                }
	                apply = diffChildren(a, b, patch, apply, index)
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	                applyClear = true
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	            applyClear = true
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	            applyClear = true
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
	    }

	    if (apply) {
	        patch[index] = apply
	    }

	    if (applyClear) {
	        clearState(a, patch, index)
	    }
	}

	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children
	    var orderedSet = reorder(aChildren, b.children)
	    var bChildren = orderedSet.children

	    var aLen = aChildren.length
	    var bLen = bChildren.length
	    var len = aLen > bLen ? aLen : bLen

	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i]
	        var rightNode = bChildren[i]
	        index += 1

	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply,
	                    new VPatch(VPatch.INSERT, null, rightNode))
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index)
	        }

	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count
	        }
	    }

	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(
	            VPatch.ORDER,
	            a,
	            orderedSet.moves
	        ))
	    }

	    return apply
	}

	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index)
	    destroyWidgets(vNode, patch, index)
	}

	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(VPatch.REMOVE, vNode, null)
	            )
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children
	        var len = children.length
	        for (var i = 0; i < len; i++) {
	            var child = children[i]
	            index += 1

	            destroyWidgets(child, patch, index)

	            if (isVNode(child) && child.count) {
	                index += child.count
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}

	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b)
	    var thunkPatch = diff(nodes.a, nodes.b)
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
	    }
	}

	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true
	        }
	    }

	    return false
	}

	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(
	                    VPatch.PROPS,
	                    vNode,
	                    undefinedKeys(vNode.hooks)
	                )
	            )
	        }

	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children
	            var len = children.length
	            for (var i = 0; i < len; i++) {
	                var child = children[i]
	                index += 1

	                unhook(child, patch, index)

	                if (isVNode(child) && child.count) {
	                    index += child.count
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}

	function undefinedKeys(obj) {
	    var result = {}

	    for (var key in obj) {
	        result[key] = undefined
	    }

	    return result
	}

	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren)
	    var bKeys = bChildIndex.keys
	    var bFree = bChildIndex.free

	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }

	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren)
	    var aKeys = aChildIndex.keys
	    var aFree = aChildIndex.free

	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }

	    // O(MAX(N, M)) memory
	    var newChildren = []

	    var freeIndex = 0
	    var freeCount = bFree.length
	    var deletedItems = 0

	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0 ; i < aChildren.length; i++) {
	        var aItem = aChildren[i]
	        var itemIndex

	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key]
	                newChildren.push(bChildren[itemIndex])

	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++]
	                newChildren.push(bChildren[itemIndex])
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        }
	    }

	    var lastFreeIndex = freeIndex >= bFree.length ?
	        bChildren.length :
	        bFree[freeIndex]

	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j]

	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem)
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem)
	        }
	    }

	    var simulate = newChildren.slice()
	    var simulateIndex = 0
	    var removes = []
	    var inserts = []
	    var simulateItem

	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k]
	        simulateItem = simulate[simulateIndex]

	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null))
	            simulateItem = simulate[simulateIndex]
	        }

	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
	                        simulateItem = simulate[simulateIndex]
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({key: wantedItem.key, to: k})
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                            simulateIndex++
	                        }
	                    }
	                    else {
	                        inserts.push({key: wantedItem.key, to: k})
	                    }
	                }
	                else {
	                    inserts.push({key: wantedItem.key, to: k})
	                }
	                k++
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                removes.push(remove(simulate, simulateIndex, simulateItem.key))
	            }
	        }
	        else {
	            simulateIndex++
	            k++
	        }
	    }

	    // remove all the remaining nodes from simulate
	    while(simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex]
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
	    }

	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        }
	    }

	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    }
	}

	function remove(arr, index, key) {
	    arr.splice(index, 1)

	    return {
	        from: index,
	        key: key
	    }
	}

	function keyIndex(children) {
	    var keys = {}
	    var free = []
	    var length = children.length

	    for (var i = 0; i < length; i++) {
	        var child = children[i]

	        if (child.key) {
	            keys[child.key] = i
	        } else {
	            free.push(i)
	        }
	    }

	    return {
	        keys: keys,     // A hash of key name to index
	        free: free      // An array of unkeyed item indices
	    }
	}

	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch)
	        } else {
	            apply = [apply, patch]
	        }

	        return apply
	    } else {
	        return patch
	    }
	}


/***/ },
/* 80 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ])
});
;