import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  // namespaced: true,
  state: {
    isClick: false, // content重新发起请求
    handleMenu: false, // 菜单开关
    Login: false, // 登录页面开关
    signIn: false // 登录信息
    // menuList: {}
  },
  mutations: {
    // 切换导航栏
    clickMenu (state, data) {
      state.isClick = data
    },
    isChanged (state, data) {
      state.isClick = data
    },
    // 菜单开关
    openMenu (state, data) {
      state.handleMenu = data
    },
    closeMenu (state, data) {
      state.handleMenu = data
    },
    // 菜单跳转详情页关闭菜单
    toDetail (state, data) {
      state.handleMenu = data
    },
    // 菜单跳转详情页加载状态
    reload (state, data) {
      state.isClick = data
    },
    // menuListMutation (state, data) {
    //   state.menuList = data
    // }
    // 登录层显示状态
    showLogin (state, data) {
      state.Login = data
    },
    closeLogin (state, data) {
      state.Login = data
    },
    refresh (state, data) {
      state.Login = data
    },
    loginPop (state, data) {
      state.Login = data
    },
    // 登录状态
    userLogin (state, data) {
      state.signIn = data
    }
  },
  actions: {
  },
  getters: {
  }
})
