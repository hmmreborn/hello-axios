<template>
    <div>
      <h1>AxiosCancel</h1>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AxiosCancel',
  created () {
    let source = axios.CancelToken.source()
    axios.get('/data.json', {
      cancelToken: source
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    source.cancel('取消请求')
  }
}
</script>

<style scoped lang="scss">

</style>
