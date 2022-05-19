import { Get, Post, Put, Delete } from '@/config/axios'

// 获取左侧菜单
export const getMenuList = (param) => {
  return Get('menus')
}
// 获取用户列表
export const getUsers = (param) => {
  return Get('users', param)
}
// 修改用户状态
export const userState = (id, type, param) => {
  return Put(`users/${id}/state/${type}`, param)
}
// 添加用户
export const addUsers = (param) => {
  return Post('users', param)
}
// 根据id查询用户信息
export const queryUser = (id) => {
  // console.log(id)
  return Get(`users/${id}`)
}
// 修改用户信息
export const changeUsers = (id, param) => {
  return Put(`users/${id}`, param)
}
// 删除用户
export const deleteUser = (id) => {
  return Delete(`users/${id}`)
}

// 获取权限管理列表结构
export const getRights = (type) => {
  return Get(`rights/${type}`)
}
// 获取角色列表
export const getRoles = () => {
  return Get('roles')
}
// 添加角色
export const addRoles = (param) => {
  return Post('roles', param)
}
// 编辑角色
export const editRoles = (id, param) => {
  return Put(`roles/${id}`, param)
}
// 删除角色
export const deleteRoles = (id) => {
  return Delete(`roles/${id}`)
}
// 删除角色权限
export const deleteRolesRight = (roleID, rightID) => {
  return Delete(`roles/${roleID}/rights/${rightID}`)
}
// 角色授权
export const allotRolesRight = (roleId, idStr) => {
  return Post(`roles/${roleId}/rights`, idStr)
}
// 分配用户角色
export const changeRole = (id, param) => {
  return Put(`users/${id}/role`, param)
}
// 获取商品分类列表
export const getGoodsClassify = (param) => {
  return Get('categories', param)
}
// 添加分类
export const addCategories = (param) => {
  return Post('categories', param)
}
// 编辑分类
export const editCategories = (id, param) => {
  return Put(`categories/${id}`, param)
}
// 删除分类
export const deleteCategories = (id) => {
  return Delete(`categories/${id}`)
}
//categories/:id/attributes
// 获取参数列表
export const getParameterList = (id, params) => {
  return Get(`categories/${id}/attributes`, params)
}
// categories/:id/attributes
// 添加动态参数或属性
export const addParams = (id, params) => {
  return Post(`categories/${id}/attributes`, params)
}
// categories/:id/attributes/:attrId 编辑分类参数
export const editParams = (id, attrId, params) => {
  return Put(`categories/${id}/attributes/${attrId}`, params)
}
// categories/:id/attributes/:attrid  删除分类
export const removeCategories = (id, attrid) => {
  return Delete(`categories/${id}/attributes/${attrid}`)
}
// 编辑提交参数 categories/:id/attributes/:attrId
export const editSubmitParams = (id, attrId, params) => {
  return Put(`categories/${id}/attributes/${attrId}`, params)
}

// 商品列表
// 获取商品列表数据
export const getGoodsList = (params) => {
  return Get('goods', params)
}
// 删除商品 goods/:id
export const deleteGoods = (id) => {
  return Delete(`goods/${id}`)
}
//  添加商品
export const addGoods = (params) => {
  return Post('goods', params)
}

// 订单管理
export const getOrdersList = params => {
  return Get('orders', params)
}
// 查询物流信息
export const queryProgress = id => {
  return Get(`/kuaidi/${id}`)
}
