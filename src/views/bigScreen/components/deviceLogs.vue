<template>
  <div class="device-logs" ref="tableContainer" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table>
      <tbody>
        <tr v-for="(item, index) in logData" :key="index" class="row log-list">
          <td style="width: 25%;padding-left: 30px;">{{ item.date }}</td>
          <td style="width: 37%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.deviceNum }}
          </td>
          <td style="width: 38%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.label }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "DeviceLogs",
  components: {
  },
  props: {
    allLogData: {//所有日志信息
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
      logData: [],//日志数据
      scrollPosition: 0,
      intervalId: null,
    }
  },
  computed: {},
  watch: {
    'allLogData': {
      handler(_nv) {
        // console.log('allLogData改变', _nv);
        this.logData = this.getLogs();
        // 日志更新滚动至最新
        const logBox = document.querySelector(".log-list");
        setTimeout(() => {
          if (logBox) logBox.scrollTop = logBox.scrollHeight;
        }, 0);
      },
      immediate: true,
    },
  },

  created() {
  },
  mounted() {
    // 启动滚动定时器，每隔一段时间调整滚动位置
    this.intervalId = setInterval(this.scrollTable, 100);
  },
  methods: {
    initChart() {

    },
    //获取日志信息
    getLogs() {
      const logs = [];
      this.allLogData.forEach(element => {
        if (element.srcSys == this.nowStation) {
          logs.push(element);
        }
      });
      // return [{
      //   "label": "执行命令【开始】成功.",
      //   "date": "15:13:49",
      //   "srcSys": "size",
      //   "deviceNum": "LI-CC-001"
      // }];
      return logs;
    },
    scrollTable() {
      const tableContainer = this.$refs.tableContainer;
      const table = tableContainer.querySelector('table');
      // 每次增加 scrollTop，模拟滚动效果
      this.scrollPosition += 1;
      if (this.scrollPosition >= table.scrollHeight - 100) {
        // 当到达底部时，重置 scrollPosition 重新从顶部开始滚动
        this.scrollPosition = 0;
      }
      tableContainer.scrollTop = this.scrollPosition;
    },
    pauseScroll() {
      // this.isPaused = true
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
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
.device-logs {
  height: 100%;
  box-sizing: content-box;
  font-size: 14px;
  // border: 1px solid rgb(41, 171, 93);
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  table {
    width: 100%;
    // height: 100%;
    border-collapse: collapse;
  }

  tr {
    height: 39px;
    // border: 1px solid rgb(41, 171, 93);
  }

  tbody tr {
    background-image: url('/img/bg/log-row.jpg');
    background-size: 100% 90%;
    background-repeat: no-repeat;
  }

  td {
    // text-align: center;
  }
}
</style>