<!-- <template>
  <main>
    <canvas id="c"></canvas>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Stats from "three/addons/libs/stats.module.js";

const helper = ref(null);
const gui = ref(null);
function main() {
  //获取画布
  const canvas = document.querySelector("#c");
  //渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas }); //{抗锯齿:true,渲染画布}
  //UI库
  gui.value = new GUI();

  const fov = 70; //视角
  const aspect = 2; //宽高比
  const near = 0.1; //近截面
  const far = 1000; //远截面
  //相机
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 40, 0); //相机坐标
  camera.up.set(0, 0, 1); //渲染效果：蓝色z轴向上
  camera.lookAt(0, 0, 0); //相机对焦坐标
  //场景
  const scene = new THREE.Scene();
  const color = 0xffffff; //白色
  const intensity = 3; //光的强度
  const light = new THREE.PointLight(color, intensity); //点光源
  scene.add(light); //添加到场景中
  //更新旋转角度的对象数组
  const objects = [];
  const radius = 1; //半径
  const widthSegments = 8; //竖直光滑程度
  const heightSegments = 6; //水平光滑程度
  //球体
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  {
    //太阳场景图节点
    const solarSystem = new THREE.Object3D(); //空场景图节点，像 Mesh 一样，它也是场景图中的一个节点，但与 Mesh 不同的是，它没有材质（material）和几何体（geometry）。它只是代表一个局部空间
    scene.add(solarSystem); //太阳场景节点添加到场景中
    objects.push(solarSystem); //太阳场景节点添加到对象数组中
    //地球场景图节点
    const earthOrbit = new THREE.Object3D(); //空场景图节点，像 Mesh 一样，它也是场景图中的一个节点，但与 Mesh 不同的是，它没有材质（material）和几何体（geometry）。它只是代表一个局部空间
    earthOrbit.position.x = 10; //设置x轴偏移量
    solarSystem.add(earthOrbit); //地球场景节点 -> 太阳场景节点中
    objects.push(earthOrbit); //地球场景节点添加到对象数组中
    //月球场景图节点
    const moonOrbit = new THREE.Object3D(); //空场景图节点，像 Mesh 一样，它也是场景图中的一个节点，但与 Mesh 不同的是，它没有材质（material）和几何体（geometry）。它只是代表一个局部空间
    moonOrbit.position.x = 2; //设置x轴偏移量
    earthOrbit.add(moonOrbit); //月球场景节点 -> 地球场景节点中
    objects.push(moonOrbit); //地球场景节点添加到对象数组中

    //太阳
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 }); //材质 {放射属性：黄色}
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial); //网格模型
    sunMesh.scale.set(5, 5, 5); //模型缩放5倍
    solarSystem.add(sunMesh); //太阳-> 太阳场景节点中
    objects.push(sunMesh); //添加到对象数组中

    //地球
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    }); //材质 {颜色：蓝色, 放射属性：蓝黑色}
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial); //网格模型
    earthOrbit.add(earthMesh); ////地球 -> 地球场景节点中
    objects.push(earthMesh); //添加到对象数组中

    //月球
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    }); //材质 {颜色：灰色, 放射属性：灰黑色}
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial); //网格模型
    moonMesh.scale.set(0.5, 0.5, 0.5); //模型缩放-5倍
    moonOrbit.add(moonMesh); //月球 -> 月球场景节点中
    objects.push(moonMesh); //添加到对象数组中

    makeAxisGrid(solarSystem, "solarSystem", 25);
    makeAxisGrid(sunMesh, "sunMesh");
    makeAxisGrid(earthOrbit, "earthOrbit");
    makeAxisGrid(earthMesh, "earthMesh");
    makeAxisGrid(moonOrbit, "moonOrbit");
    makeAxisGrid(moonMesh, "moonMesh");
  }

  function makeAxisGrid(node, label, units) {
    helper.value = new AxisGridHelper(node, units);
    gui.value.add(helper.value, "visible").name(label);
  }

  //请求动画的API
  requestAnimationFrame(render);
  //封装动画，随时间变化重新渲染
  function render(time) {
    time *= 0.001; //时间变化
    //尺寸变化时进入
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement; //获取渲染器渲染的画布
      camera.aspect = canvas.clientWidth / canvas.clientHeight; //重设相机宽高比
      camera.updateProjectionMatrix(); //更新相机的投影矩阵
    }
    objects.forEach((obj) => {
      obj.rotation.y = time; //设置网格模型Y轴角度
    });
    renderer.render(scene, camera); //渲染画面
    requestAnimationFrame(render); //递归调用，呈现动画效果，类似于setInterval
  }
  //封装重设canvas绘图缓冲区(drawingbuffer)尺寸
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement; //获取渲染器渲染的画布
    const width = canvas.clientWidth; //获取画布宽
    const height = canvas.clientHeight; //获取画布高
    //尺寸是否改变
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      //重设渲染器尺寸
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}
//定义一个坐标网格辅助器
class AxisGridHelper {
  constructor(node, units = 10) {
    //坐标辅助器
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
    //网格辅助器
    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);
    console.log(this);
    this.grid = grid;
    this.axes = axes;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}

onMounted(() => {
  main();
});
onUnmounted(() => {
  if (helper.value) {
    helper.value = null;
  }
  if (gui.value) {
    gui.value = null;
  }
});
</script>

<style>
main {
  margin: 0;
  height: 100%;
  /* text-align: center; */
  /* margin-top: 40vh */
}

#c {
  width: 100%;
  height: 100%;
  display: block;
}
</style> -->

<template>
  <div>案例2</div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped></style>