import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { setupModel } from './setupModel.js';

async function initGLFT() {
    //创建GLTF加载器
    const loader = new GLTFLoader();
    //一次可加载多个模型
    const [carDemo] = await Promise.all([
        loader.loadAsync('@/assets/matrix/car_demo.glb'),
    ]);
    //获取模型
    const car = setupModel(carDemo);
    //设置模型坐标
    car.position.set(0, 0, 2.5);
    return {
        car,
    };

}

export { initGLFT };
