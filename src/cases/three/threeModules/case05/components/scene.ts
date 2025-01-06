import { Color, Scene } from 'three';

/**
 * 封装场景的方法，包括创建场景及其设置
 * @returns 一个场景对象
 */
function createScene() {
  //创建场景Scene
  const scene: any = new Scene();
  //设置场景背景色
  scene.background = new Color('grey');
  return scene;
}

export { createScene };
