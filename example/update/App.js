/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
export const App = {
  setup() {
    const count = ref(0);
    return { count };
  },
  render() {
    return h('div', { id: 'app' }, [
      h('p', {}, 'count: ' + this.count),
      h('button', { onClick: () => {
        const count = this.count+1
        this.count = count
      }}, 'increment'),
    ]);
  },
};
