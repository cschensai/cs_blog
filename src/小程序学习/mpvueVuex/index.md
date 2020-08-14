## MpVue引入Vuex
***当项目逐渐复杂时，Props会显得苍白无力，所以Vuex就登场了,搭配mapActions、mapMutations和mpState进行开发。***
<hr/>

### src/vuex/index.js

```js
// 在src下新建vuex文件夹，这里使用modules进行分模块存储状态（推荐）

import Vue from 'vue';
import Vuex from 'vuex';

import meModule from './meModule';
import bookModule from './bookModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meModule,
    bookModule,
  }
})
```


### sec/main.js

```js
import Vue from 'vue';
import App from './App';
import store from './vuex';

Vue.config.productionTip = false;
Vue.prototype.$store = store; // 必须挂载到Vue原型上,这样在组件中可以通过this（Vue实例）直接调用
App.mpType = 'app';

const app = new Vue({
  ...App,
  store, // 添加vuex
})
app.$mount()
```