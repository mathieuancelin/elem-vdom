const Elem = require('../../src/main');
const simulant = require('simulant');
const chai = require('chai');
const expect = chai.expect;
const app = '#app';

export function appHtml() {
  return document.querySelector(app).innerHTML;
}

export function html(of) {
  return document.querySelector(of).innerHTML;
}

export function children(of) {
  return document.querySelector(of).childNodes;
}

export function node(of) {
  return document.querySelector(of);
}

export function nodes(of) {
  return document.querySelectorAll(of);
}

export function renderComponent(c) {
  return Elem.render(c, app);
}

export function cleanup() {
  return Elem.unmount(app);
}

export function on(selector) {
  let domNode = (typeof selector === 'string') ? node(selector) : selector;
  function simulate(name, payload = {}) {
    simulant.fire(domNode, name, payload);
    return { simulate };
  }
  return { simulate };
}

export function change(selector, value) {
  let domNode = (typeof selector === 'string') ? node(selector) : selector;
  domNode.value = value;
  on(selector).simulate('change');
}

export function click(selector) {
  // document.querySelector(on).click();
  on(selector).simulate('click');
}

export function childrenOf(selector) {
  return {
    count() {
      return {
        shouldBe(number) {
          expect(children(selector).length).to.be.equal(number);
        }
      };
    }
  };
}

export function htmlOf(selector) {
  return {
    shouldBe(vnode) {
      expect(node(selector).parentNode.innerHTML).to.be.equal(Elem.renderToString(vnode));
    }
  };
}
