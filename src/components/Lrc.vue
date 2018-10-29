<template>
  <div>
    {{ lrc }}
  </div>
</template>

<script>
// import Lyric from 'lyric-parser'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['lrc'])
  },
  methods: {
    ...mapActions(['loadLrc'])
  },
  created () {
    this.loadLrc()
  }
}
</script>
