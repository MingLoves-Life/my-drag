<script setup>
import Home from "./view/Home.vue";
import { useComponentStore } from "/src/store/component";
const componentStore = useComponentStore();

onMounted(() => {
  const canvasComponent = JSON.parse(localStorage.getItem("canvasComponent"));
  componentStore.canvasComponent = [...canvasComponent];
  console.log('localStorage',canvasComponent);
});
</script>

<template>
  <Home />
</template>
<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
