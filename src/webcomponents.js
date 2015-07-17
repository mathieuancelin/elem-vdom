function uuid() {
  let d = Date.now();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
}

let registrationFunction = undefined

try {
  registrationFunction = (document.registerElement || document.register || function() {
      if (window.console) console.error('[Elem] No registerElement function, webcomponents will not work !!!');
  }).bind(document);
} catch(e) {}

function registerWebComponent(tag, elemTree) {
  console.log(`registering WebComponent ${tag}`);
  let thatDoc = document;
  let ElementProto = Object.create(HTMLElement.prototype);

  function renderElemTree(attrs, node) {
    if (elemTree.isElemComponentFactory) {
      return elemTree(attrs).renderTo(node);
    } else {
      return Elem.render(elemTree, node);
    }
  }

  ElementProto.createdCallback = () => {
    let props = {};
    for (var i in this.attributes) {
      let item = this.attributes[i];
      props[item.name] = item.value;
    }
    this.props = props;
    this.fragment = document.createElement('content');
    this.fragment.setAttribute('id', uuid());
    this.appendChild(fragment);
    this.renderedElement = renderElemTree(props, this.fragment);
  };
  ElementProto.attributeChangedCallback = function (attr, oldVal, newVal) {
    this.props[attr] = newVal;
    renderElemTree(this.props, this.fragment);
  };
  registrationFunction(tag, { prototype: ElementProto });
}

if (registrationFunction) {
  exports.registerWebComponent = registerWebComponent;
} else {
  exports.registerWebComponent = function() {
    if (window.console) console.error('[Elem] WebComponent not available here :(');
  };
}
