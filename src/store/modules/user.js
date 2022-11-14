import { getToken, setToken, removeToken, setTiemStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

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
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
