/// <reference path="../../typings/tsd.d.ts" />

import IConfigLoader from './../interfaces/IConfigLoader';
import BaseLoader from './BaseLoader';
import * as Yaml from 'js-yaml';
import * as extend from 'extend';
import * as lodash from 'lodash';


class YamlLoader implements IConfigLoader {

  private data:Object = {};
  private path:string;
  private env:string;
  private doc:Object = {};

  public load(path:string, env:string=null):IConfigLoader {

    this.env = env || process.env.NODE_ENV || 'development'

    var bl = new BaseLoader();
    var data = bl.load(path).getData();

    try {
      var doc = Yaml.safeLoad(data);
      this.data = data;
      this.doc = doc;
    } catch (e) {
      this.data = {};
      this.doc = {};
    }

    return this;
  }

  public reload():IConfigLoader {
    return this.load(this.path,this.env);
  }

  public getData():any {

    if(lodash.isObject(this.doc)){

      var defaultCfg = this.doc['default'] || {};
      var envCfg = this.doc[this.env] || {};

      return extend(true, {}, defaultCfg, envCfg);

    }else{
      return {};
    }
  }

}

export default YamlLoader;
