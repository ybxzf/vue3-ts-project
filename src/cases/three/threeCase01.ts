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
    color: 0x00ff00, //(绿色)
    transparent: true, //开启透明度
    opacity: 0.6, //设置透明度
});
//创建网格模型（形状, 材质）
const cube: any = new THREE.Mesh(geometry, material);
//设置模型对象的xyz坐标
cube.position.set(0, 0, 0);
//将网格模型添加到场景
scene.add(cube);

//点光源，color:灯光颜色，intensity:光照强度
const light = new THREE.PointLight(0xffffff, 0.5);
//设置光源坐标
light.position.set(100, 0, 0);
//将光源添加到场景
scene.add(light);

//创建辅助坐标轴
const axesHelper = new THREE.AxesHelper(100);
//将坐标轴添加到场景
scene.add(axesHelper);

//创建渲染器
const renderer: any = new THREE.WebGLRenderer();
//设置渲染器大小，即在页面中占画布的大小
renderer.setSize(1000, 800);
//渲染场景和相机
renderer.render(scene, camera);

export const render: any = renderer
