!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.Elem=t():e.Elem=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/assets/",t(0)}([function(e,t,n){e.exports=n(27)},function(e,t){var n=Object;e.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(e,t){var n=e.exports={};"number"==typeof __e&&(__e=n)},function(e,t){function n(e){return e&&"Widget"===e.type}e.exports=n},function(e,t){"use strict";t["default"]=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t},t.__esModule=!0},function(e,t){e.exports="2"},function(e,t,n){(function(e){"use strict";function r(){return"undefined"!=typeof e?e:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")()}function o(e){var t=void 0;return function(){return t||(t=e()),t}}function i(e){var t=++O.__ElemInternals.Utils.__idCounter+"";return e?e+t:t}function u(e){return e.replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase().replace(/_/g,"-")}function a(e,t){return 0===e.indexOf(t)}function s(e,t){var n=t;n||(n="");var r={},o=void 0;if(!(e instanceof Object)||Array.isArray(e))throw new Error("keyMirror(...): Argument must be an object.");for(o in e)e.hasOwnProperty(o)&&(e[o]instanceof Object?r[o]=s(e[o],o+"."):r[o]=n+o);return r}function c(e,t){return k.isFunction(e)?e()===!0?t:void 0:e===!0?t:void 0}function f(e,t){var n=y({},e,t);return n.extend=function(e){return f(n,e)},n}function l(e,t,n){for(var o=void 0,i=!1,a={},s=e;s.extend;)if(s.extend){var c=s.extend;delete s.extend,s=y({},c,s)}var l=x(s);return l.forEach(function(e){var t=s[e];if(k.isObject(t)){for(;t.extend;)if(t.extend){var n=t.extend;delete t.extend,t=y({},n,t)}a[e]=y({},{extend:function(e){return f(t,e)}},t)}}),a.extend=function(e){return f(s,e)},a.toString=function(e){return x(a).filter(function(e){return"extend"!==e&&"mount"!==e&&"unmount"!==e&&"toString"!==e}).map(function(t){var n=a[t];return(e?".":"")+u(t)+" {\n"+x(n).filter(function(e){return"extend"!==e}).map(function(e){return"    "+u(e)+": "+n[e]+";"}).join("\n")+"\n}"}).join("\n")},a.mount=function(e){return i||"undefined"==typeof r().document||(o=r().document.createElement("style"),t&&o.setAttribute("type",t),n&&o.setAttribute("media",n),o.innerHTML=a.toString(e),r().document.head.appendChild(o),i=!0),a},a.unmount=function(){return i&&"undefined"!=typeof r().document&&(o.parentNode.removeChild(o),i=!1),a},a}function d(){throw new Error("Not supported yet !!!")}function p(){var e=Date.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:7&n|8).toString(16)})}function v(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];e||!function(){var e=0;throw new Error("Violation : "+t.replace(/%s/g,function(){return r[e++]}))}()}function h(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];e||!function(){var e=0;console.error("Violation : "+t.replace(/%s/g,function(){return r[e++]}))}()}function m(e){return!!e&&("object"==typeof e||"function"==typeof e)}function g(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=null===e?"":""+e;return N.test(t)?t.replace(C,function(e){return E[e]}):t}var y=n(10)["default"],x=n(33)["default"],b=n(15)["default"],_=n(4)["default"];t.__esModule=!0,t.getGlobalObject=r,t.memoize=o,t.uniqueId=i,t.dasherize=u,t.startsWith=a,t.keyMirror=s,t.predicate=c,t.stylesheet=l,t.NotSupported=d,t.uuid=p,t.invariant=v,t.invariantLog=h,t.isObject=m,t.escape=g;var S=n(6),k=_(S),O=r()||{};"undefined"==typeof O&&(O={__fake:!0}),"undefined"==typeof O.console&&(O.console={log:function(){},error:function(){},table:function(){},debug:function(){},trace:function(){}}),O.__ElemInternals=O.__ElemInternals||{},O.__ElemInternals.Utils=O.__ElemInternals.Utils||{},O.__ElemInternals.Utils.__idCounter=O.__ElemInternals.Utils.__idCounter||0;var w=o(r);t.memoGobalObject=w;var E={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j="(?:"+x(E).join("|")+")",N=RegExp(j),C=RegExp(j,"g"),M=Array.isArray;t.isArray=M;var T=function(e){return void 0===e};t.isUndefined=T;var A=b;t.contains=A;var P=function(e){return m(e)&&"[object Function]"==Object.prototype.toString.call(e)};t.isFunction=P;var D=function(e){return"string"==typeof e||!!e&&"object"==typeof e&&"[object String]"==Object.prototype.toString.call(e)};t.isString=D}).call(t,function(){return this}())},function(e,t,n){function r(e,t){return function(){return e.apply(t,arguments)}}function o(e,t,n){var s,c,f,l,d=e&o.G,p=e&o.P,v=d?i:e&o.S?i[t]:(i[t]||{})[a],h=d?u:u[t]||(u[t]={});d&&(n=t);for(s in n)c=!(e&o.F)&&v&&s in v,c&&s in h||(f=c?v[s]:n[s],d&&"function"!=typeof v[s]?l=n[s]:e&o.B&&c?l=r(f,i):e&o.W&&v[s]==f?!function(e){l=function(t){return this instanceof e?new e(t):e(t)},l[a]=e[a]}(f):l=p&&"function"==typeof f?r(Function.call,f):f,h[s]=l,p&&((h[a]||(h[a]={}))[s]=f))}var i=n(51),u=n(2),a="prototype";o.F=1,o.G=2,o.S=4,o.P=8,o.B=16,o.W=32,e.exports=o},function(e,t,n){var r=n(17),o=n(48);e.exports=function(e,t){return(t?Object:r)(o(e))}},function(e,t,n){function r(e){return e&&"VirtualNode"===e.type&&e.version===o}var o=n(5);e.exports=r},function(e,t,n){e.exports={"default":n(38),__esModule:!0}},function(e,t,n){var r=n(1),o=n(2),i=n(7),u=n(8),a=n(52);r.each.call("freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames".split(","),function(e,t){var r=(o.Object||{})[e]||Object[e],s=0,c={};c[e]=0==t?function(e){return a(e)?r(e):e}:1==t?function(e){return a(e)?r(e):e}:2==t?function(e){return a(e)?r(e):e}:3==t?function(e){return a(e)?r(e):!0}:4==t?function(e){return a(e)?r(e):!0}:5==t?function(e){return a(e)?r(e):!1}:6==t?function(e,t){return r(u(e),t)}:7==t?function(e){return r(u(e,!0))}:8==t?function(e){return r(u(e))}:n(50).get;try{r("z")}catch(f){s=1}i(i.S+i.F*s,"Object",c)})},function(e,t){function n(e){return e&&"Thunk"===e.type}e.exports=n},function(e,t){function n(e){return e&&("function"==typeof e.hook&&!e.hasOwnProperty("hook")||"function"==typeof e.unhook&&!e.hasOwnProperty("unhook"))}e.exports=n},function(e,t,n){function r(e){return e&&"VirtualText"===e.type&&e.version===o}var o=n(5);e.exports=r},function(e,t,n){e.exports={"default":n(37),__esModule:!0}},function(e,t,n){"use strict";var r=n(10)["default"];t["default"]=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.__esModule=!0},function(e,t,n){var r=n(47),o=Object;e.exports=0 in o("z")?o:function(e){return"String"==r(e)?e.split(""):o(e)}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){(function(t){var r="undefined"!=typeof t?t:"undefined"!=typeof window?window:{},o=n(77);if("undefined"!=typeof document)e.exports=document;else{var i=r["__GLOBAL_DOCUMENT_CACHE@4"];i||(i=r["__GLOBAL_DOCUMENT_CACHE@4"]=o),e.exports=i}}).call(t,function(){return this}())},function(e,t){"use strict";e.exports=function(e){return"object"==typeof e&&null!==e}},function(e,t){function n(e){return"[object Array]"===o.call(e)}var r=Array.isArray,o=Object.prototype.toString;e.exports=r||n},function(e,t,n){function r(e,t,n){for(var r in t){var u=t[r];void 0===u?o(e,r,u,n):s(u)?(o(e,r,u,n),u.hook&&u.hook(e,r,n?n[r]:void 0)):a(u)?i(e,t,n,r,u):e[r]=u}}function o(e,t,n,r){if(r){var o=r[t];if(s(o))o.unhook&&o.unhook(e,t,n);else if("attributes"===t)for(var i in o)e.removeAttribute(i);else if("style"===t)for(var u in o)e.style[u]="";else"string"==typeof o?e[t]="":e[t]=null}}function i(e,t,n,r,o){var i=n?n[r]:void 0;if("attributes"!==r){if(i&&a(i)&&u(i)!==u(o))return void(e[r]=o);a(e[r])||(e[r]={});var s="style"===r?"":void 0;for(var c in o){var f=o[c];e[r][c]=void 0===f?s:f}}else for(var l in o){var d=o[l];void 0===d?e.removeAttribute(l):e.setAttribute(l,d)}}function u(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__?e.__proto__:e.constructor?e.constructor.prototype:void 0}var a=n(20),s=n(13);e.exports=r},function(e,t,n){function r(e,t){var n=t?t.document||o:o,f=t?t.warn:null;if(e=c(e).a,s(e))return e.init();if(a(e))return n.createTextNode(e.text);if(!u(e))return f&&f("Item is not a valid virtual dom node",e),null;var l=null===e.namespace?n.createElement(e.tagName):n.createElementNS(e.namespace,e.tagName),d=e.properties;i(l,d);for(var p=e.children,v=0;v<p.length;v++){var h=r(p[v],t);h&&l.appendChild(h)}return l}var o=n(19),i=n(22),u=n(9),a=n(14),s=n(3),c=n(24);e.exports=r},function(e,t,n){function r(e,t){var n=e,r=t;return s(t)&&(r=o(t,e)),s(e)&&(n=o(e,null)),{a:n,b:r}}function o(e,t){var n=e.vnode;if(n||(n=e.vnode=e.render(t)),!(i(n)||u(n)||a(n)))throw new Error("thunk did not return a valid node");return n}var i=n(9),u=n(14),a=n(3),s=n(12);e.exports=r},function(e,t,n){function r(e,t,n){this.type=Number(e),this.vNode=t,this.patch=n}var o=n(5);r.NONE=0,r.VTEXT=1,r.VNODE=2,r.WIDGET=3,r.PROPS=4,r.ORDER=5,r.INSERT=6,r.REMOVE=7,r.THUNK=8,e.exports=r,r.prototype.version=o,r.prototype.type="VirtualPatch"},function(e,t){"use strict";t.__esModule=!0,t["default"]={markStart:function(){},markStop:function(){}},e.exports=t["default"]},function(e,t,n){"use strict";function r(e){for(;!N.isUndefined(e)&&!b(e,null)&&e.firstChild;)e.removeChild(e.firstChild)}function o(e){if(!e)return"";var t=[];for(var n in e)if("extend"!==n&&"mount"!==n&&"unmount"!==n&&"toString"!==n){var r=N.dasherize(n);"className"===n&&(r="class");var o=e[n];o&&(N.isFunction(o)&&(o=o()),o&&t.push(r+": "+o+";"))}return t.join(" ")}function i(e){if(!e)return[];var t=[];for(var n in e){var r=e[n];r===!0&&t.push(N.dasherize(n))}return t}function u(e,t,n){if(!e)return[];var r={ref:void 0};for(var u in e){var a=N.dasherize(u);if("className"===u&&(a="class"),N.startsWith(a,"on"))n[u.toLowerCase()]=e[u];else if("ref"===a)r.ref=e[u];else{var s=e[u];s&&N.isFunction(s)&&(s=s()),s&&(N.isObject(s)&&"style"===a?t.style=o(s):N.isArray(s)&&"class"===a?t[a]=s.join(" "):N.isObject(s)&&"class"===a?t[a]=i(s).join(" "):t[a]=s)}}return r}function a(e,t,n,r,o){void 0===t&&(t={}),void 0===n&&(n=[]);var i=void 0,a=n,s=[];for(var c in a){var f=a[c];f&&(N.isFunction(f)&&(f=f()),f&&(f instanceof z["default"]?s.push(f):N.isObject(f)&&f.__asHtml?(i=f.__asHtml,s.push(new B["default"](""))):s.push(new B["default"](f+""))))}if(a=s,N.isFunction(e)&&e.isElemComponentFactory){var l=x({},t);return l.children=a,l.key=r,l.namespace=o,e(t).renderTo()}if(N.isFunction(e)&&!e.isElemComponentFactory){var d,p=function(){var n="Elem.function."+(e.name||"<anonymous function>")+".tree";A.markStart(n);var i=x({},t);i.children=a,i.key=r,i.namespace=o;var u=x({},ee);r&&!function(){u.__keys.push(r),i.initialState&&!u.state["substateof-"+r]&&u.__internalSetState((d={},d["substateof-"+r]=x({},i.initialState),d));var e=u.setState,t=u.replaceState,n=u.state;u.globalState=n,u.setGlobalState=e,u.replaceGlobalState=t,u.state=n["substateof-"+r]||{},u.replaceState=function(t,n){var o;return e((o={},o["substateof-"+r]=L["default"],o),n)},u.setState=function(t,o){var i,u=n["substateof-"+r]||{};for(var a in t)u[a]=t[a];e((i={},i["substateof-"+r]=u,i),o)},u.withInitialState=function(e){if(!n["substateof-"+r]){var t,o=N.isFunction(e)?e():e;u.__internalSetState((t={},t["substateof-"+r]=x({},o),t))}return n["substateof-"+r]}}();var s=x({},u,{props:i,children:a});s.withInitialState=function(e){s.state=u.withInitialState(e)},s.withInitialContext=function(e){s.context=u.withInitialContext(e)},s.withDefaultProps=function(e){var t=N.isFunction(e)?e():e;s.props=_({},t,s.props)};var c=e.bind(s)(u,i,a);if(F.isEnabled()){var f=Math.random().toString(15).slice(10,20)+"";c.properties.attributes["data-inspector-selector"]=f,c.inspectorContext={node:'[data-inspector-selector="'+f+'"]',type:"function",name:e.name||"<anonymous function>",state:u.state,props:t,setState:u.setState,replaceState:u.replaceState}}return A.markStop(n),{v:c}}();if("object"==typeof p)return p.v}var v={attributes:{}},h=u(t,v.attributes,v);if("input"!==e&&"INPUT"!==e||!t.value||(v.value=t.value,v.attributes.value=t.value,v.attributes.defaultValue=t.value),h.ref){var m=N.uniqueId("elemref-");v.attributes["data-elemref"]=m,Y[h.ref]=m}return i&&(v.innerHTML=i),new z["default"](e,v,a,t.key,o)}function s(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];var o=n.length,i=N.isString(e)?N.escape(e)||"unknown":e;if(2===arguments.length){if(1===o&&N.isString(n[0]))return a(i,{},[n[0]],void 0,void 0);if(1===o&&n[0]instanceof z["default"])return a(i,{},[n[0]],void 0,void 0);if(1===o&&N.isArray(n[0]))return a(i,{},n[0],void 0,void 0);if(1===o&&N.isFunction(n[0]))return a(i,{},[n[0]],void 0,void 0);if(1===o&&N.isObject(n[0])&&n[0].__asHtml)return a(i,{},[n[0]],void 0,void 0);if(1===o&&N.isObject(n[0]))return a(i,n[0],[],n[0].key,void 0)}else if(3===arguments.length){if(2===o&&N.isObject(n[0])&&!N.isArray(n[1]))return a(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&N.isObject(n[0])&&n[1]instanceof z["default"])return a(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&N.isObject(n[0])&&N.isArray(n[1]))return a(i,n[0],n[1],n[0].key,void 0);if(2===o&&N.isObject(n[0])&&n[1].__asHtml)return a(i,n[0],n[1],n[0].key,void 0);if(2===o&&N.isFunction(n[1]))return a(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&N.isString(n[0])&&N.isObject(n[1]))return a(i,n[1],[],n[1].key,n[0]);if(2===o&&N.isString(n[0])&&!N.isObject(n[1])&&!N.isArray(n[1]))return a(i,{},[n[1]],void 0,n[0])}else if(4===arguments.length){if(3===o&&(N.isUndefined(n[0])||N.isString(n[0]))&&N.isObject(n[1])&&!N.isArray(n[2]))return a(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(N.isUndefined(n[0])||N.isString(n[0]))&&N.isObject(n[1])&&n[2]instanceof z["default"])return a(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(N.isUndefined(n[0])||N.isString(n[0]))&&N.isObject(n[1])&&n[2].__asHtml)return a(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(N.isUndefined(n[0])||N.isString(n[0]))&&N.isObject(n[1])&&N.isArray(n[2]))return a(i,n[1],n[2],n[1].key,n[0])}else if(0===o)return a(i,{},[],void 0,void 0);return console.warn("Unknown el expression ...",arguments),a(i,n[1],n[2],n[1].key,n[0])}function c(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];return s.apply(null,[e,K].concat(n))}function f(e){return s("span",{__asHtml:"&nbsp;".repeat(e||1)})}function l(e){return s("span",{},e)}function d(e,t){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],r=!1,o=!1,i={__keys:[],__oldKeys:[],refs:n,state:{},context:{},refresh:e,redraw:e,getDOMNode:function(){var e=N.getGlobalObject().document;return t.ownerDocument&&(e=t.ownerDocument),N.isString(t)?e.querySelector(t):t}};return i.__initialized=function(){r=!0,o=!0},i.withInitialState=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!r){var t=N.isFunction(e)?e():e;r=!0,i.state=_({},t,i.state)}return i.state},i.withInitialContext=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!o){var t=N.isFunction(e)?e():e;o=!0,i.context=_({},t,i.context)}return i.context},i.__internalSetState=function(e){for(var t in e)i.state[t]=e[t]},i.__internalReplaceState=function(e){return i.state=e},i.setState=function(t,n){for(var r in t)i.state[r]=t[r];e(),n&&n()},i.replaceState=function(t,n){i.state=t,e(),n&&n()},i}function p(e,t){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];A.markStart("Elem.render");var o=t,i=e;N.isFunction(i)?!function(){var r="Elem."+(i.name?"function":"render")+"."+(i.name||"")+".tree";A.markStart(r);var u={context:void 0,props:n},a=function(){var r=void 0;try{var i=function(){ee=u.context;var t=x({},u.context,{props:u.props});return t.withInitialState=function(e){t.state=u.context.withInitialState(e)},t.withInitialContext=function(e){t.context=u.context.withInitialContext(e)},t.withDefaultProps=function(e){var n=N.isFunction(e)?e():e;t.props=_({},n,t.props)},r=e.bind(t)(u.context,u.props),{v:r}}();if("object"==typeof i)return i.v}finally{var a=x({},Y);Y={};for(var s in u.context.refs)delete u.context.refs[s];for(var s in a)u.context.refs[s]=a[s];if(ee=void 0,0!==u.context.__keys.length){var c=u.context.__oldKeys.filter(function(e){return!N.contains(u.context.__keys,e)});for(var f in c){var s="substateof-"+c[f];delete u.context.state[s]}u.context.__oldKeys=[].concat(u.context.__keys),u.context.__keys=[]}F.isEnabled()&&!n.__inspectorSilent&&!function(){var i=t.id||t,a=e.name||"<anonymous function>",s=function d(e,t,n){if(e&&e.inspectorContext){var r=function(){var r=x({},e.inspectorContext,{children:[],rank:n+1});return e.children&&e.children.forEach(function(e){return d(e,r.children,n+1)}),t.push(r),{v:r}}();if("object"==typeof r)return r.v}else e&&e.children&&e.children.forEach(function(e){return d(e,t,n)})},c=i+" > "+a,f=Math.random().toString(15).slice(10,20)+"";r.properties.attributes["data-inspector-selector"]=f;var l={name:a,node:o,selectableNode:'[data-inspector-selector="'+f+'"]',state:u.context.state,props:n,setState:u.context.setState,replaceState:u.context.replaceState,rank:0,children:[]};s(r,l.children,0),F.exposeComponentTreeAt(c,l)}()}},s=function(){A.markStart(r);var e=a();p(e,o),A.markStop(r)};u.context=d(s,o,{}),u.context.state={},i=a(),u.context.__initialized(),A.markStop(r)}():N.isArray(i)&&(i=s("span",i));var u=N.getGlobalObject().document;o.ownerDocument&&(u=o.ownerDocument),N.isString(o)&&(o=u.querySelector(o));var a=void 0;if(null!==o){a=o.rootId,a||(a=N.uniqueId("data-rootid-"),o.rootId=a);var c=Q[a];if(c){A.markStart("Elem.render.diff");var f=L["default"](c.tree,i);A.markStop("Elem.render.diff"),A.markStart("Elem.render.patch");var l=H["default"](c.rootNode,f);Q[a]={tree:i,rootNode:l},A.markStop("Elem.render.patch")}else{A.markStart("Elem.render.create");var l=U["default"](i);r(o),o.appendChild(l),Q[a]={tree:i,rootNode:l},A.markStop("Elem.render.create")}}return A.markStop("Elem.render"),{unmount:function(){delete o.rootId,r(o),delete Q[a],F.isEnabled()&&F.removeExposedComponent(t.id||t)}}}function v(e){var t=e,n=N.getGlobalObject().document;t.ownerDocument&&(n=t.ownerDocument),N.isString(t)&&(t=n.querySelector(t)),r(t),t.rootId&&(delete Q[t.rootId],delete t.rootId),F.isEnabled()&&F.removeExposedComponent(e.id||e)}function h(e){return N.getGlobalObject().document.querySelector('[data-elemref="'+e+'"]')}function m(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];A.markStart("Elem.renderToJson");var n=e;if(N.isFunction(n)){var r=x({},Y);Y={};var o=d(function(){},null,r),i=x({},o,{props:t});n=n.bind(i)(o,t)}var u=U["default"](n,{document:M.createJsonDocument()}),a=u.render();return A.markStop("Elem.renderToJson"),a}function g(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];A.markStart("Elem.renderToString");var n=e;if(N.isFunction(n)){var r=x({},Y);Y={};var o=d(function(){},null,r),i=x({},o,{props:t});n=n.bind(i)(o,t)}var u=U["default"](n,{document:M.createStringDocument()}),a=u.render();return A.markStop("Elem.renderToString"),a}function y(e,t){for(var n=[],r=arguments.length,o=Array(r>2?r-2:0),i=2;r>i;i++)o[i-2]=arguments[i];for(var u=0;u<o.length;u++){var s=o[u];if(N.isArray(s))for(var c=0;c<s.length;c++)n.push(s[c]);else n.push(s)}var f=t||{};return S(te,e)?a(e,f,n||[],f.key||void 0,K):a(e,f,n||[],f.key||void 0,void 0)}var x=n(16)["default"],b=n(32)["default"],_=n(10)["default"],S=n(15)["default"],k=n(4)["default"],O=n(36)["default"],w=n(34)["default"],E=n(35)["default"];t.__esModule=!0,t.el=s,t.svg=c,t.nbsp=f,t.text=l,t.render=p,t.unmount=v,t.findDOMNode=h,t.renderToJson=m,t.renderToString=g,t.jsx=y;var j=n(6),N=k(j),C=n(73),M=k(C),T=n(26),A=k(T),P=n(76),D=k(P),I=n(72),F=k(I),G=n(61),L=O(G),R=n(62),H=O(R),V=n(60),U=O(V),W=n(67),z=O(W),q=n(68),B=O(q),K="http://www.w3.org/2000/svg";t.svgNS=K;var J=D.registerWebComponent;t.registerWebComponent=J;var X=N.stylesheet;t.stylesheet=X;var $=N.predicate;t.predicate=$;var Z=n(74);w(t,E(Z,w));var Q={},Y={},ee=void 0,te=["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]},function(e,t,n){e.exports={"default":n(39),__esModule:!0}},function(e,t,n){e.exports={"default":n(40),__esModule:!0}},function(e,t,n){e.exports={"default":n(41),__esModule:!0}},function(e,t,n){e.exports={"default":n(42),__esModule:!0}},function(e,t,n){e.exports={"default":n(43),__esModule:!0}},function(e,t,n){e.exports={"default":n(44),__esModule:!0}},function(e,t,n){"use strict";var r=n(31)["default"],o=n(30)["default"],i=n(29)["default"];t["default"]=function(e,t){for(var n=r(t),u=0;u<n.length;u++){var a=n[u],s=o(t,a);s&&s.configurable&&void 0===e[a]&&i(e,a,s)}return e},t.__esModule=!0},function(e,t){"use strict";t["default"]=function(e,t){var n=t({},e);return delete n["default"],n},t.__esModule=!0},function(e,t){"use strict";t["default"]=function(e){return e&&e.__esModule?e:{"default":e}},t.__esModule=!0},function(e,t,n){n(59),e.exports=n(2).Array.includes},function(e,t,n){n(57),e.exports=n(2).Object.assign},function(e,t,n){var r=n(1);e.exports=function(e,t){return r.create(e,t)}},function(e,t,n){var r=n(1);e.exports=function(e,t,n){return r.setDesc(e,t,n)}},function(e,t,n){var r=n(1);n(11),e.exports=function(e,t){return r.getDesc(e,t)}},function(e,t,n){var r=n(1);n(11),e.exports=function(e){return r.getNames(e)}},function(e,t,n){n(58),e.exports=n(2).Object.is},function(e,t,n){n(11),e.exports=n(2).Object.keys},function(e,t,n){var r=n(8),o=n(55),i=n(54);e.exports=function(e){return function(t,n,u){var a,s=r(t),c=o(s.length),f=i(u,c);if(e&&n!=n){for(;c>f;)if(a=s[f++],a!=a)return!0}else for(;c>f;f++)if((e||f in s)&&s[f]===n)return e||f;return!e&&-1}}},function(e,t,n){var r=n(8),o=n(17),i=n(49);e.exports=Object.assign||function(e,t){for(var n=r(e,!0),u=arguments.length,a=1;u>a;)for(var s,c=o(arguments[a++]),f=i(c),l=f.length,d=0;l>d;)n[s=f[d++]]=c[s];return n}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(1);e.exports=function(e){var t=r.getKeys(e),n=r.isEnum,o=r.getSymbols;if(o)for(var i,u=o(e),a=0;u.length>a;)n.call(e,i=u[a++])&&t.push(i);return t}},function(e,t,n){function r(e){try{return u(e)}catch(t){return a.slice()}}var o={}.toString,i=n(8),u=n(1).getNames,a="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.get=function(e){return a&&"[object Window]"==o.call(e)?r(e):u(i(e))}},function(e,t){var n="undefined"!=typeof self&&self.Math==Math?self:Function("return this")();e.exports=n,"number"==typeof __g&&(__g=n)},function(e,t){e.exports=function(e){return null!==e&&("object"==typeof e||"function"==typeof e)}},function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},function(e,t,n){var r=n(18),o=Math.max,i=Math.min;e.exports=function(e,t){return e=r(e),0>e?o(e+t,0):i(e,t)}},function(e,t,n){var r=n(18),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t){e.exports=function(){}},function(e,t,n){var r=n(7);r(r.S,"Object",{assign:n(46)})},function(e,t,n){var r=n(7);r(r.S,"Object",{is:n(53)})},function(e,t,n){"use strict";var r=n(7),o=n(45)(!0);r(r.P,"Array",{includes:function(e){return o(this,e,arguments[1])}}),n(56)("includes")},function(e,t,n){var r=n(23);e.exports=r},function(e,t,n){var r=n(70);e.exports=r},function(e,t,n){var r=n(65);e.exports=r},function(e,t){function n(e,t,n,o){return n&&0!==n.length?(n.sort(i),r(e,t,n,o,0)):{}}function r(e,t,n,i,a){if(i=i||{},e){o(n,a,a)&&(i[a]=e);var s=t.children;if(s)for(var c=e.childNodes,f=0;f<t.children.length;f++){a+=1;var l=s[f]||u,d=a+(l.count||0);o(n,a,d)&&r(c[f],l,n,i,a),a=d}}return i}function o(e,t,n){if(0===e.length)return!1;for(var r,o,i=0,u=e.length-1;u>=i;){if(r=(u+i)/2>>0,o=e[r],i===u)return o>=t&&n>=o;if(t>o)i=r+1;else{if(!(o>n))return!0;u=r-1}}return!1}function i(e,t){return e>t?1:-1}var u={};e.exports=n},function(e,t,n){function r(e,t,n){var r=e.type,c=e.vNode,p=e.patch;switch(r){case v.REMOVE:return o(t,c);case v.INSERT:return i(t,p,n);case v.VTEXT:return u(t,c,p,n);case v.WIDGET:return a(t,c,p,n);case v.VNODE:return s(t,c,p,n);case v.ORDER:return f(t,p),t;case v.PROPS:return d(t,p,c.properties),t;case v.THUNK:return l(t,n.patch(t,p,n));default:return t}}function o(e,t){var n=e.parentNode;return n&&n.removeChild(e),c(e,t),null}function i(e,t,n){var r=n.render(t,n);return e&&e.appendChild(r),e}function u(e,t,n,r){var o;if(3===e.nodeType)e.replaceData(0,e.length,n.text),o=e;else{var i=e.parentNode;o=r.render(n,r),i&&o!==e&&i.replaceChild(o,e)}return o}function a(e,t,n,r){var o,i=h(t,n);o=i?n.update(t,e)||e:r.render(n,r);var u=e.parentNode;return u&&o!==e&&u.replaceChild(o,e),i||c(e,t),o}function s(e,t,n,r){var o=e.parentNode,i=r.render(n,r);return o&&i!==e&&o.replaceChild(i,e),i}function c(e,t){"function"==typeof t.destroy&&p(t)&&t.destroy(e)}function f(e,t){for(var n,r,o,i=e.childNodes,u={},a=0;a<t.removes.length;a++)r=t.removes[a],n=i[r.from],r.key&&(u[r.key]=n),e.removeChild(n);for(var s=i.length,c=0;c<t.inserts.length;c++)o=t.inserts[c],n=u[o.key],e.insertBefore(n,o.to>=s++?null:i[o.to])}function l(e,t){return e&&t&&e!==t&&e.parentNode&&e.parentNode.replaceChild(t,e),t}var d=n(22),p=n(3),v=n(25),h=n(66);e.exports=r},function(e,t,n){function r(e,t,n){return n=n||{},n.patch=n.patch&&n.patch!==r?n.patch:o,n.render=n.render||c,n.patch(e,t,n)}function o(e,t,n){var r=u(t);if(0===r.length)return e;var o=f(e,t.a,r),s=e.ownerDocument;n.document||s===a||(n.document=s);for(var c=0;c<r.length;c++){var l=r[c];e=i(e,o[l],t[l],n)}return e}function i(e,t,n,r){if(!t)return e;var o;if(s(n))for(var i=0;i<n.length;i++)o=l(n[i],t,r),t===e&&(e=o);else o=l(n,t,r),t===e&&(e=o);return e}function u(e){var t=[];for(var n in e)"a"!==n&&t.push(Number(n));return t}var a=n(19),s=n(21),c=n(23),f=n(63),l=n(64);e.exports=r},function(e,t,n){function r(e,t){return o(e)&&o(t)?"name"in e&&"name"in t?e.id===t.id:e.init===t.init:!1}var o=n(3);e.exports=r},function(e,t,n){function r(e,t,n,r,o){this.tagName=e,this.properties=t||c,this.children=n||f,this.key=null!=r?String(r):void 0,this.namespace="string"==typeof o?o:null;var l,d=n&&n.length||0,p=0,v=!1,h=!1,m=!1;for(var g in t)if(t.hasOwnProperty(g)){var y=t[g];s(y)&&y.unhook&&(l||(l={}),l[g]=y)}for(var x=0;d>x;x++){var b=n[x];i(b)?(p+=b.count||0,!v&&b.hasWidgets&&(v=!0),!h&&b.hasThunks&&(h=!0),m||!b.hooks&&!b.descendantHooks||(m=!0)):!v&&u(b)?"function"==typeof b.destroy&&(v=!0):!h&&a(b)&&(h=!0)}this.count=d+p,this.hasWidgets=v,this.hasThunks=h,this.hooks=l,this.descendantHooks=m}var o=n(5),i=n(9),u=n(3),a=n(12),s=n(13);e.exports=r;var c={},f=[];r.prototype.version=o,r.prototype.type="VirtualNode"},function(e,t,n){function r(e){this.text=String(e)}var o=n(5);e.exports=r,r.prototype.version=o,r.prototype.type="VirtualText"},function(e,t,n){function r(e,t){var n;for(var a in e){a in t||(n=n||{},n[a]=void 0);var s=e[a],c=t[a];if(s!==c)if(i(s)&&i(c))if(o(c)!==o(s))n=n||{},n[a]=c;else if(u(c))n=n||{},n[a]=c;else{var f=r(s,c);f&&(n=n||{},n[a]=f)}else n=n||{},n[a]=c}for(var l in t)l in e||(n=n||{},n[l]=t[l]);return n}function o(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__?e.__proto__:e.constructor?e.constructor.prototype:void 0}var i=n(20),u=n(13);e.exports=r},function(e,t,n){function r(e,t){var n={a:e};return o(e,t,n,0),n}function o(e,t,n,r){if(e!==t){var o=n[r],a=!1;if(_(e)||_(t))s(e,t,n,r);else if(null==t)b(e)||(u(e,n,r),o=n[r]),o=h(o,new g(g.REMOVE,e,t));else if(y(t))if(y(e))if(e.tagName===t.tagName&&e.namespace===t.namespace&&e.key===t.key){var c=k(e.properties,t.properties);c&&(o=h(o,new g(g.PROPS,e,c))),o=i(e,t,n,o,r)}else o=h(o,new g(g.VNODE,e,t)),a=!0;else o=h(o,new g(g.VNODE,e,t)),a=!0;else x(t)?x(e)?e.text!==t.text&&(o=h(o,new g(g.VTEXT,e,t))):(o=h(o,new g(g.VTEXT,e,t)),a=!0):b(t)&&(b(e)||(a=!0),o=h(o,new g(g.WIDGET,e,t)));o&&(n[r]=o),a&&u(e,n,r)}}function i(e,t,n,r,i){for(var u=e.children,a=d(u,t.children),s=a.children,c=u.length,f=s.length,l=c>f?c:f,p=0;l>p;p++){var v=u[p],m=s[p];i+=1,v?o(v,m,n,i):m&&(r=h(r,new g(g.INSERT,null,m))),y(v)&&v.count&&(i+=v.count)}return a.moves&&(r=h(r,new g(g.ORDER,e,a.moves))),r}function u(e,t,n){f(e,t,n),a(e,t,n)}function a(e,t,n){if(b(e))"function"==typeof e.destroy&&(t[n]=h(t[n],new g(g.REMOVE,e,null)));else if(y(e)&&(e.hasWidgets||e.hasThunks))for(var r=e.children,o=r.length,i=0;o>i;i++){var u=r[i];n+=1,a(u,t,n),y(u)&&u.count&&(n+=u.count)}else _(e)&&s(e,null,t,n)}function s(e,t,n,o){var i=S(e,t),u=r(i.a,i.b);c(u)&&(n[o]=new g(g.THUNK,null,u))}function c(e){for(var t in e)if("a"!==t)return!0;return!1}function f(e,t,n){if(y(e)){if(e.hooks&&(t[n]=h(t[n],new g(g.PROPS,e,l(e.hooks)))),e.descendantHooks||e.hasThunks)for(var r=e.children,o=r.length,i=0;o>i;i++){var u=r[i];n+=1,f(u,t,n),y(u)&&u.count&&(n+=u.count)}}else _(e)&&s(e,null,t,n)}function l(e){var t={};for(var n in e)t[n]=void 0;return t}function d(e,t){var n=v(t),r=n.keys,o=n.free;if(o.length===t.length)return{children:t,moves:null};var i=v(e),u=i.keys,a=i.free;if(a.length===e.length)return{children:t,moves:null};for(var s=[],c=0,f=o.length,l=0,d=0;d<e.length;d++){var h,m=e[d];m.key?r.hasOwnProperty(m.key)?(h=r[m.key],s.push(t[h])):(h=d-l++,s.push(null)):f>c?(h=o[c++],s.push(t[h])):(h=d-l++,s.push(null))}for(var g=c>=o.length?t.length:o[c],y=0;y<t.length;y++){var x=t[y];x.key?u.hasOwnProperty(x.key)||s.push(x):y>=g&&s.push(x)}for(var b,_=s.slice(),S=0,k=[],O=[],w=0;w<t.length;){var E=t[w];for(b=_[S];null===b&&_.length;)k.push(p(_,S,null)),b=_[S];b&&b.key===E.key?(S++,w++):E.key?(b&&b.key&&r[b.key]!==w+1?(k.push(p(_,S,b.key)),b=_[S],b&&b.key===E.key?S++:O.push({key:E.key,to:w})):O.push({key:E.key,to:w}),w++):b&&b.key&&k.push(p(_,S,b.key))}for(;S<_.length;)b=_[S],k.push(p(_,S,b&&b.key));return k.length!==l||O.length?{children:s,moves:{removes:k,inserts:O}}:{children:s,moves:null}}function p(e,t,n){return e.splice(t,1),{from:t,key:n}}function v(e){for(var t={},n=[],r=e.length,o=0;r>o;o++){var i=e[o];i.key?t[i.key]=o:n.push(o)}return{keys:t,free:n}}function h(e,t){return e?(m(e)?e.push(t):e=[e,t],e):t}var m=n(21),g=n(25),y=n(9),x=n(14),b=n(3),_=n(12),S=n(24),k=n(69);e.exports=r},function(e,t){"use strict";t.__esModule=!0,t["default"]={},e.exports=t["default"]},function(e,t){"use strict";t.__esModule=!0,t["default"]={isEnabled:function(){return!1}},e.exports=t["default"]},function(e,t){"use strict";function n(){function e(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],n=t,r=[];return{setAttribute:function(e,t){n.push({key:e,
value:t})},removeAttribute:function(e){n=n.filter(function(t){return t.key!==e})},appendChild:function(e){r.push(e)},render:function(){var t=this;this.innerHTML&&!function(){var e=t.innerHTML;r.push({render:function(){return e}})}(),n=n.map(function(e){var t=e.key,n=e.value;return t+'="'+n+'"'});var o=0===r.length;return o?"<"+e+" "+n.join(" ")+" />":"<"+e+(n.length>0?" ":"")+n.join(" ")+">"+r.map(function(e){return e.render()}).join("")+"</"+e+">"}}}function t(t,n,r){return e(n,r,t)}function n(t,n){return e(t,n)}function r(e){return{render:function(){return e}}}return{createTextNode:r,createElementNS:t,createElement:n}}function r(){function e(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],n=t,r=[];return{setAttribute:function(e,t){n.push({key:e,value:t})},removeAttribute:function(e){n=n.filter(function(t){return t.key!==e})},appendChild:function(e){r.push(e)},render:function(){var t=this;return this.innerHTML&&!function(){var e=t.innerHTML;r=[{render:function(){return e}}]}(),{name:e,attrs:n,children:r.map(function(e){return e.render()})}}}}function t(t,n,r){return e(n,r,t)}function n(t,n){return e(t,n)}function r(e){return{render:function(){return e}}}return{createTextNode:r,createElementNS:t,createElement:n}}t.__esModule=!0,t.createStringDocument=n,t.createJsonDocument=r},function(e,t,n){"use strict";var r=n(4)["default"];t.__esModule=!0;var o=n(6),i=r(o),u=n(26),a=r(u),s=n(75),c=r(s),f=n(71),l=r(f);t["default"]={Utils:i,Perf:a,Store:c,Devtools:l},e.exports=t["default"]},function(e,t,n){"use strict";function r(){function e(e){l.push(e);var t=d;i.forEach(function(n){t[n.name]=n.getNewState(t[n.name],e)}),d=t,h.forEach(function(e){return e()})}function t(e){return h.push(e),function(){var t=h.indexOf(e);h.splice(t,1)}}function n(e){var t={};t.ephemeralListener=function(){e();var n=h.indexOf(t.ephemeralListener);h.splice(n,1)},h.push(t.ephemeralListener)}var r=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=[];if(p.isObject(r))for(var u in r){var a=r[u];if(!p.isFunction(a))throw new Error("Store should be a function ...");var s=a.name||u||"substate-"+v++;i.push({getNewState:a,name:s})}else{if(!p.isFunction(r))throw new Error("Store should be a function or an object of functions ...");var c=r.name||"reducer";i=[{getNewState:r,name:c}]}var l=[],d=o,h=[];return e({type:"@@init"}),{dispatch:e,subscribe:t,ephemeralSubscribe:n,setState:function(e){return d=e,h.forEach(function(e){return e()}),d},getState:function(){return f({},d)}}}function o(e,t){var n=arguments,r={},o=function(o){var i=e[o],u=o||i.name||"boundaction-"+v++;r[u]=function(){var e=i.apply(null,n);t(e)}};for(var i in e)o(i);return r}function i(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return function(n,r){var o=e[r.type];return o?o(n,r):n||t}}function u(e){var t=i;return{handleActions:function(n){return t(n,e)}}}function a(e,t){var n=t.store,r=t.actions,i=void 0===r?{}:r,u=t.render,a=o(i,n.dispatch);e.context.actions=a,e.context.store=n,e.context.dispatch=n.dispatch,e.context.getState=n.getState,n.ephemeralSubscribe(function(){return e.refresh()});var s=f({},e,{props:t});return u.bind(s)(e,t)}function s(e,t){var n=t.selector,r=t.actions,i=void 0===r?{}:r,u=t.render,a=e.context.store,s=o(i,a.dispatch),c=f({},t,s,n(a.getState()));return u.bind({ctx:e,props:c})(e,c)}function c(e,t){var n=t.store,r=t.selector,i=t.actions,u=t.render,a=f({},e);delete t.actions,delete t.render,delete t.store,delete t.selector;var s=o(i,n.dispatch),c=f({},t,s,r(n.getState()),{actions:s});a.store=n,a.dispatch=n.dispatch;var l={unsubscribe:null};return l.unsubscribe=n.subscribe(function(){e.refresh(),l.unsubscribe()}),u.bind(f({},a,{props:c}))(a,c)}var f=n(16)["default"],l=n(4)["default"];t.__esModule=!0,t.createStore=r,t.bindActionsToDispatch=o,t.handleActions=i,t.withInitialState=u,t.Provider=a,t.Selector=s,t.Connector=c;var d=n(6),p=l(d),v=0},function(e,t,n){"use strict";function r(e,t){function n(e,n){return t.isElemComponentFactory?t(e).renderTo(n):a.render(t,n,e)}console.log("registering WebComponent "+e);var r=c.getGlobalObject().document,i=o(HTMLElement.prototype);i.createdCallback=function(){var e={};for(var t in this.attributes){var o=this.attributes[t];e[o.name]=o.value}this.props=e,this.fragment=r.createElement("content"),this.fragment.setAttribute("id",c.uuid()),this.appendChild(this.fragment),this.renderedElement=n(e,this.fragment)},i.attributeChangedCallback=function(e,t,r){this.props[e]=r,n(this.props,this.fragment)},f(e,{prototype:i})}var o=n(28)["default"],i=n(4)["default"],u=n(27),a=i(u),s=n(6),c=i(s),f=void 0;try{f=(c.getGlobalObject().document.registerElement||c.getGlobalObject().document.register).bind(c.getGlobalObject().document)}catch(l){}f?t.registerWebComponent=r:t.registerWebComponent=function(){window.console&&console.error("[Elem] WebComponent not available here :(")}},function(e,t){}])});