import * as Elem from './main';
import * as Utils from './utils';

let registrationFunction;

try {
  registrationFunction = (Utils.getGlobalObject().document.registerElement || Utils.getGlobalObject().document.register).bind(Utils.getGlobalObject().document);
} catch (e) {}

function registerWebComponent(tag, elemTree) {
  console.log(`registering WebComponent ${tag}`);
  let thatDoc = Utils.getGlobalObject().document;
  let ElementProto = Object.create(HTMLElement.prototype);

  function renderElemTree(attrs, node) {
    if (elemTree.isElemComponentFactory) {
      return elemTree(attrs).renderTo(node);
    } else {
      return Elem.render(elemTree, node, attrs);
    }
  }

  ElementProto.createdCallback = function createWebcomponentInstance() {
    let props = {};
    for (let i in this.attributes) {
      let item = this.attributes[i];
      props[item.name] = item.value;
    }
    this.props = props;
    this.fragment = thatDoc.createElement('content');
    this.fragment.setAttribute('id', Utils.uuid());
    this.appendChild(this.fragment);
    this.renderedElement = renderElemTree(props, this.fragment);
  };

  ElementProto.attributeChangedCallback = function changeAttribute(attr, oldVal, newVal) {
    this.props[attr] = newVal;
    renderElemTree(this.props, this.fragment);
  };

  registrationFunction(tag, {
    prototype: ElementProto
  });
}

if (registrationFunction) {
  exports.registerWebComponent = registerWebComponent;
} else {
  exports.registerWebComponent = () => {
    if (window.console) console.error('[Elem] WebComponent not available here :(');
  };
}
