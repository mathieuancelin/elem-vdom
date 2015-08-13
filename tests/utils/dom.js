const Elem = require('../../lib/main');
const Keysim = require('keysim');
const app = '#app';

export function appHtml() {
  return document.querySelector(app).innerHTML;
}

export function html(of) {
  return document.querySelector(of).innerHTML;
}

export function node(of) {
  return document.querySelector(of);
}

export function nodes(of) {
  return document.querySelectorAll(of);
}

export function click(on) {
  document.querySelector(on).click();
}

export function renderComponent(c) {
  return Elem.render(c, app);
}

export function cleanup() {
  return Elem.unmount(app);
}

export function type(el, str) {
  let element = document.querySelector(el);
  let keyboard = Keysim.Keyboard.US_ENGLISH;
  keyboard.dispatchEventsForInput(str, element);
  return {
    then(cb) {
      setTimeout(cb, 0);
    }
  };
}
