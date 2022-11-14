// 权限拦截在路由跳转  导航守卫
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 不需要导出  因为只需要让代码执行即可

// 定义白名单
const whiteList = ['/login', '404']
// 前置守卫
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是 登录页
      next('/') // 跳到主页
    } else {
      // 只有放过的时候才去获取用户资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
