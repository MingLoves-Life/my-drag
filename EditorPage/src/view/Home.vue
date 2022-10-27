<template>
  <Header />
  <main class="main">
    <div class="leftAside">
      <ComponentList />
    </div>
    <div class="draw-warp" @drop="handleDrag" @dragover="handleDragOver">
      <Editor id="editorEl" />
    </div>
    <div style="width: 300px; border-left: 1px solid black">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="属性">
          <AttrList />
        </a-tab-pane>
        <a-tab-pane key="2" tab="事件">
          <EventList />
        </a-tab-pane>
        <a-tab-pane key="3" tab="动画">动画</a-tab-pane>
      </a-tabs>
    </div>
  </main>
</template>
<script setup>
import { defineComponent, ref } from "vue";
import Header from "/src/component/Header.vue";
import Editor from "/src/component/Editor.vue";
import ComponentList from "/src/component/ComponentList.vue";
import AttrList from "/src/component/AttrList.vue";
import EventList from "/src/component/EventList.vue";
import { useComponentStore } from "/src/store/component";
import { cloneDeep } from "lodash-es";
defineComponent({ name: "Home" });

const componentStore = useComponentStore();

const activeKey = ref();

const handleDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const component = cloneDeep(
    componentStore.componentList[e.dataTransfer.getData("index")]
  );
  const editorElRect = document
    .getElementById("editorEl")
    .getBoundingClientRect();
  const { x, y } = e;
  component.style.top = y - editorElRect.y + "px";
  component.style.left = x - editorElRect.x + "px";
  componentStore.addCanvasComponent(component);
  console.log({ component });
};
const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const ctrlKey = 17,
  vKey = 86,
  cKey = 67,
  xKey = 88;

window.onkeydown = (e) => {
  if (e.keyCode == ctrlKey) {
    componentStore.isCtrlDown = true;
  } else if (componentStore.isCtrlDown && e.keyCode == cKey) {
    componentStore.copy();
  } else if (componentStore.isCtrlDown && e.keyCode == vKey) {
    componentStore.paste();
  } else if (componentStore.isCtrlDown && e.keyCode == xKey) {
    componentStore.cut();
  }
};

window.onkeyup = (e) => {
  if (e.keyCode == ctrlKey) {
    componentStore.isCtrlDown = false;
  }
};
</script>
<style>
.main {
  display: flex;
  height: calc(100% - 50px);
}

.draw-warp {
  flex: 1;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.draw {
  background-color: white;
}

.leftAside {
  width: 200px;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
