<template>
    <div class="main">
        <div class="three-ctn" ref="myThree"></div>
    </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from "vue";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons';
import { OrbitControls } from '@three-ts/orbit-controls';

const myThree = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let sphere: THREE.Mesh;
let group: THREE.Group;

let raycaster: THREE.Raycaster; // 射线检测器
let mouse: THREE.Vector2; // 鼠标坐标

onMounted(() => {
    initThree();
})

const initThree = () => {
    if (myThree.value) {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, myThree.value.clientWidth / myThree.value.clientHeight, 0.1, 10000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(myThree.value.clientWidth, myThree.value.clientHeight);
        myThree.value.appendChild(renderer.domElement);
    }
    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    //创建辅助坐标轴
    const axesHelper = new THREE.AxesHelper(100);
    //将坐标轴添加到场景
    scene.add(axesHelper);

    // 加载 GLB 模型
    const loader = new GLTFLoader();
    loader.load('/matrix/threeModel/test.glb', (gltf: any) => {
        const model = gltf.scene;
        // model.position.set(40, -20, -100); // 设置模型加载坐标
        model.position.set(0, 0, 0); // 设置模型加载坐标
        model.scale.set(1, 1, 1);//设置模型放大比例
        model.rotation.set(0, 0, 0);//旋转模型
        scene.add(model);

        // 创建一个组来容纳多个球体
        group = new THREE.Group();
        //创建材质
        const material = new THREE.MeshBasicMaterial({ color: 0x8B0000 }); // 暗红色
        // 添加异常球体
        const warnXYZList = [
            { x: 1.175, y: 0.14, z: -9.5 },
            { x: 1.37, y: 0.14, z: -9.5 },
            { x: 1.565, y: 0.14, z: -9.5 },
        ]
        for (let i = 0; i < warnXYZList.length; i++) {
            const geometry = new THREE.SphereGeometry(0.05, 32, 32); // 半径0.2
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(warnXYZList[i].x, warnXYZList[i].y, warnXYZList[i].z); // 根据索引设置位置
            group.add(sphere);
        }

        // 添加正常球体
        const material2 = new THREE.MeshBasicMaterial({ color: "#06ffdf" }); // 蓝绿色
        const warnXYZList2 = [
            { x: 0.415, y: 0.14, z: -9.5 },
            { x: 0.625, y: 0.14, z: -9.5 },
            { x: 0.815, y: 0.14, z: -9.5 },
        ]
        for (let i = 0; i < warnXYZList2.length; i++) {
            const geometry = new THREE.SphereGeometry(0.05, 32, 32); // 半径0.2
            const sphere = new THREE.Mesh(geometry, material2);
            sphere.position.set(warnXYZList2[i].x, warnXYZList2[i].y, warnXYZList2[i].z); // 根据索引设置位置
            scene.add(sphere);

        }
        scene.add(group);

        animate();
    },
        undefined,
        (error: any) => {
            console.error(error);
        }
    );
    camera.position.z = 5;
    //创建控件对象
    const controls: any = new OrbitControls(camera, renderer.domElement);
    //监听鼠标，键盘事件
    controls.addEventListener("change", () => {
        renderer.render(scene, camera);
    });

    // 添加双击事件
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    myThree.value?.addEventListener('dblclick', (event: any) => {
        // 计算鼠标在归一化设备坐标 (-1 到 +1) 中的坐标
        const rect = myThree.value!.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // 使用射线检测
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children); // 检测与球体的交集

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object; // 获取第一个交集对象
            const coordinates = intersects[0].point; // 获取点击位置的坐标

            // 返回点击位置坐标和模型信息
            console.log('Clicked Coordinates:', coordinates);
            console.log('Intersected Model:', intersectedObject);
        }
    });
}

const animate = () => {
    requestAnimationFrame(animate);
    // 使球体闪烁
    if (group) {
        const time = Date.now() * 0.02; // 用于控制闪烁速度
        const intensity = (Math.sin(time) + 1) / 2; // 计算透明度
        // group.children.forEach((sphere: any) => {
        //     (sphere.material as THREE.MeshBasicMaterial).opacity = opacity; // 设置透明度
        //     sphere.material.transparent = true; // 使材质支持透明度
        // });
        const startColor = new THREE.Color(0x8B0000); // 暗红色
        const endColor = new THREE.Color(0xff0000); // 亮红色
        const color = startColor.clone().lerp(endColor, intensity); // 线性插值计算颜色
        group.children.forEach((sphere: any) => {
            (sphere.material as THREE.MeshBasicMaterial).color.copy(color); // 更新颜色
        });
    }
    renderer.render(scene, camera);
};

</script>

<style lang="less" scoped>
.main {
    position: relative;
    width: 100%;
    height: 100%;
}

.three-ctn {
    position: absolute;
    width: 80%;
    height: 80%;
    // background-color: argb(255, 255, 100, 0.5);
    background-color: aqua;

}
</style>