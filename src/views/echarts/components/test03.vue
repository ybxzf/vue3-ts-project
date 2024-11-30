<template>
    <div class="page-ctn">
        <div class="chart-ctn">
            <div ref="echartRef" class="echart-item-1"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import * as echarts from "echarts";

const echartRef = ref<any>();

let myChart: any = null;

onMounted(() => {
    init();
    window.addEventListener("resize", () => {
        myChart.resize();
    })
});
const init = async () => {
    myChart = echarts.init(echartRef.value);

    const pieData = [
        { name: '销售业务', value: 77.56, itemStyle: { color: '#f00' } },
        { name: '技术服务', value: 18.21, itemStyle: { color: '#0f0' } },
        { name: '配送业务', value: 3.67, itemStyle: { color: '#00f' } },
        { name: '其他业务', value: 0.17, itemStyle: { color: '#ff0' } }
    ];

    const option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
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
            padding: 10px 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
    }
}
</style>
