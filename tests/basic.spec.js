const chai = require('chai');
const setupEnv = require('./utils/dom');

setupEnv();

const Elem = require('../lib/main');

const expect = chai.expect;

function SimpleComponent() {
  return Elem.el('h1', 'Hello World!');
}

describe('A simple component', () => {
  it('can be rendered in the DOM', done => {
    Elem.render(SimpleComponent, '#app');
    let node = document.getElementsByTagName('h1')[0];
    expect(node).to.exist;
    expect(node.innerHTML).to.be.a('string');
    expect(node.innerHTML).to.be.equal('Hello World!');
    done();
  });
});
