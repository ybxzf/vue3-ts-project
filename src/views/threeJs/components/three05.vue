<template>
  <div id="page">
    <el-button type="primary" @click="showThree">打开</el-button>
    <div class="three-ctn" ref="myThree">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ThreeCase } from "@/cases/three/threeModules/case05/ThreeCase";

const myThree = ref<any>(null);
const threeCase = ref<any>(null);
const show = ref<boolean>(true);

onMounted(() => {
  init();
});

const init = () => {
  if (myThree.value) {
    threeCase.value = new ThreeCase(myThree.value);
  }
}

function showThree() {
  if (show.value) {
    threeCase.value.render();
    show.value = false;
  }
}

</script>

<style lang="less" scoped>
.three-ctn {
  width: 1000px;
  height: 800px;
}
</style>
