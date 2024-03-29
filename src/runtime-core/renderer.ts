/** @format */

import { createComponentInstance, setupComponent } from './component';

export function render(vnode: any, container: any) {
  patch(vnode, container);
}

export function patch(vnode: any, container: any) {

  processComponent(vnode, container);
}

export function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

export function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render && instance.render();

  patch(subTree, container);
}
