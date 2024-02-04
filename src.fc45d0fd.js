// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/snabbdom/build/htmldomapi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlDomApi = void 0;
function createElement(tagName, options) {
  return document.createElement(tagName, options);
}
function createElementNS(namespaceURI, qualifiedName, options) {
  return document.createElementNS(namespaceURI, qualifiedName, options);
}
function createDocumentFragment() {
  return parseFragment(document.createDocumentFragment());
}
function createTextNode(text) {
  return document.createTextNode(text);
}
function createComment(text) {
  return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
  if (isDocumentFragment(parentNode)) {
    var node = parentNode;
    while (node && isDocumentFragment(node)) {
      var fragment = parseFragment(node);
      node = fragment.parent;
    }
    parentNode = node !== null && node !== void 0 ? node : parentNode;
  }
  if (isDocumentFragment(newNode)) {
    newNode = parseFragment(newNode, parentNode);
  }
  if (referenceNode && isDocumentFragment(referenceNode)) {
    referenceNode = parseFragment(referenceNode).firstChildNode;
  }
  parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  if (isDocumentFragment(child)) {
    child = parseFragment(child, node);
  }
  node.appendChild(child);
}
function parentNode(node) {
  if (isDocumentFragment(node)) {
    while (node && isDocumentFragment(node)) {
      var fragment = parseFragment(node);
      node = fragment.parent;
    }
    return node !== null && node !== void 0 ? node : null;
  }
  return node.parentNode;
}
function nextSibling(node) {
  var _a;
  if (isDocumentFragment(node)) {
    var fragment = parseFragment(node);
    var parent = parentNode(fragment);
    if (parent && fragment.lastChildNode) {
      var children = Array.from(parent.childNodes);
      var index = children.indexOf(fragment.lastChildNode);
      return (_a = children[index + 1]) !== null && _a !== void 0 ? _a : null;
    }
    return null;
  }
  return node.nextSibling;
}
function tagName(elm) {
  return elm.tagName;
}
function setTextContent(node, text) {
  node.textContent = text;
}
function getTextContent(node) {
  return node.textContent;
}
function isElement(node) {
  return node.nodeType === 1;
}
function isText(node) {
  return node.nodeType === 3;
}
function isComment(node) {
  return node.nodeType === 8;
}
function isDocumentFragment(node) {
  return node.nodeType === 11;
}
function parseFragment(fragmentNode, parentNode) {
  var _a, _b, _c;
  var fragment = fragmentNode;
  (_a = fragment.parent) !== null && _a !== void 0 ? _a : fragment.parent = parentNode !== null && parentNode !== void 0 ? parentNode : null;
  (_b = fragment.firstChildNode) !== null && _b !== void 0 ? _b : fragment.firstChildNode = fragmentNode.firstChild;
  (_c = fragment.lastChildNode) !== null && _c !== void 0 ? _c : fragment.lastChildNode = fragmentNode.lastChild;
  return fragment;
}
var htmlDomApi = exports.htmlDomApi = {
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createDocumentFragment: createDocumentFragment,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  getTextContent: getTextContent,
  isElement: isElement,
  isText: isText,
  isComment: isComment,
  isDocumentFragment: isDocumentFragment
};
},{}],"node_modules/snabbdom/build/vnode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vnode = vnode;
function vnode(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {
    sel: sel,
    data: data,
    children: children,
    text: text,
    elm: elm,
    key: key
  };
}
},{}],"node_modules/snabbdom/build/is.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = void 0;
exports.primitive = primitive;
var array = exports.array = Array.isArray;
function primitive(s) {
  return typeof s === "string" || typeof s === "number" || s instanceof String || s instanceof Number;
}
},{}],"node_modules/snabbdom/build/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _vnode = require("./vnode.js");
var is = _interopRequireWildcard(require("./is.js"));
var _htmldomapi = require("./htmldomapi.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function isUndef(s) {
  return s === undefined;
}
function isDef(s) {
  return s !== undefined;
}
var emptyNode = (0, _vnode.vnode)("", {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
  var _a, _b;
  var isSameKey = vnode1.key === vnode2.key;
  var isSameIs = ((_a = vnode1.data) === null || _a === void 0 ? void 0 : _a.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
  var isSameSel = vnode1.sel === vnode2.sel;
  var isSameTextOrFragment = !vnode1.sel && vnode1.sel === vnode2.sel ? _typeof(vnode1.text) === _typeof(vnode2.text) : true;
  return isSameSel && isSameKey && isSameIs && isSameTextOrFragment;
}
/**
 * @todo Remove this function when the document fragment is considered stable.
 */
function documentFragmentIsNotSupported() {
  throw new Error("The document fragment is not supported on this platform.");
}
function isElement(api, vnode) {
  return api.isElement(vnode);
}
function isDocumentFragment(api, vnode) {
  return api.isDocumentFragment(vnode);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var _a;
  var map = {};
  for (var i = beginIdx; i <= endIdx; ++i) {
    var key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;
    if (key !== undefined) {
      map[key] = i;
    }
  }
  return map;
}
var hooks = ["create", "update", "remove", "destroy", "pre", "post"];
function init(modules, domApi, options) {
  var cbs = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  };
  var api = domApi !== undefined ? domApi : _htmldomapi.htmlDomApi;
  var _iterator = _createForOfIteratorHelper(hooks),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var hook = _step.value;
      var _iterator2 = _createForOfIteratorHelper(modules),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var module = _step2.value;
          var currentHook = module[hook];
          if (currentHook !== undefined) {
            cbs[hook].push(currentHook);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  function emptyNodeAt(elm) {
    var id = elm.id ? "#" + elm.id : "";
    // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
    // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
    var classes = elm.getAttribute("class");
    var c = classes ? "." + classes.split(" ").join(".") : "";
    return (0, _vnode.vnode)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
  }
  function emptyDocumentFragmentAt(frag) {
    return (0, _vnode.vnode)(undefined, {}, [], undefined, frag);
  }
  function createRmCb(childElm, listeners) {
    return function rmCb() {
      if (--listeners === 0) {
        var parent = api.parentNode(childElm);
        if (parent !== null) {
          api.removeChild(parent, childElm);
        }
      }
    };
  }
  function createElm(vnode, insertedVnodeQueue) {
    var _a, _b, _c, _d;
    var i;
    var data = vnode.data;
    if (data !== undefined) {
      var _init = (_a = data.hook) === null || _a === void 0 ? void 0 : _a.init;
      if (isDef(_init)) {
        _init(vnode);
        data = vnode.data;
      }
    }
    var children = vnode.children;
    var sel = vnode.sel;
    if (sel === "!") {
      if (isUndef(vnode.text)) {
        vnode.text = "";
      }
      vnode.elm = api.createComment(vnode.text);
    } else if (sel === "") {
      // textNode has no selector
      vnode.elm = api.createTextNode(vnode.text);
    } else if (sel !== undefined) {
      // Parse selector
      var hashIdx = sel.indexOf("#");
      var dotIdx = sel.indexOf(".", hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag, data) : api.createElement(tag, data);
      if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
      if (dotIdx > 0) elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      if (is.primitive(vnode.text) && (!is.array(children) || children.length === 0)) {
        // allow h1 and similar nodes to be created w/ text and empty child list
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          var ch = children[i];
          if (ch != null) {
            api.appendChild(elm, createElm(ch, insertedVnodeQueue));
          }
        }
      }
      var hook = vnode.data.hook;
      if (isDef(hook)) {
        (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode);
        if (hook.insert) {
          insertedVnodeQueue.push(vnode);
        }
      }
    } else if (((_c = options === null || options === void 0 ? void 0 : options.experimental) === null || _c === void 0 ? void 0 : _c.fragments) && vnode.children) {
      vnode.elm = ((_d = api.createDocumentFragment) !== null && _d !== void 0 ? _d : documentFragmentIsNotSupported)();
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      for (i = 0; i < vnode.children.length; ++i) {
        var _ch = vnode.children[i];
        if (_ch != null) {
          api.appendChild(vnode.elm, createElm(_ch, insertedVnodeQueue));
        }
      }
    } else {
      vnode.elm = api.createTextNode(vnode.text);
    }
    return vnode.elm;
  }
  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }
  function invokeDestroyHook(vnode) {
    var _a, _b;
    var data = vnode.data;
    if (data !== undefined) {
      (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, vnode);
      for (var i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (vnode.children !== undefined) {
        for (var j = 0; j < vnode.children.length; ++j) {
          var child = vnode.children[j];
          if (child != null && typeof child !== "string") {
            invokeDestroyHook(child);
          }
        }
      }
    }
  }
  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    var _a, _b;
    for (; startIdx <= endIdx; ++startIdx) {
      var listeners = void 0;
      var rm = void 0;
      var ch = vnodes[startIdx];
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (var i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          var removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;
          if (isDef(removeHook)) {
            removeHook(ch, rm);
          } else {
            rm();
          }
        } else if (ch.children) {
          // Fragment node
          invokeDestroyHook(ch);
          removeVnodes(parentElm, ch.children, 0, ch.children.length - 1);
        } else {
          // Text node
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx;
    var idxInOld;
    var elmToMove;
    var before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) {
          // `newStartVnode` is new, create and insert it in beginning
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else if (isUndef(oldKeyToIdx[newEndVnode.key])) {
          // `newEndVnode` is new, create and insert it in the end
          api.insertBefore(parentElm, createElm(newEndVnode, insertedVnodeQueue), api.nextSibling(oldEndVnode.elm));
          newEndVnode = newCh[--newEndIdx];
        } else {
          // Neither of the new endpoints are new vnodes, so we make progress by
          // moving `newStartVnode` into position
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (newStartIdx <= newEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    }
    if (oldStartIdx <= oldEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var hook = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.hook;
    (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode);
    var elm = vnode.elm = oldVnode.elm;
    if (oldVnode === vnode) return;
    if (vnode.data !== undefined || isDef(vnode.text) && vnode.text !== oldVnode.text) {
      (_c = vnode.data) !== null && _c !== void 0 ? _c : vnode.data = {};
      (_d = oldVnode.data) !== null && _d !== void 0 ? _d : oldVnode.data = {};
      for (var i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      (_g = (_f = (_e = vnode.data) === null || _e === void 0 ? void 0 : _e.hook) === null || _f === void 0 ? void 0 : _f.update) === null || _g === void 0 ? void 0 : _g.call(_f, oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      api.setTextContent(elm, vnode.text);
    }
    (_h = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _h === void 0 ? void 0 : _h.call(hook, oldVnode, vnode);
  }
  return function patch(oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
    if (isElement(api, oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    } else if (isDocumentFragment(api, oldVnode)) {
      oldVnode = emptyDocumentFragmentAt(oldVnode);
    }
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);
      createElm(vnode, insertedVnodeQueue);
      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}
},{"./vnode.js":"node_modules/snabbdom/build/vnode.js","./is.js":"node_modules/snabbdom/build/is.js","./htmldomapi.js":"node_modules/snabbdom/build/htmldomapi.js"}],"node_modules/snabbdom/build/h.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNS = addNS;
exports.fragment = fragment;
exports.h = h;
var _vnode = require("./vnode.js");
var is = _interopRequireWildcard(require("./is.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function addNS(data, children, sel) {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      if (typeof child === "string") continue;
      var childData = child.data;
      if (childData !== undefined) {
        addNS(childData, child.children, child.sel);
      }
    }
  }
}
function h(sel, b, c) {
  var data = {};
  var children;
  var text;
  var i;
  if (c !== undefined) {
    if (b !== null) {
      data = b;
    }
    if (is.array(c)) {
      children = c;
    } else if (is.primitive(c)) {
      text = c.toString();
    } else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    if (is.array(b)) {
      children = b;
    } else if (is.primitive(b)) {
      text = b.toString();
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = (0, _vnode.vnode)(undefined, undefined, undefined, children[i], undefined);
    }
  }
  if (sel.startsWith("svg") && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
    addNS(data, children, sel);
  }
  return (0, _vnode.vnode)(sel, data, children, text, undefined);
}
/**
 * @experimental
 */
function fragment(children) {
  var c;
  var text;
  if (is.array(children)) {
    c = children;
  } else if (is.primitive(c)) {
    text = children;
  } else if (c && c.sel) {
    c = [children];
  }
  if (c !== undefined) {
    for (var i = 0; i < c.length; ++i) {
      if (is.primitive(c[i])) c[i] = (0, _vnode.vnode)(undefined, undefined, undefined, c[i], undefined);
    }
  }
  return (0, _vnode.vnode)(undefined, {}, c, text, undefined);
}
},{"./vnode.js":"node_modules/snabbdom/build/vnode.js","./is.js":"node_modules/snabbdom/build/is.js"}],"node_modules/snabbdom/build/thunk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thunk = void 0;
var _h = require("./h.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function copyToThunk(vnode, thunk) {
  var _a;
  var ns = (_a = thunk.data) === null || _a === void 0 ? void 0 : _a.ns;
  vnode.data.fn = thunk.data.fn;
  vnode.data.args = thunk.data.args;
  thunk.data = vnode.data;
  thunk.children = vnode.children;
  thunk.text = vnode.text;
  thunk.elm = vnode.elm;
  if (ns) (0, _h.addNS)(thunk.data, thunk.children, thunk.sel);
}
function init(thunk) {
  var cur = thunk.data;
  var vnode = cur.fn.apply(cur, _toConsumableArray(cur.args));
  copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
  var i;
  var old = oldVnode.data;
  var cur = thunk.data;
  var oldArgs = old.args;
  var args = cur.args;
  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
    copyToThunk(cur.fn.apply(cur, _toConsumableArray(args)), thunk);
    return;
  }
  for (i = 0; i < args.length; ++i) {
    if (oldArgs[i] !== args[i]) {
      copyToThunk(cur.fn.apply(cur, _toConsumableArray(args)), thunk);
      return;
    }
  }
  copyToThunk(oldVnode, thunk);
}
var thunk = exports.thunk = function thunk(sel, key, fn, args) {
  if (args === undefined) {
    args = fn;
    fn = key;
    key = undefined;
  }
  return (0, _h.h)(sel, {
    key: key,
    hook: {
      init: init,
      prepatch: prepatch
    },
    fn: fn,
    args: args
  });
};
},{"./h.js":"node_modules/snabbdom/build/h.js"}],"node_modules/snabbdom/build/helpers/attachto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachTo = attachTo;
function pre(vnode, newVnode) {
  var attachData = vnode.data.attachData;
  // Copy created placeholder and real element from old vnode
  newVnode.data.attachData.placeholder = attachData.placeholder;
  newVnode.data.attachData.real = attachData.real;
  // Mount real element in vnode so the patch process operates on it
  vnode.elm = vnode.data.attachData.real;
}
function post(_, vnode) {
  // Mount dummy placeholder in vnode so potential reorders use it
  vnode.elm = vnode.data.attachData.placeholder;
}
function destroy(vnode) {
  // Remove placeholder
  if (vnode.elm !== undefined) {
    vnode.elm.parentNode.removeChild(vnode.elm);
  }
  // Remove real element from where it was inserted
  vnode.elm = vnode.data.attachData.real;
}
function create(_, vnode) {
  var real = vnode.elm;
  var attachData = vnode.data.attachData;
  var placeholder = document.createElement("span");
  // Replace actual element with dummy placeholder
  // Snabbdom will then insert placeholder instead
  vnode.elm = placeholder;
  attachData.target.appendChild(real);
  attachData.real = real;
  attachData.placeholder = placeholder;
}
function attachTo(target, vnode) {
  if (vnode.data === undefined) vnode.data = {};
  if (vnode.data.hook === undefined) vnode.data.hook = {};
  var data = vnode.data;
  var hook = vnode.data.hook;
  data.attachData = {
    target: target,
    placeholder: undefined,
    real: undefined
  };
  hook.create = create;
  hook.prepatch = pre;
  hook.postpatch = post;
  hook.destroy = destroy;
  return vnode;
}
},{}],"node_modules/snabbdom/build/tovnode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toVNode = toVNode;
var _h = require("./h.js");
var _vnode = require("./vnode.js");
var _htmldomapi = require("./htmldomapi.js");
function toVNode(node, domApi) {
  var api = domApi !== undefined ? domApi : _htmldomapi.htmlDomApi;
  var text;
  if (api.isElement(node)) {
    var id = node.id ? "#" + node.id : "";
    var cn = node.getAttribute("class");
    var c = cn ? "." + cn.split(" ").join(".") : "";
    var sel = api.tagName(node).toLowerCase() + id + c;
    var attrs = {};
    var dataset = {};
    var data = {};
    var children = [];
    var name;
    var i, n;
    var elmAttrs = node.attributes;
    var elmChildren = node.childNodes;
    for (i = 0, n = elmAttrs.length; i < n; i++) {
      name = elmAttrs[i].nodeName;
      if (name.startsWith("data-")) {
        dataset[name.slice(5)] = elmAttrs[i].nodeValue || "";
      } else if (name !== "id" && name !== "class") {
        attrs[name] = elmAttrs[i].nodeValue;
      }
    }
    for (i = 0, n = elmChildren.length; i < n; i++) {
      children.push(toVNode(elmChildren[i], domApi));
    }
    if (Object.keys(attrs).length > 0) data.attrs = attrs;
    if (Object.keys(dataset).length > 0) data.dataset = dataset;
    if (sel.startsWith("svg") && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
      (0, _h.addNS)(data, children, sel);
    }
    return (0, _vnode.vnode)(sel, data, children, undefined, node);
  } else if (api.isText(node)) {
    text = api.getTextContent(node);
    return (0, _vnode.vnode)(undefined, undefined, undefined, text, node);
  } else if (api.isComment(node)) {
    text = api.getTextContent(node);
    return (0, _vnode.vnode)("!", {}, [], text, node);
  } else {
    return (0, _vnode.vnode)("", {}, [], undefined, node);
  }
}
},{"./h.js":"node_modules/snabbdom/build/h.js","./vnode.js":"node_modules/snabbdom/build/vnode.js","./htmldomapi.js":"node_modules/snabbdom/build/htmldomapi.js"}],"node_modules/snabbdom/build/hooks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"node_modules/snabbdom/build/modules/attributes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attributesModule = void 0;
var xlinkNS = "http://www.w3.org/1999/xlink";
var xmlnsNS = "http://www.w3.org/2000/xmlns/";
var xmlNS = "http://www.w3.org/XML/1998/namespace";
var colonChar = 58;
var xChar = 120;
var mChar = 109;
function updateAttrs(oldVnode, vnode) {
  var key;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs;
  var attrs = vnode.data.attrs;
  if (!oldAttrs && !attrs) return;
  if (oldAttrs === attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};
  // update modified attributes, add new attributes
  for (key in attrs) {
    var cur = attrs[key];
    var old = oldAttrs[key];
    if (old !== cur) {
      if (cur === true) {
        elm.setAttribute(key, "");
      } else if (cur === false) {
        elm.removeAttribute(key);
      } else {
        if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur);
        } else if (key.charCodeAt(3) === colonChar) {
          // Assume xml namespace
          elm.setAttributeNS(xmlNS, key, cur);
        } else if (key.charCodeAt(5) === colonChar) {
          // Assume 'xmlns' or 'xlink' namespace
          key.charCodeAt(1) === mChar ? elm.setAttributeNS(xmlnsNS, key, cur) : elm.setAttributeNS(xlinkNS, key, cur);
        } else {
          elm.setAttribute(key, cur);
        }
      }
    }
  }
  // remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}
var attributesModule = exports.attributesModule = {
  create: updateAttrs,
  update: updateAttrs
};
},{}],"node_modules/snabbdom/build/modules/class.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classModule = void 0;
function updateClass(oldVnode, vnode) {
  var cur;
  var name;
  var elm = vnode.elm;
  var oldClass = oldVnode.data.class;
  var klass = vnode.data.class;
  if (!oldClass && !klass) return;
  if (oldClass === klass) return;
  oldClass = oldClass || {};
  klass = klass || {};
  for (name in oldClass) {
    if (oldClass[name] && !Object.prototype.hasOwnProperty.call(klass, name)) {
      // was `true` and now not provided
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? "add" : "remove"](name);
    }
  }
}
var classModule = exports.classModule = {
  create: updateClass,
  update: updateClass
};
},{}],"node_modules/snabbdom/build/modules/dataset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datasetModule = void 0;
var CAPS_REGEX = /[A-Z]/g;
function updateDataset(oldVnode, vnode) {
  var elm = vnode.elm;
  var oldDataset = oldVnode.data.dataset;
  var dataset = vnode.data.dataset;
  var key;
  if (!oldDataset && !dataset) return;
  if (oldDataset === dataset) return;
  oldDataset = oldDataset || {};
  dataset = dataset || {};
  var d = elm.dataset;
  for (key in oldDataset) {
    if (!(key in dataset)) {
      if (d) {
        if (key in d) {
          delete d[key];
        }
      } else {
        elm.removeAttribute("data-" + key.replace(CAPS_REGEX, "-$&").toLowerCase());
      }
    }
  }
  for (key in dataset) {
    if (oldDataset[key] !== dataset[key]) {
      if (d) {
        d[key] = dataset[key];
      } else {
        elm.setAttribute("data-" + key.replace(CAPS_REGEX, "-$&").toLowerCase(), dataset[key]);
      }
    }
  }
}
var datasetModule = exports.datasetModule = {
  create: updateDataset,
  update: updateDataset
};
},{}],"node_modules/snabbdom/build/modules/eventlisteners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventListenersModule = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function invokeHandler(handler, vnode, event) {
  if (typeof handler === "function") {
    // call function handler
    handler.call(vnode, event, vnode);
  } else if (_typeof(handler) === "object") {
    // call multiple handlers
    for (var i = 0; i < handler.length; i++) {
      invokeHandler(handler[i], vnode, event);
    }
  }
}
function handleEvent(event, vnode) {
  var name = event.type;
  var on = vnode.data.on;
  // call event handler(s) if exists
  if (on && on[name]) {
    invokeHandler(on[name], vnode, event);
  }
}
function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  };
}
function updateEventListeners(oldVnode, vnode) {
  var oldOn = oldVnode.data.on;
  var oldListener = oldVnode.listener;
  var oldElm = oldVnode.elm;
  var on = vnode && vnode.data.on;
  var elm = vnode && vnode.elm;
  var name;
  // optimization for reused immutable handlers
  if (oldOn === on) {
    return;
  }
  // remove existing listeners which no longer used
  if (oldOn && oldListener) {
    // if element changed or deleted we remove all existing listeners unconditionally
    if (!on) {
      for (name in oldOn) {
        // remove listener if element was changed or existing listeners removed
        oldElm.removeEventListener(name, oldListener, false);
      }
    } else {
      for (name in oldOn) {
        // remove listener if existing listener removed
        if (!on[name]) {
          oldElm.removeEventListener(name, oldListener, false);
        }
      }
    }
  }
  // add new listeners which has not already attached
  if (on) {
    // reuse existing listener or create new
    var listener = vnode.listener = oldVnode.listener || createListener();
    // update vnode for listener
    listener.vnode = vnode;
    // if element changed or added we add all needed listeners unconditionally
    if (!oldOn) {
      for (name in on) {
        // add listener if element was changed or new listeners added
        elm.addEventListener(name, listener, false);
      }
    } else {
      for (name in on) {
        // add listener if new listener added
        if (!oldOn[name]) {
          elm.addEventListener(name, listener, false);
        }
      }
    }
  }
}
var eventListenersModule = exports.eventListenersModule = {
  create: updateEventListeners,
  update: updateEventListeners,
  destroy: updateEventListeners
};
},{}],"node_modules/snabbdom/build/modules/props.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsModule = void 0;
function updateProps(oldVnode, vnode) {
  var key;
  var cur;
  var old;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.props;
  var props = vnode.data.props;
  if (!oldProps && !props) return;
  if (oldProps === props) return;
  oldProps = oldProps || {};
  props = props || {};
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur && (key !== "value" || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}
var propsModule = exports.propsModule = {
  create: updateProps,
  update: updateProps
};
},{}],"node_modules/snabbdom/build/modules/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleModule = void 0;
// Binding `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.
var raf = typeof (window === null || window === void 0 ? void 0 : window.requestAnimationFrame) === "function" ? window.requestAnimationFrame.bind(window) : setTimeout;
var nextFrame = function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
};
var reflowForced = false;
function setNextFrame(obj, prop, val) {
  nextFrame(function () {
    obj[prop] = val;
  });
}
function updateStyle(oldVnode, vnode) {
  var cur;
  var name;
  var elm = vnode.elm;
  var oldStyle = oldVnode.data.style;
  var style = vnode.data.style;
  if (!oldStyle && !style) return;
  if (oldStyle === style) return;
  oldStyle = oldStyle || {};
  style = style || {};
  var oldHasDel = ("delayed" in oldStyle);
  for (name in oldStyle) {
    if (!(name in style)) {
      if (name[0] === "-" && name[1] === "-") {
        elm.style.removeProperty(name);
      } else {
        elm.style[name] = "";
      }
    }
  }
  for (name in style) {
    cur = style[name];
    if (name === "delayed" && style.delayed) {
      for (var name2 in style.delayed) {
        cur = style.delayed[name2];
        if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
          setNextFrame(elm.style, name2, cur);
        }
      }
    } else if (name !== "remove" && cur !== oldStyle[name]) {
      if (name[0] === "-" && name[1] === "-") {
        elm.style.setProperty(name, cur);
      } else {
        elm.style[name] = cur;
      }
    }
  }
}
function applyDestroyStyle(vnode) {
  var style;
  var name;
  var elm = vnode.elm;
  var s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}
