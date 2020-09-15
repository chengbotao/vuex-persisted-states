/*
 * @Description: 常用的接口类型定义
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:30:58
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-15 10:21:29
 * @FilePath: \chengbt-npm\vuex-persisted-states\src\types\index.ts
 */

/**
 * @description: Storage 接口,缓存对象支持 setItem getItem removeItem 方法
 * @param {type}
 * @return {type}
 */
export interface Storage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key?: string) => void;
}

/**
 * @description: Path 接口,属性值存放缓存位置的多样化
 * @param {type}
 * @return {type}
 */
export interface Path {
  key?: string;
  paths: string[];
  storage?: Storage;
}

/**
 * @description: Options persistedState 方法的参数接口
 * @param {type}
 * @return {type}
 */
export interface Options {
  key?: string;
  paths?: string[];
  spreadPaths?: Path[];
  storage?: Storage;
  resetMutationType?: string;
  getState?: (value: string) => any;
  setState?: (value: any) => string;
  filterMutation?: (mutation) => boolean;
}

/**
 * @description: Store
 * @param {type}
 * @return {type}
 */
export interface Store {
  state: Object;
  [propName: string]: any;
}
