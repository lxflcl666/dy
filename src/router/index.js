import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Home.vue'
import Room from '../view/Room.vue'
import Content from '../view/Content.vue'
// import store from '../../store/index'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/room/:rid',
      component: Room
    },
    {
      path: '/content/:type/:fullName',
      component: Content
      // props: true
    },
    {
      path: '*',
      component: Home
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/home') {
//     if (store.state.signIn) {
//       next()
//     } else {
//       store.commit('loginPop', true)
//     }
//   } else {
//     next()
//   }
// })

export default router
