/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
import { Child } from './Child.js';
export const App = {
  name: 'App',
  setup() {
    const count = ref(0);
    const msg = ref('123');
    window.self = msg;
    const updateChildProps = () => {
      msg.value = '456';
    };
    const updateCount = () => {
      count.value++;
    };
    return { count, msg, updateChildProps, updateCount };
  },
  render() {
    return h('div', { id: 'app' }, [
      h('p', {}, 'count: ' + this.count),
      h(
        'button',
        {
          onClick: this.updateCount,
        },
        'increment'
      ),
      h('button', { onClick: this.updateChildProps }, 'update child props'),
      h(Child, { msg: this.msg }),
    ]);
  },
};
