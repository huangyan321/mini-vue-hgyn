/** @format */

import { isObject } from 'src/shared';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode: any, container: any) {
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  // TODO 判断是组件还是元素
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const { type, props = {}, children } = vnode;

  const el = (vnode.el = document.createElement(type));
  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(children, container);
  }
  // handle props
  for (const key in props) {
    el.setAttribute(key, props[key]);
  }
  container.appendChild(el);
}

function mountChildren(children: any[], container: any) {
  children.forEach((child) => {
    patch(child, container);
  });
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(initialVNode: any, container: any) {
  const instance = createComponentInstance(initialVNode);
  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance: any, initialVNode: any, container: any) {
  const { proxy } = instance;
  const subTree = instance.render && instance.render.apply(proxy);
  patch(subTree, container);
  initialVNode.el = subTree.el;
}
