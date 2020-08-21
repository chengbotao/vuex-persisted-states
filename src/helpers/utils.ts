/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:31:13
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-21 11:44:40
 * @FilePath: \vuex-persisted-states\src\helpers\utils.ts
 */
const toString = Object.prototype.toString;

/**
 * @description: 判断普通对象
 * @param {any} 任意值
 * @return {Boolean} true | false
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === "[object Object]";
}

export function isNullObject(val: Object): Boolean {
  return val == undefined || Object.keys(val).length === 0;
}

export function isString(val: any): val is String {
  return toString.call(val) === "[object String]"
}

/**
 * @description: 对象深拷贝
 * @param {any[]} 
 * @return {Object} 
 */
export function deepMerge(...objects: any[]): Object {
  const result = Object.create(null)
  objects.forEach(obj => {
    if (!isNullObject(obj)) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */
export function reduceGetObj(object: object, path: string) {
  let tempPath = isString(path) ? path.split(".") : path
  return tempPath.reduce((obj, key) => {
    return obj && obj[key]
  }, object)
}

/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */
export function reduceSetObj(object: object, path: string, val: any) {
  let tempPath = isString(path) ? path.split(".") : path
  return (tempPath.slice(0, -1).reduce((obj, key) => {
    return obj[key] = obj[key] || {};
  }, object)[tempPath.pop()] = val), object;
}