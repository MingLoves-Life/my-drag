<template>
  <div :class="isCurComponent ? 'component-wrap' : ''">
    <template v-if="isCurComponent">
      <div
        v-for="(pointItem, index) in pointList"
        class="point"
        :style="{ ...getPointStyle(pointItem, index) }"
        @mousedown="(e) => handlePointMouseDown(e, pointItem)"
      />
    </template>
    <slot></slot>
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";

defineComponent({ name: "ComponentWrap" });

const componentStore = useComponentStore();

const props = defineProps(["index"]);
const isCurComponent = computed(
  () => componentStore.curMouseDownComponent.index === props.index
);
const curComponent = computed(
  () => componentStore.curMouseDownComponent.canvasComponent
);

const pointList = ["t", "r", "b", "l", "tr", "br", "bl", "tl"];
const cursorList = ["n", "e", "s", "w", "ne", "se", "sw", "nw"];

const clickedPoint = ref(false);
const startPoint = [0, 0];
const startWidthHeight = [0, 0];
const handlePointMouseDown = (e, pointItem) => {
  e.stopPropagation();
  clickedPoint.value = true;

  const { x, y } = e;
  startPoint[0] = x;
  startPoint[1] = y;

  const { width, height, top, left } = curComponent.value.style;
  startWidthHeight[0] = Number(width.slice(0, -2));
  startWidthHeight[1] = Number(height.slice(0, -2));
  console.log("handlePointMouseDown", startWidthHeight);

  const handlePointMouseMove = (e) => {
    if (clickedPoint.value) {
      const [startX, startY] = startPoint;
      const { x, y } = e;
      const moveX = x - startX;
      const moveY = y - startY;

      const newWidth = startWidthHeight[0] + moveX + "px";
      const newHeight = startWidthHeight[1] + moveY + "px";
      if (pointItem === "r") {
        curComponent.value.style.width = newWidth;
      }
    }
  };
  const handlePointMouseUp = (e) => {
    clickedPoint.value = false;

    console.log("handlePointMouseUp", curComponent.value.style);
    document.removeEventListener("mousemove", handlePointMouseMove);
    document.removeEventListener("mouseup", handlePointMouseUp);
  };
  document.addEventListener("mousemove", handlePointMouseMove);
  document.addEventListener("mouseup", handlePointMouseUp);
};

const getPointStyle = (pointItem, index) => {
  let top = 0,
    left = 0;
  if (isCurComponent.value) {
    if (pointItem === "t") {
      top = 0;
      left = curComponent.value.style.width.slice(0, -2) / 2;
    }
    if (pointItem === "tr") {
      top = 0;
      left = curComponent.value.style.width.slice(0, -2);
    }
    if (pointItem === "b") {
      top = curComponent.value.style.height.slice(0, -2);
      left = curComponent.value.style.width.slice(0, -2) / 2;
    }
    if (pointItem === "br") {
      top = curComponent.value.style.height.slice(0, -2);
      left = curComponent.value.style.width.slice(0, -2);
    }
    if (pointItem === "l") {
      left = 0;
      top = curComponent.value.style.height.slice(0, -2) / 2;
    }
    if (pointItem === "bl") {
      left = 0;
      top = curComponent.value.style.height.slice(0, -2);
    }
    if (pointItem === "tl") {
      top = 0;
      left = 0;
    }
    if (pointItem === "r") {
      left = curComponent.value.style.width.slice(0, -2);
      top = curComponent.value.style.height.slice(0, -2) / 2;
    }
  }
  const style = {
    top: top - 2.5 + "px",
    left: left - 2.5 + "px",
    cursor: cursorList[index] + "-resize",
  };
  return style;
};
</script>

<style lang="less">
.component-wrap {
  &:hover {
    cursor: move;
  }

  .point {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    border: 1px solid blue;
    position: absolute;
    z-index: 998;
  }
}
</style>
