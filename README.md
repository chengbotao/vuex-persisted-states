<!--
 * @Description: 
 * @version: 
 * @Author: Chengbotao
 * @Date: 2020-08-14 16:04:11
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-08-16 12:24:30
 * @FilePath: \vuex-persisted-state\README.md
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

yarn add vuex-persisted-state -D
```

## Usage
---
```js
// ...
import vuexPersistedStates from "vuex-persisted-states";

const store = new Vuex.Store({
  // ...
  plugins: [vuexPersistedStates()]
})
```

## API
