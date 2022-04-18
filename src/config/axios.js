
import axios from "axios";
// import qs from 'qs'
import router from "@/router";
import fa from "element-ui/src/locale/lang/fa";

axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'

axios.defaults.timeout = 30000

axios.defaults.withCredentials = false

// 请求拦截
axios.interceptors.request.use(config => {
    return config
})

// 响应拦截
axios.interceptors.response.use(response => {
    return response
})

export function Get(url, param, headers = 'application/json;charset=UTF-8') {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            // headers: {
            //     token : localStorage.getItem('token'),
            //     'Content-Type': headers || 'application/json;charset=UTF-8'
            // },
            params: param
        }).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch(error => {
            reject(error)
            console.log(error)
        })
    })
}

export function Post(url, param) {
    return new Promise((resolve, reject) => {
        axios.post(url, param, {
            // headers: {
            //     token: localStorage.getItem('token')
            // }
        }).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch(error => {
            reject(error)
            console.log(error)
        })
    })
}

export function Put(url, param) {
    return new Promise((resolve, reject) => {
        axios.put(url, param, {
            // headers: {
            //     token: localStorage.getItem('token')
            // }
        }).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
            console.log(err)
        }).catch(error => {
            console.log(error)
        })
    })
}