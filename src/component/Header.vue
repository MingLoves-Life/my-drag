<template>
  <div class="header">
    <a-button :disabled="!canRedo" @click="componentStore.redoSnapshot"
      >撤销</a-button
    >
    <a-button :disabled="!canUndo" @click="componentStore.undoSnapshot"
      >重做</a-button
    >
    <a-button>插入图片</a-button>
    <a-button>预览</a-button>
    <a-button @click="save">保存</a-button>
    <a-button @click="componentStore.clearCanvas">清空</a-button>
    <span style="margin: 0 10px">画布大小</span>
    <a-input
      v-model:value="headerInfoStore.canvasSize.width"
      style="width: 80px; margin-right: 5px"
    />
    *
    <a-input
      v-model:value="headerInfoStore.canvasSize.height"
      style="width: 80px; margin-left: 5px"
    />
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
import { useHeaderInfoStore } from "/src/store/headerInfo";
import { useComponentStore } from "/src/store/component";

defineComponent({ name: "Header" });

const headerInfoStore = useHeaderInfoStore();
const componentStore = useComponentStore();

const canRedo = computed(
  () =>
    componentStore.snapshot.length >= componentStore.snapshotIndex &&
    componentStore.snapshotIndex > 0
);
const canUndo = computed(
  () => componentStore.snapshot.length - 1 > componentStore.snapshotIndex
);

const save = () => componentStore.saveComponent();
</script>
<style lang="less">
.header {
  height: 50px;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  button {
    margin-left: 5px;
  }
}
</style>
