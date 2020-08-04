<template>
   <mt-popup  v-model="$store.state.Login" position="center" closeOnClickModal=false class="popup">
     <div class="tab">
       <div class="phoneLogin" @click="tab = 0" ><span   :class="{active:tab==0}">手机登录</span></div>
       <div class="signUp" @click="tab = 1" ><span   :class="{active:tab==1}">注册</span></div>
       <div class="close" @click="close()">X</div>
     </div>
     <div class="login" v-show="tab == 0" key=1>
       <div class="phone">
         <input type="text" placeholder="请输入手机号码">
       </div>
       <div class="password">
         <input type="password" placeholder="密码">
       </div>
       <div class="messageLogin">短信登录</div>
       <div class="val">
         <input type="text" placeholder="请输入验证码" v-model="valText">
         <div class="valBox">{{code}}</div>
       </div>
       <span v-show="valFalse" class="valFalse">验证码错误</span>
       <button class="valBtn" @click="changeCode" ref="banBtn">换一张</button>
       <div class="btn" @click="login()">
         <span>登录</span>
       </div>
     </div>

     <div class="signUp" v-show="tab == 1" key=2>
       <div class="phone">
         <input type="text" placeholder="请输入手机号码">
       </div>
       <div class="password">
         <input type="password" placeholder="密码">
       </div>
        <div class="vallidate">
         <input type="text" placeholder="输入手机验证码">
         <button>短信验证</button>
       </div>
       <div class="btn">
         <span>立即注册</span>
       </div>
       <div class="agree">
           <input type="checkbox">
           <span>已阅读XXXXXXXXXXX</span>
       </div>
     </div>
   </mt-popup>
</template>
<script>
import Validate from './Login/index'
export default {
  data () {
    return {
      tab: 0,
      validate: new Validate(),
      code: 0,
      valText: null,
      valFalse: false,
      index: 0
    }
  },
  methods: {
    close () {
      this.$store.commit('closeLogin', false)
    },
    changeCode () {
      this.code = this.validate.createVal(4)
      var i = 5
      let revise = this.$refs.banBtn.innerHTML
      var that = this.$refs.banBtn
      this.validate.setTime(5, function () {
        that.setAttribute('disabled', true)
        that.innerHTML = i + 's'
        i--
      }, function () {
        that.removeAttribute('disabled')
        that.innerHTML = revise
      })
    },
    login () {
      if (this.code.toLowerCase() === this.valText.toLowerCase()) {
        this.$store.commit('userLogin', true)
        this.$store.commit('refresh', false)
        localStorage.setItem('user', 'user')
      } else {
        this.changeCode()
        this.valFalse = true
      }
    }
  },
  mounted () {
    this.code = this.validate.createVal(4)
  }
  // computed: {
  //   closeLogin: {
  //     get () {
  //       return this.show
  //     },
  //     set (val) {
  //       this.$emit('closeLogin', val)
  //     }
  //   }
  // }
}
</script>
<style scoped>
.popup{width: 80%;height: 50%;}
.tab{display: flex;}
.phoneLogin{flex: 1;margin: 20px 10% 0;}
.signUp{flex: 1;margin:20px 0 0;}
.close{flex: none;position: absolute;right: 5px;top:6px}
.phone, .password, .vallidate{margin: 30px auto 0;  width: 80%;border-bottom: 1px solid rgb(211, 211, 211);}
.password,.vallidate,.val{margin: 0 auto; margin-top: 10px; width: 80%;border-bottom: 1px solid rgb(211, 211, 211);position: relative;}
.val{margin: 0 auto; margin-top: 10px; width: 80%;border-bottom: 1px solid rgb(211, 211, 211);position:relative}
.valBox{text-align:center; line-height: 30px; height: 30px;width: 70px;border:1px solid black;position: absolute;right: 0;top: -18px;}
.valBtn{border-radius: 8px;position: absolute; right:10%; margin:5px 0;outline: none; background: none; border: 1px solid black;width: 4rem;height:1.5rem;}
.vallidate button{ white-space: nowrap;position: absolute;right: 2px;top: 0;background:none;border: none;}
input{outline: none; background:none;border: none;width: 80%;margin-left: 5px;}
.messageLogin{margin: 0 10%;font-size: 6px;color: rgb(211, 211, 211);}
.btn{box-shadow: 1px 0 5px;background:linear-gradient(to bottom, rgb(243, 95, 59), #f50a02);text-align: center;width: 60%;margin: 15% auto 0;height: 40px;border-radius: 12px;}
.btn span{display:inline-block;line-height: 40px;}
.agree{text-align: center; font-size: 6px;margin-top:2px;}
input[type='checkbox'] {margin-left: 0;position: relative;width: 10px;height: 10px;visibility: hidden;}
input[type='checkbox']::after {overflow:hidden;position: absolute;top: 0; background-color: white;border: 1px solid black; width: 10px;height: 10px;display: inline-block;visibility: visible;padding-left: 0px;text-align: center;content: ' ';border-radius: 50%;}
input[type='checkbox']:checked::after {background: rgb(243, 95, 59);color:white;content: '✔';font-size: 2px;position: absolute;top: 0;line-height: 10px;}
.active{border-bottom: rgb(243, 95, 59) 2px solid;width: 50%;}
.valFalse{margin-left: 10%; font-size: 12px; color: rgb(212, 26, 26);}
</style>
