<template>
  <div class="header">
    <a-button>撤销</a-button>
    <a-button>重做</a-button>
    <a-button>插入图片</a-button>
    <a-button>预览</a-button>
    <a-button>保存</a-button>
    <a-button>清空</a-button>
    <span style="margin: 0 10px">画布大小</span>
    <a-input style="width: 80px; margin-right: 5px" /> *
    <a-input style="width: 80px; margin-left: 5px" />
  </div>
</template>
<script setup>
import { defineComponent } from "vue";
defineComponent({ name: "Header" });
</script>
<style lang="less">
.header {
  height: 50px;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  button {
    margin-left: 5px;
  }
}
</style>