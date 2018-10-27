<template>
  <div ref="list">
    <router-link :to="{name:'lrc'}" v-for="itam in songList" :key="itam.data.songmid" class="list" :songmid="itam.data.songmid">
      {{itam.data.songname}}
    </router-link>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['songList']),
    list () {
      return this.$refs.list
    }
  },
  methods: {
    ...mapMutations(['playSongMid'])
  },
  mounted () {
    this.list.onclick = (e) => {
      console.log(e.target.getAttribute('songMid'))
      this.playSongMid(e.target.getAttribute('songMid'))
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  height: 5rem;
  line-height: 5rem;
  font-size: 1.3rem;
  display: flex;
}
</style>
