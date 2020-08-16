/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 17:28:54
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-16 01:17:01
 * @FilePath: \vuex-persisted-state\src\helpers\subscriber.ts
 */
export function subscriber(store) {
  return (handler)=>{
    return store.subscribe(handler)
  }
}