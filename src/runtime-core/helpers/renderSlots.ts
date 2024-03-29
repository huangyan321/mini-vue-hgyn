/** @format */

import { createVNode } from '../vnode';
export function renderSlots(slots: any, name?: any, props?: any) {
  const slot = slots[name];
  if (slot) {
    return createVNode('div', null, slot(props));
  }
}
