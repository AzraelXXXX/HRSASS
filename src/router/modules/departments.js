import Layout from '@/layout'
// 导出员工的路由规则
export default {
  path: '/departments', // 路由地址
  name: 'departments',
  component: Layout,
  children: [{
    // 二级路由的path什么都不用写的时候 此时它表示二级路由的默认路由
    path: '', // 这里不用写  什么都不用写表示 /employees 不但有布局 layout => 员工主页
    component: () => import('@/views/departments'),
    name: 'departments',
    // 路由元信息 其实就是一个存储数据的地方 可以放任何内容
    meta: {
      title: '组织架构', // 因为左侧导航读取了这里的title属性
      icon: 'tree'
    }
  }]
}
