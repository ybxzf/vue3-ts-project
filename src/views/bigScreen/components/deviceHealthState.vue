<template>
  <div class="device-health-state">
    <!-- <div ref="chart" style="width: 100%; height: 100%"></div> -->
    <div class="health-simulate"
      :style="{ backgroundImage: `url('/img/${analogData.health_grade == 100 ? 'health_yes.png' : 'health_no.png'}')` }">
    </div>
    <div class="chart-title">
      <div class="chart-title-line"></div>
      <div style="margin: 0 10px;">设备性能指数</div>
      <div class="chart-title-line"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "DeviceHealthState",
  components: {
  },
  props: {
    analogData: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      myChart: null,
      colorList: ["rgba(70, 146, 245, 0.4)", "rgba(70, 146, 245, 1)"],

    }
  },
  computed: {},
  watch: {},

  created() {
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      let shujv = [];
      let obj = {};
      let data = [["类型1"], [100]];
      data[0].forEach((itme, index) => {
        obj = {
          name: itme,
          value: data[1][index],
          itemStyle: {
            color: {
              //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
              type: "linear",
              x: 0,
              y: 0,
              x2: 1, //从左到右 0-1
              y2: 0,
              colorStops: [
                {
                  offset: 0.3,
                  color: this.colorList[0],
                },
                {
                  offset: 1,
                  color: this.colorList[1],
                },
              ],
            },
          },
        };
        shujv.push(obj);
      });
      const colorSet = [
        [0.3, "rgba(0,0,0,0)"],
        [1, "rgba(0,0,0,0)"],
      ];
      //绘制仪表盘
      let option = {
        backgroundColor: 'transparent',
        series: [
          {
            type: "gauge",
            radius: "90%",
            center: ["50%", "75%"],
            max: 100,
            min: 0,
            z: 9999,
            startAngle: 180,
            endAngle: 0,
            pointer: {//仪表盘指针
              show: true,
              length: "50%",
              width: 2,
              icon: "diamond",
              offsetCenter: ['0%', '-90%'],
              itemStyle: {
                color: this.colorList[1],
              },
            },
            progress: {//仪表盘进度
              show: true,
              roundCap: false,
              width: -20,
            },
            splitNumber: 9,//刻度密度
            detail: {//中间百分比
              formatter: function (value) {
                var num = Math.round(value);
                return "{bule|" + num + "}{bule|}";
              },
              rich: {
                bule: {
                  fontSize: 30,
                  fontFamily: "DIN",
                  color: "#8EBBFF",
                  fontWeight: "bold",
                },
              },
              offsetCenter: ["0%", "-30%"],
            },

            data: shujv,
            title: {
              show: false,
            },
            axisLine: {//刻度位置
              show: true,
              roundCap: false,
              lineStyle: {
                color: colorSet,
                width: 10,
              },
            },
            axisTick: {//仪表盘刻度
              show: true,
              splitNumber: 10,
              length: 2,
              lineStyle: {
                color: this.colorList[1],
                width: 1,
                type: "solid",
              },
              distance: -40,
            },
            splitLine: {
              //仪表盘分割线
              show: true,
              length: 2,
              distance: -40,
              lineStyle: {
                color: this.colorList[1],
                width: 1,
                type: "solid",
              },
            },

            axisLabel: {
              show: false,
            },
          },

          {//底下半圆
            name: "Nightingale Chart",
            type: "pie",
            radius: [0, '80%'],
            center: ["50%", "75%"],
            roseType: "radius",
            silent: true,
            startAngle: 180,
            legendHoverLink: false,
            itemStyle: {
              borderRadius: 0,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            color: [this.getColor2(0.5, 0, 3), "#FFFFFF00"],
            data: [
              { value: 10, name: "r" },
              { value: 10, name: "r0" },
            ],
          },
        ],
      };
      option && this.myChart.setOption(option);
    },
    getColor2(x, y, r) {
      //圆心颜色变色
      return {
        type: "radial",
        x,
        y,
        r,
        colorStops: [
          { offset: 0, color: "rgba(187, 229, 253, 0.8)" },
          { offset: 0.3, color: "rgba(67, 127, 203, 0.1)" },
        ],
      };
    },
  }
}

</script>
<style lang="scss" scoped>
.device-health-state {
  height: 100%;
  box-sizing: content-box;
  font-size: 14px;
  // border: 1px solid rgb(41, 171, 93);
  position: relative;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;

  .health-simulate {
    width: 60%;
    height: 60%;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translateX(-47%);
    background-position: bottom;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

.chart-title {
  width: 100%;
  // height: 40px;
  position: absolute;
  top: 72%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}

.chart-title-line {
  width: 34px;
  height: 1px;
  background-color: rgba(33, 172, 193, 0.6);
}
</style>