<template>
    <div id="vr-page">
        <!-- <model-viewer style="width: 500px;height: 500px;margin: auto;" alt="Ready Player Me Avatar" camera-controls
            src="/matrix/threeModel/test.glb"
            shadow-intensity="1" touch-action="pan-y">
        </model-viewer> -->
        <div class="three-ctn" ref="myThree"></div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { CubeTextureLoader, GridHelper, AnimationMixer, Raycaster, WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
// import '@google/model-viewer'   //引入组件
let scene: any = null;
let camera: any = null;
let renderer: any = null;
let group: any = null;
let controls: any = null;
let clock: any = null;

const myThree = ref<any>(null);

onMounted(async () => {
    scene = new Scene();
    // scene.background = new Color('skyblue');
    const loader = new CubeTextureLoader();
    const texture = loader.load([
        '/matrix/threeModel/Skybox/px.jpg', // 正向
        '/matrix/threeModel/Skybox/nx.jpg', // 反向
        '/matrix/threeModel/Skybox/py.jpg', // 上
        '/matrix/threeModel/Skybox/ny.jpg', // 下
        '/matrix/threeModel/Skybox/pz.jpg', // 前
        '/matrix/threeModel/Skybox/nz.jpg'  // 后
    ]);
    scene.background = texture;
    await init();
    initGridHelper();
    myThree.value?.appendChild(renderer.domElement);
})

const init = async () => {
    if (myThree.value) {
        camera = new PerspectiveCamera(35, 1, 0.1, 10000);
        camera.position.set(20, 20, 20);
        camera.lookAt(0, 0, 0);

        //创建自然的环境光（天空光颜色，地面光颜色，强度）
        const ambientLight = new HemisphereLight(
            'white',
            'darkslategrey',
            5,
        );
        //创建平行光（颜色，强度）
        const mainLight = new DirectionalLight('white', 4);
        //设置发光坐标
        mainLight.position.set(0, 20, 0);
        const axesHelper = new AxesHelper(100);
        scene.add(ambientLight, mainLight, axesHelper);
        renderer = new WebGLRenderer();
        renderer.setSize(1000, 800);
        renderer.render(scene, camera);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.addEventListener("change", () => {
            renderer.render(scene, camera);
        });
    }
}
// 辅助地面
function initGridHelper() {
    const gridHelper = new GridHelper(1000, 1000)
    scene.add(gridHelper);
    renderer.render(scene, camera);
}
</script>
<style lang="less" scoped></style>