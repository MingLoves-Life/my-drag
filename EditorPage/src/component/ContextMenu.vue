<template>
    <div class="menu-list-wrap"
        :style="{top: props.contextMenuInfo.top+'px',left: props.contextMenuInfo.left+'px',zIndex:9999}">
        <div class="menu-item" @click="(e)=>handleClick(e,'del')">删除</div>
        <div class="menu-item" @click="(e)=>handleClick(e,'up')">上移</div>
        <div class="menu-item" @click="(e)=>handleClick(e,'down')">下移</div>
        <div class="menu-item" @click="(e)=>handleClick(e,'top')">置顶</div>
        <div class="menu-item" @click="(e)=>handleClick(e,'bottom')">置底</div>
    </div>
</template>
<script setup>
import { defineComponent } from 'vue';
import { useComponentStore } from "/src/store/component";

defineComponent({ name: 'ContextMenu' });

const componentStore = useComponentStore();

const props = defineProps(['contextMenuInfo'])

const componentList = computed(() => componentStore.canvasComponent)
const curComponentIndex = computed(() => componentStore.curMouseDownComponent.index)

const handleClick = (e, type) => {
    e.stopPropagation()
    events(type)
    props.contextMenuInfo.top = -1000
}

const events = (type) => {
    const length = componentList.value.length
    const up = () => {
        if (length !== curComponentIndex.value + 1) {
            const curComponent = componentList.value[curComponentIndex.value]
            componentList.value.splice(curComponentIndex.value, 1)
            componentList.value.splice(curComponentIndex.value + 1, 0, curComponent)
            componentStore.curMouseDownComponent.index++
        }
    }
    const down = () => {
        if (curComponentIndex.value !== 0) {
            const curComponent = componentList.value[curComponentIndex.value]
            componentList.value.splice(curComponentIndex.value, 1)
            componentList.value.splice(curComponentIndex.value - 1, 0, curComponent)
            componentStore.curMouseDownComponent.index--

        }
    }
    const del = () => {
        componentList.value.splice(curComponentIndex.value, 1)
        componentStore.curMouseDownComponent.index = null
    }
    const top = () => {
        const curComponent = componentList.value[curComponentIndex.value]
        componentList.value.splice(curComponentIndex.value, 1)
        componentList.value.push(curComponent)
        componentStore.curMouseDownComponent.index = length - 1
    }
    const bottom = () => {
        const curComponent = componentList.value[curComponentIndex.value]
        componentList.value.splice(curComponentIndex.value, 1)
        componentList.value.unshift(curComponent)
        componentStore.curMouseDownComponent.index = 0
    }
    switch (type) {
        case 'del':
            del()
            break;
        case 'up':
            up()
            break;
        case 'down':
            down()
            break;
        case 'top':
            top()
            break;
        case 'bottom':
            bottom()
            break;
        default:
            break;
    }
}
</script>

<style lang="less">
.menu-list-wrap {
    position: absolute;
    width: 80px;
    background-color: pink;
    display: flex;
    flex-direction: column;
}

.menu-item {
    width: 100%;
    border-bottom: 1px solid gray;
    text-align: center;
}
</style>