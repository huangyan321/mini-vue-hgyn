/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
export const Text2Text = {
  setup() {
    const text = ref('text');
    const method = () => {
      text.value = 'new text';
    };
    return { text, method };
  },
  render() {
    return h('div', { id: 'app' }, [
      h('p', {}, this.text),
      h('button', { onClick: this.method }, 'change text'),
    ]);
  },
};
