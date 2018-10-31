<template>
  <Row type="flex" align="middle">
    <Col span="2">
    <router-link :to="{name:'list'}">
      <Icon type="ios-arrow-back" size="40" color="#eee" />
    </router-link>
    </Col>
    <Col span="19" offset="1">
    <Input search enter-button placeholder="QQplayer" v-model="searchValue" @on-search="search" />
    </Col>
    <Mplayer></Mplayer>
  </Row>
</template>
<script>
import jsonp from 'jsonp'
import Mplayer from '../components/Mplayer.vue'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    searchUTF8 () {
      return encodeURI(this.searchValue)
    }
  },
  components: {
    Mplayer
  },
  methods: {
    ...mapMutations(['gitList']),
    search () {
      let url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61199955446414145&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=${this.searchUTF8}&g_tk=5381&jsonpCallback=MusicJsonCallback05702011268360674&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
      jsonp(url,
        { name: 'MusicJsonCallback05702011268360674', timeout: 5000 },
        (err, data) => {
          let arr = data.data.song.list.map((i, index) => {
            let obj = {}
            obj.index = index
            obj.songmid = i.mid
            obj.songname = i.name
            obj.albumdesc = i.album.subtitle
            obj.singer = i.singer.map(i => i.name).join('/')
            return obj
          })
          this.gitList(arr)
          if (err) throw err
        })
    }
  }
  // MusicJsonCallback05702011268360674
  // https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61199955446414145&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=%E4%B8%9C%E8%A5%BF&g_tk=5381&jsonpCallback=MusicJsonCallback05702011268360674&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
}

</script>
