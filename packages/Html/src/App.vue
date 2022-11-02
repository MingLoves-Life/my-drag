<template>
  <!-- <Preview
    :components="canvasComponent"
    :eventList="eventList"
    :importComponent="importComponent"
  /> -->
  <div
      v-for="(component, index) in canvasComponent"
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
        is="Button"
        :value="component.propValue"
        v-bind="{ ...component.attr }"
        :style="{ ...getComponentStyle(component.style) }"
        @click="() => clickComponent(component)"
      >
      </component>
    </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { Preview } from "@components/preview";
import { app } from "./main.js";

// const importComponent = () => {
//   const script = document.createElement("script");
//   script.src = "../public/button.umd.cjs";
//   document.getElementById("app").appendChild(script);
//   script.onload = function () {
//     console.log(Button["default"]);
//     const { component } = Button["default"];
//     app.component(component.__name, component);
//   };
// };
// importComponent()

const canvasComponent = [
  {
    component: "Button",
    label: "按钮",
    propValue: "按钮按钮",
    style: {
      width: "100px",
      height: "100px",
      top: "114px",
      left: "320.90625px",
    },
    attr: {
      type: "primary",
    },
    event: {
      redirect: "",
      alert: "123",
    },
  },
];

const eventList = [
  {
    name: "Button",
    eventProps: [
      {
        key: "redirect",
        label: "跳转事件",
        event: (url) => window.open(url),
      },
      {
        key: "alert",
        label: "alert事件",
        event: (str) => alert(str),
      },
    ],
  },
];
const clickComponent = (component) => {
  if (component?.event) {
    const list = Object.keys(component?.event);
    if (list?.length > 0) {
      list.forEach((eventKey) => {
        if (component?.event[eventKey]) {
          const { eventProps } = eventList.find(
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

defineComponent({ name: "App" });
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
