<template>
    <div id="page">
        <el-button type="primary" @click="showThree">打开</el-button>
        <el-select v-model="bird" @change="chooseView">
            <el-option v-for="item in birds" :label="item.scene.name" :value="item.scene.name" />
        </el-select>
        <div class="three-ctn" ref="myThree">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { GridHelper, AnimationMixer, Raycaster, WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

import { OrbitControls } from '@three-ts/orbit-controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let scene: any = null;
let group: any = null;
let controls: any = null;
// 用于控制动画的变量
let mixerList: any[] = [];

const renderer = ref<any>(null);
const camera = ref<any>(null);
const myThree = ref<any>(null);
const clock = ref<any>(null);


const show = ref<boolean>(true);
const bird = ref<any>("白鹤");
const birds = reactive<any[]>([]);
const mouse = reactive<any>({
    x: 0,
    y: 0
});
const size = reactive<any>({
    width: 1707,
    height: 898
});
const raycaster = new Raycaster();

onMounted(async () => {
    scene = new Scene();
    scene.background = new Color('skyblue');
    await init();
    initGridHelper();
    myThree.value?.appendChild(renderer.value.domElement);

    window.addEventListener('dblclick', onDblClick, false);
});

const init = async () => {
    if (myThree.value) {
        clock.value = new Clock();
        camera.value = new PerspectiveCamera(35, 1, 0.1, 10000);
        camera.value.position.set(20, 20, 20);
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
        Stork.scene.position.set(0, 1, 0);
        Stork.scene.rotation.set(0, 1, 0);
        group.add(Stork.scene);
        birds.push(Stork);

        const Soldier = await loader.loadAsync('/matrix/threeModel/RobotExpressive.glb');
        Soldier.scene.name = "机器人"
        Soldier.scene.position.set(0, 0, 0);
        Soldier.scene.rotation.set(0, 1, 0);
        // Soldier.scene.scale.set(2, 2, 2);  //放大 
        group.add(Soldier.scene);
        birds.push(Soldier);

        loader.load('/matrix/Parrot.glb', (gltf) => {
            gltf.scene.position.set(0, 4, 0);
            gltf.scene.rotation.set(0, 1, 0);
            // renderer.value.render(scene, camera.value);
            gltf.scene.name = "鹦鹉"
            group.add(gltf.scene);
            birds.push(gltf);
        })

        const [flamingo1, flamingo2] = await Promise.all([
            loader.loadAsync('/matrix/Flamingo.glb'),
            loader.loadAsync('/matrix/Flamingo.glb')
        ])
        birds.push(...[flamingo1, flamingo2]);
        flamingo1.scene.position.set(3, 1, 0);
        flamingo1.scene.rotation.set(0, 1, 0);
        flamingo1.scene.name = "粉鹤右"

        flamingo2.scene.position.set(0, 1, 3);
        flamingo2.scene.rotation.set(0, 1, 0);
        flamingo2.scene.name = "粉鹤左"
        group.add(flamingo1.scene, flamingo2.scene);

        scene.add(group)
        // group.children.forEach((item: any) => {
        //     birds.push(item.name)
        // });
        console.log("birds", birds);

        controls = new OrbitControls(camera.value, renderer.value.domElement);
        controls.enableDamping = true;
        //控制器注意力
        controls.target.copy(group.children[0].position);
        controls.addEventListener("change", () => {
            renderer.value.render(scene, camera.value);
        });
        // 添加预设动画
        birds.forEach((gltf: any, i: number) => {
            console.log(gltf);
            let action = null;
            if (gltf.animations && gltf.animations.length) {
                mixerList.push(new AnimationMixer(gltf.scene));
                if (gltf.animations.length === 1) {
                    // 创建并播放第一个动画
                    action = mixerList[i].clipAction(gltf.animations[0]);
                    action.play();  // 播放动画
                } else {
                    action = mixerList[i].clipAction(gltf.animations[10]);
                    action.play();  // 播放动画
                }
            }
        })
        animate()
    }
}

// 辅助地面
function initGridHelper() {
    const gridHelper = new GridHelper(1000, 1000)
    scene.add(gridHelper)
}

// 封装动画
function animate() {
    //递归调用动画
    window.requestAnimationFrame(animate);
    //每次刷新旋转(rotation)角度0.01
    // group.children[0].rotation.y += 0.01;
    group.children[1].position.x += 0.01;
    group.children[1].position.z += 0.01;
    if (bird.value === "机器人") {
        controls.target.copy(group.children[1].position);
        controls.update();
    }
    // 更新动画混合器
    mixerList.forEach((mixer: any) => {
        if (mixer) {
            mixer.update(0.01); // 每帧更新动画
        }
    })
    //重新渲染场景和相机
    renderer.value.render(scene, camera.value);
}

function showThree() {
    if (show.value) {
        renderer.value.render(scene, camera.value);
        show.value = false;
    }
}

function onDblClick(event: any) {
    const intersected = pick(event.clientX, event.clientY);
    if (intersected) {
        console.log('双击', intersected);

    }
}
function pick(x: any, y: any) {
    if (!group) return null;
    if (myThree.value) {
        const rect = myThree.value.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        mouse.x = (x / size.width) * 2 - 1;
        mouse.y = -(y / size.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera.value);
        const intersects = raycaster.intersectObject(group, true);
        return (intersects && intersects.length) > 0 ? intersects[0] : null;
    }

}

function chooseView() {
    const [mesh] = group.children.filter((item: any) => item.name === bird.value)
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