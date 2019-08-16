<template>
  <div class="home">
    <ul id="nav">
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/home/about">About</router-link></li>
      <li><router-link to="/home/axios">Axios</router-link></li>
      <li><router-link to="/home/test">Axios test</router-link></li>
      <li><router-link to="/home/example">Axios example</router-link></li>
      <li><router-link to="/home/instance">Axios Instance</router-link></li>
      <li><router-link to="/home/cancel">Axios Cancel</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style lang="scss" scoped>
  #app{
    text-align: center;
  ul,li{
    list-style: none;
  }
  }
  #nav{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  li{
  }
  }
</style>
