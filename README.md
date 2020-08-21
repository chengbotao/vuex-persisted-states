<!--
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:04:11
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-21 18:11:13
 * @FilePath: \vuex-persisted-states\README.md
-->
# vuex-persisted-states
Keep your vuex state between page reloads.

## Requirements
---
- Vue.js
- Vuex

## Install
---
```sh
npm install vuex-persisted-states -D

yarn add vuex-persisted-states -D
```

## Usage
---
### 1. 基本用法
> 默认将 所有的 state 存储到 window.localStorage
```js
// ...
import vuexPersistedStates from "vuex-persisted-states";

const store = new Vuex.Store({
  // ...
  plugins: [vuexPersistedStates()]
})
```

### 2.修改存储的键值 **key**
> 默认存储的 key 为 vuex
```js
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  // ...
  plugins: [vuexPersistedStates({
    key: "storage"
  })]
})
```

### 3.修改存储的位置
```js
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  // ...
  plugins: [vuexPersistedStates({
    storage: window.sessionStorage
  })]
})
```

### 4. 存储部分 **state**
```js
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  // ...
  plugins: [vuexPersistedStates({
    paths: ["a"]
  })]
})
```

### 5. 将 **state** 存进多个 **storage**
> paths 属性默认存储到 storage 中
```js
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  // ...
  plugins: [vuexPersistedStates({
    paths: ["a"],
    spreadPaths: [{
      storage: window.sessionStorage,
      paths: ["b"]
    }]
  })]
})


// 修改不同 storage 的key
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  // ...
  plugins: [vuexPersistedStates({
    paths: ["a"],
    spreadPaths: [{
      key: "session",
      storage: window.sessionStorage,
      paths: ["b"]
    }]
  })]
})
```

### 6. 重置还原 state
> 手动声明一个 mutation 方法,默认的方法名为 resetStates
```js
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  mutations:{
    resetStates(state, params){
      return;
    }
  },
  // ...
  plugins: [vuexPersistedStates({
    paths: ["a"]
  })]
})


this.$store.commit("resetStates")
// params 不传值则全部还原
// params 是一个 string[]  还原部分 state
```

### 7. 重置还原 state 方法修改
> 手动声明一个 mutation 方法,默认的方法名为 resetStates
```js
import vuexPersistedStates from "vuex-persisted-states";
const store = new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  mutations:{
    cleanStates(state, params){
      return;
    }
  },
  // ...
  plugins: [vuexPersistedStates({
    paths: ["a"],
    resetMutationType: "cleanStates"
  })]
})


this.$store.commit("cleanStates")
// params 不传值则全部还原
// params 是一个 string[]  还原部分 state
```

## API

| 属性              | 类型     | 默认值       |
| ----------------- | -------- | ------------ |
| storage           | Storage  | localStorage |
| key               | string   | vuex         |
| paths             | string[] | -            |
| spreadPaths       | Path[]   | -            |
| resetMutationType | string   | resetStates  |
