import { Get, Post, Put } from "@/config/axios";

// 获取左侧菜单
export const getMenuList = param => {
    return Get('menus')
}
// 获取用户列表
export const getUsers = param => {
    return Get('users', param)
}
// 修改用户状态
export const userState = (id, type,param) => {
    return Put(`users/${id}/state/${type}`, param)
}
// 添加用户
export const addUsers = param => {
    return Post('users', param)
}
// 根据id查询用户信息
export const queryUser = id => {
    // console.log(id)
    return Get(`users/${id}`)
}