// import axios from "axios";
// import qs from 'qs'
// import router from "@/router";
// import fa from "element-ui/src/locale/lang/fa";

// 导入NProgress对应的文件，加载进度条
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'

axios.defaults.timeout = 30000

axios.defaults.withCredentials = false

// 请求拦截
axios.interceptors.request.use( config => {
    // 设置请求头
    config.headers.Authorization = localStorage.getItem( 'token' )
    NProgress.start()
    return config
} )

// 响应拦截
axios.interceptors.response.use( response => {
    if (response.data.meta.status > 201) Message.error( response.data.meta.msg )
    NProgress.done()
    return response
}, error => {
    console.log( error )
    return Promise.reject( error.response )  // 返回接口错误信息
} )

export function Get (url, param, headers = 'application/json;charset=UTF-8') {
    return new Promise( (resolve, reject) => {
        axios.get( url, {
            // headers: {
            //     token : localStorage.getItem('token'),
            //     'Content-Type': headers || 'application/json;charset=UTF-8'
            // },
            params: param
        } ).then( response => {
            resolve( response.data )
        }, err => {
            reject( err )
        } ).catch( error => {
            reject( error )
            console.log( error )
        } )
    } )
}

export function Post (url, param) {
    return new Promise( (resolve, reject) => {
        axios.post( url, param, {
            // headers: {
            //     token: localStorage.getItem('token')
            // }
        } ).then( response => {
            resolve( response.data )
        }, err => {
            reject( err )
        } ).catch( error => {
            reject( error )
            console.log( error )
        } )
    } )
}

export function Put (url, param) {
    return new Promise( (resolve, reject) => {
        axios.put( url, param, {
            // headers: {
            //     token: localStorage.getItem('token')
            // }
        } ).then( response => {
            resolve( response.data )
        }, err => {
            reject( err )
            console.log( err )
        } ).catch( error => {
            console.log( error )
        } )
    } )
}

// export function Delete(url, param) {
//     return new Promise((resolve, reject) => {
//         axios.delete(url, param, {
//             // headers: {
//             //     token: localStorage.getItem('token')
//             // }
//         }).then(response => {
//             resolve(response.data)
//         }, err => {
//             reject(err)
//         }).catch(error => {
//             reject(error)
//         })
//     })
// }

export function Delete (url, params) {
    return new Promise( (resolve, reject) => {
        axios.delete( url, params, {
            // data: qs.stringify(params),
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded;text/html;charset=utf-8'
            // }
        } ).then( response => {
            resolve( response.data )
        }, err => {
            reject( err )
        } ).catch( (error) => {
            reject( error )
        } )
    } )
}