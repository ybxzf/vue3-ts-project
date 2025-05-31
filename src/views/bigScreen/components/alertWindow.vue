<template>
  <div class="alert-window">
    <div class="alert-dialog">
      <i @click="$emit('close')" class="el-icon-close"></i>
      <div class="dialog-content">
        <div v-for="(item, i) in infoList" :key="i" class="dialog-item">
          <div class="item-spot" style="">
          </div>
          <div style="width: 80px;">{{ item.label }}:</div>
          <div style="width: calc(100% - 120px);">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertWindow",
  components: {
  },
  props: {
    checkInfoItem: {//点击的信息
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      infoList: [
        { key: 'faultModel', label: '故障模块', desc: '取簧机器人' },
        { key: 'faultInfo', label: '故障信息', desc: '转向架定位流程扫描点Y激光值不在范围内报警' },
        { key: 'faultTime', label: '故障时间', desc: '2025-05-30 12:25:07' },
        { key: 'contact', label: '联 系 人', desc: '李武' },
        {
          key: 'handleSuggestion', label: '处理建议', desc: '重启取簧机器人，检查线路连接处无松动，发现问题及时解决。'
        },
      ],
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
.alert-window {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  .alert-dialog {
    position: relative;
    width: 550px;
    height: 350px;
    background-image: url('/img/bg/warn-bg.png');
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .el-icon-close {
      position: absolute;
      right: 0;
      top: 20px;
      cursor: pointer;
      font-size: 30px;
    }

    .dialog-content {
      width: 90%;
      height: 70%;
      // border: 1px solid #fff;
      position: absolute;
      bottom: 7%;
      left: 5%;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }

      .dialog-item {
        display: flex;
        margin: 10px 0;

        .item-spot {
          // background-color: #FED200;
          width: 15px;
          height: 15px;
          border-radius: 10px;
          margin: 5px 10px;
          background: radial-gradient(circle at center,
              rgba(255, 210, 0, 0.8) 40%,
              rgba(255, 210, 0, 0.1) 70%,
              transparent 100%);
        }
      }
    }
  }
}
</style>
