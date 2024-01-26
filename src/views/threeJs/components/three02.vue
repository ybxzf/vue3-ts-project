<template>
  <div>
    <div id="myThree" ref="myThree"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { render } from "@/cases/three/threeCase02";

const myThree = ref<any>();

onMounted(() => {
  //含鼠标控件的基础图像
  myThree.value?.appendChild(render.domElement);
});
</script>

<style lang="less" scoped></style>
