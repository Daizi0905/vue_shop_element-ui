import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/Login.vue";
import Home from "@/views/home/Home.vue";
import Welcome from "@/views/welcome/Welcome";
import Users from "@/views/users/Users";
import Rights from "@/views/rights/Rights.vue";
import Roles from "@/views/roles/Roles";
import Cate from "@/views/Goods/Cate";

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/home', component: Home, redirect: '/welcome', children: [
                {path: '/welcome', component: Welcome},
                {path: '/users', component: Users},
                {path: '/rights', component: Rights},
                {path: '/roles', component: Roles},
                {path: '/categories', component: Cate}
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
