(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("test/karma.conf", function(exports, require, module) {
  // Karma configuration

  // base path, that will be used to resolve files and exclude
  basePath = '../';

  // list of files / patterns to load in the browser
  files = [
    JASMINE,
    JASMINE_ADAPTER,

    'public/scripts/vendor.js',
    'public/scripts/app.js',

    'test/vendor/sinon.js',
    'test/vendor/jasmine-sinon.js',
    'test/vendor/jasmine-jquery.js',

    'test/**/*-test.coffee'
  ];

  // test results reporter to use
  // possible values: 'dots', 'progress', 'junit'
  reporters = ['progress'];

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch = true;

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera
  // - Safari (only Mac)
  // - PhantomJS
  // - IE (only Windows)
  browsers = ['PhantomJS'];

  // Continuous Integration mode
  // if true, it capture browsers, run tests and exit
  singleRun = false;

  // compile coffee scripts
  preprocessors = {
    '**/*.coffee': 'coffee'
  };
  
});
window.require.register("test/views/hello-view-test", function(exports, require, module) {
  describe('HelloView', function() {
    return it('should exist', function() {
      var view;

      view = new HelloView;
      return expect(view).toBeDefined();
    });
  });
  
});
