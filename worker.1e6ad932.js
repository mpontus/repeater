parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"nqmn":[function(require,module,exports) {
"use strict";function e(e){var o,r=e.Symbol;return"function"==typeof r?r.observable?o=r.observable:(o=r("observable"),r.observable=o):o="@@observable",o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"KzwE":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3];Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var d,o=t(require("./ponyfill.js"));function t(e){return e&&e.__esModule?e:{default:e}}d="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof module?module:Function("return this")();var u=(0,o.default)(d),n=exports.default=u;
},{"./ponyfill.js":"nqmn"}],"Ot6f":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var o in i)i.hasOwnProperty(o)&&(t[o]=i[o])};return function(i,o){function n(){this.constructor=i}t(i,o),i.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var i=require("symbol-observable"),o={};function n(){}function r(t){for(var i=t.length,o=Array(i),n=0;n<i;++n)o[n]=t[n];return o}function e(t,i){return function(o){return t(o)&&i(o)}}function s(t,i,n){try{return t.f(i)}catch(t){return n._e(t),o}}exports.NO=o;var h={_n:n,_e:n,_c:n};function u(t){t._start=function(t){t.next=t._n,t.error=t._e,t.complete=t._c,this.start(t)},t._stop=t.stop}exports.NO_IL=h;var p=function(){function t(t,i){this._stream=t,this._listener=i}return t.prototype.unsubscribe=function(){this._stream._remove(this._listener)},t}(),c=function(){function t(t){this._listener=t}return t.prototype.next=function(t){this._listener._n(t)},t.prototype.error=function(t){this._listener._e(t)},t.prototype.complete=function(){this._listener._c()},t}(),_=function(){function t(t){this.type="fromObservable",this.ins=t,this.active=!1}return t.prototype._start=function(t){this.out=t,this.active=!0,this._sub=this.ins.subscribe(new c(t)),this.active||this._sub.unsubscribe()},t.prototype._stop=function(){this._sub&&this._sub.unsubscribe(),this.active=!1},t}(),f=function(){function t(t){this.type="merge",this.insArr=t,this.out=o,this.ac=0}return t.prototype._start=function(t){this.out=t;var i=this.insArr,o=i.length;this.ac=o;for(var n=0;n<o;n++)i[n]._add(this)},t.prototype._stop=function(){for(var t=this.insArr,i=t.length,n=0;n<i;n++)t[n]._remove(this);this.out=o},t.prototype._n=function(t){var i=this.out;i!==o&&i._n(t)},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){if(--this.ac<=0){var t=this.out;if(t===o)return;t._c()}},t}(),a=function(){function t(t,i,o){this.i=t,this.out=i,this.p=o,o.ils.push(this)}return t.prototype._n=function(t){var i=this.p,n=this.out;if(n!==o&&i.up(t,this.i)){for(var r=i.vals,e=r.length,s=Array(e),h=0;h<e;++h)s[h]=r[h];n._n(s)}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.p;t.out!==o&&0==--t.Nc&&t.out._c()},t}(),y=function(){function t(t){this.type="combine",this.insArr=t,this.out=o,this.ils=[],this.Nc=this.Nn=0,this.vals=[]}return t.prototype.up=function(t,i){var n=this.vals[i],r=this.Nn?n===o?--this.Nn:this.Nn:0;return this.vals[i]=t,0===r},t.prototype._start=function(t){this.out=t;var i=this.insArr,n=this.Nc=this.Nn=i.length,r=this.vals=new Array(n);if(0===n)t._n([]),t._c();else for(var e=0;e<n;e++)r[e]=o,i[e]._add(new a(e,t,this))},t.prototype._stop=function(){for(var t=this.insArr,i=t.length,n=this.ils,r=0;r<i;r++)t[r]._remove(n[r]);this.out=o,this.ils=[],this.vals=[]},t}(),l=function(){function t(t){this.type="fromArray",this.a=t}return t.prototype._start=function(t){for(var i=this.a,o=0,n=i.length;o<n;o++)t._n(i[o]);t._c()},t.prototype._stop=function(){},t}(),v=function(){function t(t){this.type="fromPromise",this.on=!1,this.p=t}return t.prototype._start=function(t){var i=this;this.on=!0,this.p.then(function(o){i.on&&(t._n(o),t._c())},function(i){t._e(i)}).then(n,function(t){setTimeout(function(){throw t})})},t.prototype._stop=function(){this.on=!1},t}(),d=function(){function t(t){this.type="periodic",this.period=t,this.intervalID=-1,this.i=0}return t.prototype._start=function(t){var i=this;this.intervalID=setInterval(function(){t._n(i.i++)},this.period)},t.prototype._stop=function(){-1!==this.intervalID&&clearInterval(this.intervalID),this.intervalID=-1,this.i=0},t}(),m=function(){function t(t,i){this.type="debug",this.ins=t,this.out=o,this.s=n,this.l="","string"==typeof i?this.l=i:"function"==typeof i&&(this.s=i)}return t.prototype._start=function(t){this.out=t,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o},t.prototype._n=function(t){var i=this.out;if(i!==o){var r=this.s,e=this.l;if(r!==n)try{r(t)}catch(t){i._e(t)}else e?console.log(e+":",t):console.log(t);i._n(t)}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),w=function(){function t(t,i){this.type="drop",this.ins=i,this.out=o,this.max=t,this.dropped=0}return t.prototype._start=function(t){this.out=t,this.dropped=0,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o},t.prototype._n=function(t){var i=this.out;i!==o&&this.dropped++>=this.max&&i._n(t)},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),b=function(){function t(t,i){this.out=t,this.op=i}return t.prototype._n=function(){this.op.end()},t.prototype._e=function(t){this.out._e(t)},t.prototype._c=function(){this.op.end()},t}(),g=function(){function t(t,i){this.type="endWhen",this.ins=i,this.out=o,this.o=t,this.oil=h}return t.prototype._start=function(t){this.out=t,this.o._add(this.oil=new b(t,this)),this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.o._remove(this.oil),this.out=o,this.oil=h},t.prototype.end=function(){var t=this.out;t!==o&&t._c()},t.prototype._n=function(t){var i=this.out;i!==o&&i._n(t)},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){this.end()},t}(),x=function(){function t(t,i){this.type="filter",this.ins=i,this.out=o,this.f=t}return t.prototype._start=function(t){this.out=t,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o},t.prototype._n=function(t){var i=this.out;if(i!==o){var n=s(this,t,i);n!==o&&n&&i._n(t)}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),N=function(){function t(t,i){this.out=t,this.op=i}return t.prototype._n=function(t){this.out._n(t)},t.prototype._e=function(t){this.out._e(t)},t.prototype._c=function(){this.op.inner=o,this.op.less()},t}(),A=function(){function t(t){this.type="flatten",this.ins=t,this.out=o,this.open=!0,this.inner=o,this.il=h}return t.prototype._start=function(t){this.out=t,this.open=!0,this.inner=o,this.il=h,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.inner!==o&&this.inner._remove(this.il),this.out=o,this.open=!0,this.inner=o,this.il=h},t.prototype.less=function(){var t=this.out;t!==o&&(this.open||this.inner!==o||t._c())},t.prototype._n=function(t){var i=this.out;if(i!==o){var n=this.inner,r=this.il;n!==o&&r!==h&&n._remove(r),(this.inner=t)._add(this.il=new N(i,this))}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){this.open=!1,this.less()},t}(),I=function(){function t(t,i,n){var r=this;this.type="fold",this.ins=n,this.out=o,this.f=function(i){return t(r.acc,i)},this.acc=this.seed=i}return t.prototype._start=function(t){this.out=t,this.acc=this.seed,t._n(this.acc),this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o,this.acc=this.seed},t.prototype._n=function(t){var i=this.out;if(i!==o){var n=s(this,t,i);n!==o&&i._n(this.acc=n)}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),D=function(){function t(t){this.type="last",this.ins=t,this.out=o,this.has=!1,this.val=o}return t.prototype._start=function(t){this.out=t,this.has=!1,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o,this.val=o},t.prototype._n=function(t){this.has=!0,this.val=t},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&(this.has?(t._n(this.val),t._c()):t._e(new Error("last() failed because input stream completed")))},t}(),O=function(){function t(t,i){this.type="map",this.ins=i,this.out=o,this.f=t}return t.prototype._start=function(t){this.out=t,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o},t.prototype._n=function(t){var i=this.out;if(i!==o){var n=s(this,t,i);n!==o&&i._n(n)}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),k=function(){function t(t){this.type="remember",this.ins=t,this.out=o}return t.prototype._start=function(t){this.out=t,this.ins._add(t)},t.prototype._stop=function(){this.ins._remove(this.out),this.out=o},t}(),S=function(){function t(t,i){this.type="replaceError",this.ins=i,this.out=o,this.f=t}return t.prototype._start=function(t){this.out=t,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o},t.prototype._n=function(t){var i=this.out;i!==o&&i._n(t)},t.prototype._e=function(t){var i=this.out;if(i!==o)try{this.ins._remove(this),(this.ins=this.f(t))._add(this)}catch(t){i._e(t)}},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),T=function(){function t(t,i){this.type="startWith",this.ins=t,this.out=o,this.val=i}return t.prototype._start=function(t){this.out=t,this.out._n(this.val),this.ins._add(t)},t.prototype._stop=function(){this.ins._remove(this.out),this.out=o},t}(),E=function(){function t(t,i){this.type="take",this.ins=i,this.out=o,this.max=t,this.taken=0}return t.prototype._start=function(t){this.out=t,this.taken=0,this.max<=0?t._c():this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=o},t.prototype._n=function(t){var i=this.out;if(i!==o){var n=++this.taken;n<this.max?i._n(t):n===this.max&&(i._n(t),i._c())}},t.prototype._e=function(t){var i=this.out;i!==o&&i._e(t)},t.prototype._c=function(){var t=this.out;t!==o&&t._c()},t}(),W=function(){function t(t){this._prod=t||o,this._ils=[],this._stopID=o,this._dl=o,this._d=!1,this._target=o,this._err=o}return t.prototype._n=function(t){var i=this._ils,o=i.length;if(this._d&&this._dl._n(t),1==o)i[0]._n(t);else{if(0==o)return;for(var n=r(i),e=0;e<o;e++)n[e]._n(t)}},t.prototype._e=function(t){if(this._err===o){this._err=t;var i=this._ils,n=i.length;if(this._x(),this._d&&this._dl._e(t),1==n)i[0]._e(t);else{if(0==n)return;for(var e=r(i),s=0;s<n;s++)e[s]._e(t)}if(!this._d&&0==n)throw this._err}},t.prototype._c=function(){var t=this._ils,i=t.length;if(this._x(),this._d&&this._dl._c(),1==i)t[0]._c();else{if(0==i)return;for(var o=r(t),n=0;n<i;n++)o[n]._c()}},t.prototype._x=function(){0!==this._ils.length&&(this._prod!==o&&this._prod._stop(),this._err=o,this._ils=[])},t.prototype._stopNow=function(){this._prod._stop(),this._err=o,this._stopID=o},t.prototype._add=function(t){var i=this._target;if(i!==o)return i._add(t);var n=this._ils;if(n.push(t),!(n.length>1))if(this._stopID!==o)clearTimeout(this._stopID),this._stopID=o;else{var r=this._prod;r!==o&&r._start(this)}},t.prototype._remove=function(t){var i=this,n=this._target;if(n!==o)return n._remove(t);var r=this._ils,e=r.indexOf(t);e>-1&&(r.splice(e,1),this._prod!==o&&r.length<=0?(this._err=o,this._stopID=setTimeout(function(){return i._stopNow()})):1===r.length&&this._pruneCycles())},t.prototype._pruneCycles=function(){this._hasNoSinks(this,[])&&this._remove(this._ils[0])},t.prototype._hasNoSinks=function(t,i){if(-1!==i.indexOf(t))return!0;if(t.out===this)return!0;if(t.out&&t.out!==o)return this._hasNoSinks(t.out,i.concat(t));if(t._ils){for(var n=0,r=t._ils.length;n<r;n++)if(!this._hasNoSinks(t._ils[n],i.concat(t)))return!1;return!0}return!1},t.prototype.ctor=function(){return this instanceof P?P:t},t.prototype.addListener=function(t){t._n=t.next||n,t._e=t.error||n,t._c=t.complete||n,this._add(t)},t.prototype.removeListener=function(t){this._remove(t)},t.prototype.subscribe=function(t){return this.addListener(t),new p(this,t)},t.prototype[i.default]=function(){return this},t.create=function(i){if(i){if("function"!=typeof i.start||"function"!=typeof i.stop)throw new Error("producer requires both start and stop functions");u(i)}return new t(i)},t.createWithMemory=function(t){return t&&u(t),new P(t)},t.never=function(){return new t({_start:n,_stop:n})},t.empty=function(){return new t({_start:function(t){t._c()},_stop:n})},t.throw=function(i){return new t({_start:function(t){t._e(i)},_stop:n})},t.from=function(o){if("function"==typeof o[i.default])return t.fromObservable(o);if("function"==typeof o.then)return t.fromPromise(o);if(Array.isArray(o))return t.fromArray(o);throw new TypeError("Type of input to from() must be an Array, Promise, or Observable")},t.of=function(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];return t.fromArray(i)},t.fromArray=function(i){return new t(new l(i))},t.fromPromise=function(i){return new t(new v(i))},t.fromObservable=function(o){if(o.endWhen)return o;var n="function"==typeof o[i.default]?o[i.default]():o;return new t(new _(n))},t.periodic=function(i){return new t(new d(i))},t.prototype._map=function(t){return new(this.ctor())(new O(t,this))},t.prototype.map=function(t){return this._map(t)},t.prototype.mapTo=function(t){var i=this.map(function(){return t});return i._prod.type="mapTo",i},t.prototype.filter=function(i){var o=this._prod;return new t(o instanceof x?new x(e(o.f,i),o.ins):new x(i,this))},t.prototype.take=function(t){return new(this.ctor())(new E(t,this))},t.prototype.drop=function(i){return new t(new w(i,this))},t.prototype.last=function(){return new t(new D(this))},t.prototype.startWith=function(t){return new P(new T(this,t))},t.prototype.endWhen=function(t){return new(this.ctor())(new g(t,this))},t.prototype.fold=function(t,i){return new P(new I(t,i,this))},t.prototype.replaceError=function(t){return new(this.ctor())(new S(t,this))},t.prototype.flatten=function(){this._prod;return new t(new A(this))},t.prototype.compose=function(t){return t(this)},t.prototype.remember=function(){return new P(new k(this))},t.prototype.debug=function(t){return new(this.ctor())(new m(this,t))},t.prototype.imitate=function(t){if(t instanceof P)throw new Error("A MemoryStream was given to imitate(), but it only supports a Stream. Read more about this restriction here: https://github.com/staltz/xstream#faq");this._target=t;for(var i=this._ils,o=i.length,n=0;n<o;n++)t._add(i[n]);this._ils=[]},t.prototype.shamefullySendNext=function(t){this._n(t)},t.prototype.shamefullySendError=function(t){this._e(t)},t.prototype.shamefullySendComplete=function(){this._c()},t.prototype.setDebugListener=function(t){t?(this._d=!0,t._n=t.next||n,t._e=t.error||n,t._c=t.complete||n,this._dl=t):(this._d=!1,this._dl=o)},t.merge=function(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];return new t(new f(i))},t.combine=function(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];return new t(new y(i))},t}();exports.Stream=W;var P=function(i){function n(t){var o=i.call(this,t)||this;return o._has=!1,o}return t(n,i),n.prototype._n=function(t){this._v=t,this._has=!0,i.prototype._n.call(this,t)},n.prototype._add=function(t){var i=this._target;if(i!==o)return i._add(t);var n=this._ils;if(n.push(t),n.length>1)this._has&&t._n(this._v);else if(this._stopID!==o)this._has&&t._n(this._v),clearTimeout(this._stopID),this._stopID=o;else if(this._has)t._n(this._v);else{var r=this._prod;r!==o&&r._start(this)}},n.prototype._stopNow=function(){this._has=!1,i.prototype._stopNow.call(this)},n.prototype._x=function(){this._has=!1,i.prototype._x.call(this)},n.prototype.map=function(t){return this._map(t)},n.prototype.mapTo=function(t){return i.prototype.mapTo.call(this,t)},n.prototype.take=function(t){return i.prototype.take.call(this,t)},n.prototype.endWhen=function(t){return i.prototype.endWhen.call(this,t)},n.prototype.replaceError=function(t){return i.prototype.replaceError.call(this,t)},n.prototype.remember=function(){return this},n.prototype.debug=function(t){return i.prototype.debug.call(this,t)},n}(W);exports.MemoryStream=P;var L=W;exports.default=L;
},{"symbol-observable":"KzwE"}],"tDG6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../index"),i={},o=function(){function t(t,o){this.ins=t,this.type="dropRepeats",this.out=null,this.v=i,this.isEq=o||function(t,i){return t===i}}return t.prototype._start=function(t){this.out=t,this.ins._add(this)},t.prototype._stop=function(){this.ins._remove(this),this.out=null,this.v=i},t.prototype._n=function(t){var o=this.out;if(o){var e=this.v;e!==i&&this.isEq(t,e)||(this.v=t,o._n(t))}},t.prototype._e=function(t){var i=this.out;i&&i._e(t)},t.prototype._c=function(){var t=this.out;t&&t._c()},t}();function e(i){return void 0===i&&(i=void 0),function(e){return new t.Stream(new o(e,i))}}exports.DropRepeatsOperator=o,exports.default=e;
},{"../index":"Ot6f"}],"lsbR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.CircularBuffer=void 0;var t=exports.CircularBuffer=function(){function t(t){this.offset=0,this.buffer=new Float32Array(t),this.offset=0}return t.prototype.write=function(t){this.offset+t.length>this.buffer.length?(this.buffer.set(t.subarray(0,this.buffer.length-this.offset),this.offset),this.buffer.set(t.subarray(this.buffer.length-this.offset)),this.offset=this.buffer.length-this.offset):(this.buffer.set(t,this.offset),this.offset+=t.length)},t.prototype.readLast=function(t){if((t=Math.min(this.buffer.length,t))<=this.offset)return this.buffer.slice(this.offset-t,this.offset);var f=new Float32Array(t);return f.set(this.buffer.subarray(this.buffer.length-(t-this.offset))),f.set(this.buffer.subarray(0,this.offset),t-this.offset),f},t}(),f=exports.default=t;
},{}],"UldJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ofType=exports.isDefined=exports.is=void 0;var e=exports.ofType=function(e){return function(r){return r.key==e}},r=exports.is=function(e){return function(r){return e===r}},t=exports.isDefined=function(e){return void 0!==e};
},{}],"lSg9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AverageAmplitude=void 0;var t=exports.AverageAmplitude=function(){function t(t){this.avg=0,this.sampleCount=t}return t.prototype.write=function(t){var e=t.map(Math.abs).reduce(function(t,e){return t+e});this.avg*=1-t.length/this.sampleCount,this.avg+=e/this.sampleCount},t.prototype.getAverageAmplitude=function(){return this.avg},t}();
},{}],"G5wd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BUFFER_SIZE=void 0;var e=u(require("xstream")),t=u(require("xstream/extra/dropRepeats")),r=u(require("./CircularBuffer")),n=require("../utils"),a=require("./AverageAmplitude");function u(e){return e&&e.__esModule?e:{default:e}}var i=exports.BUFFER_SIZE=2646e3,o=function(e,t,r){var u=new a.AverageAmplitude(r*t);return e.filter((0,n.ofType)("process")).subscribe({next:function(e){return u.write(e.data)}}),e.filter((0,n.ofType)("process")).map(function(){return u.getAverageAmplitude()})},s=function(e,r,a){return e.filter((0,n.ofType)("update_settings")).map(function(e){return e.data.amplitudeThreshold}).filter(n.isDefined).debug().startWith(a).map(function(e){return r.map(function(t){return t>e}).compose((0,t.default)())}).flatten()},f=function(e,t,a,u){var o=new r.default(i);return e.filter((0,n.ofType)("process")).subscribe({next:function(e){return o.write(e.data)}}),u.filter((0,n.is)(!0)).map(function(){var r=a*t;return e.filter((0,n.ofType)("process")).subscribe({next:function(e){r+=e.data.length}}),u.filter((0,n.is)(!1)).map(function(){return o.readLast(r)}).take(1)}).flatten()},l=function(t){return t.filter((0,n.ofType)("start")).map(function(r){var a=r.data,u=a.sampleRate,i=a.silenceDuration,l=a.amplitudeThreshold,p=a.contextDuration,c=o(t,u,i),d=s(t,c,l),m=f(t,u,p,d);return e.default.merge(c.map(function(e){return{key:"average_amplitude",data:e}}),d.filter((0,n.is)(!0)).mapTo({key:"voice_start"}),m.map(function(e){return{key:"voice_end",data:e}})).endWhen(t.filter((0,n.ofType)("stop")))}).flatten()},p=self,c=e.default.create({start:function(e){p.onmessage=function(t){return e.next(t.data)}},stop:function(){p.onmessage=null}});l(c).subscribe({next:p.postMessage.bind(p),error:console.error});
},{"xstream":"Ot6f","xstream/extra/dropRepeats":"tDG6","./CircularBuffer":"lsbR","../utils":"UldJ","./AverageAmplitude":"lSg9"}]},{},["G5wd"], null)
//# sourceMappingURL=worker.1e6ad932.js.map