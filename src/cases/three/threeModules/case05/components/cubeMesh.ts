import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

/**
 * 封装网格模型的方法，包括创建形状和材质，并对网格模型及其设置
 * @returns 一个网格模型对象
 */
function createCubeMash(x: number = 0, y: number = 0, z: number = 0) {
  //创建几何形状
  const geometry: any = new BoxGeometry(2, 2, 2);
  //创建材质，不使用MeshBasicMaterial基础材质了，这个材质需要光源要求
  const material: any = new MeshStandardMaterial({
    color: 'purple', //(紫色)
    transparent: true, //开启透明度
    opacity: 0.9, //设置透明度 
  });

  //创建网格模型
  const cubeMash: any = new Mesh(geometry, material);
  //设置模型对象的xyz坐标，不设置默认(0, 0, 0)
  cubeMash.position.set(x, y, z);

  return cubeMash
}

export { createCubeMash };
