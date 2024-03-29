/** @format */
import { ShapeFlags } from 'src/shared/shapeFlags';
import { emit } from './componentEmit';
export function createVNode(type: any, props?: any, children?: any) {
  const vnode = {
    type,
    props,
    emit: () => {},
    children,
    el: null,
    shapeFlag: getShapeFlag(type),
  };
  vnode.emit = emit as any;
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  } else {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  }
  return vnode;
}
function getShapeFlag(type: any) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}
