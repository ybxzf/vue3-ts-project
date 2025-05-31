<template>
  <div class="device-fault-record">
    <div class="record-sum">
      <el-image src="/img/bg/fault-num.png" style="height: 90%;" fit="fill"></el-image>
      <div class="item left">
        <div>{{ analogData.last_year_fault_count.descs }}</div>
        <div class="num">{{ analogData["last_year_fault_count"]["val"] }}</div>
      </div>
      <el-image src="/img/bg/fault-details-rate.png" style="height: 90%;"></el-image>
      <div class="item right">
        <div>{{ analogData["fault_rate"]["descs"] }}</div>
        <div class="num">{{ analogData["fault_rate"]["val"] }}%</div>
      </div>
    </div>
    <div class="record-table" ref="tableContainer" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
      <table v-loading="tableLoad">
        <thead>
          <tr>
            <th>序号</th>
            <th>报警部位</th>
            <th>报警内容</th>
            <th>日期</th>
            <th>处理状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index" class="row">
            <td>
              <div class="serial">
                {{ index + 1 }}</div>
            </td>
            <td>
              <span v-if="item.alarmPart.length < 6">{{ item.alarmPart }}</span>
              <span v-else :title="item.alarmPart" style="cursor: default;">
                {{ item.alarmPart.slice(0, 5) + '...' }}
              </span>
            </td>
            <td>
              <span v-if="item.alarmContent.length < 5">{{ item.alarmContent }}</span>
              <span v-else :title="item.alarmContent" style="cursor: default;">
                {{ (item.alarmContent).slice(0, 5) + '...' }}
              </span>
            </td>
            <td>
              <span :title="item.alarmDate" style="cursor: default;">
                {{ formatterTime(item.alarmDate) }}
              </span>
            </td>
            <td>
              <el-tag type="success" :style="{
                background: item.handleState == 1 ? '#07474A' : '#364B64',
                color: item.handleState == 1 ? '#0EC674' : '#FFFFFF',
                border: 'none',
              }">{{ item.handleState == 1 ? '已处理' : '未处理' }}</el-tag>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "DeviceFaultRecord",
  components: {
  },
  props: {
    analogData: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      tableData: [],//表格数据
      scrollPosition: 0,//记录滚动位置
      intervalId: null,//滚动定时器
      tableLoad: false,//表格加载状态
    }
  },
  computed: {},
  watch: {},

  created() {
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.tableLoad = true;
      axios({
        url: "/screen/faultList",
        method: "get",
      }).then((res) => {
        const data = res.data;
        console.log('faultList', data);
        if (data.code == 0) {
          this.tableData = data.data;
        }
      }).finally(() => {
        this.tableLoad = false;
        // 启动滚动定时器，每隔一段时间调整滚动位置
        this.intervalId = setInterval(this.scrollTable, 100);
      });
    },
    //格式化时间
    formatterTime(time) {
      return moment(time).format('MM-DD');
    },
    // 滚动表格
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
    // 暂停滚动
    pauseScroll() {
      // this.isPaused = true
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    // 恢复滚动
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
.device-fault-record {
  height: 100%;
  box-sizing: content-box;
  font-size: 14px;
  // border: 1px solid rgb(41, 171, 93);

  .record-sum {
    height: 28%;
    display: flex;
    align-items: center;

    .item {
      width: 35%;
      height: 100%;
      float: left;
      box-sizing: border-box;
      color: #D4E5FB;
      // border: 1px solid rgb(41, 171, 93);
      // background-size: 35% 100%;
      // background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;

      .num {
        // margin-top: 5px;
        font-size: 20px;
        font-weight: 600;
        font-family: "Tadfont";
        // font-family: 'RUI-BLACK-SIM';
        // font-style: italic;
        background: linear-gradient(to bottom, #79EAFF, #19ABFF);
        -webkit-background-clip: text;
        color: transparent;
      }
    }

    .left {
      // background-image: url('/img/bg/fault.png');
    }

    .right {
      // background-image: url('/img/bg/details.png');
    }
  }

  .record-table {
    height: 72%;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }

    table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
    }

    thead {
      position: sticky;
      top: 0;
      background: #041028;
      color: #D4E5FB;
      z-index: 10;
    }

    tr {
      height: 30px;
      // border: 1px solid rgb(41, 171, 93);
    }

    tbody {
      transition: transform 0.5s ease;
    }

    tbody tr {
      // background-image: url('/img/bg/table-row.jpg');
      // background-size: 100% 90%;
      // background-repeat: no-repeat;
      background-color: rgb(75 179 246 / 10%);
      border-top: 1px solid rgb(255, 255, 255, 0.14);
    }

    td {
      text-align: center;
    }

    .serial {
      width: 22px;
      height: 22px;
      border: 1px solid #4BB3F6;
      color: #4BB3F6;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
    }

    .el-tag--small {
      height: 20px;
    }
  }

}
</style>