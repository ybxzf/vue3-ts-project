<template>
    <div class="lay-ctn">
        <lay-button type="primary" @click="openSuccess">成功消息</lay-button>
        <lay-button type="primary" @click="openIframe">Iframe 层</lay-button>
    </div>
</template>
<script setup lang="ts">
import { layer } from "@layui/layui-vue"
import { reactive, h, resolveComponent } from 'vue'

function openSuccess() {
    layer.msg("成功消息", { time: 1000, icon: 1 })
}
const openIframe = function () {
    layer.open({
        type: "iframe",
        title: "远程页面",
        area: ['90%', '90%'],
        content: "http://www.layui-vue.com"
    })
}
</script>
<style lang="less" scoped>
.lay-ctn {
    margin: 10px;
}
</style>