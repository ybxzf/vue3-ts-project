<!-- <template>
  <main>
    <canvas id="three"></canvas>
  </main>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/addons/libs/stats.module.js";

const data = reactive({});
function main() {
  //相机
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;
  //场景
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  // const cube = new THREE.Mesh(geometry, material);
  const light = new THREE.DirectionalLight("0xFFFFFF", 1);
  light.position.set(-1, 2, 4);
  scene.add(light);
  //渲染器
  const canvas = document.querySelector("#three");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  // renderer.render(scene, camera);

  //封装创建网格模型的方法
  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
  }
  //封装动画，随时间变化重新渲染
  function render(time) {
    time *= 0.001; // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }
  window.requestAnimationFrame(render);

  //封装重设canvas绘图缓冲区(drawingbuffer)尺寸
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

onMounted(() => {
  main();
});
</script>

<style>
main {
  margin: 0;
  height: 100%;
  /* text-align: center; */
  /* margin-top: 40vh */
}

#three {
  width: 100%;
  height: 100%;
  display: block;
}
</style> -->

<template>
  <div>案例1</div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped></style>