/** @format */

import { createVNode } from './vnode';
import { render } from './renderer';
export function createApp(rootComponent: any) {
  return {
    mount(rootContainer: Element | string) {
      console.log('mount');
      // 归一化 所有逻辑操作都使用vnode处理
      const vnode = createVNode(rootComponent);
      render(vnode, rootContainer);
    },
  };
}
