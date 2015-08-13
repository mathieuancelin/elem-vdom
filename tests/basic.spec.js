import * as Elem from '../lib/main';
import chai from 'chai';
import setupEnv from './utils/dom';

const expect = chai.expect;

setupEnv();

function SimpleComponent() {
  return Elem.el('h1', { id: 'title'}, 'Hello World!');
}

describe('A simple component', () => {
  it('can be rendered in the DOM', done => {
    Elem.render(SimpleComponent, '#app');

    console.log(window.document.innerHTML);

    let node = document.getElementById('#title');
    expect(node).to.exist;
    expect(node.innerHTML).to.be.a('string');
    expect(node.innerHTML).to.be.equal('Hello World!');
  });
});
