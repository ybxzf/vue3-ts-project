<template>
    <div class="page-ctn">
        <div class="chart-ctn">
            <div class="type-btn">
                <el-radio-group v-model="curveType">
                    <el-radio-button :label="24">60分钟</el-radio-button>
                    <el-radio-button :label="48">30分钟</el-radio-button>
                    <el-radio-button :label="96">15分钟</el-radio-button>
                </el-radio-group>
            </div>
            <div ref="echartRefP" class="echart-item-1"></div>
            <div ref="echartRefQ" class="echart-item-1"></div>
            <div ref="echartRefU" class="echart-item-1"></div>
            <div ref="echartRefI" class="echart-item-1"></div>
            <div ref="echartRefCos" class="echart-item-1"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import * as echarts from "echarts";
import { getDataFor24, getDataFor48, getDataFor96 } from "@/server/api/echartDataTest1";

const echartRefP = ref<any>();
const echartRefQ = ref<any>();
const echartRefU = ref<any>();
const echartRefI = ref<any>();
const echartRefCos = ref<any>();
const curveType = ref<number>(24);
const xAxisData24 = ref<string[]>([
    "00:00:00",
    "01:00:00",
    "02:00:00",
    "03:00:00",
    "04:00:00",
    "05:00:00",
    "06:00:00",
    "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
    "21:00:00",
    "22:00:00",
    "23:00:00",
]);
const xAxisData48 = ref<string[]>([
    "00:00:00",
    "00:30:00",
    "01:00:00",
    "01:30:00",
    "02:00:00",
    "02:30:00",
    "03:00:00",
    "03:30:00",
    "04:00:00",
    "04:30:00",
    "05:00:00",
    "05:30:00",
    "06:00:00",
    "06:30:00",
    "07:00:00",
    "07:30:00",
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00",
    "17:30:00",
    "18:00:00",
    "18:30:00",
    "19:00:00",
    "19:30:00",
    "20:00:00",
    "20:30:00",
    "21:00:00",
    "21:30:00",
    "22:00:00",
    "22:30:00",
    "23:00:00",
    "23:30:00",
]);
const xAxisData96 = ref<string[]>([
    "00:00:00",
    "00:15:00",
    "00:30:00",
    "00:45:00",
    "01:00:00",
    "01:15:00",
    "01:30:00",
    "01:45:00",
    "02:00:00",
    "02:15:00",
    "02:30:00",
    "02:45:00",
    "03:00:00",
    "03:15:00",
    "03:30:00",
    "03:45:00",
    "04:00:00",
    "04:15:00",
    "04:30:00",
    "04:45:00",
    "05:00:00",
    "05:15:00",
    "05:30:00",
    "05:45:00",
    "06:00:00",
    "06:15:00",
    "06:30:00",
    "06:45:00",
    "07:00:00",
    "07:15:00",
    "07:30:00",
    "07:45:00",
    "08:00:00",
    "08:15:00",
    "08:30:00",
    "08:45:00",
    "09:00:00",
    "09:15:00",
    "09:30:00",
    "09:45:00",
    "10:00:00",
    "10:15:00",
    "10:30:00",
    "10:45:00",
    "11:00:00",
    "11:15:00",
    "11:30:00",
    "11:45:00",
    "12:00:00",
    "12:15:00",
    "12:30:00",
    "12:45:00",
    "13:00:00",
    "13:15:00",
    "13:30:00",
    "13:45:00",
    "14:00:00",
    "14:15:00",
    "14:30:00",
    "14:45:00",
    "15:00:00",
    "15:15:00",
    "15:30:00",
    "15:45:00",
    "16:00:00",
    "16:15:00",
    "16:30:00",
    "16:45:00",
    "17:00:00",
    "17:15:00",
    "17:30:00",
    "17:45:00",
    "18:00:00",
    "18:15:00",
    "18:30:00",
    "18:45:00",
    "19:00:00",
    "19:15:00",
    "19:30:00",
    "19:45:00",
    "20:00:00",
    "20:15:00",
    "20:30:00",
    "20:45:00",
    "21:00:00",
    "21:15:00",
    "21:30:00",
    "21:45:00",
    "22:00:00",
    "22:15:00",
    "22:30:00",
    "22:45:00",
    "23:00:00",
    "23:15:00",
    "23:30:00",
    "23:45:00"
]);
const option = ref<any>({
    title: {
        text: ""
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: [],
    },
    xAxis: {
        type: 'category',
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
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                show: true,
                title: {
                    zoom: "区域缩放", back: "区域缩放还原",
                },
                yAxisIndex: "none"
            },
            dataView: {
                show: true,
                readOnly: false,
                title: "数据视图"
            },
            magicType: {
                show: true,
                title: {
                    line: "切换为折线图",
                    bar: "切换为柱状图",
                    stack: "切换为堆叠",
                    tiled: "切换为平铺",
                },
                type: ['line', 'bar', 'stack', 'tiled']
            },
            restore: {
                show: true,
                title: "还原"
            },
            saveAsImage: {
                show: true,
                title: "保存图片"
            }
        }
    },
    series: [],
});
let myCharts: any = [
    {
        name: "chartP",
        echartDom: null,
        title: '瞬时数据P',
        legendData: ["pz", "pa", "pb", "pc",],
    }, {
        name: "chartQ",
        echartDom: null,
        title: '瞬时数据Q',
        legendData: ["qz", "qa", "qb", "qc",],
    }, {
        name: "chartU",
        echartDom: null,
        title: '瞬时数据U',
        legendData: ["ua", "ub", "uc",],
    }, {
        name: "chartI",
        echartDom: null,
        title: '瞬时数据I',
        legendData: ["ia", "ib", "ic",],
    }, {
        name: "chartCos",
        echartDom: null,
        title: '瞬时数据Cos',
        legendData: ["cos", "cosa", "cosb", "cosc",],
    },
]

