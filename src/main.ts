import './assets/base.less';

import { createApp } from 'vue';

//安装pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import App from './App.vue';

//安装element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

//引入router
import router from './router';

//引入layui
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(Layui);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};

app.mount('#app');
