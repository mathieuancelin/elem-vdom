const _ = require('lodash');

export function createStringDocument() {

  function node(name, attrs, ns) {
    var attrs = attrs || [];
    let children = [];
    return {
      setAttribute(name, value) {
        attrs.push({
          key: name,
          value
        });
      },
      removeAttribute(name) {
        attrs = _.filter(attrs, item => item.key !== name);
      },
      appendChild(child) {
        children.push(child);
      },
      render() {
        if (this.innerHTML) {
          let html = this.innerHTML;
          children.push({
            render() {
              return html;
            }
          });
        }
        attrs = _.map(attrs, (attr) => {
          let key = attr.key;
          let value = attr.value;
          return key + '="' + value + '"';
        });
        let selfCloseTag = children.length === 0;
        if (selfCloseTag) return '<' + name + ' ' + attrs.join(' ') + ' />';
        return '<' + name + (attrs.length > 0 ? ' ' : '') + attrs.join(' ') + '>' + _.map(children, child => child.render()).join('') + '</' + name + '>';
      }
    }
  }

  function createElementNS(ns, name, attrs) {
    return node(name, attrs, ns);
  }

  function createElement(name, attrs) {
    return node(name, attrs);
  }

  function createTextNode(str) {
    return {
      render() {
        return str;
      }
    };
  }

  return {
    createTextNode,
    createElementNS,
    createElement
  };
}

export function createJsonDocument() {

  function node(name, attrs, ns) {
    var attrs = attrs || [];
    let children = [];
    return {
      setAttribute(name, value) {
        attrs.push({
          key: name,
          value
        });
      },
      removeAttribute(name) {
        attrs = _.filter(attrs, item => item.key !== name);
      },
      appendChild(child) {
        children.push(child);
      },
      render() {
        if (this.innerHTML) {
          let html = this.innerHTML;
          children = [{
            render() {
              return html;
            }
          }];
        }
        return {
          name,
          attrs,
          children: _.map(children, child => child.render())
        };
      }
    }
  }

  function createElementNS(ns, name, attrs) {
    return node(name, attrs, ns);
  }

  function createElement(name, attrs) {
    return node(name, attrs);
  }

  function createTextNode(str) {
    return {
      render() {
        return str;
      }
    };
  }

  return {
    createTextNode,
    createElementNS,
    createElement
  };
}
