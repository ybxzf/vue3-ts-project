<template>
  <div class="navbar-left">
    <el-menu
      class="menu-vertical"
      :collapse="isCollapse"
      :default-active="route.name"
      @select="handleSelect"
      :collapse-transition="false"
    >
      <img class="menu-logo" src="/favicon.ico" />
      <vue v-for="(item, index) in getRoutes" :key="index">
        <el-sub-menu v-if="item.children" :index="item.name">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>{{ item.cName }}</span>
          </template>
          <el-menu-item
            v-for="(it, i) in item.children"
            :key="i"
            :index="it.name"
          >
            <template #title>
              <!-- <el-icon><Menu /></el-icon> -->
              <span>{{ it.cName }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.name">
          <el-icon><Menu /></el-icon>
          <template #title>
            <span>{{ item.cName }}</span>
          </template>
        </el-menu-item>
      </vue>
    </el-menu>
    <div class="footer-content" @click="toggleFold(!isCollapse)">
      <el-icon>
        <DArrowRight v-show="isCollapse" class="label-text" />
        <DArrowLeft v-show="!isCollapse" class="label-text" />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router/routes";
import { DArrowLeft, DArrowRight, Menu } from "@element-plus/icons-vue";

const router: any = useRouter();
const route: any = useRoute();

const isCollapse = ref<boolean>(false);

const getRoutes = computed(() => routes[1].children);

onMounted(() => {
  //   console.log(getRoutes.value);
  //   console.log(route.path);
  handleSelect(route.name);
});

function handleSelect(key: string) {
  //   console.log("key", key);
  //   console.log("route", route.path);
  //   console.log("router", router);

  router.push({
    path: `/${key}`,
    query: {},
  });
}

function toggleFold(param: boolean) {
  isCollapse.value = param;
}
</script>

<style scoped lang="less">
@footer-height: 30px;

.navbar-left {
  position: relative;
  height: 100%;
  background: var(--devui-base-bg, #ffffff);
  --el-menu-base-level-padding: 15px;
  ::-webkit-scrollbar {
    display: none;
  }
  .menu-vertical {
    width: 180px;
    height: 100%;
    min-height: calc(100% - @footer-height);
    padding: 0 0 @footer-height 0;
    overflow-y: auto;

    &.el-menu--collapse {
      width: 60px;
    }
    .menu-logo {
      width: 50%;
      margin: 5px 20%;
    }

    .el-sub-menu {
      .el-tooltip__trigger {
        span {
          display: none;
        }
      }
    }
    .el-menu-item.is-active {
      background-color: #e3f1ff;
    }
  }
}

.footer-content {
  position: absolute;
  bottom: 0;
  width: calc(100% - 1px);
  height: @footer-height;
  line-height: @footer-height;
  background-color: #fff;
  // padding: 0 5px;

  .el-icon {
    float: right;
    height: @footer-height;
    width: @footer-height;
  }
}

.footer-content:hover {
  cursor: pointer;
  background-color: #e0e0e0;
  box-shadow: var(--devui-light-shadow, rgba(37, 43, 58, 0.1))
    var(--devui-shadow-length-slide-right, 2px 0 8px 0);
  border-radius: 4px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
