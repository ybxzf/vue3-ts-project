import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

/**
 * 封装网格模型的方法，包括创建形状和材质，并对网格模型及其设置
 * @returns 一个网格模型对象
 */
function createCubeMash() {
  //创建几何形状
  const geometry: any = new BoxGeometry(2, 2, 2);
  //创建材质，MeshBasicMaterial此材质最特殊，等于会自发光，不需要设置光源
  const material: any = new MeshBasicMaterial({
    color: 0x00ff00, //(绿色)
    transparent: true, //开启透明度
    opacity: 0.6, //设置透明度
  });
  //创建网格模型
  const cubeMash: any = new Mesh(geometry, material);
  //设置模型对象的xyz坐标，不设置默认(0, 0, 0)
  cubeMash.position.set(0, 0, 0);

  return cubeMash
}

export { createCubeMash };
