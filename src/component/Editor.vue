<template>
  <div
    class="draw"
    :style="{
      width: headerInfoStore.canvasSize.width + 'px',
      height: headerInfoStore.canvasSize.height + 'px',
      position: 'relative',
    }"
    @mousedown="handleDrawMouseDown"
    @mousemove="handleDrawMouseMove"
    @mouseup="handleDrawMouseUp"
    @contextmenu="handleContextMenu"
  >
    <ComponentWrap
      v-for="(component, index) in componentStore.canvasComponent"
      :key="component.label"
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
        @mousedown="(e) => handleComponentMouseDown(e, index)"
      >
      </component>
    </ComponentWrap>
    <context-menu :contextMenuInfo="contextMenuInfo" />
    <mark-link ref="markLinkRef" />
    <preview />
  </div>
</template>
<script setup>
import ContextMenu from "/src/component/ContextMenu.vue";
import ComponentWrap from "/src/component/ComponentWrap.vue";
import MarkLink from "/src/component/MarkLink.vue";
import Preview from "/src/component/Preview.vue";

import { defineComponent } from "vue";

import { useHeaderInfoStore } from "/src/store/headerInfo";
import { useComponentStore } from "/src/store/component";

import { isNumber } from "@antfu/utils";

defineComponent({ name: "Editor" });

const headerInfoStore = useHeaderInfoStore();
const componentStore = useComponentStore();

const clickMouse = ref(false);
const markLinkRef = ref();

const contextMenuInfo = reactive({ top: -1000, left: 0 });

const handleDrawMouseDown = (e) => {
  console.log("handleDrawMouseDown");
  if (e.target.className === "draw") {
    componentStore.curMouseDownComponent.index = null;
    contextMenuInfo.top = -1000;
  }
  clickMouse.value = true;
};

// 取消物料
const handleDrawMouseUp = () => {
  console.log("handleDrawMouseUp");
  clickMouse.value = false;
};

// 拖动物料移动
const handleDrawMouseMove = (e) => {
  e.preventDefault();
  const index = componentStore.curMouseDownComponent.index;
  if (clickMouse.value && isNumber(index)) {
    console.log("handleDrawMouseMove");
    const curComponent = componentStore.curMouseDownComponent.canvasComponent;

    const startTop = +componentStore.curMouseDownComponent.top.slice(0, -2);
    const startLeft = +componentStore.curMouseDownComponent.left.slice(0, -2);

    const { startClientX, startClientY } = componentStore.curMouseDownComponent;
    const { clientX: curClientX, clientY: curClientY } = e;

    curComponent.style.top = curClientY - startClientY + startTop + "px";
    curComponent.style.left = curClientX - startClientX + startLeft + "px";

    markLinkRef.value.checkNear();
  }
};

// 点击物料
const handleComponentMouseDown = (e, index) => {
  console.log("handleComponentMouseDown");
  componentStore.curMouseDownComponent.index = index;
  componentStore.curMouseDownComponent.canvasComponent =
    componentStore.canvasComponent[index];

  componentStore.curMouseDownComponent.left =
    componentStore.canvasComponent[index].style.left;
  componentStore.curMouseDownComponent.top =
    componentStore.canvasComponent[index].style.top;

  const { clientX, clientY } = e;
  componentStore.curMouseDownComponent.startClientX = clientX;
  componentStore.curMouseDownComponent.startClientY = clientY;
};

const handleContextMenu = (e) => {
  console.log("handleContextMenu");
  e.preventDefault();
  e.stopPropagation();

  const { x, y } = e;

  const editorElRect = document
    .getElementsByClassName("draw")[0]
    .getBoundingClientRect();

  contextMenuInfo.left = x - editorElRect.x;
  contextMenuInfo.top = y - editorElRect.y;
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
      data[key] = style[key];
    }
  });
  return data;
};
</script>
