/// <reference path="../../typings/tsd.d.ts" />
import {describe, it} from 'mocha';
import {assert} from 'chai';
import * as path from 'path';
import * as lodash from 'lodash';
import IConfigLoader from './../../src/interfaces/IConfigLoader';
import JSONFileLoader from './../../src/loader/JSONFileLoader';

describe('JSONFileLoader', function(){

  var loader:JSONFileLoader;

  beforeEach(function(){
    loader = new JSONFileLoader();
  });

  afterEach(function(){
    loader = null;
  });

  it('should load a file without errors', function(){
    var filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_1.json');
    loader.load(filepath);
    assert.equal(true, true);
  });

  it('should return a JSON structure', function(){
    var filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_1.json');
    loader.load(filepath);
    var data = loader.getData();
    assert.notDeepEqual({}, data);
    assert.isTrue(lodash.isObject(data));
  });

  it('should return respect environment flags', function(){
    var filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_1.json');
    loader.load(filepath, 'production');
    var data = loader.getData();
    assert.equal(8000, data.server.port);
  });

  it('should return a empty object when config is not valid', function(){
    var filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_parse_error.json');
    loader.load(filepath);
    var result = loader.getData();
    assert.deepEqual({},result);
  });
});