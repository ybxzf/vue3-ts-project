<template>
  <div class="screen-menu">
    <div class="menu-line"></div>
    <div class="menu-ctn">
      <div class="menu-close" @click="closeMenu">
        <div>系统导航</div>
        <i class="el-icon-s-fold"></i>
      </div>
      <el-menu :default-active="nowTagValue" :show-timeout="200" :collapse="keyCollapse" unique-opened mode="vertical">
        <sidebar-item :menu="menu" :screen="screen" :props="website.menu.props" :collapse="keyCollapse" first />
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import sidebarItem from '@/page/index/sidebar/sidebarItem.vue'
export default {
  name: "ScreenMenu",
  components: {
    sidebarItem,
  },
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen']),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  watch: {},

  created() {
  },
  mounted() {
  },
  methods: {
    //关闭菜单
    closeMenu() {
      this.$emit('closeMenu');
    },
  }
}

</script>
<style lang="scss" scoped>
.screen-menu {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 15%;
  height: calc(100% - 100px);
  z-index: 3;
  color: #fff !important;

}

.screen-menu * {
  z-index: inherit;
}

.menu-line {
  width: 100%;
  height: 10px;
  background: url('/img/bg/title-line.png') no-repeat;
  background-size: 100% 100%;
}

.menu-ctn {
  width: 100%;
  height: 100%;
  border-left: 2px solid rgb(0, 148, 254);
  border-right: 2px solid rgb(0, 148, 254);
  border-bottom: 2px solid rgb(0, 148, 254);
  background: rgba(7, 43, 79, 0.9);

  .menu-close {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
  }

}

.el-menu {
  overflow-y: auto;
  max-height: calc(100% - 50px);

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}


::v-deep.el-menu span {
  color: #ffffff;
}

::v-deep.el-menu i {
  color: #ffffff;
}
</style>