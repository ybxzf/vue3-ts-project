<template>
    <div class="page-ctn">
        <div class="chart-ctn">
            <div class="type-btn">
                <el-radio-group v-model="curveType">
                    <el-radio-button :label="24">24曲线</el-radio-button>
                    <el-radio-button :label="96">96曲线</el-radio-button>
                </el-radio-group>
            </div>
            <div ref="echartP" class="echart-item-1"></div>
            <div ref="echartQ" class="echart-item-1"></div>
            <div ref="echartU" class="echart-item-1"></div>
            <div ref="echartI" class="echart-item-1"></div>
            <div ref="echartCos" class="echart-item-1"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import * as echarts from "echarts";
import { getDataFor24, getDataFor96 } from "@/server/api/echartDataTest1";

const echartP = ref<any>();
const echartQ = ref<any>();
const echartU = ref<any>();
const echartI = ref<any>();
const echartCos = ref<any>();
const curveType = ref<number>(24);
const xAxisData24 = ref<string[]>([
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
]);
const xAxisData96 = ref<string[]>([
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45"
]);
const option = ref<any>({
    title: {
        text: "图表标题"
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: []
    },
    xAxis: {
        // type: 'category',
        data: xAxisData24.value,
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            rotate: 45, // 旋转角度，正值为顺时针旋转
            fontSize: 10
        }
    },
    yAxis: {
        type: 'value'
    },
    // 在options中加入以下配置即可
    toolbox: {
        show: true,
        feature: {
            magicType: { type: ['line', 'bar'] } //此处最新版本echarts可设置三个值（stack-堆叠模式）,可自行查看echarts文档
        }
    },
    series: [
        {
            data: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                40,
                41,
                42,
                43,
                44,
                45,
                46,
                47,
                48,
                49,
                50,
                51,
                52,
                53,
                54,
                55,
                56,
                57,
                58,
                59,
                60,
                61,
                62,
                63,
                64,
                65,
                66,
                67,
                68,
                69,
                70,
                71,
                72,
                73,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                81,
                82,
                83,
                84,
                85,
                86,
                87,
                88,
                89,
                90,
                91,
                92,
                93,
                94,
                95,
                96
            ],
            type: 'line'
        }
    ]
});

let myCharts: any = {
    chartP: {
        title: "P图表",
        chartDOM: echartP.value,
        legendData: ["Pz", "Pa", "Pb", "Pc"],
        series: [],
        chart: null,
    },
    chartQ: {
        title: "Q图表",
        chartDOM: echartQ.value,
        legendData: ["Qz", "Qa", "Qb", "Qc"],
        series: [],
        chart: null,
    },
    chartU: {
        title: "U图表",
        chartDOM: echartU.value,
        legendData: ["Ua", "Ub", "Uc"],
        series: [],
        chart: null,
    },
    chartI: {
        title: "I图表",
        chartDOM: echartI.value,
        legendData: ["Ia", "Ib", "Ic"],
        series: [],
        chart: null,
    },
    chartCos: {
        title: "COS图表",
        chartDOM: echartCos.value,
        legendData: ["Cos", "Cosa", "Cosb", "Cosc"],
        series: [],
        chart: null,
    },
};
// let legends: any = {
//     DataP: ["Pz", "Pa", "Pb", "Pc"],
//     DataQ: ["Qz", "Qa", "Qb", "Qc"],
//     DataU: ["Ua", "Ub", "Uc"],
//     DataI: ["Ia", "Ib", "Ic"],
//     DataCos: ["Cos", "Cosa", "Cosb", "Cosc"],
// };

onMounted(() => {
    init();
    window.addEventListener("resize", () => {
        myCharts.chartP.resize();
    })
});
watch(() => curveType.value,
    (_nv: number, _ov: number) => {
        console.log('切换', _nv);
        if (_nv === 24) {
            console.log('xxx')
            option.value.xAxis.data = xAxisData24.value;
        } else {
            option.value.xAxis.data = xAxisData96.value;
        }
        myCharts.chartP.setOption(option.value);
        myCharts.chartP.resize();
    }
)
const init = () => {
    // for (const key in myCharts) {
    //     if (Object.prototype.hasOwnProperty.call(myCharts, key)) {





    //         const chartOption: any = Object.assign({}, option.value);
    //         const myChart: any = myCharts[key];
    //         chartOption.title.text = myChart.title;
    //         chartOption.legend.data = myChart.legendData;
    //         chartOption.series = myChart.series;
    //         myChart.chart = echarts.init(myChart.chartDOM);
    //         myChart.chart.setOption(option.value);

    //     }
    // }

    myCharts.chartP = echarts.init(echartP.value);

    myCharts.chartP.setOption(option.value);
};
const setChartOption = (legendData: any, chart: any) => {
    const chartOption = Object.assign({}, option.value)
    chart = echarts.init(echartP.value);

    chart.setOption(option.value);
};
const resizeAllChart = () => {

};

</script>
<style lang="less" scoped>
.page-ctn {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .chart-ctn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 40px;

        .type-btn {
            width: 85%;
            height: 40px;
            position: fixed;
            top: 0;
            z-index: 999;
            display: flex;
            justify-content: center;
            background-color: #fff;
            // border: 1px solid red;

        }

        .echart-item-1 {
            width: 1000px;
            height: 500px;
            border: 1px solid red;
        }
    }
}
</style>
