/*
 * @Description: 缓存值
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:35:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-12-14 17:56:21
 * @FilePath: \vuex-persisted-states\src\helpers\setState.ts
 */
import { Storage } from './../types/index';
export default function setState(
  key: string,
  value: any,
  storage: Storage,
  callback?: (value: any) => string
) {
  return storage.setItem(
    key,
    callback ? callback(value) : JSON.stringify(value)
  );
}
