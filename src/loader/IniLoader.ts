/// <reference path="../../typings/tsd.d.ts" />

import IConfigLoader from './../interfaces/IConfigLoader';
import BaseLoader    from './BaseLoader';
import ArrayObjectConverter from './../utils/ArrayObjectConverter';
import * as Ini      from 'ini';
import * as extend   from 'extend';
import * as lodash   from 'lodash';
import * as traverse from 'traverse';

class IniLoader implements IConfigLoader {

  private data:Object = {};
  private path:string;
  private env:string;
  private doc:Object = {};

  public load(path:string, env:string=null):IConfigLoader {

    this.env = env || process.env.NODE_ENV || 'development'

    var bl = new BaseLoader();
    var data = bl.load(path).getData();

    try {
      this.data = data;
      this.doc = this.convertIni(Ini.parse(data));

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

    if(lodash.isObject(this.doc)){

      var defaultCfg = this.doc['default'] || {};
      var envCfg = this.doc[this.env] || {};

      return extend(true, {}, defaultCfg, envCfg);

    }else{
      return {};
    }
  }

  private convertIni(doc:Object):Object {

    // Try to convert strings into numbers/floats
    var doc = traverse(doc).map(function(x){

      if(typeof x == 'string'){
        try{
          var tmpVal = x*1
          if(!isNaN(tmpVal)) {
            this.update(tmpVal);
          }
        }catch(e){}
      }
    });

    // Spread ini keys into JSON hash
    doc = ArrayObjectConverter.convert(doc);

    return doc;
  }
}

export default IniLoader;
