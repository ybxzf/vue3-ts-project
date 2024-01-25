<template>
  <div class="page">
    <div class="page-bar">
      <LeftNavBar></LeftNavBar>
    </div>
    <div class="page-ctn">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import LeftNavBar from "@/components/Layout/LeftNavBar.vue";
</script>

<style lang="less" scoped>
.page {
  display: flex;
  height: 100%;
  //   border: 1px solid red;
  .page-bar {
    height: 100%;
    background-color: #fff;
    box-shadow: var(--devui-light-shadow, rgba(37, 43, 58, 0.1))
      var(--devui-shadow-length-slide-right, 2px 0 8px 0);
  }
  .page-ctn {
    width: 100%;
    height: 100%;
  }
}
</style>
