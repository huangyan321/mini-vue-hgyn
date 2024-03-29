/** @format */
import { ShapeFlags } from 'src/shared/shapeFlags';
export function initSlots(instance: any, children: any) {
  if (ShapeFlags.SLOT_CHILDREN & instance.vnode.shapeFlag) {
    normalizeObjectSlots(children, (instance.slots));
  }
}

function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key];
    slots[key] = (props: any) => normalizeSlotValue(value(props));
  }
}
function normalizeSlotValue(value: any) {
  return Array.isArray(value) ? value : [value];
}
