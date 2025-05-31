<!-- 
    vue2加载模型封装
    传参：
        url:模型地址
    回调：
        on-load:模型加载完成回调
        on-dblclick:双击模型回调
-->

<template>
    <div class="three-ctn" ref="myThree"></div>
</template>
<script>
import { Box3, Vector3, GridHelper, AnimationMixer, Raycaster, WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, AmbientLight, PointLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {
    name: "GLTF-3D",
    props: {
        url: {
            type: String,
            default: () => (""),
        },

    },
    data() {
        return {
            scene: null,//场景
            group: null,//模型组
            controls: null,//控制器
            renderer: null,//渲染器
            camera: null,//相机
            clock: null,//时钟
            raycaster: new Raycaster(),//射线
            mouse: new Vector3(),//鼠标

        }
    },
    computed: {},
    watch: {},

    created() {
    },
    mounted() {
        this.scene = new Scene();
        // this.scene.background = 'transparent';
        // this.scene.background = new Color('skyblue');
        this.init();
        this.$refs.myThree.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
    },
    methods: {
        //初始化场景
        async init() {
            this.clock = new Clock();
            this.camera = new PerspectiveCamera(35, 1, 0.1, 10000);
            this.camera.aspect = this.$refs.myThree.offsetWidth / this.$refs.myThree.offsetHeight;
            this.camera.updateProjectionMatrix(); // 必须调用！
            this.camera.position.set(30, 30, 30);
            this.camera.lookAt(0, 0, 0);
            //创建自然的环境光（天空光颜色，地面光颜色，强度）
            const ambientLight = new AmbientLight("#ffffff", 1.5);
            //创建平行光（颜色，强度）
            const mainLight = new DirectionalLight('white', 4);
            mainLight.position.set(0, 20, 0);
            //点光源
            const point = new PointLight("#ffffff", 0.2);
            point.position.set(0, 1000, 1000);
            //告诉平行光需要开启阴影投射
            point.castShadow = false;
            //设置发光坐标
            this.scene.add(ambientLight, mainLight, point);
            this.renderer = new WebGLRenderer();
            this.renderer.setClearColor('#ffffff', 0); //设置背景颜色
            this.renderer.setSize(this.$refs.myThree.offsetWidth, this.$refs.myThree.offsetHeight);
            const loader = new GLTFLoader();

            // 移除旧模型
            this.scene.traverse(child => {
                if (child.isMesh) this.scene.remove(child);
            });

            const gltfModel = await loader.loadAsync(this.url);
            gltfModel.scene.name = "GLTF模型"
            gltfModel.scene.position.set(0, 0, 0);
            gltfModel.scene.rotation.set(0, 1, 0);
            this.group = new Group();
            this.group.add(gltfModel.scene);
            this.group.position.set(-10, -5, 0);
            this.scene.add(this.group);
            this.load(this.group);
            this.renderer.render(this.scene, this.camera);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            //控制器注意力
            this.controls.target.copy(this.group.children[0].position);
            this.controls.addEventListener("change", () => {
                this.renderer.render(this.scene, this.camera);
            });
            //监听窗口大小变化
            window.addEventListener('resize', this.onResize, false);
            //监听双击事件
            this.$el.addEventListener('dblclick', this.onDblClick, false);

        },
        //模型加载完成
        load(group) {
            this.$emit('on-load', group, this.scene, this.camera, this.controls);
        },
        //窗口大小变化
        onResize() {
            this.camera.aspect = this.$refs.myThree.offsetWidth / this.$refs.myThree.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.$refs.myThree.offsetWidth, this.$refs.myThree.offsetHeight);
            this.renderer.render(this.scene, this.camera);
        },
        //双击事件
        onDblClick(event) {
            this.controls.reset();
            this.camera.position.set(30, 30, 30);
            this.camera.lookAt(0, 0, 0);
            this.renderer.render(this.scene, this.camera);

            const intersected = this.pick(event.clientX, event.clientY);
            if (intersected) {
                this.$emit('on-dblclick', intersected);
            }
        },
        //点击鼠标，是否获取到模型
        pick(x, y) {
            if (!this.group) return null;

            const rect = this.$el.getBoundingClientRect();

            x -= rect.left;
            y -= rect.top;

            this.mouse.x = (x / this.$refs.myThree.offsetWidth) * 2 - 1;
            this.mouse.y = -(y / this.$refs.myThree.offsetHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);

            const intersects = this.raycaster.intersectObject(this.group, true);

            return (intersects && intersects.length) > 0 ? intersects[0] : null;
        },
    },
    beforeDestroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
        window.removeEventListener('resize', this.onResize, false);
        this.$el.removeEventListener('dblclick', this.onDblClick, false);
    }

}
</script>

<style lang="scss" scoped>
.three-ctn {
    width: 100%;
    height: 100%;
}
</style>