function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  if (!reflowForced) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    vnode.elm.offsetLeft;
    reflowForced = true;
  }
  var name;
  var elm = vnode.elm;
  var i = 0;
  var style = s.remove;
  var amount = 0;
  var applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  var compStyle = getComputedStyle(elm);
  var props = compStyle["transition-property"].split(", ");
  for (; i < props.length; ++i) {
    if (applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener("transitionend", function (ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}
function forceReflow() {
  reflowForced = false;
}
var styleModule = exports.styleModule = {
  pre: forceReflow,
  create: updateStyle,
  update: updateStyle,
  destroy: applyDestroyStyle,
  remove: applyRemoveStyle
};
},{}],"node_modules/snabbdom/build/jsx.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fragment = Fragment;
exports.jsx = jsx;
var _vnode = require("./vnode.js");
var _h = require("./h.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Fragment(data) {
  for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }
  var flatChildren = flattenAndFilter(children, []);
  if (flatChildren.length === 1 && !flatChildren[0].sel && flatChildren[0].text) {
    // only child is a simple text node, pass as text for a simpler vtree
    return (0, _vnode.vnode)(undefined, undefined, undefined, flatChildren[0].text, undefined);
  } else {
    return (0, _vnode.vnode)(undefined, data !== null && data !== void 0 ? data : {}, flatChildren, undefined, undefined);
  }
}
function flattenAndFilter(children, flattened) {
  var _iterator = _createForOfIteratorHelper(children),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var child = _step.value;
      // filter out falsey children, except 0 since zero can be a valid value e.g inside a chart
      if (child !== undefined && child !== null && child !== false && child !== "") {
        if (Array.isArray(child)) {
          flattenAndFilter(child, flattened);
        } else if (typeof child === "string" || typeof child === "number" || typeof child === "boolean") {
          flattened.push((0, _vnode.vnode)(undefined, undefined, undefined, String(child), undefined));
        } else {
          flattened.push(child);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return flattened;
}
/**
 * jsx/tsx compatible factory function
 * see: https://www.typescriptlang.org/docs/handbook/jsx.html#factory-functions
 */
function jsx(tag, data) {
  for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }
  var flatChildren = flattenAndFilter(children, []);
  if (typeof tag === "function") {
    // tag is a function component
    return tag(data, flatChildren);
  } else {
    if (flatChildren.length === 1 && !flatChildren[0].sel && flatChildren[0].text) {
      // only child is a simple text node, pass as text for a simpler vtree
      return (0, _h.h)(tag, data, flatChildren[0].text);
    } else {
      return (0, _h.h)(tag, data, flatChildren);
    }
  }
}
},{"./vnode.js":"node_modules/snabbdom/build/vnode.js","./h.js":"node_modules/snabbdom/build/h.js"}],"node_modules/snabbdom/build/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  htmlDomApi: true,
  init: true,
  thunk: true,
  vnode: true,
  attachTo: true,
  array: true,
  primitive: true,
  toVNode: true,
  h: true,
  fragment: true,
  attributesModule: true,
  classModule: true,
  datasetModule: true,
  eventListenersModule: true,
  propsModule: true,
  styleModule: true,
  jsx: true,
  Fragment: true
};
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function () {
    return _jsx.Fragment;
  }
});
Object.defineProperty(exports, "array", {
  enumerable: true,
  get: function () {
    return _is.array;
  }
});
Object.defineProperty(exports, "attachTo", {
  enumerable: true,
  get: function () {
    return _attachto.attachTo;
  }
});
Object.defineProperty(exports, "attributesModule", {
  enumerable: true,
  get: function () {
    return _attributes.attributesModule;
  }
});
Object.defineProperty(exports, "classModule", {
  enumerable: true,
  get: function () {
    return _class.classModule;
  }
});
Object.defineProperty(exports, "datasetModule", {
  enumerable: true,
  get: function () {
    return _dataset.datasetModule;
  }
});
Object.defineProperty(exports, "eventListenersModule", {
  enumerable: true,
  get: function () {
    return _eventlisteners.eventListenersModule;
  }
});
Object.defineProperty(exports, "fragment", {
  enumerable: true,
  get: function () {
    return _h.fragment;
  }
});
Object.defineProperty(exports, "h", {
  enumerable: true,
  get: function () {
    return _h.h;
  }
});
Object.defineProperty(exports, "htmlDomApi", {
  enumerable: true,
  get: function () {
    return _htmldomapi.htmlDomApi;
  }
});
Object.defineProperty(exports, "init", {
  enumerable: true,
  get: function () {
    return _init.init;
  }
});
Object.defineProperty(exports, "jsx", {
  enumerable: true,
  get: function () {
    return _jsx.jsx;
  }
});
Object.defineProperty(exports, "primitive", {
  enumerable: true,
  get: function () {
    return _is.primitive;
  }
});
Object.defineProperty(exports, "propsModule", {
  enumerable: true,
  get: function () {
    return _props.propsModule;
  }
});
Object.defineProperty(exports, "styleModule", {
  enumerable: true,
  get: function () {
    return _style.styleModule;
  }
});
Object.defineProperty(exports, "thunk", {
  enumerable: true,
  get: function () {
    return _thunk.thunk;
  }
});
Object.defineProperty(exports, "toVNode", {
  enumerable: true,
  get: function () {
    return _tovnode.toVNode;
  }
});
Object.defineProperty(exports, "vnode", {
  enumerable: true,
  get: function () {
    return _vnode.vnode;
  }
});
var _htmldomapi = require("./htmldomapi.js");
var _init = require("./init.js");
var _thunk = require("./thunk.js");
var _vnode = require("./vnode.js");
var _attachto = require("./helpers/attachto.js");
var _is = require("./is.js");
var _tovnode = require("./tovnode.js");
var _h = require("./h.js");
var _hooks = require("./hooks.js");
Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hooks[key];
    }
  });
});
var _attributes = require("./modules/attributes.js");
var _class = require("./modules/class.js");
var _dataset = require("./modules/dataset.js");
var _eventlisteners = require("./modules/eventlisteners.js");
var _props = require("./modules/props.js");
var _style = require("./modules/style.js");
var _jsx = require("./jsx.js");
},{"./htmldomapi.js":"node_modules/snabbdom/build/htmldomapi.js","./init.js":"node_modules/snabbdom/build/init.js","./thunk.js":"node_modules/snabbdom/build/thunk.js","./vnode.js":"node_modules/snabbdom/build/vnode.js","./helpers/attachto.js":"node_modules/snabbdom/build/helpers/attachto.js","./is.js":"node_modules/snabbdom/build/is.js","./tovnode.js":"node_modules/snabbdom/build/tovnode.js","./h.js":"node_modules/snabbdom/build/h.js","./hooks.js":"node_modules/snabbdom/build/hooks.js","./modules/attributes.js":"node_modules/snabbdom/build/modules/attributes.js","./modules/class.js":"node_modules/snabbdom/build/modules/class.js","./modules/dataset.js":"node_modules/snabbdom/build/modules/dataset.js","./modules/eventlisteners.js":"node_modules/snabbdom/build/modules/eventlisteners.js","./modules/props.js":"node_modules/snabbdom/build/modules/props.js","./modules/style.js":"node_modules/snabbdom/build/modules/style.js","./jsx.js":"node_modules/snabbdom/build/jsx.js"}],"node_modules/@cycle/dom/lib/es6/thunk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.thunk = thunk;
var _snabbdom = require("snabbdom");
function copyToThunk(vnode, thunkVNode) {
  thunkVNode.elm = vnode.elm;
  vnode.data.fn = thunkVNode.data.fn;
  vnode.data.args = thunkVNode.data.args;
  vnode.data.isolate = thunkVNode.data.isolate;
  thunkVNode.data = vnode.data;
  thunkVNode.children = vnode.children;
  thunkVNode.text = vnode.text;
  thunkVNode.elm = vnode.elm;
}
function init(thunkVNode) {
  var cur = thunkVNode.data;
  var vnode = cur.fn.apply(undefined, cur.args);
  copyToThunk(vnode, thunkVNode);
}
function prepatch(oldVnode, thunkVNode) {
  var old = oldVnode.data,
    cur = thunkVNode.data;
  var i;
  var oldArgs = old.args,
    args = cur.args;
  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
    copyToThunk(cur.fn.apply(undefined, args), thunkVNode);
  }
  for (i = 0; i < args.length; ++i) {
    if (oldArgs[i] !== args[i]) {
      copyToThunk(cur.fn.apply(undefined, args), thunkVNode);
      return;
    }
  }
  copyToThunk(oldVnode, thunkVNode);
}
function thunk(sel, key, fn, args) {
  if (args === undefined) {
    args = fn;
    fn = key;
    key = undefined;
  }
  return (0, _snabbdom.h)(sel, {
    key: key,
    hook: {
      init: init,
      prepatch: prepatch
    },
    fn: fn,
    args: args
  });
}
var _default = exports.default = thunk;
},{"snabbdom":"node_modules/snabbdom/build/index.js"}],"node_modules/@cycle/run/lib/adapt.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getGlobal() {
  var globalObj;
  if (typeof window !== 'undefined') {
    globalObj = window;
  } else if (typeof global !== 'undefined') {
    globalObj = global;
  } else {
    globalObj = this;
  }
  globalObj.Cyclejs = globalObj.Cyclejs || {};
  globalObj = globalObj.Cyclejs;
  globalObj.adaptStream = globalObj.adaptStream || function (x) {
    return x;
  };
  return globalObj;
}
function setAdapt(f) {
  getGlobal().adaptStream = f;
}
exports.setAdapt = setAdapt;
function adapt(stream) {
  return getGlobal().adaptStream(stream);
}
exports.adapt = adapt;
},{}],"node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;
  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }
  return result;
}
;
},{}],"node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* global window */

