/** @format */

import { h, renderSlots, createTextVNode } from '../../lib/mini-vue.esm.js';

export const Foo = {
  setup(props) {},
  render() {
    return h('div', { id: 'foo' }, [
      renderSlots(this.$slots, 'footer', {
        content: 'footer',
      }),
      renderSlots(this.$slots, 'header', {
        title: 'header',
      }),
      h('div', null, '标记'),
      createTextVNode('文本'),
    ]);
  },
};
