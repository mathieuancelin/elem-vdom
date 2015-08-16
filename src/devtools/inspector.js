import * as Elem from '../main';
import * as InspectorAPI from './inspectorapi';

const Style = Elem.stylesheet({
  inspector: {

  },
  inspectorCols: {
    display: 'flex'
  },
  listItem: {
    cursor: 'pointer'
  }
});

const initialProps = {};
const defaultState = {};

function StateDisplay() {
  return (
    <div>
      <h5>State of {this.state.elemSelected}</h5>
      <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
    </div>
  );
}

function PropsDisplay() {
  let element = this.props.element.children[this.state.displayedPropsIdx] || this.props.element;
  return (
    <div>
      <h5>Props of {this.state.displayedPropsName}[{this.state.displayedPropsIdx + ''}]</h5>
      <pre>{JSON.stringify(element.props, null, 2)}</pre>
    </div>
  );
}

function ElemRenderList() {
  return (
    <ul>
      {
        Object.keys(this.props.components).map(key => {
          return <li style={Style.listItem} onClick={() => this.setState({ elemSelected: key })}>{key}</li>;
        })
      }
    </ul>
  );
}

function ComponentsList() {
  return (
    <div>
      <h5>Components instances of {this.state.elemSelected}</h5>
      <ul>
        {
          this.props.list.map((component, idx) => {
            return <li style={Style.listItem} onClick={() => this.setState({ displayedPropsIdx: idx, displayedPropsName: component.name })}>{component.name} [{idx + ''}]</li>;
          })
        }
      </ul>
    </div>
  );
}

export default function Inspector() {
  this.props = Object.assign({}, initialProps, this.props);
  this.state = Object.assign({}, defaultState, { components: InspectorAPI.getExposedStateAndProps() }, this.state);
  if (!this.context.clock) {
    this.context.clock = setInterval(this.redraw, 500);
  }
  if (this.state.elemSelected) {
    return (
      <div style={Style.inspectorCols}>
        <div style={{ width: '50%' }}>
          <ComponentsList list={this.state.components[this.state.elemSelected].children} />
        </div>
        <div style={{ width: '50%' }}>
          <div>
            <PropsDisplay element={this.state.components[this.state.elemSelected]} />
          </div>
          <div>
            <StateDisplay state={this.state.components[this.state.elemSelected].state} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={Style.inspector}>
        <h3>Select a render point</h3>
        <ElemRenderList components={this.state.components} />
      </div>
    );
  }
}