var root;
if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}
var result = (0, _ponyfill.default)(root);
var _default = exports.default = result;
},{"./ponyfill.js":"node_modules/symbol-observable/es/ponyfill.js"}],"node_modules/xstream/index.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var symbol_observable_1 = require("symbol-observable");
var NO = {};
exports.NO = NO;
function noop() { }
function cp(a) {
    var l = a.length;
    var b = Array(l);
    for (var i = 0; i < l; ++i)
        b[i] = a[i];
    return b;
}
function and(f1, f2) {
    return function andFn(t) {
        return f1(t) && f2(t);
    };
}
function _try(c, t, u) {
    try {
        return c.f(t);
    }
    catch (e) {
        u._e(e);
        return NO;
    }
}
var NO_IL = {
    _n: noop,
    _e: noop,
    _c: noop,
};
exports.NO_IL = NO_IL;
// mutates the input
function internalizeProducer(producer) {
    producer._start = function _start(il) {
        il.next = il._n;
        il.error = il._e;
        il.complete = il._c;
        this.start(il);
    };
    producer._stop = producer.stop;
}
var StreamSub = /** @class */ (function () {
    function StreamSub(_stream, _listener) {
        this._stream = _stream;
        this._listener = _listener;
    }
    StreamSub.prototype.unsubscribe = function () {
        this._stream._remove(this._listener);
    };
    return StreamSub;
}());
var Observer = /** @class */ (function () {
    function Observer(_listener) {
        this._listener = _listener;
    }
    Observer.prototype.next = function (value) {
        this._listener._n(value);
    };
    Observer.prototype.error = function (err) {
        this._listener._e(err);
    };
    Observer.prototype.complete = function () {
        this._listener._c();
    };
    return Observer;
}());
var FromObservable = /** @class */ (function () {
    function FromObservable(observable) {
        this.type = 'fromObservable';
        this.ins = observable;
        this.active = false;
    }
    FromObservable.prototype._start = function (out) {
        this.out = out;
        this.active = true;
        this._sub = this.ins.subscribe(new Observer(out));
        if (!this.active)
            this._sub.unsubscribe();
    };
    FromObservable.prototype._stop = function () {
        if (this._sub)
            this._sub.unsubscribe();
        this.active = false;
    };
    return FromObservable;
}());
var Merge = /** @class */ (function () {
    function Merge(insArr) {
        this.type = 'merge';
        this.insArr = insArr;
        this.out = NO;
        this.ac = 0;
    }
    Merge.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var L = s.length;
        this.ac = L;
        for (var i = 0; i < L; i++)
            s[i]._add(this);
    };
    Merge.prototype._stop = function () {
        var s = this.insArr;
        var L = s.length;
        for (var i = 0; i < L; i++)
            s[i]._remove(this);
        this.out = NO;
    };
    Merge.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    Merge.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Merge.prototype._c = function () {
        if (--this.ac <= 0) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    return Merge;
}());
var CombineListener = /** @class */ (function () {
    function CombineListener(i, out, p) {
        this.i = i;
        this.out = out;
        this.p = p;
        p.ils.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var p = this.p, out = this.out;
        if (out === NO)
            return;
        if (p.up(t, this.i)) {
            var a = p.vals;
            var l = a.length;
            var b = Array(l);
            for (var i = 0; i < l; ++i)
                b[i] = a[i];
            out._n(b);
        }
    };
    CombineListener.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    CombineListener.prototype._c = function () {
        var p = this.p;
        if (p.out === NO)
            return;
        if (--p.Nc === 0)
            p.out._c();
    };
    return CombineListener;
}());
var Combine = /** @class */ (function () {
    function Combine(insArr) {
        this.type = 'combine';
        this.insArr = insArr;
        this.out = NO;
        this.ils = [];
        this.Nc = this.Nn = 0;
        this.vals = [];
    }
    Combine.prototype.up = function (t, i) {
        var v = this.vals[i];
        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
        this.vals[i] = t;
        return Nn === 0;
    };
    Combine.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var n = this.Nc = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        if (n === 0) {
            out._n([]);
            out._c();
        }
        else {
            for (var i = 0; i < n; i++) {
                vals[i] = NO;
                s[i]._add(new CombineListener(i, out, this));
            }
        }
    };
    Combine.prototype._stop = function () {
        var s = this.insArr;
        var n = s.length;
        var ils = this.ils;
        for (var i = 0; i < n; i++)
            s[i]._remove(ils[i]);
        this.out = NO;
        this.ils = [];
        this.vals = [];
    };
    return Combine;
}());
var FromArray = /** @class */ (function () {
    function FromArray(a) {
        this.type = 'fromArray';
        this.a = a;
    }
    FromArray.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, n = a.length; i < n; i++)
            out._n(a[i]);
        out._c();
    };
    FromArray.prototype._stop = function () {
    };
    return FromArray;
}());
var FromPromise = /** @class */ (function () {
    function FromPromise(p) {
        this.type = 'fromPromise';
        this.on = false;
        this.p = p;
    }
    FromPromise.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(noop, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromise.prototype._stop = function () {
        this.on = false;
    };
    return FromPromise;
}());
var Periodic = /** @class */ (function () {
    function Periodic(period) {
        this.type = 'periodic';
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    Periodic.prototype._start = function (out) {
        var self = this;
        function intervalHandler() { out._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    Periodic.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return Periodic;
}());
var Debug = /** @class */ (function () {
    function Debug(ins, arg) {
        this.type = 'debug';
        this.ins = ins;
        this.out = NO;
        this.s = noop;
        this.l = '';
        if (typeof arg === 'string')
            this.l = arg;
        else if (typeof arg === 'function')
            this.s = arg;
    }
    Debug.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Debug.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Debug.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var s = this.s, l = this.l;
        if (s !== noop) {
            try {
                s(t);
            }
            catch (e) {
                u._e(e);
            }
        }
        else if (l)
            console.log(l + ':', t);
        else
            console.log(t);
        u._n(t);
    };
    Debug.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Debug.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Debug;
}());
var Drop = /** @class */ (function () {
    function Drop(max, ins) {
        this.type = 'drop';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.dropped = 0;
    }
    Drop.prototype._start = function (out) {
        this.out = out;
        this.dropped = 0;
        this.ins._add(this);
    };
    Drop.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Drop.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        if (this.dropped++ >= this.max)
            u._n(t);
    };
    Drop.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Drop.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Drop;
}());
var EndWhenListener = /** @class */ (function () {
    function EndWhenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    EndWhenListener.prototype._n = function () {
        this.op.end();
    };
    EndWhenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenListener.prototype._c = function () {
        this.op.end();
    };
    return EndWhenListener;
}());
var EndWhen = /** @class */ (function () {
    function EndWhen(o, ins) {
        this.type = 'endWhen';
        this.ins = ins;
        this.out = NO;
        this.o = o;
        this.oil = NO_IL;
    }
    EndWhen.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new EndWhenListener(out, this));
        this.ins._add(this);
    };
    EndWhen.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = NO;
        this.oil = NO_IL;
    };
    EndWhen.prototype.end = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    EndWhen.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    EndWhen.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    EndWhen.prototype._c = function () {
        this.end();
    };
    return EndWhen;
}());
var Filter = /** @class */ (function () {
    function Filter(passes, ins) {
        this.type = 'filter';
        this.ins = ins;
        this.out = NO;
        this.f = passes;
    }
    Filter.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Filter.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Filter.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO || !r)
            return;
        u._n(t);
    };
    Filter.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Filter.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Filter;
}());
var FlattenListener = /** @class */ (function () {
    function FlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    FlattenListener.prototype._n = function (t) {
        this.out._n(t);
    };
    FlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return FlattenListener;
}());
var Flatten = /** @class */ (function () {
    function Flatten(ins) {
        this.type = 'flatten';
        this.ins = ins;
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    }
    Flatten.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
        this.ins._add(this);
    };
    Flatten.prototype._stop = function () {
        this.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    };
    Flatten.prototype.less = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (!this.open && this.inner === NO)
            u._c();
    };
    Flatten.prototype._n = function (s) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new FlattenListener(u, this));
    };
    Flatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Flatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return Flatten;
}());
var Fold = /** @class */ (function () {
    function Fold(f, seed, ins) {
        var _this = this;
        this.type = 'fold';
        this.ins = ins;
        this.out = NO;
        this.f = function (t) { return f(_this.acc, t); };
        this.acc = this.seed = seed;
    }
    Fold.prototype._start = function (out) {
        this.out = out;
        this.acc = this.seed;
        out._n(this.acc);
        this.ins._add(this);
    };
    Fold.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.acc = this.seed;
    };
    Fold.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(this.acc = r);
    };
    Fold.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Fold.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Fold;
}());
var Last = /** @class */ (function () {
    function Last(ins) {
        this.type = 'last';
        this.ins = ins;
        this.out = NO;
        this.has = false;
        this.val = NO;
    }
    Last.prototype._start = function (out) {
        this.out = out;
        this.has = false;
        this.ins._add(this);
    };
    Last.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.val = NO;
    };
    Last.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    Last.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Last.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (this.has) {
            u._n(this.val);
            u._c();
        }
        else
            u._e(new Error('last() failed because input stream completed'));
    };
    return Last;
}());
var MapOp = /** @class */ (function () {
    function MapOp(project, ins) {
        this.type = 'map';
        this.ins = ins;
        this.out = NO;
        this.f = project;
    }
    MapOp.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOp.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    MapOp.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    MapOp.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapOp.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return MapOp;
}());
var Remember = /** @class */ (function () {
    function Remember(ins) {
        this.type = 'remember';
        this.ins = ins;
        this.out = NO;
    }
    Remember.prototype._start = function (out) {
        this.out = out;
        this.ins._add(out);
    };
    Remember.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return Remember;
}());
var ReplaceError = /** @class */ (function () {
    function ReplaceError(replacer, ins) {
        this.type = 'replaceError';
        this.ins = ins;
        this.out = NO;
        this.f = replacer;
    }
    ReplaceError.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceError.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    ReplaceError.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    ReplaceError.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        try {
            this.ins._remove(this);
            (this.ins = this.f(err))._add(this);
        }
        catch (e) {
            u._e(e);
        }
    };
    ReplaceError.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return ReplaceError;
}());
var StartWith = /** @class */ (function () {
    function StartWith(ins, val) {
        this.type = 'startWith';
        this.ins = ins;
        this.out = NO;
        this.val = val;
    }
    StartWith.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.val);
        this.ins._add(out);
    };
    StartWith.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return StartWith;
}());
var Take = /** @class */ (function () {
    function Take(max, ins) {
        this.type = 'take';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.taken = 0;
    }
    Take.prototype._start = function (out) {
        this.out = out;
        this.taken = 0;
        if (this.max <= 0)
            out._c();
        else
            this.ins._add(this);
    };
    Take.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Take.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var m = ++this.taken;
        if (m < this.max)
            u._n(t);
        else if (m === this.max) {
            u._n(t);
            u._c();
        }
    };
    Take.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Take.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Take;
}());
var Stream = /** @class */ (function () {
    function Stream(producer) {
        this._prod = producer || NO;
        this._ils = [];
        this._stopID = NO;
        this._dl = NO;
        this._d = false;
        this._target = NO;
        this._err = NO;
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var L = a.length;
        if (this._d)
            this._dl._n(t);
        if (L == 1)
            a[0]._n(t);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._n(t);
        }
    };
    Stream.prototype._e = function (err) {
        if (this._err !== NO)
            return;
        this._err = err;
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._e(err);
        if (L == 1)
            a[0]._e(err);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._e(err);
        }
        if (!this._d && L == 0)
            throw this._err;
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._c();
        if (L == 1)
            a[0]._c();
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._c();
        }
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod !== NO)
            this._prod._stop();
        this._err = NO;
        this._ils = [];
    };
    Stream.prototype._stopNow = function () {
        // WARNING: code that calls this method should
        // first check if this._prod is valid (not `NO`)
        this._prod._stop();
        this._err = NO;
        this._stopID = NO;
    };
    Stream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1)
            return;
        if (this._stopID !== NO) {
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var _this = this;
        var ta = this._target;
        if (ta !== NO)
            return ta._remove(il);
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            if (this._prod !== NO && a.length <= 0) {
                this._err = NO;
                this._stopID = setTimeout(function () { return _this._stopNow(); });
            }
            else if (a.length === 1) {
                this._pruneCycles();
            }
        }
    };
    // If all paths stemming from `this` stream eventually end at `this`
    // stream, then we remove the single listener of `this` stream, to
    // force it to end its execution and dispose resources. This method
    // assumes as a precondition that this._ils has just one listener.
    Stream.prototype._pruneCycles = function () {
        if (this._hasNoSinks(this, []))
            this._remove(this._ils[0]);
    };
    // Checks whether *there is no* path starting from `x` that leads to an end
    // listener (sink) in the stream graph, following edges A->B where B is a
    // listener of A. This means these paths constitute a cycle somehow. Is given
    // a trace of all visited nodes so far.
    Stream.prototype._hasNoSinks = function (x, trace) {
        if (trace.indexOf(x) !== -1)
            return true;
        else if (x.out === this)
            return true;
        else if (x.out && x.out !== NO)
            return this._hasNoSinks(x.out, trace.concat(x));
        else if (x._ils) {
            for (var i = 0, N = x._ils.length; i < N; i++)
                if (!this._hasNoSinks(x._ils[i], trace.concat(x)))
                    return false;
            return true;
        }
        else
            return false;
    };
    Stream.prototype.ctor = function () {
        return this instanceof MemoryStream ? MemoryStream : Stream;
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next || noop;
        listener._e = listener.error || noop;
        listener._c = listener.complete || noop;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    /**
     * Adds a Listener to the Stream returning a Subscription to remove that
     * listener.
     *
     * @param {Listener} listener
     * @returns {Subscription}
     */
    Stream.prototype.subscribe = function (listener) {
        this.addListener(listener);
        return new StreamSub(this, listener);
    };
    /**
     * Add interop between most.js and RxJS 5
     *
     * @returns {Stream}
     */
    Stream.prototype[symbol_observable_1.default] = function () {
        return this;
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            if (typeof producer.start !== 'function'
                || typeof producer.stop !== 'function')
                throw new Error('producer requires both start and stop functions');
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer)
            internalizeProducer(producer); // mutates the input
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * Marble diagram:
     *
     * ```text
     *          never
     * -----------------------
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    /**
     * Creates a Stream that immediately emits the "complete" notification when
     * started, and that's it.
     *
     * Marble diagram:
     *
     * ```text
     * empty
     * -|
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    /**
     * Creates a Stream that immediately emits an "error" notification with the
     * value you passed as the `error` argument when the stream starts, and that's
     * it.
     *
     * Marble diagram:
     *
     * ```text
     * throw(X)
     * -X
     * ```
     *
     * @factory true
     * @param error The error event to emit on the created stream.
     * @return {Stream}
     */
    Stream.throw = function (error) {
        return new Stream({
            _start: function (il) { il._e(error); },
            _stop: noop,
        });
    };
    /**
     * Creates a stream from an Array, Promise, or an Observable.
     *
     * @factory true
     * @param {Array|PromiseLike|Observable} input The input to make a stream from.
     * @return {Stream}
     */
    Stream.from = function (input) {
        if (typeof input[symbol_observable_1.default] === 'function')
            return Stream.fromObservable(input);
        else if (typeof input.then === 'function')
            return Stream.fromPromise(input);
        else if (Array.isArray(input))
            return Stream.fromArray(input);
        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @factory true
     * @param a The first value you want to emit as an event on the stream.
     * @param b The second value you want to emit as an event on the stream. One
     * or more of these values may be given as arguments.
     * @return {Stream}
     */
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    /**
     * Converts an array to a stream. The returned stream will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @factory true
     * @param {Array} array The array to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromArray = function (array) {
        return new Stream(new FromArray(array));
    };
    /**
     * Converts a promise to a stream. The returned stream will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the stream will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @factory true
     * @param {PromiseLike} promise The promise to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromise(promise));
    };
    /**
     * Converts an Observable into a Stream.
     *
     * @factory true
     * @param {any} observable The observable to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromObservable = function (obs) {
        if (obs.endWhen)
            return obs;
        var o = typeof obs[symbol_observable_1.default] === 'function' ? obs[symbol_observable_1.default]() : obs;
        return new Stream(new FromObservable(o));
    };
    /**
     * Creates a stream that periodically emits incremental numbers, every
     * `period` milliseconds.
     *
     * Marble diagram:
     *
     * ```text
     *     periodic(1000)
     * ---0---1---2---3---4---...
     * ```
     *
     * @factory true
     * @param {number} period The interval in milliseconds to use as a rate of
     * emission.
     * @return {Stream}
     */
    Stream.periodic = function (period) {
        return new Stream(new Periodic(period));
    };
    Stream.prototype._map = function (project) {
        return new (this.ctor())(new MapOp(project, this));
    };
    /**
     * Transforms each event from the input Stream through a `project` function,
     * to get a Stream that emits those transformed events.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        return this._map(project);
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        var s = this.map(function () { return projectedValue; });
        var op = s._prod;
        op.type = 'mapTo';
        return s;
    };
    /**
     * Only allows events that pass the test given by the `passes` argument.
     *
     * Each event from the input stream is given to the `passes` function. If the
     * function returns `true`, the event is forwarded to the output stream,
     * otherwise it is ignored and not forwarded.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2--3-----4-----5---6--7-8--
     *     filter(i => i % 2 === 0)
     * ------2--------4---------6----8--
     * ```
     *
     * @param {Function} passes A function of type `(t: T) => boolean` that takes
     * an event from the input stream and checks if it passes, by returning a
     * boolean.
     * @return {Stream}
     */
    Stream.prototype.filter = function (passes) {
        var p = this._prod;
        if (p instanceof Filter)
            return new Stream(new Filter(and(p.f, passes), p.ins));
        return new Stream(new Filter(passes, this));
    };
    /**
     * Lets the first `amount` many events from the input stream pass to the
     * output stream, then makes the output stream complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *    take(3)
     * --a---b--c|
     * ```
     *
     * @param {number} amount How many events to allow from the input stream
     * before completing the output stream.
     * @return {Stream}
     */
    Stream.prototype.take = function (amount) {
        return new (this.ctor())(new Take(amount, this));
    };
    /**
     * Ignores the first `amount` many events from the input stream, and then
     * after that starts forwarding events from the input stream to the output
     * stream.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *       drop(3)
     * --------------d---e--
     * ```
     *
     * @param {number} amount How many events to ignore from the input stream
     * before forwarding all events from the input stream to the output stream.
     * @return {Stream}
     */
    Stream.prototype.drop = function (amount) {
        return new Stream(new Drop(amount, this));
    };
    /**
     * When the input stream completes, the output stream will emit the last event
     * emitted by the input stream, and then will also complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c--d----|
     *       last()
     * -----------------d|
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.last = function () {
        return new Stream(new Last(this));
    };
    /**
     * Prepends the given `initial` value to the sequence of events emitted by the
     * input stream. The returned stream is a MemoryStream, which means it is
     * already `remember()`'d.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3---
     *   startWith(0)
     * 0--1---2-----3---
     * ```
     *
     * @param initial The value or event to prepend.
     * @return {MemoryStream}
     */
    Stream.prototype.startWith = function (initial) {
        return new MemoryStream(new StartWith(this, initial));
    };
    /**
     * Uses another stream to determine when to complete the current stream.
     *
     * When the given `other` stream emits an event or completes, the output
     * stream will complete. Before that happens, the output stream will behaves
     * like the input stream.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3--4----5----6---
     *   endWhen( --------a--b--| )
     * ---1---2-----3--4--|
     * ```
     *
     * @param other Some other stream that is used to know when should the output
     * stream of this operator complete.
     * @return {Stream}
     */
    Stream.prototype.endWhen = function (other) {
        return new (this.ctor())(new EndWhen(other, this));
    };
    /**
     * "Folds" the stream onto itself.
     *
     * Combines events from the past throughout
     * the entire execution of the input stream, allowing you to accumulate them
     * together. It's essentially like `Array.prototype.reduce`. The returned
     * stream is a MemoryStream, which means it is already `remember()`'d.
     *
     * The output stream starts by emitting the `seed` which you give as argument.
     * Then, when an event happens on the input stream, it is combined with that
     * seed value through the `accumulate` function, and the output value is
     * emitted on the output stream. `fold` remembers that output value as `acc`
     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
     * combined with that to produce the new `acc` and so forth.
     *
     * Marble diagram:
     *
     * ```text
     * ------1-----1--2----1----1------
     *   fold((acc, x) => acc + x, 3)
     * 3-----4-----5--7----8----9------
     * ```
     *
     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
     * takes the previous accumulated value `acc` and the incoming event from the
     * input stream and produces the new accumulated value.
     * @param seed The initial accumulated value, of type `R`.
     * @return {MemoryStream}
     */
    Stream.prototype.fold = function (accumulate, seed) {
        return new MemoryStream(new Fold(accumulate, seed, this));
    };
    /**
     * Replaces an error with another stream.
     *
     * When (and if) an error happens on the input stream, instead of forwarding
     * that error to the output stream, *replaceError* will call the `replace`
     * function which returns the stream that the output stream will replicate.
     * And, in case that new stream also emits an error, `replace` will be called
     * again to get another stream to start replicating.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2-----3--4-----X
     *   replaceError( () => --10--| )
     * --1---2-----3--4--------10--|
     * ```
     *
     * @param {Function} replace A function of type `(err) => Stream` that takes
     * the error that occurred on the input stream or on the previous replacement
     * stream and returns a new stream. The output stream will behave like the
     * stream that this function returns.
     * @return {Stream}
     */
    Stream.prototype.replaceError = function (replace) {
        return new (this.ctor())(new ReplaceError(replace, this));
    };
    /**
     * Flattens a "stream of streams", handling only one nested stream at a time
     * (no concurrency).
     *
     * If the input stream is a stream that emits streams, then this operator will
     * return an output stream which is a flat stream: emits regular events. The
     * flattening happens without concurrency. It works like this: when the input
     * stream emits a nested stream, *flatten* will start imitating that nested
     * one. However, as soon as the next nested stream is emitted on the input
     * stream, *flatten* will forget the previous nested one it was imitating, and
     * will start imitating the new nested one.
     *
     * Marble diagram:
     *
     * ```text
     * --+--------+---------------
     *   \        \
     *    \       ----1----2---3--
     *    --a--b----c----d--------
     *           flatten
     * -----a--b------1----2---3--
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.flatten = function () {
        var p = this._prod;
        return new Stream(new Flatten(this));
    };
    /**
     * Passes the input stream to a custom operator, to produce an output stream.
     *
     * *compose* is a handy way of using an existing function in a chained style.
     * Instead of writing `outStream = f(inStream)` you can write
     * `outStream = inStream.compose(f)`.
     *
     * @param {function} operator A function that takes a stream as input and
     * returns a stream as well.
     * @return {Stream}
     */
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    /**
     * Returns an output stream that behaves like the input stream, but also
     * remembers the most recent event that happens on the input stream, so that a
     * newly added listener will immediately receive that memorised event.
     *
     * @return {MemoryStream}
     */
    Stream.prototype.remember = function () {
        return new MemoryStream(new Remember(this));
    };
    /**
     * Returns an output stream that identically behaves like the input stream,
     * but also runs a `spy` function for each event, to help you debug your app.
     *
     * *debug* takes a `spy` function as argument, and runs that for each event
     * happening on the input stream. If you don't provide the `spy` argument,
     * then *debug* will just `console.log` each event. This helps you to
     * understand the flow of events through some operator chain.
     *
     * Please note that if the output stream has no listeners, then it will not
     * start, which means `spy` will never run because no actual event happens in
     * that case.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3-----4--
     *         debug
     * --1----2-----3-----4--
     * ```
     *
     * @param {function} labelOrSpy A string to use as the label when printing
     * debug information on the console, or a 'spy' function that takes an event
     * as argument, and does not need to return anything.
     * @return {Stream}
     */
    Stream.prototype.debug = function (labelOrSpy) {
        return new (this.ctor())(new Debug(this, labelOrSpy));
    };
    /**
     * *imitate* changes this current Stream to emit the same events that the
     * `other` given Stream does. This method returns nothing.
     *
     * This method exists to allow one thing: **circular dependency of streams**.
     * For instance, let's imagine that for some reason you need to create a
     * circular dependency where stream `first$` depends on stream `second$`
     * which in turn depends on `first$`:
     *
     * <!-- skip-example -->
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var first$ = second$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * ```
     *
     * However, that is invalid JavaScript, because `second$` is undefined
     * on the first line. This is how *imitate* can help solve it:
     *
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var secondProxy$ = xs.create();
     * var first$ = secondProxy$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * secondProxy$.imitate(second$);
     * ```
     *
     * We create `secondProxy$` before the others, so it can be used in the
     * declaration of `first$`. Then, after both `first$` and `second$` are
     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
     * that they are "the same". `imitate` will not trigger the start of any
     * stream, it just binds `secondProxy$` and `second$` together.
     *
     * The following is an example where `imitate()` is important in Cycle.js
     * applications. A parent component contains some child components. A child
     * has an action stream which is given to the parent to define its state:
     *
     * <!-- skip-example -->
     * ```js
     * const childActionProxy$ = xs.create();
     * const parent = Parent({...sources, childAction$: childActionProxy$});
     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
     * childActionProxy$.imitate(childAction$);
     * ```
     *
     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
     * would attempt to imitate a MemoryStream in a circular dependency, we would
     * either get a race condition (where the symptom would be "nothing happens")
     * or an infinite cyclic emission of values. It's useful to think about
     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
     * cell `B1` defined with a formula that depends on `A1`.
     *
     * If you find yourself wanting to use `imitate()` with a
     * MemoryStream, you should rework your code around `imitate()` to use a
     * Stream instead. Look for the stream in the circular dependency that
     * represents an event stream, and that would be a candidate for creating a
     * proxy Stream which then imitates the target Stream.
     *
     * @param {Stream} target The other stream to imitate on the current one. Must
     * not be a MemoryStream.
     */
    Stream.prototype.imitate = function (target) {
        if (target instanceof MemoryStream)
            throw new Error('A MemoryStream was given to imitate(), but it only ' +
                'supports a Stream. Read more about this restriction here: ' +
                'https://github.com/staltz/xstream#faq');
        this._target = target;
        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++)
            target._add(ils[i]);
        this._ils = [];
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    /**
     * Adds a "debug" listener to the stream. There can only be one debug
     * listener, that's why this is 'setDebugListener'. To remove the debug
     * listener, just call setDebugListener(null).
     *
     * A debug listener is like any other listener. The only difference is that a
     * debug listener is "stealthy": its presence/absence does not trigger the
     * start/stop of the stream (or the producer inside the stream). This is
     * useful so you can inspect what is going on without changing the behavior
     * of the program. If you have an idle stream and you add a normal listener to
     * it, the stream will start executing. But if you set a debug listener on an
     * idle stream, it won't start executing (not until the first normal listener
     * is added).
     *
     * As the name indicates, we don't recommend using this method to build app
     * logic. In fact, in most cases the debug operator works just fine. Only use
     * this one if you know what you're doing.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.setDebugListener = function (listener) {
        if (!listener) {
            this._d = false;
            this._dl = NO;
        }
        else {
            this._d = true;
            listener._n = listener.next || noop;
            listener._e = listener.error || noop;
            listener._c = listener.complete || noop;
            this._dl = listener;
        }
    };
    /**
     * Blends multiple streams together, emitting events from all of them
     * concurrently.
     *
     * *merge* takes multiple streams as arguments, and creates a stream that
     * behaves like each of the argument streams, in parallel.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3--------4---
     * ----a-----b----c---d------
     *            merge
     * --1-a--2--b--3-c---d--4---
     * ```
     *
     * @factory true
     * @param {Stream} stream1 A stream to merge together with other streams.
     * @param {Stream} stream2 A stream to merge together with other streams. Two
     * or more streams may be given as arguments.
     * @return {Stream}
     */
    Stream.merge = function merge() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        return new Stream(new Merge(streams));
    };
    /**
     * Combines multiple input streams together to return a stream whose events
     * are arrays that collect the latest events from each input stream.
     *
     * *combine* internally remembers the most recent event from each of the input
     * streams. When any of the input streams emits an event, that event together
     * with all the other saved events are combined into an array. That array will
     * be emitted on the output stream. It's essentially a way of joining together
     * the events from multiple streams.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3--------4---
     * ----a-----b-----c--d------
     *          combine
     * ----1a-2a-2b-3b-3c-3d-4d--
     * ```
     *
     * @factory true
     * @param {Stream} stream1 A stream to combine together with other streams.
     * @param {Stream} stream2 A stream to combine together with other streams.
     * Multiple streams, not just two, may be given as arguments.
     * @return {Stream}
     */
    Stream.combine = function combine() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        return new Stream(new Combine(streams));
    };
    return Stream;
}());
exports.Stream = Stream;
var MemoryStream = /** @class */ (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        var _this = _super.call(this, producer) || this;
        _this._has = false;
        return _this;
    }
    MemoryStream.prototype._n = function (x) {
        this._v = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1) {
            if (this._has)
                il._n(this._v);
            return;
        }
        if (this._stopID !== NO) {
            if (this._has)
                il._n(this._v);
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else if (this._has)
            il._n(this._v);
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    MemoryStream.prototype._stopNow = function () {
        this._has = false;
        _super.prototype._stopNow.call(this);
    };
    MemoryStream.prototype._x = function () {
        this._has = false;
        _super.prototype._x.call(this);
    };
    MemoryStream.prototype.map = function (project) {
        return this._map(project);
    };
    MemoryStream.prototype.mapTo = function (projectedValue) {
        return _super.prototype.mapTo.call(this, projectedValue);
    };
    MemoryStream.prototype.take = function (amount) {
        return _super.prototype.take.call(this, amount);
    };
    MemoryStream.prototype.endWhen = function (other) {
        return _super.prototype.endWhen.call(this, other);
    };
    MemoryStream.prototype.replaceError = function (replace) {
        return _super.prototype.replaceError.call(this, replace);
    };
    MemoryStream.prototype.remember = function () {
        return this;
    };
    MemoryStream.prototype.debug = function (labelOrSpy) {
        return _super.prototype.debug.call(this, labelOrSpy);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
var xs = Stream;
exports.default = xs;

},{"symbol-observable":"node_modules/symbol-observable/es/index.js"}],"node_modules/@cycle/dom/lib/es6/fromEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEvent = fromEvent;
exports.preventDefaultConditional = preventDefaultConditional;
var _xstream = require("xstream");
function fromEvent(element, eventName, useCapture, preventDefault, passive) {
  if (useCapture === void 0) {
    useCapture = false;
  }
  if (preventDefault === void 0) {
    preventDefault = false;
  }
  if (passive === void 0) {
    passive = false;
  }
  var next = null;
  return _xstream.Stream.create({
    start: function start(listener) {
      if (preventDefault) {
        next = function _next(event) {
          preventDefaultConditional(event, preventDefault);
          listener.next(event);
        };
      } else {
        next = function _next(event) {
          listener.next(event);
        };
      }
      element.addEventListener(eventName, next, {
        capture: useCapture,
        passive: passive
      });
    },
    stop: function stop() {
      element.removeEventListener(eventName, next, useCapture);
      next = null;
    }
  });
}
function matchObject(matcher, obj) {
  var keys = Object.keys(matcher);
  var n = keys.length;
  for (var i = 0; i < n; i++) {
    var k = keys[i];
    if (typeof matcher[k] === 'object' && typeof obj[k] === 'object') {
      if (!matchObject(matcher[k], obj[k])) {
        return false;
      }
    } else if (matcher[k] !== obj[k]) {
      return false;
    }
  }
  return true;
}
function preventDefaultConditional(event, preventDefault) {
  if (preventDefault) {
    if (typeof preventDefault === 'boolean') {
      event.preventDefault();
    } else if (isPredicate(preventDefault)) {
      if (preventDefault(event)) {
        event.preventDefault();
      }
    } else if (typeof preventDefault === 'object') {
      if (matchObject(preventDefault, event)) {
        event.preventDefault();
      }
    } else {
      throw new Error('preventDefault has to be either a boolean, predicate function or object');
    }
  }
}
function isPredicate(fn) {
  return typeof fn === 'function';
}
},{"xstream":"node_modules/xstream/index.js"}],"node_modules/@cycle/dom/lib/es6/DocumentDOMSource.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentDOMSource = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
var _adapt = require("@cycle/run/lib/adapt");
var _fromEvent = require("./fromEvent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DocumentDOMSource = exports.DocumentDOMSource = /** @class */function () {
  function DocumentDOMSource(_name) {
    this._name = _name;
  }
  DocumentDOMSource.prototype.select = function (selector) {
    // This functionality is still undefined/undecided.
    return this;
  };
  DocumentDOMSource.prototype.elements = function () {
    var out = (0, _adapt.adapt)(_xstream.default.of([document]));
    out._isCycleSource = this._name;
    return out;
  };
  DocumentDOMSource.prototype.element = function () {
    var out = (0, _adapt.adapt)(_xstream.default.of(document));
    out._isCycleSource = this._name;
    return out;
  };
  DocumentDOMSource.prototype.events = function (eventType, options, bubbles) {
    if (options === void 0) {
      options = {};
    }
    var stream;
    stream = (0, _fromEvent.fromEvent)(document, eventType, options.useCapture, options.preventDefault);
    var out = (0, _adapt.adapt)(stream);
    out._isCycleSource = this._name;
    return out;
  };
  return DocumentDOMSource;
}();
},{"xstream":"node_modules/xstream/index.js","@cycle/run/lib/adapt":"node_modules/@cycle/run/lib/adapt.js","./fromEvent":"node_modules/@cycle/dom/lib/es6/fromEvent.js"}],"node_modules/@cycle/dom/lib/es6/BodyDOMSource.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BodyDOMSource = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
var _adapt = require("@cycle/run/lib/adapt");
var _fromEvent = require("./fromEvent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var BodyDOMSource = exports.BodyDOMSource = /** @class */function () {
  function BodyDOMSource(_name) {
    this._name = _name;
  }
  BodyDOMSource.prototype.select = function (selector) {
    // This functionality is still undefined/undecided.
    return this;
  };
  BodyDOMSource.prototype.elements = function () {
    var out = (0, _adapt.adapt)(_xstream.default.of([document.body]));
    out._isCycleSource = this._name;
    return out;
  };
  BodyDOMSource.prototype.element = function () {
    var out = (0, _adapt.adapt)(_xstream.default.of(document.body));
    out._isCycleSource = this._name;
    return out;
  };
  BodyDOMSource.prototype.events = function (eventType, options, bubbles) {
    if (options === void 0) {
      options = {};
    }
    var stream;
    stream = (0, _fromEvent.fromEvent)(document.body, eventType, options.useCapture, options.preventDefault);
    var out = (0, _adapt.adapt)(stream);
    out._isCycleSource = this._name;
    return out;
  };
  return BodyDOMSource;
}();
},{"xstream":"node_modules/xstream/index.js","@cycle/run/lib/adapt":"node_modules/@cycle/run/lib/adapt.js","./fromEvent":"node_modules/@cycle/dom/lib/es6/fromEvent.js"}],"node_modules/@cycle/dom/lib/es6/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValidContainer = checkValidContainer;
exports.getSelectors = getSelectors;
exports.getValidNode = getValidNode;
exports.isClassOrId = isClassOrId;
exports.isDocFrag = isDocFrag;
exports.isEqualNamespace = isEqualNamespace;
exports.makeInsert = makeInsert;
function isValidNode(obj) {
  var ELEM_TYPE = 1;
  var FRAG_TYPE = 11;
  return typeof HTMLElement === 'object' ? obj instanceof HTMLElement || obj instanceof DocumentFragment : obj && typeof obj === 'object' && obj !== null && (obj.nodeType === ELEM_TYPE || obj.nodeType === FRAG_TYPE) && typeof obj.nodeName === 'string';
}
function isClassOrId(str) {
  return str.length > 1 && (str[0] === '.' || str[0] === '#');
}
function isDocFrag(el) {
  return el.nodeType === 11;
}
function checkValidContainer(container) {
  if (typeof container !== 'string' && !isValidNode(container)) {
    throw new Error('Given container is not a DOM element neither a selector string.');
  }
}
function getValidNode(selectors) {
  var domElement = typeof selectors === 'string' ? document.querySelector(selectors) : selectors;
  if (typeof selectors === 'string' && domElement === null) {
    throw new Error("Cannot render into unknown element `" + selectors + "`");
  }
  return domElement;
}
function getSelectors(namespace) {
  var res = '';
  for (var i = namespace.length - 1; i >= 0; i--) {
    if (namespace[i].type !== 'selector') {
      break;
    }
    res = namespace[i].scope + ' ' + res;
  }
  return res.trim();
}
function isEqualNamespace(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; i++) {
    if (a[i].type !== b[i].type || a[i].scope !== b[i].scope) {
      return false;
    }
  }
  return true;
}
function makeInsert(map) {
  return function (type, elm, value) {
    if (map.has(type)) {
      var innerMap = map.get(type);
      innerMap.set(elm, value);
    } else {
      var innerMap = new Map();
      innerMap.set(elm, value);
      map.set(type, innerMap);
    }
  };
}
},{}],"node_modules/@cycle/dom/lib/es6/ScopeChecker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeChecker = void 0;
var _utils = require("./utils");
var ScopeChecker = exports.ScopeChecker = /** @class */function () {
  function ScopeChecker(namespace, isolateModule) {
    this.namespace = namespace;
    this.isolateModule = isolateModule;
    this._namespace = namespace.filter(function (n) {
      return n.type !== 'selector';
    });
  }
  /**
   * Checks whether the given element is *directly* in the scope of this
   * scope checker. Being contained *indirectly* through other scopes
   * is not valid. This is crucial for implementing parent-child isolation,
   * so that the parent selectors don't search inside a child scope.
   */
  ScopeChecker.prototype.isDirectlyInScope = function (leaf) {
    var namespace = this.isolateModule.getNamespace(leaf);
    if (!namespace) {
      return false;
    }
    if (this._namespace.length > namespace.length || !(0, _utils.isEqualNamespace)(this._namespace, namespace.slice(0, this._namespace.length))) {
      return false;
    }
    for (var i = this._namespace.length; i < namespace.length; i++) {
      if (namespace[i].type === 'total') {
        return false;
      }
    }
    return true;
  };
  return ScopeChecker;
}();
},{"./utils":"node_modules/@cycle/dom/lib/es6/utils.js"}],"node_modules/@cycle/dom/lib/es6/ElementFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementFinder = void 0;
var _ScopeChecker = require("./ScopeChecker");
var _utils = require("./utils");
function toElArray(input) {
  return Array.prototype.slice.call(input);
}
var ElementFinder = exports.ElementFinder = /** @class */function () {
  function ElementFinder(namespace, isolateModule) {
    this.namespace = namespace;
    this.isolateModule = isolateModule;
  }
  ElementFinder.prototype.call = function () {
    var namespace = this.namespace;
    var selector = (0, _utils.getSelectors)(namespace);
    var scopeChecker = new _ScopeChecker.ScopeChecker(namespace, this.isolateModule);
    var topNode = this.isolateModule.getElement(namespace.filter(function (n) {
      return n.type !== 'selector';
    }));
    if (topNode === undefined) {
      return [];
    }
    if (selector === '') {
      return [topNode];
    }
    return toElArray(topNode.querySelectorAll(selector)).filter(scopeChecker.isDirectlyInScope, scopeChecker).concat(topNode.matches(selector) ? [topNode] : []);
  };
  return ElementFinder;
}();
},{"./ScopeChecker":"node_modules/@cycle/dom/lib/es6/ScopeChecker.js","./utils":"node_modules/@cycle/dom/lib/es6/utils.js"}],"node_modules/@cycle/dom/lib/es6/isolate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScopeObj = getScopeObj;
exports.makeIsolateSink = makeIsolateSink;
var _utils = require("./utils");
var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function makeIsolateSink(namespace) {
  return function (sink, scope) {
    if (scope === ':root') {
      return sink;
    }
    return sink.map(function (node) {
      if (!node) {
        return node;
      }
      var scopeObj = getScopeObj(scope);
      var newNode = __assign({}, node, {
        data: __assign({}, node.data, {
          isolate: !node.data || !Array.isArray(node.data.isolate) ? namespace.concat([scopeObj]) : node.data.isolate
        })
      });
      return __assign({}, newNode, {
        key: newNode.key !== undefined ? newNode.key : JSON.stringify(newNode.data.isolate)
      });
    });
  };
}
function getScopeObj(scope) {
  return {
    type: (0, _utils.isClassOrId)(scope) ? 'sibling' : 'total',
    scope: scope
  };
}
},{"./utils":"node_modules/@cycle/dom/lib/es6/utils.js"}],"node_modules/@cycle/dom/lib/es6/MainDOMSource.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainDOMSource = void 0;
var _adapt = require("@cycle/run/lib/adapt");
var _DocumentDOMSource = require("./DocumentDOMSource");
var _BodyDOMSource = require("./BodyDOMSource");
var _ElementFinder = require("./ElementFinder");
var _isolate = require("./isolate");
var MainDOMSource = exports.MainDOMSource = /** @class */function () {
  function MainDOMSource(_rootElement$, _sanitation$, _namespace, _isolateModule, _eventDelegator, _name) {
    if (_namespace === void 0) {
      _namespace = [];
    }
    this._rootElement$ = _rootElement$;
    this._sanitation$ = _sanitation$;
    this._namespace = _namespace;
    this._isolateModule = _isolateModule;
    this._eventDelegator = _eventDelegator;
    this._name = _name;
    this.isolateSource = function (source, scope) {
      return new MainDOMSource(source._rootElement$, source._sanitation$, source._namespace.concat((0, _isolate.getScopeObj)(scope)), source._isolateModule, source._eventDelegator, source._name);
    };
    this.isolateSink = (0, _isolate.makeIsolateSink)(this._namespace);
  }
  MainDOMSource.prototype._elements = function () {
    if (this._namespace.length === 0) {
      return this._rootElement$.map(function (x) {
        return [x];
      });
    } else {
      var elementFinder_1 = new _ElementFinder.ElementFinder(this._namespace, this._isolateModule);
      return this._rootElement$.map(function () {
        return elementFinder_1.call();
      });
    }
  };
  MainDOMSource.prototype.elements = function () {
    var out = (0, _adapt.adapt)(this._elements().remember());
    out._isCycleSource = this._name;
    return out;
  };
  MainDOMSource.prototype.element = function () {
    var out = (0, _adapt.adapt)(this._elements().filter(function (arr) {
      return arr.length > 0;
    }).map(function (arr) {
      return arr[0];
    }).remember());
    out._isCycleSource = this._name;
    return out;
  };
  Object.defineProperty(MainDOMSource.prototype, "namespace", {
    get: function () {
      return this._namespace;
    },
    enumerable: true,
    configurable: true
  });
  MainDOMSource.prototype.select = function (selector) {
    if (typeof selector !== 'string') {
      throw new Error("DOM driver's select() expects the argument to be a " + "string as a CSS selector");
    }
    if (selector === 'document') {
      return new _DocumentDOMSource.DocumentDOMSource(this._name);
    }
    if (selector === 'body') {
      return new _BodyDOMSource.BodyDOMSource(this._name);
    }
    var namespace = selector === ':root' ? [] : this._namespace.concat({
      type: 'selector',
      scope: selector.trim()
    });
    return new MainDOMSource(this._rootElement$, this._sanitation$, namespace, this._isolateModule, this._eventDelegator, this._name);
  };
  MainDOMSource.prototype.events = function (eventType, options, bubbles) {
    if (options === void 0) {
      options = {};
    }
    if (typeof eventType !== "string") {
      throw new Error("DOM driver's events() expects argument to be a " + "string representing the event type to listen for.");
    }
    var event$ = this._eventDelegator.addEventListener(eventType, this._namespace, options, bubbles);
    var out = (0, _adapt.adapt)(event$);
    out._isCycleSource = this._name;
    return out;
  };
  MainDOMSource.prototype.dispose = function () {
    this._sanitation$.shamefullySendNext(null);
    //this._isolateModule.reset();
  };
  return MainDOMSource;
}();
},{"@cycle/run/lib/adapt":"node_modules/@cycle/run/lib/adapt.js","./DocumentDOMSource":"node_modules/@cycle/dom/lib/es6/DocumentDOMSource.js","./BodyDOMSource":"node_modules/@cycle/dom/lib/es6/BodyDOMSource.js","./ElementFinder":"node_modules/@cycle/dom/lib/es6/ElementFinder.js","./isolate":"node_modules/@cycle/dom/lib/es6/isolate.js"}],"node_modules/xstream/extra/concat.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var ConcatProducer = /** @class */ (function () {
    function ConcatProducer(streams) {
        this.streams = streams;
        this.type = 'concat';
        this.out = null;
        this.i = 0;
    }
    ConcatProducer.prototype._start = function (out) {
        this.out = out;
        this.streams[this.i]._add(this);
    };
    ConcatProducer.prototype._stop = function () {
        var streams = this.streams;
        if (this.i < streams.length) {
            streams[this.i]._remove(this);
        }
        this.i = 0;
        this.out = null;
    };
    ConcatProducer.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        u._n(t);
    };
    ConcatProducer.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    ConcatProducer.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        var streams = this.streams;
        streams[this.i]._remove(this);
        if (++this.i < streams.length) {
            streams[this.i]._add(this);
        }
        else {
            u._c();
        }
    };
    return ConcatProducer;
}());
/**
 * Puts one stream after the other. *concat* is a factory that takes multiple
 * streams as arguments, and starts the `n+1`-th stream only when the `n`-th
 * stream has completed. It concatenates those streams together.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2---3---4-|
 * ...............--a-b-c--d-|
 *           concat
 * --1--2---3---4---a-b-c--d-|
 * ```
 *
 * Example:
 *
 * ```js
 * import concat from 'xstream/extra/concat'
 *
 * const streamA = xs.of('a', 'b', 'c')
 * const streamB = xs.of(10, 20, 30)
 * const streamC = xs.of('X', 'Y', 'Z')
 *
 * const outputStream = concat(streamA, streamB, streamC)
 *
 * outputStream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to concatenate together with other streams.
 * @param {Stream} stream2 A stream to concatenate together with other streams. Two
 * or more streams may be given as arguments.
 * @return {Stream}
 */
