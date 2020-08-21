<!--
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:04:11
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-21 12:56:35
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
```js
// ...
import vuexPersistedStates from "vuex-persisted-states";

const store = new Vuex.Store({
  // ...
  mutations: {
    resetStates(state){
      // resetStates 为一个空的 mutation 方法,拿到这个 mutation type 会重置 state 的状态
      return;
    }
  },
  plugins: [vuexPersistedStates({
    spreadPaths: [{
      storage: sessionStorage,
      paths: []
    }]
  })]
})
```

## API

| 属性              | 类型     | 默认值       |
| ----------------- | -------- | ------------ |
| storage           | Storage  | localStorage |
| key               | string   | vuex         |
| paths             | string[] | -            |
| spreadPaths       | Path[]   | -            |
| resetMutationType | string   | resetStates  |
