<template>
    <div class="page">
        <div style="width: 100%;height: 60px;display: flex;align-items: center;justify-content: center;">
            <div style="width: 200px;display: flex;justify-content: space-between;align-items: center;">
                <el-tag type="primary" effect="dark" round>
                    <text>{{ lang.from.label }}</text>
                </el-tag>
                <el-icon style="cursor: pointer;" @click="exchange">
                    <Switch />
                </el-icon>
                <el-tag type="success" effect="dark" round>
                    <text>{{ lang.to.label }}</text>
                </el-tag>
            </div>
        </div>
        <div style="width: 100%;display: flex;align-items: center;justify-content: center;">
            <el-input v-model="input" style="width: 45%" :rows="5" type="textarea" placeholder="翻译内容" />
            <el-icon style="width: 5%;">
                <DArrowRight />
            </el-icon>
            <el-input v-model="output" v-loading="outputLoad" element-loading-text="翻译中..." disabled style="width: 45%"
                :rows="5" type="textarea" placeholder="翻译结果" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import { md5 } from 'js-md5';

const input = ref('');
const output = ref('');
const outputLoad = ref(false);
const timer = ref<number | null>(null);

const lang = reactive({
    from: {
        label: '中文',
        value: 'zh'
    },
    to: {
        label: '英文',
        value: 'en'
    },
});

watch(() => input.value, (_nv, _ov) => {
    if (_nv) {
        if (timer.value) {
            clearTimeout(timer.value);
            timer.value = null;
        }
        timer.value = setTimeout(() => {
            console.log('input', _nv);
            outputLoad.value = true;
            translateText(_nv);
        }, 2000);
    }
})

onMounted(() => {
})

async function translateText(text: any) {
    const salt = randomNum();
    try {
        const response = await axios.get('/translate', {
            params: {
                q: text,
                from: lang.from.value,
                to: lang.to.value,
                appid: '20250217002276256',
                salt: salt,
                sign: md5('20250217002276256' + text + salt + 'Q1DTC_vdyKybtJ4nj7S0')
            }
        });
        output.value = response.data.trans_result[0].dst;
    } catch (error) {
        output.value = '翻译请求失败';
        console.error('翻译请求失败', error);
    } finally {
        outputLoad.value = false;
    }
}

const randomNum = () => {
    var Randnum = '';
    for (var i = 0; i < 10; i++) {
        Randnum += Math.floor(Math.random() * 10);
    };
    return Randnum
}

const exchange = () => {
    input.value = "";
    output.value = "";
    const temp = lang.from;
    lang.from = lang.to;
    lang.to = temp;
}


</script>

<style lang="less" scoped>
@media (min-width: 1024px) {
    .page {
        min-height: 100vh;
        display: block;
        padding: 5%;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
    }
}
</style>