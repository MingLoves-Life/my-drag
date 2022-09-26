<template>
  <template v-if="hasCurComponent">
    <template v-for="event in eventList" :key="event.key">
      <a-form-item :label="event.label">
        <a-input v-model:value="curComponentInfo.canvasComponent.event[event.key]" />
      </a-form-item>
    </template>
  </template>
  <template v-else> 请选择物料 </template>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";
import { isNumber } from "@antfu/utils";

defineComponent({ name: "EventList" });

const componentStore = useComponentStore();
const eventList = computed(() => componentStore.eventList);

const curComponentInfo = computed(() => {
  const curCanvasComponent =
    componentStore.curMouseDownComponent.canvasComponent;
  if (!curCanvasComponent?.event) curCanvasComponent.event = [];

  eventList.value.forEach((event) => {
    const { key } = event;
    if (!curCanvasComponent.event.hasOwnProperty(key)) {
      curCanvasComponent.event[key] = "";
    }
  });
  return componentStore.curMouseDownComponent;
});
const hasCurComponent = computed(() => isNumber(curComponentInfo.value.index));
</script>
