// 做一个混入对象
import store from '@/store'
export default {
  methods: {
    // 检查权限 key就是要检查的点
    checkPermission(key) {
      // 去用户的信息里面找 points中有没有key 有，则是认为有权限；没有，则是认为不能点击
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
