!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Elem=e():t.Elem=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/assets/",e(0)}([function(t,e,n){t.exports=n(15)},function(t,e){var n=t.exports={version:"1.2.1"};"number"==typeof __e&&(__e=n)},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e){function n(t){return t&&"Widget"===t.type}t.exports=n},function(t,e){"use strict";e["default"]=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e["default"]=t,e},e.__esModule=!0},function(t,e){t.exports="2"},function(t,e,n){(function(t){"use strict";function r(){return"undefined"!=typeof t?t:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")()}function o(t){var e=void 0;return function(){return e||(e=t()),e}}function i(t){var e=++w.__ElemInternals.Utils.__idCounter+"";return t?t+e:e}function u(t){return t.replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase().replace(/_/g,"-")}function a(t,e){return 0===t.indexOf(e)}function c(t,e){var n=e;n||(n="");var r={},o=void 0;if(!(t instanceof Object)||Array.isArray(t))throw new Error("keyMirror(...): Argument must be an object.");for(o in t)t.hasOwnProperty(o)&&(t[o]instanceof Object?r[o]=c(t[o],o+"."):r[o]=n+o);return r}function s(t,e){return k.isFunction(t)?t()===!0?e:void 0:t===!0?e:void 0}function f(t,e){var n=y({},t,e);return n.extend=function(t){return f(n,t)},n}function l(t,e,n){for(var o=void 0,i=!1,a={},c=t;c.extend;)if(c.extend){var s=c.extend;delete c.extend,c=y({},s,c)}var l=x(c);return l.forEach(function(t){var e=c[t];if(k.isObject(e)){for(;e.extend;)if(e.extend){var n=e.extend;delete e.extend,e=y({},n,e)}a[t]=y({},{extend:function(t){return f(e,t)}},e)}}),a.extend=function(t){return f(c,t)},a.toString=function(t){return x(a).filter(function(t){return"extend"!==t&&"mount"!==t&&"unmount"!==t&&"toString"!==t}).map(function(e){var n=a[e];return(t?".":"")+u(e)+" {\n"+x(n).filter(function(t){return"extend"!==t}).map(function(t){return"    "+u(t)+": "+n[t]+";"}).join("\n")+"\n}"}).join("\n")},a.mount=function(t){return i||"undefined"==typeof r().document||(o=r().document.createElement("style"),e&&o.setAttribute("type",e),n&&o.setAttribute("media",n),o.innerHTML=a.toString(t),r().document.head.appendChild(o),i=!0),a},a.unmount=function(){return i&&"undefined"!=typeof r().document&&(o.parentNode.removeChild(o),i=!1),a},a}function d(){throw new Error("Not supported yet !!!")}function p(){var t=Date.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?n:7&n|8).toString(16)})}function v(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];t||!function(){var t=0;throw new Error("Violation : "+e.replace(/%s/g,function(){return r[t++]}))}()}function h(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];t||!function(){var t=0;console.error("Violation : "+e.replace(/%s/g,function(){return r[t++]}))}()}function m(t){return!!t&&("object"==typeof t||"function"==typeof t)}function g(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=null===t?"":""+t;return N.test(e)?e.replace(C,function(t){return E[t]}):e}var y=n(7)["default"],x=n(38)["default"],b=n(16)["default"],_=n(4)["default"];e.__esModule=!0,e.getGlobalObject=r,e.memoize=o,e.uniqueId=i,e.dasherize=u,e.startsWith=a,e.keyMirror=c,e.predicate=s,e.stylesheet=l,e.NotSupported=d,e.uuid=p,e.invariant=v,e.invariantLog=h,e.isObject=m,e.escape=g;var S=n(6),k=_(S),w=r()||{};"undefined"==typeof w&&(w={__fake:!0}),"undefined"==typeof w.console&&(w.console={log:function(){},error:function(){},table:function(){},debug:function(){},trace:function(){}}),w.__ElemInternals=w.__ElemInternals||{},w.__ElemInternals.Utils=w.__ElemInternals.Utils||{},w.__ElemInternals.Utils.__idCounter=w.__ElemInternals.Utils.__idCounter||0;var O=o(r);e.memoGobalObject=O;var E={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j="(?:"+x(E).join("|")+")",N=RegExp(j),C=RegExp(j,"g"),M=Array.isArray;e.isArray=M;var I=function(t){return void 0===t};e.isUndefined=I;var T=b;e.contains=T;var A=function(t){return m(t)&&"[object Function]"==Object.prototype.toString.call(t)};e.isFunction=A;var P=function(t){return"string"==typeof t||!!t&&"object"==typeof t&&"[object String]"==Object.prototype.toString.call(t)};e.isString=P}).call(e,function(){return this}())},function(t,e,n){t.exports={"default":n(42),__esModule:!0}},function(t,e,n){var r=n(54),o=n(1),i="prototype",u=function(t,e){return function(){return t.apply(e,arguments)}},a=function(t,e,n){var c,s,f,l,d=t&a.G,p=t&a.P,v=d?r:t&a.S?r[e]:(r[e]||{})[i],h=d?o:o[e]||(o[e]={});d&&(n=e);for(c in n)s=!(t&a.F)&&v&&c in v,s&&c in h||(f=s?v[c]:n[c],d&&"function"!=typeof v[c]?l=n[c]:t&a.B&&s?l=u(f,r):t&a.W&&v[c]==f?!function(t){l=function(e){return this instanceof t?new t(e):t(e)},l[i]=t[i]}(f):l=p&&"function"==typeof f?u(Function.call,f):f,h[c]=l,p&&((h[i]||(h[i]={}))[c]=f))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,t.exports=a},function(t,e,n){function r(t){return t&&"VirtualNode"===t.type&&t.version===o}var o=n(5);t.exports=r},function(t,e,n){t.exports=function(t,e){var r=n(8),o=(n(1).Object||{})[t]||Object[t],i={};i[t]=e(o),r(r.S+r.F*n(20)(function(){o(1)}),"Object",i)}},function(t,e,n){var r=n(21),o=n(19);t.exports=function(t){return r(o(t))}},function(t,e){function n(t){return t&&"Thunk"===t.type}t.exports=n},function(t,e){function n(t){return t&&("function"==typeof t.hook&&!t.hasOwnProperty("hook")||"function"==typeof t.unhook&&!t.hasOwnProperty("unhook"))}t.exports=n},function(t,e,n){function r(t){return t&&"VirtualText"===t.type&&t.version===o}var o=n(5);t.exports=r},function(t,e,n){"use strict";function r(t){ut=t}function o(){ut=function(t){throw t}}function i(t){var e=k({},it)||null;return function(){for(var n=arguments.length,r=Array(n),o=0;n>o;o++)r[o]=arguments[o];try{return t.apply(e,r)}catch(i){ut(i)}}}function u(t){for(;!T.isUndefined(t)&&!w(t,null)&&t.firstChild;)t.removeChild(t.firstChild)}function a(t){if(!t)return"";var e=[];for(var n in t)if("extend"!==n&&"mount"!==n&&"unmount"!==n&&"toString"!==n){var r=T.dasherize(n);"className"===n&&(r="class");var o=t[n];o&&(T.isFunction(o)&&(o=o()),o&&e.push(r+": "+o+";"))}return e.join(" ")}function c(t){if(!t)return[];var e=[];for(var n in t){var r=t[n];r===!0&&e.push(T.dasherize(n))}return e}function s(t,e,n){if(!t)return[];var r={ref:void 0};for(var o in t){var u=T.dasherize(o);if("className"===o&&(u="class"),T.startsWith(u,"on"))n[o.toLowerCase()]=i(t[o]);else if("ref"===u)r.ref=t[o];else{var s=t[o];s&&T.isFunction(s)&&(s=s()),s&&(T.isObject(s)&&"style"===u?e.style=a(s):T.isArray(s)&&"class"===u?e[u]=s.join(" "):T.isObject(s)&&"class"===u?e[u]=c(s).join(" "):e[u]=s)}}return r}function f(t,e,n,r,o){void 0===e&&(e={}),void 0===n&&(n=[]);var i=void 0,u=[].concat.apply([],n),a=[];for(var c in u){var f=u[c];f&&(T.isFunction(f)&&(f=f()),f&&(f instanceof J["default"]?a.push(f):T.isObject(f)&&f.__asHtml?(i=f.__asHtml,a.push(new $["default"](""))):a.push(new $["default"](f+""))))}u=a;var l=it;if(T.isFunction(t)&&!t.isElemComponentFactory){var d=function(){var n="Elem.function."+(t.componentName||t.name||"<anonymous function>")+".tree";F.markStart(n);var i=k({},e);i.children=u,i.key=r,i.namespace=o;var a=k({},ot);r&&!function(){a.__keys.push(r);var t=a.setState,e=a.replaceState,n=a.state;a.globalState=n,a.setGlobalState=t,a.replaceGlobalState=e,a.state=n["substateof-"+r]||{},a.replaceState=function(e,n){var o;return t((o={},o["substateof-"+r]=U["default"],o),n)},a.setState=function(e,o){var i,u=n["substateof-"+r]||{};for(var a in e)u[a]=e[a];t((i={},i["substateof-"+r]=u,i),o)},a.__isInitialized=function(){return"undefined"!=typeof n["substateof-"+r]},a.withInitialState=function(t){if(!n["substateof-"+r]){var e,o=T.isFunction(t)?t():t;a.__internalSetState((e={},e["substateof-"+r]=k({},o),e))}return n["substateof-"+r]}}();var c=k({},a,{props:i,children:u});c.withInitialState=function(t){c.state=a.withInitialState(t)},c.withInitialContext=function(t){c.context=a.withInitialContext(t)},c.withDefaultProps=function(t){var e=T.isFunction(t)?t():t;c.props=O({},e,c.props)},it=c;var s=t.bind(c)(a,i,u);if(it=l,H.isEnabled()){var f=Math.random().toString(15).slice(10,20)+"";s.properties.attributes["data-inspector-selector"]=f,s.inspectorContext={node:'[data-inspector-selector="'+f+'"]',type:"function",name:t.componentName||t.name||"<anonymous function>",state:a.state,props:e,setState:a.setState,replaceState:a.replaceState}}return F.markStop(n),{v:s}}();if("object"==typeof d)return d.v}var p={attributes:{}},v=s(e,p.attributes,p);if("input"!==t&&"INPUT"!==t||!e.value||(p.value=e.value,p.attributes.value=e.value,p.attributes.defaultValue=e.value),v.ref){var h=T.uniqueId("elemref-");p.attributes["data-elemref"]=h,rt[v.ref]=h}return i&&(p.innerHTML=i),new J["default"](t,p,u,e.key,o)}function l(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];var o=n.length,i=T.isString(t)?T.escape(t)||"unknown":t;if(2===arguments.length){if(1===o&&T.isString(n[0]))return f(i,{},[n[0]],void 0,void 0);if(1===o&&n[0]instanceof J["default"])return f(i,{},[n[0]],void 0,void 0);if(1===o&&T.isArray(n[0]))return f(i,{},n[0],void 0,void 0);if(1===o&&T.isFunction(n[0]))return f(i,{},[n[0]],void 0,void 0);if(1===o&&T.isObject(n[0])&&n[0].__asHtml)return f(i,{},[n[0]],void 0,void 0);if(1===o&&T.isObject(n[0]))return f(i,n[0],[],n[0].key,void 0)}else if(3===arguments.length){if(2===o&&T.isObject(n[0])&&!T.isArray(n[1]))return f(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&T.isObject(n[0])&&n[1]instanceof J["default"])return f(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&T.isObject(n[0])&&T.isArray(n[1]))return f(i,n[0],n[1],n[0].key,void 0);if(2===o&&T.isObject(n[0])&&n[1].__asHtml)return f(i,n[0],n[1],n[0].key,void 0);if(2===o&&T.isFunction(n[1]))return f(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&T.isString(n[0])&&T.isObject(n[1]))return f(i,n[1],[],n[1].key,n[0]);if(2===o&&T.isString(n[0])&&!T.isObject(n[1])&&!T.isArray(n[1]))return f(i,{},[n[1]],void 0,n[0])}else if(4===arguments.length){if(3===o&&(T.isUndefined(n[0])||T.isString(n[0]))&&T.isObject(n[1])&&!T.isArray(n[2]))return f(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(T.isUndefined(n[0])||T.isString(n[0]))&&T.isObject(n[1])&&n[2]instanceof J["default"])return f(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(T.isUndefined(n[0])||T.isString(n[0]))&&T.isObject(n[1])&&n[2].__asHtml)return f(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(T.isUndefined(n[0])||T.isString(n[0]))&&T.isObject(n[1])&&T.isArray(n[2]))return f(i,n[1],n[2],n[1].key,n[0])}else if(0===o)return f(i,{},[],void 0,void 0);return console.warn("Unknown el expression ...",arguments),f(i,n[1],n[2],n[1].key,n[0])}function d(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];return l.apply(null,[t,Z].concat(n))}function p(t){return l("span",{__asHtml:"&nbsp;".repeat(t||1)})}function v(t){return l("span",{},t)}function h(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],r=!1,o=!1,i={__keys:[],__oldKeys:[],refs:n,state:{},context:{},refresh:t,redraw:t,getDOMNode:function(){var t=T.getGlobalObject().document;return e.ownerDocument&&(t=e.ownerDocument),T.isString(e)?t.querySelector(e):e}};return i.__parentIsInitialized=function(){return r&&o},i.__isInitialized=i.__parentIsInitialized,i.__initialized=function(){r=!0,o=!0},i.withInitialState=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!r){var e=T.isFunction(t)?t():t;r=!0,i.state=O({},e,i.state)}return i.state},i.withInitialContext=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!o){var e=T.isFunction(t)?t():t;o=!0,i.context=O({},e,i.context)}return i.context},i.__internalSetState=function(t){for(var e in t)i.state[e]=t[e]},i.__internalReplaceState=function(t){return i.state=t},i.setState=function(e,n){for(var r in e)i.state[r]=e[r];t(),n&&n()},i.replaceState=function(e,n){i.state=e,t(),n&&n()},i}function m(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];F.markStart("Elem.render");var r=e,o=t,i={};T.isFunction(o)?!function(){var u="Elem."+(o.name?"function":"render")+"."+(o.componentName||o.name||"")+".tree";F.markStart(u);var a={context:void 0,props:n},c=function(){var o=void 0;try{var i=function(){ot=a.context;var e=k({},a.context,{props:a.props});return e.withInitialState=function(t){e.state=a.context.withInitialState(t)},e.withInitialContext=function(t){e.context=a.context.withInitialContext(t)},e.withDefaultProps=function(t){var n=T.isFunction(t)?t():t;e.props=O({},n,e.props)},it=e,o=t.bind(e)(a.context,a.props),it=void 0,{v:o}}();if("object"==typeof i)return i.v}finally{var u=k({},rt);rt={};for(var c in a.context.refs)delete a.context.refs[c];for(var c in u)a.context.refs[c]=u[c];if(ot=void 0,0!==a.context.__keys.length){var s=a.context.__oldKeys.filter(function(t){return!T.contains(a.context.__keys,t)});for(var f in s){var c="substateof-"+s[f];delete a.context.state[c]}a.context.__oldKeys=[].concat(a.context.__keys),a.context.__keys=[]}H.isEnabled()&&!n.__inspectorSilent&&!function(){var i=e.id||e,u=t.componentName||t.name||"<anonymous function>",c=function d(t,e,n){if(t&&t.inspectorContext){var r=function(){var r=k({},t.inspectorContext,{children:[],rank:n+1});return t.children&&t.children.forEach(function(t){return d(t,r.children,n+1)}),e.push(r),{v:r}}();if("object"==typeof r)return r.v}else t&&t.children&&t.children.forEach(function(t){return d(t,e,n)})},s=i+" > "+u,f=Math.random().toString(15).slice(10,20)+"";o.properties.attributes["data-inspector-selector"]=f;var l={name:u,node:r,selectableNode:'[data-inspector-selector="'+f+'"]',state:a.context.state,props:n,setState:a.context.setState,replaceState:a.context.replaceState,rank:0,children:[]};c(o,l.children,0),H.exposeComponentTreeAt(s,l)}()}},s=function(){F.markStart(u);var t=c();m(t,r),F.markStop(u)};a.context=h(s,r,{}),a.context.state={},o=c(),a.context.__initialized(),i.redraw=a.context.redraw,i.setState=a.context.setState,i.replaceState=a.context.replaceState,F.markStop(u)}():T.isArray(o)&&(o=l("span",o));var a=T.getGlobalObject().document;r.ownerDocument&&(a=r.ownerDocument),T.isString(r)&&(r=a.querySelector(r));var c=void 0;if(null!==r){c=r.rootId,c||(c=T.uniqueId("data-rootid-"),r.rootId=c);var s=nt[c];if(s){F.markStart("Elem.render.diff");var f=U["default"](s.tree,o);F.markStop("Elem.render.diff"),F.markStart("Elem.render.patch");var d=z["default"](s.rootNode,f);nt[c]={tree:o,rootNode:d},F.markStop("Elem.render.patch")}else{F.markStart("Elem.render.create");var d=B["default"](o);u(r),r.appendChild(d),nt[c]={tree:o,rootNode:d},F.markStop("Elem.render.create")}}return F.markStop("Elem.render"),k({},i,{unmount:function(){delete r.rootId,u(r),delete nt[c],H.isEnabled()&&H.removeExposedComponent(e.id||e)}})}function g(t){var e=t,n=T.getGlobalObject().document;e.ownerDocument&&(n=e.ownerDocument),T.isString(e)&&(e=n.querySelector(e)),u(e),e.rootId&&(delete nt[e.rootId],delete e.rootId),H.isEnabled()&&H.removeExposedComponent(t.id||t)}function y(t){return T.getGlobalObject().document.querySelector('[data-elemref="'+t+'"]')}function x(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];F.markStart("Elem.renderToJson");var n=t;if(T.isFunction(n)){var r=k({},rt);rt={};var o=h(function(){},null,r),i=k({},o,{props:e});n=n.bind(i)(o,e)}var u=B["default"](n,{document:P.createJsonDocument()}),a=u.render();return F.markStop("Elem.renderToJson"),a}function b(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];F.markStart("Elem.renderToString");var n=t;if(T.isFunction(n)){var r=k({},rt);rt={};var o=h(function(){},null,r),i=k({},o,{props:e});n=n.bind(i)(o,e)}var u=B["default"](n,{document:P.createStringDocument()}),a=u.render();return F.markStop("Elem.renderToString"),a}function _(t,e){for(var n=e||{},r=arguments.length,o=Array(r>2?r-2:0),i=2;r>i;i++)o[i-2]=arguments[i];return E(at,t)?f(t,n,o||[],n.key||void 0,Z):f(t,n,o||[],n.key||void 0,void 0)}function S(t){function e(e,n){var r=this,o=e.__isInitialized(),i=e.__parentIsInitialized();if(t.getDefaultProps&&this.withDefaultProps(function(){return t.getDefaultProps.bind(r)(e,n)}),!o&&t.getInitialState){var u=e.withInitialState(function(){return t.getInitialState.bind(r)(e,n)});e.state=u,this.state=u}if(!i&&!n.key&&t.getRootContext){var a=e.withInitialContext(function(){return t.getRootContext.bind(r)(e,n)});e.context=a,this.context=a}return!o&&t.init&&t.init.bind(this)(e,n),t.render.bind(this)(e,n)}if(!t.render)throw new Error("A component should have at least one render function");return t.name||console.warn("A component should have a name"),e.componentName=t.name||"ElemComponent",e}var k=n(17)["default"],w=n(37)["default"],O=n(7)["default"],E=n(16)["default"],j=n(4)["default"],N=n(18)["default"],C=n(39)["default"],M=n(40)["default"];e.__esModule=!0,e.setErrorCallback=r,e.resetErrorCallback=o,e.el=l,e.svg=d,e.nbsp=p,e.text=v,e.render=m,e.unmount=g,e.findDOMNode=y,e.renderToJson=x,e.renderToString=b,e.jsx=_,e.createComponent=S;var I=n(6),T=j(I),A=n(78),P=j(A),D=n(32),F=j(D),G=n(82),R=j(G),L=n(31),H=j(L),V=n(67),U=N(V),W=n(68),z=N(W),q=n(66),B=N(q),K=n(73),J=N(K),X=n(74),$=N(X),Z="http://www.w3.org/2000/svg";e.svgNS=Z;var Q=R.registerWebComponent;e.registerWebComponent=Q;var Y=T.stylesheet;e.stylesheet=Y;var tt=T.predicate;e.predicate=tt;var et=n(79);C(e,M(et,C));var nt={},rt={},ot=void 0,it=void 0,ut=function(t){throw t},at=["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]},function(t,e,n){t.exports={"default":n(41),__esModule:!0}},function(t,e,n){"use strict";var r=n(7)["default"];e["default"]=r||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},e.__esModule=!0},function(t,e){"use strict";e["default"]=function(t){return t&&t.__esModule?t:{"default":t}},e.__esModule=!0},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(51);t.exports=0 in Object("z")?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(19);t.exports=function(t){return Object(r(t))}},function(t,e,n){(function(e){var r="undefined"!=typeof e?e:"undefined"!=typeof window?window:{},o=n(83);if("undefined"!=typeof document)t.exports=document;else{var i=r["__GLOBAL_DOCUMENT_CACHE@4"];i||(i=r["__GLOBAL_DOCUMENT_CACHE@4"]=o),t.exports=i}}).call(e,function(){return this}())},function(t,e){"use strict";t.exports=function(t){return"object"==typeof t&&null!==t}},function(t,e){function n(t){return"[object Array]"===o.call(t)}var r=Array.isArray,o=Object.prototype.toString;t.exports=r||n},function(t,e,n){function r(t,e,n){for(var r in e){var u=e[r];void 0===u?o(t,r,u,n):c(u)?(o(t,r,u,n),u.hook&&u.hook(t,r,n?n[r]:void 0)):a(u)?i(t,e,n,r,u):t[r]=u}}function o(t,e,n,r){if(r){var o=r[e];if(c(o))o.unhook&&o.unhook(t,e,n);else if("attributes"===e)for(var i in o)t.removeAttribute(i);else if("style"===e)for(var u in o)t.style[u]="";else"string"==typeof o?t[e]="":t[e]=null}}function i(t,e,n,r,o){var i=n?n[r]:void 0;if("attributes"!==r){if(i&&a(i)&&u(i)!==u(o))return void(t[r]=o);a(t[r])||(t[r]={});var c="style"===r?"":void 0;for(var s in o){var f=o[s];t[r][s]=void 0===f?c:f}}else for(var l in o){var d=o[l];void 0===d?t.removeAttribute(l):t.setAttribute(l,d)}}function u(t){return Object.getPrototypeOf?Object.getPrototypeOf(t):t.__proto__?t.__proto__:t.constructor?t.constructor.prototype:void 0}var a=n(25),c=n(13);t.exports=r},function(t,e,n){function r(t,e){var n=e?e.document||o:o,f=e?e.warn:null;if(t=s(t).a,c(t))return t.init();if(a(t))return n.createTextNode(t.text);if(!u(t))return f&&f("Item is not a valid virtual dom node",t),null;var l=null===t.namespace?n.createElement(t.tagName):n.createElementNS(t.namespace,t.tagName),d=t.properties;i(l,d);for(var p=t.children,v=0;v<p.length;v++){var h=r(p[v],e);h&&l.appendChild(h)}return l}var o=n(24),i=n(27),u=n(9),a=n(14),c=n(3),s=n(29);t.exports=r},function(t,e,n){function r(t,e){var n=t,r=e;return c(e)&&(r=o(e,t)),c(t)&&(n=o(t,null)),{a:n,b:r}}function o(t,e){var n=t.vnode;if(n||(n=t.vnode=t.render(e)),!(i(n)||u(n)||a(n)))throw new Error("thunk did not return a valid node");return n}var i=n(9),u=n(14),a=n(3),c=n(12);t.exports=r},function(t,e,n){function r(t,e,n){this.type=Number(t),this.vNode=e,this.patch=n}var o=n(5);r.NONE=0,r.VTEXT=1,r.VNODE=2,r.WIDGET=3,r.PROPS=4,r.ORDER=5,r.INSERT=6,r.REMOVE=7,r.THUNK=8,t.exports=r,r.prototype.version=o,r.prototype.type="VirtualPatch"},function(t,e){"use strict";e.__esModule=!0,e["default"]={isEnabled:function(){return!1}},t.exports=e["default"]},function(t,e){"use strict";e.__esModule=!0,e["default"]={markStart:function(){},markStop:function(){}},t.exports=e["default"]},function(t,e,n){t.exports={"default":n(43),__esModule:!0}},function(t,e,n){t.exports={"default":n(44),__esModule:!0}},function(t,e,n){t.exports={"default":n(45),__esModule:!0}},function(t,e,n){t.exports={"default":n(46),__esModule:!0}},function(t,e,n){t.exports={"default":n(47),__esModule:!0}},function(t,e,n){t.exports={"default":n(48),__esModule:!0}},function(t,e,n){"use strict";var r=n(36)["default"],o=n(35)["default"],i=n(34)["default"];e["default"]=function(t,e){for(var n=r(e),u=0;u<n.length;u++){var a=n[u],c=o(e,a);c&&c.configurable&&void 0===t[a]&&i(t,a,c)}return t},e.__esModule=!0},function(t,e){"use strict";e["default"]=function(t,e){var n=e({},t);return delete n["default"],n},e.__esModule=!0},function(t,e,n){n(65),t.exports=n(1).Array.includes},function(t,e,n){n(60),t.exports=n(1).Object.assign},function(t,e,n){var r=n(2);t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){var r=n(2);t.exports=function(t,e,n){return r.setDesc(t,e,n)}},function(t,e,n){var r=n(2);n(61),t.exports=function(t,e){return r.getDesc(t,e)}},function(t,e,n){var r=n(2);n(62),t.exports=function(t){return r.getNames(t)}},function(t,e,n){n(63),t.exports=n(1).Object.is},function(t,e,n){n(64),t.exports=n(1).Object.keys},function(t,e,n){var r=n(11),o=n(58),i=n(57);t.exports=function(t){return function(e,n,u){var a,c=r(e),s=o(c.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if(a=c[f++],a!=a)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===n)return t||f;return!t&&-1}}},function(t,e,n){var r=n(23),o=n(21),i=n(52),u=n(55);t.exports=n(20)(function(){var t=Object.assign,e={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return e[r]=7,o.split("").forEach(function(t){n[t]=t}),7!=t({},e)[r]||Object.keys(t({},n)).join("")!=o})?function(t,e){for(var n=r(t),a=arguments.length,c=1;a>c;)for(var s,f=o(arguments[c++]),l=i(f),d=l.length,p=0;d>p;)u(f,s=l[p++])&&(n[s]=f[s]);return n}:Object.assign},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(2);t.exports=function(t){var e=r.getKeys(t),n=r.getSymbols;if(n)for(var o,i=n(t),u=r.isEnum,a=0;i.length>a;)u.call(t,o=i[a++])&&e.push(o);return e}},function(t,e,n){var r={}.toString,o=n(11),i=n(2).getNames,u="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(e){return u.slice()}};t.exports.get=function(t){return u&&"[object Window]"==r.call(t)?a(t):i(o(t))}},function(t,e){var n="undefined",r=t.exports=typeof window!=n&&window.Math==Math?window:typeof self!=n&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},function(t,e,n){var r=n(22),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),0>t?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(22),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(8);r(r.S+r.F,"Object",{assign:n(50)})},function(t,e,n){var r=n(11);n(10)("getOwnPropertyDescriptor",function(t){return function(e,n){return t(r(e),n)}})},function(t,e,n){n(10)("getOwnPropertyNames",function(){return n(53).get})},function(t,e,n){var r=n(8);r(r.S,"Object",{is:n(56)})},function(t,e,n){var r=n(23);n(10)("keys",function(t){return function(e){return t(r(e))}})},function(t,e,n){"use strict";var r=n(8),o=n(49)(!0);r(r.P,"Array",{includes:function(t){return o(this,t,arguments[1])}}),n(59)("includes")},function(t,e,n){var r=n(28);t.exports=r},function(t,e,n){var r=n(76);t.exports=r},function(t,e,n){var r=n(71);t.exports=r},function(t,e){function n(t,e,n,o){return n&&0!==n.length?(n.sort(i),r(t,e,n,o,0)):{}}function r(t,e,n,i,a){if(i=i||{},t){o(n,a,a)&&(i[a]=t);var c=e.children;if(c)for(var s=t.childNodes,f=0;f<e.children.length;f++){a+=1;var l=c[f]||u,d=a+(l.count||0);o(n,a,d)&&r(s[f],l,n,i,a),a=d}}return i}function o(t,e,n){if(0===t.length)return!1;for(var r,o,i=0,u=t.length-1;u>=i;){if(r=(u+i)/2>>0,o=t[r],i===u)return o>=e&&n>=o;if(e>o)i=r+1;else{if(!(o>n))return!0;u=r-1}}return!1}function i(t,e){return t>e?1:-1}var u={};t.exports=n},function(t,e,n){function r(t,e,n){var r=t.type,s=t.vNode,p=t.patch;switch(r){case v.REMOVE:return o(e,s);case v.INSERT:return i(e,p,n);case v.VTEXT:return u(e,s,p,n);case v.WIDGET:return a(e,s,p,n);case v.VNODE:return c(e,s,p,n);case v.ORDER:return f(e,p),e;case v.PROPS:return d(e,p,s.properties),e;case v.THUNK:return l(e,n.patch(e,p,n));default:return e}}function o(t,e){var n=t.parentNode;return n&&n.removeChild(t),s(t,e),null}function i(t,e,n){var r=n.render(e,n);return t&&t.appendChild(r),t}function u(t,e,n,r){var o;if(3===t.nodeType)t.replaceData(0,t.length,n.text),o=t;else{var i=t.parentNode;o=r.render(n,r),i&&o!==t&&i.replaceChild(o,t)}return o}function a(t,e,n,r){var o,i=h(e,n);o=i?n.update(e,t)||t:r.render(n,r);var u=t.parentNode;return u&&o!==t&&u.replaceChild(o,t),i||s(t,e),o}function c(t,e,n,r){var o=t.parentNode,i=r.render(n,r);return o&&i!==t&&o.replaceChild(i,t),i}function s(t,e){"function"==typeof e.destroy&&p(e)&&e.destroy(t)}function f(t,e){for(var n,r,o,i=t.childNodes,u={},a=0;a<e.removes.length;a++)r=e.removes[a],n=i[r.from],r.key&&(u[r.key]=n),t.removeChild(n);for(var c=i.length,s=0;s<e.inserts.length;s++)o=e.inserts[s],n=u[o.key],t.insertBefore(n,o.to>=c++?null:i[o.to])}function l(t,e){return t&&e&&t!==e&&t.parentNode&&t.parentNode.replaceChild(e,t),e}var d=n(27),p=n(3),v=n(30),h=n(72);t.exports=r},function(t,e,n){function r(t,e,n){return n=n||{},n.patch=n.patch&&n.patch!==r?n.patch:o,n.render=n.render||s,n.patch(t,e,n)}function o(t,e,n){var r=u(e);if(0===r.length)return t;var o=f(t,e.a,r),c=t.ownerDocument;n.document||c===a||(n.document=c);for(var s=0;s<r.length;s++){var l=r[s];t=i(t,o[l],e[l],n)}return t}function i(t,e,n,r){if(!e)return t;var o;if(c(n))for(var i=0;i<n.length;i++)o=l(n[i],e,r),e===t&&(t=o);else o=l(n,e,r),e===t&&(t=o);return t}function u(t){var e=[];for(var n in t)"a"!==n&&e.push(Number(n));return e}var a=n(24),c=n(26),s=n(28),f=n(69),l=n(70);t.exports=r},function(t,e,n){function r(t,e){return o(t)&&o(e)?"name"in t&&"name"in e?t.id===e.id:t.init===e.init:!1}var o=n(3);t.exports=r},function(t,e,n){function r(t,e,n,r,o){this.tagName=t,this.properties=e||s,this.children=n||f,this.key=null!=r?String(r):void 0,this.namespace="string"==typeof o?o:null;var l,d=n&&n.length||0,p=0,v=!1,h=!1,m=!1;for(var g in e)if(e.hasOwnProperty(g)){var y=e[g];c(y)&&y.unhook&&(l||(l={}),l[g]=y)}for(var x=0;d>x;x++){var b=n[x];i(b)?(p+=b.count||0,!v&&b.hasWidgets&&(v=!0),!h&&b.hasThunks&&(h=!0),m||!b.hooks&&!b.descendantHooks||(m=!0)):!v&&u(b)?"function"==typeof b.destroy&&(v=!0):!h&&a(b)&&(h=!0)}this.count=d+p,this.hasWidgets=v,this.hasThunks=h,this.hooks=l,this.descendantHooks=m}var o=n(5),i=n(9),u=n(3),a=n(12),c=n(13);t.exports=r;var s={},f=[];r.prototype.version=o,r.prototype.type="VirtualNode"},function(t,e,n){function r(t){this.text=String(t)}var o=n(5);t.exports=r,r.prototype.version=o,r.prototype.type="VirtualText"},function(t,e,n){function r(t,e){var n;for(var a in t){a in e||(n=n||{},n[a]=void 0);var c=t[a],s=e[a];if(c!==s)if(i(c)&&i(s))if(o(s)!==o(c))n=n||{},n[a]=s;else if(u(s))n=n||{},n[a]=s;else{var f=r(c,s);f&&(n=n||{},n[a]=f)}else n=n||{},n[a]=s}for(var l in e)l in t||(n=n||{},n[l]=e[l]);return n}function o(t){return Object.getPrototypeOf?Object.getPrototypeOf(t):t.__proto__?t.__proto__:t.constructor?t.constructor.prototype:void 0}var i=n(25),u=n(13);t.exports=r},function(t,e,n){function r(t,e){var n={a:t};return o(t,e,n,0),n}function o(t,e,n,r){if(t!==e){var o=n[r],a=!1;if(_(t)||_(e))c(t,e,n,r);else if(null==e)b(t)||(u(t,n,r),o=n[r]),o=h(o,new g(g.REMOVE,t,e));else if(y(e))if(y(t))if(t.tagName===e.tagName&&t.namespace===e.namespace&&t.key===e.key){var s=k(t.properties,e.properties);s&&(o=h(o,new g(g.PROPS,t,s))),o=i(t,e,n,o,r)}else o=h(o,new g(g.VNODE,t,e)),a=!0;else o=h(o,new g(g.VNODE,t,e)),a=!0;else x(e)?x(t)?t.text!==e.text&&(o=h(o,new g(g.VTEXT,t,e))):(o=h(o,new g(g.VTEXT,t,e)),a=!0):b(e)&&(b(t)||(a=!0),o=h(o,new g(g.WIDGET,t,e)));o&&(n[r]=o),a&&u(t,n,r)}}function i(t,e,n,r,i){for(var u=t.children,a=d(u,e.children),c=a.children,s=u.length,f=c.length,l=s>f?s:f,p=0;l>p;p++){var v=u[p],m=c[p];i+=1,v?o(v,m,n,i):m&&(r=h(r,new g(g.INSERT,null,m))),y(v)&&v.count&&(i+=v.count)}return a.moves&&(r=h(r,new g(g.ORDER,t,a.moves))),r}function u(t,e,n){f(t,e,n),a(t,e,n)}function a(t,e,n){if(b(t))"function"==typeof t.destroy&&(e[n]=h(e[n],new g(g.REMOVE,t,null)));else if(y(t)&&(t.hasWidgets||t.hasThunks))for(var r=t.children,o=r.length,i=0;o>i;i++){var u=r[i];n+=1,a(u,e,n),y(u)&&u.count&&(n+=u.count)}else _(t)&&c(t,null,e,n)}function c(t,e,n,o){var i=S(t,e),u=r(i.a,i.b);s(u)&&(n[o]=new g(g.THUNK,null,u))}function s(t){for(var e in t)if("a"!==e)return!0;return!1}function f(t,e,n){if(y(t)){if(t.hooks&&(e[n]=h(e[n],new g(g.PROPS,t,l(t.hooks)))),t.descendantHooks||t.hasThunks)for(var r=t.children,o=r.length,i=0;o>i;i++){var u=r[i];n+=1,f(u,e,n),y(u)&&u.count&&(n+=u.count)}}else _(t)&&c(t,null,e,n)}function l(t){var e={};for(var n in t)e[n]=void 0;return e}function d(t,e){var n=v(e),r=n.keys,o=n.free;if(o.length===e.length)return{children:e,moves:null};var i=v(t),u=i.keys,a=i.free;if(a.length===t.length)return{children:e,moves:null};for(var c=[],s=0,f=o.length,l=0,d=0;d<t.length;d++){var h,m=t[d];m.key?r.hasOwnProperty(m.key)?(h=r[m.key],
c.push(e[h])):(h=d-l++,c.push(null)):f>s?(h=o[s++],c.push(e[h])):(h=d-l++,c.push(null))}for(var g=s>=o.length?e.length:o[s],y=0;y<e.length;y++){var x=e[y];x.key?u.hasOwnProperty(x.key)||c.push(x):y>=g&&c.push(x)}for(var b,_=c.slice(),S=0,k=[],w=[],O=0;O<e.length;){var E=e[O];for(b=_[S];null===b&&_.length;)k.push(p(_,S,null)),b=_[S];b&&b.key===E.key?(S++,O++):E.key?(b&&b.key&&r[b.key]!==O+1?(k.push(p(_,S,b.key)),b=_[S],b&&b.key===E.key?S++:w.push({key:E.key,to:O})):w.push({key:E.key,to:O}),O++):b&&b.key&&k.push(p(_,S,b.key))}for(;S<_.length;)b=_[S],k.push(p(_,S,b&&b.key));return k.length!==l||w.length?{children:c,moves:{removes:k,inserts:w}}:{children:c,moves:null}}function p(t,e,n){return t.splice(e,1),{from:e,key:n}}function v(t){for(var e={},n=[],r=t.length,o=0;r>o;o++){var i=t[o];i.key?e[i.key]=o:n.push(o)}return{keys:e,free:n}}function h(t,e){return t?(m(t)?t.push(e):t=[t,e],t):e}var m=n(26),g=n(30),y=n(9),x=n(14),b=n(3),_=n(12),S=n(29),k=n(75);t.exports=r},function(t,e){"use strict";e.__esModule=!0,e["default"]={},t.exports=e["default"]},function(t,e){"use strict";function n(){function t(t){var e=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],n=e,r=[];return{setAttribute:function(t,e){n.push({key:t,value:e})},removeAttribute:function(t){n=n.filter(function(e){return e.key!==t})},appendChild:function(t){r.push(t)},render:function(){var e=this;this.innerHTML&&!function(){var t=e.innerHTML;r.push({render:function(){return t}})}(),n=n.map(function(t){var e=t.key,n=t.value;return e+'="'+n+'"'});var o=0===r.length;return o?"<"+t+" "+n.join(" ")+" />":"<"+t+(n.length>0?" ":"")+n.join(" ")+">"+r.map(function(t){return t.render()}).join("")+"</"+t+">"}}}function e(e,n,r){return t(n,r,e)}function n(e,n){return t(e,n)}function r(t){return{render:function(){return t}}}return{createTextNode:r,createElementNS:e,createElement:n}}function r(){function t(t){var e=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],n=e,r=[];return{setAttribute:function(t,e){n.push({key:t,value:e})},removeAttribute:function(t){n=n.filter(function(e){return e.key!==t})},appendChild:function(t){r.push(t)},render:function(){var e=this;return this.innerHTML&&!function(){var t=e.innerHTML;r=[{render:function(){return t}}]}(),{name:t,attrs:n,children:r.map(function(t){return t.render()})}}}}function e(e,n,r){return t(n,r,e)}function n(e,n){return t(e,n)}function r(t){return{render:function(){return t}}}return{createTextNode:r,createElementNS:e,createElement:n}}e.__esModule=!0,e.createStringDocument=n,e.createJsonDocument=r},function(t,e,n){"use strict";var r=n(4)["default"];e.__esModule=!0;var o=n(6),i=r(o),u=n(32),a=r(u),c=n(80),s=r(c),f=n(77),l=r(f);e["default"]={Utils:i,Perf:a,Store:s,Devtools:l},t.exports=e["default"]},function(t,e,n){"use strict";function r(){function t(t){f.push(t);var e=d;i.forEach(function(n){e[n.name]=n.getNewState(e[n.name],t)}),d=e,p.forEach(function(t){return t()})}function e(t){return p.push(t),function(){var e=p.indexOf(t);p.splice(e,1)}}function n(t){var e={};e.ephemeralListener=function(){t();var n=p.indexOf(e.ephemeralListener);p.splice(n,1)},p.push(e.ephemeralListener)}var r=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=[];if(g.isObject(r))for(var u in r){var a=r[u];if(!g.isFunction(a))throw new Error("Store should be a function ...");var c=a.name||u||"substate-"+S++;i.push({getNewState:a,name:c})}else{if(!g.isFunction(r))throw new Error("Store should be a function or an object of functions ...");var s=r.name||"reducer";i=[{getNewState:r,name:s}]}var f=[],d=o,p=[];return t({type:"@@init"}),{dispatch:t,subscribe:e,ephemeralSubscribe:n,setState:function(t){return d=t,p.forEach(function(t){return t()}),d},getState:function(){return l({},d)}}}function o(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=r(t,n),i=o.dispatch,u=[],a={getState:o.getState,dispatch:function(t){return i(t)}};return u=e.map(function(t){return t(a)}),i=[].concat(u,[o.dispatch]).reduceRight(function(t,e){return e(t)}),l({},o,{dispatch:i})}}function i(t,e){var n=arguments,r={},o=function(o){var i=t[o],u=o||i.name||"boundaction-"+S++;r[u]=function(){var t=i.apply(null,n);e(t)}};for(var i in t)o(i);return r}function u(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return function(n,r){var o=t[r.type];return o?o(n,r):n||e}}function a(t){var e=u;return{handleActions:function(n){return e(n,t)}}}function c(t,e){var n=e.store,r=e.actions,o=void 0===r?{}:r,u=e.render,a=i(o,n.dispatch);return t.context.actions=a,t.context.store=n,t.context.dispatch=n.dispatch,t.context.getState=n.getState,n.ephemeralSubscribe(function(){return t.refresh()}),x.isEnabled()&&t.__internalSetState({storeStateReadOnly:l({},n.getState())}),h.el(u,e)}function s(t,e){var n=e.selector,r=void 0===n?function(t){return l({},t)}:n,o=e.actions,u=void 0===o?t.context.actions:o,a=e.render,c=t.context.store,s=i(u,c.dispatch),f=l({},e,s,r(c.getState()));return h.el("span",h.el(a,f))}function f(t,e){return void 0===t&&(t=function(t){return l({},t)}),function(n){return function(){return h.el(s,{selector:t,actions:e,render:n})}}}var l=n(17)["default"],d=n(4)["default"],p=n(18)["default"];e.__esModule=!0,e.createStore=r,e.enrichCreateStoreWith=o,e.bindActionsToDispatch=i,e.handleActions=u,e.withInitialState=a,e.Provider=c,e.Selector=s,e.connect=f;var v=n(15),h=d(v),m=n(6),g=d(m),y=n(31),x=d(y),b=n(81),_=p(b),S=0,k=_["default"];e.Plugins=k},function(t,e,n){"use strict";var r=n(7)["default"];e.__esModule=!0,e["default"]={Logger:function(t){return function(e){return function(n){console.group(n.type),console.info("Dispatching",n);var r=e(n);return console.log("Next state",t.getState()),console.groupEnd(n.type),r}}},PromiseFieldHandler:function(t){return function(t){return function(e){function n(t,n){var o=r({},e,{ready:t},n);return delete o.promise,o}return e.promise?(t(n(!1)),e.promise.then(function(e){return t(n(!0,{result:e}))},function(e){return t(n(!0,{error:e}))})):t(e)}}}},t.exports=e["default"]},function(t,e,n){"use strict";function r(t,e){function n(t,n){return e.isElemComponentFactory?e(t).renderTo(n):a.render(e,n,t)}console.log("registering WebComponent "+t);var r=s.getGlobalObject().document,i=o(HTMLElement.prototype);i.createdCallback=function(){var t={};for(var e in this.attributes){var o=this.attributes[e];t[o.name]=o.value}this.props=t,this.fragment=r.createElement("content"),this.fragment.setAttribute("id",s.uuid()),this.appendChild(this.fragment),this.renderedElement=n(t,this.fragment)},i.attributeChangedCallback=function(t,e,r){this.props[t]=r,n(this.props,this.fragment)},f(t,{prototype:i})}var o=n(33)["default"],i=n(4)["default"],u=n(15),a=i(u),c=n(6),s=i(c),f=void 0;try{f=(s.getGlobalObject().document.registerElement||s.getGlobalObject().document.register).bind(s.getGlobalObject().document)}catch(l){}f?e.registerWebComponent=r:e.registerWebComponent=function(){window.console&&console.error("[Elem] WebComponent not available here :(")}},function(t,e){}])});