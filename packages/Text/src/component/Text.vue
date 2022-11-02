<template>
  <Textarea
    v-model:value="props.value"
    placeholder=""
    :rows="4"
    :maxlength="6"
  />
</template>
<script setup name="Text">
import { Textarea } from "ant-design-vue";
// import { defineComponent } from 'vue';
// defineComponent({ name: 'Text' });

const props = defineProps(["value"]);
</script>
<!-- <script>
export default {
  name: "Text",
};
</script> -->

<!-- <template>
  <a-textarea v-model:value="props.value" placeholder="" :rows="4" :maxlength="6" />
</template>
<script setup>
import { defineComponent } from 'vue';
defineComponent({ name: 'Text' });

const props = defineProps(['value'])
</script> -->