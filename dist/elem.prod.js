!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Elem=e():t.Elem=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/assets/",e(0)}([function(t,e,n){t.exports=n(9)},function(t,e){var n=t.exports={version:"1.2.1"};"number"==typeof __e&&(__e=n)},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e){"use strict";e["default"]=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e["default"]=t,e},e.__esModule=!0},function(t,e,n){(function(t){"use strict";function r(){return"undefined"!=typeof t?t:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")()}function o(t){var e=void 0;return function(){return e||(e=t()),e}}function i(t){var e=++j.__ElemInternals.Utils.__idCounter+"";return t?t+e:e}function a(t){return t.replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase().replace(/_/g,"-")}function u(t,e){return 0===t.indexOf(e)}function s(t,e){var n=e;n||(n="");var r={},o=void 0;if(!(t instanceof Object)||Array.isArray(t))throw new Error("keyMirror(...): Argument must be an object.");for(o in t)t.hasOwnProperty(o)&&(t[o]instanceof Object?r[o]=s(t[o],o+"."):r[o]=n+o);return r}function c(t,e){return w.isFunction(t)?t()===!0?e:void 0:t===!0?e:void 0}function f(t,e){var n=b({},t,e);return n.extend=function(t){return f(n,t)},n}function l(t,e,n){for(var o=void 0,i=!1,u={},s=t;s.extend;)if(s.extend){var c=s.extend;delete s.extend,s=b({},c,s)}var l=x(s);return l.forEach(function(t){var e=s[t];if(w.isObject(e)){for(;e.extend;)if(e.extend){var n=e.extend;delete e.extend,e=b({},n,e)}u[t]=b({},{extend:function(t){return f(e,t)}},e)}}),u.extend=function(t){return f(s,t)},u.toString=function(t){return x(u).filter(function(t){return"extend"!==t&&"mount"!==t&&"unmount"!==t&&"toString"!==t}).map(function(e){var n=u[e];return(t?".":"")+a(e)+" {\n"+x(n).filter(function(t){return"extend"!==t}).map(function(t){return"    "+a(t)+": "+n[t]+";"}).join("\n")+"\n}"}).join("\n")},u.mount=function(t){return i||"undefined"==typeof r().document||(o=r().document.createElement("style"),e&&o.setAttribute("type",e),n&&o.setAttribute("media",n),o.innerHTML=u.toString(t),r().document.head.appendChild(o),i=!0),u},u.unmount=function(){return i&&"undefined"!=typeof r().document&&(o.parentNode.removeChild(o),i=!1),u},u}function d(){throw new Error("Not supported yet !!!")}function p(){var t=Date.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?n:7&n|8).toString(16)})}function v(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];t||!function(){var t=0;throw new Error("Violation : "+e.replace(/%s/g,function(){return r[t++]}))}()}function m(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];t||!function(){var t=0;console.error("Violation : "+e.replace(/%s/g,function(){return r[t++]}))}()}function g(t){return!!t&&("object"==typeof t||"function"==typeof t)}function h(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=null===t?"":""+t;return M.test(e)?e.replace(C,function(t){return E[t]}):e}var b=n(5)["default"],x=n(24)["default"],y=n(10)["default"],_=n(3)["default"];e.__esModule=!0,e.getGlobalObject=r,e.memoize=o,e.uniqueId=i,e.dasherize=a,e.startsWith=u,e.keyMirror=s,e.predicate=c,e.stylesheet=l,e.NotSupported=d,e.uuid=p,e.invariant=v,e.invariantLog=m,e.isObject=g,e.escape=h;var S=n(4),w=_(S),j=r()||{};"undefined"==typeof j&&(j={__fake:!0}),"undefined"==typeof j.console&&(j.console={log:function(){},error:function(){},table:function(){},debug:function(){},trace:function(){}}),j.__ElemInternals=j.__ElemInternals||{},j.__ElemInternals.Utils=j.__ElemInternals.Utils||{},j.__ElemInternals.Utils.__idCounter=j.__ElemInternals.Utils.__idCounter||0;var O=o(r);e.memoGobalObject=O;var E={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},k="(?:"+x(E).join("|")+")",M=RegExp(k),C=RegExp(k,"g"),I=Array.isArray;e.isArray=I;var A=function(t){return void 0===t};e.isUndefined=A;var T=y;e.contains=T;var F=function(t){return g(t)&&"[object Function]"==Object.prototype.toString.call(t)};e.isFunction=F;var D=function(t){return"string"==typeof t||!!t&&"object"==typeof t&&"[object String]"==Object.prototype.toString.call(t)};e.isString=D}).call(e,function(){return this}())},function(t,e,n){t.exports={"default":n(29),__esModule:!0}},function(t,e,n){var r=n(41),o=n(1),i="prototype",a=function(t,e){return function(){return t.apply(e,arguments)}},u=function(t,e,n){var s,c,f,l,d=t&u.G,p=t&u.P,v=d?r:t&u.S?r[e]:(r[e]||{})[i],m=d?o:o[e]||(o[e]={});d&&(n=e);for(s in n)c=!(t&u.F)&&v&&s in v,c&&s in m||(f=c?v[s]:n[s],d&&"function"!=typeof v[s]?l=n[s]:t&u.B&&c?l=a(f,r):t&u.W&&v[s]==f?!function(t){l=function(e){return this instanceof t?new t(e):t(e)},l[i]=t[i]}(f):l=p&&"function"==typeof f?a(Function.call,f):f,m[s]=l,p&&((m[i]||(m[i]={}))[s]=f))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,t.exports=u},function(t,e,n){t.exports=function(t,e){var r=n(6),o=(n(1).Object||{})[t]||Object[t],i={};i[t]=e(o),r(r.S+r.F*n(13)(function(){o(1)}),"Object",i)}},function(t,e,n){var r=n(14),o=n(12);t.exports=function(t){return r(o(t))}},function(t,e,n){"use strict";function r(t){V=t}function o(){V=function(t){throw t}}function i(t){var e=O({},J)||null;return function(){for(var n=arguments.length,r=Array(n),o=0;n>o;o++)r[o]=arguments[o];try{return t.apply(e,r)}catch(i){V(i)}}}function a(t){for(;!F.isUndefined(t)&&!E(t,null)&&t.firstChild;)t.removeChild(t.firstChild)}function u(t){if(!t)return"";var e=[];for(var n in t)if("extend"!==n&&"mount"!==n&&"unmount"!==n&&"toString"!==n){var r=F.dasherize(n);"className"===n&&(r="class");var o=t[n];o&&(F.isFunction(o)&&(o=o()),o&&e.push(r+": "+o+";"))}return e.join(" ")}function s(t){if(!t)return[];var e=[];for(var n in t){var r=t[n];r===!0&&e.push(F.dasherize(n))}return e}function c(t,e,n){if(!t)return[];var r={ref:void 0};for(var o in t){var a=F.dasherize(o);if("className"===o&&(a="class"),F.startsWith(a,"on"))n[o.toLowerCase()]=i(t[o]);else if("ref"===a)r.ref=t[o];else{var c=t[o];c&&F.isFunction(c)&&(c=c()),c&&(F.isObject(c)&&"style"===a?e.style=u(c):F.isArray(c)&&"class"===a?e[a]=c.join(" "):F.isObject(c)&&"class"===a?e[a]=s(c).join(" "):e[a]=c)}}return r}function f(t){return t.__isHTMLElement}function l(t,e,n,r,o){return{name:t,attrs:e,children:n,key:r,namespace:o,__isHTMLElement:!0,renderToString:function(){e.innerHTML&&n.push({renderToString:function(){return e.innerHTML}});var r=[];for(var o in e){var i=e[o];if("attributes"===o)for(var a in i)r.push(a+'="'+i[a]+'"');else r.push(o+'="'+i+'"')}var u=0===n.length;return u?"<"+t+" "+r.join(" ")+" />":"<"+t+(r.length>0?" ":"")+r.join(" ")+">"+n.map(function(t){return t.renderToString()}).join("")+"</"+t+">"},renderToDOM:function(){var i=F.getGlobalObject().document,a=o?i.createElementNS(o,F.escape(t)):i.createElement(F.escape(t));r&&a.setAttribute("data-key",r);for(var u in e){var s=e[u];if("attributes"===u)for(var c in e.attributes){var f=e.attributes[c];"indeterminate"===c&&"input"===t?a.indeterminate=f:"value"===c&&"input"===t?a.value=f:a.setAttribute(F.dasherize(c),f)}else u.startsWith("on")?a.addEventListener(u.replace("on",""),s):"innerHTML"===u?a.innerHTML=s:"value"===u&&"input"===t?a.value=s:"indeterminate"===u&&"input"===t?a.indeterminate=s:a.setAttribute(F.dasherize(u),s)}for(var l in n){var d=n[l];a.appendChild(d.renderToDOM())}return a}}}function d(t,e,n,r,o){void 0===e&&(e={}),void 0===n&&(n=[]);var i=void 0,a=[].concat.apply([],n),u=[],s=function(t){var e=a[t];e&&(F.isFunction(e)&&(e=e()),e&&(f(e)?u.push(e):F.isObject(e)&&e.__asHtml?i=e.__asHtml:u.push({__isHTMLElement:!0,renderToString:function(){return e+""},renderToDOM:function(){return F.getGlobalObject().document.createTextNode(e+"")}})))};for(var d in a)s(d);a=u;var p=J;if(F.isFunction(t)&&!t.isElemComponentFactory){var v=function(){var n="Elem.function."+(t.componentName||t.name||"<anonymous function>")+".tree";N.markStart(n);var i=O({},e);i.children=a,i.key=r,i.namespace=o;var u=O({},$);r&&!function(){u.__keys.push(r);var t=u.setState,e=u.replaceState,n=u.state;u.globalState=n,u.setGlobalState=t,u.replaceGlobalState=e,u.state=n["substateof-"+r]||{},u.replaceState=function(e,n){var o;return t((o={},o["substateof-"+r]=e,o),n)},u.setState=function(e,o){var i,a=n["substateof-"+r]||{};for(var u in e)a[u]=e[u];t((i={},i["substateof-"+r]=a,i),o)},u.__isInitialized=function(){return"undefined"!=typeof n["substateof-"+r]},u.withInitialState=function(t){if(!n["substateof-"+r]){var e,o=F.isFunction(t)?t():t;u.__internalSetState((e={},e["substateof-"+r]=O({},o),e))}return n["substateof-"+r]}}();var s=O({},u,{props:i,children:a});s.withInitialState=function(t){s.state=u.withInitialState(t)},s.withInitialContext=function(t){s.context=u.withInitialContext(t)},s.withDefaultProps=function(t){var e=F.isFunction(t)?t():t;s.props=k({},e,s.props)},J=s;var c=t.bind(s)(u,i,a);if(J=p,z.isEnabled()){var f=Math.random().toString(15).slice(10,20)+"";c.attrs.attributes["data-inspector-selector"]=f,c.inspectorContext={node:'[data-inspector-selector="'+f+'"]',type:"function",name:t.componentName||t.name||"<anonymous function>",state:u.state,props:e,setState:u.setState,replaceState:u.replaceState}}return N.markStop(n),{v:c}}();if("object"==typeof v)return v.v}var m={attributes:{}},g=c(e,m.attributes,m);if("input"!==t&&"INPUT"!==t||!e.value||(m.value=e.value,m.attributes.value=e.value,m.attributes.defaultValue=e.value),g.ref){var h=F.uniqueId("elemref-");m.attributes["data-elemref"]=h,K[g.ref]=h}return i&&(m.innerHTML=i),l(t,m,a,e.key,o)}function p(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];var o=n.length,i=F.isString(t)?F.escape(t)||"unknown":t;if(2===arguments.length){if(1===o&&F.isString(n[0]))return d(i,{},[n[0]],void 0,void 0);if(1===o&&f(n[0]))return d(i,{},[n[0]],void 0,void 0);if(1===o&&F.isArray(n[0]))return d(i,{},n[0],void 0,void 0);if(1===o&&F.isFunction(n[0]))return d(i,{},[n[0]],void 0,void 0);if(1===o&&F.isObject(n[0])&&n[0].__asHtml)return d(i,{},[n[0]],void 0,void 0);if(1===o&&F.isObject(n[0]))return d(i,n[0],[],n[0].key,void 0)}else if(3===arguments.length){if(2===o&&F.isObject(n[0])&&!F.isArray(n[1]))return d(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&F.isObject(n[0])&&f(n[1]))return d(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&F.isObject(n[0])&&F.isArray(n[1]))return d(i,n[0],n[1],n[0].key,void 0);if(2===o&&F.isObject(n[0])&&n[1].__asHtml)return d(i,n[0],n[1],n[0].key,void 0);if(2===o&&F.isFunction(n[1]))return d(i,n[0],[n[1]],n[0].key,void 0);if(2===o&&F.isString(n[0])&&F.isObject(n[1]))return d(i,n[1],[],n[1].key,n[0]);if(2===o&&F.isString(n[0])&&!F.isObject(n[1])&&!F.isArray(n[1]))return d(i,{},[n[1]],void 0,n[0])}else if(4===arguments.length){if(3===o&&(F.isUndefined(n[0])||F.isString(n[0]))&&F.isObject(n[1])&&!F.isArray(n[2]))return d(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(F.isUndefined(n[0])||F.isString(n[0]))&&F.isObject(n[1])&&f(n[2]))return d(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(F.isUndefined(n[0])||F.isString(n[0]))&&F.isObject(n[1])&&n[2].__asHtml)return d(i,n[1],[n[2]],n[1].key,n[0]);if(3===o&&(F.isUndefined(n[0])||F.isString(n[0]))&&F.isObject(n[1])&&F.isArray(n[2]))return d(i,n[1],n[2],n[1].key,n[0])}else if(0===o)return d(i,{},[],void 0,void 0);return console.warn("Unknown el expression ...",arguments),d(i,n[1],n[2],n[1].key,n[0])}function v(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];return p.apply(null,[t,H].concat(n))}function m(t){return p("span",{__asHtml:"&nbsp;".repeat(t||1)})}function g(t){return p("span",{},t)}function h(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],r=!1,o=!1,i={__keys:[],__oldKeys:[],refs:n,state:{},context:{},refresh:t,redraw:t,getDOMNode:function(){var t=F.getGlobalObject().document;return e.ownerDocument&&(t=e.ownerDocument),F.isString(e)?t.querySelector(e):e}};return i.__parentIsInitialized=function(){return r&&o},i.__isInitialized=i.__parentIsInitialized,i.__initialized=function(){r=!0,o=!0},i.withInitialState=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!r){var e=F.isFunction(t)?t():t;r=!0,i.state=k({},e,i.state)}return i.state},i.withInitialContext=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!o){var e=F.isFunction(t)?t():t;o=!0,i.context=k({},e,i.context)}return i.context},i.__internalSetState=function(t){for(var e in t)i.state[e]=t[e]},i.__internalReplaceState=function(t){return i.state=t},i.setState=function(e,n){for(var r in e)i.state[r]=e[r];t(),n&&n()},i.replaceState=function(e,n){i.state=e,t(),n&&n()},i}function b(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];N.markStart("Elem.render");var r=e,o=t,i={};F.isFunction(o)?!function(){var a="Elem."+(o.name?"function":"render")+"."+(o.componentName||o.name||"")+".tree";N.markStart(a);var u={context:void 0,props:n},s=function(){var o=void 0;try{var i=function(){$=u.context;var e=O({},u.context,{props:u.props});return e.withInitialState=function(t){e.state=u.context.withInitialState(t)},e.withInitialContext=function(t){e.context=u.context.withInitialContext(t)},e.withDefaultProps=function(t){var n=F.isFunction(t)?t():t;e.props=k({},n,e.props)},J=e,o=t.bind(e)(u.context,u.props),J=void 0,{v:o}}();if("object"==typeof i)return i.v}finally{var a=O({},K);K={};for(var s in u.context.refs)delete u.context.refs[s];for(var s in a)u.context.refs[s]=a[s];if($=void 0,0!==u.context.__keys.length){var c=u.context.__oldKeys.filter(function(t){return!F.contains(u.context.__keys,t)});for(var f in c){var s="substateof-"+c[f];delete u.context.state[s]}u.context.__oldKeys=[].concat(u.context.__keys),u.context.__keys=[]}z.isEnabled()&&!n.__inspectorSilent&&!function(){var i=e.id||e,a=t.componentName||t.name||"<anonymous function>",s=function d(t,e,n){if(t&&t.inspectorContext){var r=function(){var r=O({},t.inspectorContext,{children:[],rank:n+1});return t.children&&t.children.forEach(function(t){return d(t,r.children,n+1)}),e&&e.push(r),{v:r}}();if("object"==typeof r)return r.v}else t&&t.children&&t.children.forEach(function(t){return d(t,e,n)})},c=i+" > "+a,f=Math.random().toString(15).slice(10,20)+"";o.attrs.attributes["data-inspector-selector"]=f;var l={name:a,node:r,selectableNode:'[data-inspector-selector="'+f+'"]',state:u.context.state,props:n,setState:u.context.setState,replaceState:u.context.replaceState,rank:0,children:[]};s(o,l.children,0),z.exposeComponentTreeAt(c,l)}()}},c=function(){N.markStart(a);var t=s();b(t,r),N.markStop(a)};u.context=h(c,r,{}),u.context.state={},o=s(),u.context.__initialized(),i.redraw=u.context.redraw,i.setState=u.context.setState,i.replaceState=u.context.replaceState,N.markStop(a)}():F.isArray(o)&&(o=p("span",o));var u=F.getGlobalObject().document;r.ownerDocument&&(u=r.ownerDocument),F.isString(r)&&(r=u.querySelector(r));var s=void 0;return null!==r&&(s=r.rootId,N.markStart("Elem.render.clear"),a(r),N.markStop("Elem.render.clear"),N.markStart("Elem.render.append"),r.appendChild(o.renderToDOM()),N.markStop("Elem.render.append")),N.markStop("Elem.render"),O({},i,{unmount:function(){delete r.rootId,a(r),delete B[s],z.isEnabled()&&z.removeExposedComponent(e.id||e)}})}function x(t){var e=t,n=F.getGlobalObject().document;e.ownerDocument&&(n=e.ownerDocument),F.isString(e)&&(e=n.querySelector(e)),a(e),e.rootId&&(delete B[e.rootId],delete e.rootId),z.isEnabled()&&z.removeExposedComponent(t.id||t)}function y(t){return F.getGlobalObject().document.querySelector('[data-elemref="'+t+'"]')}function _(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];N.markStart("Elem.renderToJson");var n=t;if(F.isFunction(n)){var r=O({},K);K={};var o=h(function(){},null,r),i=O({},o,{props:e});n=n.bind(i)(o,e)}return N.markStop("Elem.renderToJson"),n}function S(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];N.markStart("Elem.renderToString");var n=t;if(F.isFunction(n)){var r=O({},K);K={};var o=h(function(){},null,r),i=O({},o,{props:e});n=n.bind(i)(o,e)}var a=n.renderToString();return N.markStop("Elem.renderToString"),a}function w(t,e){for(var n=e||{},r=arguments.length,o=Array(r>2?r-2:0),i=2;r>i;i++)o[i-2]=arguments[i];return M(Z,t)?d(t,n,o||[],n.key||void 0,H):d(t,n,o||[],n.key||void 0,void 0)}function j(t){function e(e,n){var r=this,o=e.__isInitialized(),i=e.__parentIsInitialized();if(t.getDefaultProps&&this.withDefaultProps(function(){return t.getDefaultProps.bind(r)(e,n)}),!o&&t.getInitialState){var a=e.withInitialState(function(){return t.getInitialState.bind(r)(e,n)});e.state=a,this.state=a}if(!i&&!n.key&&t.getRootContext){var u=e.withInitialContext(function(){return t.getRootContext.bind(r)(e,n)});e.context=u,this.context=u}return!o&&t.init&&t.init.bind(this)(e,n),t.render.bind(this)(e,n)}if(!t.render)throw new Error("A component should have at least one render function");return t.name||console.warn("A component should have a name"),e.componentName=t.name||"ElemComponent",e}var O=n(11)["default"],E=n(23)["default"],k=n(5)["default"],M=n(10)["default"],C=n(3)["default"],I=n(25)["default"],A=n(26)["default"];e.__esModule=!0,e.setErrorCallback=r,e.resetErrorCallback=o,e.el=p,e.svg=v,e.nbsp=m,e.text=g,e.render=b,e.unmount=x,e.findDOMNode=y,e.renderToJson=_,e.renderToString=S,e.jsx=w,e.createComponent=j;var T=n(4),F=C(T),D=n(18),N=C(D),P=n(57),G=C(P),L=n(17),z=C(L),H="http://www.w3.org/2000/svg";e.svgNS=H;var U=G.registerWebComponent;e.registerWebComponent=U;var W=F.stylesheet;e.stylesheet=W;var R=F.predicate;e.predicate=R;var q=n(54);I(e,A(q,I));var B={},K={},$=void 0,J=void 0,V=function(t){throw t},Z=["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]},function(t,e,n){t.exports={"default":n(28),__esModule:!0}},function(t,e,n){"use strict";var r=n(5)["default"];e["default"]=r||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},e.__esModule=!0},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(38);t.exports=0 in Object("z")?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t){return Object(r(t))}},function(t,e){"use strict";e.__esModule=!0,e["default"]={isEnabled:function(){return!1}},t.exports=e["default"]},function(t,e){"use strict";e.__esModule=!0,e["default"]={markStart:function(){},markStop:function(){}},t.exports=e["default"]},function(t,e,n){t.exports={"default":n(30),__esModule:!0}},function(t,e,n){t.exports={"default":n(31),__esModule:!0}},function(t,e,n){t.exports={"default":n(32),__esModule:!0}},function(t,e,n){t.exports={"default":n(33),__esModule:!0}},function(t,e,n){t.exports={"default":n(34),__esModule:!0}},function(t,e,n){t.exports={"default":n(35),__esModule:!0}},function(t,e,n){"use strict";var r=n(22)["default"],o=n(21)["default"],i=n(20)["default"];e["default"]=function(t,e){for(var n=r(e),a=0;a<n.length;a++){var u=n[a],s=o(e,u);s&&s.configurable&&void 0===t[u]&&i(t,u,s)}return t},e.__esModule=!0},function(t,e){"use strict";e["default"]=function(t,e){var n=e({},t);return delete n["default"],n},e.__esModule=!0},function(t,e){"use strict";e["default"]=function(t){return t&&t.__esModule?t:{"default":t}},e.__esModule=!0},function(t,e,n){n(52),t.exports=n(1).Array.includes},function(t,e,n){n(47),t.exports=n(1).Object.assign},function(t,e,n){var r=n(2);t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){var r=n(2);t.exports=function(t,e,n){return r.setDesc(t,e,n)}},function(t,e,n){var r=n(2);n(48),t.exports=function(t,e){return r.getDesc(t,e)}},function(t,e,n){var r=n(2);n(49),t.exports=function(t){return r.getNames(t)}},function(t,e,n){n(50),t.exports=n(1).Object.is},function(t,e,n){n(51),t.exports=n(1).Object.keys},function(t,e,n){var r=n(8),o=n(45),i=n(44);t.exports=function(t){return function(e,n,a){var u,s=r(e),c=o(s.length),f=i(a,c);if(t&&n!=n){for(;c>f;)if(u=s[f++],u!=u)return!0}else for(;c>f;f++)if((t||f in s)&&s[f]===n)return t||f;return!t&&-1}}},function(t,e,n){var r=n(16),o=n(14),i=n(39),a=n(42);t.exports=n(13)(function(){var t=Object.assign,e={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return e[r]=7,o.split("").forEach(function(t){n[t]=t}),7!=t({},e)[r]||Object.keys(t({},n)).join("")!=o})?function(t,e){for(var n=r(t),u=arguments.length,s=1;u>s;)for(var c,f=o(arguments[s++]),l=i(f),d=l.length,p=0;d>p;)a(f,c=l[p++])&&(n[c]=f[c]);return n}:Object.assign},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(2);t.exports=function(t){var e=r.getKeys(t),n=r.getSymbols;if(n)for(var o,i=n(t),a=r.isEnum,u=0;i.length>u;)a.call(t,o=i[u++])&&e.push(o);return e}},function(t,e,n){var r={}.toString,o=n(8),i=n(2).getNames,a="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(t){try{return i(t)}catch(e){return a.slice()}};t.exports.get=function(t){return a&&"[object Window]"==r.call(t)?u(t):i(o(t))}},function(t,e){var n="undefined",r=t.exports=typeof window!=n&&window.Math==Math?window:typeof self!=n&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},function(t,e,n){var r=n(15),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),0>t?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(15),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(6);r(r.S+r.F,"Object",{assign:n(37)})},function(t,e,n){var r=n(8);n(7)("getOwnPropertyDescriptor",function(t){return function(e,n){return t(r(e),n)}})},function(t,e,n){n(7)("getOwnPropertyNames",function(){return n(40).get})},function(t,e,n){var r=n(6);r(r.S,"Object",{is:n(43)})},function(t,e,n){var r=n(16);n(7)("keys",function(t){return function(e){return t(r(e))}})},function(t,e,n){"use strict";var r=n(6),o=n(36)(!0);r(r.P,"Array",{includes:function(t){return o(this,t,arguments[1])}}),n(46)("includes")},function(t,e){"use strict";e.__esModule=!0,e["default"]={},t.exports=e["default"]},function(t,e,n){"use strict";var r=n(3)["default"];e.__esModule=!0;var o=n(4),i=r(o),a=n(18),u=r(a),s=n(55),c=r(s),f=n(53),l=r(f);e["default"]={Utils:i,Perf:u,Store:c,Devtools:l},t.exports=e["default"]},function(t,e,n){"use strict";function r(){function t(t){f.push(t);var e=d;i.forEach(function(n){e[n.name]=n.getNewState(e[n.name],t)}),d=e,p.forEach(function(t){return t()})}function e(t){return p.push(t),function(){var e=p.indexOf(t);p.splice(e,1)}}function n(t){var e={};e.ephemeralListener=function(){t();var n=p.indexOf(e.ephemeralListener);p.splice(n,1)},p.push(e.ephemeralListener)}var r=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=[];if(h.isObject(r))for(var a in r){var u=r[a];if(!h.isFunction(u))throw new Error("Store should be a function ...");var s=u.name||a||"substate-"+S++;i.push({getNewState:u,name:s})}else{if(!h.isFunction(r))throw new Error("Store should be a function or an object of functions ...");var c=r.name||"reducer";i=[{getNewState:r,name:c}]}var f=[],d=o,p=[];return t({type:"@@init"}),{dispatch:t,subscribe:e,ephemeralSubscribe:n,setState:function(t){return d=t,p.forEach(function(t){return t()}),d},getState:function(){return l({},d)}}}function o(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=r(t,n),i=o.dispatch,a=[],u={getState:o.getState,dispatch:function(t){return i(t)}};return a=e.map(function(t){return t(u)}),i=[].concat(a,[o.dispatch]).reduceRight(function(t,e){return e(t)}),l({},o,{dispatch:i})}}function i(t,e){var n=arguments,r={},o=function(o){var i=t[o],a=o||i.name||"boundaction-"+S++;r[a]=function(){var t=i.apply(null,n);e(t)}};for(var i in t)o(i);return r}function a(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return function(n,r){var o=t[r.type];return o?o(n,r):n||e}}function u(t){var e=a;return{handleActions:function(n){return e(n,t)}}}function s(t,e){var n=e.store,r=e.actions,o=void 0===r?{}:r,a=e.render,u=i(o,n.dispatch);return t.context.actions=u,t.context.store=n,t.context.dispatch=n.dispatch,t.context.getState=n.getState,n.ephemeralSubscribe(function(){return t.refresh()}),x.isEnabled()&&t.__internalSetState({storeStateReadOnly:l({},n.getState())}),m.el(a,e)}function c(t,e){var n=e.selector,r=void 0===n?function(t){return l({},t)}:n,o=e.actions,a=void 0===o?t.context.actions:o,u=e.render,s=t.context.store,c=i(a,s.dispatch),f=l({},e,c,r(s.getState()));return m.el("span",m.el(u,f))}function f(t,e){return void 0===t&&(t=function(t){return l({},t)}),function(n){return function(){return m.el(c,{selector:t,actions:e,render:n})}}}var l=n(11)["default"],d=n(3)["default"],p=n(27)["default"];e.__esModule=!0,e.createStore=r,e.enrichCreateStoreWith=o,e.bindActionsToDispatch=i,e.handleActions=a,e.withInitialState=u,e.Provider=s,e.Selector=c,e.connect=f;var v=n(9),m=d(v),g=n(4),h=d(g),b=n(17),x=d(b),y=n(56),_=p(y),S=0,w=_["default"];e.Plugins=w},function(t,e,n){"use strict";var r=n(5)["default"];e.__esModule=!0,e["default"]={Logger:function(t){return function(e){return function(n){console.group(n.type),console.info("Dispatching",n);var r=e(n);return console.log("Next state",t.getState()),console.groupEnd(n.type),r}}},PromiseFieldHandler:function(t){return function(t){return function(e){function n(t,n){var o=r({},e,{ready:t},n);return delete o.promise,o}return e.promise?(t(n(!1)),e.promise.then(function(e){return t(n(!0,{result:e}))},function(e){return t(n(!0,{error:e}))})):t(e)}}}},t.exports=e["default"]},function(t,e,n){"use strict";function r(t,e){function n(t,n){return e.isElemComponentFactory?e(t).renderTo(n):u.render(e,n,t)}console.log("registering WebComponent "+t);var r=c.getGlobalObject().document,i=o(HTMLElement.prototype);i.createdCallback=function(){var t={};for(var e in this.attributes){var o=this.attributes[e];t[o.name]=o.value}this.props=t,this.fragment=r.createElement("content"),this.fragment.setAttribute("id",c.uuid()),this.appendChild(this.fragment),this.renderedElement=n(t,this.fragment)},i.attributeChangedCallback=function(t,e,r){this.props[t]=r,n(this.props,this.fragment)},f(t,{prototype:i})}var o=n(19)["default"],i=n(3)["default"],a=n(9),u=i(a),s=n(4),c=i(s),f=void 0;try{f=(c.getGlobalObject().document.registerElement||c.getGlobalObject().document.register).bind(c.getGlobalObject().document)}catch(l){}f?e.registerWebComponent=r:e.registerWebComponent=function(){window.console&&console.error("[Elem] WebComponent not available here :(")}}])});