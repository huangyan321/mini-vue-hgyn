/** @format */

export function createComponentInstance(vnode: any) {
  const instance = {
    vnode,
  };
  return instance;
}

export function setupComponent(instance: any) {
  // TODO
  // 1. 处理props
  // 2. 处理slots
  setupStatefulComponent(instance);
}
export function setupStatefulComponent(instance: any) {
  const component = instance.vnode.type;
  const { setup } = component;
  if (setup) {
    // 执行setup
    const setupResult = setup();
    handleSetupResult(instance, setupResult);
  }
}
export function handleSetupResult(instance: any, setupResult: any) {
  // 如果setup返回的是函数，则认为是render函数，
  if (typeof setupResult === 'function') {
    instance.render = setupResult;
  } else {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const component = instance.vnode.type;

  if (component.render) {
    // 如果用户设置了render函数，则使用用户的render函数
    instance.render = component.render;
  }
}