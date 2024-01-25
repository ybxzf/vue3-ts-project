<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style lang="less" scoped>
.page {
  height: 100%;
  //   width: 100%;
}
</style>
