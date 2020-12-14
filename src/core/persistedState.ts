/*
 * @Description: persistedState
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:35:15
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-12-14 18:09:07
 * @FilePath: \vuex-persisted-states\src\core\persistedState.ts
 */
import { Options, Store } from './../types/index';
import {
  isPlainObject,
  deepMerge,
  reduceSetObj,
  reduceGetObj,
} from '../helpers/utils';
import {
  subscriber,
  setState,
  getState,
  replaceStater,
  reducer,
  filterMutation,
} from '../helpers';

export default function persistedState(options: Options = {}) {
  const key: string = options.key || 'vuex';
  const storage = options.storage || (window && window.localStorage);
  const resetMutationType: string = options.resetMutationType || 'resetStates';
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
