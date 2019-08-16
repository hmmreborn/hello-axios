<template>
    <div>axios test</div>
</template>

<script>
/* 并发请求：同时进行多个请求，并统一处理返回值 */
import axios from 'axios'
export default {
  name: 'AxiosTest',
  created () {
    axios.all([
      axios.get('/data.json'),
      axios.get('/city.json')
    ]).then(axios.spread((dataRes, cityRes) => {
      console.log(dataRes, cityRes)
    }))
  }
}
</script>

<style scoped>

</style>
