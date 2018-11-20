import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'
import { formatTime } from './utils'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    songList: [],
    lrcLoop: false,
    paused: true,
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
    src: ''
  },
  getters: {
    getSongName (state) {
      if (state.songList.length) {
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
    musicSrc (state) {
      if (state.src) {
        return 'http://isure.stream.qqmusic.qq.com/' + state.src
      }
    }

  },
  mutations: {
    changeSrc (state, src) {
      state.src = src
    },
    getList (state, list) {
      state.songList = list
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
    play (state) {
      state.paused = false
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
    },
    changeLrcLoop (state) {
      state.lrcLoop = !state.lrcLoop
    }
  },
  actions: {
    loadList ({ commit }) {
      let date = new Date().toISOString().slice(0, 10)
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=' + date + '&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=MusicJsonCallbacktoplist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
      return new Promise((resolve, reject) => {
        jsonp(url, { name: 'MusicJsonCallbacktoplist', timeout: 5000 },
          (err, data) => {
            let arr = data.songlist.map((i, index) => {
              let obj = {}
              obj.index = index
              obj.strMediaMid = i.data.strMediaMid
              obj.songmid = i.data.songmid
              obj.songname = i.data.songname
              obj.albumdesc = i.data.albumdesc
              obj.singer = i.data.singer.map(i => i.name).join('/')
              return obj
            })
            commit('getList', arr)
            resolve(arr)
            reject(err)
          })
      })
    },
    loadLrc ({ state }) {
      let l = state.songList.find(i => i.index === state.index)
      if (l) {
        let url = 'http://www.xiaomini.com.cn/lrc.php?songmid=' + l.songmid
        return new Promise((resolve, reject) => {
          jsonp(url,
            { name: 'MusicJsonCallback_lrc', timeout: 5000 },
            (err, data) => {
              resolve(data)
              reject(err)
            })
        })
      }
    },
    loadMusicSrc ({ state, commit }, index) {
      let data = {
        req_0: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: {
            guid: '5113582055',
            songmid: [state.songList[index].songmid],
            songtype: [0],
            uin: '0',
            loginflag: 1,
            platform: '20'
          }
        },
        comm: {
          uin: 0,
          format: 'json',
          ct: 20,
          cv: 0
        }
      }
      data = escape(JSON.stringify(data))
      jsonp(
        'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' + data,
        { name: 'getplaysongvkey8173538000418177', timeout: 5000 },
        (err, data) => {
          commit('changeSrc', data.req_0.data.midurlinfo[0].purl)
          if (err) throw err
        }
      )
    }
  }
})
