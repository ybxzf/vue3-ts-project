<template>
  <div id="page">
    <div class="three-ctn" ref="myThree"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { render } from "@/cases/three/threeCase03";

const myThree = ref<any>();

onMounted(() => {
  //设置渲染器大小
  render.setSize(1000, 800);
  myThree.value?.appendChild(render.domElement);
});
</script>

<style lang="less" scoped></style>
