/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
const preChildren = 'pre children';
const nextChildren = 'new children';
export const Text2Text = {
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
