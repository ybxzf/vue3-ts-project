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
import { BackSide, SphereGeometry, EquirectangularReflectionMapping, CubeTextureLoader, TextureLoader, GridHelper, AnimationMixer, Raycaster, WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import Stats from 'three/addons/libs/stats.module.js';

// import '@google/model-viewer'   //引入组件
let scene: any = null;
let camera: any = null;
let renderer: any = null;
let controls: any = null;
let mesh: any = null;
let stats: any = null;
let group: any = null;
let clock: any = null;

const myThree = ref<any>(null);

onMounted(async () => {
    await init();
    myThree.value?.appendChild(renderer.domElement);

})

const init = async () => {
    if (myThree.value) {
        initScene();
        initCamera();
        initLight();
        initAxesAndGridHelper();
        initRenderer();
        initControls();
        initStats();
        // await initEnvTexture();
        await initMesh('/matrix/threeModel/equirectangularMap/home.png');
        animate();
    }
}
// 初始化场景
function initScene() {
    scene = new Scene();
}
// 初始化相机
function initCamera() {
    camera = new PerspectiveCamera(100, 1, 0.1, 10000);
    camera.position.set(20, 10, 0);
    camera.lookAt(0, 0, 0);
}
// 灯光
function initLight() {
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
    scene.add(ambientLight, mainLight);
}
// 初始化渲染器
function initRenderer() {
    renderer = new WebGLRenderer({
        antialias: true  //渲染器锯齿属性
    });
    renderer.setPixelRatio(window.devicePixelRatio)  //设置渲染器当前设备的像素比
    renderer.setSize(window.innerWidth - 180, window.innerHeight);
}
// 初始化轨道控制器
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;//惯性
    // 设置缩放的最大和最小距离
    controls.minDistance = 1;  // 设置最小距离，防止相机太近
    controls.maxDistance = 200;  // 设置最大距离，防止相机太远
    // controls.update();
    // controls.addEventListener("change", () => {
    // });
}
// 辅助坐标轴和辅助地面
function initAxesAndGridHelper() {
    const axesHelper = new AxesHelper(100)
    const gridHelper = new GridHelper(10, 10)
    scene.add(axesHelper, gridHelper)
}

/**
 * 环境纹理(场景背景) 直接用图片设置场景背景的纹理，可以将场景渲染出来
 * 注意：但是OrbitControls无法控制背景随视角移动，想要解决见initMesh()方法
 */
async function initEnvTexture() {
    //1. 立方体贴图天空盒(Skybox)
    // const loader = new CubeTextureLoader();
    // const skyBoxTexture: any = await loader.loadAsync([
    //     '/matrix/threeModel/skyBox/px.png', // 正向
    //     '/matrix/threeModel/skyBox/nx.png', // 反向
    //     '/matrix/threeModel/skyBox/py.png', // 上
    //     '/matrix/threeModel/skyBox/ny.png', // 下
    //     '/matrix/threeModel/skyBox/pz.png', // 前
    //     '/matrix/threeModel/skyBox/nz.png',  // 后
    // ]);
    // scene.background = skyBoxTexture;

    //2. 球形贴图(Equirectangular Map)
    const loader = new TextureLoader();
    const equirectangularMapTexture = await loader.loadAsync('/matrix/threeModel/equirectangularMap/home.png');
    equirectangularMapTexture.mapping = EquirectangularReflectionMapping;
    scene.background = equirectangularMapTexture;
    scene.environment = equirectangularMapTexture;
}
/**
 * 球体场景，创建一个球体，将场景图设置为球体的纹理，并设置内侧可见，把视角放到场景内部，模拟出全场景的效果，OrbitControls可以控制背景随视角移动
 * 注意：但是当OrbitControls拖出场景时，场景图会消失，因为视角已经到了场景外部，可以限制OrbitControls的缩放，
 * @param url 
 */
async function initMesh(url: string) {
    // 1. 使用 TextureLoader 加载纹理
    const textureLoader = new TextureLoader();
    const backgroundTexture = await textureLoader.loadAsync(url);
    // 2. 创建一个 SphereGeometry 背景球体，背景贴图会应用到球体的内表面
    const geometry = new SphereGeometry(500, 60, 40); // 半径500，60段经度，40段纬度
    const material = new MeshBasicMaterial({
        map: backgroundTexture,
        side: BackSide // 使纹理只在球体的内侧可见
    });
    mesh = new Mesh(geometry, material);
    // mesh.position.set(0, 400, 0);
    // camera.position.set(20, mesh.position.y + 10, 0);
    // controls.target.set(0, 400, 0);
    // 3. 将背景添加到场景
    scene.add(mesh);
}
//Stats查看渲染帧率
function initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.dom.style.left = 'auto';      // 修改原本left样式为auto
    // stats.domElement.style.removeProperty('left');// 删除原本left样式
    stats.domElement.style.right = '10px';// 设置右边位置
    myThree.value?.appendChild(stats.domElement);
}
// 动画
function animate() {
    requestAnimationFrame(animate);
    stats.update();
    renderer.render(scene, camera);
}
</script>
<style lang="less" scoped></style>