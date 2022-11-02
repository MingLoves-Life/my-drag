<template>
  <template v-if="props.components.length > 0">
    <div
      v-for="(component, index) in props.components"
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
        v-bind="{ ...component.attr }"
        :style="{ ...getComponentStyle(component.style) }"
        @click="() => clickComponent(component)"
      >
      </component>
    </div>
  </template>
</template>
<script setup>
import { defineComponent } from "vue";
defineComponent({ name: "Preview" });

const props = defineProps(["components", "eventList", "importComponent"]);

if (props.importComponent) props.importComponent();

const clickComponent = (component) => {
  console.log(component, props.eventList);
  if (component?.event) {
    const list = Object.keys(component?.event);
    if (list?.length > 0) {
      list.forEach((eventKey) => {
        if (component?.event[eventKey]) {
          const { eventProps } = props.eventList.find(
            (item) => item.name === component.component
          );
          eventProps
            .find((i) => i.key === eventKey)
            .event(component?.event[eventKey]);
        }
      });
    }
  }
  if (component?.linkage?.eventType) {
    component?.linkage?.event();
  }
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
