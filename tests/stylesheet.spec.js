const chai = require('chai');
const Elem = require('../lib/main');
const expect = chai.expect;

describe('elem-vdom stylesheet api', () => {

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

    expect(Style.extend).to.exist;
    expect(Style.withBackground.extend).to.exist;
    // expect(CustomBackground.extend).to.exist;
    expect(CustomStyle.extend).to.exist;
    expect(CustomStyle.customBackground.extend).to.exist;

    expect(CustomBackground.backgroundColor).to.be.equal('red');
    expect(CustomBackground.borderRadius).to.be.equal('5px');
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
