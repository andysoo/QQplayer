<template>
  <Row type="flex" align="middle">
    <Col span="2">
    <router-link :to="{name:'list'}">
      <Icon type="ios-arrow-back" size="40" color="#eee" />
    </router-link>
    </Col>
    <Col span="19" offset="1">
    <Input search enter-button placeholder="QQplayer" />
    </Col>
    <Mplayer></Mplayer>
  </Row>
</template>
<script>
import Mplayer from '../components/Mplayer.vue'
export default {
  components: {
    Mplayer
  }
}
</script>
