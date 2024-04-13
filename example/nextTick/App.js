/** @format */

import {
  ref,
  h,
  getCurrentInstance,
  nextTick,
} from '../../lib/mini-vue.esm.js';
export const App = {
  setup() {
    const count = ref(0);
    const vm = getCurrentInstance();
    function update() {
      let i = 0;
      while (i < 100) {
        i++;
        count.value++;
      }
      console.log(vm);
      nextTick(() => {
        console.log(vm);
      });
    }
    return { count, update };
  },
  render() {
    return h('div', { id: 'app' }, [
      h('p', {}, 'count: ' + this.count),
      h(
        'button',
        {
          onClick: this.update,
        },
        'increment'
      ),
    ]);
  },
};
