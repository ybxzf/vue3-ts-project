<template>
    <div class="drag-container" ref="dragContainer">
        <div class="draggable" v-for="(data, i) in datas" :key="i"
            :style="{ top: data.top + 'px', left: data.left + 'px' }" @mousedown="startDrag($event, i)">
            拖拽我{{ i+1 }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, h, resolveComponent, nextTick, ref } from 'vue'

const dragContainer = ref();
const nowIndex = ref(0);
const datas = reactive<any>([
    {
        top: 0,
        left: 400,
        isDragging: false,
        startX: 0,
        startY: 0,
        containerRect: 0,

    },
    {
        top: 100,
        left: 400,
        isDragging: false,
        startX: 0,
        startY: 0,
        containerRect: 0,

    },
])

//点击拖拽
function startDrag(event: any, index: number) {
    console.log('点击开始拖拽：startDrag', event);
    nowIndex.value = index;
    //容器dragContainer相对于window的位置
    datas[nowIndex.value].containerRect = dragContainer.value.getBoundingClientRect();
    console.log('datas[nowIndex.value].containerRect', datas[nowIndex.value].containerRect);

    datas[nowIndex.value].isDragging = true;
    datas[nowIndex.value].startX = event.clientX;
    datas[nowIndex.value].startY = event.clientY;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
}
//拖拽时坐标计算
function drag(event: any) {
    if (datas[nowIndex.value].isDragging) {
        const offsetX = event.clientX - datas[nowIndex.value].startX;
        const offsetY = event.clientY - datas[nowIndex.value].startY;
        datas[nowIndex.value].left += offsetX;
        datas[nowIndex.value].top += offsetY;
        datas[nowIndex.value].startX = event.clientX;
        datas[nowIndex.value].startY = event.clientY;
    }
}
//拖拽结束后坐标计算
function endDrag(event: any) {
    console.log('拖拽结束：endDrag', event.clientX, event.clientY);
    console.log('拖拽结束：endDrag', event);
    console.log("datas: ", datas[nowIndex.value].left, datas[nowIndex.value].top);

    datas[nowIndex.value].isDragging = false;
    //设置x边界
    if (datas[nowIndex.value].left < 0) {
        datas[nowIndex.value].left = 0;
    } else if (datas[nowIndex.value].left > (400 - 100)) {
        datas[nowIndex.value].left = (400 - 100);
    }
    //设置y边界
    if (datas[nowIndex.value].top < 0) {
        datas[nowIndex.value].top = 0;
    } else if (datas[nowIndex.value].top > (400 - 100)) {
        datas[nowIndex.value].top = (400 - 100);
    }

    for (let i = 0; i < 400;) {
        const x = event.clientX - datas[nowIndex.value].containerRect.x;
        if (x > i && x < (i + 100)) {
            datas[nowIndex.value].left = i;
        }
        const y = event.clientY - datas[nowIndex.value].containerRect.y;

        if (y > i && y < (i + 100)) {
            datas[nowIndex.value].top = i;
        }
        i += 100;
    }
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
}

</script>
<style lang="less" scoped>
.drag-container {
    width: 400px;
    height: 400px;
    border: 1px solid gray;
    position: relative;
    background:
        linear-gradient(to right, #ccc 1px, transparent 1px) 0 0,
        linear-gradient(to bottom, #ccc 1px, transparent 1px) 0 0;
    background-size: 100px 100px;
}

.draggable {
    width: 100px;
    height: 100px;
    position: absolute;
    background-color: #a0a0a0;
    cursor: move;
}
</style>