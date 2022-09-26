<template>
  <div
    class="line"
    v-if="showLine"
    :style="{ position: 'absolute', ...lineInfo }"
  ></div>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";

defineComponent({ name: "MarkLink" });
const componentStore = useComponentStore();
const diff = 10;
const showLine = ref(true);
const lineInfo = reactive({ left: "0px" });
const checkNear = () => {
  const canvasComponent = componentStore.canvasComponent;
  const { canvasComponent: curMouseDownComponent, index } =
    componentStore.curMouseDownComponent;
  const {
    style: { width, height, left, top },
  } = curMouseDownComponent;
  canvasComponent.forEach((item, idx) => {
    if (idx !== index) {
      const { style } = item;
      if (Math.abs(getNumber(style.left) - getNumber(left)) <= diff) {
        showLine.value = true;
        lineInfo.left = style.left;
        console.log("checkNear", style.left);
        curMouseDownComponent.style.left = style.left
      } else {
        showLine.value = false;
      }
    }
  });
};

const getNumber = (str) => Number(str.slice(0, -2));

defineExpose({ checkNear });
</script>
<style lang="less">
.line {
  width: 1px;
  height: 100%;
  background-color: blue;
  z-index: 1000;
}
</style>
