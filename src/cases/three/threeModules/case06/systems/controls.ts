import { OrbitControls } from '@three-ts/orbit-controls';

/**
 * 控制器
 * @param camera 相机
 * @param canvas 画布
 * @returns 
 */
function createControls(camera: any, canvas: any) {
    //创建一个控制器
    const controls: any = new OrbitControls(camera, canvas);
    //启用 damping（阻尼）效果,加入惯性，更自然
    controls.enableDamping = true;

    // forward controls.update to our custom .tick method 将update方法赋给tick，让其更新每一帧
    controls.tick = () => controls.update();

    return controls;
}

export { createControls };
