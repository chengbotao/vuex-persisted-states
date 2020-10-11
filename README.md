# vuex-persisted-states

> Keep your vuex states between page reloads.
>
> **在页面重新加载之间保持您的 vuex 状态**
>
> 原理: 借助缓存机制来存储 vuex 状态

## 安装(Install)

```bash
npm install vuex-persisted-states -D

yarn add vuex-persisted-states -D

```

## 使用(Usage)

### 基础用法

> 在 **vuex** 的 **index** 文件中引入
>
> 默认将所有的 **state** 存储到 **window.localStorage**

```js
import Vuex from 'vuex';
import vuexPersistedStates from 'vuex-persisted-states';

const store = new Vuex.Store({
  // ...
  plugins: [vuexPersistedStates()],
});
```

### 参数配置(options)

- **key**

  > key 缓存的标志，来修改或获取缓存的值
  >
  > 默认缓存的 key 为 vuex

  ```js
  // ...
  const store = new Vuex.Store({
    // ...
    plugins: [
      vuexPersistedStates({
        // 修改 key 为 storage
        key: 'storage',
      }),
    ],
  });
  ```

- **storage**

  > 缓存的机制
  >
  > localStorage 、sessionStorage、js-cookie、cookie...

  ```js
  // ...
  const store = new Vuex.Store({
    // ...
    plugins: [
      vuexPersistedStates({
        // 修改存储的位置
        storage: window.sessionStorage,
      }),
    ],
  });
  ```

- **paths**

  > 缓存状态的集合

  ```js
  // ...
  const store = new Vuex.Store({
    state: {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    },
    // ...
    plugins: [
      vuexPersistedStates({
        // 缓存 a 和 b.c 的状态
        paths: ['a', 'b.c'],
      }),
    ],
  });
  ```

- **spreadPaths**

  > paths 的集合默认是缓存到 storage 中
  >
  > **spreadPaths** 可以将不同的状态属性缓存的位置不一样

  ```js
  // ...
  const store = new Vuex.Store({
    state: {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    },
    // ...
    plugins: [
      vuexPersistedStates({
        // 缓存 a 到 window.sessionStorage
        // 缓存 b 到 window.localStorage
        spreadPaths: [
          {
            storage: window.sessionStorage,
            // 修改不同 storage 的 key
            key: 'session',
            paths: ['a'],
          },
          {
            paths: ['b'],
          },
        ],
      }),
    ],
  });
  ```

- **resetMutationType**

  > 触发还原 state 状态的 mutation 方法
  >
  > 默认声明一个 **resetStates**方法的 mutation 方法

  ```js
  // ...
  const store = new Vuex.Store({
    state: {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    },
    mutations: {
      resetStates(state, params) {
        return;
      },
      // cleanStates(state, params){
      //   return;
      // }
    },
    // ...
    plugins: [
      vuexPersistedStates({
        // 修改重置 states 的 mutations 的方法
        // resetMutationType: "cleanStates"
      }),
    ],
  });

  // 在组件内调用
  // params 不传值则还原所有的state的状态
  // params = ["a"]  接受 string[] 来还原指定的 state 状态
  this.$store.commit('resetStates');
  // this.$store.commit("cleanStates")
  // this.$store.commit("resetStates",["a"])
  // this.$store.commit("cleanStates",["a"])
  ```

- **filterMutation**

  > 过滤那些 mutation 方法不需要进行缓存操作 ,减少不必要的代码运行

  ```js
  // ...
  const store = new Vuex.Store({
    state: {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    },
    // ...
    plugins: [
      vuexPersistedStates({
        filterMutation: (mutation) => {
          // 根据mutation type 过滤掉 cleanStates 方法
          if (mutation.type !== 'resetStates') {
            return true;
          }
          return false;
        },
      }),
    ],
  });
  ```

- 对状态值存储做安全处理

  > 对值进行加密存储

  ```js
  // ...
  import { Base64 } from 'js-base64';

  const store = new Vuex.Store({
    // ...
    plugins: [
      vuexPersistedState({
        setState(value) {
          // 存加密
          return Base64.encode(JSON.stringify(value));
        },
        getState(value) {
          // 取解密
          return JSON.parse(Base64.decode(value));
        },
      }),
    ],
  });
  ```

## Attribute

| 属性                  | 类型                      | 默认值       |
| :-------------------- | ------------------------- | ------------ |
| **key**               | string                    | vuex         |
| **storage**           | Storage                   | localStorage |
| **paths**             | string[]                  | -            |
| **spreadPaths**       | Path[]                    | -            |
| **resetMutationType** | string                    | resetStates  |
| **filterMutation**    | (mutation:Store)=>boolean | true         |
| **setState**          | (value:any)=>string       | -            |
| **getState**          | (value:string)=>any       | -            |
|                       |                           |              |

**Path[]**

| 属性         | 类型     | 默认值       |
| ------------ | -------- | ------------ |
| **storage**? | Storage  | localStorage |
| **key**?     | string   | vuex         |
| **paths**    | string[] | -            |
|              |          |              |
