/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
const preChildren = 'pre children';
const nextChildren = [h('div', {}, 'A'), h('div', {}, 'B')];
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
