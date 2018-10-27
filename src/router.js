import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
import Mplayer from './views/Mplayer.vue'
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
        Footer,
        mplayer: Mplayer
      },
      children: [
        {
          path: '',
          name: 'list',
          component: List
        },
        {
          path: 'lrc?ulr=https://y.qq.com/portal/player.html',
          name: 'lrc',
          component: Lrc
        }
      ]
    }
  ]
})
