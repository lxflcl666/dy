<template>
  <header>
    <menuBox></menuBox>
    <router-link  to= '/home' tag='div' class="img">
      <img src="../assets/dylogo.png" alt="">
    </router-link>
    <div class="login">
        <button @click="showLogin()">登录</button>
    </div>
    <Login></Login>
  </header>
</template>
<script>
import menuBox from './Menu'
import Login from './Login'
export default {
  components: {
    menuBox,
    Login
  },
  methods: {
    showLogin () {
      this.$store.commit('showLogin', true)
    }
  }
}
</script>
<style  scoped>
  header{position:fixed; width: 100%; height: 54px; display: flex; justify-content: space-between; top:0;z-index: 5;background: white;}
  .img{width:76px; height:34px; margin: 5px 5px}
  .img img{width: 76px; height: 34px}
  button{margin: 8px;background: none; outline: none; border: none;font-size: 16px;}
</style>
