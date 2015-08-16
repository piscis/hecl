/// <reference path="../../typings/tsd.d.ts" />

import IConfigLoader from './../interfaces/IConfigLoader';
import * as fs from 'fs';

class BaseLoader implements IConfigLoader {

  private data:Object = null;
  private path:string;
  private env:string;

  public constructor(){}

  public load(path:string, env:string=null):IConfigLoader {
    this.data = fs.readFileSync(path, 'utf8');
    this.path = path;
    this.env = env;

    return this;
  }

  public reload():IConfigLoader {
    return this.load(this.path, this.env);
  }

  public getData():any {
    return this.data;
  }
}

export default BaseLoader;