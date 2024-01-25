<template>
  <div class="page">
    <div>
      姓名：
      <div>解构:{{ user.name }}----不解构:{{ userStore.user.name }}</div>
    </div>
    <div>
      年龄：
      <div>解构:{{ user.age }}----不解构:{{ userStore.user.age }}</div>
    </div>
    <div>
      出生年份：
      <!-- 解构的计算属性无法响应式改变 -->
      <div>解构:{{ birth }}----不解构:{{ userStore.birth }}</div>
    </div>
    <div>性别：{{ user.sex }}----{{ userStore.user.sex }}</div>
    <div>邮箱：{{ user.email }}----{{ userStore.user.email }}</div>
    <div>
      <el-button type="primary" @click="updateInfoJ">解构修改</el-button>
      <el-button type="primary" @click="updateInfo">不解构修改</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useInformStore } from "@/stores/inform";

const { user, birth, updateUserInfo } = useInformStore();
const userStore = useInformStore();

onMounted(() => {});
watch(
  () => userStore.birth,
  (_newValue, _oldValue) => {
    console.log(_newValue, _oldValue);
  },
  {
    deep: true,
  }
);

function updateInfoJ() {
  updateUserInfo({
    name: "张三",
    age: 1,
    sex: "male",
    email: "无",
  });
}

function updateInfo() {
  userStore.updateUserInfo({
    name: "李四",
    age: 2,
    sex: "male",
    email: "无",
  });
}
</script>
<style scoped lang="less">
.page {
  height: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    color: rgb(232, 0, 253);
  }
}
</style>
