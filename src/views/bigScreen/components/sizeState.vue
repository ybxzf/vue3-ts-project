<template>
  <div class="size-state">
    <div class="item" v-for="(item, index) in stateList" :key="index">
      <div class="size-icon">
        <el-image :src="`/img/bg/state-icon-${item.icon}.svg`"></el-image>
      </div>
      <div class="size-text">
        <div>{{ item.label }}</div>
        <el-image v-if="item.state == 1 && item.text == ''" src="/img/bg/green.png"></el-image>
        <el-image v-if="item.state == 2 && item.text == ''" src="/img/bg/red.png"></el-image>
        <el-image v-if="item.state == 0 && item.text == ''" src="/img/bg/gray.png"></el-image>
        <div v-if="item.text != ''" :style="{
          color: item.state == 1 ? '#0EC674' : item.state == 2 ? '#FF5556' : '#A9A9A9',
        }">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>

const default_state = [
  //state:1绿;2红;3灰
  { name: "", label: "设备状态", icon: "state", state: 1, text: "", },
  { name: "", label: "网络状态", icon: "net", state: 1, text: "", },
  { name: "", label: "顶转轮状态", icon: "topWheel", state: 1, text: "推出", },
  { name: "", label: "工位是否有轮", icon: "station", state: 2, text: "有轮", },
  { name: "", label: "进轮放行", icon: "in", state: 0, text: "升", },
  { name: "", label: "出轮放行", icon: "out", state: 1, text: "升", },
  { name: "", label: "尺寸相机盖板状态", icon: "camera", state: 1, text: "", },
  { name: "", label: "活动踏板状态", icon: "board", state: 1, text: "", },
  { name: "", label: "相机状态", icon: "camera", state: 1, text: "", },
  { name: "", label: "抓图状态", icon: "img", state: 0, text: "", },
  { name: "", label: "算法执行状态", icon: "algorithm", state: 2, text: "", },
  { name: "camera1Status", label: "相机1", icon: "camera", state: 1, text: "", },
  { name: "camera2Status", label: "相机2", icon: "camera", state: 1, text: "", },
  { name: "camera3Status", label: "相机3", icon: "camera", state: 1, text: "", },
  { name: "camera4Status", label: "相机4", icon: "camera", state: 1, text: "", },
  { name: "camera5Status", label: "相机5", icon: "camera", state: 1, text: "", },
  { name: "camera6Status", label: "相机6", icon: "camera", state: 1, text: "", },
  { name: "camera7Status", label: "相机7", icon: "camera", state: 1, text: "", },
  { name: "camera8Status", label: "相机8", icon: "camera", state: 1, text: "", },
  { name: "camera9Status", label: "相机9", icon: "camera", state: 1, text: "", },
  { name: "camera10Status", label: "相机10", icon: "camera", state: 1, text: "", },
  { name: "camera11Status", label: "相机11", icon: "camera", state: 1, text: "", },
  { name: "hasWheel", label: "是否有轮", icon: "station", state: 1, text: "", },
  { name: "plcStatus", label: "plc状态", icon: "algorithm", state: 1, text: "", },
  { name: "preHasWheel", label: "整备工位是否有轮", icon: "station", state: 1, text: "", },
  { name: "preStatus", label: "整备工位状态", icon: "state", state: 1, text: "", },
  { name: "laserStatusL", label: "左激光传感器状态", icon: "board", state: 1, text: "", },
  { name: "laserStatusR", label: "右激光传感器状态", icon: "board", state: 1, text: "", },
  { name: "shockStatus", label: "震动传感器状态", icon: "board", state: 1, text: "", },
]
export default {
  name: "SizeState.vue",
  components: {
  },
  props: {
    nowStepState: {//工位状态信息
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      stateDict: JSON.parse(JSON.stringify(default_state)),
      stateList: [],
    }
  },
  computed: {},
  watch: {
    'nowStepState': {
      handler(_nv, _ov) {
        if (_nv.content && JSON.stringify(_nv.content) !== JSON.stringify(_ov.content)) {
          // console.log('nowStepState改变', _nv, _ov);
          this.getStateList();
        }
      },
      immediate: true,
    },
  },

  created() {
  },
  mounted() {
  },
  methods: {
    //获取状态
    getStateList() {
      this.stateList.length = 0;
      this.stateDict.forEach((item) => {
        for (const key in this.nowStepState.content) {
          if (Object.prototype.hasOwnProperty.call(this.nowStepState.content, key)) {
            const value = this.nowStepState.content[key];
            if (key == item.name) {
              this.stateList.push({
                ...item,
                state: value,
              })
            }
          }
        }
      });
      if (this.stateList.length > 0) {
        this.stateList.unshift({ name: "", label: "设备状态", icon: "state", state: 1, text: "", },);
      } else {
        this.stateList.unshift({ name: "", label: "设备状态", icon: "state", state: 0, text: "", },);
      }
    },
  }
}

</script>
<style lang="scss" scoped>
.size-state {
  height: 100%;
  overflow: auto;
  box-sizing: content-box;
  // border: 1px solid rgb(41, 171, 93);
  font-size: 14px;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .item {
    margin-top: 2%;
    margin-left: 2%;
    width: 48%;
    height: 40px;
    float: left;
    // border: 1px solid rgb(41, 171, 93);
    display: flex;
  }

  .size-icon {
    width: 40px;
    height: 40px;
    background-image: url('/img/bg/state-icon.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-image {
      width: 30px;
      height: 30px;
    }
  }

  .size-text {
    width: calc(100% - 45px);
    height: 40px;
    background-image: url('/img/bg/state-text.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>