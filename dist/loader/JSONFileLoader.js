var BaseFileLoader_1=require("./BaseFileLoader"),extend=require("extend"),lodash=require("lodash"),JSONFileLoader=function(){function e(){this.data={},this.doc={}}return e.prototype.load=function(e,t){void 0===t&&(t=null),this.env=t||process.env.NODE_ENV||"development";var a=new BaseFileLoader_1["default"],o=a.load(e).getData();try{var r=JSON.parse(o);this.data=o,this.doc=r}catch(i){this.data={},this.doc={}}return this},e.prototype.reload=function(){return this.load(this.path,this.env)},e.prototype.getData=function(){if(lodash.isObject(this.doc)){var e=this.doc["default"]||{},t=this.doc[this.env]||{};return extend(!0,{},e,t)}return{}},e}();exports["default"]=JSONFileLoader;