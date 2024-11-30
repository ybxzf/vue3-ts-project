<template>
    <div id="page">
        <div class="three-ctn" ref="myThree">
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted, reactive } from "vue";
import { WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

import { OrbitControls } from '@three-ts/orbit-controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Pie from './3DPie.js';

let scene: any = null;
let group: any = null;
let controls: any = null;
let camera: any = null;
let pieGroup: any = null;

let mouse = new THREE.Vector2();
let raycaster: any = new THREE.Raycaster();

const renderer = ref<any>(null);
const myThree = ref<any>(null);

const size = reactive({
    width: window.innerWidth,
    height: window.innerHeight
})


onMounted(async () => {
    //创建场景
    scene = new Scene();
    scene.background = new Color('skyblue');

    await init();

    window.addEventListener('resize', (e: any) => {
        console.log(e);

    });
    window.addEventListener('dblclick', (event: any) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        // 计算射线与场景中的物体的交集
        const intersects = getIntersects();
        // 如果与模型发生碰撞，执行点击事件
        if (intersects.length > 0) {
            console.log('点击了物体:', intersects[0].object);
            // 修改物体颜色或执行其他操作
            intersects[0].object.material.color.set(0xff0000); // 将颜色设置为红色
        }
        // const intersected = pick(event.clientX, event.clientY);
        // if (intersected) {
        //     console.log(event);
        // }

    });
});

const init = async () => {
    if (myThree.value) {



        //创建相机（视野角度（FOV）, 长宽比（aspect ratio）, 近截面（near）, 远截面（far））
        const camera: any = new THREE.PerspectiveCamera(100, 10 / 8, 0.1, 1000);
        //设置相机坐标
        camera.position.set(25, 25, 25);
        //设置相机对焦坐标
        camera.lookAt(0, 0, 0);

        //创建形状
        const geometry: any = new THREE.BoxGeometry(50, 50, 50);
        //创建材质
        const material: any = new THREE.MeshBasicMaterial({
            color: 0x00ff00, //(绿色)
            transparent: true, //开启透明度
            opacity: 0.6, //设置透明度
        });
        //创建网格模型（形状, 材质）
        const cube: any = new THREE.Mesh(geometry, material);
        //设置模型对象的xyz坐标
        cube.position.set(0, 0, 0);
        //将网格模型添加到场景
        // scene.add(cube);

        //环境光
        const light = new THREE.AmbientLight(0xffffff)
        scene.add(light);

        //创建辅助坐标轴
        const axesHelper = new THREE.AxesHelper(100);
        //将坐标轴添加到场景
        scene.add(axesHelper);

        //创建渲染器
        const renderer: any = new THREE.WebGLRenderer({ antialias: true });
        //设置渲染器大小，即在页面中占画布的大小
        renderer.setSize(1000, 800);
        //告诉渲染器需要阴影效果 
        renderer.setClearColor('#1F2025', 1.0);
        // renderer.domElement.style.width = "100%";
        // renderer.domElement.style.height = "100%";
        //渲染场景和相机
        renderer.render(scene, camera);

        pieGroup = new Pie({
            items: [{
                value: Math.random() * 10,
                color: '#ffffff'
            }, {
                value: Math.random() * 10,
                color: '#3DCE3D'
            }, {
                value: Math.random() * 10,
                color: '#0080FF'
            },
            {
                value: Math.random() * 10,
                color: '#A473EA'
            }],
            text: (item: any) => {
                return 'value-' + item.value
            }
        });
        pieGroup.rotation.x = (Math.PI / 180) * 90;

        group = new Group();
        group.add(pieGroup);
        scene.add(group);


        //创建控件对象
        const controls: any = new OrbitControls(camera, renderer.domElement);
        //监听鼠标，键盘事件
        controls.addEventListener("change", () => {
            renderer.render(scene, camera);
        });
        renderer.render(scene, camera);
        myThree.value?.appendChild(renderer.domElement);

    }
}

// 获取射线与物体的交点
const getIntersects = () => {
    return raycaster.intersectObjects(scene.children);
};

//点击鼠标，是否获取到模型
function pick(x: any, y: any) {
    if (!myThree.value) return null;

    const rect = myThree.value.getBoundingClientRect();

    x -= rect.left;
    y -= rect.top;

    mouse.x = (x / size.width) * 2 - 1;
    mouse.y = -(y / size.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(pieGroup, true);

    return (intersects && intersects.length) > 0 ? intersects[0] : null;
}





</script>

<style lang="less" scoped>
.three-ctn {
    width: 1000px;
    height: 800px;
}
</style>