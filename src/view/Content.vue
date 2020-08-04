<template>
  <div class="type">
    <div class="logo">
     {{this.$route.params.fullName}}
    </div>
    <div  class="content" v-infinite-scroll="loadMore"
                          infinite-scroll-disabled="loading"
                          infinite-scroll-distance="10">
      <div v-for="data in datalist" class="img" :key="data.rid">
        <img :src="data.roomSrc" @click="toDetail(data.rid)">
        <div class="title" @click="toDetail(data.rid)">{{data.roomName}}</div>
      </div>
    </div>
    <div class="load" v-show="isAll">加载中...</div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      page: 1,
      isAll: true
    }
  },
  methods: {
    isClick () {
      // 导航栏改变重新加载数据
      if (this.$store.state.isClick) {
        // 加载样式
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        let shortName = this.$route.params.type
        let urlHost = process.env.API_HOST
        axios.get(urlHost + 'api/room/list?page=1&type=' + shortName).then(res => {
          this.datalist = res.data.data.list
          Indicator.close()
        })
        this.$store.commit('isChanged', false)
      }
    },
    // 转到直播间
    toDetail (rid) {
      this.$router.push(`/room/${rid}`)
    },
    // 加载下一页
    loadMore () {
      this.loading = true
      this.page++
      if (this.datalist.pagecount !== this.page) {
        // console.log(this.page)
        let urlHost = process.env.API_HOST
        let shortName = this.$route.params.type
        axios.get(urlHost + `api/room/list?page=${this.page}&type=${shortName}`).then(res => {
          this.datalist = [...this.datalist, ...res.data.data.list]// ...展开数组，合并数组
          // console.log(this.datalist)
          this.loading = false
        })
      } else {
        this.isAll = false
      }
    }
  },
  mounted () {
    Indicator.open({
      text: 'Loading...', // 加载样式
      spinnerType: 'fading-circle'
    })
    let shortName = this.$route.params.type
    let urlHost = process.env.API_HOST
    axios.get(urlHost + 'api/room/list?page=1&type=' + shortName).then(res => {
      this.datalist = res.data.data.list
      Indicator.close()
    })
    window.onclick = this.isClick// 监听导航栏是否被改变
  },
  beforeDestroy () {
    window.onclick = null
  }
}
</script>
<style scoped>
.type{display: flex;flex-direction: column;justify-content: space-between;margin-top:60px;}
.logo{margin: 60px 10px 20px;}
.content{flex:0 0 80%; width: 100%; height: 100%; display:flex; justify-content: space-around; flex-wrap: wrap;margin-bottom: 100px;}
.content .img{flex: 0 0 48%;display: flex;flex-direction: column;justify-content: flex-start;border-radius: 8px;overflow: hidden;margin-top:5px}
.content .img img{width: 100%; height: 80%;border-radius: 8px;}
.content .img .title{flex:1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.load{position: relative; bottom:-2rem}
</style>
