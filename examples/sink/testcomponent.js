const Elem = require('../../src/main');

export const name = 'MyAwesomeComponent';

export function init() {
  this.context.Style = Elem.stylesheet({});
}

export function getInitialState() {
  return { state1: 'state1' };
}

export function getDefaultProps() {
  return { props1: 'props1' };
}

export function getParentContext() {
  return { ctx: 'ctx' };
}

export function render() {
  return (
    <div>
      <span id="props1">{this.props.props1}</span>
      <span id="props2">{this.props.props2}</span>
      <span id="state1">{this.state.state1}</span>
      <span id="ctx">{this.context.ctx}</span>
      <button type="button" onClick={this.redraw}>Click</button>
    </div>
  );
}
