/// <reference path="../../typings/tsd.d.ts" />

class ArrayObjectConverter {

  public static eachKeyValue(obj:Object, fun:any):void {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        fun(i, obj[i]);
      }
    }
  }

  public static convert(obj: Object):Object {
    var result = {};
    ArrayObjectConverter.eachKeyValue(obj, function (ns, value) {
      var parts = ns.split(".");
      var last = parts.pop();
      var node = result;
      parts.forEach(function (key) {
        node = node[key] = node[key] || {};
      });

      if(typeof value == 'object'){
        node[last] = ArrayObjectConverter.convert(value);
      }else{
        node[last] = value;
      }

    });
    return result;
  }
}

export default ArrayObjectConverter;