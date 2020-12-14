/*
 * @Description:
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:35:25
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-14 18:40:31
 * @FilePath: \vuex-persisted-states\src\helpers\getState.ts
 */
import { Storage } from './../types/index';
export default function getState(
  key: string,
  storage: Storage,
  callback?: (value: string) => any
) {
  let value: string = storage.getItem(key);
  try {
    // tslint:disable-next-line: triple-equals
    return typeof value != undefined
      ? callback
        ? callback(value)
        : JSON.parse(value)
      : undefined;
    // tslint:disable-next-line: no-empty
  } catch (error) {}
  return undefined;
}
