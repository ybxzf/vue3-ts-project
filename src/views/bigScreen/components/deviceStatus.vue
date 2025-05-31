<template>
  <div class="device-status" ref="tableContainer" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <div v-for="(it, i) in deviceList" :key="i" class="device-item">
      <div class="item-img">
        <video x5-video-player-type="h5" x5-playsinline="" playsinline="" webkitplaysinline="true" width="485"
          height="80" autoplay loop="" :src="'/movie/flash.webm'" poster="" webkit-playsinline=""
          controlslist="nodownload" style="width: 100px; height: 100%; object-fit: fill;" class=""></video>
        <el-image :src="it.img"></el-image>
      </div>
      <div class="item-content">
        <div class="item-label">
          <el-image src="/img/arrow.png" style="width: 18px;height: 12px;"></el-image>&nbsp;&nbsp;
          <span>{{ it.label }}</span>
        </div>
        <div class="item-status">
          <div class="status-base">
            <div>异常</div>
            <div><span class="status-num">{{ it.error }}</span>&nbsp;个</div>
          </div>
          <div class="status-base">
            <div>正常</div>
            <div><span class="status-num">{{ it.normal }}</span>&nbsp;个</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeviceStatus",
  components: {
  },
  props: {
    deviceStatusObj: {//所有日志信息
      type: Object,
      default: () => ({}),
    },
    nowStation: {//当前工位
      type: String,
      default: () => "prepare",
    },
  },
  data() {
    return {
      deviceList: [ // 设备列表
        { key: 'parts', label: '设备部件', normal: 0, error: 0, img: '/img/device-component.png' },
        { key: 'machinery', label: '电机', normal: 0, error: 0, img: '/img/elec-machine.png' },
        { key: 'robot', label: '六轴机器人', normal: 0, error: 0, img: '/img/six-axis-robot.png' },
      ],
      scrollPosition: 0,//滚动位置
      intervalId: null,//循环器
    }
  },
  computed: {},
  watch: {
    deviceStatusObj: {
      handler(newVal) {
        this.init(newVal);
      },
      deep: true,
    },
  },

  created() {
  },
  mounted() {
    this.init({});
    // 启动滚动定时器，每隔一段时间调整滚动位置
    // this.intervalId = setInterval(this.scrollTable, 100);
  },
  methods: {
    //初始化数据
    init(obj) {
      if (Object.keys(obj).length > 0) {
        this.deviceList.forEach(item => {
          item.normal = obj[item.key].normal;
          item.error = obj[item.key].error;
        });
      }

      // list = [
      //   {
      //     "normal": 14,
      //     "label": "顶升模块",
      //     "error": 3
      //   },
      //   {
      //     "normal": 7,
      //     "label": "中转模块",
      //     "error": 3
      //   },
      //   {
      //     "normal": 2,
      //     "label": "底座模块",
      //     "error": 0
      //   },
      //   {
      //     "normal": 1,
      //     "label": "其它",
      //     "error": 1
      //   },
      //   {
      //     "normal": 11,
      //     "label": "三坐标模块",
      //     "error": 0
      //   },
      //   {
      //     "normal": 27,
      //     "label": "取簧模块",
      //     "error": 4
      //   }
      // ]
      // this.deviceList = [];
      // list.forEach(item => {
      //   this.deviceList.push({
      //     ...item,
      //     img: '/img/device-component.png'
      //   })
      // });
    },
    //滚动
    scrollTable() {
      const table = this.$refs.tableContainer;
      // const table = tableContainer.querySelector('.device-status');
      // 每次增加 scrollTop，模拟滚动效果
      this.scrollPosition += 1;
      if (this.scrollPosition >= table.scrollHeight - 240) {
        // 当到达底部时，重置 scrollPosition 重新从顶部开始滚动
        this.scrollPosition = 0;
      }
      table.scrollTop = this.scrollPosition;
    },
    //暂停
    pauseScroll() {
      // this.isPaused = true
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    //继续
    resumeScroll() {
      // this.isPaused = false
      this.intervalId = setInterval(this.scrollTable, 100);
    },
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
}

</script>
<style lang="scss" scoped>
.device-status {
  height: 100%;
  box-sizing: content-box;
  font-size: 14px;
  // border: 1px solid rgb(41, 171, 93);
  position: relative;
  // overflow-y: auto;

  // &::-webkit-scrollbar {
  //   width: 0;
  //   background: transparent;
  // }

  .device-item {
    // background-color: #dc9292;
    height: 30%;
    margin-bottom: 3%;
    display: flex;
    align-items: center;

    .item-img {
      width: 100px;
      height: 100%;
      background-image: url('/img/device-base.png');
      background-position: center;
      background-size: 90% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      video {
        position: absolute;
        bottom: 10px;
      }
    }

    .item-content {
      // background-color: rgba(112, 134, 156, 0.5);
      width: calc(100% - 100px);
      height: 100%;
      padding-left: 10px;

      .item-label {
        height: 50%;
        padding-top: 20px;
        display: flex;
        align-items: center;
      }

      .item-status {
        height: 50%;
        display: flex;
        align-items: center;

        .status-base {
          width: 47%;
          height: 23px;
          background-image: url('/img/device-status-base.png');
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 10px;
          display: flex;
          justify-content: space-between;
          padding: 0 13px;
          font-size: 13px;

          .status-num {
            font-size: 14px;
            font-family: 'Tadfont';
          }
        }
      }
    }
  }
}
</style>