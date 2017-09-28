import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000,                 // 请求超时时间
  transformRequest: [function(data) {
    // 允许在向服务器发送前，修改请求数据
    console.log(Qs.stringify(data))
    return Qs.stringify(data)
  }]
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    console.log('token = ' + getToken())
    config.headers['Authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  console.log('正常响应数据--------------')
  console.log(response)
  if (!response.data.success) {
    if (response.data.code === 12002) {
      MessageBox.confirm('你已被登出,可以取消继续留在该页面，或者重新登录?', '确定登出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (response.data.code === 10001 || response.data.code === 10002 || response.data.code === 10003 || response.data.code === 11001) {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      Message({
        message: '未登录或登录已过期,请重新登录！',
        type: 'error',
        duration: 10 * 1000
      })
    }
    return Promise.reject('error')
  }
  return response
}, error => {
  // 对响应错误做点什么
  console.log('错误响应数据----------------')
  console.log(error)
  Message({
    message: '抱歉！系统异常，请刷新页面或联系管理员，谢谢。',
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
