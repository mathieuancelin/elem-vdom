!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.Elem=t():e.Elem=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="/assets/",t(0)}([function(e,t,n){e.exports=n(3)},,function(e,t,n){"use strict";function r(e){return isNaN(e=+e)?0:(e>0?h:f)(e)}function a(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}function i(e,t,n){return e[t]=n,e}function s(e){return y?function(t,n,r){return v.setDesc(t,n,a(e,r))}:i}function o(e){return null!==e&&("object"==typeof e||"function"==typeof e)}function u(e){return"function"==typeof e}function d(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}var _="undefined"!=typeof self?self:Function("return this")(),c={},l=Object.defineProperty,m={}.hasOwnProperty,f=Math.ceil,h=Math.floor,p=Math.max,M=Math.min,y=!!function(){try{return 2==l({},"a",{get:function(){return 2}}).a}catch(e){}}(),L=s(1),v=e.exports=n(51)({g:_,core:c,html:_.document&&document.documentElement,isObject:o,isFunction:u,that:function(){return this},toInteger:r,toLength:function(e){return e>0?M(r(e),9007199254740991):0},toIndex:function(e,t){return e=r(e),0>e?p(e+t,0):M(e,t)},has:function(e,t){return m.call(e,t)},create:Object.create,getProto:Object.getPrototypeOf,DESC:y,desc:a,getDesc:Object.getOwnPropertyDescriptor,setDesc:l,setDescs:Object.defineProperties,getKeys:Object.keys,getNames:Object.getOwnPropertyNames,getSymbols:Object.getOwnPropertySymbols,assertDefined:d,ES5Object:Object,toObject:function(e){return v.ES5Object(d(e))},hide:L,def:s(0),set:_.Symbol?i:L,each:[].forEach});"undefined"!=typeof __e&&(__e=c),"undefined"!=typeof __g&&(__g=_)},function(e,t,n){"use strict";function r(e){if(!e)return"";var t=[];for(var n in e)if("extend"!==n&&"mount"!==n&&"unmount"!==n&&"toString"!==n){var r=Y.dasherize(n);"className"===n&&(r="class");var a=e[n];a&&(g.isFunction(a)&&(a=a()),a&&t.push(r+": "+a+";"))}return t.join(" ")}function a(e){if(!e)return[];var t=[];for(var n in e){var r=e[n];r===!0&&t.push(Y.dasherize(n))}return t}function i(e,t,n){if(!e)return[];var i={ref:void 0};for(var s in e){var o=Y.dasherize(s);if("className"===s&&(o="class"),Y.startsWith(o,"on"))n[s]=e[s];else if("ref"===o)i.ref=e[s];else{var u=e[s];u&&g.isFunction(u)&&(u=u()),u&&(g.isObject(u)&&"style"===o?t.style=r(u):g.isArray(u)&&"class"===o?t[o]=u.join(" "):g.isObject(u)&&"class"===o?t[o]=a(u).join(" "):t[o]=u)}}return i}function s(e,t,n,r,a){var s=void 0,o=t||{},u=n||[],d=[];for(var _ in u){var c=u[_];c&&(g.isFunction(c)&&(c=c()),c&&(c instanceof S?d.push(c):g.isObject(c)&&c.__asHtml?(s=c.__asHtml,d.push(new x(""))):d.push(new x(c+""))))}if(u=d,g.isFunction(e)&&e.isElemComponentFactory){var l=g.clone(o);return l.children=u,l.key=r,l.namespace=a,e(o).renderTo()}if(g.isFunction(e)&&!e.isElemComponentFactory){var l=g.clone(o);l.children=u,l.key=r,l.namespace=a;var m=M({},J,{props:l,children:u});return e.bind(m)(J,l,u)}var f={attributes:{}},h=i(o,f.attributes,f);if(h.ref){var p=Y.uniqueId("elemref-");f.attributes["data-elemref"]=p,I[h.ref]=p}return s&&(f.innerHTML=s),new S(e,f,u,o.key,a)}function o(e){for(var t=arguments,n=!0;n;){var r=e;a=i=o=void 0,n=!1;var a=v(t);a=a.slice(1);var i=a.length,o=g.isString(r)?g.escape(r)||"unknown":r;if(0===i)return s(o,{},[],void 0,void 0);if(1===i&&g.isFunction(a[0]))t=[e=o,a[0]()],n=!0;else{if(1===i&&g.isArray(a[0]))return s(o,{},a[0],void 0,void 0);if(1===i&&g.isObject(a[0])&&a[0].__asHtml)return s(o,{},[a[0]],void 0,void 0);if(1===i&&g.isObject(a[0]))return s(o,a[0],[],void 0,void 0);if(1===i&&g.isString(a[0]))return s(o,{},[a[0]],void 0,void 0);if(2!==i||!g.isFunction(a[1]))return 2===i&&g.isObject(a[0])&&!g.isArray(a[1])?s(o,a[0],[a[1]],a[0].key,void 0):2===i&&g.isObject(a[0])&&g.isArray(a[1])?s(o,a[0],a[1],a[0].key,void 0):2===i&&g.isString(a[0])&&g.isObject(a[1])?s(o,a[1],[],a[1].key,a[0]):2!==i||!g.isString(a[0])||g.isObject(a[1])||g.isArray(a[1])?3===i&&(g.isUndefined(a[0])||g.isString(a[0]))&&g.isObject(a[1])&&!g.isArray(a[2])?s(o,a[1],[a[2]],a[1].key,a[0]):3===i&&(g.isUndefined(a[0])||g.isString(a[0]))&&g.isObject(a[1])&&g.isArray(a[2])?s(o,a[1],a[2],a[1].key,a[0]):(console.warn("Unknown el expression ...",t),s(o,a[1],a[2],a[1].key,a[0])):s(o,{},[a[1]],void 0,a[0]);t=[e=o,a[0],a[1]()],n=!0}}}function u(e){return o.apply(null,[e,j].concat(v(arguments).slice(1)))}function d(e){return o("span",{__asHtml:g.times(e||1,function(){return"&nbsp;"})})}function _(e){return o("span",{},e)}function c(e,t,n){var r={refs:n||{},state:{},refresh:e,redraw:e,getDOMNode:function(){var e=document;return t.ownerDocument&&(e=t.ownerDocument),g.isString(t)?e.querySelector(t):t}};return r.setState=function(t,n){for(var a in t)r.state[a]=t[a];e(),n&&n()},r.replaceState=function(t,n){r.state=t,e(),n&&n()},r}function l(e,t){var n=arguments;E.markStart("Elem.render");var r=t,a=e;g.isFunction(a)&&!function(){E.markStart("Elem.render.tree");var t={context:void 0,props:n[2]||{}},i=function(){try{var n=g.clone(I);I={},t.context.refs=n,J=t.context;var r=M({},t.context,{props:t.props});return e.bind(r)(t.context,t.props)}finally{J=void 0}},s=function(){var e=i();l(e,r)},o=g.clone(I);I={},t.context=c(s,r,o),a=i(),E.markStop("Elem.render.tree")}();var i=document;r.ownerDocument&&(i=r.ownerDocument),g.isString(r)&&(r=i.querySelector(r));var s=void 0;if(null!==r){s=r.rootId,s||(s=Y.uniqueId("data-rootid-"),r.rootId=s);var o=z[s];if(o){E.markStart("Elem.render.diff");var u=D(o.tree,a);E.markStop("Elem.render.diff"),E.markStart("Elem.render.patch");var d=b(o.rootNode,u);z[s]={tree:a,rootNode:d},E.markStop("Elem.render.patch")}else{E.markStart("Elem.render.create");var d=w(a);r.appendChild(d),z[s]={tree:a,rootNode:d},E.markStop("Elem.render.create")}}return E.markStop("Elem.render"),{unmount:function(){for(;!g.isUndefined(r)&&!g.isNull(r)&&r.firstChild;)r.removeChild(r.firstChild);delete z[s]}}}function m(e){return document.querySelector('[data-elemref="'+e+'"]')}function f(e){E.markStart("Elem.renderToJson");var t=e;if(g.isFunction(t)){var n=g.clone(I);I={};var r=c(function(){},null,n),a=M({},r,{props:arguments[1]||{}});t=t.bind(a)(r,arguments[1]||{})}var i=w(t,{document:k.createJsonDocument()}),s=i.render();return E.markStop("Elem.renderToJson"),s}function h(e){E.markStart("Elem.renderToString");var t=e;if(g.isFunction(t)){var n=g.clone(I);I={};var r=c(function(){},null,n),a=M({},r,{props:arguments[1]||{}});t=t.bind(a)(r,arguments[1]||{})}var i=w(t,{document:k.createStringDocument()}),s=i.render();return E.markStop("Elem.renderToString"),s}function p(e){var t={state:{},props:{},setState:function(){},replaceState:function(){},init:function(){},render:function(){},initialState:function(){return{}},defaultProps:function(){return{}}},n=function(n){var r=g.extend(g.clone(t),e);return{isElemComponent:!0,renderToString:function(){r.props=r.defaultProps.bind(r)()||n,r.state=r.initialState(),r.setState=r.state.set,r.replaceState=r.state.replace,r.setState=function(e,t){for(var n in e)r.state[n]=e[n];t&&t()},r.replaceState=function(e,t){r.state=e,t&&t()},r.getDOMNode=function(){return null},g.each(g.keys(r),function(e){"state"!==e&&g.isFunction(r[e])&&(r[e]=r[e].bind(r))}),r.init();var e=r.render();return h(e)},renderTo:function(e){return E.markStart("Elem.component.init"),r.props=r.defaultProps.bind(r)()||n,r.state=r.initialState(),r.setState=function(e,t){for(var n in e)r.state[n]=e[n];r.refresh(),t&&t()},r.replaceState=function(e,t){r.state=e,r.refresh(),t&&t()},r.getDOMNode=function(){var t=document;return e.ownerDocument&&(t=e.ownerDocument),g.isString(e)?t.querySelector(e):e},g.each(g.keys(r),function(e){"state"!==e&&g.isFunction(r[e])&&(r[e]=r[e].bind(r))}),r.refresh=function(){E.markStart("Elem.component.tree");var t=r.render();if(E.markStop("Elem.component.tree"),g.isUndefined(e))return t;E.markStart("Elem.component.render");var n=l(t,e);return E.markStop("Elem.component.render"),n},r.init(),E.markStop("Elem.component.init"),r.refresh()}}};return n.isElemComponentFactory=!0,n}var M=n(17)["default"],y=n(16)["default"],L=n(25)["default"],v=n(24)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.el=o,t.svg=u,t.nbsp=d,t.text=_,t.render=l,t.findDOMNode=m,t.renderToJson=f,t.renderToString=h,t.component=p;var Y=n(15),g={isFunction:n(12),isObject:n(4),isArray:n(11),isString:n(30),isUndefined:n(69),isNull:n(68),clone:function(e){return M({},e)},escape:n(73),extend:y,keys:L,each:function(e,t){return e.forEach(t)},times:Y.times},k=n(41),T=n(43),D=n(75),b=n(76),w=n(74),S=n(81),x=n(82),j="http://www.w3.org/2000/svg";t.svgNS=j;var O=T.registerWebComponent;t.registerWebComponent=O;var E=n(42);t.Perf=E;var P=Y.stylesheet;t.stylesheet=P;var W=Y.predicate;t.predicate=W;var A=Y.keyMirror;t.keyMirror=A;var N=Y.uuid;t.uuid=N;var H=Y.invariant;t.invariant=H;var F=Y.invariantLog;t.invariantLog=F;var C=n(14);t.Store=C;var z={},I={},J=void 0},function(e,t){function n(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}e.exports=n},,function(e,t){function n(e){return e&&"Widget"===e.type}e.exports=n},function(e,t){function n(e){return"number"==typeof e&&e>-1&&e%1==0&&r>=e}var r=9007199254740991;e.exports=n},function(e,t){e.exports="2"},function(e,t,n){function r(e,t){return function(){return e.apply(t,arguments)}}function a(e,t,n){var i,d,_,c,l=e&a.G,m=e&a.P,f=l?s:e&a.S?s[t]:(s[t]||{}).prototype,h=l?o:o[t]||(o[t]={});l&&(n=t);for(i in n)d=!(e&a.F)&&f&&i in f,d&&i in h||(_=d?f[i]:n[i],l&&!u(f[i])?c=n[i]:e&a.B&&d?c=r(_,s):e&a.W&&f[i]==_?!function(e){c=function(t){return this instanceof e?new e(t):e(t)},c.prototype=e.prototype}(_):c=m&&u(_)?r(Function.call,_):_,h[i]=c,m&&((h.prototype||(h.prototype={}))[i]=_))}var i=n(2),s=i.g,o=i.core,u=i.isFunction;a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,e.exports=a},function(e,t){function n(e){return!!e&&"object"==typeof e}e.exports=n},function(e,t,n){var r=n(28),a=n(7),i=n(10),s="[object Array]",o=Object.prototype,u=o.toString,d=r(Array,"isArray"),_=d||function(e){return i(e)&&a(e.length)&&u.call(e)==s};e.exports=_},function(e,t,n){function r(e){return a(e)&&o.call(e)==i}var a=n(4),i="[object Function]",s=Object.prototype,o=s.toString;e.exports=r},function(e,t,n){function r(e){return e&&"VirtualNode"===e.type&&e.version===a}var a=n(8);e.exports=r},function(e,t,n){"use strict";function r(){function e(e){l.push(e);var t=m;a.forEach(function(n){t[n.name]=n.getNewState(t[n.name],e)}),m=t,f.forEach(function(e){return e()})}function t(e){return f.push(e),function(){var t=f.indexOf(e);f.splice(t,1)}}var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=[];if(o.isObject(n))for(var i in n){var d=n[i];if(!o.isFunction(d))throw new Error("Store should be a function ...");var _=d.name||"substate-"+u++;a.push({getNewState:d,name:_})}else{if(!o.isFunction(n))throw new Error("Store should be a function or an object of functions ...");var c=n.name||"reducer";a=[{getNewState:n,name:c}]}var l=[],m=r,f=[];return e({type:"@@init"}),{dispatch:e,subscribe:t,setState:function(e){return m=e,f.forEach(function(e){return e()}),m},getState:function(){return s({},m)}}}function a(e,t){var n=arguments,r={},a=function(a){var i=e[a],s=i.name||"boundaction-"+u++;r[s]=function(){var e=i.apply(null,n);t(e)}};for(var i in e)a(i);return r}function i(e,t){var n=t.store,r=t.selector,i=t.actions,o=t.tree;o||(o=function(){return t.children});var u=s({},e);delete t.actions,delete t.tree,delete t.store,delete t.selector;var d=a(i,n.dispatch),_=s({},t,d,r(n.getState()),{actions:d});u.store=n,u.dispatch=n.dispatch;var c={unsubscribe:null};return c.unsubscribe=n.subscribe(function(){e.refresh(),c.unsubscribe()}),o(u,_)}var s=n(17)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.createStore=r,t.bindActionsToDispatch=a,t.Connector=i;var o={isFunction:n(12),isObject:n(4)},u=0},function(e,t,n){(function(e){"use strict";function r(){return void 0!==typeof self?self:void 0!==typeof e?e:void 0!==typeof window?window:new Function("return this")()}function a(e,t){for(var n=[],r=0;e>r;r++)n.push(t(e));return n}function i(e){var t=void 0;return function(){return t||(t=e()),t}}function s(e){var t=++v.__ElemInternals.Utils.__idCounter+"";return e?e+t:t}function o(e){return e.replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase().replace(/_/g,"-")}function u(e,t){return 0===e.indexOf(t)}function d(e,t){var n=t;n||(n="");var r={},a=void 0;if(!(e instanceof Object)||Array.isArray(e))throw new Error("keyMirror(...): Argument must be an object.");for(a in e)e.hasOwnProperty(a)&&(e[a]instanceof Object?r[a]=d(e[a],a+"."):r[a]=n+a);return r}function _(e,t){return L.isFunction(e)?e()===!0?t:void 0:e===!0?t:void 0}function c(e,t,n){for(var r=void 0,a=!1,i={},s=e;s.extend;)if(s.extend){var u=s.extend;delete s.extend,s=L.extend({},u,s)}var d=L.keys(s);return L.each(d,function(e){var t=s[e];if(L.isObject(t)){for(;t.extend;)if(t.extend){var n=t.extend;delete t.extend,t=L.extend({},n,t)}i[e]=L.extend({},{extend:function(e){return L.extend({},t,e)}},t)}}),i.extend=function(e){return L.extend({},s,e)},i.toString=function(e){return L.keys(i).filter(function(e){return"extend"!==e&&"mount"!==e&&"unmount"!==e&&"toString"!==e}).map(function(t){var n=i[t];return(e?".":"")+o(t)+" {\n"+L.keys(n).filter(function(e){return"extend"!==e}).map(function(e){return"    "+o(e)+": "+n[e]+";"}).join("\n")+"\n}"}).join("\n")},i.mount=function(e){return a||"undefined"==typeof document||(r=document.createElement("style"),t&&r.setAttribute("type",t),n&&r.setAttribute("media",n),r.innerHTML=i.toString(e),document.head.appendChild(r),a=!0),i},i.unmount=function(){return a&&"undefined"!=typeof document&&(r.parentNode.removeChild(r),a=!1),i},i}function l(){throw new Error("Not supported yet !!!")}function m(){var e=Date.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:7&n|8).toString(16)})}function f(e,t){var n=arguments;e||!function(){var e=y(n).slice(2),r=0;throw new Error("Violation : "+t.replace(/%s/g,function(){return e[r++]}))}()}function h(e,t){var n=arguments;e||!function(){var e=y(n).slice(2),r=0;console.error("Violation : "+t.replace(/%s/g,function(){return e[r++]}))}()}var p=n(16)["default"],M=n(25)["default"],y=n(24)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.times=a,t.memoize=i,t.uniqueId=s,t.dasherize=o,t.startsWith=u,t.keyMirror=d,t.predicate=_,t.stylesheet=c,t.NotSupported=l,t.uuid=m,t.invariant=f,t.invariantLog=h;var L={isFunction:n(12),isObject:n(4),extend:p,keys:M,each:function(e,t){return e.forEach(t)}},v=r()||{};"undefined"==typeof v&&(v={__fake:!0}),"undefined"==typeof v.console&&(v.console={log:function(){},error:function(){},table:function(){},debug:function(){},trace:function(){}}),v.__ElemInternals=v.__ElemInternals||{},v.__ElemInternals.Utils=v.__ElemInternals.Utils||{},v.__ElemInternals.Utils.__idCounter=v.__ElemInternals.Utils.__idCounter||0;var Y=i(r);t.memoGobalObject=Y}).call(t,function(){return this}())},function(e,t,n){e.exports={"default":n(46),__esModule:!0}},function(e,t,n){"use strict";var r=n(16)["default"];t["default"]=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.__esModule=!0},function(e,t,n){function r(e){return null!=e&&i(a(e))}var a=n(27),i=n(7);e.exports=r},function(e,t){function n(e,t){return e="number"==typeof e||r.test(e)?+e:-1,t=null==t?a:t,e>-1&&e%1==0&&t>e}var r=/^\d+$/,a=9007199254740991;e.exports=n},function(e,t){function n(e){return e&&"Thunk"===e.type}e.exports=n},function(e,t){function n(e){return e&&("function"==typeof e.hook&&!e.hasOwnProperty("hook")||"function"==typeof e.unhook&&!e.hasOwnProperty("unhook"))}e.exports=n},function(e,t,n){function r(e){return e&&"VirtualText"===e.type&&e.version===a}var a=n(8);e.exports=r},,function(e,t,n){e.exports={"default":n(45),__esModule:!0}},function(e,t,n){e.exports={"default":n(48),__esModule:!0}},function(e,t,n){function r(e,t,n){if(!e)throw TypeError(n?t+n:t)}var a=n(2);r.def=a.assertDefined,r.fn=function(e){if(!a.isFunction(e))throw TypeError(e+" is not a function!");return e},r.obj=function(e){if(!a.isObject(e))throw TypeError(e+" is not an object!");return e},r.inst=function(e,t,n){if(!(e instanceof t))throw TypeError(n+": use the 'new' operator!");return e},e.exports=r},function(e,t,n){var r=n(60),a=r("length");e.exports=a},function(e,t,n){function r(e,t){var n=null==e?void 0:e[t];return a(n)?n:void 0}var a=n(67);e.exports=r},function(e,t,n){function r(e){return i(e)&&a(e)&&o.call(e,"callee")&&!u.call(e,"callee")}var a=n(18),i=n(10),s=Object.prototype,o=s.hasOwnProperty,u=s.propertyIsEnumerable;e.exports=r},function(e,t,n){function r(e){return"string"==typeof e||a(e)&&o.call(e)==i}var a=n(10),i="[object String]",s=Object.prototype,o=s.toString;e.exports=r},function(e,t,n){(function(t){var r="undefined"!=typeof t?t:"undefined"!=typeof window?window:{},a=n(85);if("undefined"!=typeof document)e.exports=document;else{var i=r["__GLOBAL_DOCUMENT_CACHE@4"];i||(i=r["__GLOBAL_DOCUMENT_CACHE@4"]=a),e.exports=i}}).call(t,function(){return this}())},function(e,t){"use strict";e.exports=function(e){return"object"==typeof e&&null!==e}},function(e,t){function n(e){return"[object Array]"===a.call(e)}var r=Array.isArray,a=Object.prototype.toString;e.exports=r||n},function(e,t,n){function r(e,t,n){for(var r in t){var s=t[r];void 0===s?a(e,r,s,n):u(s)?(a(e,r,s,n),s.hook&&s.hook(e,r,n?n[r]:void 0)):o(s)?i(e,t,n,r,s):e[r]=s}}function a(e,t,n,r){if(r){var a=r[t];if(u(a))a.unhook&&a.unhook(e,t,n);else if("attributes"===t)for(var i in a)e.removeAttribute(i);else if("style"===t)for(var s in a)e.style[s]="";else"string"==typeof a?e[t]="":e[t]=null}}function i(e,t,n,r,a){var i=n?n[r]:void 0;if("attributes"!==r){if(i&&o(i)&&s(i)!==s(a))return void(e[r]=a);o(e[r])||(e[r]={});var u="style"===r?"":void 0;for(var d in a){var _=a[d];e[r][d]=void 0===_?u:_}}else for(var c in a){var l=a[c];void 0===l?e.removeAttribute(c):e.setAttribute(c,l)}}function s(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__?e.__proto__:e.constructor?e.constructor.prototype:void 0}var o=n(32),u=n(21);e.exports=r},function(e,t,n){function r(e,t){var n=t?t.document||a:a,_=t?t.warn:null;if(e=d(e).a,u(e))return e.init();if(o(e))return n.createTextNode(e.text);if(!s(e))return _&&_("Item is not a valid virtual dom node",e),null;var c=null===e.namespace?n.createElement(e.tagName):n.createElementNS(e.namespace,e.tagName),l=e.properties;i(c,l);for(var m=e.children,f=0;f<m.length;f++){var h=r(m[f],t);h&&c.appendChild(h)}return c}var a=n(31),i=n(34),s=n(13),o=n(22),u=n(6),d=n(36);e.exports=r},function(e,t,n){function r(e,t){var n=e,r=t;return u(t)&&(r=a(t,e)),u(e)&&(n=a(e,null)),{a:n,b:r}}function a(e,t){var n=e.vnode;if(n||(n=e.vnode=e.render(t)),!(i(n)||s(n)||o(n)))throw new Error("thunk did not return a valid node");return n}var i=n(13),s=n(22),o=n(6),u=n(20);e.exports=r},function(e,t,n){function r(e,t,n){this.type=Number(e),this.vNode=t,this.patch=n}var a=n(8);r.NONE=0,r.VTEXT=1,r.VNODE=2,r.WIDGET=3,r.PROPS=4,r.ORDER=5,r.INSERT=6,r.REMOVE=7,r.THUNK=8,e.exports=r,r.prototype.version=a,r.prototype.type="VirtualPatch"},,function(e,t,n){var r=n(26).fn;e.exports=function(e,t,n){if(r(e),~n&&void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,a){return e.call(t,n,r,a)}}return function(){return e.apply(t,arguments)}}},,function(e,t){"use strict";function n(){function e(e,t){var n=t||[],r=[];return{setAttribute:function(e,t){n.push({key:e,value:t})},removeAttribute:function(e){n=a.filter(n,function(t){return t.key!==e})},appendChild:function(e){r.push(e)},render:function(){var t=this;this.innerHTML&&!function(){var e=t.innerHTML;r.push({render:function(){return e}})}(),n=a.map(n,function(e){var t=e.key,n=e.value;return t+'="'+n+'"'});var i=0===r.length;return i?"<"+e+" "+n.join(" ")+" />":"<"+e+(n.length>0?" ":"")+n.join(" ")+">"+a.map(r,function(e){return e.render()}).join("")+"</"+e+">"}}}function t(t,n,r){return e(n,r,t)}function n(t,n){return e(t,n)}function r(e){return{render:function(){return e}}}return{createTextNode:r,createElementNS:t,createElement:n}}function r(){function e(e,t){var n=t||[],r=[];return{setAttribute:function(e,t){n.push({key:e,value:t})},removeAttribute:function(e){n=a.filter(n,function(t){return t.key!==e})},appendChild:function(e){r.push(e)},render:function(){var t=this;return this.innerHTML&&!function(){var e=t.innerHTML;r=[{render:function(){return e}}]}(),{name:e,attrs:n,children:a.map(r,function(e){return e.render()})}}}}function t(t,n,r){return e(n,r,t)}function n(t,n){return e(t,n)}function r(e){return{render:function(){return e}}}return{createTextNode:r,createElementNS:t,createElement:n}}Object.defineProperty(t,"__esModule",{value:!0}),t.createStringDocument=n,t.createJsonDocument=r;var a={map:function(e,t){return e.map(t)},filter:function(e,t){return e.filter(t)}}},function(e,t,n){"use strict";function r(){m=!0}function a(){m=!1}function i(e){m&&(e?f.mark(e+"_start"):f.mark(h))}function s(e){m&&(e?(f.mark(e+"_stop"),f.measure(e,e+"_start",e+"_stop"),_.contains(y,e)||y.push(e)):(f.mark(p),f.measure(M,h,p)))}function o(){if(!m)return[];var e=[];return _.each(y,function(t){e=e.concat(f.getEntriesByName(t))}),f.clearMarks(),f.clearMeasures(),y=[M],e}function u(){m&&console.table(o().map(function(e){return{name:e.name,duration:e.duration,entryType:e.entryType,startTime:e.startTime}}))}function d(e,t){i(e);try{t()}finally{s(e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.start=r,t.stop=a,t.markStart=i,t.markStop=s,t.collectMeasures=o,t.printMeasures=u,t.mark=d;var _={each:function(e,t){return e.forEach(t)},contains:n(57)},c=n(15),l=c.memoGobalObject(),m=!1,f={mark:function(){},measure:function(){},getEntriesByName:function(){return[]},getEntriesByType:function(){return[]},clearMarks:function(){},clearMeasures:function(){}};"undefined"!=typeof l.performance&&"undefined"!=typeof l.performance.mark&&"undefined"!=typeof l.performance.measure&&(f=l.performance);var h="ElemMeasureStart",p="ElemMeasureStop",M="ElemComponentRenderingMeasure",y=[M]},function(e,t,n){"use strict";function r(e,t){function n(e,n){return t.isElemComponentFactory?t(e).renderTo(n):i.render(t,n,e)}console.log("registering WebComponent "+e);var r=document,u=a(HTMLElement.prototype);u.createdCallback=function(){var e={};for(var t in this.attributes){var a=this.attributes[t];e[a.name]=a.value}this.props=e,this.fragment=r.createElement("content"),this.fragment.setAttribute("id",s.uuid()),this.appendChild(this.fragment),this.renderedElement=n(e,this.fragment)},u.attributeChangedCallback=function(e,t,r){this.props[e]=r,n(this.props,this.fragment)},o(e,{prototype:u})}var a=n(44)["default"],i=n(3),s=n(15),o=void 0;try{o=(document.registerElement||document.register).bind(document)}catch(u){}o?t.registerWebComponent=r:t.registerWebComponent=function(){window.console&&console.error("[Elem] WebComponent not available here :(")}},function(e,t,n){e.exports={"default":n(47),__esModule:!0}},function(e,t,n){n(56),e.exports=n(2).core.Array.slice},function(e,t,n){n(54),e.exports=n(2).core.Object.assign},function(e,t,n){var r=n(2);e.exports=function(e,t){return r.create(e,t)}},function(e,t,n){n(55),e.exports=n(2).core.Object.keys},function(e,t,n){var r=n(2),a=n(50);e.exports=Object.assign||function(e,t){for(var n=Object(r.assertDefined(e)),i=arguments.length,s=1;i>s;)for(var o,u=r.ES5Object(arguments[s++]),d=a(u),_=d.length,c=0;_>c;)n[o=d[c++]]=u[o];return n}},function(e,t,n){var r=n(2);e.exports=function(e){var t=r.getKeys(e),n=r.getDesc,a=r.getSymbols;return a&&r.each.call(a(e),function(r){n(e,r).enumerable&&t.push(r)}),t}},function(e,t){e.exports=function(e){return e.FW=!1,e.path=e.core,e}},function(e,t,n){function r(e){try{return s(e)}catch(t){return o.slice()}}var a=n(2),i={}.toString,s=a.getNames,o="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.get=function(e){return o&&"[object Window]"==i.call(e)?r(e):s(a.toObject(e))}},,function(e,t,n){var r=n(9);r(r.S,"Object",{assign:n(49)})},function(e,t,n){var r=n(2),a=n(9),i=r.isObject,s=r.toObject;r.each.call("freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames".split(","),function(e,t){var o=(r.core.Object||{})[e]||Object[e],u=0,d={};d[e]=0==t?function(e){return i(e)?o(e):e}:1==t?function(e){return i(e)?o(e):e}:2==t?function(e){return i(e)?o(e):e}:3==t?function(e){return i(e)?o(e):!0}:4==t?function(e){return i(e)?o(e):!0}:5==t?function(e){return i(e)?o(e):!1}:6==t?function(e,t){return o(s(e),t)}:7==t?function(e){return o(Object(r.assertDefined(e)))}:8==t?function(e){return o(s(e))}:n(52).get;try{o("z")}catch(_){u=1}a(a.S+a.F*u,"Object",d)})},function(e,t,n){function r(e,t){a.each.call(e.split(","),function(e){void 0==t&&e in s?o[e]=s[e]:e in[]&&(o[e]=n(39)(Function.call,[][e],t))})}var a=n(2),i=n(9),s=a.core.Array||Array,o={};r("pop,reverse,shift,keys,values,entries",1),r("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),r("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill,turn"),i(i.S,"Array",o)},function(e,t,n){e.exports=n(58)},function(e,t,n){function r(e,t,n,r){var l=e?i(e):0;return u(l)||(e=_(e),l=e.length),n="number"!=typeof n||r&&o(t,n,r)?0:0>n?c(l+n,0):n||0,"string"==typeof e||!s(e)&&d(e)?l>=n&&e.indexOf(t,n)>-1:!!l&&a(e,t,n)>-1}var a=n(59),i=n(27),s=n(11),o=n(65),u=n(7),d=n(30),_=n(72),c=Math.max;e.exports=r},function(e,t,n){function r(e,t,n){if(t!==t)return a(e,n);for(var r=n-1,i=e.length;++r<i;)if(e[r]===t)return r;return-1}var a=n(64);e.exports=r},function(e,t){function n(e){return function(t){return null==t?void 0:t[e]}}e.exports=n},function(e,t){function n(e){return null==e?"":e+""}e.exports=n},function(e,t){function n(e,t){for(var n=-1,r=t.length,a=Array(r);++n<r;)a[n]=e[t[n]];return a}e.exports=n},function(e,t){function n(e){return r[e]}var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};e.exports=n},function(e,t){function n(e,t,n){for(var r=e.length,a=t+(n?0:-1);n?a--:++a<r;){var i=e[a];if(i!==i)return a}return-1}e.exports=n},function(e,t,n){function r(e,t,n){if(!s(n))return!1;var r=typeof t;if("number"==r?a(n)&&i(t,n.length):"string"==r&&t in n){var o=n[t];return e===e?e===o:o!==o}return!1}var a=n(18),i=n(19),s=n(4);e.exports=r},function(e,t,n){function r(e){for(var t=u(e),n=t.length,r=n&&e.length,d=!!r&&o(r)&&(i(e)||a(e)),c=-1,l=[];++c<n;){var m=t[c];(d&&s(m,r)||_.call(e,m))&&l.push(m)}return l}var a=n(29),i=n(11),s=n(19),o=n(7),u=n(71),d=Object.prototype,_=d.hasOwnProperty;e.exports=r},function(e,t,n){function r(e){return null==e?!1:a(e)?_.test(u.call(e)):i(e)&&s.test(e)}var a=n(12),i=n(10),s=/^\[object .+?Constructor\]$/,o=Object.prototype,u=Function.prototype.toString,d=o.hasOwnProperty,_=RegExp("^"+u.call(d).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=r},function(e,t){function n(e){return null===e}e.exports=n},function(e,t){function n(e){return void 0===e}e.exports=n},function(e,t,n){var r=n(28),a=n(18),i=n(4),s=n(66),o=r(Object,"keys"),u=o?function(e){var t=null==e?void 0:e.constructor;return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&a(e)?s(e):i(e)?o(e):[]}:s;e.exports=u},function(e,t,n){function r(e){if(null==e)return[];u(e)||(e=Object(e));var t=e.length;t=t&&o(t)&&(i(e)||a(e))&&t||0;for(var n=e.constructor,r=-1,d="function"==typeof n&&n.prototype===e,c=Array(t),l=t>0;++r<t;)c[r]=r+"";for(var m in e)l&&s(m,t)||"constructor"==m&&(d||!_.call(e,m))||c.push(m);return c}var a=n(29),i=n(11),s=n(19),o=n(7),u=n(4),d=Object.prototype,_=d.hasOwnProperty;e.exports=r},function(e,t,n){function r(e){return a(e,i(e))}var a=n(62),i=n(70);e.exports=r},function(e,t,n){function r(e){return e=a(e),e&&o.test(e)?e.replace(s,i):e}var a=n(61),i=n(63),s=/[&<>"'`]/g,o=RegExp(s.source);e.exports=r},function(e,t,n){var r=n(35);e.exports=r},function(e,t,n){var r=n(84);e.exports=r},function(e,t,n){var r=n(79);e.exports=r},function(e,t){function n(e,t,n,a){return n&&0!==n.length?(n.sort(i),r(e,t,n,a,0)):{}}function r(e,t,n,i,o){if(i=i||{},e){a(n,o,o)&&(i[o]=e);var u=t.children;if(u)for(var d=e.childNodes,_=0;_<t.children.length;_++){o+=1;var c=u[_]||s,l=o+(c.count||0);a(n,o,l)&&r(d[_],c,n,i,o),o=l}}return i}function a(e,t,n){if(0===e.length)return!1;for(var r,a,i=0,s=e.length-1;s>=i;){if(r=(s+i)/2>>0,a=e[r],i===s)return a>=t&&n>=a;if(t>a)i=r+1;else{if(!(a>n))return!0;s=r-1}}return!1}function i(e,t){return e>t?1:-1}var s={};e.exports=n},function(e,t,n){function r(e,t,n){var r=e.type,d=e.vNode,m=e.patch;switch(r){case f.REMOVE:return a(t,d);case f.INSERT:return i(t,m,n);case f.VTEXT:return s(t,d,m,n);case f.WIDGET:return o(t,d,m,n);case f.VNODE:return u(t,d,m,n);case f.ORDER:return _(t,m),t;case f.PROPS:return l(t,m,d.properties),t;case f.THUNK:return c(t,n.patch(t,m,n));default:return t}}function a(e,t){var n=e.parentNode;return n&&n.removeChild(e),d(e,t),null}function i(e,t,n){var r=h(t,n);return e&&e.appendChild(r),e}function s(e,t,n,r){var a;if(3===e.nodeType)e.replaceData(0,e.length,n.text),a=e;else{var i=e.parentNode;a=h(n,r),i&&a!==e&&i.replaceChild(a,e)}return a}function o(e,t,n,r){var a,i=p(t,n);a=i?n.update(t,e)||e:h(n,r);var s=e.parentNode;return s&&a!==e&&s.replaceChild(a,e),i||d(e,t),a}function u(e,t,n,r){var a=e.parentNode,i=h(n,r);return a&&i!==e&&a.replaceChild(i,e),i}function d(e,t){"function"==typeof t.destroy&&m(t)&&t.destroy(e)}function _(e,t){for(var n,r,a,i=e.childNodes,s={},o=0;o<t.removes.length;o++)r=t.removes[o],n=i[r.from],r.key&&(s[r.key]=n),e.removeChild(n);for(var u=i.length,d=0;d<t.inserts.length;d++)a=t.inserts[d],n=s[a.key],e.insertBefore(n,a.to>=u++?null:i[a.to])}function c(e,t){return e&&t&&e!==t&&e.parentNode&&e.parentNode.replaceChild(t,e),t}var l=n(34),m=n(6),f=n(37),h=n(35),p=n(80);e.exports=r},function(e,t,n){function r(e,t){return a(e,t)}function a(e,t,n){var r=s(t);if(0===r.length)return e;var u=d(e,t.a,r),_=e.ownerDocument;n||(n={patch:a},_!==o&&(n.document=_));for(var c=0;c<r.length;c++){var l=r[c];e=i(e,u[l],t[l],n)}return e}function i(e,t,n,r){if(!t)return e;var a;if(u(n))for(var i=0;i<n.length;i++)a=_(n[i],t,r),t===e&&(e=a);else a=_(n,t,r),t===e&&(e=a);return e}function s(e){var t=[];for(var n in e)"a"!==n&&t.push(Number(n));return t}var o=n(31),u=n(33),d=n(77),_=n(78);e.exports=r},function(e,t,n){function r(e,t){return a(e)&&a(t)?"name"in e&&"name"in t?e.id===t.id:e.init===t.init:!1}var a=n(6);e.exports=r},function(e,t,n){function r(e,t,n,r,a){this.tagName=e,this.properties=t||d,this.children=n||_,this.key=null!=r?String(r):void 0,this.namespace="string"==typeof a?a:null;var c,l=n&&n.length||0,m=0,f=!1,h=!1,p=!1;for(var M in t)if(t.hasOwnProperty(M)){var y=t[M];u(y)&&y.unhook&&(c||(c={}),c[M]=y)}for(var L=0;l>L;L++){var v=n[L];i(v)?(m+=v.count||0,!f&&v.hasWidgets&&(f=!0),!h&&v.hasThunks&&(h=!0),p||!v.hooks&&!v.descendantHooks||(p=!0)):!f&&s(v)?"function"==typeof v.destroy&&(f=!0):!h&&o(v)&&(h=!0)}this.count=l+m,this.hasWidgets=f,this.hasThunks=h,this.hooks=c,this.descendantHooks=p}var a=n(8),i=n(13),s=n(6),o=n(20),u=n(21);e.exports=r;var d={},_=[];r.prototype.version=a,r.prototype.type="VirtualNode"},function(e,t,n){function r(e){this.text=String(e)}var a=n(8);e.exports=r,r.prototype.version=a,r.prototype.type="VirtualText"},function(e,t,n){function r(e,t){var n;for(var o in e){o in t||(n=n||{},n[o]=void 0);var u=e[o],d=t[o];if(u!==d)if(i(u)&&i(d))if(a(d)!==a(u))n=n||{},n[o]=d;else if(s(d))n=n||{},
n[o]=d;else{var _=r(u,d);_&&(n=n||{},n[o]=_)}else n=n||{},n[o]=d}for(var c in t)c in e||(n=n||{},n[c]=t[c]);return n}function a(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__?e.__proto__:e.constructor?e.constructor.prototype:void 0}var i=n(32),s=n(21);e.exports=r},function(e,t,n){function r(e,t){var n={a:e};return a(e,t,n,0),n}function a(e,t,n,r){if(e!==t){var a=n[r],o=!1;if(Y(e)||Y(t))u(e,t,n,r);else if(null==t)v(e)||(s(e,n,r),a=n[r]),a=h(a,new M(M.REMOVE,e,t));else if(y(t))if(y(e))if(e.tagName===t.tagName&&e.namespace===t.namespace&&e.key===t.key){var d=k(e.properties,t.properties);d&&(a=h(a,new M(M.PROPS,e,d))),a=i(e,t,n,a,r)}else a=h(a,new M(M.VNODE,e,t)),o=!0;else a=h(a,new M(M.VNODE,e,t)),o=!0;else L(t)?L(e)?e.text!==t.text&&(a=h(a,new M(M.VTEXT,e,t))):(a=h(a,new M(M.VTEXT,e,t)),o=!0):v(t)&&(v(e)||(o=!0),a=h(a,new M(M.WIDGET,e,t)));a&&(n[r]=a),o&&s(e,n,r)}}function i(e,t,n,r,i){for(var s=e.children,o=l(s,t.children),u=o.children,d=s.length,_=u.length,c=d>_?d:_,m=0;c>m;m++){var f=s[m],p=u[m];i+=1,f?a(f,p,n,i):p&&(r=h(r,new M(M.INSERT,null,p))),y(f)&&f.count&&(i+=f.count)}return o.moves&&(r=h(r,new M(M.ORDER,e,o.moves))),r}function s(e,t,n){_(e,t,n),o(e,t,n)}function o(e,t,n){if(v(e))"function"==typeof e.destroy&&(t[n]=h(t[n],new M(M.REMOVE,e,null)));else if(y(e)&&(e.hasWidgets||e.hasThunks))for(var r=e.children,a=r.length,i=0;a>i;i++){var s=r[i];n+=1,o(s,t,n),y(s)&&s.count&&(n+=s.count)}else Y(e)&&u(e,null,t,n)}function u(e,t,n,a){var i=g(e,t),s=r(i.a,i.b);d(s)&&(n[a]=new M(M.THUNK,null,s))}function d(e){for(var t in e)if("a"!==t)return!0;return!1}function _(e,t,n){if(y(e)){if(e.hooks&&(t[n]=h(t[n],new M(M.PROPS,e,c(e.hooks)))),e.descendantHooks||e.hasThunks)for(var r=e.children,a=r.length,i=0;a>i;i++){var s=r[i];n+=1,_(s,t,n),y(s)&&s.count&&(n+=s.count)}}else Y(e)&&u(e,null,t,n)}function c(e){var t={};for(var n in e)t[n]=void 0;return t}function l(e,t){var n=f(t),r=n.keys,a=n.free;if(a.length===t.length)return{children:t,moves:null};var i=f(e),s=i.keys,o=i.free;if(o.length===e.length)return{children:t,moves:null};for(var u=[],d=0,_=a.length,c=0,l=0;l<e.length;l++){var h,p=e[l];p.key?r.hasOwnProperty(p.key)?(h=r[p.key],u.push(t[h])):(h=l-c++,u.push(null)):_>d?(h=a[d++],u.push(t[h])):(h=l-c++,u.push(null))}for(var M=d>=a.length?t.length:a[d],y=0;y<t.length;y++){var L=t[y];L.key?s.hasOwnProperty(L.key)||u.push(L):y>=M&&u.push(L)}for(var v,Y=u.slice(),g=0,k=[],T=[],D=0;D<t.length;){var b=t[D];for(v=Y[g];null===v&&Y.length;)k.push(m(Y,g,null)),v=Y[g];v&&v.key===b.key?(g++,D++):b.key?(v&&v.key&&r[v.key]!==D+1?(k.push(m(Y,g,v.key)),v=Y[g],v&&v.key===b.key?g++:T.push({key:b.key,to:D})):T.push({key:b.key,to:D}),D++):v&&v.key&&k.push(m(Y,g,v.key))}for(;g<Y.length;)v=Y[g],k.push(m(Y,g,v&&v.key));return k.length!==c||T.length?{children:u,moves:{removes:k,inserts:T}}:{children:u,moves:null}}function m(e,t,n){return e.splice(t,1),{from:t,key:n}}function f(e){for(var t={},n=[],r=e.length,a=0;r>a;a++){var i=e[a];i.key?t[i.key]=a:n.push(a)}return{keys:t,free:n}}function h(e,t){return e?(p(e)?e.push(t):e=[e,t],e):t}var p=n(33),M=n(37),y=n(13),L=n(22),v=n(6),Y=n(20),g=n(36),k=n(83);e.exports=r},function(e,t){}])});