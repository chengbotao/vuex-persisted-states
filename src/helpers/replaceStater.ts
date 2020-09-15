/*
 * @Description: 替换 store 的根状态
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-16 11:20:36
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-14 19:05:18
 * @FilePath: \vuex-persisted-states\src\helpers\replaceStater.ts
 */

import { Store } from '../types';

export function replaceStater(store: Store, states: Object) {
  return store.replaceState(states);
}
