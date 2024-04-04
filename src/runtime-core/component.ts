/** @format */
import { publicInstanceProxyHandlers } from './componentPublicInstance';
import { initProps } from './componentProps';
import { initSlots } from './componentSlots';
import { proxyRef, shallowReadonly } from '../reactivity';
import { emit } from './componentEmit';
let currentInstance: any = null;
export function createComponentInstance(vnode: any, parent: any) {
  const instance = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    provides: parent?.provides ?? {},
    subTree: {},
    isMounted: false,
    parent,
    emit: () => {},
  };
  instance.emit = emit as any;
  return instance;
}

export function setupComponent(instance: any) {
  // TODO
  // 1. 处理props 将props挂载到实例上
  initProps(instance, instance.vnode.props);
  // 2. 处理slots
  initSlots(instance, instance.vnode.children);

  setupStatefulComponent(instance);
}
export function setupStatefulComponent(instance: any) {
  const component = instance.vnode.type;

  instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);
  const { setup } = component;
  if (setup) {
    setCurrentInstance(instance);
    // 执行setup
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit.bind(null, instance),
    });
    handleSetupResult(instance, setupResult);
    setCurrentInstance(null);
  }
}
export function handleSetupResult(instance: any, setupResult: any) {
  // 如果setup返回的是函数，则认为是render函数，
  if (typeof setupResult === 'function') {
    instance.render = setupResult;
  } else {
    instance.setupState = proxyRef(setupResult);
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const component = instance.vnode.type;

  if (!instance.render && component.render) {
    instance.render = component.render;
  }
}

function setCurrentInstance(instance: any) {
  currentInstance = instance;
}
export function getCurrentInstance() {
  return currentInstance;
}
