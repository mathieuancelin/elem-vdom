import * as Elem from '../main';
import * as InspectorAPI from './inspectorapi';

const Style = Elem.stylesheet({
  inspector: {
    margin: '10px'
  },
  inspectorCols: {
    display: 'flex',
    margin: '10px'
  },
  listItem: {
    cursor: 'pointer'
  },
  nonBulletList: {
    listStyleType: 'none',
    marginLeft: '0px',
    paddingLeft: '10px'
  },
  selected: {
    filter: 'invert(100%)',
    '-webkit-filter': 'invert(100%)',
    backgroundColor: 'lightgrey',
    paddingLeft: '5px'
  },
  miniButton: {
    backgroundColor: 'rgb(217, 83, 79)',
    fontFamily: 'Menlo,Monaco,Consolas,"Courier New",monospace',
    padding: '5px',
    fontSize: '11px',
    height: '25px',
    color: 'white',
    cursor: 'pointer',
    display: 'inline',
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'baseline'
  },
  editor: {
    fontFamily: 'Menlo,Monaco,Consolas,"Courier New",monospace',
    display: 'block',
    padding: '9.5px',
    margin: '0 0 10px',
    fontSize: '13px',
    lineHeight: '1.42857143',
    color: '#333',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%'
  }
});

const initialProps = { filter: [], update: 200 };
const defaultState = { edit: false };

function StateDisplay() {
  const json = JSON.stringify(this.props.element.state, null, 2);
  this.context.json = json;
  let height = json.split('\n').length * 20;
  if (height < 40) {
    height = 40;
  }
  const update = () => {
    try {
      let newJson = JSON.parse(this.context.json);
      this.props.element.setState(newJson);
    } catch(ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <h5>State of {this.state.elemSelected}</h5>
        </div>
        <div style={{ width: '20%' }}>
          <div style={Style.miniButton.extend({ float: 'right' })} onClick={update} >update</div>
        </div>
      </div>
      <textarea style={Style.editor.extend({ height: height + 'px' })} onChange={(e) => this.context.json = e.target.value}>{json}</textarea>
    </div>
  );
}

function PropsDisplay() {
  let element = this.props.element.children[this.state.displayedPropsIdx] || this.props.element;
  let props = {...element.props};
  delete props.initialState;
  return (
    <div>
      <h5>Props of {this.state.displayedPropsName}[{this.state.displayedPropsIdx + ''}]</h5>
      <pre style={Style.editor}>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

function ElemRenderList() {
  const avoid = (key) => {
    for (let i in this.props.filter) {
      let value = this.props.filter[i];
      if (key.indexOf(value) !== -1) {
        return false;
      }
    }
    return true;
  };
  return (
    <ul style={Style.nonBulletList}>
      {
        Object.keys(this.props.components).filter(avoid).map(key => {
          return <li style={Style.listItem} onClick={() => this.setState({ elemSelected: key })}>{{ __asHtml: '&#9658;&nbsp;' }} Node at {key}</li>;
        })
      }
    </ul>
  );
}

function ComponentsList() {
  return (
    <div>
      <h5>
        <span style={{ cursor: 'pointer' }} onClick={() => this.setState({ elemSelected: undefined })}>{{ __asHtml: '&#9668;&nbsp;&nbsp;' }}</span>
        <span>Components of {this.state.elemSelected}</span>
      </h5>
      <ul style={Style.nonBulletList}>
        {
          this.props.list.map((component, idx) => {
            let style = Style.listItem;
            if (idx === this.state.displayedPropsIdx) {
              style = style.extend(Style.selected);
            }
            return <li style={style} onClick={() => this.setState({ displayedPropsIdx: idx, displayedPropsName: component.name })}>{{ __asHtml: '&#9658;&nbsp;' }} {component.name} [{idx + ''}]</li>;
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
    this.context.clock = setInterval(this.redraw, this.props.update);
  }
  if (this.state.elemSelected) {
    return (
      <div style={Style.inspectorCols}>
        <div style={{ width: '40%' }}>
          <ComponentsList list={this.state.components[this.state.elemSelected].children} />
        </div>
        <div style={{ width: '60%', marginLeft: '10px' }}>
          <div>
            <PropsDisplay element={this.state.components[this.state.elemSelected]} />
          </div>
          <div>
            <StateDisplay element={this.state.components[this.state.elemSelected]} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={Style.inspector}>
        <div>
          <h5>Elem inspector</h5>
          <ElemRenderList components={this.state.components} filter={this.props.filter} />
        </div>
      </div>
    );
  }
}