/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:31:13
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-14 17:02:07
 * @FilePath: \vuex-persisted-state\src\helpers\utils.ts
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
  return Object.keys(val).length === 0;
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