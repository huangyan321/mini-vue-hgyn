/** @format */

import { createVNode } from './vnode';

export function createAppAPI(render: any) {
  return function createApp(rootComponent: any) {
    return {
      mount(rootContainer: Element | string) {
        // 归一化 所有逻辑操作都使用vnode处理
        const vnode = createVNode(rootComponent);
        render(vnode, rootContainer);
      },
    };
  };
}
