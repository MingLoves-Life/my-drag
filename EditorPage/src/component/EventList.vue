<template>
  <template v-if="hasCurComponent">
    <template v-for="event in eventList" :key="event.key">
      <a-form-item :label="event.label">
        <a-input
          v-model:value="curComponentInfo.canvasComponent.event[event.key]"
        />
      </a-form-item>
    </template>

    <a-form-item label="事件联动" :colon="false" />
    <a-form-item label="选择物料">
      <a-select
        v-model:value="linkageCompInfo.linkageComp"
        :options="canvasComponentOptions"
      />
    </a-form-item>
    <a-form-item label="选择事件">
      <a-select
        v-model:value="linkageCompInfo.event"
        :options="
          linkageEvent.map((event) => ({
            label: event.label,
            value: event.key,
          }))
        "
      />
    </a-form-item>
    <a-form-item label="选择属性">
      <a-select
        v-model:value="linkageCompInfo.eventPropEvent"
        :options="
          linkageEventProp.map((event) => ({
            label: event.label,
            value: event.key,
          }))
        "
      />
      <a-input v-model:value="linkageCompInfo.eventPropValue" />
      <a-button @click="addLinkage">添加联动</a-button>
    </a-form-item>
  </template>
  <template v-else> 请选择物料 </template>
</template>
<script setup>
import { defineComponent, reactive } from "vue";
import { useComponentStore } from "/src/store/component";
import { isNumber } from "@antfu/utils";

defineComponent({ name: "EventList" });

const componentStore = useComponentStore();

const linkageCompInfo = reactive({});

const curComponentConfig = computed(() =>
  componentStore.componentConfigList.find(
    (i) => i.name === componentStore.curMouseDownComponent.component
  )
);
const eventList = computed(() => curComponentConfig.value.eventProps);
const linkageEvent = computed(() => curComponentConfig.value.linkageEvent);
const linkageEventProp = computed(
  () => curComponentConfig.value.linkageEventProp
);

const curComponentInfo = computed(() => {
  const { canvasComponent: curCanvasComponent } =
    componentStore.curMouseDownComponent;
  if (!curCanvasComponent?.event) curCanvasComponent.event = {};

  eventList.value.forEach((event) => {
    const { key } = event;
    if (!curCanvasComponent.event.hasOwnProperty(key)) {
      curCanvasComponent.event[key] = "";
    }
  });
  return componentStore.curMouseDownComponent;
});
const hasCurComponent = computed(() => isNumber(curComponentInfo.value.index));

const canvasComponent = computed(() => componentStore.canvasComponent);
const canvasComponentOptions = computed(() =>
  canvasComponent.value.map((comp, index) => ({
    value: index,
    label: comp.propValue,
  }))
);

const addLinkage = () => {
  const linkage = {
    eventType: linkageCompInfo.event,
    event: () => {
      const component = canvasComponent.value[linkageCompInfo.linkageComp];
      linkageEventProp.value
        .find((event) => event.key === linkageCompInfo.eventPropEvent)
        .event(component, linkageCompInfo.eventPropValue);
    },
  };
  curComponentInfo.value.canvasComponent.linkage = linkage;
  console.log("addLinkage", curComponentInfo.value);
};
</script>
