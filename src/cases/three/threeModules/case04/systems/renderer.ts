import { WebGLRenderer } from 'three';

/**
 * 封装渲染器的方法，包括创建渲染器及其设置
 * @returns 一个渲染器对象
 */
function createRenderer() {
    //创建渲染器
    const renderer: any = new WebGLRenderer();
    // turn on the physically correct lighting model 启动物理光照
    renderer.physicallyCorrectLights = true;
    return renderer;
}

export { createRenderer };