function concat() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new index_1.Stream(new ConcatProducer(streams));
}
exports.default = concat;

},{"../index":"node_modules/xstream/index.js"}],"node_modules/xstream/extra/sampleCombine.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var NO = {};
var SampleCombineListener = /** @class */ (function () {
    function SampleCombineListener(i, p) {
        this.i = i;
        this.p = p;
        p.ils[i] = this;
    }
    SampleCombineListener.prototype._n = function (t) {
        var p = this.p;
        if (p.out === NO)
            return;
        p.up(t, this.i);
    };
    SampleCombineListener.prototype._e = function (err) {
        this.p._e(err);
    };
    SampleCombineListener.prototype._c = function () {
        this.p.down(this.i, this);
    };
    return SampleCombineListener;
}());
exports.SampleCombineListener = SampleCombineListener;
var SampleCombineOperator = /** @class */ (function () {
    function SampleCombineOperator(ins, streams) {
        this.type = 'sampleCombine';
        this.ins = ins;
        this.others = streams;
        this.out = NO;
        this.ils = [];
        this.Nn = 0;
        this.vals = [];
    }
    SampleCombineOperator.prototype._start = function (out) {
        this.out = out;
        var s = this.others;
        var n = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        for (var i = 0; i < n; i++) {
            vals[i] = NO;
            s[i]._add(new SampleCombineListener(i, this));
        }
        this.ins._add(this);
    };
    SampleCombineOperator.prototype._stop = function () {
        var s = this.others;
        var n = s.length;
        var ils = this.ils;
        this.ins._remove(this);
        for (var i = 0; i < n; i++) {
            s[i]._remove(ils[i]);
        }
        this.out = NO;
        this.vals = [];
        this.ils = [];
    };
    SampleCombineOperator.prototype._n = function (t) {
        var out = this.out;
        if (out === NO)
            return;
        if (this.Nn > 0)
            return;
        out._n([t].concat(this.vals));
    };
    SampleCombineOperator.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    SampleCombineOperator.prototype._c = function () {
        var out = this.out;
        if (out === NO)
            return;
        out._c();
    };
    SampleCombineOperator.prototype.up = function (t, i) {
        var v = this.vals[i];
        if (this.Nn > 0 && v === NO) {
            this.Nn--;
        }
        this.vals[i] = t;
    };
    SampleCombineOperator.prototype.down = function (i, l) {
        this.others[i]._remove(l);
    };
    return SampleCombineOperator;
}());
exports.SampleCombineOperator = SampleCombineOperator;
var sampleCombine;
/**
 *
 * Combines a source stream with multiple other streams. The result stream
 * will emit the latest events from all input streams, but only when the
 * source stream emits.
 *
 * If the source, or any input stream, throws an error, the result stream
 * will propagate the error. If any input streams end, their final emitted
 * value will remain in the array of any subsequent events from the result
 * stream.
 *
 * The result stream will only complete upon completion of the source stream.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4--- (source)
 * ----a-----b-----c--d------ (other)
 *      sampleCombine
 * -------2a----3b-------4d--
 * ```
 *
 * Examples:
 *
 * ```js
 * import sampleCombine from 'xstream/extra/sampleCombine'
 * import xs from 'xstream'
 *
 * const sampler = xs.periodic(1000).take(3)
 * const other = xs.periodic(100)
 *
 * const stream = sampler.compose(sampleCombine(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > [0, 8]
 * > [1, 18]
 * > [2, 28]
 * ```
 *
 * ```js
 * import sampleCombine from 'xstream/extra/sampleCombine'
 * import xs from 'xstream'
 *
 * const sampler = xs.periodic(1000).take(3)
 * const other = xs.periodic(100).take(2)
 *
 * const stream = sampler.compose(sampleCombine(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > [0, 1]
 * > [1, 1]
 * > [2, 1]
 * ```
 *
 * @param {...Stream} streams One or more streams to combine with the sampler
 * stream.
 * @return {Stream}
 */
sampleCombine = function sampleCombine() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return function sampleCombineOperator(sampler) {
        return new index_1.Stream(new SampleCombineOperator(sampler, streams));
    };
};
exports.default = sampleCombine;

},{"../index":"node_modules/xstream/index.js"}],"node_modules/snabbdom-selector/lib/es6/curry2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curry2 = curry2;
function curry2(select) {
  return function selector(sel, vNode) {
    switch (arguments.length) {
      case 0:
        return select;
      case 1:
        return function (_vNode) {
          return select(sel, _vNode);
        };
      default:
        return select(sel, vNode);
    }
  };
}
},{}],"node_modules/tree-selector/lib/es6/selectorParser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSelector = parseSelector;
var __assign = void 0 && (void 0).__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }
  return t;
};
var IDENT = '[\\w-]+';
var SPACE = '[ \t]*';
var VALUE = "[^\\]]+";
var CLASS = "(?:\\." + IDENT + ")";
var ID = "(?:#" + IDENT + ")";
var OP = "(?:=|\\$=|\\^=|\\*=|~=|\\|=)";
var ATTR = "(?:\\[" + SPACE + IDENT + SPACE + "(?:" + OP + SPACE + VALUE + SPACE + ")?\\])";
var SUBTREE = "(?:[ \t]+)";
var CHILD = "(?:" + SPACE + "(>)" + SPACE + ")";
var NEXT_SIBLING = "(?:" + SPACE + "(\\+)" + SPACE + ")";
var SIBLING = "(?:" + SPACE + "(~)" + SPACE + ")";
var COMBINATOR = "(?:" + SUBTREE + "|" + CHILD + "|" + NEXT_SIBLING + "|" + SIBLING + ")";
var CONTAINS = "contains\\(\"[^\"]*\"\\)";
var FORMULA = "(?:even|odd|\\d*(?:-?n(?:\\+\\d+)?)?)";
var NTH_CHILD = "nth-child\\(" + FORMULA + "\\)";
var PSEUDO = ":(?:first-child|last-child|" + NTH_CHILD + "|empty|root|" + CONTAINS + ")";
var TAG = "(:?" + IDENT + ")?";
var TOKENS = CLASS + "|" + ID + "|" + ATTR + "|" + PSEUDO + "|" + COMBINATOR;
var combinatorRegex = new RegExp("^" + COMBINATOR + "$");
/**
 * Parses a css selector into a normalized object.
 * Expects a selector for a single element only, no `>` or the like!
 */
