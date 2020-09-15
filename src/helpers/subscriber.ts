/*
 * @Description: 订阅 store 的 mutation
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:28:54
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-14 19:04:24
 * @FilePath: \vuex-persisted-states\src\helpers\subscriber.ts
 */

import { Store } from '../types';

export function subscriber(store: Store) {
  return (handler: (mutation: any, state: any) => void) => {
    return store.subscribe(handler);
  };
}
