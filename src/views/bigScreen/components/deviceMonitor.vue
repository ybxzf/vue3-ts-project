<template>
  <div class="device-monitor">
    <div class="item">
      <el-image src="/img/bg/eg1.png" style="width: calc(100% - 10px); height: calc(100% - 10px)"></el-image>
    </div>
    <div class="item">
      <el-image src="/img/bg/eg2.png" style="width: calc(100% - 10px); height: calc(100% - 10px)"></el-image>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeviceMonitor",
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
    initChart() {

    }
  }
}

</script>
<style lang="scss" scoped>
.device-monitor {
  height: 100%;
  box-sizing: content-box;
  // border: 1px solid rgb(41, 171, 93);
  display: flex;

  .item {
    width: 46%;
    height: 80%;
    margin: 2%;
    // padding: 10px 10px 30px 10px;
    padding-left: 10px;
    padding-top: 10px;
    // border: 1px solid rgb(41, 171, 93);
    background-image: url('/img/bg/monitor-bg.png');
    background-size: 100% 100%;
  }

  .el-image {
    transition: transform 1s ease;
  }

  .el-image :hover {
    transform: scale(1.1);
  }
}
</style>