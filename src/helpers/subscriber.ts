/*
 * @Description: 订阅 store 的 mutation
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:28:54
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-12-14 17:51:02
 * @FilePath: \vuex-persisted-states\src\helpers\subscriber.ts
 */

import { Store } from '../types';

// store 的 subscribe 方法: 触发 mutation 方法的预操作
export default function subscriber(store: Store) {
  return (handler: (mutation: any, state: any) => void) => {
    return store.subscribe(handler);
  };
}
