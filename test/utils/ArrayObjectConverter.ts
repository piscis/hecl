/// <reference path="../../typings/tsd.d.ts" />
import {describe, it} from 'mocha';
import {assert} from 'chai';
import * as path from 'path';
import * as lodash from 'lodash';
import ArrayObjectConverter from './../../src/utils/ArrayObjectConverter';

describe('ArrayObjectConverter', function() {

  var dummyObj1 = {
    'test.level1': 1,
    'test.level2': 2
  };

  var dummyObj2 = {
    'root': {
      'test.level1': 1,
      'test.level2': 2
    }
  };

  var dummyObj3 = {
    'root': {
      'test.level1': 1,
      'test.level2': 2,
      'test.level3.level4': 3
    }
  };

  it('should spread keys separated by "." on the root level', function () {

    var data = ArrayObjectConverter.convert(dummyObj1);
    assert.equal(data['test'].level1, 1);
  });

  it('should spread keys separated by "." on lower level', function () {

    var data1 = ArrayObjectConverter.convert(dummyObj2);
    assert.equal(data1['root'].test.level2, 2);
  });

  it('should spread keys separated by "." over multiple levels on a lower level', function () {

    var data2 = ArrayObjectConverter.convert(dummyObj3);
    assert.equal(data2['root'].test.level3.level4, 3);
  });
});