function parseSelector(selector) {
  var sel = selector.trim();
  var tagRegex = new RegExp(TAG, 'y');
  var tag = tagRegex.exec(sel)[0];
  var regex = new RegExp(TOKENS, 'y');
  regex.lastIndex = tagRegex.lastIndex;
  var matches = [];
  var nextSelector = undefined;
  var lastCombinator = undefined;
  var index = -1;
  while (regex.lastIndex < sel.length) {
    var match = regex.exec(sel);
    if (!match && lastCombinator === undefined) {
      throw new Error('Parse error, invalid selector');
    } else if (match && combinatorRegex.test(match[0])) {
      var comb = combinatorRegex.exec(match[0])[0];
      lastCombinator = comb;
      index = regex.lastIndex;
    } else {
      if (lastCombinator !== undefined) {
        nextSelector = [getCombinator(lastCombinator), parseSelector(sel.substring(index))];
        break;
      }
      matches.push(match[0]);
    }
  }
  var classList = matches.filter(function (s) {
    return s.startsWith('.');
  }).map(function (s) {
    return s.substring(1);
  });
  var ids = matches.filter(function (s) {
    return s.startsWith('#');
  }).map(function (s) {
    return s.substring(1);
  });
  if (ids.length > 1) {
    throw new Error('Invalid selector, only one id is allowed');
  }
  var postprocessRegex = new RegExp("(" + IDENT + ")" + SPACE + "(" + OP + ")?" + SPACE + "(" + VALUE + ")?");
  var attrs = matches.filter(function (s) {
    return s.startsWith('[');
  }).map(function (s) {
    return postprocessRegex.exec(s).slice(1, 4);
  }).map(function (_a) {
    var attr = _a[0],
      op = _a[1],
      val = _a[2];
    return _b = {}, _b[attr] = [getOp(op), val ? parseAttrValue(val) : val], _b;
    var _b;
  }).reduce(function (acc, curr) {
    return __assign({}, acc, curr);
  }, {});
  var pseudos = matches.filter(function (s) {
    return s.startsWith(':');
  }).map(function (s) {
    return postProcessPseudos(s.substring(1));
  });
  return {
    id: ids[0] || '',
    tag: tag,
    classList: classList,
    attributes: attrs,
    nextSelector: nextSelector,
    pseudos: pseudos
  };
}
function parseAttrValue(v) {
  if (v.startsWith('"')) {
    return v.slice(1, -1);
  }
  if (v === "true") {
    return true;
  }
  if (v === "false") {
    return false;
  }
  var f = parseFloat(v);
  if (isNaN(f)) {
    return v;
  }
  return f;
}
function postProcessPseudos(sel) {
  if (sel === 'first-child' || sel === 'last-child' || sel === 'root' || sel === 'empty') {
    return [sel, undefined];
  }
  if (sel.startsWith('contains')) {
    var text = sel.slice(10, -2);
    return ['contains', text];
  }
  var content = sel.slice(10, -1);
  if (content === 'even') {
    content = '2n';
  }
  if (content === 'odd') {
    content = '2n+1';
  }
  return ['nth-child', content];
}
function getOp(op) {
  switch (op) {
    case '=':
      return 'exact';
    case '^=':
      return 'startsWith';
    case '$=':
      return 'endsWith';
    case '*=':
      return 'contains';
    case '~=':
      return 'whitespace';
    case '|=':
      return 'dash';
    default:
      return 'has';
  }
}
function getCombinator(comb) {
  switch (comb.trim()) {
    case '>':
      return 'child';
    case '+':
      return 'nextSibling';
    case '~':
      return 'sibling';
    default:
      return 'subtree';
  }
}
},{}],"node_modules/tree-selector/lib/es6/matches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMatches = createMatches;
var _selectorParser = require("./selectorParser");
function createMatches(opts) {
  return function matches(selector, node) {
    var _a = typeof selector === 'object' ? selector : (0, _selectorParser.parseSelector)(selector),
      tag = _a.tag,
      id = _a.id,
      classList = _a.classList,
      attributes = _a.attributes,
      nextSelector = _a.nextSelector,
      pseudos = _a.pseudos;
    if (nextSelector !== undefined) {
      throw new Error('matches can only process selectors that target a single element');
    }
    if (!node) {
      return false;
    }
    if (tag && tag.toLowerCase() !== opts.tag(node).toLowerCase()) {
      return false;
    }
    if (id && id !== opts.id(node)) {
      return false;
    }
    var classes = opts.className(node).split(' ');
    for (var i = 0; i < classList.length; i++) {
      if (classes.indexOf(classList[i]) === -1) {
        return false;
      }
    }
    for (var key in attributes) {
      var attr = opts.attr(node, key);
      var t = attributes[key][0];
      var v = attributes[key][1];
      if (attr === undefined) {
        return false;
      }
      if (t === 'has') {
        return true;
      }
      if (t === 'exact' && attr !== v) {
        return false;
      } else if (t !== 'exact') {
        if (typeof v !== 'string') {
          throw new Error('All non-string values have to be an exact match');
        }
        if (t === 'startsWith' && !attr.startsWith(v)) {
          return false;
        }
        if (t === 'endsWith' && !attr.endsWith(v)) {
          return false;
        }
        if (t === 'contains' && attr.indexOf(v) === -1) {
          return false;
        }
        if (t === 'whitespace' && attr.split(' ').indexOf(v) === -1) {
          return false;
        }
        if (t === 'dash' && attr.split('-').indexOf(v) === -1) {
          return false;
        }
      }
    }
    for (var i = 0; i < pseudos.length; i++) {
      var _b = pseudos[i],
        t = _b[0],
        data = _b[1];
      if (t === 'contains' && data !== opts.contents(node)) {
        return false;
      }
      if (t === 'empty' && (opts.contents(node) || opts.children(node).length !== 0)) {
        return false;
      }
      if (t === 'root' && opts.parent(node) !== undefined) {
        return false;
      }
      if (t.indexOf('child') !== -1) {
        if (!opts.parent(node)) {
          return false;
        }
        var siblings = opts.children(opts.parent(node));
        if (t === 'first-child' && siblings.indexOf(node) !== 0) {
          return false;
        }
        if (t === 'last-child' && siblings.indexOf(node) !== siblings.length - 1) {
          return false;
        }
        if (t === 'nth-child') {
          var regex = /([\+-]?)(\d*)(n?)(\+\d+)?/;
          var parseResult = regex.exec(data).slice(1);
          var index = siblings.indexOf(node);
          if (!parseResult[0]) {
            parseResult[0] = '+';
          }
          var factor = parseResult[1] ? parseInt(parseResult[0] + parseResult[1]) : undefined;
          var add = parseInt(parseResult[3] || '0');
          if (factor && parseResult[2] === 'n' && index % factor !== add) {
            return false;
          } else if (!factor && parseResult[2] && (parseResult[0] === '+' && index - add < 0 || parseResult[0] === '-' && index - add >= 0)) {
            return false;
          } else if (!parseResult[2] && factor && index !== factor - 1) {
            return false;
          }
        }
      }
    }
    return true;
  };
}
},{"./selectorParser":"node_modules/tree-selector/lib/es6/selectorParser.js"}],"node_modules/tree-selector/lib/es6/querySelector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQuerySelector = createQuerySelector;
var _selectorParser = require("./selectorParser");
var _matches2 = require("./matches");
function createQuerySelector(options, matches) {
  var _matches = matches || (0, _matches2.createMatches)(options);
  function findSubtree(selector, depth, node) {
    if (!node) {
      return [];
    }
    var n = _matches(selector, node);
    var matched = n ? typeof n === 'object' ? [n] : [node] : [];
    if (depth === 0) {
      return matched;
    }
    var childMatched = options.children(node).filter(function (c) {
      return typeof c !== 'string';
    }).map(function (c) {
      return findSubtree(selector, depth - 1, c);
    }).reduce(function (acc, curr) {
      return acc.concat(curr);
    }, []);
    return matched.concat(childMatched);
  }
  function findSibling(selector, next, node) {
    if (!node || options.parent(node) === undefined) {
      return [];
    }
    var results = [];
    var siblings = options.children(options.parent(node));
    for (var i = siblings.indexOf(node) + 1; i < siblings.length; i++) {
      if (typeof siblings[i] === 'string') {
        continue;
      }
      var n = _matches(selector, siblings[i]);
      if (n) {
        if (typeof n === 'object') {
          results.push(n);
        } else {
          results.push(siblings[i]);
        }
      }
      if (next) {
        break;
      }
    }
    return results;
  }
  return function querySelector(selector, node) {
    if (!node) {
      return [];
    }
    var sel = typeof selector === 'object' ? selector : (0, _selectorParser.parseSelector)(selector);
    var results = [node];
    var currentSelector = sel;
    var currentCombinator = 'subtree';
    var tail = undefined;
    var _loop_1 = function () {
      tail = currentSelector.nextSelector;
      currentSelector.nextSelector = undefined;
      if (currentCombinator === 'subtree' || currentCombinator === 'child') {
        var depth_1 = currentCombinator === 'subtree' ? Infinity : 1;
        results = results.map(function (n) {
          return findSubtree(currentSelector, depth_1, n);
        }).reduce(function (acc, curr) {
          return acc.concat(curr);
        }, []);
      } else {
        var next_1 = currentCombinator === 'nextSibling';
        results = results.map(function (n) {
          return findSibling(currentSelector, next_1, n);
        }).reduce(function (acc, curr) {
          return acc.concat(curr);
        }, []);
      }
      if (tail) {
        currentSelector = tail[1];
        currentCombinator = tail[0];
      }
    };
    do {
      _loop_1();
    } while (tail !== undefined);
    return results;
  };
}
},{"./selectorParser":"node_modules/tree-selector/lib/es6/selectorParser.js","./matches":"node_modules/tree-selector/lib/es6/matches.js"}],"node_modules/tree-selector/lib/es6/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createMatches: true,
  createQuerySelector: true
};
Object.defineProperty(exports, "createMatches", {
  enumerable: true,
  get: function () {
    return _matches.createMatches;
  }
});
Object.defineProperty(exports, "createQuerySelector", {
  enumerable: true,
  get: function () {
    return _querySelector.createQuerySelector;
  }
});
var _selectorParser = require("./selectorParser");
Object.keys(_selectorParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _selectorParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selectorParser[key];
    }
  });
});
var _matches = require("./matches");
var _querySelector = require("./querySelector");
},{"./selectorParser":"node_modules/tree-selector/lib/es6/selectorParser.js","./matches":"node_modules/tree-selector/lib/es6/matches.js","./querySelector":"node_modules/tree-selector/lib/es6/querySelector.js"}],"node_modules/snabbdom-selector/lib/es6/selectorParser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorParser = selectorParser;
function selectorParser(node) {
  if (!node.sel) {
    return {
      tagName: '',
      id: '',
      className: ''
    };
  }
  var sel = node.sel;
  var hashIdx = sel.indexOf('#');
  var dotIdx = sel.indexOf('.', hashIdx);
  var hash = hashIdx > 0 ? hashIdx : sel.length;
  var dot = dotIdx > 0 ? dotIdx : sel.length;
  var tagName = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
  var id = hash < dot ? sel.slice(hash + 1, dot) : void 0;
  var className = dotIdx > 0 ? sel.slice(dot + 1).replace(/\./g, ' ') : void 0;
  return {
    tagName: tagName,
    id: id,
    className: className
  };
}
},{}],"node_modules/snabbdom-selector/lib/es6/classNameFromVNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNameFromVNode = classNameFromVNode;
var _selectorParser = require("./selectorParser");
function classNameFromVNode(vNode) {
  var _a = (0, _selectorParser.selectorParser)(vNode).className,
    cn = _a === void 0 ? '' : _a;
  if (!vNode.data) {
    return cn;
  }
  var _b = vNode.data,
    dataClass = _b.class,
    props = _b.props;
  if (dataClass) {
    var c = Object.keys(dataClass).filter(function (cl) {
      return dataClass[cl];
    });
    cn += " " + c.join(" ");
  }
  if (props && props.className) {
    cn += " " + props.className;
  }
  return cn && cn.trim();
}
},{"./selectorParser":"node_modules/snabbdom-selector/lib/es6/selectorParser.js"}],"node_modules/snabbdom-selector/lib/es6/parent-symbol.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var root;
if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else {
  root = Function('return this')();
}
var Symbol = root.Symbol;
var parentSymbol;
if (typeof Symbol === 'function') {
  parentSymbol = Symbol('parent');
} else {
  parentSymbol = '@@snabbdom-selector-parent';
}
var _default = exports.default = parentSymbol;
},{}],"node_modules/snabbdom-selector/lib/es6/query.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.querySelector = void 0;
var _treeSelector = require("tree-selector");
var _selectorParser = require("./selectorParser");
var _classNameFromVNode = require("./classNameFromVNode");
var _parentSymbol = _interopRequireDefault(require("./parent-symbol"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var options = {
  tag: function (vNode) {
    return (0, _selectorParser.selectorParser)(vNode).tagName;
  },
  className: function (vNode) {
    return (0, _classNameFromVNode.classNameFromVNode)(vNode);
  },
  id: function (vNode) {
    return (0, _selectorParser.selectorParser)(vNode).id || '';
  },
  children: function (vNode) {
    return vNode.children || [];
  },
  parent: function (vNode) {
    return vNode.data[_parentSymbol.default] || vNode;
  },
  contents: function (vNode) {
    return vNode.text || '';
  },
  attr: function (vNode, attr) {
    if (vNode.data) {
      var _a = vNode.data,
        _b = _a.attrs,
        attrs = _b === void 0 ? {} : _b,
        _c = _a.props,
        props = _c === void 0 ? {} : _c,
        _d = _a.dataset,
        dataset = _d === void 0 ? {} : _d;
      if (attrs[attr]) {
        return attrs[attr];
      }
      if (props[attr]) {
        return props[attr];
      }
      if (attr.indexOf('data-') === 0 && dataset[attr.slice(5)]) {
        return dataset[attr.slice(5)];
      }
    }
  }
};
var matches = (0, _treeSelector.createMatches)(options);
function customMatches(sel, vnode) {
  var data = vnode.data;
  var selector = matches.bind(null, sel);
  if (data && data.fn) {
    var n = void 0;
    if (Array.isArray(data.args)) {
      n = data.fn.apply(null, data.args);
    } else if (data.args) {
      n = data.fn.call(null, data.args);
    } else {
      n = data.fn();
    }
    return selector(n) ? n : false;
  }
  return selector(vnode);
}
var querySelector = exports.querySelector = (0, _treeSelector.createQuerySelector)(options, customMatches);
},{"tree-selector":"node_modules/tree-selector/lib/es6/index.js","./selectorParser":"node_modules/snabbdom-selector/lib/es6/selectorParser.js","./classNameFromVNode":"node_modules/snabbdom-selector/lib/es6/classNameFromVNode.js","./parent-symbol":"node_modules/snabbdom-selector/lib/es6/parent-symbol.js"}],"node_modules/snabbdom-selector/lib/es6/findMatches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMatches = findMatches;
var _query = require("./query");
var _parentSymbol = _interopRequireDefault(require("./parent-symbol"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findMatches(cssSelector, vNode) {
  if (!vNode) {
    return [];
  }
  traverseVNode(vNode, addParent); // add mapping to the parent selectorParser
  return (0, _query.querySelector)(cssSelector, vNode);
}
function traverseVNode(vNode, f) {
  function recurse(currentNode, isParent, parentVNode) {
    var length = currentNode.children && currentNode.children.length || 0;
    for (var i = 0; i < length; ++i) {
      var children = currentNode.children;
      if (children && children[i] && typeof children[i] !== 'string') {
        var child = children[i];
        recurse(child, false, currentNode);
      }
    }
    f(currentNode, isParent, isParent ? void 0 : parentVNode);
  }
  recurse(vNode, true);
}
function addParent(vNode, isParent, parent) {
  if (isParent) {
    return void 0;
  }
  if (!vNode.data) {
    vNode.data = {};
  }
  if (!vNode.data[_parentSymbol.default]) {
    Object.defineProperty(vNode.data, _parentSymbol.default, {
      value: parent
    });
  }
}
},{"./query":"node_modules/snabbdom-selector/lib/es6/query.js","./parent-symbol":"node_modules/snabbdom-selector/lib/es6/parent-symbol.js"}],"node_modules/snabbdom-selector/lib/es6/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "classNameFromVNode", {
  enumerable: true,
  get: function () {
    return _classNameFromVNode.classNameFromVNode;
  }
});
exports.select = void 0;
Object.defineProperty(exports, "selectorParser", {
  enumerable: true,
  get: function () {
    return _selectorParser.selectorParser;
  }
});
var _curry = require("./curry2");
var _findMatches = require("./findMatches");
var _selectorParser = require("./selectorParser");
var _classNameFromVNode = require("./classNameFromVNode");
var select = exports.select = /*@__PURE__*/(0, _curry.curry2)(_findMatches.findMatches);
},{"./curry2":"node_modules/snabbdom-selector/lib/es6/curry2.js","./findMatches":"node_modules/snabbdom-selector/lib/es6/findMatches.js","./selectorParser":"node_modules/snabbdom-selector/lib/es6/selectorParser.js","./classNameFromVNode":"node_modules/snabbdom-selector/lib/es6/classNameFromVNode.js"}],"node_modules/@cycle/dom/lib/es6/VNodeWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VNodeWrapper = void 0;
var _snabbdom = require("snabbdom");
var _snabbdomSelector = require("snabbdom-selector");
var _utils = require("./utils");
var VNodeWrapper = exports.VNodeWrapper = /** @class */function () {
  function VNodeWrapper(rootElement) {
    this.rootElement = rootElement;
  }
  VNodeWrapper.prototype.call = function (vnode) {
    if ((0, _utils.isDocFrag)(this.rootElement)) {
      return this.wrapDocFrag(vnode === null ? [] : [vnode]);
    }
    if (vnode === null) {
      return this.wrap([]);
    }
    var _a = (0, _snabbdomSelector.selectorParser)(vnode),
      selTagName = _a.tagName,
      selId = _a.id;
    var vNodeClassName = (0, _snabbdomSelector.classNameFromVNode)(vnode);
    var vNodeData = vnode.data || {};
    var vNodeDataProps = vNodeData.props || {};
    var _b = vNodeDataProps.id,
      vNodeId = _b === void 0 ? selId : _b;
    var isVNodeAndRootElementIdentical = typeof vNodeId === 'string' && vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() && selTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() && vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
    if (isVNodeAndRootElementIdentical) {
      return vnode;
    }
    return this.wrap([vnode]);
  };
  VNodeWrapper.prototype.wrapDocFrag = function (children) {
    return (0, _snabbdom.vnode)('', {
      isolate: []
    }, children, undefined, this.rootElement);
  };
  VNodeWrapper.prototype.wrap = function (children) {
    var _a = this.rootElement,
      tagName = _a.tagName,
      id = _a.id,
      className = _a.className;
    var selId = id ? "#" + id : '';
    var selClass = className ? "." + className.split(" ").join(".") : '';
    var vnode = (0, _snabbdom.h)("" + tagName.toLowerCase() + selId + selClass, {}, children);
    vnode.data = vnode.data || {};
    vnode.data.isolate = vnode.data.isolate || [];
    return vnode;
  };
  return VNodeWrapper;
}();
},{"snabbdom":"node_modules/snabbdom/build/index.js","snabbdom-selector":"node_modules/snabbdom-selector/lib/es6/index.js","./utils":"node_modules/@cycle/dom/lib/es6/utils.js"}],"node_modules/@cycle/dom/lib/es6/modules.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "attributesModule", {
  enumerable: true,
  get: function () {
    return _snabbdom.attributesModule;
  }
});
Object.defineProperty(exports, "classModule", {
  enumerable: true,
  get: function () {
    return _snabbdom.classModule;
  }
});
Object.defineProperty(exports, "datasetModule", {
  enumerable: true,
  get: function () {
    return _snabbdom.datasetModule;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "propsModule", {
  enumerable: true,
  get: function () {
    return _snabbdom.propsModule;
  }
});
Object.defineProperty(exports, "styleModule", {
  enumerable: true,
  get: function () {
    return _snabbdom.styleModule;
  }
});
var _snabbdom = require("snabbdom");
var modules = [_snabbdom.styleModule, _snabbdom.classModule, _snabbdom.propsModule, _snabbdom.attributesModule, _snabbdom.datasetModule];
var _default = exports.default = modules;
},{"snabbdom":"node_modules/snabbdom/build/index.js"}],"node_modules/@cycle/dom/lib/es6/SymbolTree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var SymbolTree = /** @class */function () {
  function SymbolTree(mapper) {
    this.mapper = mapper;
    this.tree = [undefined, {}];
  }
  SymbolTree.prototype.set = function (path, element, max) {
    var curr = this.tree;
    var _max = max !== undefined ? max : path.length;
    for (var i = 0; i < _max; i++) {
      var n = this.mapper(path[i]);
      var child = curr[1][n];
      if (!child) {
        child = [undefined, {}];
        curr[1][n] = child;
      }
      curr = child;
    }
    curr[0] = element;
  };
  SymbolTree.prototype.getDefault = function (path, mkDefaultElement, max) {
    return this.get(path, mkDefaultElement, max);
  };
  /**
   * Returns the payload of the path
   * If a default element creator is given, it will insert it at the path
   */
  SymbolTree.prototype.get = function (path, mkDefaultElement, max) {
    var curr = this.tree;
    var _max = max !== undefined ? max : path.length;
    for (var i = 0; i < _max; i++) {
      var n = this.mapper(path[i]);
      var child = curr[1][n];
      if (!child) {
        if (mkDefaultElement) {
          child = [undefined, {}];
          curr[1][n] = child;
        } else {
          return undefined;
        }
      }
      curr = child;
    }
    if (mkDefaultElement && !curr[0]) {
      curr[0] = mkDefaultElement();
    }
    return curr[0];
  };
  SymbolTree.prototype.delete = function (path) {
    var curr = this.tree;
    for (var i = 0; i < path.length - 1; i++) {
      var child = curr[1][this.mapper(path[i])];
      if (!child) {
        return;
      }
      curr = child;
    }
    delete curr[1][this.mapper(path[path.length - 1])];
  };
  return SymbolTree;
}();
var _default = exports.default = SymbolTree;
},{}],"node_modules/@cycle/dom/lib/es6/IsolateModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsolateModule = void 0;
var _utils = require("./utils");
var _SymbolTree = _interopRequireDefault(require("./SymbolTree"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var IsolateModule = exports.IsolateModule = /** @class */function () {
  function IsolateModule() {
    this.namespaceTree = new _SymbolTree.default(function (x) {
      return x.scope;
    });
    this.namespaceByElement = new Map();
    this.vnodesBeingRemoved = [];
  }
  IsolateModule.prototype.setEventDelegator = function (del) {
    this.eventDelegator = del;
  };
  IsolateModule.prototype.insertElement = function (namespace, el) {
    this.namespaceByElement.set(el, namespace);
    this.namespaceTree.set(namespace, el);
  };
  IsolateModule.prototype.removeElement = function (elm) {
    this.namespaceByElement.delete(elm);
    var namespace = this.getNamespace(elm);
    if (namespace) {
      this.namespaceTree.delete(namespace);
    }
  };
  IsolateModule.prototype.getElement = function (namespace, max) {
    return this.namespaceTree.get(namespace, undefined, max);
  };
  IsolateModule.prototype.getRootElement = function (elm) {
    if (this.namespaceByElement.has(elm)) {
      return elm;
    }
    //TODO: Add quick-lru or similar as additional O(1) cache
    var curr = elm;
    while (!this.namespaceByElement.has(curr)) {
      curr = curr.parentNode;
      if (!curr) {
        return undefined;
      } else if (curr.tagName === 'HTML') {
        throw new Error('No root element found, this should not happen at all');
      }
    }
    return curr;
  };
  IsolateModule.prototype.getNamespace = function (elm) {
    var rootElement = this.getRootElement(elm);
    if (!rootElement) {
      return undefined;
    }
    return this.namespaceByElement.get(rootElement);
  };
  IsolateModule.prototype.createModule = function () {
    var self = this;
    return {
      create: function (emptyVNode, vNode) {
        var elm = vNode.elm,
          _a = vNode.data,
          data = _a === void 0 ? {} : _a;
        var namespace = data.isolate;
        if (Array.isArray(namespace)) {
          self.insertElement(namespace, elm);
        }
      },
      update: function (oldVNode, vNode) {
        var oldElm = oldVNode.elm,
          _a = oldVNode.data,
          oldData = _a === void 0 ? {} : _a;
        var elm = vNode.elm,
          _b = vNode.data,
          data = _b === void 0 ? {} : _b;
        var oldNamespace = oldData.isolate;
        var namespace = data.isolate;
        if (!(0, _utils.isEqualNamespace)(oldNamespace, namespace)) {
          if (Array.isArray(oldNamespace)) {
            self.removeElement(oldElm);
          }
        }
        if (Array.isArray(namespace)) {
          self.insertElement(namespace, elm);
        }
      },
      destroy: function (vNode) {
        self.vnodesBeingRemoved.push(vNode);
      },
      remove: function (vNode, cb) {
        self.vnodesBeingRemoved.push(vNode);
        cb();
      },
      post: function () {
        var vnodesBeingRemoved = self.vnodesBeingRemoved;
        for (var i = vnodesBeingRemoved.length - 1; i >= 0; i--) {
          var vnode = vnodesBeingRemoved[i];
          var namespace = vnode.data !== undefined ? vnode.data.isolation : undefined;
          if (namespace !== undefined) {
            self.removeElement(namespace);
          }
          self.eventDelegator.removeElement(vnode.elm, namespace);
        }
        self.vnodesBeingRemoved = [];
      }
    };
  };
  return IsolateModule;
}();
},{"./utils":"node_modules/@cycle/dom/lib/es6/utils.js","./SymbolTree":"node_modules/@cycle/dom/lib/es6/SymbolTree.js"}],"node_modules/@cycle/dom/lib/es6/PriorityQueue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var PriorityQueue = /** @class */function () {
  function PriorityQueue() {
    this.arr = [];
    this.prios = [];
  }
  PriorityQueue.prototype.add = function (t, prio) {
    for (var i = 0; i < this.arr.length; i++) {
      if (this.prios[i] < prio) {
        this.arr.splice(i, 0, t);
        this.prios.splice(i, 0, prio);
        return;
      }
    }
    this.arr.push(t);
    this.prios.push(prio);
  };
  PriorityQueue.prototype.forEach = function (f) {
    for (var i = 0; i < this.arr.length; i++) {
      f(this.arr[i], i, this.arr);
    }
  };
  PriorityQueue.prototype.delete = function (t) {
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i] === t) {
        this.arr.splice(i, 1);
        this.prios.splice(i, 1);
        return;
      }
    }
  };
  return PriorityQueue;
}();
var _default = exports.default = PriorityQueue;
},{}],"node_modules/@cycle/dom/lib/es6/EventDelegator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventTypesThatDontBubble = exports.EventDelegator = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
var _ScopeChecker = require("./ScopeChecker");
var _utils = require("./utils");
var _ElementFinder = require("./ElementFinder");
var _SymbolTree = _interopRequireDefault(require("./SymbolTree"));
var _PriorityQueue = _interopRequireDefault(require("./PriorityQueue"));
var _fromEvent = require("./fromEvent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var eventTypesThatDontBubble = exports.eventTypesThatDontBubble = ["blur", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "focus", "load", "loadeddata", "loadedmetadata", "mouseenter", "mouseleave", "pause", "play", "playing", "ratechange", "reset", "scroll", "seeked", "seeking", "stalled", "submit", "suspend", "timeupdate", "unload", "volumechange", "waiting"];
/**
 * Manages "Event delegation", by connecting an origin with multiple
 * destinations.
 *
 * Attaches a DOM event listener to the DOM element called the "origin",
 * and delegates events to "destinations", which are subjects as outputs
 * for the DOMSource. Simulates bubbling or capturing, with regards to
 * isolation boundaries too.
 */
var EventDelegator = exports.EventDelegator = /** @class */function () {
  function EventDelegator(rootElement$, isolateModule) {
    var _this = this;
    this.rootElement$ = rootElement$;
    this.isolateModule = isolateModule;
    this.virtualListeners = new _SymbolTree.default(function (x) {
      return x.scope;
    });
    this.nonBubblingListenersToAdd = new Set();
    this.virtualNonBubblingListener = [];
    this.isolateModule.setEventDelegator(this);
    this.domListeners = new Map();
    this.domListenersToAdd = new Map();
    this.nonBubblingListeners = new Map();
    rootElement$.addListener({
      next: function (el) {
        if (_this.origin !== el) {
          _this.origin = el;
          _this.resetEventListeners();
          _this.domListenersToAdd.forEach(function (passive, type) {
            return _this.setupDOMListener(type, passive);
          });
          _this.domListenersToAdd.clear();
        }
        _this.nonBubblingListenersToAdd.forEach(function (arr) {
          _this.setupNonBubblingListener(arr);
        });
      }
    });
  }
  EventDelegator.prototype.addEventListener = function (eventType, namespace, options, bubbles) {
    var subject = _xstream.default.never();
    var dest;
    var scopeChecker = new _ScopeChecker.ScopeChecker(namespace, this.isolateModule);
    var shouldBubble = bubbles === undefined ? eventTypesThatDontBubble.indexOf(eventType) === -1 : bubbles;
    if (shouldBubble) {
      if (!this.domListeners.has(eventType)) {
        this.setupDOMListener(eventType, !!options.passive);
      }
      dest = this.insertListener(subject, scopeChecker, eventType, options);
      return subject;
    } else {
      var setArray_1 = [];
      this.nonBubblingListenersToAdd.forEach(function (v) {
        return setArray_1.push(v);
      });
      var found = undefined,
        index = 0;
      var length_1 = setArray_1.length;
      var tester = function (x) {
        var _sub = x[0],
          et = x[1],
          ef = x[2],
          _ = x[3];
        return eventType === et && (0, _utils.isEqualNamespace)(ef.namespace, namespace);
      };
      while (!found && index < length_1) {
        var item = setArray_1[index];
        found = tester(item) ? item : found;
        index++;
      }
      var input_1 = found;
      var nonBubbleSubject_1;
      if (!input_1) {
        var finder = new _ElementFinder.ElementFinder(namespace, this.isolateModule);
        dest = this.insertListener(subject, scopeChecker, eventType, options);
        input_1 = [subject, eventType, finder, dest];
        nonBubbleSubject_1 = subject;
        this.nonBubblingListenersToAdd.add(input_1);
        this.setupNonBubblingListener(input_1);
      } else {
        var sub = input_1[0];
        nonBubbleSubject_1 = sub;
      }
      var self_1 = this;
      var subscription_1 = null;
      return _xstream.default.create({
        start: function (listener) {
          subscription_1 = nonBubbleSubject_1.subscribe(listener);
        },
        stop: function () {
          var _s = input_1[0],
            et = input_1[1],
            ef = input_1[2],
            _d = input_1[3];
          var elements = ef.call();
          elements.forEach(function (element) {
            var subs = element.subs;
            if (subs && subs[et]) {
              subs[et].unsubscribe();
              delete subs[et];
            }
          });
          self_1.nonBubblingListenersToAdd.delete(input_1);
          subscription_1.unsubscribe();
        }
      });
    }
  };
  EventDelegator.prototype.removeElement = function (element, namespace) {
    if (namespace !== undefined) {
      this.virtualListeners.delete(namespace);
    }
    var toRemove = [];
    this.nonBubblingListeners.forEach(function (map, type) {
      if (map.has(element)) {
        toRemove.push([type, element]);
        var subs_1 = element.subs;
        if (subs_1) {
          Object.keys(subs_1).forEach(function (key) {
            subs_1[key].unsubscribe();
          });
        }
      }
    });
    for (var i = 0; i < toRemove.length; i++) {
      var map = this.nonBubblingListeners.get(toRemove[i][0]);
      if (!map) {
        continue;
      }
      map.delete(toRemove[i][1]);
      if (map.size === 0) {
        this.nonBubblingListeners.delete(toRemove[i][0]);
      } else {
        this.nonBubblingListeners.set(toRemove[i][0], map);
      }
    }
  };
  EventDelegator.prototype.insertListener = function (subject, scopeChecker, eventType, options) {
    var relevantSets = [];
    var n = scopeChecker._namespace;
    var max = n.length;
    do {
      relevantSets.push(this.getVirtualListeners(eventType, n, true, max));
      max--;
    } while (max >= 0 && n[max].type !== 'total');
    var destination = __assign({}, options, {
      scopeChecker: scopeChecker,
      subject: subject,
      bubbles: !!options.bubbles,
      useCapture: !!options.useCapture,
      passive: !!options.passive
    });
    for (var i = 0; i < relevantSets.length; i++) {
      relevantSets[i].add(destination, n.length);
    }
    return destination;
  };
  /**
   * Returns a set of all virtual listeners in the scope of the namespace
   * Set `exact` to true to treat sibiling isolated scopes as total scopes
   */
  EventDelegator.prototype.getVirtualListeners = function (eventType, namespace, exact, max) {
    if (exact === void 0) {
      exact = false;
    }
    var _max = max !== undefined ? max : namespace.length;
    if (!exact) {
      for (var i = _max - 1; i >= 0; i--) {
        if (namespace[i].type === 'total') {
          _max = i + 1;
          break;
        }
        _max = i;
      }
    }
    var map = this.virtualListeners.getDefault(namespace, function () {
      return new Map();
    }, _max);
    if (!map.has(eventType)) {
      map.set(eventType, new _PriorityQueue.default());
    }
    return map.get(eventType);
  };
  EventDelegator.prototype.setupDOMListener = function (eventType, passive) {
    var _this = this;
    if (this.origin) {
      var sub = (0, _fromEvent.fromEvent)(this.origin, eventType, false, false, passive).subscribe({
        next: function (event) {
          return _this.onEvent(eventType, event, passive);
        },
        error: function () {},
        complete: function () {}
      });
      this.domListeners.set(eventType, {
        sub: sub,
        passive: passive
      });
    } else {
      this.domListenersToAdd.set(eventType, passive);
    }
  };
  EventDelegator.prototype.setupNonBubblingListener = function (input) {
    var _ = input[0],
      eventType = input[1],
      elementFinder = input[2],
      destination = input[3];
    if (!this.origin) {
      return;
    }
    var elements = elementFinder.call();
    if (elements.length) {
      var self_2 = this;
      elements.forEach(function (element) {
        var _a;
        var subs = element.subs;
        if (!subs || !subs[eventType]) {
          var sub = (0, _fromEvent.fromEvent)(element, eventType, false, false, destination.passive).subscribe({
            next: function (ev) {
              return self_2.onEvent(eventType, ev, !!destination.passive, false);
            },
            error: function () {},
            complete: function () {}
          });
          if (!self_2.nonBubblingListeners.has(eventType)) {
            self_2.nonBubblingListeners.set(eventType, new Map());
          }
          var map = self_2.nonBubblingListeners.get(eventType);
          if (!map) {
            return;
          }
          map.set(element, {
            sub: sub,
            destination: destination
          });
          element.subs = __assign({}, subs, (_a = {}, _a[eventType] = sub, _a));
        }
      });
    }
  };
  EventDelegator.prototype.resetEventListeners = function () {
    var iter = this.domListeners.entries();
    var curr = iter.next();
    while (!curr.done) {
      var _a = curr.value,
        type = _a[0],
        _b = _a[1],
        sub = _b.sub,
        passive = _b.passive;
      sub.unsubscribe();
      this.setupDOMListener(type, passive);
      curr = iter.next();
    }
  };
  EventDelegator.prototype.putNonBubblingListener = function (eventType, elm, useCapture, passive) {
    var map = this.nonBubblingListeners.get(eventType);
    if (!map) {
      return;
    }
    var listener = map.get(elm);
    if (listener && listener.destination.passive === passive && listener.destination.useCapture === useCapture) {
      this.virtualNonBubblingListener[0] = listener.destination;
    }
  };
  EventDelegator.prototype.onEvent = function (eventType, event, passive, bubbles) {
    if (bubbles === void 0) {
      bubbles = true;
    }
    var cycleEvent = this.patchEvent(event);
    var rootElement = this.isolateModule.getRootElement(event.target);
    if (bubbles) {
      var namespace = this.isolateModule.getNamespace(event.target);
      if (!namespace) {
        return;
      }
      var listeners = this.getVirtualListeners(eventType, namespace);
      this.bubble(eventType, event.target, rootElement, cycleEvent, listeners, namespace, namespace.length - 1, true, passive);
      this.bubble(eventType, event.target, rootElement, cycleEvent, listeners, namespace, namespace.length - 1, false, passive);
    } else {
      this.putNonBubblingListener(eventType, event.target, true, passive);
      this.doBubbleStep(eventType, event.target, rootElement, cycleEvent, this.virtualNonBubblingListener, true, passive);
      this.putNonBubblingListener(eventType, event.target, false, passive);
      this.doBubbleStep(eventType, event.target, rootElement, cycleEvent, this.virtualNonBubblingListener, false, passive);
      event.stopPropagation(); //fix reset event (spec'ed as non-bubbling, but bubbles in reality
    }
  };
  EventDelegator.prototype.bubble = function (eventType, elm, rootElement, event, listeners, namespace, index, useCapture, passive) {
    if (!useCapture && !event.propagationHasBeenStopped) {
      this.doBubbleStep(eventType, elm, rootElement, event, listeners, useCapture, passive);
    }
    var newRoot = rootElement;
    var newIndex = index;
    if (elm === rootElement) {
      if (index >= 0 && namespace[index].type === 'sibling') {
        newRoot = this.isolateModule.getElement(namespace, index);
        newIndex--;
      } else {
        return;
      }
    }
    if (elm.parentNode && newRoot) {
      this.bubble(eventType, elm.parentNode, newRoot, event, listeners, namespace, newIndex, useCapture, passive);
    }
    if (useCapture && !event.propagationHasBeenStopped) {
      this.doBubbleStep(eventType, elm, rootElement, event, listeners, useCapture, passive);
    }
  };
  EventDelegator.prototype.doBubbleStep = function (eventType, elm, rootElement, event, listeners, useCapture, passive) {
    if (!rootElement) {
      return;
    }
    this.mutateEventCurrentTarget(event, elm);
    listeners.forEach(function (dest) {
      if (dest.passive === passive && dest.useCapture === useCapture) {
        var sel = (0, _utils.getSelectors)(dest.scopeChecker.namespace);
        if (!event.propagationHasBeenStopped && dest.scopeChecker.isDirectlyInScope(elm) && (sel !== '' && elm.matches(sel) || sel === '' && elm === rootElement)) {
          (0, _fromEvent.preventDefaultConditional)(event, dest.preventDefault);
          dest.subject.shamefullySendNext(event);
        }
      }
    });
  };
  EventDelegator.prototype.patchEvent = function (event) {
    var pEvent = event;
    pEvent.propagationHasBeenStopped = false;
    var oldStopPropagation = pEvent.stopPropagation;
    pEvent.stopPropagation = function stopPropagation() {
      oldStopPropagation.call(this);
      this.propagationHasBeenStopped = true;
    };
    return pEvent;
  };
  EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
    try {
      Object.defineProperty(event, "currentTarget", {
        value: currentTargetElement,
        configurable: true
      });
    } catch (err) {
      console.log("please use event.ownerTarget");
    }
    event.ownerTarget = currentTargetElement;
  };
  return EventDelegator;
}();
},{"xstream":"node_modules/xstream/index.js","./ScopeChecker":"node_modules/@cycle/dom/lib/es6/ScopeChecker.js","./utils":"node_modules/@cycle/dom/lib/es6/utils.js","./ElementFinder":"node_modules/@cycle/dom/lib/es6/ElementFinder.js","./SymbolTree":"node_modules/@cycle/dom/lib/es6/SymbolTree.js","./PriorityQueue":"node_modules/@cycle/dom/lib/es6/PriorityQueue.js","./fromEvent":"node_modules/@cycle/dom/lib/es6/fromEvent.js"}],"node_modules/@cycle/dom/lib/es6/makeDOMDriver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDOMDriver = makeDOMDriver;
var _snabbdom = require("snabbdom");
var _xstream = _interopRequireDefault(require("xstream"));
var _concat = _interopRequireDefault(require("xstream/extra/concat"));
var _sampleCombine = _interopRequireDefault(require("xstream/extra/sampleCombine"));
var _MainDOMSource = require("./MainDOMSource");
var _VNodeWrapper = require("./VNodeWrapper");
var _utils = require("./utils");
var _modules = _interopRequireDefault(require("./modules"));
var _IsolateModule = require("./IsolateModule");
var _EventDelegator = require("./EventDelegator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function makeDOMDriverInputGuard(modules) {
  if (!Array.isArray(modules)) {
    throw new Error("Optional modules option must be an array for snabbdom modules");
  }
}
function domDriverInputGuard(view$) {
  if (!view$ || typeof view$.addListener !== "function" || typeof view$.fold !== "function") {
    throw new Error("The DOM driver function expects as input a Stream of " + "virtual DOM elements");
  }
}
function dropCompletion(input) {
  return _xstream.default.merge(input, _xstream.default.never());
}
function unwrapElementFromVNode(vnode) {
  return vnode.elm;
}
function defaultReportSnabbdomError(err) {
  (console.error || console.log)(err);
}
function makeDOMReady$() {
  return _xstream.default.create({
    start: function (lis) {
      if (document.readyState === 'loading') {
        document.addEventListener('readystatechange', function () {
          var state = document.readyState;
          if (state === 'interactive' || state === 'complete') {
            lis.next(null);
            lis.complete();
          }
        });
      } else {
        lis.next(null);
        lis.complete();
      }
    },
    stop: function () {}
  });
}
function addRootScope(vnode) {
  vnode.data = vnode.data || {};
  vnode.data.isolate = [];
  return vnode;
}
function makeDOMDriver(container, options) {
  if (options === void 0) {
    options = {};
  }
  (0, _utils.checkValidContainer)(container);
  var modules = options.modules || _modules.default;
  makeDOMDriverInputGuard(modules);
  var isolateModule = new _IsolateModule.IsolateModule();
  var snabbdomOptions = options && options.snabbdomOptions || undefined;
  var patch = (0, _snabbdom.init)([isolateModule.createModule()].concat(modules), undefined, snabbdomOptions);
  var domReady$ = makeDOMReady$();
  var vnodeWrapper;
  var mutationObserver;
  var mutationConfirmed$ = _xstream.default.create({
    start: function (listener) {
      mutationObserver = new MutationObserver(function () {
        return listener.next(null);
      });
    },
    stop: function () {
      mutationObserver.disconnect();
    }
  });
  function DOMDriver(vnode$, name) {
    if (name === void 0) {
      name = 'DOM';
    }
    domDriverInputGuard(vnode$);
    var sanitation$ = _xstream.default.create();
    var firstRoot$ = domReady$.map(function () {
      var firstRoot = (0, _utils.getValidNode)(container) || document.body;
      vnodeWrapper = new _VNodeWrapper.VNodeWrapper(firstRoot);
      return firstRoot;
    });
    // We need to subscribe to the sink (i.e. vnode$) synchronously inside this
    // driver, and not later in the map().flatten() because this sink is in
    // reality a SinkProxy from @cycle/run, and we don't want to miss the first
    // emission when the main() is connected to the drivers.
    // Read more in issue #739.
    var rememberedVNode$ = vnode$.remember();
    rememberedVNode$.addListener({});
    // The mutation observer internal to mutationConfirmed$ should
    // exist before elementAfterPatch$ calls mutationObserver.observe()
    mutationConfirmed$.addListener({});
    var elementAfterPatch$ = firstRoot$.map(function (firstRoot) {
      return _xstream.default.merge(rememberedVNode$.endWhen(sanitation$), sanitation$).map(function (vnode) {
        return vnodeWrapper.call(vnode);
      }).startWith(addRootScope((0, _snabbdom.toVNode)(firstRoot))).fold(patch, (0, _snabbdom.toVNode)(firstRoot)).drop(1).map(unwrapElementFromVNode).startWith(firstRoot).map(function (el) {
        mutationObserver.observe(el, {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true,
          attributeOldValue: true,
          characterDataOldValue: true
        });
        return el;
      }).compose(dropCompletion);
    } // don't complete this stream
    ).flatten();
    var rootElement$ = (0, _concat.default)(domReady$, mutationConfirmed$).endWhen(sanitation$).compose((0, _sampleCombine.default)(elementAfterPatch$)).map(function (arr) {
      return arr[1];
    }).remember();
    // Start the snabbdom patching, over time
    rootElement$.addListener({
      error: options.reportSnabbdomError || defaultReportSnabbdomError
    });
    var delegator = new _EventDelegator.EventDelegator(rootElement$, isolateModule);
    return new _MainDOMSource.MainDOMSource(rootElement$, sanitation$, [], isolateModule, delegator, name);
  }
  return DOMDriver;
}
},{"snabbdom":"node_modules/snabbdom/build/index.js","xstream":"node_modules/xstream/index.js","xstream/extra/concat":"node_modules/xstream/extra/concat.js","xstream/extra/sampleCombine":"node_modules/xstream/extra/sampleCombine.js","./MainDOMSource":"node_modules/@cycle/dom/lib/es6/MainDOMSource.js","./VNodeWrapper":"node_modules/@cycle/dom/lib/es6/VNodeWrapper.js","./utils":"node_modules/@cycle/dom/lib/es6/utils.js","./modules":"node_modules/@cycle/dom/lib/es6/modules.js","./IsolateModule":"node_modules/@cycle/dom/lib/es6/IsolateModule.js","./EventDelegator":"node_modules/@cycle/dom/lib/es6/EventDelegator.js"}],"node_modules/@cycle/dom/lib/es6/mockDOMSource.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockedDOMSource = void 0;
exports.mockDOMSource = mockDOMSource;
var _xstream = _interopRequireDefault(require("xstream"));
var _adapt = require("@cycle/run/lib/adapt");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var SCOPE_PREFIX = '___';
var MockedDOMSource = exports.MockedDOMSource = /** @class */function () {
  function MockedDOMSource(_mockConfig) {
    this._mockConfig = _mockConfig;
    if (_mockConfig.elements) {
      this._elements = _mockConfig.elements;
    } else {
      this._elements = (0, _adapt.adapt)(_xstream.default.empty());
    }
  }
  MockedDOMSource.prototype.elements = function () {
    var out = this._elements;
    out._isCycleSource = 'MockedDOM';
    return out;
  };
  MockedDOMSource.prototype.element = function () {
    var output$ = this.elements().filter(function (arr) {
      return arr.length > 0;
    }).map(function (arr) {
      return arr[0];
    }).remember();
    var out = (0, _adapt.adapt)(output$);
    out._isCycleSource = 'MockedDOM';
    return out;
  };
  MockedDOMSource.prototype.events = function (eventType, options, bubbles) {
    var streamForEventType = this._mockConfig[eventType];
    var out = (0, _adapt.adapt)(streamForEventType || _xstream.default.empty());
    out._isCycleSource = 'MockedDOM';
    return out;
  };
  MockedDOMSource.prototype.select = function (selector) {
    var mockConfigForSelector = this._mockConfig[selector] || {};
    return new MockedDOMSource(mockConfigForSelector);
  };
  MockedDOMSource.prototype.isolateSource = function (source, scope) {
    return source.select('.' + SCOPE_PREFIX + scope);
  };
  MockedDOMSource.prototype.isolateSink = function (sink, scope) {
    return (0, _adapt.adapt)(_xstream.default.fromObservable(sink).map(function (vnode) {
      if (vnode.sel && vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
        return vnode;
      } else {
        vnode.sel += "." + SCOPE_PREFIX + scope;
        return vnode;
      }
    }));
  };
  return MockedDOMSource;
}();
function mockDOMSource(mockConfig) {
  return new MockedDOMSource(mockConfig);
}
},{"xstream":"node_modules/xstream/index.js","@cycle/run/lib/adapt":"node_modules/@cycle/run/lib/adapt.js"}],"node_modules/@cycle/dom/lib/es6/hyperscript-helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _snabbdom = require("snabbdom");
// tslint:disable:max-file-line-count

