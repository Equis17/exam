import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Accept: '*/*',
      }
    }
  },
  error => {
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Message({ message: res.msg || '系统错误，请联系管理员', type: 'error', duration: 5 * 1000 })
      if (res.code === 401) {
        store.dispatch('user/resetToken').then(() => { location.reload() })
      }
      return Promise.reject(new Error(res.msg || '系统错误，请联系管理员'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({ message: error.msg, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)

export default service
