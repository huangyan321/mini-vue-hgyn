/** @format */

import { h, renderSlots, createTextVNode,getCurrentInstance } from '../../lib/mini-vue.esm.js';

export const Foo = {
  setup(props) {
    const vm = getCurrentInstance();
    console.log('Foo', vm);
  },
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
