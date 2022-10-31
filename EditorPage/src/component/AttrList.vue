<template>
  <template v-if="hasCurComponent">
    <template v-for="style in curComponentStyle">
      <a-form-item v-if="attrList[style]" :label="attrList[style]" :key="style">
        <a-input v-model:value="curComponentInfo.canvasComponent.style[style]" />
      </a-form-item>
    </template>
  </template>
  <template v-else> 请选择物料 </template>
</template>
<script setup>
import { isNumber } from "@antfu/utils";
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";

defineComponent({ name: "AttrList" });

const componentStore = useComponentStore();
const curComponentInfo = computed(() => componentStore.curMouseDownComponent);
const curComponentStyle = computed(() =>
  Object.keys(curComponentInfo.value.canvasComponent.style)
);

const hasCurComponent = computed(() => isNumber(curComponentInfo.value.index));
const attrList = computed(() => componentStore.attrList);
</script>
