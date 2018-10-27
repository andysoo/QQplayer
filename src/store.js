import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    songList: [],
    songMid: '',
    paused: false,
    volume: 0.8
  },
  getters: {
    src (state) {
      if (state.songMid) {
        return 'http://ws.stream.qqmusic.qq.com/C100' + state.songMid + '.m4a?fromtag=0&guid=126548448'
      }
    }
  },
  mutations: {
    gitList (state, list) {
      state.songList = list
    },
    playSongMid (state, songMid) {
      state.songMid = songMid
    }
  },
  actions: {
    loadList ({ commit }) {
      jsonp(
        'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2018-10-27&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=MusicJsonCallbacktoplist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
        { name: 'MusicJsonCallbacktoplist', timeout: 5000 },
        (err, data) => {
          commit('gitList', data.songlist)
          if (err) {
            throw err
          }
        }
      )
    }
  }
})
