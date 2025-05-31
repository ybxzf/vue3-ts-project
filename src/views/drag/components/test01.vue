<template>
    <div class="drag-container" ref="dragContainer">
        <div class="draggable" :style="{ top: datas.top + 'px', left: datas.left + 'px' }" @mousedown="startDrag">
            拖拽我
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, h, resolveComponent, nextTick, ref } from 'vue'

const dragContainer = ref();
const datas = reactive<any>({
    top: 0,
    left: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    containerRect: 0,

})

//点击拖拽
function startDrag(event: any) {
    console.log('点击开始拖拽：startDrag', event);

    //容器dragContainer相对于window的位置
    datas.containerRect = dragContainer.value.getBoundingClientRect();
    console.log('datas.containerRect', datas.containerRect);

    datas.isDragging = true;
    datas.startX = event.clientX;
    datas.startY = event.clientY;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
}
//拖拽时坐标计算
function drag(event: any) {
    if (datas.isDragging) {
        const offsetX = event.clientX - datas.startX;
        const offsetY = event.clientY - datas.startY;
        datas.left += offsetX;
        datas.top += offsetY;
        datas.startX = event.clientX;
        datas.startY = event.clientY;
    }
}
//拖拽结束后坐标计算
function endDrag(event: any) {
    console.log('拖拽结束：endDrag', event.clientX, event.clientY);
    console.log('拖拽结束：endDrag', event);
    console.log("datas: ", datas.left, datas.top);

    datas.isDragging = false;
    //设置x边界
    if (datas.left < 0) {
        datas.left = 0;
    } else if (datas.left > (400 - 100)) {
        datas.left = (400 - 100);
    }
    //设置y边界
    if (datas.top < 0) {
        datas.top = 0;
    } else if (datas.top > (400 - 100)) {
        datas.top = (400 - 100);
    }

    for (let i = 0; i < 400;) {
        const x = event.clientX - datas.containerRect.x;
        if (x > i && x < (i + 100)) {
            datas.left = i;
        }
        const y = event.clientY - datas.containerRect.y;

        if (y > i && y < (i + 100)) {
            datas.top = i;
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