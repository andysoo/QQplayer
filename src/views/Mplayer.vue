<template>
  <div>
    <audio ref="audio" :src="src"></audio>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Mplayer',
  computed: {
    ...mapState(['paused', 'volume']),
    ...mapGetters(['src']),
    audio () {
      return this.$refs.audio
    }
  },
  // computed: {
  //   ...mapState("player", ["paused", "volume", "changeTime"]),
  //   ...mapGetters("list", ["currentItem"]),
  //   audio() {
  //     return this.$refs.audio;
  //   }
  // },
  // methods: {
  //   ...mapMutations("player", ["GET_DURATION", "GET_CURRENT_TIME"]),
  //   loadedmetadata() {
  //     this.GET_DURATION(this.audio.duration);
  //   },
  //   timeupdate() {
  //     this.GET_CURRENT_TIME(this.audio.currentTime);
  //   }
  // },
  watch: {
    paused (val) {
      if (val) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    },
    volume (val) {
      this.audio.volume = val
    },
    changeTime (val) {
      this.audio.currentTime = val
    }
  },
  mounted () {
    this.audio.oncanplay = () => {
      if (!this.paused) {
        this.audio.play()
        this.audio.volume = this.volume
      }
    }
    // jsonp(
    //   'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2018-10-22&topid=4&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=MusicJsonCallbacktoplist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
    //   { name: 'MusicJsonCallbacktoplist', timeout: 5000 },
    //   (err, data) => {
    //     console.log(err)
    //     console.log(data)
    //   }
    // )
    // jsonp(
    //   "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?pcachetime=1540480621647&songmid=002adHlS1J0548&g_tk=5381&jsonpCallback=MusicJsonCallback_lrc&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0",
    //   { name: "MusicJsonCallback_lrc", timeout: 5000 },
    //   // 需要把'https://y.qq.com/portal/player.html'设置成路由上的参数才能让Referer合法
    //   function(err, data) {
    //     console.log(err);
    //     console.log(data);
    //   }
    // );
    // }
  }
}
</script>