function isValidString(param) {
  return typeof param === 'string' && param.length > 0;
}
function isSelector(param) {
  return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
function createTagFunction(tagName) {
  return function hyperscript(a, b, c) {
    var hasA = typeof a !== 'undefined';
    var hasB = typeof b !== 'undefined';
    var hasC = typeof c !== 'undefined';
    if (isSelector(a)) {
      if (hasB && hasC) {
        return (0, _snabbdom.h)(tagName + a, b, c);
      } else if (hasB) {
        return (0, _snabbdom.h)(tagName + a, b);
      } else {
        return (0, _snabbdom.h)(tagName + a, {});
      }
    } else if (hasC) {
      return (0, _snabbdom.h)(tagName + a, b, c);
    } else if (hasB) {
      return (0, _snabbdom.h)(tagName, a, b);
    } else if (hasA) {
      return (0, _snabbdom.h)(tagName, a);
    } else {
      return (0, _snabbdom.h)(tagName, {});
    }
  };
}
var SVG_TAG_NAMES = ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace', 'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];
var svg = createTagFunction('svg');
SVG_TAG_NAMES.forEach(function (tag) {
  svg[tag] = createTagFunction(tag);
});
var TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'video'];
var exported = {
  SVG_TAG_NAMES: SVG_TAG_NAMES,
  TAG_NAMES: TAG_NAMES,
  svg: svg,
  isSelector: isSelector,
  createTagFunction: createTagFunction
};
TAG_NAMES.forEach(function (n) {
  exported[n] = createTagFunction(n);
});
var _default = exports.default = exported;
},{"snabbdom":"node_modules/snabbdom/build/index.js"}],"node_modules/@cycle/dom/lib/es6/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MainDOMSource", {
  enumerable: true,
  get: function () {
    return _MainDOMSource.MainDOMSource;
  }
});
Object.defineProperty(exports, "MockedDOMSource", {
  enumerable: true,
  get: function () {
    return _mockDOMSource.MockedDOMSource;
  }
});
exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dfn = exports.del = exports.dd = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = void 0;
Object.defineProperty(exports, "h", {
  enumerable: true,
  get: function () {
    return _snabbdom.h;
  }
});
exports.main = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = void 0;
Object.defineProperty(exports, "makeDOMDriver", {
  enumerable: true,
  get: function () {
    return _makeDOMDriver.makeDOMDriver;
  }
});
exports.meta = exports.menu = exports.mark = exports.map = void 0;
Object.defineProperty(exports, "mockDOMSource", {
  enumerable: true,
  get: function () {
    return _mockDOMSource.mockDOMSource;
  }
});
exports.th = exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.svg = exports.sup = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.progress = exports.pre = exports.param = exports.p = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = void 0;
exports.thead = void 0;
Object.defineProperty(exports, "thunk", {
  enumerable: true,
  get: function () {
    return _thunk.thunk;
  }
});
exports.video = exports.ul = exports.u = exports.tr = exports.title = void 0;
var _thunk = require("./thunk");
var _MainDOMSource = require("./MainDOMSource");
var _makeDOMDriver = require("./makeDOMDriver");
var _mockDOMSource = require("./mockDOMSource");
var _snabbdom = require("snabbdom");
var _hyperscriptHelpers = _interopRequireDefault(require("./hyperscript-helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * A factory for the DOM driver function.
 *
 * Takes a `container` to define the target on the existing DOM which this
 * driver will operate on, and an `options` object as the second argument. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * **`DOMSource.select(selector)`** returns a new DOMSource with scope
 * restricted to the element(s) that matches the CSS `selector` given. To select
 * the page's `document`, use `.select('document')`. To select the container
 * element for this app, use `.select(':root')`.
 *
 * **`DOMSource.events(eventType, options)`** returns a stream of events of
 * `eventType` happening on the elements that match the current DOMSource. The
 * event object contains the `ownerTarget` property that behaves exactly like
 * `currentTarget`. The reason for this is that some browsers doesn't allow
 * `currentTarget` property to be mutated, hence a new property is created. The
 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
 * your app with this driver, or it is an RxJS Observable if you use
 * `@cycle/rxjs-run`, and so forth.
 *
 * **options for DOMSource.events**
 *
 * The `options` parameter on `DOMSource.events(eventType, options)` is an
 * (optional) object with two optional fields: `useCapture` and
 * `preventDefault`.
 *
 * `useCapture` is by default `false`, except it is `true` for event types that
 * do not bubble. Read more here
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * about the `useCapture` and its purpose.
 *
 * `preventDefault` is by default `false`, and indicates to the driver whether
 * `event.preventDefault()` should be invoked. This option can be configured in
 * three ways:
 *
 * - `{preventDefault: boolean}` to invoke preventDefault if `true`, and not
 * invoke otherwise.
 * - `{preventDefault: (ev: Event) => boolean}` for conditional invocation.
 * - `{preventDefault: NestedObject}` uses an object to be recursively compared
 * to the `Event` object. `preventDefault` is invoked when all properties on the
 * nested object match with the properties on the event object.
 *
 * Here are some examples:
 * ```typescript
 * // always prevent default
 * DOMSource.select('input').events('keydown', {
 *   preventDefault: true
 * })
 *
 * // prevent default only when `ENTER` is pressed
 * DOMSource.select('input').events('keydown', {
 *   preventDefault: e => e.keyCode === 13
 * })
 *
 * // prevent defualt when `ENTER` is pressed AND target.value is 'HELLO'
 * DOMSource.select('input').events('keydown', {
 *   preventDefault: { keyCode: 13, ownerTarget: { value: 'HELLO' } }
 * });
 * ```
 *
 * **`DOMSource.elements()`** returns a stream of arrays containing the DOM
 * elements that match the selectors in the DOMSource (e.g. from previous
 * `select(x)` calls).
 *
 * **`DOMSource.element()`** returns a stream of DOM elements. Notice that this
 * is the singular version of `.elements()`, so the stream will emit an element,
 * not an array. If there is no element that matches the selected DOMSource,
 * then the returned stream will not emit anything.
 *
 * @param {(String|HTMLElement)} container the DOM selector for the element
 * (or the element itself) to contain the rendering of the VTrees.
 * @param {DOMDriverOptions} options an object with two optional properties:
 *
 *   - `modules: array` overrides `@cycle/dom`'s default Snabbdom modules as
 *     as defined in [`src/modules.ts`](./src/modules.ts).
 *   - `reportSnabbdomError: (err: any) => void` overrides the default error reporter function.
 * @return {Function} the DOM driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeDOMDriver
 */

/**
 * A factory function to create mocked DOMSource objects, for testing purposes.
 *
 * Takes a `mockConfig` object as argument, and returns
 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
 * the sources, for testing.
 *
 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
 * their streams. Example:
 *
 * ```js
 * const domSource = mockDOMSource({
 *   '.foo': {
 *     'click': xs.of({target: {}}),
 *     'mouseover': xs.of({target: {}}),
 *   },
 *   '.bar': {
 *     'scroll': xs.of({target: {}}),
 *     elements: xs.of({tagName: 'div'}),
 *   }
 * });
 *
 * // Usage
 * const click$ = domSource.select('.foo').events('click');
 * const element$ = domSource.select('.bar').elements();
 * ```
 *
 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
 * and `isolateSource` attached to it, and performs simple isolation using
 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
 * perform a conventional `mockedDOMSource.select('.__foo')` call.
 *
 * @param {Object} mockConfig an object where keys are selector strings
 * and values are objects. Those nested objects have `eventType` strings as keys
 * and values are streams you created.
 * @return {Object} fake DOM source object, with an API containing `select()`
 * and `events()` and `elements()` which can be used just like the DOM Driver's
 * DOMSource.
 *
 * @function mockDOMSource
 */

/**
 * The hyperscript function `h()` is a function to create virtual DOM objects,
 * also known as VNodes. Call
 *
 * ```js
 * h('div.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * to create a VNode that represents a `DIV` element with className `myClass`,
 * styled with red color, and no children because the `[]` array was passed. The
 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
 *
 * However, usually you should use "hyperscript helpers", which are shortcut
 * functions based on hyperscript. There is one hyperscript helper function for
 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
 * `input()`. For instance, the previous example could have been written
 * as:
 *
 * ```js
 * div('.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * There are also SVG helper functions, which apply the appropriate SVG
 * namespace to the resulting elements. `svg()` function creates the top-most
 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
 * SVG-specific child elements. Example:
 *
 * ```js
 * svg({attrs: {width: 150, height: 150}}, [
 *   svg.polygon({
 *     attrs: {
 *       class: 'triangle',
 *       points: '20 0 20 150 150 20'
 *     }
 *   })
 * ])
 * ```
 *
 * @function h
 */

var svg = exports.svg = _hyperscriptHelpers.default.svg;
var a = exports.a = _hyperscriptHelpers.default.a;
var abbr = exports.abbr = _hyperscriptHelpers.default.abbr;
var address = exports.address = _hyperscriptHelpers.default.address;
var area = exports.area = _hyperscriptHelpers.default.area;
var article = exports.article = _hyperscriptHelpers.default.article;
var aside = exports.aside = _hyperscriptHelpers.default.aside;
var audio = exports.audio = _hyperscriptHelpers.default.audio;
var b = exports.b = _hyperscriptHelpers.default.b;
var base = exports.base = _hyperscriptHelpers.default.base;
var bdi = exports.bdi = _hyperscriptHelpers.default.bdi;
var bdo = exports.bdo = _hyperscriptHelpers.default.bdo;
var blockquote = exports.blockquote = _hyperscriptHelpers.default.blockquote;
var body = exports.body = _hyperscriptHelpers.default.body;
var br = exports.br = _hyperscriptHelpers.default.br;
var button = exports.button = _hyperscriptHelpers.default.button;
var canvas = exports.canvas = _hyperscriptHelpers.default.canvas;
var caption = exports.caption = _hyperscriptHelpers.default.caption;
var cite = exports.cite = _hyperscriptHelpers.default.cite;
var code = exports.code = _hyperscriptHelpers.default.code;
var col = exports.col = _hyperscriptHelpers.default.col;
var colgroup = exports.colgroup = _hyperscriptHelpers.default.colgroup;
var dd = exports.dd = _hyperscriptHelpers.default.dd;
var del = exports.del = _hyperscriptHelpers.default.del;
var dfn = exports.dfn = _hyperscriptHelpers.default.dfn;
var dir = exports.dir = _hyperscriptHelpers.default.dir;
var div = exports.div = _hyperscriptHelpers.default.div;
var dl = exports.dl = _hyperscriptHelpers.default.dl;
var dt = exports.dt = _hyperscriptHelpers.default.dt;
var em = exports.em = _hyperscriptHelpers.default.em;
var embed = exports.embed = _hyperscriptHelpers.default.embed;
var fieldset = exports.fieldset = _hyperscriptHelpers.default.fieldset;
var figcaption = exports.figcaption = _hyperscriptHelpers.default.figcaption;
var figure = exports.figure = _hyperscriptHelpers.default.figure;
var footer = exports.footer = _hyperscriptHelpers.default.footer;
var form = exports.form = _hyperscriptHelpers.default.form;
var h1 = exports.h1 = _hyperscriptHelpers.default.h1;
var h2 = exports.h2 = _hyperscriptHelpers.default.h2;
var h3 = exports.h3 = _hyperscriptHelpers.default.h3;
var h4 = exports.h4 = _hyperscriptHelpers.default.h4;
var h5 = exports.h5 = _hyperscriptHelpers.default.h5;
var h6 = exports.h6 = _hyperscriptHelpers.default.h6;
var head = exports.head = _hyperscriptHelpers.default.head;
var header = exports.header = _hyperscriptHelpers.default.header;
var hgroup = exports.hgroup = _hyperscriptHelpers.default.hgroup;
var hr = exports.hr = _hyperscriptHelpers.default.hr;
var html = exports.html = _hyperscriptHelpers.default.html;
var i = exports.i = _hyperscriptHelpers.default.i;
var iframe = exports.iframe = _hyperscriptHelpers.default.iframe;
var img = exports.img = _hyperscriptHelpers.default.img;
var input = exports.input = _hyperscriptHelpers.default.input;
var ins = exports.ins = _hyperscriptHelpers.default.ins;
var kbd = exports.kbd = _hyperscriptHelpers.default.kbd;
var keygen = exports.keygen = _hyperscriptHelpers.default.keygen;
var label = exports.label = _hyperscriptHelpers.default.label;
var legend = exports.legend = _hyperscriptHelpers.default.legend;
var li = exports.li = _hyperscriptHelpers.default.li;
var link = exports.link = _hyperscriptHelpers.default.link;
var main = exports.main = _hyperscriptHelpers.default.main;
var map = exports.map = _hyperscriptHelpers.default.map;
var mark = exports.mark = _hyperscriptHelpers.default.mark;
var menu = exports.menu = _hyperscriptHelpers.default.menu;
var meta = exports.meta = _hyperscriptHelpers.default.meta;
var nav = exports.nav = _hyperscriptHelpers.default.nav;
var noscript = exports.noscript = _hyperscriptHelpers.default.noscript;
var object = exports.object = _hyperscriptHelpers.default.object;
var ol = exports.ol = _hyperscriptHelpers.default.ol;
var optgroup = exports.optgroup = _hyperscriptHelpers.default.optgroup;
var option = exports.option = _hyperscriptHelpers.default.option;
var p = exports.p = _hyperscriptHelpers.default.p;
var param = exports.param = _hyperscriptHelpers.default.param;
var pre = exports.pre = _hyperscriptHelpers.default.pre;
var progress = exports.progress = _hyperscriptHelpers.default.progress;
var q = exports.q = _hyperscriptHelpers.default.q;
var rp = exports.rp = _hyperscriptHelpers.default.rp;
var rt = exports.rt = _hyperscriptHelpers.default.rt;
var ruby = exports.ruby = _hyperscriptHelpers.default.ruby;
var s = exports.s = _hyperscriptHelpers.default.s;
var samp = exports.samp = _hyperscriptHelpers.default.samp;
var script = exports.script = _hyperscriptHelpers.default.script;
var section = exports.section = _hyperscriptHelpers.default.section;
var select = exports.select = _hyperscriptHelpers.default.select;
var small = exports.small = _hyperscriptHelpers.default.small;
var source = exports.source = _hyperscriptHelpers.default.source;
var span = exports.span = _hyperscriptHelpers.default.span;
var strong = exports.strong = _hyperscriptHelpers.default.strong;
var style = exports.style = _hyperscriptHelpers.default.style;
var sub = exports.sub = _hyperscriptHelpers.default.sub;
var sup = exports.sup = _hyperscriptHelpers.default.sup;
var table = exports.table = _hyperscriptHelpers.default.table;
var tbody = exports.tbody = _hyperscriptHelpers.default.tbody;
var td = exports.td = _hyperscriptHelpers.default.td;
var textarea = exports.textarea = _hyperscriptHelpers.default.textarea;
var tfoot = exports.tfoot = _hyperscriptHelpers.default.tfoot;
var th = exports.th = _hyperscriptHelpers.default.th;
var thead = exports.thead = _hyperscriptHelpers.default.thead;
var title = exports.title = _hyperscriptHelpers.default.title;
var tr = exports.tr = _hyperscriptHelpers.default.tr;
var u = exports.u = _hyperscriptHelpers.default.u;
var ul = exports.ul = _hyperscriptHelpers.default.ul;
var video = exports.video = _hyperscriptHelpers.default.video;
},{"./thunk":"node_modules/@cycle/dom/lib/es6/thunk.js","./MainDOMSource":"node_modules/@cycle/dom/lib/es6/MainDOMSource.js","./makeDOMDriver":"node_modules/@cycle/dom/lib/es6/makeDOMDriver.js","./mockDOMSource":"node_modules/@cycle/dom/lib/es6/mockDOMSource.js","snabbdom":"node_modules/snabbdom/build/index.js","./hyperscript-helpers":"node_modules/@cycle/dom/lib/es6/hyperscript-helpers.js"}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"node_modules/quicktask/index.js":[function(require,module,exports) {
var process = require("process");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function microtask() {
    if (typeof queueMicrotask !== 'undefined') {
        return queueMicrotask;
    }
    else if (typeof setImmediate !== 'undefined') {
        return setImmediate;
    }
    else if (typeof process !== 'undefined') {
        return process.nextTick;
    }
    else {
        return setTimeout;
    }
}
exports.default = microtask;

},{"process":"node_modules/process/browser.js"}],"node_modules/@cycle/run/lib/es6/adapt.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adapt = adapt;
exports.setAdapt = setAdapt;
function getGlobal() {
  var globalObj;
  if (typeof window !== 'undefined') {
    globalObj = window;
  } else if (typeof global !== 'undefined') {
    globalObj = global;
  } else {
    globalObj = this;
  }
  globalObj.Cyclejs = globalObj.Cyclejs || {};
  globalObj = globalObj.Cyclejs;
  globalObj.adaptStream = globalObj.adaptStream || function (x) {
    return x;
  };
  return globalObj;
}
function setAdapt(f) {
  getGlobal().adaptStream = f;
}
function adapt(stream) {
  return getGlobal().adaptStream(stream);
}
},{}],"node_modules/@cycle/run/lib/es6/internals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptSources = adaptSources;
exports.callDrivers = callDrivers;
exports.disposeSinkProxies = disposeSinkProxies;
exports.disposeSources = disposeSources;
exports.isObjectEmpty = isObjectEmpty;
exports.makeSinkProxies = makeSinkProxies;
exports.replicateMany = replicateMany;
var _xstream = _interopRequireDefault(require("xstream"));
var _quicktask = _interopRequireDefault(require("quicktask"));
var _adapt = require("./adapt");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function makeSinkProxies(drivers) {
  var sinkProxies = {};
  for (var name_1 in drivers) {
    if (drivers.hasOwnProperty(name_1)) {
      sinkProxies[name_1] = _xstream.default.create();
    }
  }
  return sinkProxies;
}
function callDrivers(drivers, sinkProxies) {
  var sources = {};
  for (var name_2 in drivers) {
    if (drivers.hasOwnProperty(name_2)) {
      sources[name_2] = drivers[name_2](sinkProxies[name_2], name_2);
      if (sources[name_2] && _typeof(sources[name_2]) === 'object') {
        sources[name_2]._isCycleSource = name_2;
      }
    }
  }
  return sources;
}
// NOTE: this will mutate `sources`.
function adaptSources(sources) {
  for (var name_3 in sources) {
    if (sources.hasOwnProperty(name_3) && sources[name_3] && typeof sources[name_3].shamefullySendNext === 'function') {
      sources[name_3] = (0, _adapt.adapt)(sources[name_3]);
    }
  }
  return sources;
}
function replicateMany(sinks, sinkProxies) {
  var scheduleMicrotask = (0, _quicktask.default)();
  var sinkNames = Object.keys(sinks).filter(function (name) {
    return !!sinkProxies[name];
  });
  var buffers = {};
  var replicators = {};
  sinkNames.forEach(function (name) {
    buffers[name] = {
      _n: [],
      _e: []
    };
    replicators[name] = {
      next: function (x) {
        return buffers[name]._n.push(x);
      },
      error: function (err) {
        return buffers[name]._e.push(err);
      },
      complete: function () {}
    };
  });
  var subscriptions = sinkNames.map(function (name) {
    return _xstream.default.fromObservable(sinks[name]).subscribe(replicators[name]);
  });
  sinkNames.forEach(function (name) {
    var listener = sinkProxies[name];
    var next = function (x) {
      scheduleMicrotask(function () {
        return listener._n(x);
      });
    };
    var error = function (err) {
      scheduleMicrotask(function () {
        (console.error || console.log)(err);
        listener._e(err);
      });
    };
    buffers[name]._n.forEach(next);
    buffers[name]._e.forEach(error);
    replicators[name].next = next;
    replicators[name].error = error;
    // because sink.subscribe(replicator) had mutated replicator to add
    // _n, _e, _c, we must also update these:
    replicators[name]._n = next;
    replicators[name]._e = error;
  });
  buffers = null; // free up for GC
  return function disposeReplication() {
    subscriptions.forEach(function (s) {
      return s.unsubscribe();
    });
  };
}
function disposeSinkProxies(sinkProxies) {
  Object.keys(sinkProxies).forEach(function (name) {
    return sinkProxies[name]._c();
  });
}
function disposeSources(sources) {
  for (var k in sources) {
    if (sources.hasOwnProperty(k) && sources[k] && sources[k].dispose) {
      sources[k].dispose();
    }
  }
}
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
},{"xstream":"node_modules/xstream/index.js","quicktask":"node_modules/quicktask/index.js","./adapt":"node_modules/@cycle/run/lib/es6/adapt.js"}],"node_modules/@cycle/run/lib/es6/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.run = run;
exports.setup = setup;
exports.setupReusable = setupReusable;
var _internals = require("./internals");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * A function that prepares the Cycle application to be executed. Takes a `main`
 * function and prepares to circularly connects it to the given collection of
 * driver functions. As an output, `setup()` returns an object with three
 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
 * the application actually execute. Refer to the documentation of `run()` for
 * more details.
 *
 * **Example:**
 * ```js
 * import {setup} from '@cycle/run';
 * const {sources, sinks, run} = setup(main, drivers);
 * // ...
 * const dispose = run(); // Executes the application
 * // ...
 * dispose();
 * ```
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Object} an object with three properties: `sources`, `sinks` and
 * `run`. `sources` is the collection of driver sources, `sinks` is the
 * collection of driver sinks, these can be used for debugging or testing. `run`
 * is the function that once called will execute the application.
 * @function setup
 */
