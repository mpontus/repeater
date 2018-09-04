// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"RoundRobin.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var RoundRobin = /** @class */function () {
    function RoundRobin(size) {
        this.offset = 0;
        this.buffer = new Float32Array(size);
        this.offset = 0;
    }
    RoundRobin.prototype.write = function (data) {
        if (this.offset + data.length > this.buffer.length) {
            this.buffer.set(data.subarray(0, this.buffer.length - this.offset), this.offset);
            this.buffer.set(data.subarray(this.buffer.length - this.offset));
            this.offset = this.buffer.length - this.offset;
        } else {
            this.buffer.set(data, this.offset);
            this.offset += data.length;
        }
    };
    RoundRobin.prototype.readLast = function (length) {
        length = Math.min(this.buffer.length, length);
        if (length <= this.offset) {
            return this.buffer.slice(this.offset - length, this.offset);
        }
        var output = new Float32Array(length);
        output.set(this.buffer.subarray(this.buffer.length - (length - this.offset)));
        output.set(this.buffer.subarray(0, this.offset), length - this.offset);
        return output;
    };
    return RoundRobin;
}();
exports.RoundRobin = RoundRobin;
exports.default = RoundRobin;
},{}],"VoiceDetector.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var AverageAmplitudeVoiceDetector = /** @class */function () {
    function AverageAmplitudeVoiceDetector(threshold, sampleCount) {
        this.avg = 0;
        this.sampleCount = sampleCount;
        this.threshold = threshold;
    }
    AverageAmplitudeVoiceDetector.prototype.write = function (data) {
        var sum = data.map(Math.abs).reduce(function (a, b) {
            return a + b;
        });
        this.avg *= 1 - data.length / this.sampleCount;
        this.avg += sum / this.sampleCount;
    };
    AverageAmplitudeVoiceDetector.prototype.isHearingVoice = function () {
        return this.avg > this.threshold;
    };
    return AverageAmplitudeVoiceDetector;
}();
exports.AverageAmplitudeVoiceDetector = AverageAmplitudeVoiceDetector;
exports.default = AverageAmplitudeVoiceDetector;
},{}],"worker.ts":[function(require,module,exports) {
"use strict";

var _RoundRobin = require("./RoundRobin");

var _RoundRobin2 = _interopRequireDefault(_RoundRobin);

var _VoiceDetector = require("./VoiceDetector");

var _VoiceDetector2 = _interopRequireDefault(_VoiceDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AMPLITUDE_THRESHOLD = 0.02;
var SAMPLE_RATE = 44100;
var MAX_DURATION = 60;
var SILENCE_DURATION = 0.5;
var ctx = self;
var buffer = new _RoundRobin2.default(MAX_DURATION * SAMPLE_RATE);
var voiceDetector = new _VoiceDetector2.default(AMPLITUDE_THRESHOLD, SILENCE_DURATION * SAMPLE_RATE);
var recording = false;
var recordingSize = 0;
ctx.onmessage = function (e) {
    var pcm = e.data;
    voiceDetector.write(pcm);
    buffer.write(pcm);
    var isHearingVoice = voiceDetector.isHearingVoice();
    if (!recording && isHearingVoice) {
        recording = true;
        recordingSize = 0;
        ctx.postMessage({ type: "voice_start" });
    } else if (recording) {
        recordingSize += pcm.length;
    }
    if (recording && !isHearingVoice) {
        var audio = buffer.readLast(recordingSize + SILENCE_DURATION * SAMPLE_RATE);
        ctx.postMessage({
            type: "voice_end",
            payload: audio
        });
        recording = false;
    }
};
},{"./RoundRobin":"RoundRobin.ts","./VoiceDetector":"VoiceDetector.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '44351' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","worker.ts"], null)
//# sourceMappingURL=/worker.3c52080a.map