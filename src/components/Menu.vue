<template>
      <mt-popup  v-model="$store.state.handleMenu" position="top" closeOnClickModal=false class="popup">
        <div class="option">
          <div @click="closeMenu">X</div>
          <span>选择分类</span>
        </div>
        <ul class="navbar">
          <li :class="{active:-1==current}" @click="selectAll()">全部</li>
          <li v-for="(data1,index) in datalistCate1" :key=data1.shortName :class="{active:index==current}" @click="changeTitle(index,data1)">
            {{data1.cate1Name}}
          </li>
        </ul>
        <div class="contentBox">
          <div v-for="data2 in listOption" @click="toDetail(data2.shortName,data2.cate2Name)" :key=data2.shortName  >
            <img :src="data2.icon" >
            <span>{{data2.cate2Name}}</span>
          </div>
        </div>
    </mt-popup>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
// import Storage from './Menu/index'
export default {
  data () {
    return {
      datalistCate1: [],
      datalistCate2: [],
      current: -1,
      listOption: []
    //   storage: new Storage()
    }
  },
  methods: {
    // 关闭菜单
    closeMenu () {
    //   let that = this.$store.state.handleMenu
      this.$store.commit('closeMenu', false)
    //   console.log(that + '关闭')
    },
    // 切换分类
    changeTitle (index, data) {
      this.current = index
      let menu = this.datalistCate2.filter(item =>
        item.cate1Id === data.cate1Id
      ) // 过滤同Id的到新数组
      this.listOption = menu
    },
    // 选择全部
    selectAll () {
      this.current = -1
      this.listOption = this.datalistCate2
    },
    // 跳转到相应分类
    toDetail (data1, data2) {
      // this.$router.push(`/content/${data}`)
      this.$router.push(`/content/${data1}/${data2}`)
      this.$store.commit('toDetail', false)
      this.$store.commit('reload', true)
    }
  },
  watch: {
    '$store.state.handleMenu': function () {
      if (this.$store.state.handleMenu && (!localStorage.Cate2)) {
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        let urlHost = process.env.API_HOST
        axios.get(urlHost + 'api/cate/list').then(res => {
          this.datalistCate1 = res.data.data.cate1Info
          this.datalistCate2 = res.data.data.cate2Info
          this.listOption = res.data.data.cate2Info
          Indicator.close()
          localStorage.setItem('Cate1', JSON.stringify(this.datalistCate1))
          localStorage.setItem('Cate2', JSON.stringify(this.datalistCate2))
          // this.storage.setItem({name: 'Cate1', value: this.datalistCate1, expires: 10000})
          // this.storage.setItem({name: 'Cate2', value: this.datalistCate2, expires: 10000})
        })
      } else {
        this.datalistCate1 = JSON.parse(localStorage.getItem('Cate1'))
        this.listOption = JSON.parse(localStorage.getItem('Cate2'))
        this.datalistCate2 = JSON.parse(localStorage.getItem('Cate2'))
        // this.datalistCate1 = this.storage.getItem('Cate1')
        // this.listOption = this.storage.getItem('Cate2')
        // this.datalistCate2 = this.storage.getItem('Cate2')
      }
    }
  }
}
</script>
<style scoped>
/* .menuBox{position: absolute; background: rgb(172, 163, 112);z-index: 100;white-space: nowrap;width: 100%;height:100%;display: flex;flex-direction: column;} */
.popup{width: 100%;white-space: nowrap;height: 80%;overflow: hidden;display: flex;flex-direction: column;z-index: 10;}
.option div{background: none;color:rgb(238, 116, 1) ;outline: none;font-size: 16px;margin-left: 10px;width: 20px;text-align:center;border-radius: 50%;display: inline-block;}
.option span{margin: 10px 34%;text-align: center;font-size: 16px;white-space: nowrap;margin-bottom: 30px;line-height:30px;}
ul{display: flex;overflow:scroll;width: 100%;flex:0 0 20%;position: fixed;margin-top: 50px;}
ul::-webkit-scrollbar {display: none;}
ul li{flex:none; margin-right:30px}
.contentBox{width: 100%;display: flex;justify-content: flex-start;flex-wrap: wrap;overflow: scroll;margin: 40px 0 0;}
.contentBox div{flex:0 0 32.6%;display: flex;flex-direction: column;align-items:center;justify-content: center;border: 1px dashed rgb(211, 211, 211);}
.contentBox div img{width: 80%;height:80%;text-align: center;flex: 0 0 80%;}
span{display:inline-block;text-align: center;flex: 1;font-size: 12px;white-space: pre-wrap;}
.active{border-bottom:2px solid red;}
</style>
