<template>
  <div>
    <Table highlight-row ref="currentRowTable" :columns="columns" :data="songList" @on-row-click="handleRowChange"></Table>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '歌名',
          key: 'songname'
        },
        {
          title: '出处',
          key: 'albumdesc'
        },
        {
          title: '歌手',
          key: 'singer'
        }
      ]
    }
  },
  computed: {
    ...mapState(['songList', 'index'])
  },
  methods: {
    ...mapMutations(['chooseSong']),
    handleRowChange (currentRow, index) {
      this.chooseSong(index)
      this.$router.push({
        name: 'lrc',
        query: { url: 'https://y.qq.com/portal/player.html' }
      })
    }
  }
}
</script>
