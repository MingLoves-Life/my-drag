<template>
  <Button>{{ value }}</Button>
</template>
<script setup>
import { defineComponent } from "vue";
import { Button } from "ant-design-vue";
defineComponent({ name: "Button" });

const props = defineProps(["value"]);
</script>