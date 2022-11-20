import { getToken, setToken, removeToken, setTiemStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    // vuex和缓存数据的同步
    setToken(token)
  },
  // 删除缓存
  removeToken(state) {
    state.token = null
    // 先清除vuex 再清除缓存vuex和缓存数据的同步
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    context.commit('setToken', result)
    // 拿到token说明登陆成功
    // 设置当前时间戳
    setTiemStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户的详情
    const baseInfo = await getUserDetailById(result.userId)
    // 提交到mutations
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result
  },
  // 登出的操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    // 去设置权限模块下路由为初始状态
    // Vuex子模块怎么调用子模块的action 都没加锁的情况下 可以随意调用
    // 不加命名空间的情况下 所有mutations和actions都是挂在全局上的 所以可以直接调用
    // 三个参数 mutations名称 payload载荷 第三个参数{root: true} 调用根级的mutations或者actions
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
