<template>
  <div class="lrcBox">
    <ul :style="{top:calcTop()}">
      <li v-for="(line,index) in lyric.lines" :key="index" :class="{active:lineNum===index}">{{line.txt}}</li>
    </ul>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      lyric: [],
      lineNum: ''
    }
  },
  computed: {
    ...mapState(['paused', 'changeTime', 'index', 'currentTime', 'lrcLoop'])
  },
  watch: {
    paused () {
      this.lyric.togglePlay()
    },
    changeTime (v) {
      this.lyric.seek(v * 1000)
    },
    index () {
      this.lyric.stop()
      this.$store.dispatch('loadLrc')
        .then(data => this.base64(data))
        .catch(err => { throw err })
    },
    lrcLoop () {
      this.lyric.seek(0)
    }
  },
  methods: {
    calcTop () {
      let active = document.getElementsByClassName('active')
      if (active[0] && this.lineNum > 7) {
        return -active[0].offsetTop + 150 + 'px'
      }
    },
    base64 (data) {
      let commContent = data.lyric.replace(/\s/g, '+')
      let lyricStr = Buffer.from(commContent, 'base64').toString()
      let lyric = new Lyric(lyricStr, ({ lineNum, txt }) => {
        this.lineNum = lineNum
      })
      lyric.seek(this.currentTime * 1000)
      this.lyric = lyric
    }
  },
  created () {
    this.$store.dispatch('loadLrc')
      .then(data => this.base64(data))
      .catch(err => { throw err })
  }
}
</script>
<style lang="scss" scoped>
.lrcBox {
  position: relative;
  top: 3rem;
  overflow: hidden;
  height: 22.8rem;
  ul {
    position: absolute;
    left: 0;
    right: 0;
    font-size: 1.2rem;
    text-align: center;
    color: #2d8cf0;
    .active {
      color: red;
      font-size: 2rem;
    }
  }
}
</style>
