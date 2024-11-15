import { AxesHelper } from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';

import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createLights } from './components/light';
import { initGLFT } from "./components/matrixDemo";

import { createRenderer } from './systems/renderer';
import { createControls } from "./systems/controls";
import { Loop } from "./systems/loop";
import { Resizer } from './systems/Resizer';

let scene: any;
let camera: any;
let controls: any;
let renderer: any;
let loop: any;

/**
 * 定义整个案例整合的类
 */
class ThreeCase {
    //构造器传入DOM元素
    constructor(container: any) {
        //创建相机对象
        camera = createCamera();
        //创建场景对象
        scene = createScene();
        //创建渲染器对象
        renderer = createRenderer();
        //创建动画循环类，传入参数
        loop = new Loop(camera, scene, renderer);
        //将渲染器的DOM元素添加到参数container的DOM中
        container.append(renderer.domElement);
        //创建控制器，传入相机和渲染器的dom元素
        controls = createControls(camera, renderer.domElement);



        //创建自然的环境光和平行光
        const { ambientLight, mainLight } = createLights();
        //创建辅助坐标轴，设置坐标轴长度
        const axesHelper: any = new AxesHelper(5);
        //将控制器添加到动画循环类的updatables列表中
        loop.updatables.push(controls);
        //将光源和坐标轴添加到场景中
        scene.add(ambientLight, mainLight, axesHelper);
        //创建渲染更新类的对象
        const resizer: any = new Resizer(container, camera, renderer);

    }
    /**
     * 初始化导入的模型
     */
    async init() {
        const { car } = await initGLFT();

        // 将目标移动到car的中心
        controls.target.copy(car.position);
        //添加到场景中
        scene.add(car);
    }
    /**
     * 定义案例整合类的方法，用户与渲染
     */
    render() {
        //重新渲染场景和相机
        renderer.render(scene, camera);
    }
    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

// 封装动画
function animate() {
    //递归调用动画
    window.requestAnimationFrame(animate);

    //重新渲染场景和相机
    renderer.render(scene, camera);
}


export { ThreeCase };