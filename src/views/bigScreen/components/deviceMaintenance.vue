<template>
  <div style="height: 100%;">
    <div class="count-info">
      <div class="info-base">
        <el-image class="count-icon" src="/img/count-icon.png"></el-image>
        {{ analogData["last_year_maintenance_count"]["descs"] }}
        <div class="info-value">{{ analogData["last_year_maintenance_count"]["val"] }}</div> 次
      </div>
      <div class="info-base">较
        <span style="color: #39AEFF;">
          {{ analogData["last_year_maintenance_compare_year"]["val"] }}
        </span> 年{{ analogData["last_year_maintenance_compare_trend"]["val"] }}
        <span class="info-rate">{{ analogData["last_year_maintenance_compare_rate"]["val"] }}</span>%
        <el-image class="down-arrow" src="/img/down-arrow.png"></el-image>
      </div>
    </div>
    <div class="device-sum">
      <div class="item left top">
        <div>{{ analogData["last_fault_maintenance_date"]["descs"] }}</div>
        <div class="date">{{ analogData["last_fault_maintenance_date"]["val"] }}</div>
      </div>
      <div class="item right top">
        <div>{{ analogData["last_maintenance_date"]["descs"] }}</div>
        <div class="date">{{ analogData["last_maintenance_date"]["val"] }}</div>
      </div>
      <!-- 占位 -->
      <!-- <div class="item seat"></div> -->
      <div class="item left bottom">
        <div>{{ analogData["running_days"]["descs"] }}</div>
        <div class="num">{{ analogData["running_days"]["val"] }}</div>
      </div>
      <div class="item right bottom">
        <div>{{ analogData["next_maintenance_date"]["descs"] }}</div>
        <div class="num">{{ analogData["next_maintenance_date"]["val"] }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeviceMaintenance",
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
      deviceDetails: {
        total: "2024-01-01",
        online: "2024-05-25",
        fault: "153",
        offline: "2024-05-25",
      },
    }
  },
  computed: {},
  watch: {},

  created() {
  },
  mounted() {
  },
  methods: {
  }
}

</script>
<style lang="scss" scoped>
.count-info {
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #F6F9FE;

  .info-base {
    display: flex;
    align-items: center;
    line-height: 1.5;

    .count-icon {
      width: 30px;
      height: 30px;
      margin: 0 5px;
    }

    .info-value {
      width: 16px;
      height: 20px;
      text-align: center;
      /* border: 1px solid #1EF2D5; */
      font-size: 16px;
      color: #1EF2D5;
      line-height: 22px;
      margin: 0 5px;
      /* border-radius: 3px; */
      background-image: url('/img/num-border.png');
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .info-rate {
      color: #FFD800;
      font-size: 16px;
    }

    .down-arrow {
      width: 15px;
      height: 15px;
      margin: 0 5px;
    }
  }
}

.device-sum {
  height: 80%;
  background-image: url('/img/bg/maintenance.jpg');
  background-size: 100% 100%;
  // box-sizing: content-box;
  // border: 1px solid rgb(41, 171, 93);

  .item {
    width: 50%;
    height: 50%;
    float: left;
    box-sizing: border-box;
    padding: 7px 15px;
    // border: 1px solid rgb(41, 171, 93);
    font-size: 14px;

    .date {
      // margin-top: 5px;
      font-size: 16px;
      font-weight: 400;
      color: #00FFAE;
      font-family: 'PingFang-SC-Regular';
      font-style: italic;
    }

    .num {
      // margin-top: 5px;
      font-size: 16px;
      font-weight: 400;
      color: #00BAFF;
      font-family: 'PingFang-SC-Regular';
      font-style: italic;
    }
  }

  .seat {
    width: 100%;
    height: 16%;
  }

  .top {
    padding-top: 20px;
  }

  .bottom {
    padding-bottom: 20px;
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