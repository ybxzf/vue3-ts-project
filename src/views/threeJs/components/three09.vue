<template>
    <div ref="threeScene"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls';
import * as TWEEN from '@tweenjs/tween.js'
import { onMounted, ref } from 'vue'
import { Raycaster, WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';


let scene: any = null; // 场景
let camera: any = null;
let renderer: any = null;
let controls: any = null;
let mesh: any = null;

let tween: any = null;
let tween2: any = null;
let tween3: any = null;

let clock: any = new Clock();


const threeScene = ref<any>(null);

onMounted(() => {
    init()
})
function init() {
    initScene()
    initCamera()
    initAxesHelper()
    initGridHelper()
    initLight()
    initRenderer()
    initControls()
    initMesh()
    renderer.render(scene, camera);

    tween = new TWEEN.Tween(mesh.position)
    tween.to({ x: 3, y: 0, z: 0 }, 2000)
    tween.onUpdate(function () {
        camera.lookAt(0, 0, 0)
    });

    tween2 = new TWEEN.Tween(mesh.position)
    tween2.to({ x: 3, y: 0, z: 3 }, 2000)

    const scaleParam = { s: 1 }
    tween3 = new TWEEN.Tween(scaleParam)
    tween3.to({ s: 10 }, 2000)
    tween3.onUpdate(function () {
        mesh.scale.x = scaleParam.s
    })

    tween.chain(tween2)
    tween2.chain(tween3)
    tween.start()

    animate()
    window.addEventListener('resize', onWindowResize, false)
}
// 初始化场景
function initScene() {
    scene = new THREE.Scene()
}
// 初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 2)
}
// 辅助轴
function initAxesHelper() {
    const axesHelper = new THREE.AxesHelper(1)
    scene.add(axesHelper)
}
// 辅助地面
function initGridHelper() {
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
}
// 灯光
function initLight() {
    const hesLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hesLight.intensity = 0.3
    scene.add(hesLight)

    const dirLight = new THREE.DirectionalLight()
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.5)
    pointLight.position.set(0, 100, 90)
    scene.add(pointLight)
    pointLight.color.setHSL(Math.random(), 1, 0.5)
}
// 初始化渲染器
function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5)
    threeScene.value?.appendChild(renderer.domElement)
    renderer.shadowMap.enable = true
}
// 初始化轨道控制器
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    controls.minPolarAngle = 0
    controls.maxPolarAngle = 80 / 360 * 2 * Math.PI
    //监听鼠标，键盘事件
    controls.addEventListener("change", () => {
        renderer.render(scene, camera);
    });
}
// Mesh
function initMesh() {
    const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(mesh)
}
function animate() {
    renderer.render(scene, camera)
    tween.update()
    tween2.update()
    tween3.update()
    requestAnimationFrame(animate)
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>
<style scoped></style>