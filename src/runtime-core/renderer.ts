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
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options;
  function render(vnode: any, container: any) {
    patch(null, vnode, container);
  }
  function patch(
    n1: any,
    n2: any,
    container: any,
    anchor?: any,
    parentComponent?: any
  ) {
    const { type, shapeFlag } = n2;
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent);
        break;
      case Text:
        processText(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, anchor, parentComponent);
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
    anchor?: any,
    parentComponent?: any
  ) {
    mountChildren(n2.children, container, anchor, parentComponent);
  }
  function processText(n1: any, n2: any, container: any) {
    const el = (n2.el = createHostText(n2.children));
    container.append(el);
  }
  function processElement(
    n1: any,
    n2: any,
    container: any,
    anchor?: any,
    parentComponent?: any
  ) {
    if (!n1) {
      mountElement(n2, container, anchor, parentComponent);
    } else {
      patchElement(n1, n2, container, parentComponent);
    }
  }
  function patchElement(
    n1: any,
    n2: any,
    container: any,
    parentComponent?: any
  ) {
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    const el = (n2.el = n1.el);
    patchChildren(n1, n2, el);
    patchProps(el, oldProps, newProps);
  }

  function patchChildren(n1: any, n2: any, el: any) {
    const prevShapeFlag = n1.shapeFlag;
    const nextShapeFlag = n2.shapeFlag;
    if (nextShapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(n1.children);
      }
      hostSetElementText(el, n2.children);
    } else if (nextShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        patchKeyedChildren(n1, n2, el);
      } else if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(el, '');
        mountChildren(n2.children, el);
      }
    }
  }
  function patchKeyedChildren(n1: any, n2: any, container: any) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    // 四个索引值
    let oldStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let newStartIdx = 0;
    let newEndIdx = newChildren.length - 1;
    // 四个索引值所指向的节点
    let oldStartVNode = oldChildren[oldStartIdx];
    let oldEndVNode = oldChildren[oldEndIdx];
    let newStartVNode = newChildren[newStartIdx];
    let newEndVNode = newChildren[newEndIdx];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!oldStartVNode) {
        oldStartVNode = oldChildren[++oldStartIdx];
      } else if (!oldEndVNode) {
        oldEndVNode = oldChildren[--oldEndIdx];
      } else if (oldStartVNode.key === newStartVNode.key) {
        // 第一步 头头比较
        patch(oldStartVNode, newStartVNode, container);
        // 新旧都在头部，不移动dom，只更新索引
        oldStartVNode = oldChildren[++oldStartIdx];
        newStartVNode = newChildren[++newStartIdx];
      } else if (oldEndVNode.key === newEndVNode.key) {
        // 第二部 尾尾比较
        patch(oldEndVNode, newEndVNode, container);
        // 新旧都在尾部，不移动dom，只更新索引
        oldEndVNode = oldChildren[--oldEndIdx];
        newEndVNode = newChildren[--newEndIdx];
      } else if (oldStartVNode.key === newEndVNode.key) {
        // 第三步 尾头比较
        patch(oldStartVNode, newEndVNode, container);
        hostInsert(oldStartVNode.el, container, oldEndVNode.el.nextSibling);
        oldStartVNode = oldChildren[++oldStartIdx];
        newEndVNode = newChildren[--newEndIdx];
      } else if (oldEndVNode.key === newStartVNode.key) {
        // 第四步 头尾比较
        patch(oldEndVNode, newStartVNode, container);
        // 移动时，将旧节点组的尾节点移动到头节点
        hostInsert(oldEndVNode.el, container, oldStartVNode.el);
        // 移动完成后，更新索引值，并将指针指向下一个位置
        oldEndVNode = oldChildren[--oldEndIdx];
        newStartVNode = newChildren[++newStartIdx];
      } else {
        const idxInOld = oldChildren.findIndex(
          (c: any) => c && c.key === newStartVNode.key
        );
        if (idxInOld > 0) {
          const vnodeToMove = oldChildren[idxInOld];
          patch(vnodeToMove, newStartVNode, container);
          hostInsert(vnodeToMove.el, container, oldStartVNode.el);
          // 由于原来位置的节点被移走了，因此将其设置为undefined
          oldChildren[idxInOld] = void 0;
        } else {
          patch(null, newStartVNode, container, oldStartVNode.el);
        }
        newStartVNode = newChildren[++newStartIdx];
      }
    }

    // 添加新节点
    if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
      for (let i = newStartIdx; i <= newEndIdx; i++) {
        // 找到现有的头部节点索引(newEndIdx + 1)
        const anchor = newChildren[newEndIdx + 1]
          ? newChildren[newEndIdx + 1].el
          : null;
        patch(null, newChildren[i], container, anchor);
      }
    } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
      // 删除旧节点
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        hostRemove(oldChildren[i].el);
      }
    }
  }
  function unmountChildren(children: any[]) {
    children.forEach((child) => {
      hostRemove(child.el);
    });
  }
  function patchProps(el: any, oldProps: any, newProps: any) {
    if (oldProps === newProps) return;
    for (const key in newProps) {
      const prev = oldProps[key];
      const next = newProps[key];
      if (prev !== next) {
        patchHostProps(el, key, prev, next);
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchHostProps(el, key, oldProps[key], null);
      }
    }
  }
  function mountElement(
    initialVNode: any,
    container: any,
    anchor: any,
    parentComponent?: any
  ) {
    const { type, props = {}, children } = initialVNode;
    const el = (initialVNode.el = createHostElement(type));
    if (initialVNode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (initialVNode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, null, parentComponent);
    }
    // handle props
    for (const key in props) {
      patchHostProps(el, key, null, props[key]);
    }
    hostInsert(el, container, anchor);
  }

  function mountChildren(
    children: any[],
    container: any,
    anchor?: any,
    parentComponent?: any
  ) {
    children.forEach((child) => {
      patch(null, child, container, anchor, parentComponent);
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
        patch(null, subTree, container, null, instance);
        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        console.log('patch');
        const { proxy } = instance;
        const prevTree = instance.subTree;
        const nextTree = (instance.subTree = instance.render.apply(proxy));
        patch(prevTree, nextTree, container, null, instance);
      }
    });
  }
  return {
    createApp: createAppAPI(render),
  };
}
