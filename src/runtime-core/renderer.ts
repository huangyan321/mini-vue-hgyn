/** @format */

import { createComponentInstance, setupComponent } from './component';
import { ShapeFlags } from 'src/shared/shapeFlags';
import { Fragment, Text } from './vnode';
import { createAppAPI } from './createApp';
export function createRenderer(options: any) {
  const { createText, createElement, patchProps, insert } = options;
  function render(vnode: any, container: any) {
    patch(vnode, container);
  }
  function patch(vnode: any, container: any, parentComponent?: any) {
    const { type, shapeFlag } = vnode;
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent);
        }
    }
    // TODO 判断是组件还是元素
  }
  function processFragment(vnode: any, container: any, parentComponent?: any) {
    mountChildren(vnode.children, container, parentComponent);
  }
  function processText(vnode: any, container: any) {
    const el = (vnode.el = createText(vnode.children));
    container.append(el);
  }
  function processElement(vnode: any, container: any, parentComponent?: any) {
    mountElement(vnode, container, parentComponent);
  }

  function mountElement(vnode: any, container: any, parentComponent?: any) {
    const { type, props = {}, children } = vnode;
    const el = (vnode.el = createElement(type));
    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, parentComponent);
    }
    // handle props
    // handle props
    for (const key in props) {
      patchProps(el, key, props[key]);
    }
    insert(el, container);
  }

  function mountChildren(
    children: any[],
    container: any,
    parentComponent?: any
  ) {
    children.forEach((child) => {
      patch(child, container, parentComponent);
    });
  }
  function processComponent(vnode: any, container: any, parentComponent?: any) {
    mountComponent(vnode, container, parentComponent);
  }

  function mountComponent(
    initialVNode: any,
    container: any,
    parentComponent?: any
  ) {
    const instance = createComponentInstance(initialVNode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }

  function setupRenderEffect(instance: any, initialVNode: any, container: any) {
    const { proxy } = instance;
    const subTree = instance.render && instance.render.apply(proxy);
    patch(subTree, container, instance);
    initialVNode.el = subTree.el;
  }
  return {
    createApp: createAppAPI(render),
  };
}
