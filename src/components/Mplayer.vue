<template>
  <div>
    <audio ref="audio" :src="`http://ws.stream.qqmusic.qq.com/C100${playList[index]}.m4a?fromtag=0&guid=126548448`" @loadedmetadata="loadedmetadata" @timeupdate="timeupdate"></audio>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Mplayer',
  computed: {
    ...mapState(['paused', 'volume', 'changeTime', 'index', 'mode', 'lyric']),
    ...mapGetters(['playList']),
    audio () {
      return this.$refs.audio
    }
  },
  methods: {
    ...mapMutations(['getDuration', 'getCurrentTime', 'chooseSong', 'getLrc', 'changeLrcLoop']),
    loadedmetadata () {
      this.getDuration(this.audio.duration)
    },
    timeupdate () {
      this.getCurrentTime(this.audio.currentTime)
    },
    playMode () {
      if (this.mode.order) {
        if (this.index > 28) {
          this.chooseSong(0)
        } else {
          this.chooseSong(this.index + 1)
        }
      }
      if (this.mode.random) {
        this.chooseSong(Math.floor(Math.random() * 30) + 1)
      }
      if (this.mode.loop) {
        this.audio.currentTime = 0
        this.audio.play()
        this.changeLrcLoop()
      }
    }
  },
  watch: {
    paused (val) {
      if (val) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    },
    volume (val) {
      this.audio.volume = val / 100
    },
    changeTime (val) {
      this.audio.currentTime = val
    }
  },
  created () {
    this.$store.dispatch('loadList')
  },
  updated () {
    this.audio.oncanplay = () => {
      if (!this.paused) {
        this.audio.play()
        this.audio.volume = this.volume / 100
      }
    }
    this.audio.addEventListener('ended', this.playMode, false)
  }
}
</script>
