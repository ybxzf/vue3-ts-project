<template>
  <div class="device-sum">
    <div class="item left">
      <div>设备总数</div>
      <div class="num">{{ deviceDetails.total }} </div>
    </div>
    <div class="item right">
      <div>在线设备数</div>
      <div class="num">{{ deviceDetails.onLine }} </div>
    </div>
    <!-- 占位 -->
    <div class="item seat"></div>
    <div class="item left">
      <div>故障设备数</div>
      <div class="num">{{ deviceDetails.fault }} </div>
    </div>
    <div class="item right">
      <div>离线设备数</div>
      <div class="num">{{ deviceDetails.offLine }} </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeviceSum",
  components: {
  },
  props: {

  },
  data() {
    return {
      deviceDetails: {
        total: "xx",
        onLine: "xx",
        fault: "xx",
        offLine: "xx",
      },
    }
  },
  computed: {},
  watch: {},

  created() {
  },
  mounted() {
    this.getSum();
  },
  methods: {
    getSum() {
      axios({
        url: "/li-upms-base-biz/deviceInfo/deviceCount",
        method: "get",
      }).then((res) => {
        const data = res.data;
        if (data.code == 0) {
          this.deviceDetails = data.data;
        } else {
          this.$message.error(data.msg);
        }
      }).finally(() => {
      });
    }
  }
}

</script>
<style lang="scss" scoped>
.device-sum {
  height: 100%;
  background-image: url('/img/bg/device-sum.jpg');
  background-size: 100% 100%;
  // box-sizing: content-box;
  // border: 1px solid rgb(41, 171, 93);

  .item {
    width: 50%;
    height: 40%;
    float: left;
    box-sizing: border-box;
    padding: 0 15px;
    // border: 1px solid rgb(41, 171, 93);
    font-size: 14px;
    color: #D4E5FB;

    .num {
      height: 45%;
      font-family: 'RUI-BLACK-SIM';
      font-style: italic;
      // margin-top: 5px;
      font-size: 20px;
      font-weight: 600;
      background: linear-gradient(to bottom, #79EAFF, #19ABFF);
      -webkit-background-clip: text;
      color: transparent;
      display: inline-block;
      white-space: pre-wrap;
      display: flex;
      align-items: flex-end;
    }
  }

  .seat {
    width: 100%;
    height: 16%;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
