/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:30:58
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-21 17:29:04
 * @FilePath: \vuex-persisted-states\src\types\index.ts
 */
export interface Storage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key?: string) => void;
}
export interface Path {
  key?: string;
  paths: string[];
  storage: Storage;
}

export interface Options {
  key?: string;
  paths?: string[];
  spreadPaths?: Path[];
  storage?: Storage;
  resetMutationType?: string
  getState?: (key: string, storage: Storage) => any;
  setState?: (key: string, state: any, storage: Storage) => void;
  filterMutation?: (mutation) => boolean
}