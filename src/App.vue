<template>
  <div class="app">
    <router-view name="Header"></router-view>
    <router-view></router-view>
    <router-view name="Footer"></router-view>
    <router-view name="mplayer"></router-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {

    ...mapActions(['loadList'])
  },
  created () {
    this.loadList()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.app {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: hidden;
}
header {
  height: 3rem;
  background-color: rgb(113, 180, 243);
}
footer {
  height: 8rem;
  background-color: rgb(111, 141, 224);
}
main {
  display: flex;
  flex: 1;
  overflow-y: auto;
}
</style>
