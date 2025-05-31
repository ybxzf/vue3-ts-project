<template>
  <div class="three-ctn" ref="myThree"></div>
</template>
<script>
import { Box3, Vector3, Vector2, GridHelper, AnimationMixer, BackSide, Raycaster, WebGLRenderer, AxesHelper, Group, Color, Scene, DirectionalLight, AmbientLight, PointLight, HemisphereLight, Clock, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, EdgesGeometry, Mesh } from 'three';
// 效果制作器
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// 渲染通道
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// 发光描边OutlinePass
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {
  name: "GLTF-3D",
  props: {
    url: {
      type: String,
      default: () => (""),
    },
    object: {
      type: Object,
      default: () => ({}),
    },
    highLightModel: {
      type: String,
      default: () => (""),
    }
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
      selectedMesh: null,// 存储选中状态
      originalMaterials: new WeakMap(),// 存储原始材质
      animationId: null,//动画id
      composer: null,//渲染通道
      greenOutline: null,//发光描边OutlinePass
      redOutline: null,//发红光描边OutlinePass
      rotateNum: 0.002,//旋转速度
    }
  },
  computed: {},
  watch: {
    highLightModel: {
      handler(newVal, oldVal) {
        console.log('点击了', newVal);
        this.scene.traverse(child => {
          // console.log('child', child.name, child.isMesh, child);
          if (child.name === newVal) {
            //给mesh包装一层group
            if (child.isMesh) {
              const wrapper = new Group();
              child.parent.add(wrapper);
              wrapper.add(child);
              // 标记原始mesh以便后续操作
              child.userData.isOriginal = true;
              this.greenOutline.selectedObjects = [child];
            } else {
              this.greenOutline.selectedObjects = [child];
            }
          }
        });
        if (!newVal) {
          this.greenOutline.selectedObjects.length = 0;
        }
      },
      deep: true,
    },
  },

  created() {
  },
  mounted() {
    this.scene = new Scene();
    this.init();
    this.$refs.myThree.appendChild(this.renderer.domElement);
    // this.renderer.render(this.scene, this.camera);
  },
  methods: {
    //初始化场景
    async init() {
      this.clock = new Clock();
      this.camera = new PerspectiveCamera(75, this.$refs.myThree.offsetWidth / this.$refs.myThree.offsetHeight, 0.1, 10000);
      this.camera.aspect = this.$refs.myThree.offsetWidth / this.$refs.myThree.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.camera.position.set(5, 5, 5);
      this.camera.lookAt(
        this.object.positionX || 0,
        this.object.positionY || 0,
        this.object.positionZ || 0,
      );
      //创建自然的环境光（天空光颜色，地面光颜色，强度）
      const ambientLight = new AmbientLight("#ffffff", 1);
      //创建平行光（颜色，强度）
      const mainLight = new DirectionalLight('white', 0);
      mainLight.position.set(1, 0, 1);
      //点光源
      const point = new PointLight("#ffffff", 0.7);
      point.position.set(0, 340, 1000);
      //告诉平行光需要开启阴影投射
      point.castShadow = false;
      //设置发光坐标
      this.scene.add(ambientLight, mainLight, point);
      this.renderer = new WebGLRenderer({ antialias: true });
      this.renderer.setClearColor('#ffffff', 0); //设置背景颜色
      this.renderer.setSize(this.$refs.myThree.offsetWidth, this.$refs.myThree.offsetHeight);
      const loader = new GLTFLoader();

      // 移除旧模型
      this.scene.traverse(child => {
        if (child.isMesh) this.scene.remove(child);
      });

      const gltfModel = await loader.loadAsync(this.url);
      gltfModel.scene.name = "GLTF模型"
      //计算模型包围盒中心点
      const bbox = new Box3().setFromObject(gltfModel.scene);
      const center = bbox.getCenter(new Vector3());
      //将模型原点移至几何中心
      gltfModel.scene.position.sub(center);
      // gltfModel.scene.position.set(0, 0, 0);
      // gltfModel.scene.rotation.set(0, 1, 0);
      this.group = new Group();
      this.group.add(gltfModel.scene);
      this.group.position.set(
        this.object.positionX || 0,
        this.object.positionY || 0,
        this.object.positionZ || 0
      );
      this.scene.add(this.group);
      //模型导入完成
      this.load(this.group);
      this.scene.traverse(child => {
        const names = [
          '转向架枕梁', '手动气缸抱弹簧1', '中转-六轴机器人3_1',
          '枕簧拆卸机械手_2', '枕簧拆卸-六轴机器人4_1', '底座升降'
        ];
        //修改材质颜色
        if (names.includes(child.name)) {
          if (child.material) {
            // 如果材质是数组，遍历所有材质
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.color.setHex(0xffffff)
                mat.needsUpdate = true;
              })
            } else {
              child.material.color.setHex(0xffffff);
              child.material.needsUpdate = true;
            }
          }
        }
        //修改材质透明度
        if (child.name == '地面') {
          if (child.material) {
            // 如果材质是数组，遍历所有材质
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.transparent = true; // 启用透明
                mat.opacity = 0.5;
              })
            } else {
              child.material.transparent = true; // 启用透明
              child.material.opacity = 0.5;
            }
          }
        }
      })
      // const axesHelper = new AxesHelper(5);
      // this.scene.add(axesHelper);
      // this.renderer.render(this.scene, this.camera);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      //控制器注意力
      this.controls.target.copy(this.group.children[0].position);
      this.controls.update();
      this.controls.addEventListener("change", () => {
        // this.renderer.render(this.scene, this.camera);
      });
      //监听窗口大小变化
      window.addEventListener('resize', this.onResize, false);
      //监听双击事件
      this.$el.addEventListener('dblclick', this.onDblClick, false);
      this.setupHighlight();
      this.animate();
    },
    animate() {
      if (!this.composer) return; // 防御性编程
      this.animationId = requestAnimationFrame(this.animate);
      // 旋转模型
      if (this.group) {
        this.group.rotation.y += this.rotateNum;
      }
      // 更新控制器（如果启用）
      if (this.controls) {
        this.controls.update();
      }
      this.composer.render();
      // this.renderer.render(this.scene, this.camera);
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
      // this.renderer.render(this.scene, this.camera);
    },
    //高亮
    setupHighlight(meshName = "") {
      const container = this.$refs.myThree;
      // 1. 创建效果组合器
      this.composer = new EffectComposer(this.renderer);
      // 2. 添加渲染通道
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      // 3. 创建轮廓高亮Pass
      this.greenOutline = new OutlinePass(
        new Vector2(container.offsetWidth, container.offsetHeight),
        this.scene,
        this.camera
      );
      this.greenOutline.edgeStrength = 5.0; // 边缘强度
      this.greenOutline.edgeGlow = 1.0;     // 发光强度
      this.greenOutline.edgeThickness = 2.0; // 边缘厚度
      this.greenOutline.pulsePeriod = 2;    // 闪烁周期（秒）
      this.greenOutline.visibleEdgeColor.set(0x00ff00); // 绿色高亮
      this.composer.addPass(this.greenOutline);
      console.log('greenOutline', this.greenOutline);
      this.greenOutline.selectedObjects = [];

      this.redOutline = new OutlinePass(
        new Vector2(container.offsetWidth, container.offsetHeight),
        this.scene,
        this.camera
      );
      this.redOutline.edgeStrength = 5.0; // 边缘强度
      this.redOutline.edgeGlow = 1.0;     // 发光强度
      this.redOutline.edgeThickness = 2.0; // 边缘厚度
      this.redOutline.pulsePeriod = 2;    // 闪烁周期（秒）
      this.redOutline.visibleEdgeColor.set(0xff0000); // 红色高亮
      this.composer.addPass(this.redOutline);
      this.redOutline.selectedObjects = [];

      // this.scene.traverse(child => {
      //   console.log('child', child.name, child.isMesh, child);
      //   if (child.name === meshName) {
      //     //给mesh包装一层group
      //     if (child.isMesh) {
      //       const wrapper = new Group();
      //       child.parent.add(wrapper);
      //       wrapper.add(child);
      //       // 标记原始mesh以便后续操作
      //       child.userData.isOriginal = true;
      //       this.greenOutline.selectedObjects = [child];
      //     } else {
      //       this.greenOutline.selectedObjects = [child];
      //     }
      //   }
      // });
      // this.greenOutline.selectedObjects = [this.scene.getObjectByName(meshName)];
    },
    //双击事件
    onDblClick(event) {
      const intersected = this.pick(event.clientX, event.clientY);
      if (intersected) {
        this.$emit('on-dblclick', intersected, event.clientX, event.clientY);
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
    cancelAnimationFrame(this.animationId);
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