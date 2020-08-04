<template>
<div>
  <Head></Head>
  <Nav></Nav>
  <router-view></router-view>
</div>
</template>
<script>
import Nav from './components/Nav'
import Head from './components/Head'
import Vue from 'vue'
import Home from './view/Home'
Vue.component('Nav', Nav)
Vue.component('Head', Head)
Vue.component('Home', Home)
export default {
}
</script>
<style>
*{margin:0; padding:0}
ul{list-style: none;}
img{display: block}
a{text-decoration: none;}
html{font-size: 16px;}
</style>
