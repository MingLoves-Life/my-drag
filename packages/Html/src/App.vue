<template>
  <Preview
    :components="canvasComponent"
    :eventList="eventList"
    :importComponent="importComponent"
  />
</template>

<script setup>
import { defineComponent } from "vue";
import { Preview } from "@components/preview";
import { app } from "./main.js";
const canvasComponent = [
  {
    component: "Button",
    label: "按钮",
    propValue: "按钮按钮",
    style: {
      width: "100px",
      height: "100px",
      top: "117px",
      left: "216.90625px",
    },
    attr: {
      type: "primary",
    },
    event: {
      redirect: "123",
      alert: "",
    },
  },
  {
    component: "Image",
    label: "图片",
    propValue:
      "https://xesfile.xesimg.com/app/happyexplore/2022/09/06/2450410_1662451249922_happyExplpre.jpg",
    style: {
      width: "100px",
      height: "100px",
      top: "281.5px",
      left: "335px",
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
  {
    name: "Image",
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

const importComponent = (c) => {
  const { component } = window[c]["default"];
  app.component(component.__name, component);
};
canvasComponent.forEach((i) => importComponent(i.component));

defineComponent({ name: "Html" });
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
