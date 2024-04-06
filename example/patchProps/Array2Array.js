/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
const preChildren = [h('div', {}, 'A'), h('div', {}, 'B')];
const nextChildren = [h('div', {}, 'B'), h('div', {}, 'A')];
export const Text2Array = {
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
