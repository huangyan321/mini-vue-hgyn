/** @format */
import { ShapeFlags } from 'src/shared/shapeFlags';
export const Fragment = Symbol('Fragment');
export const Text = Symbol('Text');
export function createVNode(type: any, props?: any, children?: any) {
  const vnode = {
    type,
    props,
    key: props && props.key,
    children,
    el: null,
    shapeFlag: getShapeFlag(type),
    component: null,
  };
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  } else {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  }
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof vnode.children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
    }
  }
  return vnode;
}
function getShapeFlag(type: any) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}
export function createTextVNode(text: string) {
  return createVNode(Text, null, text);
}
