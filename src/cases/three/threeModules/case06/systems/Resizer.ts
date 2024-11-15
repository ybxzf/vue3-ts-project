const setSize = (container: any, camera: any, renderer: any) => {
    // Set the camera's aspect ratio 设置相机的长宽比
    camera.aspect = container.clientWidth / container.clientHeight;
    // update the camera's frustum 如果相机属性发生变化，需要调用此方法更新相机的投影矩阵
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas 更新渲染器的宽高
    renderer.setSize(container.clientWidth, container.clientHeight);
    // set the pixel ratio (for mobile devices) 设置渲染器像素比，不设置的话你的场景在你测试它的笔记本电脑上可能看起来很棒，但在带有视网膜显示器的移动设备上会模糊
    renderer.setPixelRatio(window.devicePixelRatio);
};

/**
 * 更新和渲染的类
 */
class Resizer {
    constructor(container: any, camera: any, renderer: any) {
        // set initial size 设置初始状态宽高
        setSize(container, camera, renderer);
        window.addEventListener('resize', () => {
            // set the size again if a resize occurs 监听尺寸变化是触发重新设置
            setSize(container, camera, renderer);
            // perform any custom actions
            this.onResize();
        });
    }
    onResize() { }
}

export { Resizer };
