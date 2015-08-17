/// <reference path="../typings/tsd.d.ts" />

import IConfigLoader     from './interfaces/IConfigLoader';
import EnvironmentLoader from './loader/EnvironmentLoader';
import JSONFileLoader    from './loader/JSONFileLoader';
import YamlFileLoader    from './loader/YamlFileLoader';
import IniFileLoader     from './loader/IniFileLoader';
import * as fs           from 'fs';
import * as path         from 'path';
import * as extend       from 'extend';
import * as _            from 'lodash';

class ConfigRegistry {

  private data: Object = null;
  private config: any;
  private env: string;
  private configList: IConfigLoader[];

  public constructor(){}

  public load(config:any, env:string=null):ConfigRegistry {

    this.config = config;
    this.env = env;
    this.configList = this._loadConfig(config, env);
    this.data = this._mergeConfig();

    return this;
  }

  public reload():ConfigRegistry {
    return this.load(this.config, this.env);
  }

  public getData():any {
    return this.data;
  }

  private _loadConfig(config:any, env:string=null):IConfigLoader[] {

    if(_.isArray(config)){

      var configList = [];

      config.forEach((cfg)=>{
        configList.push(ConfigRegistry._loadSingleConfig(cfg,env));
      });

      return configList;

    }else{
      return [ConfigRegistry._loadSingleConfig(config,env)];
    }
  }

  private static _loadSingleConfig(config:any, env:string=null):IConfigLoader {

    var ext = path.extname(config) || '';
    var loader:IConfigLoader;

    switch(ext.toLowerCase()){

      case ".json":
      case ".js":
        loader = new JSONFileLoader();
        break;
      case ".yml":
      case ".yaml":
        loader = new YamlFileLoader();
        break;
      case ".ini":
        loader = new IniFileLoader();
        break;
      case "":
        loader = new EnvironmentLoader();
        break;
      default:
        throw new Error(`Config loader for extention "${ext}" is not implemented.`);
        // break
    }

    return loader.load(config, env);
  }

  private _mergeConfig():Object {

    var mergedConfig:Object = {};

    this.configList.forEach(function(loader){
      mergedConfig = extend(true,{}, mergedConfig, loader.getData());
    });

    return mergedConfig;
  }
}

export default ConfigRegistry;