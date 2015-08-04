/* eslint eqeqeq:0 */

// import isFunction from 'lodash/lang/isFunction';
// import isObject from 'lodash/lang/isObject';
// import isArray from 'lodash/lang/isArray';
// import isString from 'lodash/lang/isString';
// import isUndefined from 'lodash/lang/isUndefined';
// import contains from 'lodash/collection/contains';
// import escape from 'lodash/string/escape';

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
const source = '(?:' + Object.keys(escapeMap).join('|') + ')';
const testRegexp = RegExp(source);
const replaceRegexp = RegExp(source, 'g');

function isObject(χ) {
  return !!χ && (typeof χ == 'object' || typeof χ == 'function');
}

function escape(value = '') {
  let string = value === null ? '' : '' + value;
  return testRegexp.test(string) ? string.replace(replaceRegexp, (match) => escapeMap[match]) : string;
}

export default {
  isFunction: (χ) => isObject(χ) && Object.prototype.toString.call(χ) == '[object Function]',
  isObject,
  isArray: Array.isArray,
  isString: (χ) => typeof χ == 'string' || ((!!χ && typeof χ == 'object') && Object.prototype.toString.call(χ) == '[object String]'),
  isUndefined: (χ) => χ === undefined,
  escape,
  contains: (arr, of) => ~arr.indexOf(of)
};
