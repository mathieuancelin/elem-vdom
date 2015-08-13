import * as Elem from './main';
import * as Utils from './utils';
import * as Perf from './devtools/perfs';
import _ from './lodash';

/**
 * @deprecated: prefer functional composition
 *
 * `Elem.component(options)` : Return a factory function for simple component model. See the component section for options
 *
 * But can I also create reusable components ?
 * -----------------------------------
 *
 * Of course you can. You just need to to something like
 *
 * ```javascript
 * const Timer = Elem.component({
 *    init() {
 *      this.setState({time: 0});
 *      setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
 *    },
 *    render() {
 *      return Elem.el('span', `Elapsed : ${this.state.time}`));
 *    }
 * });
 * Timer().renderTo('#timer'); // render inside #timer div
 * ```
 *
 * when creating a component, you can define
 *
 * ```javascript
 * {
 *   init: 'init function that receive the state and props as parameters'
 *   initialState: 'function that returns the initial state of the component. If undefined, an empty one will be created'
 *   defaultProps: 'function that returns the initial properties for the component, can be passed at instanciation if factory mode'
 *   render: 'function that will return an Elem node'
 * }
 * ```
 *
 * You can access a lot of pretty interesting stuff inside `Elem.component` like :
 *
 * ```javascript
 * this.state: 'the state of the component'
 * this.props: 'props of the component'
 * this.setState(diff): 'mutate the state with a diff and trigger a refresh'
 * this.replaceState(newState): 'change the state and trigger a refresh'
 * this.getDOMNode(): 'return root DOM node of the component'
 * ```
 *
 * Don't worry about `this`, every function in `Elem.component` is bound to the component object.
 *
 * ```javascript
 *
 * const Hello = Elem.component({
 *   render() {
 *     return Elem.el('div', [
 *       Elem.el('h3', "Hello " + this.props.name + "!")
 *     ]);
 *   }
 * });
 *
 * Hello({ name: "World" }).renderTo('#hello'); // pass name: '...' as this.props
 * Hello({ name: "World" }).renderToString();
 *
 * ```
 *
 * You can also use a component into a tree of elements by using a component factory like :
 *
 * ```javascript
 *
 * const InnerComponent = Elem.component({
 *   render() {
 *     return Elem.el('div', [
 *       Elem.el('h3', "Hello " + this.props.name + "!")
 *     ]);
 *   }
 * });
 *
 * const CompositeComponent = Elem.component({
 *   render() {
 *     return Elem.el('div', [
 *       Elem.el('h3', 'Inner component demo'),
 *       Elem.el(InnerComponent, { name: 'World'})
 *     ]);
 *   }
 * });
 *
 * CompositeComponent().renderTo(container);
 *
 * ```
 *
 * The `component(props)` function returns a function (if you don't provide a container) that you can call to create component that will be rendered in the element tree. The main advantage of using `component` as factory is that when you change the state of the inner component, only that component will be re-rendered instead of the whole root component and its children.
 *
 */
export default function component(comp) {
  const blueprint = {
    state: {},
    props: {},
    setState() {},
    replaceState() {},
    init() {},
    render() {},
    initialState() { return {}; },
    defaultProps() { return {}; }
  };
  let factory = (props) => {
    let instance = Object.assign({...blueprint}, comp);
    return {
      isElemComponent: true,
      renderToString() {
        instance.props = instance.defaultProps.bind(instance)() || props;
        instance.state = instance.initialState();
        instance.setState = instance.state.set;
        instance.replaceState = instance.state.replace;
        instance.setState = (diffState, cb) => {
          for (let key in diffState) {
            instance.state[key] = diffState[key];
          }
          if (cb) cb();
        };
        instance.replaceState = (newState, cb) => {
          instance.state = newState;
          if (cb) cb();
        };
        instance.getDOMNode = () => null;
        Object.keys(instance).forEach(k => {
          if (k !== 'state' && _.isFunction(instance[k])) {
            instance[k] = instance[k].bind(instance);
          }
        });
        instance.init();
        let tree = instance.render();
        return Elem.renderToString(tree);
      },
      renderTo(node) {
        Perf.markStart('Elem.component.init');
        instance.props = instance.defaultProps.bind(instance)() || props;
        instance.state = instance.initialState();
        instance.setState = (diffState, cb) => {
          for (let key in diffState) {
            instance.state[key] = diffState[key];
          }
          instance.refresh();
          if (cb) cb();
        };
        instance.replaceState = (newState, cb) => {
          instance.state = newState;
          instance.refresh();
          if (cb) cb();
        };
        instance.getDOMNode = () => {
          let doc = Utils.getGlobalObject().document;
          if (node.ownerDocument) {
            doc = node.ownerDocument;
          }
          if (_.isString(node)) {
            return doc.querySelector(node);
          }
          return node;
        };
        Object.keys(instance).forEach(k => {
          if (k !== 'state' && _.isFunction(instance[k])) {
            instance[k] = instance[k].bind(instance);
          }
        });
        instance.refresh = () => {
          Perf.markStart('Elem.component.tree');
          let tree = instance.render();
          Perf.markStop('Elem.component.tree');
          if (!_.isUndefined(node)) {
            Perf.markStart('Elem.component.render');
            let r = Elem.render(tree, node);
            Perf.markStop('Elem.component.render');
            return r;
          } else {
            return tree;
          }
        };
        instance.init();
        Perf.markStop('Elem.component.init');
        return instance.refresh();
      }
    };
  };
  factory.isElemComponentFactory = true;
  return factory;
}
