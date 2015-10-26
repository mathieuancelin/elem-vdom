const Showcase = require('./showcase');
const Elem = require('../../src/main');

let interval;

Showcase.registerTile('ThirdParty integration example', container => {

  function Something() {
    return (<p>Something {Date.now()}</p>);
  }

  function showThirdParty() {
    this.setState({ showSomething: false });
    document.getElementById('integration').innerHTML = '<p>ThirdParty : ' + Date.now() + '</p>';
  }

  function showSomething() {
    this.setState({ showSomething: true });
  }

  function ThirdParty() {
    this.withInitialState(() => {
      interval = setInterval(this.redraw, 800);
      return { showSomething: true };
    });
    return (
      <div>
        {
          this.state.showSomething ? <Something /> : <div id="integration"></div>
        }
        <span>{Date.now()}</span>
        <br/>
        <button type="button" onClick={showThirdParty}>Third party</button>
        <button type="button" onClick={showSomething}>Something</button>
      </div>
    );
  }

  Elem.render(ThirdParty, container);
}, () => {
  clearInterval(interval);
});
