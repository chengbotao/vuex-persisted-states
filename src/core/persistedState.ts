/*
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:35:15
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-21 17:38:48
 * @FilePath: \vuex-persisted-states\src\core\persistedState.ts
 */
import { Options } from './../types/index';
import { isPlainObject, deepMerge, reduceSetObj, reduceGetObj } from '../helpers/utils';
import { subscriber } from '../helpers/subscriber';
import { setState } from '../helpers/setState';
import { getState } from '../helpers/getState';
import { replaceStater } from '../helpers/replaceStater';
import { reducer } from '../helpers/reducer';
import { filterMutation } from '../helpers/filterMutation';


function persistedState(options: Options = {}) {
  const key = options.key || "vuex";
  const storage = options.storage || (window && window.localStorage);
  const resetMutationType = options.resetMutationType || "resetStates";
  let spreadPaths = options.spreadPaths || [];
  spreadPaths.push({ key: key, storage: storage, paths: options.paths })
  let savedState;
  let tempState;
  return (store) => {
    tempState = store.state
    savedState = spreadPaths.reduce((acc, cur) => {
      return deepMerge(acc, (options.getState || getState)(cur.key || key, cur.storage))
    }, {})
    if (isPlainObject(savedState)) {
      replaceStater(store, deepMerge(store.state, savedState))
    }

    subscriber(store)((mutation, state) => {
      if (mutation.type === resetMutationType) {
        if (!mutation.payload) {
          spreadPaths.forEach((item) => {
            item.storage.removeItem(item.key || key)
          })
          replaceStater(store, deepMerge(state, tempState))
        } else {
          let payloads = mutation.payload.reduce((subState, path) => {
            return reduceSetObj(subState, path, reduceGetObj(tempState, path))
          }, {})
          state = deepMerge(state, payloads);
          replaceStater(store, state)
          spreadPaths.forEach((item) => {
            (options.setState || setState)(item.key || key, reducer(state, item.paths), item.storage);
          })
        }
        return;
      }

      if ((options.filterMutation || filterMutation)(mutation)) {
        spreadPaths.forEach((item) => {
          (options.setState || setState)(item.key || key, reducer(state, item.paths), item.storage);
        })
      }
    })

  }
}
export default persistedState;