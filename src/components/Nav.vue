<template>
  <nav>
    <ul>
      <router-link to= '/home' tag='li' activeClass='myactive' @click.native="handleChange()"> <!--绑定原生事件到组件-->
        推荐
      </router-link>
      <li v-for="(data,index) in datalist" :key = 'data.shortName' @click="changeContent(data.shortName,index,data.name)" :class="{active:index==current}">
        {{data.name}}
      </li>
    </ul>
    <div class="btn">
    <button @click="openMenu()">III</button>
    </div>
  </nav>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      datalist: [],
      current: -1
    }
  },
  methods: {
    changeContent (data, index, data2) {
      // this.$router.push(`/content/${data}`)
      this.$router.push(`/content/${data}/${data2}`)
      // {path: `content`, query: {type: data, fullname: data2}}
      this.$store.commit('clickMenu', true)// 点击时改变state中的isClick状态
      this.current = index
    },
    handleChange () {
      this.current = -1
    },
    openMenu () {
      this.$store.commit('openMenu', true)// 改变菜单显示状态
      // let that = this.$store.state.handleMenu
      // console.log(that)
    }
  },
  mounted () {
    let urlHost = process.env.API_HOST
    axios.get(urlHost + 'api/cate/recList?cid=&ct=').then(res => {
      this.datalist = res.data.data
    })
  }
}
</script>
<style scoped>
.active{transform: translateY(2px) ;font-size: 18px;color:rgb(231, 122, 48)}
.myactive{transform: translateY(2px) ;font-size: 18px;color:rgb(231, 122, 48)}
nav{z-index:2;position: fixed; top:54px; background: white;overflow-x: scroll;overflow-y: hidden;width:100%;display: flex;justify-content: space-around;}
ul{display :flex; overflow: scroll; list-style: none;flex:0 0 90%;height: 100%;width:90%;}
ul::-webkit-scrollbar {display: none;}
li{flex:1;  height: 44px;font-size: 15px;line-height: 44px;margin-right: 26px;white-space: nowrap; cursor: pointer;text-align: center;}
li:nth-of-type(1){margin-left: 5px;}
.btn{flex:0 0 6%;box-shadow:-2px 0 2px 1px rgb(211,211,211);}
button{height:20px;outline: none;border: none;margin-top:12px;width:90%;margin-left:10%}
</style>
