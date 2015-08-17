/// <reference path="../typings/tsd.d.ts" />

import ConfigRegistry from './../src/ConfigRegistry';
import {describe, it} from 'mocha';
import {assert} from 'chai';
import * as path from 'path';
import * as lodash from 'lodash';

describe('ConfigRegistry', function(){

  var registry:ConfigRegistry;
  var dummyData1:Object = {
    production: {
      database: {
        port: 3333
      }
    }
  };

  var dummyData2:Object = {
    production: {
      database: {
        port: 6666
      }
    }
  };

  beforeEach(function(){
    registry = new ConfigRegistry();
    process.env.dummyRegistryConfigData1 = JSON.stringify(dummyData1);
    process.env.dummyRegistryConfigData2 = JSON.stringify(dummyData2);
  });

  afterEach(function(){
    registry = null;
    delete process.env.dummyRegistryConfigData1
    delete process.env.dummyRegistryConfigData2
  });

  it('should load one file', function(){
    var filepath:string = path.resolve(__dirname, './fixtures/stub_cfg_1.json');
    registry.load(filepath);
    assert.equal(true, true);
  });

  it('should load multiple config files at once', function(){
    var filepath1:string = path.resolve(__dirname, './fixtures/stub_cfg_1.json');
    var filepath2:string = path.resolve(__dirname, './fixtures/stub_cfg_1.yml');

    registry.load([filepath1,filepath2]);
    assert.equal(true, true);
  });

  it('should load config files and merge them via environment config', function(){
    var filepath1:string = path.resolve(__dirname, './fixtures/stub_cfg_1.json');
    var filepath2:string = path.resolve(__dirname, './fixtures/stub_cfg_2.yml');
    var configList:Array = [filepath1,filepath2, 'dummyRegistryConfigData1'];

    var data = registry.load(configList, 'production');
    var cfg = data.getData();

    assert.equal(3333, cfg.database.port);
  });

  it('should reload config files', function(){

    var filepath1:string = path.resolve(__dirname, './fixtures/stub_cfg_1.json');
    var filepath2:string = path.resolve(__dirname, './fixtures/stub_cfg_2.yml');
    var configList:Array = [filepath1,filepath2, 'dummyRegistryConfigData1'];

    var data = registry.load(configList, 'production');
    var cfg = data.getData();

    assert.equal(cfg.database.port, 3333);

    process.env.dummyRegistryConfigData1 = process.env.dummyRegistryConfigData2
    var data = registry.reload();
    var cfg = data.getData();
    assert.equal(cfg.database.port, 6666);
  });

  it('should a throw errors if files do not exist', function(){

    assert.throws(function(){

      var filepath1:string = path.resolve(__dirname, './fixtures/NONE_EXISTING_FILE.yml');
      var data = registry.load([filepath1], 'production');

    },/.*ENOENT.*/);
  });

});