function setup(main, drivers) {
  if (typeof main !== "function") {
    throw new Error("First argument given to Cycle must be the 'main' " + "function.");
  }
  if (_typeof(drivers) !== "object" || drivers === null) {
    throw new Error("Second argument given to Cycle must be an object " + "with driver functions as properties.");
  }
  if ((0, _internals.isObjectEmpty)(drivers)) {
    throw new Error("Second argument given to Cycle must be an object " + "with at least one driver function declared as a property.");
  }
  var engine = setupReusable(drivers);
  var sinks = main(engine.sources);
  if (typeof window !== 'undefined') {
    window.Cyclejs = window.Cyclejs || {};
    window.Cyclejs.sinks = sinks;
  }
  function _run() {
    var disposeRun = engine.run(sinks);
    return function dispose() {
      disposeRun();
      engine.dispose();
    };
  }
  return {
    sinks: sinks,
    sources: engine.sources,
    run: _run
  };
}
/**
 * A partially-applied variant of setup() which accepts only the drivers, and
 * allows many `main` functions to execute and reuse this same set of drivers.
 *
 * Takes an object with driver functions as input, and outputs an object which
 * contains the generated sources (from those drivers) and a `run` function
 * (which in turn expects sinks as argument). This `run` function can be called
 * multiple times with different arguments, and it will reuse the drivers that
 * were passed to `setupReusable`.
 *
 * **Example:**
 * ```js
 * import {setupReusable} from '@cycle/run';
 * const {sources, run, dispose} = setupReusable(drivers);
 * // ...
 * const sinks = main(sources);
 * const disposeRun = run(sinks);
 * // ...
 * disposeRun();
 * // ...
 * dispose(); // ends the reusability of drivers
 * ```
 *
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Object} an object with three properties: `sources`, `run` and
 * `dispose`. `sources` is the collection of driver sources, `run` is the
 * function that once called with 'sinks' as argument, will execute the
 * application, tying together sources with sinks. `dispose` terminates the
 * reusable resources used by the drivers. Note also that `run` returns a
 * dispose function which terminates resources that are specific (not reusable)
 * to that run.
 * @function setupReusable
 */
function setupReusable(drivers) {
  if (_typeof(drivers) !== "object" || drivers === null) {
    throw new Error("Argument given to setupReusable must be an object " + "with driver functions as properties.");
  }
  if ((0, _internals.isObjectEmpty)(drivers)) {
    throw new Error("Argument given to setupReusable must be an object " + "with at least one driver function declared as a property.");
  }
  var sinkProxies = (0, _internals.makeSinkProxies)(drivers);
  var rawSources = (0, _internals.callDrivers)(drivers, sinkProxies);
  var sources = (0, _internals.adaptSources)(rawSources);
  function _run(sinks) {
    return (0, _internals.replicateMany)(sinks, sinkProxies);
  }
  function disposeEngine() {
    (0, _internals.disposeSources)(sources);
    (0, _internals.disposeSinkProxies)(sinkProxies);
  }
  return {
    sources: sources,
    run: _run,
    dispose: disposeEngine
  };
}
/**
 * Takes a `main` function and circularly connects it to the given collection
 * of driver functions.
 *
 * **Example:**
 * ```js
 * import run from '@cycle/run';
 * const dispose = run(main, drivers);
 * // ...
 * dispose();
 * ```
 *
 * The `main` function expects a collection of "source" streams (returned from
 * drivers) as input, and should return a collection of "sink" streams (to be
 * given to drivers). A "collection of streams" is a JavaScript object where
 * keys match the driver names registered by the `drivers` object, and values
 * are the streams. Refer to the documentation of each driver to see more
 * details on what types of sources it outputs and sinks it receives.
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Function} a dispose function, used to terminate the execution of the
 * Cycle.js program, cleaning up resources used.
 * @function run
 */
function run(main, drivers) {
  var program = setup(main, drivers);
  if (typeof window !== 'undefined' && window.CyclejsDevTool_startGraphSerializer) {
    window.CyclejsDevTool_startGraphSerializer(program.sinks);
  }
  return program.run();
}
var _default = exports.default = run;
},{"./internals":"node_modules/@cycle/run/lib/es6/internals.js"}],"node_modules/@cycle/storage/lib/writeToStore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @function writeToStore
 * @description
 * A universal write function for localStorage and sessionStorage.
 * @param {object} request - the storage request object
 * @param {string} request.target - a string determines which storage to use
 * @param {string} request.action - a string determines the write action
 * @param {string} request.key - the key of a storage item
 * @param {string} request.value - the value of a storage item
 */
function writeToStore(request) {
  var _a = request.target,
    target = _a === void 0 ? 'local' : _a,
    _b = request.action,
    action = _b === void 0 ? 'setItem' : _b;
  var key = request.key;
  var value = request.value;
  // Determine the storage target.
  var storage = target === "local" ? localStorage : sessionStorage;
  // Execute the storage action and pass arguments if they were defined.
  storage[action](key, value);
}
exports.default = writeToStore;
},{}],"node_modules/xstream/extra/dropRepeats.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var empty = {};
var DropRepeatsOperator = /** @class */ (function () {
    function DropRepeatsOperator(ins, fn) {
        this.ins = ins;
        this.type = 'dropRepeats';
        this.out = null;
        this.v = empty;
        this.isEq = fn ? fn : function (x, y) { return x === y; };
    }
    DropRepeatsOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DropRepeatsOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.v = empty;
    };
    DropRepeatsOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        var v = this.v;
        if (v !== empty && this.isEq(t, v))
            return;
        this.v = t;
        u._n(t);
    };
    DropRepeatsOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropRepeatsOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        u._c();
    };
    return DropRepeatsOperator;
}());
exports.DropRepeatsOperator = DropRepeatsOperator;
/**
 * Drops consecutive duplicate values in a stream.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--1--1--1--2--3--4--3--3|
 *     dropRepeats
 * --1--2--1--------2--3--4--3---|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of(1, 2, 1, 1, 1, 2, 3, 4, 3, 3)
 *   .compose(dropRepeats())
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 2
 * > 1
 * > 2
 * > 3
 * > 4
 * > 3
 * > completed
 * ```
 *
 * Example with a custom isEqual function:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of('a', 'b', 'a', 'A', 'B', 'b')
 *   .compose(dropRepeats((x, y) => x.toLowerCase() === y.toLowerCase()))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > a
 * > b
 * > a
 * > B
 * > completed
 * ```
 *
 * @param {Function} isEqual An optional function of type
 * `(x: T, y: T) => boolean` that takes an event from the input stream and
 * checks if it is equal to previous event, by returning a boolean.
 * @return {Stream}
 */
function dropRepeats(isEqual) {
    if (isEqual === void 0) { isEqual = void 0; }
    return function dropRepeatsOperator(ins) {
        return new index_1.Stream(new DropRepeatsOperator(ins, isEqual));
    };
}
exports.default = dropRepeats;

},{"../index":"node_modules/xstream/index.js"}],"node_modules/@cycle/storage/lib/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xstream_1 = require("xstream");
var dropRepeats_1 = require("xstream/extra/dropRepeats");
var adapt_1 = require("@cycle/run/lib/adapt");
var extStorageProducer = {
  start: function (listener) {
    this.sendReq = function (storage) {
      listener.next({
        target: 'local',
        key: storage.key,
        value: storage.newValue
      });
    };
    window.addEventListener('storage', this.sendReq);
  },
  stop: function () {
    window.removeEventListener('storage', this.sendReq);
  }
};
var extStorage$ = typeof window !== "undefined" ? xstream_1.default.create(extStorageProducer) : xstream_1.default.never();
function getStorage$(request$, type) {
  if (type === 'local') {
    return xstream_1.default.merge(request$.filter(function (req) {
      return !req.target || req.target === 'local';
    }), extStorage$);
  } else {
    return request$.filter(function (req) {
      return req.target === 'session';
    });
  }
}
function storageKey(n, request$, type) {
  if (type === void 0) {
    type = 'local';
  }
  var storage$ = getStorage$(request$, type);
  var key = type === "local" ? localStorage.key(n) : sessionStorage.key(n);
  return storage$.filter(function (req) {
    return req.key === key;
  }).map(function (req) {
    return req.key;
  }).startWith(key).compose(dropRepeats_1.default());
}
function storageGetItem(key, request$, type) {
  if (type === void 0) {
    type = 'local';
  }
  var storage$ = getStorage$(request$, type);
  var storageObj = type === "local" ? localStorage : sessionStorage;
  return storage$.filter(function (req) {
    return req.key === key;
  }).map(function (req) {
    return req.value;
  }).startWith(storageObj.getItem(key));
}
function getResponseObj(request$, type) {
  if (type === void 0) {
    type = 'local';
  }
  return {
    // Function returning stream of the nth key.
    key: function (n) {
      return adapt_1.adapt(storageKey(n, request$, type));
    },
    // Function returning stream of item values.
    getItem: function (key) {
      return adapt_1.adapt(storageGetItem(key, request$, type));
    }
  };
}
exports.default = getResponseObj;
},{"xstream":"node_modules/xstream/index.js","xstream/extra/dropRepeats":"node_modules/xstream/extra/dropRepeats.js","@cycle/run/lib/adapt":"node_modules/@cycle/run/lib/adapt.js"}],"node_modules/@cycle/storage/lib/responseCollection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var util_1 = require("./util");
function default_1(request$) {
  return {
    // For localStorage.
    get local() {
      return util_1.default(request$);
    },
    // For sessionStorage.
    get session() {
      return util_1.default(request$, 'session');
    }
  };
}
exports.default = default_1;
},{"./util":"node_modules/@cycle/storage/lib/util.js"}],"node_modules/@cycle/storage/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var writeToStore_1 = require("./writeToStore");
var responseCollection_1 = require("./responseCollection");
/**
 * Storage Driver.
 *
 * This is a localStorage and sessionStorage Driver for Cycle.js apps. The
 * driver is also a function, and it takes a stream of requests as input, and
 * returns a **`responseCollection`** with functions that allow reading from the
 * storage objects. The functions on the **`responseCollection`** return streams
 * of the storage data that was requested.
 *
 * **Requests**. The stream of requests should emit objects. These should be
 * instructions to write to the desired Storage object. Here are the `request`
 * object properties:
 *
 * - `target` *(String)*: type of storage, can be `local` or `session`, defaults
 * to `local`.
 * - `action` *(String)*: type of action, can be `setItem`, `removeItem` or
 * `clear`, defaults to `setItem`.
 * - `key` *(String)*: storage key.
 * - `value` *(String)*: storage value.
 *
 * **responseCollection**. The **`responseCollection`** is an Object that
 * exposes functions to read from local- and sessionStorage.
 *
 * ```js
 * // Returns key of nth localStorage value.
 * responseCollection.local.getKey(n)
 * // Returns localStorage value of `key`.
 * responseCollection.local.getItem(key)
 * ```
 *
 * @param request$ - a stream of write request objects.
 * @return {Object} the response collection containing functions
 * for reading from storage.
 * @function storageDriver
 */
