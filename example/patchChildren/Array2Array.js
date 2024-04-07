/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
const preChildren = [
  h('div', { key: 1 }, 'A'),
  h('div', { key: 2 }, 'B'),
  h('div', { key: 3 }, 'C'),
];
const nextChildren = [
  h('div', { key: 1 }, 'B'),
  h('div', { key: 3 }, 'C'),
  h('div', { key: 2 }, 'A'),
  h('div', { key: 4 }, 'W'),
  h('div', { key: 5 }, 'D'),
];
export const Array2Array = {
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return { isChange };
  },
  render() {
    return this.isChange
      ? h('div', {}, nextChildren)
      : h('div', {}, preChildren);
  },
};
