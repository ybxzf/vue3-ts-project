<template>
    <div>
        <lay-tab v-model="tabItem">
            <lay-tab-item title="选项一" id="1">
                <div style="padding:20px;width: 95%;border: 1px solid red;height: 85vh;">
                    <iframe src="http://www.layui-vue.com" frameborder="0" style="width: 100%;height: 100%;"></iframe>
                </div>
            </lay-tab-item>
            <lay-tab-item title="选项二" id="2">
                <div style="padding:20px;width: 95%;border: 1px solid red;height: 85vh;">
                    <iframe src="http://www.layui-vue.com/zh-CN/components/tab" frameborder="0"
                        style="width: 100%;height: 100%;"></iframe>
                </div>
            </lay-tab-item>
        </lay-tab>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const tabItem = ref<string>("1");
</script>
<style lang="less" scoped></style>