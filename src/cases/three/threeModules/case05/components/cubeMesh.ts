import { BoxGeometry, Mesh, MeshStandardMaterial, MeshBasicMaterial, TextureLoader } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'; // 导入自定义几何体
/**
 * 封装网格模型的方法，包括创建形状和材质，并对网格模型及其设置
 * @returns 一个网格模型对象
 */
const textureUrl = new URL(`@/assets/logo.svg`, import.meta.url).href
const centerUrl = new URL(`@/assets/center.jpg`, import.meta.url).href
const leftUrl = new URL(`@/assets/left.png`, import.meta.url).href
const rightUrl = new URL(`@/assets/right.png`, import.meta.url).href
const backUrl = new URL(`@/assets/back.png`, import.meta.url).href
console.log('centerUrl:', centerUrl);

function createCubeMash(x: number = 0, y: number = 0, z: number = 0) {
  // const texture: any = new TextureLoader().load('https://mujinzjh.github.io/img/404.jpg');
  // const texture: any = new TextureLoader().load(centerUrl);
  //引入纹理
  const textureLoader = new TextureLoader();
  const textures: any[] = [
    textureLoader.load(centerUrl),//前
    textureLoader.load(backUrl),//后
    '',//上
    '',//下
    textureLoader.load(rightUrl),//右
    textureLoader.load(leftUrl),//左
  ];
  //创建带弧度的几何形状
  const geometry: any = new RoundedBoxGeometry(2, 4, 3, 4, 0.2);

  //创建材质，不使用MeshBasicMaterial基础材质了，这个材质需要光源要求
  const materials = textures.map(texture => {
    return new MeshStandardMaterial({ map: texture });
  });
  // const material: any = new MeshStandardMaterial({
  //   map: texture,
  //   // color: 'purple', //(紫色)
  //   // transparent: true, //开启透明度
  //   opacity: 0.9, //设置透明度 
  // });

  //创建网格模型
  const cubeMash: any = new Mesh(geometry, materials);
  //设置模型对象的xyz坐标，不设置默认(0, 0, 0)
  cubeMash.position.set(x, y, z);

  return cubeMash
}

export { createCubeMash };
