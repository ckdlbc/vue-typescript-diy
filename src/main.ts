/**
 * 引用 vue
 * 引用 需要挂载的DOM
 */
import Vue from 'vue'
import App from 'views/App.vue'

/**
 * vue-router路由
 * 引用路由配置文件
 */
import router from 'router/index'

/**
 * vuex状态管理
 * 引用vuex的store
 */
import store from 'store/index'

/**
 *  vue调试模式
 */
Vue.config.devtools = process.env.NODE_ENV !== 'production'

/* tslint:disable:no-unused-expression */
export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
