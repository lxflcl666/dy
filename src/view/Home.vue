<template>
  <section>
    <mt-swipe :auto="4000" class="swipe">
      <mt-swipe-item v-for="(swip, index) in dataSwip" :key="index">
        <img :src="swip.list[parseInt(Math.random()*swip.list.length)].roomSrc" >
      </mt-swipe-item>
    </mt-swipe>
      <div v-for="data in datalist" class="home_main" :key="data.shortName">
        <div class="title">
          <img :src="data.icon">
          <span>{{data.tabName}}</span>
          <button @click="toMore(data.shortName, data.tabName)">{{data.tabName}}</button>
        </div>
        <div class="content">
          <div v-for="list in data.list" :key="list.rid" class="room">
            <div class="roomImg">
              <div class="hn">{{list.hn}}</div>
              <div class="nickname">{{list.nickname}}</div>
              <img :src="list.roomSrc" @click="toDetail(list.rid)">
            </div>
            <div class="roomName" @click="toDetail()">
              {{list.roomName}}
            </div>
          </div>
        </div>
      </div>

      <div class="toTop"><a href="#">↑返回顶部</a></div>
  </section>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  data () {
    return {
      datalist: [],
      dataSwip: []
    }
  },
  methods: {
    toDetail (rid) {
      this.$router.push(`/room/${rid}`)
    },
    toMore (name, fullname) {
      // this.$router.push(`/content/${name}`)
      this.$router.push(`/content/${name}/${fullname}`)
      this.$router.push({path: `content`, query: {type: name, fullname: fullname}})
    }
  },
  mounted () {
    let urlHost = process.env.API_HOST
    // 获取主页面内容
    axios.get(urlHost + 'api/home/mix').then(res => {
      this.datalist = res.data.data
      // 获取随机轮播图
      for (let i = 0; i < 4; i++) {
        this.dataSwip.push(res.data.data[parseInt(Math.random() * res.data.data.length)])
        if (i === 3) {
          Array.from(new Set(this.dataSwip))
          if (this.dataSwip.length < 4) {
            i--
          }
        }
      }
    })
  }
}
</script>
<style scoped>
section{margin-top: 90px;position: relative;border-radius: 12px 12px 0 0;z-index: 1;}
.home_main{max-width: 1500px;margin: 10px auto;}
.title{width: 100%;height: 42px;display: flex;}
.title img{height: 18px; width: 18px; margin:10px}
.title span{font-size: 16px; margin: 8px}
.title button{width: 70px;height: 21px; line-height: 21px;background: none;border-radius: 12px; margin: 8px; border:1px rgb(240, 170, 90) solid; color:rgb(240, 170, 90)}
.content{display: flex;width: 100%;flex-wrap: wrap;justify-content: space-around;align-items: flex-start;}
.content .room{flex:0 0 44%;overflow: hidden;display: flex;flex-direction: column;margin: 5px 0;}
.content .roomImg{flex: 0 0 80%; border-radius: 6px;position: relative;}
.content .roomImg .hn{position: absolute;right: 0; top: 0;font-size: 6px;color: white;background: rgba(218, 230, 220, 0.2);}
.content .roomImg .nickname{position: absolute; left: 0; bottom: 0; color: white;background: rgba(218, 230, 220, 0.2);font-size: 6px;}
.content .roomImg img{ width: 100%; border-radius: 6px;}
.content .roomName{flex:0 0 10%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;font-size: 14px;}
.toTop {margin-top: 100px;}
a{text-align: center; font-size: 16px;white-space: nowrap;margin:0 36%;color: black;}
.swipe{margin-top:20px;height: 15rem;width: 90%;max-width:1200px ;position: relative; border-radius: 12px 12px 0 0;padding-top: 20px;margin: 0 auto;}
.swipe img{width: 100%;border-radius: 12px 12px 0 0;height: 100%;}
</style>
