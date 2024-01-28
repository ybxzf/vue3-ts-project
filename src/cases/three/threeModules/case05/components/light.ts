import { DirectionalLight } from 'three';

/**
 * 封装光线的方法，并对光线进行设置，如颜色，强度，坐标等
 * @returns 一个网格模型对象
 */
function createLights() {
  // Create a directional light 创建关照对象，设置光照颜色和强度
  const light: any = new DirectionalLight('white', 8);

  // move the light right, up, and towards us 设置发光坐标
  light.position.set(10, 10, 10);

  return light;
}

export { createLights };
