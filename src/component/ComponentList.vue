<template>
  <a-button style="width: 100px">文字</a-button>
  <a-button style="width: 100px">按钮</a-button>
  <a-button style="width: 100px">图片</a-button>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";
defineComponent({ name: "ComponentList" });

const componentStore = useComponentStore();
console.log({ ...componentStore });
</script>
