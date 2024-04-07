/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
const preChildren = [h('div', {}, 'A'), h('div', {}, 'B')];
const nextChildren = 'next children';
export const Array2Text = {
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
