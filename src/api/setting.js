import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 删除角色
export function delRoleList(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 修改角色详情
export function updateRoleDetail(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 增加角色
export function addRole(data) {
  return request({
    url: `/sys/role`,
    method: 'post',
    data
  })
}

// 获取公司信息
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
