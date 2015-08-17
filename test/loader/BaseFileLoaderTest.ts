/// <reference path="../../typings/tsd.d.ts" />
import {describe, it} from 'mocha';
import {assert} from 'chai';
import * as path from 'path';
import * as lodash from 'lodash';
import IConfigLoader from './../../src/interfaces/IConfigLoader';
import BaseFileLoader from './../../src/loader/BaseFileLoader';

describe('BaseFileLoader', function(){

  var loader:BaseFileLoader;

  beforeEach(function(){
    loader = new BaseFileLoader();
  });

  afterEach(function(){
    loader = null;
  });

  it('should load a file without errors', function(){
    var filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_1.yml');
    loader.load(filepath);
    assert.equal(true, true);
  });

  it('should return the content of the file', function(){
    let filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_1.yml');
    let result:IConfigLoader = loader.load(filepath);
    var length:number = result.getData().toString().length;
    assert.ok(true,length==295);
  });

  it('should reload the file', function(){
    var filepath:string = path.resolve(__dirname, './../fixtures/stub_cfg_1.yml');
    var result:IConfigLoader = loader.load(filepath);
    var length1:number = result.getData().toString().length;
    loader.reload();
    var length2:number = result.getData().toString().length;

    assert.isTrue(length1==length2);
  });


  it('should throw an error if file does not exist', function(){
    assert.throws(function(){
      var filepath:string = path.resolve(__dirname, './../fixtures/DOES_NOT_EXIST.cfg');
      var result:IConfigLoader = loader.load(filepath);
    },/.*ENOENT.*/, 'unexpected error');
  });
});