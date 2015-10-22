/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

const chai = require('chai');
const Elem = require('../src/main');
const expect = chai.expect;

describe('elem-vdom universal app support', () => {
/*
  it('can render simple components as string', done => {
    let str = Elem.renderToString(Elem.el('div', [
      Elem.el('span', 'Hello'),
      Elem.el('h3', 'World')
    ]));
    expect(str).to.be.equal('<div><span>Hello</span><h3>World</h3></div>');
    done();
  });

  it('can render simple components as JSON', done => {
    let json = Elem.renderToJson(Elem.el('div', [
      Elem.el('span', 'Hello'),
      Elem.el('h3', 'World')
    ]));
    expect(json).to.deep.equal({
      attrs: [],
      children: [
        {
          attrs: [],
          children: ['Hello'],
          name: 'span'
        },
        {
          attrs: [],
          children: ['World'],
          name: 'h3'
        }
      ],
      name: 'div'
    });
    done();
  });

  it('can render complex components as string', done => {
    let str = Elem.renderToString(Elem.el('div', { onClick: () => console.log('hello') }, [
      Elem.el('span', { id: 'hello' }, 'Hello'),
      Elem.el('h3', { style: { borderStyle: 'solid' } }, 'World')
    ]));
    expect(str).to.be.equal('<div><span id="hello">Hello</span><h3 style="border-style: solid;">World</h3></div>');
    done();
  });
*/
});
