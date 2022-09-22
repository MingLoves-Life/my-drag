<template>
  <div
    @dragstart="handleDragStart"
    v-for="(component, index) in componentStore.componentList"
    :key="component.label"
  >
    <a-button style="width: 100px" :draggable="true" :data-index="index">{{
      component.label
    }}</a-button>
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";
defineComponent({ name: "ComponentList" });

const componentStore = useComponentStore();

const handleDragStart = (e) => {
  e.dataTransfer.setData("index", e.target.dataset.index);
};
</script>
