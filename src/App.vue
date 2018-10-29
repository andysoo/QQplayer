<template>
  <Layout>
    <Header>
      <router-view name="Header"></router-view>
    </Header>
    <Content>
      <router-view></router-view>
    </Content>
    <Footer>
      <router-view name="Footer"></router-view>
    </Footer>
  </Layout>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  .ivu-layout {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: hidden;
    .ivu-layout-header,
    .ivu-layout-footer {
      padding: 0;
    }
    .ivu-layout-content {
      flex: 1;
      overflow-y: auto;
      background-color: #dcdee2;
    }
  }
}
</style>
