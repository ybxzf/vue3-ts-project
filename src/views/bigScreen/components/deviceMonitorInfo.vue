<template>
  <div class="monitor-info" ref="tableContainer" @mouseenter="pauseScroll" @mouseleave="">
    <div v-for="(group, belong) in infoList" :key="belong" class="monitor-group">
      <div class="group-title">
        <span class="title-desc">{{ belong }}</span>
      </div>
      <div class="group-content">
        <div class="group-item" v-for="item in group" :key="item.label" @click="clickInfo(item)" :style="{
          backgroundImage: item.status == 1 ? 'url(/img/info-base-red.png)' : 'url(/img/info-base-blue.png)',
        }">
          <span>{{ item.label }}</span>
          <!-- <el-image v-if="item.status == 0" class="item-status" src="/img/real-time-gray.png"></el-image> -->
          <el-image v-if="item.status == 0" class="item-status" src="/img/real-time-green.png"></el-image>
          <el-image v-if="item.status == 1" class="item-status" src="/img/real-time-red.png"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeviceMonitorInfo",
  components: {
  },
  props: {
    allInfoData: {//所有日志信息
      type: Array,
      default: () => [],
    },
    nowStation: {//当前工位
      type: String,
      default: () => "prepare",
    },
  },
  data() {
    return {
      infoList: [],//设备监测信息列表
      scrollPosition: 0,//滚动位置
      intervalId: null,//循环器
    }
  },
  computed: {},
  watch: {
    allInfoData: {
      handler(newVal) {
        this.init();
      },
      deep: true,
    },
  },

  created() {
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const res = [
        { baseDevice: "夹头取簧1", label: "夹头激光系统", state: '1', belong: "取簧机器人" },
        { baseDevice: "夹头取簧2", label: "夹头激光系统", state: '1', belong: "取簧机器人" },
        { baseDevice: "电机取簧1", label: "取簧机器人电机", state: '0', belong: "取簧机器人" },
        { baseDevice: "电机取簧2", label: "取簧机器人电机", state: '1', belong: "取簧机器人" },
        { baseDevice: "六轴取簧1", label: "六轴机器人", state: '1', belong: "取簧机器人" },
        { baseDevice: "", label: "抱弹簧气缸系统", state: '1', belong: "中转机器人" },
        { baseDevice: "", label: "中转挡弹簧气缸系统", state: '2', belong: "中转机器人" },
        { baseDevice: "", label: "中转机器人电机", state: '1', belong: "中转机器人" },
        { baseDevice: "", label: "六轴机器人", state: '0', belong: "中转机器人" },
        { baseDevice: "", label: "顶升模块推杆系统", state: '1', belong: "顶升模块" },
        { baseDevice: "", label: "顶升模块电机", state: '0', belong: "顶升模块" },
        { baseDevice: "", label: "三坐标气缸系统", state: '1', belong: "三坐标模块" },
        { baseDevice: "", label: "三坐标模块电机", state: '2', belong: "三坐标模块" },
        { baseDevice: "", label: "旋转底座电机", state: '2', belong: "底座模块" },
        { baseDevice: "", label: "升降底座电机", state: '1', belong: "底座模块" },
      ];

      // this.infoList = this.transformData(res);
      this.infoList = this.transformData(this.allInfoData);

      // 使用reduce重新组织数据
      // this.infoList = res.reduce((result, item) => {
      //   // 如果结果对象中还没有当前belong的分组，则创建一个空数组
      //   if (!result[item.belong]) {
      //     result[item.belong] = [];
      //   }
      //   // 将当前项添加到对应的分组中
      //   result[item.belong].push(item);
      //   return result;
      // }, {});
      // console.log('infoList', this.infoList);
    },
    //格式化状态列表数据
    transformData(data) {
      const result = {};
      //获取belong
      const belongGroups = {};
      data.forEach(item => {
        if (!belongGroups[item.belong]) {
          belongGroups[item.belong] = [];
        }
        belongGroups[item.belong].push({
          ...item,
          status: item.state
        });
      });
      return belongGroups;

    },
    //点击监测信息项
    clickInfo(item) {
      this.$emit('clickInfo', item);
    },
    //格式化状态列表数据
    transformData1(data) {
      const result = {};

      // 首先按label分组
      const labelGroups = {};
      data.forEach(item => {
        if (!labelGroups[item.label]) {
          labelGroups[item.label] = [];
        }
        labelGroups[item.label].push(item);
      });
      console.log('labelGroups', labelGroups);

      // 然后按belong分组并计算status
      Object.keys(labelGroups).forEach(label => {
        const items = labelGroups[label];
        const belong = items[0].belong;

        if (!result[belong]) {
          result[belong] = [];
        }

        // 计算status
        const states = items.map(item => parseInt(item.state));
        let status;
        if (states.some(s => s === 2)) {
          status = '2';
        } else if (states.every(s => s === 1)) {
          status = '1';
        } else if (states.every(s => s === 0)) {
          status = '0';
        } else {
          status = Math.max(...states).toString(); // 混合状态取最大值
        }

        // 构造baseDevice数组
        const baseDevices = items.map(item => ({
          name: item.baseDevice,
          state: item.state
        }));

        result[belong].push({
          label,
          status,
          belong,
          baseDevice: baseDevices
        });
      });

      return result;
    },
    //滚动
    scrollTable() {
      const table = this.$refs.tableContainer;
      // const table = tableContainer.querySelector('.device-status');
      // 每次增加 scrollTop，模拟滚动效果
      this.scrollPosition += 1;
      if (this.scrollPosition >= table.scrollHeight - 350) {
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
.monitor-info {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .monitor-group {
    // background-color: rgba(41, 233, 127, 0.5);
    min-height: 30px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;

    .group-title {
      width: 150px;
      height: 26px;
      text-align: center;
      // background-color: rgba(132, 41, 233, 0.5);
      background-image: url('/img/info-base-title.png');
      background-position: bottom;
      background-size: 100% 35%;
      background-repeat: no-repeat;

      .title-desc {
        font-family: 'PingFang SC';
        font-weight: bold;
        background: linear-gradient(0deg, #FFFFFF 0%, #76D0F5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .group-content {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      width: 100%;
      margin-top: 5px;

      .group-item {
        // background-color: rgba(132, 41, 233, 0.5);
        /* 每行2个，减去间距 */
        flex: 0 0 calc(50% - 5px);
        width: 120px;
        height: 26px;
        // background-image: url('/img/info-base-blue.png');
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        font-size: 12px;
        cursor: pointer;

        .item-status {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>