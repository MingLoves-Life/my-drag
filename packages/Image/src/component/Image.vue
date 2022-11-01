<template>
  <img :src="props.value" />
</template>
<script setup>
import { defineComponent } from 'vue';

defineComponent({ name: 'Image' });

const props = defineProps(['value'])

</script>