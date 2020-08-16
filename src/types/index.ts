/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:30:58
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-14 17:10:35
 * @FilePath: \vuex-persisted-state\src\types\index.ts
 */
export interface Storage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key?: string) => void;
}

export interface Options {
  key?: string;
  paths?: string[];
  storage?: Storage;
  getState?: (key: string, storage: Storage) => any;
  setState?: (key: string, state: any, storage: Storage) => void;
}