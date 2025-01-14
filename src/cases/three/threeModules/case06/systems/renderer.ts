import { WebGLRenderer } from 'three';

/**
 * 封装渲染器的方法，包括创建渲染器及其设置
 * @returns 一个渲染器对象
 */
function createRenderer() {
    //创建渲染器
    const renderer: any = new WebGLRenderer({
        antialias: true, // 防锯齿
        alpha: true, // 启用透明背景
    });
    // turn on the physically correct lighting model 启动物理光照
    renderer.physicallyCorrectLights = true;
    //设置渲染器像素分辨值
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
}

export { createRenderer };
