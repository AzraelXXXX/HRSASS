import request from '@/utils/request'

// 获取组织架构的数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 获取某个部门信息的详情
export function getDepartDetails(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 删除组织架构的部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete' // 接口满足restful接口规范
    // 同样的地址 不同的方法 执行不同的业务
  })
}

// 添加组织架构的部门
export function addDepartments(data) {
  return request({
    url: `/company/department`,
    method: 'post',
    data
  })
}

// 编辑组织架构的部门
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
