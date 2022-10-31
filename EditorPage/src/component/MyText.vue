<template>
  <a-textarea v-model:value="props.value" placeholder="" :rows="4" :maxlength="6" />
</template>
<script setup>
import { defineComponent } from 'vue';
defineComponent({ name: 'MyText' });

const props = defineProps(['value'])
</script>