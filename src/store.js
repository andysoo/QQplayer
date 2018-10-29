import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'
import { formatTime } from './utils'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    songList: [],
    loadList: false,
    paused: false,
    volume: 20,
    currentTime: 0,
    duration: 0,
    changeTime: 0,
    index: 0,
    mode: {
      order: true,
      loop: false,
      random: false
    },
    lrc: ''
  },
  getters: {
    getSongName (state) {
      if (state.loadList) {
        let a = state.songList.find(i => i.index === state.index)
        return a.songname
      } else {
        return ''
      }
    },
    leftTime (state) {
      return formatTime(state.duration - state.currentTime)
    },
    currentPercentAbsoulte (state) {
      return state.currentTime / state.duration * 100
    },
    playList (state) {
      if (state.loadList) {
        return state.songList.map((i) => i.songmid)
      } else {
        return new Array('')
      }
    }
  },
  mutations: {
    gitList (state, list) {
      state.songList = list
      state.loadList = true
    },
    changeVolume (state, volume) {
      state.volume = volume
    },
    getDuration (state, duration) {
      state.duration = duration
    },
    getCurrentTime (state, time) {
      state.currentTime = time
    },
    changeProgress (state, progress) {
      state.changeTime = progress * state.duration / 100
    },
    playPause (state) {
      state.paused = !state.paused
    },
    chooseSong (state, index) {
      state.index = index
    },
    changeMode (state) {
      if (state.mode.order) {
        state.mode.order = !state.mode.order
        state.mode.loop = !state.mode.loop
      } else if (state.mode.loop) {
        state.mode.loop = !state.mode.loop
        state.mode.random = !state.mode.random
      } else if (state.mode.random) {
        state.mode.random = !state.mode.random
        state.mode.order = !state.mode.order
      }
    },
    addIndex (state) {
      if (state.index < 29) {
        state.index++
      } else {
        state.index = 0
      }
    },
    subIndex (state) {
      if (state.index > 0) {
        state.index--
      } else {
        state.index = 29
      }
    }
  },
  actions: {
    loadList ({ commit }) {
      let date = new Date().toISOString().slice(0, 10)
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=' + date + '&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=MusicJsonCallbacktoplist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
      jsonp(url, { name: 'MusicJsonCallbacktoplist', timeout: 5000 },
        (err, data) => {
          let arr = data.songlist.map((i, index) => {
            let obj = {}
            obj.index = index
            obj.songmid = i.data.songmid
            obj.songname = i.data.songname
            obj.albumdesc = i.data.albumdesc
            obj.singer = i.data.singer.map(i => i.name).join('/')
            return obj
          })
          commit('gitList', arr)
          if (err) throw err
        })
    },
    loadLrc ({ state }) {
      let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?pcachetime=1540480621647&songmid=' + state.songMid + '&g_tk=5381&jsonpCallback=MusicJsonCallback_lrc&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
      console.log(url)
      jsonp(url,
        { name: 'MusicJsonCallback_lrc', timeout: 5000 },
        (err, data) => {
          if (data.lyric) {
            let commContent = data.lyric.replace(/\s/g, '+')
            let lyrics = Buffer.from(commContent, 'base64').toString()
            console.log(err)
            console.log(lyrics)
          }
        }
      )
    }
  }
})
