import axios from 'axios'
import service from './ContactApi'
import { Toast } from 'vant'

// service 循环遍历输出不同请求方法
let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000
})
const Http = {} // 包裹请求方法容器
for (let key in service) {
  let api = service[key] // url method
  Http[key] = async function (
    params, // 请求参数：get:url,put,post,patch(data),delete:url
    isFormData = false, // 标识是否是form-data
    config = {} // 配置参数
  ) {
    let newParams = {}
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    let response = {} // 请求的返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    return response
  }
}

// 拦截器
instance.interceptors.request.use(config => {
  Toast.loading({
    mask: false,
    duration: 0,
    forbidClick: true,
    message: '加载中...'
  })
  return config
}, () => {
  Toast.clear()
  Toast('请求错误，请稍后重试')
})

instance.interceptors.response.use(response => {
  Toast.clear()
  return response.data
}, () => {
  Toast.clear()
  Toast('请求错误，请稍后重试')
})

export default Http
