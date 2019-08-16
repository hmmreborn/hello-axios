<template>
    <div class="axios">
      axios demo
    </div>
</template>

<script>
/*
* get,post,put,patch,delete
* get:获取数据
* post:提交数据（表单提交，文件上传）
* put:更新数据（所有数据推送到后端）
* patch:更新（编辑）数据（只将修改的数据推送到后端）
* delete:删除数据
* */
import axios from 'axios'
export default {
  name: 'AxiosDemo',
  components: {},
  created () {
    axios.get('/data.json', { params: { id: 12345 } }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    let data = {
      id: 12
    }
    axios.post('/post', data).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    /* let formData = new FromDate()
    for (let key in formData) {
      formData.append(key,data[key])
    }
    axios.post('/post',formData).then((res) =>{
      console.log(res)
    }).then((err) =>{
      console.log(err)
    }) */

    axios.put('/put', data).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    axios.patch('/patch', data).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    axios.delete('/delete', {
      params: {
        id: 1
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    axios.delete('/delete', {
      data: {
        id: 12
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    axios({
      method: 'delete',
      url: '/delete',
      parmas: {},
      data: {}
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
