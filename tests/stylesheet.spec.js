const chai = require('chai');
const Elem = require('../lib/main');
const DOM = require('./utils/dom');
const expect = chai.expect;

const expectedCss = `with-background {
    background-color: yellow;
    border-style: solid;
    border-width: 1px;
    border-color: black;
}`;

describe('elem-vdom stylesheet api', () => {

  it('can be mounted in the dom', done => {
    let Style = Elem.stylesheet({
      withBackground: {
        backgroundColor: 'yellow',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'black'
      }
    });
    DOM.cleanup();
    Style.mount();
    let node = DOM.node('style');
    expect(node.innerHTML).to.be.equal(expectedCss);
    Style.unmount();
    node = DOM.node('style');
    expect(node).to.not.exist;
    done();
  });

  it('can be extended', done => {

    let Style = Elem.stylesheet({
      withBackground: {
        backgroundColor: 'yellow',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'black'
      }
    });
    let CustomBackground = Style.withBackground.extend({
      backgroundColor: 'red',
      borderRadius: '5px',
      borderColor: 'blue'
    });
    let CustomStyle = Elem.stylesheet({
      customBackground: {
        extend: Style.withBackground,
        backgroundColor: 'red',
        borderRadius: '5px',
        borderColor: 'blue'
      }
    });

    let CustomBackground2 = CustomBackground.extend({
      borderRadius: '6px',
      color: 'green'
    });
    let CustomBackground3 = CustomBackground2.extend({
      borderRadius: '7px',
      fontSize: '12px'
    });

    DOM.cleanup();

    expect(Style.extend).to.exist;
    expect(Style.withBackground.extend).to.exist;
    expect(CustomBackground.extend).to.exist;
    expect(CustomBackground2.extend).to.exist;
    expect(CustomBackground3.extend).to.exist;
    expect(CustomStyle.extend).to.exist;
    expect(CustomStyle.customBackground.extend).to.exist;

    expect(CustomBackground.backgroundColor).to.be.equal('red');
    expect(CustomBackground.borderRadius).to.be.equal('5px');
    expect(CustomBackground2.borderRadius).to.be.equal('6px');
    expect(CustomBackground2.color).to.be.equal('green');
    expect(CustomBackground3.borderRadius).to.be.equal('7px');
    expect(CustomBackground3.fontSize).to.be.equal('12px');
    expect(CustomBackground.borderColor).to.be.equal('blue');
    expect(CustomBackground.borderWidth).to.be.equal('1px');
    expect(CustomBackground.borderStyle).to.be.equal('solid');

    expect(CustomStyle.customBackground.backgroundColor).to.be.equal('red');
    expect(CustomStyle.customBackground.borderRadius).to.be.equal('5px');
    expect(CustomStyle.customBackground.borderColor).to.be.equal('blue');
    expect(CustomStyle.customBackground.borderWidth).to.be.equal('1px');
    expect(CustomStyle.customBackground.borderStyle).to.be.equal('solid');
    done();
  });

});
