<template>
  <div class="big-header">
    <el-button v-if="$route.path == '/bigScreen'" class="big-menu" type="primary" icon="el-icon-s-unfold"
      @click="showMenu">菜单</el-button>
    <el-button v-else class="big-menu" type="primary" icon="el-icon-monitor" @click="handleBigScreen">大屏</el-button>
    <el-image class="big-title" src="/img/bg/login_title.png"></el-image>
    <el-image class="big-logo" src="/img/bg/logo.png"></el-image>

  </div>
</template>
<script>
export default {
  name: "BasicItem",
  components: {
  },
  props: {
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},

  created() {
  },
  mounted() {
  },
  methods: {
    showMenu() {
      this.$emit('showMenu');
    },
    handleBigScreen() {
      this.$router.push({ path: "/bigScreen" });
    },
  }
}

</script>
<style lang="scss" scoped>
.big-header {
  height: 100%;
  width: 100%;
}

.big-menu {
  position: absolute;
  left: 3%;
  bottom: 5%;
  // width: 65px;
  // height: 25px;
  background-image: url('/img/bg/menu-button-bg.png');
  background-size: 100% 100%;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // padding: 0 10px;
  // font-size: 13px;

  // .el-icon-s-fold {
  //   height: 16px;
  // }
}

::v-deep.el-button.el-button--primary {
  border: 1px solid rgb(20, 128, 105);
  box-shadow: rgb(20, 128, 105) 0px 0px 20px inset;


}

::v-deep.el-button.el-button--small {
  padding: 5px 10px;
  font-size: 14px;
}

.big-title {
  position: absolute;
  width: 30%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.big-logo {
  position: absolute;
  right: 3%;
  bottom: 5%;
}
</style>