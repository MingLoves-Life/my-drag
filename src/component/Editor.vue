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
    <div
      class="selectWrap"
      :style="{
        position: 'absolute',
        left: selectDivInfo.x + 'px',
        top: selectDivInfo.y + 'px',
        width: selectDivInfo.width + 'px',
        height: selectDivInfo.height + 'px',
        backgroundColor: selectDivInfo.showBgColor ? 'blue' : '',
        border: '1px solid blue',
        zIndex: 999,
        opacity: 0.1,
      }"
    ></div>
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

import { defineComponent, reactive } from "vue";

import { useHeaderInfoStore } from "/src/store/headerInfo";
import { useComponentStore } from "/src/store/component";

import { isNumber } from "@antfu/utils";

defineComponent({ name: "Editor" });

const headerInfoStore = useHeaderInfoStore();
const componentStore = useComponentStore();

const clickMouse = ref(false);
const isMoveComponent = ref(false);
const markLinkRef = ref();

const contextMenuInfo = reactive({ top: -1000, left: 0 });

const selectDivInfo = reactive({
  show: false,
  showBgColor: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

// 鼠标点击
const handleDrawMouseDown = (e) => {
  console.log("handleDrawMouseDownWithoutDraw");
  if (e.target.className === "draw") {
    componentStore.curMouseDownComponent.index = null;
    contextMenuInfo.top = -1000;

    const { clientX, clientY } = e;
    const editorElRect = document
      .getElementById("editorEl")
      .getBoundingClientRect();

    const empty = { show: false, x: 0, y: 0, width: 0, height: 0 };
    Object.keys(empty).forEach((key) => (selectDivInfo[key] = empty[key]));

    selectDivInfo.show = true;
    selectDivInfo.x = clientX - editorElRect.x;
    selectDivInfo.y = clientY - editorElRect.y;
    selectDivInfo.showBgColor = true;
    console.log("handleDrawMouseDown", { ...selectDivInfo });
  }
  clickMouse.value = true;
};

// 鼠标抬起
const handleDrawMouseUp = (e) => {
  if (isMoveComponent.value) {
    console.log("handleDrawMouseUpWithComponent");
    isMoveComponent.value = false;
  } else {
    console.log("handleDrawMouseUpWithoutComponent");
    checkSelectScope(e);
    selectDivInfo.showBgColor = false;
  }
  clickMouse.value = false;
};

// 鼠标移动
const handleDrawMouseMove = (e) => {
  e.preventDefault();
  const { clientX: curClientX, clientY: curClientY } = e;
  const { curMouseDownComponent } = componentStore;
  const index = curMouseDownComponent.index;

  if (clickMouse.value && isNumber(index)) {
    // console.log("handleDrawMouseMoveForComponent");
    const curComponent = curMouseDownComponent.canvasComponent;

    const startTop = +curMouseDownComponent.top.slice(0, -2);
    const startLeft = +curMouseDownComponent.left.slice(0, -2);

    const { startClientX, startClientY } = curMouseDownComponent;

    curComponent.style.top = curClientY - startClientY + startTop + "px";
    curComponent.style.left = curClientX - startClientX + startLeft + "px";

    isMoveComponent.value = true;
    markLinkRef.value.checkNear();
  } else if (clickMouse.value) {
    const editorElRect = document
      .getElementById("editorEl")
      .getBoundingClientRect();
    selectDivInfo.width = curClientX - selectDivInfo.x - editorElRect.x;
    selectDivInfo.height = curClientY - selectDivInfo.y - editorElRect.y;
    // console.log("handleDrawMouseMoveForSelect", { ...selectDivInfo });
    isMoveComponent.value = false;
  }
};

// 点击物料
const handleComponentMouseDown = (e, index) => {
  console.log("handleComponentMouseDown");
  const { curMouseDownComponent } = componentStore;

  curMouseDownComponent.index = index;
  curMouseDownComponent.canvasComponent = componentStore.canvasComponent[index];
  curMouseDownComponent.left = componentStore.canvasComponent[index].style.left;
  curMouseDownComponent.top = componentStore.canvasComponent[index].style.top;

  const { clientX, clientY } = e;
  curMouseDownComponent.startClientX = clientX;
  curMouseDownComponent.startClientY = clientY;
};

// 右键菜单
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

const slice2 = (params) => params.slice(0, -2);
// 检查获取范围内物料
const checkSelectScope = (e) => {
  const { clientX, clientY } = e;
  const editorElRect = document
    .getElementById("editorEl")
    .getBoundingClientRect();
  console.log("checkSelectScope");
  const info = {
    y: undefined,
    x: undefined,
    width: 0,
    height: 0,
  };
  componentStore.canvasComponent.forEach((component) => {
    const { top, left, width, height } = { ...component.style };
    if (
      slice2(left) > selectDivInfo.x &&
      +slice2(left) + +slice2(width) < clientX - editorElRect.x &&
      slice2(top) > selectDivInfo.y &&
      +slice2(top) + +slice2(height) < clientY - editorElRect.y
    ) {
      info.y =
        info.y === undefined ? +slice2(top) : Math.min(info.y, +slice2(top));
      info.x =
        info.x === undefined ? +slice2(left) : Math.min(info.x, +slice2(left));
      info.width = Math.max(info.width, +slice2(left) + +slice2(width));
      info.height = Math.max(info.height, +slice2(top) + +slice2(height));
    }
  });
  info.width = info.width - info.x;
  info.height = info.height - info.y;
  selectDivInfo.x = info.x;
  selectDivInfo.y = info.y;
  selectDivInfo.width = info.width;
  selectDivInfo.height = info.height;
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
