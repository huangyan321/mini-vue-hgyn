/** @format */

import { createComponentInstance, setupComponent } from './component';
import { ShapeFlags } from 'src/shared/shapeFlags';
import { Fragment, Text } from './vnode';
import { createAppAPI } from './createApp';
import { effect } from 'src';
export function createRenderer(options: any) {
  const {
    createText: createHostText,
    createElement: createHostElement,
    patchProps: patchHostProps,
    insert: hostInsert,
  } = options;
  function render(vnode: any, container: any) {
    patch(null, vnode, container);
  }
  function patch(n1: any, n2: any, container: any, parentComponent?: any) {
    const { type, shapeFlag } = n2;
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;
      case Text:
        processText(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
    }
    // TODO 判断是组件还是元素
  }
  function processFragment(
    n1: any,
    n2: any,
    container: any,
    parentComponent?: any
  ) {
    mountChildren(n2.children, container, parentComponent);
  }
  function processText(n1: any, n2: any, container: any) {
    const el = (n2.el = createHostText(n2.children));
    container.append(el);
  }
  function processElement(
    n1: any,
    n2: any,
    container: any,
    parentComponent?: any
  ) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container, parentComponent);
    }
  }
  function patchElement(
    n1: any,
    n2: any,
    container: any,
    parentComponent?: any
  ) {}
  function mountElement(
    initialVNode: any,
    container: any,
    parentComponent?: any
  ) {
    const { type, props = {}, children } = initialVNode;
    const el = (initialVNode.el = createHostElement(type));
    if (initialVNode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (initialVNode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, parentComponent);
    }
    // handle props
    // handle props
    for (const key in props) {
      patchHostProps(el, key, props[key]);
    }
    hostInsert(el, container);
  }

  function mountChildren(
    children: any[],
    container: any,
    parentComponent?: any
  ) {
    children.forEach((child) => {
      patch(null, child, container, parentComponent);
    });
  }
  function processComponent(
    n1: any,
    n2: any,
    container: any,
    parentComponent?: any
  ) {
    if (!n1) {
      mountComponent(n2, container, parentComponent);
    } else {
      patchComponent(n1, n2, container, parentComponent);
    }
  }
  function patchComponent(
    n1: any,
    n2: any,
    container: any,
    parentComponent?: any
  ) {
    // TODO
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
    effect(() => {
      if (!instance.isMounted) {
        console.log('init');

        const { proxy } = instance;
        const subTree = instance.render && instance.render.apply(proxy);
        instance.subTree = subTree;
        patch(null, subTree, container, instance);
        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        console.log('patch');
        const { proxy } = instance;
        const prevTree = instance.subTree;
        const nextTree = (instance.subTree = instance.render.apply(proxy));
        patch(prevTree, nextTree, container, instance);
      }
    });
  }
  return {
    createApp: createAppAPI(render),
  };
}
