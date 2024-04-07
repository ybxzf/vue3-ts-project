<template>
    <div class="page-ctn">
        <div class="chart-ctn">
            <div class="type-btn">
                <el-radio-group v-model="curveType">
                    <el-radio-button :label="24">24曲线</el-radio-button>
                    <el-radio-button :label="96">96曲线</el-radio-button>
                </el-radio-group>
            </div>
            <div ref="echartRef" class="echart-item-1"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import * as echarts from "echarts";
import { getElectricFor24, getElectricFor96 } from "@/server/api/echartDataTest1";

const echartRef = ref<any>();
const curveType = ref<number>(96);
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
        text: "电能示值"
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ["zxygz", "fxygz", "zxwgz", "fxwgz",]
    },
    xAxis: {
        type: 'category',
        data: xAxisData96.value,
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
let myChart: any = null;

onMounted(() => {
    init();
    window.addEventListener("resize", () => {
        myChart.resize();
    })
});
watch(() => curveType.value,
    async (_nv: number, _ov: number) => {
        console.log('切换', _nv);
        if (_nv === 24) {
            console.log('xxx')
            await setOptionSeries(24);
            option.value.xAxis.data = xAxisData24.value;
        } else {
            await setOptionSeries(96);
            option.value.xAxis.data = xAxisData96.value;
        }
        myChart.setOption(option.value);
        // myChart.resize();
    }
)
const init = async () => {
    myChart = echarts.init(echartRef.value);
    await setOptionSeries(96);
    myChart.setOption(option.value);
};

const setOptionSeries = async (type: number) => {
    let res: any = null;
    if (type === 24) {
        res = await getElectricFor24();
    } else {
        res = await getElectricFor96();
    };
    console.log(res)
    if (res.code === 0) {
        const zxygz: any = [];
        const fxygz: any = [];
        const zxwgz: any = [];
        const fxwgz: any = [];
        for (let i = 0; i < res.data.length; i++) {
            const item: any = res.data[i];
            zxygz.push(Number(item.data.zxygz || 0));
            fxygz.push(Number(item.data.fxygz || 0));
            zxwgz.push(Number(item.data.zxwgz || 0));
            fxwgz.push(Number(item.data.fxwgz || 0));
        };
        option.value.series = [
            {
                name: "zxygz",
                type: "line",
                data: zxygz
            }, {
                name: "fxygz",
                type: "line",
                data: fxygz
            }, {
                name: "zxwgz",
                type: "line",
                data: zxwgz
            }, {
                name: "fxwgz",
                type: "line",
                data: fxwgz
            },
        ];
    };
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
        height: calc(100% - 40px);

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
            border: 1px solid red;
        }
    }
}
</style>
