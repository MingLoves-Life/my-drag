<template>
  <a-modal
    title="预览"
    v-model:visible="previewInfo.visible"
    :width="previewInfo.width + 'px'"
    :bodyStyle="{ height: previewInfo.height + 'px', position: 'relative' }"
    @ok="handleOk"
  >
    <Preview
      :components="componentStore.canvasComponent"
      :eventList="eventList"
    />
  </a-modal>
</template>
<script setup>
import { defineComponent } from "vue";
import { useComponentStore } from "/src/store/component";
import { Preview } from "@components/preview";

defineComponent({ name: "Preview" });
const componentStore = useComponentStore();
const previewInfo = computed(() => componentStore.previewInfo);

const curComponentConfig = computed(() =>
  componentStore.componentConfigList.filter((i) =>
    componentStore.canvasComponent.some((c) => c.component === i.name)
  )
);
console.log(curComponentConfig.value);
const eventList = computed(() =>
  curComponentConfig.value.map(({ name, eventProps }) => ({ name, eventProps }))
);

const handleOk = () => {
  componentStore.previewInfo.visible = false;
};
</script>
