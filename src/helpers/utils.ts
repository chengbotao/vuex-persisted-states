/*
 * @Description: 常用的工具类
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:31:13
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-15 10:25:06
 * @FilePath: \chengbt-npm\vuex-persisted-states\src\helpers\utils.ts
 */

const toString = Object.prototype.toString;

/**
 * @description: 判断普通对象
 * @param {any} 任意值
 * @return {Boolean} true | false
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

/**
 * @description: 判断对象是否为空
 * @param {Object}
 * @return {Boolean}
 */
export function isNullObject(val: Object): Boolean {
  // tslint:disable-next-line: triple-equals
  return val == undefined || Object.keys(val).length === 0;
}

/**
 * @description: 判断是否为字符串
 * @param {any}
 * @return {Boolean1}
 */
export function isString(val: any): val is String {
  return toString.call(val) === '[object String]';
}

/**
 * @description: 对象深拷贝
 * @param {any[]}
 * @return {Object}
 */
export function deepMerge(...objects: any[]): Object {
  const result = Object.create(null);
  objects.forEach((obj) => {
    if (!isNullObject(obj)) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}

/**
 * @description: 使用 Array 的 reduce 方法, 根据传入的对象及对象的引用获取引用的值 如: reduceGetObj({a:{b:"3"}},"a.b") => 3 || reduceGetObj({a:{b:"3"}},["a","b"]) => 3
 * @param {object}
 * @param {string|string[]}
 * @return {any}
 */
export function reduceGetObj(object: object, path: string | string[]): object {
  let tempPath = isString(path) ? path.split('.') : path;
  return tempPath.reduce((obj, key) => {
    return obj && obj[key];
  }, object);
}

/**
 * @description: 使用 Array 的 reduce 方法, 根据传入的对象、对象的引用设置值, 如: reduceSetObj({a:{b:"3"}},"a.c", 4) => {a:{b:"3",c:4}} || reduceGetObj({a:{b:"3"}},["a","b"],4) => {a:{b:"3",c:4}}
 * @param {object}
 * @param {string|string[]}
 * @param {any}
 * @return {object}
 */
export function reduceSetObj(object: object, path: string, val: any): object {
  let tempPath = isString(path) ? path.split('.') : path;
  return (
    (tempPath.slice(0, -1).reduce((obj, key) => {
      return (obj[key] = obj[key] || {});
    }, object)[tempPath.pop()] = val),
    object
  );
}
