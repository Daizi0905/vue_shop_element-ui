import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Welcome from '@/views/welcome/Welcome'
import Users from '@/views/users/Users'
import Rights from '@/views/rights/Rights.vue'
import Roles from '@/views/roles/Roles'
import Cate from '@/views/Goods/Cate'
import Params from '@/views/Goods/Params'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    // 首页
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome,
          name: 'welcome',
          meta: {
            nav: true,
            title: '首页',
            level: [{ path: '/welcome', title: '首页' }]
          }
        },
        // 用户列表
        {
          path: '/users',
          component: Users,
          name: 'users',
          meta: {
            nav: true,
            title: '用户列表',
            level: [{ path: '/welcome', title: '首页' }, { title: '用户管理' }, { title: '用户列表' }]
          }
        },
        // 权限列表
        {
          path: '/rights',
          component: Rights,
          name: 'rights',
          meta: {
            nav: true,
            title: '权限列表',
            level: [{ path: '/welcome', title: '首页' }, { title: '权限管理' }, { title: '权限列表' }]
          }
        },
        // 角色列表
        {
          path: '/roles',
          component: Roles,
          name: 'roles',
          meta: {
            nav: true,
            title: '角色列表',
            level: [{ path: '/welcome', title: '首页' }, { title: '权限管理' }, { title: '角色列表' }]
          }
        },
        // 商品分类
        {
          path: '/categories',
          component: Cate,
          name: 'categories',
          meta: {
            nav: true,
            title: '商品分类',
            level: [{ path: '/welcome', title: '首页' }, { title: '商品管理' }, { title: '商品分类' }]
          }
        },
        // 参数列表
        {
          path: '/params',
          component: Params,
          name: 'params',
          meta: {
            nav: true,
            title: '商品分类',
            level: [{ path: '/welcome', title: '首页' }, { title: '商品管理' }, { title: '参数列表' }]
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenArr = localStorage.getItem('token')
  if (!tokenArr) return next('/login')
  next()
})

export default router
