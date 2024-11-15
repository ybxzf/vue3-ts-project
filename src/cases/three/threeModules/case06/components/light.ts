import { DirectionalLight, HemisphereLight } from 'three';

/**
 * 封装光线的方法，并对光线进行设置，如颜色，强度，坐标等
 * @returns 一个包含光源的网格模型对象
 */
function createLights() {
  //创建自然的环境光（天空光颜色，地面光颜色，强度）
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
    5,
  );
  //创建平行光（颜色，强度）
  const mainLight = new DirectionalLight('white', 4);
  //设置发光坐标
  mainLight.position.set(10, 10, 10);

  return { ambientLight, mainLight };
}

export { createLights };
