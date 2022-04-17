import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/Login.vue";
import Home from "@/views/home/Home.vue";
import Welcome from "@/views/welcome/Welcome";

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/home', component: Home, redirect: '/home/welcome', children: [
                { path: 'welcome', component: Welcome }
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
