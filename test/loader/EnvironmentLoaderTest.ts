/// <reference path="../../typings/tsd.d.ts" />
import {describe, it} from 'mocha';
import {assert} from 'chai';
import * as path from 'path';
import * as lodash from 'lodash';
import IConfigLoader from './../../src/interfaces/IConfigLoader';
import EnvironmentLoader from './../../src/loader/EnvironmentLoader';

describe('EnvironmentLoader', function(){

  var loader:EnvironmentLoader;
  var dummyData1 = {
    default: {
      foo: {
        bar: 2
      }
    }
  };

  var dummyData2 = {
    default: {
      foo: {
        bar: 2
      }
    },
    production: {
      foo: {
        bar: 3
      }
    }
  };

  beforeEach(function(){

    process.env.dummyData1 = JSON.stringify(dummyData1);
    process.env.dummyData2 = JSON.stringify(dummyData2);
    loader = new EnvironmentLoader();
  });

  afterEach(function(){
    loader = null;
  });

  it('should load a JSON string from the enviroment variable', function(){
    var d = loader.load('dummyData1');
    var data = d.getData();

    assert.equal(dummyData1.default.foo.bar, data['foo'].bar);
  });

  it('should load and merge JSON strings from the environment variables', function(){
    var d = loader.load('dummyData2', 'production');
    var data = d.getData();

    assert.equal(dummyData2.production.foo.bar, data['foo'].bar);
  });
});