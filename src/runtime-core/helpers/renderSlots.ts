/** @format */

import { createVNode } from '../vnode';
import { Fragment } from '../vnode';
export function renderSlots(slots: any, name?: any, props?: any) {
  const slot = slots[name];
  if (slot) {
    return createVNode(Fragment, null, slot(props));
  }
}
