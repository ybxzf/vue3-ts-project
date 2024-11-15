/**
 * 获取场景的第一个子模型
 * @param data dom
 * @returns 场景的第一个子模型
 */
function setupModel(data: any) {
    const model = data.scene.children[0];
  
    return model;
  }
  
  export { setupModel };
  