onMounted(() => {
    init();
    window.addEventListener("resize", () => {
        for (let i = 0; i < myCharts.length; i++) {
            myCharts[i].echartDom.resize();
        }
    })
});
watch(() => curveType.value,
    async (_nv: number, _ov: number) => {
        console.log('切换', _nv);
        if (_nv === 24) {
            for (let i = 0; i < myCharts.length; i++) {
                await setOptionSeries(myCharts[i], 24);
            };
        } else if (_nv === 48) {
            for (let i = 0; i < myCharts.length; i++) {
                await setOptionSeries(myCharts[i], 48);
            };
        } else {
            for (let i = 0; i < myCharts.length; i++) {
                await setOptionSeries(myCharts[i], 96);
            };
        };
        // myChart.resize();
    }
)
const init = async () => {
    myCharts[0].echartDom = echarts.init(echartRefP.value);
    myCharts[1].echartDom = echarts.init(echartRefQ.value);
    myCharts[2].echartDom = echarts.init(echartRefU.value);
    myCharts[3].echartDom = echarts.init(echartRefI.value);
    myCharts[4].echartDom = echarts.init(echartRefCos.value);
    for (let i = 0; i < myCharts.length; i++) {
        await setOptionSeries(myCharts[i], 24);
    }
};

const setOptionSeries = async (chart: any, type: number) => {
    let res: any = null;
    const optionItem: any = JSON.parse(JSON.stringify(option.value));
    if (type === 24) {
        res = await getDataFor24();
        optionItem.xAxis.data = xAxisData24.value;
    } else if (type === 48) {
        res = await getDataFor48();
        optionItem.xAxis.data = xAxisData48.value;
    } else {
        res = await getDataFor96();
        optionItem.xAxis.data = xAxisData96.value;
    };
    if (res.code === 0) {
        for (let i = 0; i < chart.legendData.length; i++) {
            const itemI: any = chart.legendData[i];
            const seriesData: any = {
                type: "line",
                name: itemI,
                data: []
            };
            for (let j = 0; j < res.data.length; j++) {
                const itemJ: any = res.data[j];
                seriesData.data.push(Number(itemJ['data'][itemI] || 0));
            };
            optionItem.series.push(seriesData);

        };
        optionItem.title.text = chart.title;
        optionItem.legend.data = chart.legendData;
    };
    chart.echartDom.setOption(optionItem);
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
        padding: 40px 0 10px 0;

        .type-btn {
            width: 85%;
            height: 40px;
            position: fixed;
            top: 0;
            z-index: 999;
            display: flex;
            justify-content: center;
            background-color: #fff;
        }

        .echart-item-1 {
            width: 1000px;
            height: 500px;
            margin-top: 10px;
            padding: 10px 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
    }
}
</style>
