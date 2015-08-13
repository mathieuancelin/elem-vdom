let jsdom = require('jsdom');

let doc;

export function setupEnv() {
  doc = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>');
  let win = doc.defaultView;
  function propagateToGlobal(window) {
    for (let key in window) {
      if (!window.hasOwnProperty(key)) continue;
      if (key in global) continue;
      global[key] = window[key];
    }
  }
  global.document = doc;
  global.window = win;
  propagateToGlobal(win);
  console.log('\nENV setup is done !!!');
}
