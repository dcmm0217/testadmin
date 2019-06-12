import axios from 'axios'
import Vue from 'vue'
import router from './router'
import {
    Loading
} from 'element-ui'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
let loading;

function satrtLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close()
}
// 请求拦截
http.interceptors.request.use(config => {
    satrtLoading()
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});
// 响应拦截
http.interceptors.response.use(res => {
    endLoading()
    return res
}, err => {
    endLoading()
    console.log(err.response)
    // jwt expired
    if (err.response.data.message) {
        if (err.response.data.message == "jwt expired" && err.response.status === 500) {
            err.response.data.message = "用户登录时间已过期，请重新登录！"
            localStorage.removeItem('token')
            router.push('/login')
        }
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        if (err.response.status === 400) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})


export default http