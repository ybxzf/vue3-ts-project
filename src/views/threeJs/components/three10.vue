<!-- <template>
    <div ref="sceneContainer" class="scene-container">
        <canvas ref="canvas" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';

const sceneContainer = ref(null);
const canvas = ref(null);

let scene, camera, renderer, video, videoTexture, mesh;
let animationFrameId;

onMounted(() => {
    // 获取视频流
    video = document.createElement('video');
    video.width = 640;
    video.height = 480;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            initAR();
        })
        .catch((err) => {
            console.error('Error accessing webcam: ', err);
        });
});

const initAR = () => {
    // 创建 Three.js 场景
    scene = new THREE.Scene();

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    // 创建 WebGL 渲染器并挂载到 canvas 上
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    sceneContainer.value.appendChild(renderer.domElement);

    // 创建视频纹理
    videoTexture = new THREE.VideoTexture(video);

    // 创建一个 2x2 平面几何体，作为视频的背景
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minPolarAngle = 0
    controls.maxPolarAngle = 80 / 360 * 2 * Math.PI
    //监听鼠标，键盘事件
    controls.addEventListener("change", () => {
        renderer.render(scene, camera);
    });

    animateAR();
};

const animateAR = () => {
    // 动画循环
    animationFrameId = requestAnimationFrame(animateAR);
    renderer.render(scene, camera);
};

onBeforeUnmount(() => {
    // 清理视频流和渲染器
    cancelAnimationFrame(animationFrameId);
    if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    if (renderer) {
        renderer.dispose();
    }
});

</script>

<style scoped>
.scene-container {

}

canvas {
    display: block;
}
</style> -->


<template>
    <div id="vr-page">
        <div id="vr-model"></div>
        <video id="video" playsinline muted autoplay></video>
    </div>
</template>
<script setup name="vrPage">
import { onMounted } from "vue";
import vrRenderModel from "@/cases/three/vrRenderModel";

onMounted(() => {
    const model = new vrRenderModel('#vr-model')
    model.init()
})
</script>
<style lang="less" scoped>
#vr-page {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    #vr-model {
        width: 100%;
        height: 100%;
    }
}

#video {
    display: none;
    width: 50%;
    height: 50%;
    object-fit: cover;
}
</style>