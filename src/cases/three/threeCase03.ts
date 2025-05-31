/*  
threeJs最基本的3个属性：场景(scene), 相机(camera), 渲染器(renderer)
步骤简化
1. 创建场景(scene)
2. 创建相机(camera)，传入相关参数，注意参数的大小，不合适会看不见图像，并配置坐标等信息
3. 创建网格模型(Mesh)，形状(geometry)和材质(material)为参数，并设置坐标等信息，默认(0,0,0)
4. 将网格模型(Mesh)添加到场景(scene)中
5. 创建光源(light)，并设置合适的坐标，添加到场景(scene)中，不然还是看不到
6. 可选：创建辅助空间坐标系(AxesHelper),传入坐标轴长度参数
7. 创建渲染器(renderer)，配置宽高等信息
8. 渲染: renderer.render(scene, camera);
8. 将renderer与DOM元素绑定: DOM.appendChild(render.domElement);
9. 延伸：根据需求加入其他操作，如鼠标控件(OrbitControls)，动画(requestAnimationFrame)等

注：所有对象可以一次性添加到场景中
*/
import * as THREE from "three";
import { OrbitControls } from '@three-ts/orbit-controls';
// 效果制作器
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// 渲染通道
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// 发光描边OutlinePass
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

//创建场景
const scene: any = new THREE.Scene();

//创建相机（视野角度（FOV）, 长宽比（aspect ratio）, 近截面（near）, 远截面（far））
const camera: any = new THREE.PerspectiveCamera(100, 10 / 8, 0.1, 1000);
//设置相机坐标
camera.position.set(100, 100, 100);
//设置相机对焦坐标
camera.lookAt(0, 0, 0);

//创建形状
const geometry: any = new THREE.BoxGeometry(50, 50, 50);
//创建材质
const material: any = new THREE.MeshBasicMaterial({
    color: 0xafaf00, //(绿色)
    // transparent: true, //开启透明度
    opacity: 0.6, //设置透明度
});
//创建网格模型（形状, 材质）
const cube: any = new THREE.Mesh(geometry, material);
//设置模型对象的xyz坐标
cube.position.set(0, 0, 0);
cube.name="test";
//将网格模型添加到场景

//点光源，color:灯光颜色，intensity:光照强度
const light = new THREE.PointLight(0xffffff, 0.5);
//设置光源坐标
light.position.set(100, 0, 0);
//将光源添加到场景

//创建辅助坐标轴
const axesHelper = new THREE.AxesHelper(100);

//将坐标轴添加到场景
scene.add(cube, light, axesHelper);

//创建渲染器
const renderer: any = new THREE.WebGLRenderer();
//设置渲染器大小，即在页面中占画布的大小
// renderer.setSize(1000, 800); // 转移到组件中设置了
//渲染场景和相机
// renderer.render(scene, camera);

//创建控件对象
const controls: any = new OrbitControls(camera, renderer.domElement);
//监听鼠标，键盘事件
controls.addEventListener("change", () => {
    // renderer.render(scene, camera);
});

const composer = new EffectComposer(renderer);
    
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(
  new THREE.Vector2(1000,800),
  scene,
  camera
);
outlinePass.edgeStrength = 10.0; // 边缘强度
outlinePass.edgeGlow = 1.0;     // 发光强度
outlinePass.edgeThickness = 1.0; // 边缘厚度
outlinePass.pulsePeriod = 2;    // 闪烁周期（秒）
outlinePass.visibleEdgeColor.set(0x00ff00); // 高亮颜色
composer.addPass(outlinePass);
outlinePass.selectedObjects = [scene.getObjectByName("test")];

//调用动画
animate();

// 封装动画
function animate() {
  if (!composer) return; // 防御性编程

  //递归调用动画
  window.requestAnimationFrame(animate);
  //每次刷新旋转(rotation)角度0.01
  cube.rotation.y += 0.01;
  // cube.rotation.x += 0.01;
  controls?.update();
  composer.render();
  //重新渲染场景和相机
  // renderer.render(scene, camera);
}

export const render: any = renderer