function storageDriver(request$) {
  // Execute writing actions.
  request$.addListener({
    next: function (request) {
      return writeToStore_1.default(request);
    }
  });
  // Return reading functions.
  return responseCollection_1.default(request$);
}
exports.default = storageDriver;
},{"./writeToStore":"node_modules/@cycle/storage/lib/writeToStore.js","./responseCollection":"node_modules/@cycle/storage/lib/responseCollection.js"}],"node_modules/extend/index.js":[function(require,module,exports) {
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],"node_modules/snabbdom-pragma/dist/index.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createElement = void 0;
var _extend2 = _interopRequireDefault(require("extend"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var undefinedv = function (v) {
  return v === undefined;
};
var number = function (v) {
  return typeof v === 'number';
};
var string = function (v) {
  return typeof v === 'string';
};
var text = function (v) {
  return string(v) || number(v);
};
var array = function (v) {
  return Array.isArray(v);
};
var object = function (v) {
  return typeof v === 'object' && v !== null;
};
var fun = function (v) {
  return typeof v === 'function';
};
var vnode = function (v) {
  return object(v) && 'sel' in v && 'data' in v && 'children' in v && 'text' in v;
};
var svgPropsMap = {
  svg: 1,
  circle: 1,
  ellipse: 1,
  line: 1,
  polygon: 1,
  polyline: 1,
  rect: 1,
  g: 1,
  path: 1,
  text: 1
};
var svg = function (v) {
  return v.sel in svgPropsMap;
};

// TODO: stop using extend here
var extend = function () {
  var objs = [],
    len = arguments.length;
  while (len--) objs[len] = arguments[len];
  return _extend2.default.apply(void 0, [true].concat(objs));
};
var assign = function () {
  var objs = [],
    len = arguments.length;
  while (len--) objs[len] = arguments[len];
  return _extend2.default.apply(void 0, [false].concat(objs));
};
var reduceDeep = function (arr, fn, initial) {
  var result = initial;
  for (var i = 0; i < arr.length; i++) {
    var value = arr[i];
    if (array(value)) {
      result = reduceDeep(value, fn, result);
    } else {
      result = fn(result, value);
    }
  }
  return result;
};
var mapObject = function (obj, fn) {
  return Object.keys(obj).map(function (key) {
    return fn(key, obj[key]);
  }).reduce(function (acc, curr) {
    return extend(acc, curr);
  }, {});
};
var deepifyKeys = function (obj) {
  return mapObject(obj, function (key, val) {
    var dashIndex = key.indexOf('-');
    if (dashIndex > -1) {
      var moduleData = {};
      moduleData[key.slice(dashIndex + 1)] = val;
      return obj = {}, obj[key.slice(0, dashIndex)] = moduleData, obj;
      var obj;
    }
    return obj$1 = {}, obj$1[key] = val, obj$1;
    var obj$1;
  });
};
var flatifyKeys = function (obj) {
  return mapObject(obj, function (mod, data) {
    return !object(data) ? (obj = {}, obj[mod] = data, obj) : mapObject(flatifyKeys(data), function (key, val) {
      return obj = {}, obj[mod + "-" + key] = val, obj;
      var obj;
    });
    var obj;
  });
};
var omit = function (key, obj) {
  return mapObject(obj, function (mod, data) {
    return mod !== key ? (obj = {}, obj[mod] = data, obj) : {};
    var obj;
  });
};

// Const fnName = (...params) => guard ? default : ...

var createTextElement = function (text$$1) {
  return !text(text$$1) ? undefined : {
    text: text$$1,
    sel: undefined,
    data: undefined,
    children: undefined,
    elm: undefined,
    key: undefined
  };
};
var considerSvg = function (vnode$$1) {
  return !svg(vnode$$1) ? vnode$$1 : assign(vnode$$1, {
    data: omit('props', extend(vnode$$1.data, {
      ns: 'http://www.w3.org/2000/svg',
      attrs: omit('className', extend(vnode$$1.data.props, {
        class: vnode$$1.data.props ? vnode$$1.data.props.className : undefined
      }))
    }))
  }, {
    children: undefinedv(vnode$$1.children) ? undefined : vnode$$1.children.map(function (child) {
      return considerSvg(child);
    })
  });
};
var considerData = function (data) {
  return !data.data ? data : mapObject(data, function (mod, data) {
    var key = mod === 'data' ? 'dataset' : mod;
    return obj = {}, obj[key] = data, obj;
    var obj;
  });
};
var considerAria = function (data) {
  return data.attrs || data.aria ? omit('aria', assign(data, {
    attrs: extend(data.attrs, data.aria ? flatifyKeys({
      aria: data.aria
    }) : {})
  })) : data;
};
var considerProps = function (data) {
  return mapObject(data, function (key, val) {
    return object(val) ? (obj = {}, obj[key] = val, obj) : {
      props: (obj$1 = {}, obj$1[key] = val, obj$1)
    };
    var obj;
    var obj$1;
  });
};
var rewritesMap = {
  for: 1,
  role: 1,
  tabindex: 1
};
var considerAttrs = function (data) {
  return mapObject(data, function (key, data) {
    return !(key in rewritesMap) ? (obj = {}, obj[key] = data, obj) : {
      attrs: extend(data.attrs, (obj$1 = {}, obj$1[key] = data, obj$1))
    };
    var obj;
    var obj$1;
  });
};
var considerKey = function (data) {
  return 'key' in data ? omit('key', data) : data;
};
var sanitizeData = function (data) {
  return considerProps(considerAria(considerData(considerAttrs(considerKey(deepifyKeys(data))))));
};
var sanitizeText = function (children) {
  return children.length > 1 || !text(children[0]) ? undefined : children[0];
};
var sanitizeChildren = function (children) {
  return reduceDeep(children, function (acc, child) {
    var vnode$$1 = vnode(child) ? child : createTextElement(child);
    acc.push(vnode$$1);
    return acc;
  }, []);
};
var createElement = function (sel, data) {
  var children = [],
    len = arguments.length - 2;
  while (len-- > 0) children[len] = arguments[len + 2];
  if (fun(sel)) {
    return sel(data || {}, children);
  }
  var text$$1 = sanitizeText(children);
  return considerSvg({
    sel: sel,
    data: data ? sanitizeData(data) : {},
    children: text$$1 ? undefined : sanitizeChildren(children),
    text: text$$1,
    elm: undefined,
    key: data ? data.key : undefined
  });
};
exports.createElement = createElement;
var index = {
  createElement: createElement
};
var _default = exports.default = index;
},{"extend":"node_modules/extend/index.js"}],"node_modules/@cycle/isolate/lib/es6/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.toIsolated = toIsolated;
var _xstream = _interopRequireDefault(require("xstream"));
var _adapt = require("@cycle/run/lib/adapt");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function checkIsolateArgs(dataflowComponent, scope) {
  if (typeof dataflowComponent !== "function") {
    throw new Error("First argument given to isolate() must be a " + "'dataflowComponent' function");
  }
  if (scope === null) {
    throw new Error("Second argument given to isolate() must not be null");
  }
}
function normalizeScopes(sources, scopes, randomScope) {
  var perChannel = {};
  Object.keys(sources).forEach(function (channel) {
    if (typeof scopes === 'string') {
      perChannel[channel] = scopes;
      return;
    }
    var candidate = scopes[channel];
    if (typeof candidate !== 'undefined') {
      perChannel[channel] = candidate;
      return;
    }
    var wildcard = scopes['*'];
    if (typeof wildcard !== 'undefined') {
      perChannel[channel] = wildcard;
      return;
    }
    perChannel[channel] = randomScope;
  });
  return perChannel;
}
function isolateAllSources(outerSources, scopes) {
  var innerSources = {};
  for (var channel in outerSources) {
    var outerSource = outerSources[channel];
    if (outerSources.hasOwnProperty(channel) && outerSource && scopes[channel] !== null && typeof outerSource.isolateSource === 'function') {
      innerSources[channel] = outerSource.isolateSource(outerSource, scopes[channel]);
    } else if (outerSources.hasOwnProperty(channel)) {
      innerSources[channel] = outerSources[channel];
    }
  }
  return innerSources;
}
function isolateAllSinks(sources, innerSinks, scopes) {
  var outerSinks = {};
  for (var channel in innerSinks) {
    var source = sources[channel];
    var innerSink = innerSinks[channel];
    if (innerSinks.hasOwnProperty(channel) && source && scopes[channel] !== null && typeof source.isolateSink === 'function') {
      outerSinks[channel] = (0, _adapt.adapt)(source.isolateSink(_xstream.default.fromObservable(innerSink), scopes[channel]));
    } else if (innerSinks.hasOwnProperty(channel)) {
      outerSinks[channel] = innerSinks[channel];
    }
  }
  return outerSinks;
}
var counter = 0;
function newScope() {
  return "cycle" + ++counter;
}
/**
 * Takes a `component` function and a `scope`, and returns an isolated version
 * of the `component` function.
 *
 * When the isolated component is invoked, each source provided to it is
 * isolated to the given `scope` using `source.isolateSource(source, scope)`,
 * if possible. Likewise, the sinks returned from the isolated component are
 * isolated to the given `scope` using `source.isolateSink(sink, scope)`.
 *
 * The `scope` can be a string or an object. If it is anything else than those
 * two types, it will be converted to a string. If `scope` is an object, it
 * represents "scopes per channel", allowing you to specify a different scope
 * for each key of sources/sinks. For instance
 *
 * ```js
 * const childSinks = isolate(Child, {DOM: 'foo', HTTP: 'bar'})(sources);
 * ```
 *
 * You can also use a wildcard `'*'` to use as a default for source/sinks
 * channels that did not receive a specific scope:
 *
 * ```js
 * // Uses 'bar' as the isolation scope for HTTP and other channels
 * const childSinks = isolate(Child, {DOM: 'foo', '*': 'bar'})(sources);
 * ```
 *
 * If a channel's value is null, then that channel's sources and sinks won't be
 * isolated. If the wildcard is null and some channels are unspecified, those
 * channels won't be isolated. If you don't have a wildcard and some channels
 * are unspecified, then `isolate` will generate a random scope.
 *
 * ```js
 * // Does not isolate HTTP requests
 * const childSinks = isolate(Child, {DOM: 'foo', HTTP: null})(sources);
 * ```
 *
 * If the `scope` argument is not provided at all, a new scope will be
 * automatically created. This means that while **`isolate(component, scope)` is
 * pure** (referentially transparent), **`isolate(component)` is impure** (not
 * referentially transparent). Two calls to `isolate(Foo, bar)` will generate
 * the same component. But, two calls to `isolate(Foo)` will generate two
 * distinct components.
 *
 * ```js
 * // Uses some arbitrary string as the isolation scope for HTTP and other channels
 * const childSinks = isolate(Child, {DOM: 'foo'})(sources);
 * ```
 *
 * Note that both `isolateSource()` and `isolateSink()` are static members of
 * `source`. The reason for this is that drivers produce `source` while the
 * application produces `sink`, and it's the driver's responsibility to
 * implement `isolateSource()` and `isolateSink()`.
 *
 * _Note for Typescript users:_ `isolate` is not currently type-transparent and
 * will explicitly convert generic type arguments to `any`. To preserve types in
 * your components, you can use a type assertion:
 *
 * ```ts
 * // if Child is typed `Component<Sources, Sinks>`
 * const isolatedChild = isolate( Child ) as Component<Sources, Sinks>;
 * ```
 *
 * @param {Function} component a function that takes `sources` as input
 * and outputs a collection of `sinks`.
 * @param {String} scope an optional string that is used to isolate each
 * `sources` and `sinks` when the returned scoped component is invoked.
 * @return {Function} the scoped component function that, as the original
 * `component` function, takes `sources` and returns `sinks`.
 * @function isolate
 */
function isolate(component, scope) {
  if (scope === void 0) {
    scope = newScope();
  }
  checkIsolateArgs(component, scope);
  var randomScope = typeof scope === 'object' ? newScope() : '';
  var scopes = typeof scope === 'string' || typeof scope === 'object' ? scope : scope.toString();
  return function wrappedComponent(outerSources) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      rest[_i - 1] = arguments[_i];
    }
    var scopesPerChannel = normalizeScopes(outerSources, scopes, randomScope);
    var innerSources = isolateAllSources(outerSources, scopesPerChannel);
    var innerSinks = component.apply(void 0, [innerSources].concat(rest));
    var outerSinks = isolateAllSinks(outerSources, innerSinks, scopesPerChannel);
    return outerSinks;
  };
}
isolate.reset = function () {
  return counter = 0;
};
var _default = exports.default = isolate;
function toIsolated(scope) {
  if (scope === void 0) {
    scope = newScope();
  }
  return function (component) {
    return isolate(component, scope);
  };
}
},{"xstream":"node_modules/xstream/index.js","@cycle/run/lib/adapt":"node_modules/@cycle/run/lib/adapt.js"}],"src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ofType = exports.is = void 0;
/**
 * Utility function to filter actions by key with type narrowing
 */
var ofType = exports.ofType = function ofType(key) {
  return function (action) {
    return action.key == key;
  };
};
/**
 * Another simple utility function which filters by the value
 */
var is = exports.is = function is(x) {
  return function (y) {
    return x === y;
  };
};
},{}],"src/components/LabeledSlider.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabeledSlider = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
var _dom = require("@cycle/dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function intent(domSource) {
  return domSource.select(".slider").events("input").map(function (ev) {
    return ev.target.value;
  });
}
function model(newValue$, props$) {
  var initialValue$ = props$.map(function (props) {
    return props.initial;
  }).take(1);
  return _xstream.default.merge(initialValue$, newValue$).remember();
}
function view(props$, value$) {
  return _xstream.default.combine(props$, value$).map(function (_a) {
    var props = _a[0],
      value = _a[1];
    return (0, _dom.div)(".labeled-slider", [(0, _dom.span)(".label", props.label), (0, _dom.input)(".slider", {
      attrs: {
        type: "range",
        min: props.min,
        max: props.max,
        value: value
      }
    })]);
  });
}
var LabeledSlider = exports.LabeledSlider = function LabeledSlider(sources) {
  var change$ = intent(sources.DOM);
  var value$ = model(change$, sources.props$);
  var vdom$ = view(sources.props$, value$);
  return {
    DOM: vdom$,
    value: value$,
    changes: change$
  };
};
},{"xstream":"node_modules/xstream/index.js","@cycle/dom":"node_modules/@cycle/dom/lib/es6/index.js"}],"src/components/ToggleButton.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleButton = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
var _dom = require("@cycle/dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function intent(domSource) {
  return domSource.select(".checkbox").events("input").map(function (ev) {
    return ev.target.checked;
  });
}
function model(newValue$, props$) {
  var initialValue$ = props$.map(function (props) {
    return props.initial;
  }).take(1);
  return _xstream.default.merge(initialValue$, newValue$).remember();
}
function view(props$, value$) {
  return _xstream.default.combine(props$, value$).map(function (_a) {
    var props = _a[0],
      value = _a[1];
    return (0, _dom.label)(".toggle-button", [(0, _dom.input)(".checkbox", {
      attrs: {
        type: "checkbox",
        checked: value
      }
    }), (0, _dom.div)({
      attrs: {
        class: ["caption"]
      }
    }, props.label)]);
  });
}
var ToggleButton = exports.ToggleButton = function ToggleButton(sources) {
  var change$ = intent(sources.DOM);
  var value$ = model(change$, sources.props$);
  var vdom$ = view(sources.props$, value$);
  return {
    DOM: vdom$,
    checked: value$,
    changes: change$
  };
};
},{"xstream":"node_modules/xstream/index.js","@cycle/dom":"node_modules/@cycle/dom/lib/es6/index.js"}],"src/components/Main.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = Main;
var Snabbdom = _interopRequireWildcard(require("snabbdom-pragma"));
var _isolate = _interopRequireDefault(require("@cycle/isolate"));
var _xstream = _interopRequireDefault(require("xstream"));
var _utils = require("../utils");
var _LabeledSlider = require("./LabeledSlider");
var _ToggleButton = require("./ToggleButton");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Main(sources) {
  var helpVisible$ = sources.DOM.select(".help-button").events("click").fold(function (isShown) {
    return !isShown;
  }, false);
  var helpShown$ = helpVisible$.filter((0, _utils.is)(true)).take(1).startWith(false);
  var initialVolume$ = sources.props.map(function (props) {
    return props.initialVolume;
  });
  var initialThreshold = sources.props.map(function (props) {
    return props.initialThreshold;
  });
  var VolumeSlider = (0, _isolate.default)(_LabeledSlider.LabeledSlider);
  var ThresholdSlider = (0, _isolate.default)(_LabeledSlider.LabeledSlider);
  var volumeSliderProps$ = initialVolume$.map(function (value) {
    return {
      label: "Feedback Volume",
      min: 0,
      max: 100,
      initial: value
    };
  });
  var thresholdSliderProps$ = initialThreshold.map(function (value) {
    return {
      label: "Amplitude Threshold",
      min: 0,
      max: 100,
      initial: value
    };
  });
  var toggleButtonProps$ = _xstream.default.of(false).map(function (value) {
    return {
      label: Snabbdom.createElement("svg", {
        viewBox: "0 0 24 24"
      }, Snabbdom.createElement("path", {
        d: "M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      }), Snabbdom.createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      })),
      initial: value
    };
  });
  var volumeSlider = VolumeSlider({
    DOM: sources.DOM,
    props$: volumeSliderProps$
  });
  var thresholdSlider = ThresholdSlider({
    DOM: sources.DOM,
    props$: thresholdSliderProps$
  });
  var toggleButton = (0, _ToggleButton.ToggleButton)({
    DOM: sources.DOM,
    props$: toggleButtonProps$
  });
  var vdom$ = _xstream.default.combine(helpShown$, helpVisible$, volumeSlider.DOM, thresholdSlider.DOM, toggleButton.DOM).map(function (_a) {
    var helpShown = _a[0],
      helpVisible = _a[1],
      volumeSliderDOM = _a[2],
      thresholdSliderDOM = _a[3],
      toggleButtonDOM = _a[4];
    return Snabbdom.createElement("main", null, Snabbdom.createElement("header", null, Snabbdom.createElement("h1", {
      className: "title"
    }, "Repeater"), Snabbdom.createElement("a", {
      className: "help-button",
      "aria-label": "About"
    }, Snabbdom.createElement("svg", {
      viewBox: "0 0 24 24"
    }, Snabbdom.createElement("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }), Snabbdom.createElement("path", {
      d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
    })))), helpShown && Snabbdom.createElement("section", {
      className: "help " + (helpVisible ? "" : "help-hidden")
    }, Snabbdom.createElement("p", null, "Repeater listens to your speech and plays it back automatically. It helps practice shadowing technique for language learning and improving pronunciation."), Snabbdom.createElement("p", null, "Open a video, like TED talk, and repeat after the speaker as closely in time, rhythm, and intonation as possible. Pause the video, and compare it to your own speech."), Snabbdom.createElement("div", {
      className: "embedded-video"
    }, Snabbdom.createElement("iframe", {
      src: "https://www.youtube-nocookie.com/embed/u5JseMqoQCg?rel=0",
      frameborder: "0",
      allow: "autoplay; encrypted-media",
      allowfullscreen: true
    })), Snabbdom.createElement("p", null, "Using headphones is recommended to avoid interference from the speakers. Recorded audio never leaves your browser. For more information about the shadowing technique, see the above video.")), Snabbdom.createElement("section", {
      className: "volume-slider"
    }, volumeSliderDOM), Snabbdom.createElement("section", {
      className: "threshold-slider"
    }, thresholdSliderDOM), Snabbdom.createElement("section", {
      className: "toggle-button"
    }, toggleButtonDOM), Snabbdom.createElement("footer", null, Snabbdom.createElement("a", {
      className: "social-link",
      href: "https://github.com/mpontus/repeater"
    }, Snabbdom.createElement("svg", {
      viewBox: "0 0 16 16",
      width: "16",
      height: "16",
      "aria-hidden": "true"
    }, Snabbdom.createElement("path", {
      "fill-rule": "evenodd",
      d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    })), Snabbdom.createElement("span", null, "Fork me on GitHub"))));
  });
  return {
    DOM: vdom$,
    volume: volumeSlider.value,
    threshold: thresholdSlider.value,
    started: toggleButton.checked
  };
}
},{"snabbdom-pragma":"node_modules/snabbdom-pragma/dist/index.es6.js","@cycle/isolate":"node_modules/@cycle/isolate/lib/es6/index.js","xstream":"node_modules/xstream/index.js","../utils":"src/utils.ts","./LabeledSlider":"src/components/LabeledSlider.ts","./ToggleButton":"src/components/ToggleButton.ts"}],"src/drivers/audioDriver.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAudioDriver = exports.PlaybackSource = exports.CancelableMediaSource = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var CancelableMediaSource = exports.CancelableMediaSource = /** @class */function () {
  function CancelableMediaSource(audioCtx) {
    var _this = this;
    this.audioCtx = audioCtx;
    this.canceled = false;
    this.analyserNode = audioCtx.createAnalyser();
    this.scriptProcessorNode = audioCtx.createScriptProcessor(4096, 1, 1);
    this.muteNode = audioCtx.createGain();
    this.analyserNode.connect(this.scriptProcessorNode);
    this.scriptProcessorNode.connect(this.muteNode);
    this.muteNode.connect(audioCtx.destination);
    this.muteNode.gain.value = 0;
    this.samples = _xstream.default.create({
      start: function start(listener) {
        _this.scriptProcessorNode.onaudioprocess = function (e) {
          var inputBuffer = e.inputBuffer;
          var data = inputBuffer.getChannelData(0);
          listener.next(data);
        };
      },
      stop: function stop() {
        _this.scriptProcessorNode.onaudioprocess = function () {};
      }
    });
  }
  Object.defineProperty(CancelableMediaSource.prototype, "analyser", {
    get: function get() {
      return this.analyserNode;
    },
    enumerable: true,
    configurable: true
  });
  CancelableMediaSource.prototype.start = function () {
    var _this = this;
    this.mediaStreamPromise = navigator.mediaDevices.getUserMedia({
      audio: true
    });
    this.mediaStreamPromise.then(function (stream) {
      if (!_this.canceled) {
        var source = _this.audioCtx.createMediaStreamSource(stream);
        source.connect(_this.analyserNode);
      }
    });
  };
  CancelableMediaSource.prototype.stop = function () {
    if (this.canceled) {
      return;
    }
    this.canceled = true;
    this.mediaStreamPromise.then(function (stream) {
      return stream.getTracks().forEach(function (track) {
        return track.stop();
      });
    });
  };
  return CancelableMediaSource;
}();
var PlaybackSource = exports.PlaybackSource = /** @class */function () {
  function PlaybackSource(audioCtx) {
    this.audioCtx = audioCtx;
    this.bufferSource = null;
    this.analyserNode = audioCtx.createAnalyser();
    this.volumeControlNode = audioCtx.createGain();
    this.analyserNode.connect(this.volumeControlNode);
    this.volumeControlNode.connect(audioCtx.destination);
  }
  Object.defineProperty(PlaybackSource.prototype, "analyser", {
    get: function get() {
      return this.analyserNode;
    },
    enumerable: true,
    configurable: true
  });
  PlaybackSource.prototype.start = function (buffer) {
    var audioBuffer = this.audioCtx.createBuffer(1, buffer.length, this.audioCtx.sampleRate);
    audioBuffer.copyToChannel(buffer, 0, 0);
    this.bufferSource = this.audioCtx.createBufferSource();
    this.bufferSource.buffer = audioBuffer;
    this.bufferSource.connect(this.analyserNode);
    this.bufferSource.start();
  };
  PlaybackSource.prototype.stop = function () {
    if (this.bufferSource != null) {
      this.bufferSource.stop();
    }
  };
  PlaybackSource.prototype.set_volume = function (value) {
    this.volumeControlNode.gain.value = value;
  };
  return PlaybackSource;
}();
var makeAudioDriver = exports.makeAudioDriver = function makeAudioDriver(createAudioContext) {
  return function (source$) {
    var audioCtx$ = source$.filter(function (action) {
      return action.type === "start_recording";
    }).map(createAudioContext);
    var mediaSource$ = audioCtx$.map(function (audioCtx) {
      return new CancelableMediaSource(audioCtx);
    });
    var playbackSource$ = audioCtx$.map(function (audioCtx) {
      return new PlaybackSource(audioCtx);
    });
    _xstream.default.combine(source$, mediaSource$, playbackSource$).subscribe({
      next: function next(_a) {
        var action = _a[0],
          mediaSource = _a[1],
          playbackSource = _a[2];
        switch (action.type) {
          case "set_volume":
            playbackSource.set_volume(action.data);
            break;
          case "start_recording":
            mediaSource.start();
            break;
          case "stop_recording":
            mediaSource.stop();
            break;
          case "start_playing":
            playbackSource.start(action.data);
            break;
          case "stop_playing":
            playbackSource.stop();
            break;
        }
      }
    });
    return {
      sampleRate: audioCtx$.map(function (audioCtx) {
        return audioCtx.sampleRate;
      }),
      samples: mediaSource$.map(function (mediaSource) {
        return mediaSource.samples;
      }).flatten()
    };
  };
};
},{"xstream":"node_modules/xstream/index.js"}],"src/drivers/workerDriver.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWorkerDriver = void 0;
var _xstream = _interopRequireDefault(require("xstream"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var makeWorkerDriver = exports.makeWorkerDriver = function makeWorkerDriver(worker) {
  return function (input$) {
    input$.addListener({
      next: function next(e) {
        return worker.postMessage(e);
      }
    });
    return _xstream.default.createWithMemory({
      start: function start(listener) {
        worker.onmessage = function (e) {
          listener.next(e.data);
        };
      },
      stop: function stop() {
        worker.onmessage = function () {};
      }
    });
  };
};
},{"xstream":"node_modules/xstream/index.js"}],"src/index.tsx":[function(require,module,exports) {
"use strict";

var _dom = require("@cycle/dom");
var _run = require("@cycle/run");
var _storage = _interopRequireDefault(require("@cycle/storage"));
var _xstream = _interopRequireDefault(require("xstream"));
var _Main = require("./components/Main");
var _audioDriver = require("./drivers/audioDriver");
var _workerDriver = require("./drivers/workerDriver");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Adjust threshold value to fit real scale.
 *
 * Exponentiation makes the slider feel more natural.
 */
var exponentiateThreshold = function exponentiateThreshold(v) {
  return Math.pow(v, 2) * 0.2;
};
var main = function main(sources) {
  var initialVolume$ = sources.storage.local.getItem("volume").take(1).map(function (value) {
    return value ? parseInt(value, 10) : 50;
  });
  var initialThreshold = sources.storage.local.getItem("threshold").take(1).map(function (value) {
    return value ? parseInt(value, 10) : 15;
  });
  var main = (0, _Main.Main)({
    DOM: sources.DOM,
    props: _xstream.default.combine(initialVolume$, initialThreshold).map(function (_a) {
      var initialVolume = _a[0],
        initialThreshold = _a[1];
      return {
        initialThreshold: initialThreshold,
        initialVolume: initialVolume
      };
    })
  });
  var volume$ = main.volume;
  var threshold$ = main.threshold;
  var started$ = main.started;
  // We also need explicit changes (i.e. exlude default values) to
  // invoke driver actions explicitly.
  var thresholdChange$ = threshold$.drop(1);
  var startedChange$ = started$.drop(1);
  var vdom$ = main.DOM;
  var audioSink = _xstream.default.merge(started$.filter((0, _utils.is)(true)).mapTo({
    type: "start_recording"
  }), startedChange$.filter((0, _utils.is)(false)).mapTo({
    type: "stop_recording"
  }), volume$.map(function (value) {
    return {
      type: "set_volume",
      data: value / 100
    };
  }), sources.worker.filter((0, _utils.ofType)("voice_end")).map(function (e) {
    return {
      type: "start_playing",
      data: e.data
    };
  }), sources.worker.filter((0, _utils.ofType)("voice_start")).mapTo({
    type: "stop_playing"
  }));
  var workerSink = _xstream.default.merge(started$.filter((0, _utils.is)(true))
  // Nested stream is necessary in order to pass threshold with
  // "start", and not emit "start" on every threshold change
  .map(function () {
    return _xstream.default.combine(sources.audio.sampleRate, threshold$).take(1).map(function (_a) {
      var sampleRate = _a[0],
        threshold = _a[1];
      return {
        key: "start",
        data: {
          sampleRate: sampleRate,
          amplitudeThreshold: exponentiateThreshold(threshold / 100),
          silenceDuration: 0.5,
          contextDuration: 0.5
        }
      };
    });
  }).flatten(), startedChange$.filter((0, _utils.is)(false)).mapTo({
    key: "stop"
  }), thresholdChange$.map(function (threshold) {
    return {
      key: "update_settings",
      data: {
        amplitudeThreshold: exponentiateThreshold(threshold / 100)
      }
    };
  }), sources.audio.samples.map(function (data) {
    return {
      key: "process",
      data: data
    };
  }));
  var storageSink = _xstream.default.merge(volume$.map(function (value) {
    return {
      key: "volume",
      value: value
    };
  }), threshold$.map(function (value) {
    return {
      key: "threshold",
      value: value
    };
  }));
  return {
    DOM: vdom$,
    audio: audioSink,
    worker: workerSink,
    storage: storageSink
  };
};
(0, _run.run)(main, {
  DOM: (0, _dom.makeDOMDriver)("#root"),
  storage: _storage.default,
  audio: (0, _audioDriver.makeAudioDriver)(function () {
    return new AudioContext();
  }),
  worker: (0, _workerDriver.makeWorkerDriver)(new Worker("/worker.187d61ce.js"))
});
},{"@cycle/dom":"node_modules/@cycle/dom/lib/es6/index.js","@cycle/run":"node_modules/@cycle/run/lib/es6/index.js","@cycle/storage":"node_modules/@cycle/storage/lib/index.js","xstream":"node_modules/xstream/index.js","./components/Main":"src/components/Main.tsx","./drivers/audioDriver":"src/drivers/audioDriver.ts","./drivers/workerDriver":"src/drivers/workerDriver.ts","./utils":"src/utils.ts","./worker/index.ts":[["worker.187d61ce.js","src/worker/index.ts"],"worker.187d61ce.js.map","src/worker/index.ts"]}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36675" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.tsx"], null)
//# sourceMappingURL=/src.fc45d0fd.js.map