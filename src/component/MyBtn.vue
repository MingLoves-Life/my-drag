<template>
    <a-button>{{props.value}}</a-button>
</template>
<script setup>
import { defineComponent } from 'vue';

defineComponent({ name: 'MyBtn' });

const props = defineProps(['value'])

</script>