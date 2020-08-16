/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:35:25
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-14 17:38:21
 * @FilePath: \vuex-persisted-state\src\helpers\getState.ts
 */
import { Storage } from './../types/index';
export function getState(key: string, storage: Storage) {
  let value;
  try {
    return (value = storage.getItem(key)) && typeof value != undefined ? JSON.parse(value) : undefined
  } catch (error) {

  }
  return undefined;
}