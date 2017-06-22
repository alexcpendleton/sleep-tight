'use strict';
var IconResolver = require('./../../main/js/core/IconResolver.js');
var assert = require('chai').assert;
var path = require('path');

describe('constructor', function() {
  it(`sets platform to first parameter`, function() {
    var platform = "whatevs";
    var resolver = new IconResolver(platform);
    assert.equal(platform, resolver.platform);
  })
});

describe('resolve', function() {
  it(`returns path.join(rootPath, resourcePath, win32FileName) when platform is win32`, function() {
    var resolver = new IconResolver("win32");
    resolver.rootPath = "/win/xyz"
    resolver.win32FileName = "win32.ico";
    resolver.resourcePath = "../res/";
    var result = resolver.resolve();
    assert.equal("/win/res/win32.ico", result);
  });
  it(`returns {appPath}/resources/IconTemplate.png when platform is not win32`, function() {
    var resolver = new IconResolver("win32");
    resolver.rootPath = "/other/xyz"
    resolver.win32FileName = "icon.png";
    resolver.resourcePath = "../res/";
    var result = resolver.resolve();
    assert.equal("/other/res/icon.png", result);
  });
});
