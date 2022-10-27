<template>
    <img :src="props.value" />
</template>
<script setup>
import { defineComponent } from 'vue';

defineComponent({ name: 'MyBtn' });

const props = defineProps(['value'])

</script>