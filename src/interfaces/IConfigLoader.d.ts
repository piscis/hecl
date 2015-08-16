/// <reference no-default-lib="true"/>

interface IConfigLoader {
  load(path:string, env:string = null): IConfigLoader;
  reload(): IConfigLoader;
  getData(): any;
}

export default 'IConfigLoader';