import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
import Main from './views/Main.vue'
import List from './components/List.vue'
import Lrc from './components/Lrc.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        Header,
        default: Main,
        Footer
      },
      children: [
        {
          path: '',
          name: 'list',
          component: List
        },
        {
          path: 'lrc',
          name: 'lrc',
          component: Lrc,
          beforeEnter (to, from, next) {
            if (from.name) {
              next()
            } else {
              next({ name: 'list' })
            }
          }
        }
      ]
    }
  ]
})
