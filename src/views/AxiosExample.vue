<template>
    <div><h1>axios Example</h1>
      <div id="modal">loading...</div>
      <div id="err">err msg</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AxiosExample',
  created () {
    const instance = axios.create({
      baseURL: 'http://localhost:8080', // 请求域名，基本地址
      timeout: 1000, // 设置请求的超时时长ms
      url: '/data.json', // 请求路径
      method: 'get', // 请求方法get,post,put,patch,delete
      headers: {
        token: ''
      }, // 设置请求头
      params: {}, // 请求参数拼接在url上
      data: {} // 请求参数放在请求体里
    })
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        // 在发送请求前做的事情
        return config
      },
      error => {
        // 在请求错误时做的事情
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    instance.interceptors.response.use(
      response => {
        // 请求成功对响应数据做处理
        return response
      },
      error => {
        // 响应错误数据做处理
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '错误请求'
              break
            case 401:
              error.message = '未授权，请重新登录'
              break
            case 403:
              error.message = '拒绝访问'
              break
            case 404:
              error.message = '请求错误,未找到该资源'
              break
            case 405:
              error.message = '请求方法未允许'
              break
            case 408:
              error.message = '请求超时'
              break
            case 500:
              error.message = '服务器端出错'
              break
            case 501:
              error.message = '网络未实现'
              break
            case 502:
              error.message = '网络错误'
              break
            case 503:
              error.message = '服务不可用'
              break
            case 504:
              error.message = '网络超时'
              break
            case 505:
              error.message = 'http版本不支持该请求'
              break
            default:
              error.message = `未知错误${error.response.status}`
          }
        } else {
          error.message = '连接到服务器失败'
        }
        return Promise.reject(error)
      }
    )
    // 取消拦截器
    const interceptors = axios.interceptors.request.use(
      config => {
        config.headers = {
          auth: true
        }
        return config
      }
    )
    axios.interceptors.request.eject(interceptors)
    // 例子 需要登录状态（token: ''）
    let instanceHp = axios.create({})
    instanceHp.interceptors.request.use(
      config => {
        config.headers.token = ''
        return config
      }
    )
    // 例子 不需要登录
    let instanceHp1 = axios.create({})
    instanceHp1.interceptors.request.use({})

    // 移动端开发
    let instanceApp = axios.create({})
    instanceApp.interceptors.request.use(
      config => {
        document.getElementById('modal').style.display = 'block' // 请求前显示
        return config
      },
      error => {
        // 请求错误 一般是http状态码401、404
        document.getElementById('err').style.display = 'block'
        setTimeout(() => {
          document.getElementById('err').style.display = 'none'
        }, 2000)
        return Promise.reject(error)
      }
    )
    instanceApp.interceptors.response.use(
      response => {
        document.getElementById('modal').style.display = 'none' // 响应后隐藏
        return response
      },
      error => {
        // 响应错误处理 一般http状态码500、502
        document.getElementById('err').style.display = 'block'
        setTimeout(() => {
          document.getElementById('err').style.display = 'none'
        }, 2000)
        return Promise.reject(error)
      }
    )
    instanceApp.get('/data.json').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    // 1.axios全局配置
    axios.defaults.timeout = 1000
    axios.defaults.baseURL = 'http://localhost:8080'
    // 2.axios实例配置
    const httpService = axios.create()
    httpService.defaults.timeout = 3000
    // 3.axios请求配置
    httpService.get('/city.json', {
      timeout: 5000
    })

    /* 实际开发
    两种请求接口
    http://localhost:9090
    http://localhost:9090 */
    /* const instanceHttp = axios.create({
      baseURL: 'http://localhost:9090',
      timeout: 1000
    })
    const instanceHttp1 = axios.create({
      baseURL: 'http://localhost:9091',
      timeout: 3000
    })
    instanceHttp.get('/contactList').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    instanceHttp1.get('/orderList', {
      timeout: 5000
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    }) */
  }
}
</script>

<style scoped lang="scss">
#modal,#err{
  display: none;
}
</style>
