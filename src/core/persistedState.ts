/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:35:15
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-16 16:56:06
 * @FilePath: \vuex-persisted-state\src\core\persistedState.ts
 */
import { Options } from './../types/index';
import { isPlainObject, deepMerge } from '../helpers/utils';
import { subscriber } from '../helpers/subscriber';
import { setState } from '../helpers/setState';
import { getState } from '../helpers/getState';
import { replaceStater } from '../helpers/replaceStater';


function persistedState(options: Options) {
  const key = options.key || "vuex";
  const storage = options.storage || (window && window.localStorage);
  let savedState;
  let tempState;
  return (store) => {
    tempState = store.state
    savedState = getState(key, storage);
    if (isPlainObject(savedState)) {
      replaceStater(store, deepMerge(store.state, savedState))
    }

    subscriber(store)((mutation, state) => {
      if (mutation.type === "removeItem") {
        if (!mutation.payload) {
          storage.removeItem(key)
          replaceStater(store, deepMerge(state, tempState))
          return;
        } else {
          replaceStater(store, deepMerge(state, tempState))
        }
      }

      setState(key, state, storage)
    })

  }
}
export default persistedState;