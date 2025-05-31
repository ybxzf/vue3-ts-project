<template>
  <div class="big-screen" v-loading="loading">
    <AlertWindow v-show="alertShow" @close="alertShow = false" :checkInfoItem="checkInfoItem"></AlertWindow>
    <el-row :gutter="20" class="big-head">
      <BigHeader @showMenu="showMenu"></BigHeader>
    </el-row>
    <el-row v-if="pageShow" :gutter="20" class="big-body">
      <ScleadGLTF ref="threeModel" class="sclead-gltf" :url="'matrix/threeModel/Soldier.glb'" :object="modelObject"
        @on-load="modleLoad" @on-dblclick="modleDblclick" :highLightModel="clickModel.name"></ScleadGLTF>
      <el-col :span="6" class="body-left">
        <BasicItem :width="'100%'" :height="'23%'" :title="'设备健康状态'">
          <template slot="content">
            <DeviceHealthState v-if="Object.keys(analogData).length > 0" :analogData="analogData"></DeviceHealthState>
          </template>
        </BasicItem>
        <BasicItem :width="'100%'" :height="'53%'" :title="`设备监测信息`">
          <template slot="content">
            <DeviceMonitorInfo :allInfoData="allInfoData" @clickInfo="clickInfo"></DeviceMonitorInfo>
          </template>
        </BasicItem>
        <BasicItem :width="'100%'" :height="'20%'" :title="'设备监控视频'">
          <template slot="content">
            <DeviceMonitor></DeviceMonitor>
          </template>
        </BasicItem>
      </el-col>
      <el-col :span="12" class="body-center">
        <div class="body-total">
          <div class="total-item" v-for="(item, i) in totalList" :key="i">
            <div class="total-value">{{ item.value }}</div>
            <div class="total-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="body-steps" v-show="stepShow">
          <el-steps :active="active" align-center style="width: 100%;">
            <el-step v-for="(item, index) in stepList" :key="item.title" :title="item.title"
              :class="'el-step-' + index">
              <template #icon>
                <!-- <div class="progress-time" v-if="index < (active == 4 ? 3 : active)">
                  {{ item.time | formatterTime }}
                </div> -->
                <div class="progress-img" @click="changeStep(index)">
                  <!-- <div v-if="index == 0" class="progress-wait">排队：{{ waitNum }}</div> -->
                  <div class="progress-ripple"></div>
                  <img v-show="index <= active" :src="item.checkedImg" :alt="'步骤' + active"
                    style="width: 50%; height: 50%;" />
                  <img v-show="index > active" :src="item.img" :alt="'步骤' + active" style="width: 50%; height: 50%;" />
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="body-model">
          <div v-for="(item, i) in modelList" :key="i" class="model-item" @click="changeButton(item.value)"
            :style="{ backgroundImage: buttonVal == item.value ? 'url(/img/button-orange.png)' : 'url(/img/button-blue.png)' }">
            {{ item.label }}
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="body-right">
        <BasicItem :width="'100%'" :height="'40%'" :title="'设备状态'">
          <template slot="content">
            <deviceStatus :deviceStatusObj="deviceStatusObj"></deviceStatus>
          </template>
        </BasicItem>
        <BasicItem :width="'100%'" :height="'28%'" :title="'设备故障记录'">
          <template slot="content">
            <DeviceFaultRecord v-if="Object.keys(analogData).length > 0" :analogData="analogData"></DeviceFaultRecord>
          </template>
        </BasicItem>
        <BasicItem :width="'100%'" :height="'28%'" :title="'设备维护与保养'">
          <template slot="content">
            <DeviceMaintenance v-if="Object.keys(analogData).length > 0" :analogData="analogData"></DeviceMaintenance>
          </template>
        </BasicItem>
      </el-col>
    </el-row>
    <!-- <ScreenMenu v-if="isShowMenu" @closeMenu="closeMenu"></ScreenMenu> -->
    <div ref="tooltip" v-show="modelTooltipShow" class="model-tooltip">
      <div class="tooltip-ctn">
        <div v-for="(item, i) in tooltipData" :key="i">
          {{ item.label }}：<span>{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BigHeader from "./components/bigHeader.vue";
import BasicItem from "./components/basicItem.vue";
import DeviceSum from "./components/deviceSum.vue";
import SizeState from "./components/sizeState.vue";
import AlertWindow from "./components/alertWindow.vue";
import DeviceFaultRecord from "./components/deviceFaultRecord.vue";
import DeviceMaintenance from "./components/deviceMaintenance.vue";
import DeviceHealthState from "./components/deviceHealthState.vue";
import DeviceMonitor from "./components/deviceMonitor.vue";
import DeviceLogs from "./components/deviceLogs.vue";
import deviceStatus from "./components/deviceStatus.vue";
import DeviceMonitorInfo from "./components/deviceMonitorInfo.vue";
import ScleadGLTF from "./components/gltf-3D.vue";
// import ScreenMenu from "./components/screenMenu.vue";

const default_steps1 = [
  { value: 0, time: 0, state: 0, timeStartKey: "cleanTime", key: "clean", title: '>取簧初始化<', img: '/svg/big_step1_icon.svg', checkedImg: '/svg/big_step1_icon_w.svg', },
  { value: 1, time: 0, state: 0, timeStartKey: "shaftEndTime", key: "shaftEnd", title: '>转向架识别定位<', img: '/svg/big_step2_icon.svg', checkedImg: '/svg/big_step2_icon_w.svg', },
  { value: 2, time: 0, state: 0, timeStartKey: "sizeTime", key: "size", title: '>自动识别型号<', img: '/svg/big_step3_icon.svg', checkedImg: '/svg/big_step3_icon_w.svg', },
  { value: 3, time: 0, state: 0, timeStartKey: "axleTime", key: "axle", title: '>枕簧分解<', img: '/svg/big_step4_icon.svg', checkedImg: '/svg/big_step4_icon_w.svg', },
  { value: 4, time: 0, state: 0, timeStartKey: "doneTime", key: "done", title: '>取簧夹头放弹簧<', img: '/svg/big_step5_icon.svg', checkedImg: '/svg/big_step5_icon_w.svg', },
  { value: 5, time: 0, state: 0, timeStartKey: "doneTime", key: "done", title: '>取斜楔<', img: '/svg/big_step6_icon.svg', checkedImg: '/svg/big_step6_icon_w.svg', },
]
const default_steps2 = [
  { value: 0, state: 0, title: '>中转初始化<', img: '/svg/big_step1_icon.svg', checkedImg: '/svg/big_step1_icon_w.svg', },
  { value: 1, state: 0, title: '>中转接弹簧<', img: '/svg/big_step2_icon.svg', checkedImg: '/svg/big_step2_icon_w.svg', },
  { value: 2, state: 0, title: '>中转放弹簧<', img: '/svg/big_step3_icon.svg', checkedImg: '/svg/big_step3_icon_w.svg', },
  { value: 3, state: 0, title: '>中转夹斜楔<', img: '/svg/big_step4_icon.svg', checkedImg: '/svg/big_step4_icon_w.svg', },
  { value: 4, state: 0, title: '>中转放斜楔<', img: '/svg/big_step5_icon.svg', checkedImg: '/svg/big_step5_icon_w.svg', },
]
const default_steps3 = [
  { value: 0, state: 0, title: '>顶升初始化<', img: '/svg/big_step1_icon.svg', checkedImg: '/svg/big_step1_icon_w.svg', },
  { value: 1, state: 0, title: '>顶升驾旋平<', img: '/svg/big_step2_icon.svg', checkedImg: '/svg/big_step2_icon_w.svg', },
  { value: 2, state: 0, title: '>顶升架顶平<', img: '/svg/big_step3_icon.svg', checkedImg: '/svg/big_step3_icon_w.svg', },
  { value: 3, state: 0, title: '>顶升顶起侧架<', img: '/svg/big_step4_icon.svg', checkedImg: '/svg/big_step4_icon_w.svg', },
  { value: 4, state: 0, title: '>顶升降下侧架<', img: '/svg/big_step5_icon.svg', checkedImg: '/svg/big_step5_icon_w.svg', },
  { value: 4, state: 0, title: '>后挡板上升<', img: '/svg/big_step5_icon.svg', checkedImg: '/svg/big_step5_icon_w.svg', },
  { value: 4, state: 0, title: '>后挡板下降<', img: '/svg/big_step5_icon.svg', checkedImg: '/svg/big_step5_icon_w.svg', },
]
const default_steps4 = [
  { value: 0, state: 0, title: '>三坐标初始化<', img: '/svg/big_step1_icon.svg', checkedImg: '/svg/big_step1_icon_w.svg', },
  { value: 1, state: 0, title: '>三坐标抬斜楔<', img: '/svg/big_step2_icon.svg', checkedImg: '/svg/big_step2_icon_w.svg', },
  { value: 2, state: 0, title: '>三坐标退出转向架<', img: '/svg/big_step3_icon.svg', checkedImg: '/svg/big_step3_icon_w.svg', },
]
const default_steps5 = [
  { value: 0, state: 0, title: '>底座初始化<', img: '/svg/big_step1_icon.svg', checkedImg: '/svg/big_step1_icon_w.svg', },
  { value: 1, state: 0, title: '>转向架旋转180<', img: '/svg/big_step2_icon.svg', checkedImg: '/svg/big_step2_icon_w.svg', },
]

export default {
  name: "BigScreen",
  components: {
    BigHeader,//大屏头部模块
    BasicItem,//基础模块模板
    DeviceSum,//设备概况模块
    SizeState,//尺寸工位状态监控模块
    DeviceFaultRecord,//设备故障记录模块
    DeviceMaintenance,//设备维护与保养模块
    DeviceHealthState,//设备健康状态模块
    DeviceMonitor,//设备监控模块
    DeviceLogs,//操作日志模块
    ScleadGLTF,//3D模型模块
    // ScreenMenu,//菜单模块
    deviceStatus,//设备状态模块
    DeviceMonitorInfo,//设备监测信息模块
    AlertWindow,//警告弹窗模块
  },
  data() {
    return {
      loading: false,
      alertShow: false,//警告弹窗显示
      buttonVal: 0,//当前按钮值
      active: 0,//当前步骤
      stepShow: false,//步骤显示
      stepList: JSON.parse(JSON.stringify(default_steps1)),//步骤列表
      totalList: [//电量统计列表
        { label: '耗电量(KWH)', value: '0' },
        { label: '功率(KW)', value: '0' },
        { label: '电压(V)', value: '0' },
        { label: '电流(A)', value: '0' },
      ],
      modelList: [//模块列表
        { label: '取簧机器人', value: '0', },
        { label: '中转机器人', value: '1', },
        { label: '顶升机器人', value: '2', },
        { label: '三坐标模块', value: '3', },
      ],
      pageShow: true,
      isShowMenu: false, //是否显示菜单
      modelTooltipShow: false, //模型提示框是否显示
      modelObject: {//模型对象参数
        positionX: 1.5,
        positionY: 2.6,
        positionZ: 3.5,
      },
      timer: null, //定时器
      tooltipData: [
        { label: '设备名称', value: '尺寸工位01' },
        { label: '设备编号', value: 'XX-XX' },
        { label: '当前状态', value: '正常' },
        { label: '所在位置', value: 'XX动车段' },
      ],
      allInfoData: [],//设备检测信息所有列表
      deviceStatusObj: {},//设备状态列表
      clickModel: { name: "" },//需要高亮的模型部位
      analogData: {},//模拟数据
      checkInfoItem: {},//点击的设备监测信息项
    }
  },
  computed: {
  },
  watch: {

    'active': {
      async handler(_nv) {
        this.stepShow = false;
        this.$nextTick(() => {
          for (let i = 0; i < this.stepList.length; i++) {
            const className = 'el-step-' + i;
            const stepElement = document.querySelector(`.${className}`);
            const lineElement = stepElement.querySelector('.el-step__line');
            // 设置背景色
            if (lineElement) {
              if (i == (_nv - 1)) {
                Object.assign(lineElement.style, {
                  // backgroundImage: "url('/img/process_bar.png')",
                  // backgroundSize: '100% 100%',
                  // border: '1px solid #011538',
                  // height: '10px',
                  // top: '6.5px',
                  backgroundImage: "none",
                  border: '1px solid #319BFF',
                  backgroundColor: 'transparent',
                  height: '1px',
                  top: '11px',
                });
              } else if (i < (_nv - 1)) {
                Object.assign(lineElement.style, {
                  backgroundImage: "none",
                  border: '1px solid #319BFF',
                  backgroundColor: 'transparent',
                  height: '1px',
                  top: '11px',
                });
              } else if (i > (_nv - 1)) {
                Object.assign(lineElement.style, {
                  backgroundImage: "none",
                  border: '1px solid #738AAD',
                  backgroundColor: '#738AAD',
                  height: '1px',
                  top: '11px',
                });
              }
            } else {
              console.warn('未找到 .el-step__line 元素');
            }
          }
          this.stepShow = true;
        });
      },
      immediate: true,
    }
  },

  created() {
  },
  mounted() {
    this.loading = true;
    this.timer = setInterval(() => {
      // if (this.userInfo.userId) {
      //   this.$store.commit("socket/WEBSOCKET_INIT");
      clearInterval(this.timer);
      // }
      this.loading = false;
    }, 500);
    window.addEventListener('resize', this.handleResize);
    if (this.$route.path == '/bigScreen/index') {
      this.modelObject = {
        positionX: 0,
        positionY: 2.5,
        positionZ: 4.5,
      }
    }
    // this.init();
    this.stepShow = true;
  },
  methods: {
    init() {
      axios({
        url: "/screen/data",
        method: "get",
      }).then((res) => {
        const data = res.data;
        console.log('data', data);
        if (data.code == 0) {
          this.analogData = data.data;
          this.totalList[0].value = this.analogData.power.val;
          this.totalList[1].value = this.analogData.power_rate.val;
          this.totalList[2].value = this.analogData.voltage.val;
          this.totalList[3].value = this.analogData.electric_current.val;
        }
      }).finally(() => {
      });
    },
    //窗口大小变化
    handleResize() {
      this.pageShow = false;
      console.log('当前宽度:', window.innerWidth);
      setTimeout(() => {
        this.pageShow = true;
      }, 100);
    },
    //切换步骤
    changeStep(active) {
      this.active = active;
    },
    changeButton(val) {
      this.buttonVal = val;
      this.active = -1;
      if (this.buttonVal == 0) {
        this.stepList = JSON.parse(JSON.stringify(default_steps1));
      } if (this.buttonVal == 1) {
        this.stepList = JSON.parse(JSON.stringify(default_steps2));
      } if (this.buttonVal == 2) {
        this.stepList = JSON.parse(JSON.stringify(default_steps3));
      } if (this.buttonVal == 3) {
        this.stepList = JSON.parse(JSON.stringify(default_steps4));
      } if (this.buttonVal == 4) {
        this.stepList = JSON.parse(JSON.stringify(default_steps5));
      }
    },
    //找出最后一次出现的索引
    findLastIndex(arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].state === '1') return i;
      }
      return -1;
    },
    //打开菜单栏
    showMenu() {
      this.isShowMenu = true;
    },
    //关闭菜单栏
    closeMenu() {
      this.isShowMenu = false;
    },
    //模型加载完成
    modleLoad(gltf) {
      console.log('gltf', gltf);
    },
    //模型双击事件
    modleDblclick(intersected, x, y) {
      if (this.timer) {
        clearTimeout(this.timer); // 清除定时器
        this.timer = null; // 清除定时器
      }
      console.log('intersected', intersected, x, y);
      this.clickModel = intersected.object;
      this.tooltipData[0].value = this.clickModel.name;
      // this.modelTooltipShow = !this.modelTooltipShow;
      this.modelTooltipShow = true;
      const tooltip = this.$refs.tooltip; // 获取元素
      if (this.$route.path == '/bigScreen') {
        tooltip.style.left = `${x - 300}px`; // 设置元素的left属性
        tooltip.style.top = `${y - 110}px`; // 设置元素的top属性
      } else {
        tooltip.style.left = `${x - 250 - 300}px`; // 设置元素的left属性
        tooltip.style.top = `${y - 30 - 150}px`; // 设置元素的top属性
      }
      this.$refs.threeModel.rotateNum = 0;
      this.timer = setTimeout(() => {
        if (this.modelTooltipShow) {
          this.$refs.threeModel.rotateNum = 0.002; // 恢复旋转
          this.modelTooltipShow = false;
          this.clickModel = { name: '' };
        }
      }, 5000);
    },
    //点击监测信息项回调
    clickInfo(item) {
      console.log('点击了', item);
      if (item.state == 1) {
        this.checkInfoItem = item;
        this.alertShow = true;
      }
    },
  }
}

