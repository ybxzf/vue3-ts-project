import { AxesHelper } from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';

import { createCamera } from './components/camera';
import { createCubeMash } from './components/cubeMesh';
import { createScene } from './components/scene';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

let camera: any;
let renderer: any;
let scene: any;
let cube: any;

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
        //将渲染器作为DOM元素添加到参数container的DOM中
        container.append(renderer.domElement);
        //创建方块的网格模型
        cube = createCubeMash();

        //创建辅助坐标轴，设置坐标轴长度
        const axesHelper: any = new AxesHelper(5);

        //添加到场景中
        scene.add(cube, axesHelper);
        //创建渲染更新类的对象
        const resizer: any = new Resizer(container, camera, renderer);

    }
    /**
     * 定义案例整合类的方法，用户与渲染
     */
    render() {
        //使用相机和渲染元素作为参数，创建控件对象
        const controls: any = new OrbitControls(camera, renderer.domElement);
        //监听鼠标，键盘事件
        controls.addEventListener("change", () => {
            //更新渲染
            renderer.render(scene, camera);
        });
        //渲染
        renderer.render(scene, camera);
        //调用动画
        animate();
    }
}

// 封装动画
function animate() {
    //递归调用动画
    window.requestAnimationFrame(animate);
    //每次刷新旋转(rotation)角度0.01
    cube.rotation.y += 0.01;
    // cube.rotation.x += 0.01;

    //重新渲染场景和相机
    renderer.render(scene, camera);
}


export { ThreeCase };