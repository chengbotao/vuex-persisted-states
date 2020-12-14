/*
 * @Description: 常用的接口类型定义
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:30:58
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-12-14 17:52:33
 * @FilePath: \vuex-persisted-states\src\types\index.ts
 */

/**
 * @description: Storage 接口,缓存对象支持 setItem getItem removeItem 方法
 * @param {type}
 * @return {type}
 */
export interface Storage {
  // 设置缓存
  setItem: (key: string, value: any) => void;
  // 获取缓存
  getItem: (key: string) => any;
  // 移出缓存
  removeItem: (key?: string) => void;
}

/**
 * @description: Path 接口,属性值存放缓存位置的多样化
 * @param {type}
 * @return {type}
 */
export interface Path {
  // 缓存的 KEY 值
  key?: string;
  // 缓存的属性名
  paths: string[];
  // 缓存对象
  storage?: Storage;
}

/**
 * @description: Options persistedState 方法的参数接口
 * @param {type}
 * @return {type}
 */
export interface Options {
  // 缓存的 KEY 值
  key?: string;
  // 缓存的属性名
  paths?: string[];
  spreadPaths?: Path[];
  // 缓存对象
  storage?: Storage;
  // 重置方法
  resetMutationType?: string;
  // 获取缓存后公共处理方法
  getState?: (value: string) => any;
  // 设置缓存前公共处理方法
  setState?: (value: any) => string;
  // 过滤可以触发缓存的 Mutation 方法
  filterMutation?: (mutation: any) => boolean;
}

/**
 * @description: Store
 * @param {type}
 * @return {type}
 */
export interface Store {
  state?: Object;
  [propName: string]: any;
}
