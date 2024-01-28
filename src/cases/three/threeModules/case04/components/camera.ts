import { PerspectiveCamera } from 'three';

/**
 * 封装相机的方法，包括创建相机及其设置
 * @returns 一个相机对象
 */
function createCamera() {
  //创建相机，并设置参数（视野角度（FOV）, 长宽比（aspect ratio）, 近截面（near）, 远截面（far））
  const camera: any = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  );

  // 设置相机位置
camera.position.set(10, 10, 10);
// camera.position.set(0, 0, 10);

  //设置相机对焦坐标，不设置默认(0, 0, 0)
  camera.lookAt(0, 0, 0);

  return camera;
}

export { createCamera };
