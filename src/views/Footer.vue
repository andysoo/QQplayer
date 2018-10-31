<template>
  <div>
    <Row type="flex" align="middle">
      <Col span="2" offset="1">
      <Icon :type="icoVol" size="24" color="#2d8cf0" />
      </Col>
      <Col span="8">
      <Slider :value="volume" @on-input="changeVolume"></Slider>
      </Col>
      <Col span="6" offset="1">
      <div style="text-align:center;color:#2d8cf0">{{index+1}} {{getSongName}}</div>
      </Col>
      <Col span="3" offset="3">
      <span>{{ leftTime }}</span>
      </Col>
    </Row>

    <Row type="flex" align="middle">
      <Col span="19" offset="1">
      <Slider :value="currentPercentAbsoulte" @on-change="changeProgress"></Slider>
      </Col>
      <Col span="3" offset="1">
      <Button shape="circle" :icon="icoMode" type="primary" ghost @click="changeMode"></Button>
      </Col>
    </Row>

    <Row type="flex" justify="space-around" align="middle">
      <Col span="3">
      <Button icon="ios-skip-backward" type="primary" shape="circle" @click="subIndex"></Button>
      </Col>
      <Col span="3">
      <Button size="large" :icon="paused?'ios-pause':'ios-play'" type="primary" shape="circle" @click="playPause"></Button>
      </Col>
      <Col span="3">
      <Button icon="ios-skip-forward" type="primary" shape="circle" @click="addIndex"></Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      icoVol: 'md-volume-down',
      icoMode: 'md-redo'
    }
  },
  computed: {
    ...mapState(['volume', 'paused', 'mode', 'index']),
    ...mapGetters(['leftTime', 'currentPercentAbsoulte', 'getSongName'])
  },
  methods: {
    ...mapMutations(['changeVolume', 'changeProgress', 'playPause', 'changeMode', 'subIndex', 'addIndex'])
  },
  watch: {
    // 通过音量改变图标状态
    volume (newV, oldV) {
      if (newV === 0) {
        this.icoVol = 'md-volume-mute'
      } else if (oldV - newV > 0) {
        this.icoVol = 'md-volume-down'
      } else {
        this.icoVol = 'md-volume-up'
      }
    },
    mode: {
      handler: function (v) {
        if (v.order) this.icoMode = 'md-redo'
        if (v.loop) this.icoMode = 'md-infinite'
        if (v.random) this.icoMode = 'md-shuffle'
      },
      deep: true
    }
  }
}
</script>
