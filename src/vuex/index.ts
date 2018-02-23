import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import root from './modules/root' // 根信息

const debug: boolean = process.env.NODE_ENV !== 'production'

const vuexStore = new Vuex.Store({
  /**
   * 此处注册的modules默认为第一级模块，无法被动态卸载
   */
  modules: {
    root,
  },
  strict: debug
})
export default vuexStore
