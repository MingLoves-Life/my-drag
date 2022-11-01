<template>
  <a-modal
    title="预览"
    v-model:visible="previewInfo.visible"
    :width="previewInfo.width + 'px'"
    :bodyStyle="{ height: previewInfo.height + 'px', position: 'relative' }"
    @ok="handleOk"
  >
    <div
      v-for="(component, index) in componentStore.canvasComponent"
      :key="component.label"
      :class="component.propValue + index"
      :index="index"
      :style="{
        ...getComponentWrapStyle(component.style),
        position: 'absolute',
        transition: 'none',
        zIndex: index,
      }"
    >
      <component
        :is="component.component"
        :value="component.propValue"
        :style="{ ...getComponentStyle(component.style) }"
        @click="() => clickComponent(component)"
      >
      </component>
    </div>
  </a-modal>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";

defineComponent({ name: "Preview" });
const componentStore = useComponentStore();
const previewInfo = computed(() => componentStore.previewInfo);
const curComponentConfig = computed(() =>
  componentStore.componentConfigList.find(
    (i) => i.name === componentStore.curMouseDownComponent.component
  )
);
const eventList = computed(() => curComponentConfig.value.eventProps);

const clickComponent = (component) => {
  if (component?.event) {
    const list = Object.keys(component?.event);
    if (list?.length > 0) {
      list.forEach((eventKey) => {
        if (component?.event[eventKey]) {
          eventList.value
            .find((item) => item.key === eventKey)
            .event(component?.event[eventKey]);
        }
      });
    }
  }
  if (component?.linkage?.eventType) {
    component?.linkage?.event();
  }
};

const handleOk = () => {
  componentStore.previewInfo.visible = false;
};
const keyList = ["width", "height"];
const getComponentStyle = (style) => {
  const data = {};
  Object.keys(style).forEach((key) => {
    if (keyList.includes(key)) {
      data[key] = style[key];
    }
  });
  return data;
};
const getComponentWrapStyle = (style) => {
  const data = {};
  Object.keys(style).forEach((key) => {
    if (!keyList.includes(key)) {
      if (key === "top") {
        data[key] = Number(style[key].slice(0, -2)) + 55 + "px";
      }
      data[key] = style[key];
    }
  });
  return data;
};
</script>
