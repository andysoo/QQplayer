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
    ...mapMutations(['chooseSong', 'play']),
    handleRowChange (currentRow, index) {
      this.chooseSong(index)
      this.play()
      this.$router.push({
        name: 'lrc'
      })
    }
  }
}
</script>
