/// <reference path="../../typings/tsd.d.ts" />

import IConfigLoader from './../interfaces/IConfigLoader';
import BaseLoader    from './BaseFileLoader';
import * as extend   from 'extend';
import * as lodash   from 'lodash';

class EnvironmentLoader implements IConfigLoader {

  private data:Object = {};
  private path:string;
  private env:string;
  private doc:Object = {};

  public load(pathvar:string, env:string=null):IConfigLoader {

    this.env = env || process.env.NODE_ENV || 'development'

    try {
      this.data = process.env.hasOwnProperty(pathvar);
      this.doc = this._convertEnvironmentVariable(pathvar);

    } catch (e) {
      this.data = {};
      this.doc = {};
    }

    return this;
  }

  public reload():IConfigLoader {
    return this.load(this.path, this.env);
  }

  public getData():any {

    if(lodash.isObject(this.doc)) {

      var defaultCfg = this.doc['default'] || {};
      var envCfg = this.doc[this.env] || {};

      return extend(true, {}, defaultCfg, envCfg);

    } else {
      return {};
    }
  }

  private _convertEnvironmentVariable(pathvar: string):Object {

    var doc;

    if(process.env.hasOwnProperty(pathvar)) {

      try{
        doc = JSON.parse(process.env[pathvar]);
      }catch(e){
        doc = {}
      }
    }

    return doc;
  }
}

export default EnvironmentLoader;
