// 专门处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  // 路由表  表示当前用户所拥有的所有路由的数组
  routes: constantRoutes
}
const mutations = {
  // 定义修改routes的mutation
  // newRoutes 认为是我们登录成功需要添加的新路由
  setRoutes(state, newRoutes) {
    // 每次都是在静态路由的基础上去加新路由
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数为当前用户的所拥有的菜单权限
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      // key就是标识
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // 得到的routes是所有模块中满足权限要求的路由数组
    // routes就是当前用户所拥有的 动态路由的权限
    context.commit('setRoutes', routes)
    // 这里return  state数据是用来显示左侧菜单用的  return是给路由addRoutes用的
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
