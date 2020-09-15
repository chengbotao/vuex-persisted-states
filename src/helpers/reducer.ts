/*
 * @Description:
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-20 14:46:23
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-14 16:04:21
 * @FilePath: \vuex-persisted-states\src\helpers\reducer.ts
 */
import { reduceSetObj, reduceGetObj } from './utils';
export function reducer(state: object, paths: string[]) {
  return Array.isArray(paths)
    ? paths.reduce((subState, path) => {
        return reduceSetObj(subState, path, reduceGetObj(state, path));
      }, {})
    : state;
}
