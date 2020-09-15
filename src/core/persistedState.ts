/*
 * @Description: persistedState
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:35:15
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-09-15 10:01:54
 * @FilePath: \chengbt-npm\vuex-persisted-states\src\core\persistedState.ts
 */
import { Options, Store } from './../types/index';
import {
  isPlainObject,
  deepMerge,
  reduceSetObj,
  reduceGetObj,
} from '../helpers/utils';
import { subscriber } from '../helpers/subscriber';
import { setState } from '../helpers/setState';
import { getState } from '../helpers/getState';
import { replaceStater } from '../helpers/replaceStater';
import { reducer } from '../helpers/reducer';
import { filterMutation } from '../helpers/filterMutation';

function persistedState(options: Options = {}) {
  const key = options.key || 'vuex';
  const storage = options.storage || (window && window.localStorage);
  const resetMutationType = options.resetMutationType || 'resetStates';
  let spreadPaths = options.spreadPaths || [];
  let savedState: any;
  let tempState: any;

  // 将 paths 整合到 spreadPaths
  spreadPaths.push({ key: key, storage: storage, paths: options.paths });
  return (store: Store) => {
    tempState = store.state;
    savedState = spreadPaths.reduce((acc, cur) => {
      return deepMerge(
        acc,
        getState(cur.key || key, cur.storage || storage, options.getState)
      );
    }, {});

    if (isPlainObject(savedState)) {
      replaceStater(store, deepMerge(store.state, savedState));
    }

    subscriber(store)((mutation, state) => {
      if (mutation.type === resetMutationType) {
        if (!mutation.payload) {
          spreadPaths.forEach((item) => {
            (item.storage || storage).removeItem(item.key || key);
          });
          replaceStater(store, deepMerge(state, tempState));
        } else {
          let payloads = mutation.payload.reduce((subState, path) => {
            return reduceSetObj(subState, path, reduceGetObj(tempState, path));
          }, {});
          state = deepMerge(state, payloads);
          replaceStater(store, state);
          spreadPaths.forEach((item) => {
            let savedKey = getState(
              item.key || key,
              item.storage || storage,
              options.getState
            );
            setState(
              item.key || key,
              deepMerge(savedKey, reducer(state, item.paths)),
              item.storage || storage,
              options.setState
            );
          });
        }
        return;
      }

      if ((options.filterMutation || filterMutation)(mutation)) {
        spreadPaths.forEach((item) => {
          let savedKey = getState(
            item.key || key,
            item.storage || storage,
            options.getState
          );
          setState(
            item.key || key,
            deepMerge(savedKey, reducer(state, item.paths)),
            item.storage || storage,
            options.setState
          );
        });
      }
    });
  };
}
export default persistedState;
