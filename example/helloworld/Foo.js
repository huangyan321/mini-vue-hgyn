/** @format */

import { h } from '../../lib/mini-vue.esm.js';

export const Foo = {
  setup(props) {
    // props 实现点
    // 1. 作为setup第一个参数传入
    // 2. 能够在render函数中使用this直接访问
    // 3. 传入的props是只读的
    console.log('🚀 ~ setup ~ props:', props)
    return {
      msg: 'foo',
    };
  },
  render() {
    return h('div', { id: 'foo' }, [
      h('h1', {}, this.msg),
      h('h2', {}, this.parentMsg),
    ]);
  },
};
