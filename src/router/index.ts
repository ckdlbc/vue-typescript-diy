/**
 * 核心
 * vue/vue-router
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 调用

/**
 * 引入路由表
 */
import index from './modules/index'

/**
 * 配置路由
 * 即 页面 url 路由定义
 */
const routes = [...index]

/**
 *  路由对象
 */
const router = new VueRouter({
  mode: 'hash',
  routes
})

/**
 * 全局路由钩子
 */
import beforeEach from './hooks/beforeEach'
import afterEach from './hooks/afterEach'

router.beforeEach(beforeEach) // 路由跳转前
router.afterEach(afterEach) // 路由跳转后

export default router
