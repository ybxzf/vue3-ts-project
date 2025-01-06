<template>
    <div id="page">
        <el-select v-model="bird" @change="chooseView">
            <el-option v-for="item in birds" :label="item" :value="item" />
        </el-select>
        <div class="three-ctn" ref="myThree">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

import { OrbitControls } from '@three-ts/orbit-controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let scene: any = null;
let group: any = null;
let controls: any = null;

const renderer = ref<any>(null);
const camera = ref<any>(null);
const myThree = ref<any>(null);
const clock = ref<any>(null);


const bird = ref<any>(null);
const birds = reactive<any[]>([]);





onMounted(async () => {
    scene = new Scene();
    scene.background = new Color('skyblue');
    await init();
    myThree.value?.appendChild(renderer.value.domElement);
    renderer.value.render(scene, camera.value);
});

const init = async () => {
    if (myThree.value) {
        clock.value = new Clock();
        camera.value = new PerspectiveCamera(35, 1, 0.1, 10000);
        camera.value.position.set(10, 10, 10);
        camera.value.lookAt(0, 0, 0);
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

        renderer.value = new WebGLRenderer();
        renderer.value.setSize(1000, 800);
        renderer.value.render(scene, camera.value);

        group = new Group();
        group.name = "鸟群";

        const loader = new GLTFLoader();

        const Stork = await loader.loadAsync('/matrix/Stork.glb');
        Stork.scene.name = "白鹤"
        Stork.scene.position.set(0, 0, 0);
        Stork.scene.rotation.set(0, 1, 0);
        group.add(Stork.scene);

        loader.load(
        require('/matrix/Parrot.glb')
        , (gltf) => {
            gltf.scene.position.set(0, 3, 0);
            gltf.scene.rotation.set(0, 1, 0);
            renderer.value.render(scene, camera.value);
            gltf.scene.name = "鹦鹉"
            group.add(gltf.scene);
        })

        const [flamingo1, flamingo2] = await Promise.all([
            loader.loadAsync('/matrix/Flamingo.glb'),
            loader.loadAsync('/matrix/Flamingo.glb')
        ])
        flamingo1.scene.position.set(3, 0, 0);
        flamingo1.scene.rotation.set(0, 1, 0);
        flamingo1.scene.name = "粉鹤右"

        flamingo2.scene.position.set(0, 0, 3);
        flamingo2.scene.rotation.set(0, 1, 0);
        flamingo2.scene.name = "粉鹤左"
        group.add(flamingo1.scene, flamingo2.scene);

        scene.add(group)
        group.children.forEach((item: any) => {
            birds.push(item.name)
        });
        bird.value = birds[0];

        controls = new OrbitControls(camera.value, renderer.value.domElement);
        controls.enableDamping = true;
        //控制器注意力
        controls.target.copy(group.children[0].position);
        controls.addEventListener("change", () => {
            renderer.value.render(scene, camera.value);
        });
        // animate()
    }
}

// 封装动画
function animate() {
    //递归调用动画
    window.requestAnimationFrame(animate);
    //每次刷新旋转(rotation)角度0.01
    group.children[0].rotation.y += 0.01;

    //重新渲染场景和相机
    renderer.value.render(scene, camera.value);
}

//切换控制器注意力
function chooseView() {
    const [mesh] = group.children.filter((item: any) => item.name === bird.value)
    console.log(mesh);
    controls.target.copy(mesh.position);
    controls.update();
}

</script>

<style lang="less" scoped>
.three-ctn {
    width: 1000px;
    height: 800px;
}
</style>