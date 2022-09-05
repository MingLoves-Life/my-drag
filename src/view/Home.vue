<template>
  <Header />
  <main class="main">
    <div class="leftAside">
      <ComponentList />
    </div>
    <div class="draw-warp">
      <div class="draw"></div>
    </div>
    <div style="width: 200px; border-left: 1px solid black">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="属性">属性</a-tab-pane>
        <a-tab-pane key="2" tab="动画">动画</a-tab-pane>
        <a-tab-pane key="3" tab="事件">事件</a-tab-pane>
      </a-tabs>
    </div>
  </main>
</template>
<script setup>
import { defineComponent, ref } from "vue";
import Header from "/src/component/Header.vue";
import ComponentList from "/src/component/ComponentList.vue";
defineComponent({ name: "Home" });
const activeKey = ref();
</script>
<style>
.main {
  display: flex;
  height: calc(100% - 50px);
}
.draw-warp {
  flex: 1;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
.draw {
  background-color: white;
  width: 500px;
  height: 500px;
}
.leftAside {
  width: 200px;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
