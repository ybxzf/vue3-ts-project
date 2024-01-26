<template>
  <div>
    <div id="myThree" ref="myThree"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { render } from "@/cases/three/threeCase01";

const myThree = ref<any>();

onMounted(() => {
  //最基础的图像渲染
  myThree.value?.appendChild(render.domElement);
});
</script>

<style lang="less" scoped></style>
