/*
 * @Description: 替换 store 的根状态
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-16 11:20:36
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-12-14 17:51:31
 * @FilePath: \vuex-persisted-states\src\helpers\replaceStater.ts
 */

import { Store } from '../types';

// store 的 replaceState 方法: 替换 state 的数据
export default function replaceStater(store: Store, states: Object) {
  return store.replaceState(states);
}
