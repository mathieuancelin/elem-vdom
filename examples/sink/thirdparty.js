const Showcase = require('./showcase');
const Elem = require('../../src/main');

Showcase.registerTile('ThirdParty integration example', container => {

  function Something() {
    return (<p>Something {Date.now()}</p>);
  }

  function showThirdParty() {
    this.setState({ showSomething: false });
    document.getElementById('integration').innerHTML = '<span>ThirdParty : ' + Date.now() + '</span>';
  }

  function showSomething() {
    this.setState({ showSomething: true });
  }

  function ThirdParty() {
    this.withInitialState({ showSomething: true });
    return (
      <div>
        {
          this.state.showSomething ? <Something /> : <div id="integration"></div>
        }
        <button type="button" onClick={showThirdParty}>Third party</button>
        <button type="button" onClick={showSomething}>Something</button>
      </div>
    );
  }

  Elem.render(ThirdParty, container);
});