</script>
<style lang="scss" scoped>
.big-screen {
  background-image: url('/img/bg/bigScreen-bg.png');
  background-size: 100% 100%;
  color: #fff;
  position: relative;
  height: 100%;
}

.sclead-gltf {
  position: absolute;
  width: 100vw;
  height: 85vh;
  z-index: 1;
  top: 0;
  left: 0;
}

.big-head {
  height: 8%;
  width: 100%;
  position: relative;
  // background-color: rgba(123, 11, 56, 0.5);
  margin-left: 0 !important;
}

.big-body {
  position: relative;
  height: 92%;
  width: 100%;
  // background-color: rgba(255, 94, 158, 0.5);
  margin-left: 0 !important;

  .body-left {
    // background-color: rgba(235, 193, 210, 0.5);
    height: 100%;
    z-index: 2;
  }

  .body-left * {
    position: relative;
    z-index: inherit;
  }

  .body-center {
    // background-color: rgba(180, 199, 185, 0.5);
    height: 100%;
    position: relative;
    padding: 0 !important;

    .body-total {
      width: 80%;
      height: 80px;
      margin: 35px 10%;
      // background-color: rgba(255, 255, 255, 0.2);
      background-image: url('/img/data-base.png');
      background-position: bottom;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;

      .total-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 130px;

        .total-value {
          height: 30px;
          color: #00FFA2;
          font-size: 20px;
          font-weight: 600;
          font-family: 'Tadfont';
        }

        .total-label {
          font-size: 14px;
          height: 50%;
        }
      }
    }

    .body-steps {
      width: 100%;
      height: 90px;
      position: absolute;
      bottom: 6%;
      // background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 2;
    }

    .body-model {
      width: 50%;
      height: 35px;
      position: absolute;
      left: 50%;
      bottom: 5px;
      font-size: 12px;
      transform: translateX(-50%);
      // background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      cursor: pointer;
      z-index: 2;

      .model-item {
        width: 80px;
        height: 25px;
        line-height: 26px;
        margin: 5px;
        // background-image: url('/img/button-blue.png');
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
      }
    }

  }

  .body-right {
    // background-color: rgba(169, 219, 238, 0.5);
    height: 100%;
    z-index: 2;
  }

  .body-right * {
    position: relative;
    z-index: inherit;
  }
}

.progress-img {
  width: 60px;
  height: 60px;
}

::v-deep .el-step__line {
  border: 1px solid #406181;
}

::v-deep .el-step__title.is-process {
  color: #fff;
  line-height: 43px;
}

::v-deep .is-process .progress-img {
  background-image: url("/img/process_ing.png");
}

::v-deep .is-process .progress-img .progress-ripple {
  background-image: url("/img/process_ing.png");
}

::v-deep .el-step__title {
  font-size: 14px;
}

.model-tooltip {
  position: absolute;
  // top: 8%;
  // left: 25%;
  width: 300px;
  height: 150px;
  z-index: 4;
  background-image: url('/img/bg/tooltip.png');
  background-size: 100% 100%;

  .tooltip-ctn {
    // background-color: rgba(4, 48, 117, 0.5);
    width: 210px;
    height: 120px;
    margin-top: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-size: 12px;
  }
}
</style>