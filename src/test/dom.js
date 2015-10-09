/* eslint no-unused-expressions:0 */

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

export function renderComponent(c, props = {}) {
  return Elem.render(c, app, props);
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

export function select(selector) {
  const domNode = () => (typeof selector === 'string') ? node(selector) : selector;
  return {
    id() {
      return {
        get() {
          return domNode().id;
        },
        shouldBe(value) {
          expect(domNode().id).to.be.equal(value);
          return select(selector);
        }
      };
    },
    className() {
      return {
        get() {
          return domNode().className;
        },
        shouldBe(value) {
          expect(domNode().className).to.be.equal(value);
          return select(selector);
        }
      };
    },
    html() {
      return {
        get() {
          return domNode().innerHTML;
        },
        shouldBe(value) {
          expect(domNode().innerHTML).to.be.equal(value);
          return select(selector);
        }
      };
    },
    simulate(name, payload = {}) {
      simulant.fire(domNode(), name, payload);
      return select(selector);
    },
    click() {
      simulant.fire(domNode(), 'click');
      return select(selector);
    },
    change(value) {
      domNode().value = value;
      simulant.fire(domNode(), 'change');
      return select(selector);
    },
    shouldExist() {
      expect(domNode()).to.exist;
      return select(selector);
    },
    shouldNotExist() {
      expect(domNode()).to.not.exist;
      return select(selector);
    },
    shouldBe(vnode) {
      let str = (typeof vnode === 'string') ? vnode : Elem.renderToString(vnode);
      expect(domNode().parentNode.innerHTML).to.be.equal(str);
      return select(selector);
    },
    children() {
      return {
        get() {
          return domNode().childNodes;
        },
        shouldBe(vnodes) {
          let str = (typeof vnodes === 'string') ? vnodes : vnodes.map(e => Elem.renderToString(e)).join('');
          expect(domNode().innerHTML).to.be.equal(str);
          return select(selector);
        },
        count() {
          return {
            get() {
              return domNode().childNodes.length;
            },
            shouldBe(number) {
              expect(domNode().childNodes.length).to.be.equal(number);
              return select(selector);
            }
          };
        }
      };
    }
  };
}
