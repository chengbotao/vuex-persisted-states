/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:35:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-14 17:41:05
 * @FilePath: \vuex-persisted-state\src\helpers\setState.ts
 */
import { Storage } from './../types/index';
export function setState(key: string, value: any, storage: Storage) {
  return storage.setItem(key, JSON.stringify(value));
}