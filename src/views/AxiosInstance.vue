<template>
  <div><h1>Axios Instance</h1>
    <div id="modal">loading...</div>
    <div id="err">err</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AxiosInstance',
  created () {
    let instanceApp = axios.create({})
    instanceApp.interceptors.request.use(
      config => {
        document.getElementById('modal').style.display = 'block'
        return config
      },
      error => {
        document.getElementById('err').style.display = 'block'
        setTimeout(() => {
          document.getElementById('err').style.display = 'none'
        }, 2000)
        return Promise.reject(error)
      }
    )
    instanceApp.interceptors.response.use(
      response => {
        document.getElementById('modal').style.display = 'none'
        return response
      },
      error => {
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
  }
}
</script>

<style scoped lang="scss">
  #modal,#err{
    display: none;
  }
</style>
