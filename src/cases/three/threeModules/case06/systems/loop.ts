import { Clock } from 'three';

//创建时钟，用于动画更新和帧率控制的场景
const clock = new Clock();

class Loop {
    camera: any;
    scene: any;
    renderer: any;
    updatables: any[];
    constructor(camera: any, scene: any, renderer: any) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        //动画循环
        this.renderer.setAnimationLoop(() => {
            // 告诉每个动画对象向前勾选一帧
            this.tick();
            // 渲染
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        //停止
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        // 每帧只调用一次getDelta函数！
        const delta = clock.getDelta();

        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}

export { Loop };
